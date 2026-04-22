export type ChatMessage = {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: string;
};

type SendChatMessageParams = {
  message: string;
  conversationId: string | null;
  clientSessionId: string;
  clientNickname?: string;
  enableThinking?: boolean;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
};

type SendChatMessageResult = {
  conversationId: string | null;
  message: ChatMessage;
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const chatEndpoint = '/chat/messages';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const readString = (value: unknown, key: string): string | null => {
  if (!isRecord(value)) {
    return null;
  }

  const field = value[key];

  return typeof field === 'string' && field.trim() ? field : null;
};

const readMessageText = (value: unknown, key: string): string | null => {
  if (!isRecord(value)) {
    return null;
  }

  const field = value[key];

  if (typeof field === 'string' && field.trim()) {
    return field;
  }

  if (Array.isArray(field)) {
    const messages = field.filter(
      (item): item is string => typeof item === 'string' && item.trim().length > 0,
    );

    return messages.length > 0 ? messages.join('\n') : null;
  }

  return null;
};

const readRecord = (
  value: unknown,
  key: string,
): Record<string, unknown> | null => {
  if (!isRecord(value)) {
    return null;
  }

  const field = value[key];

  return isRecord(field) ? field : null;
};

const extractReply = (body: unknown): string | null => {
  const directReply =
    readString(body, 'reply') ??
    readString(body, 'message') ??
    readString(body, 'content');

  if (directReply) {
    return directReply;
  }

  if (isRecord(body)) {
    const nestedMessageReply = extractReply(body.message);

    if (nestedMessageReply) {
      return nestedMessageReply;
    }

    return extractReply(body.data);
  }

  return null;
};

const extractErrorMessage = (body: unknown): string | null => {
  const directError = readMessageText(body, 'message') ?? readString(body, 'error');

  if (directError) {
    return directError;
  }

  if (isRecord(body)) {
    const nestedError = extractErrorMessage(body.error);

    if (nestedError) {
      return nestedError;
    }
  }

  return null;
};

const extractConversationId = (body: unknown): string | null => {
  const conversationId = readString(body, 'conversationId');

  if (conversationId) {
    return conversationId;
  }

  if (isRecord(body)) {
    return extractConversationId(body.data);
  }

  return null;
};

const readMessageRecord = (body: unknown): Record<string, unknown> | null => {
  const directMessage = readRecord(body, 'message');

  if (directMessage) {
    return directMessage;
  }

  const data = readRecord(body, 'data');

  if (!data) {
    return null;
  }

  return readRecord(data, 'message') ?? data;
};

const toChatMessage = (body: unknown, content: string): ChatMessage => {
  const messageBody = readMessageRecord(body);
  const role = readString(messageBody, 'role');

  return {
    id: readString(messageBody, 'id') ?? undefined,
    role: role === 'user' ? 'user' : 'assistant',
    content,
    createdAt: readString(messageBody, 'createdAt') ?? undefined,
  };
};

const normalizeApiUrl = (value: string): string => value.replace(/\/+$/, '');

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const getChatLaetusApiBaseUrl = (): string | null => {
  if (typeof apiBaseUrl !== 'string') {
    return null;
  }

  const trimmedApiBaseUrl = apiBaseUrl.trim();

  return trimmedApiBaseUrl.length > 0 ? trimmedApiBaseUrl : null;
};

const readResponseBody = async (response: Response): Promise<unknown> => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { message: text };
  }
};

export const hasChatLaetusApiUrl = (): boolean =>
  getChatLaetusApiBaseUrl() !== null;

export const sendChatLaetusMessage = async ({
  message,
  conversationId,
  clientSessionId,
  clientNickname,
  enableThinking = false,
  temperature,
  topP,
  maxTokens,
}: SendChatMessageParams): Promise<SendChatMessageResult> => {
  const configuredApiBaseUrl = getChatLaetusApiBaseUrl();

  if (!configuredApiBaseUrl) {
    throw new Error('VITE_API_BASE_URL이 설정되지 않았습니다.');
  }

  const trimmedClientNickname = clientNickname?.trim();

  const response = await fetch(
    `${normalizeApiUrl(configuredApiBaseUrl)}${chatEndpoint}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        clientSessionId,
        ...(conversationId ? { conversationId } : {}),
        ...(trimmedClientNickname
          ? { clientNickname: trimmedClientNickname.slice(0, 80) }
          : {}),
        ...(enableThinking ? { enableThinking: true } : {}),
        ...(isFiniteNumber(temperature) ? { temperature } : {}),
        ...(isFiniteNumber(topP) ? { topP } : {}),
        ...(isFiniteNumber(maxTokens) ? { maxTokens } : {}),
      }),
    },
  );
  const body = await readResponseBody(response);

  if (!response.ok) {
    throw new Error(
      extractErrorMessage(body) ??
        `Chat Laetus 요청에 실패했습니다. (${response.status})`,
    );
  }

  const reply = extractReply(body);

  if (!reply) {
    throw new Error('Chat Laetus 응답에서 메시지를 찾을 수 없습니다.');
  }

  return {
    conversationId: extractConversationId(body) ?? conversationId,
    message: toChatMessage(body, reply),
  };
};
