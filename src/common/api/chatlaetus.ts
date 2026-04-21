export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type SendChatMessageParams = {
  message: string;
  history: ChatMessage[];
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const chatEndpoint = '/api/chatlaetus';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const readString = (value: unknown, key: string): string | null => {
  if (!isRecord(value)) {
    return null;
  }

  const field = value[key];

  return typeof field === 'string' && field.trim() ? field : null;
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
    return extractReply(body.data);
  }

  return null;
};

const extractErrorMessage = (body: unknown): string | null => {
  const directError = readString(body, 'message');

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

const normalizeApiUrl = (value: string): string => value.replace(/\/+$/, '');

const getChatlaetusApiBaseUrl = (): string | null => {
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

export const hasChatlaetusApiUrl = (): boolean =>
  getChatlaetusApiBaseUrl() !== null;

export const sendChatlaetusMessage = async ({
  message,
  history,
}: SendChatMessageParams): Promise<string> => {
  const configuredApiBaseUrl = getChatlaetusApiBaseUrl();

  if (!configuredApiBaseUrl) {
    throw new Error('VITE_API_BASE_URL이 설정되지 않았습니다.');
  }

  const response = await fetch(
    `${normalizeApiUrl(configuredApiBaseUrl)}${chatEndpoint}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    },
  );
  const body = await readResponseBody(response);

  if (!response.ok) {
    throw new Error(
      extractErrorMessage(body) ??
        `ChatLaetus 요청에 실패했습니다. (${response.status})`,
    );
  }

  const reply = extractReply(body);

  if (!reply) {
    throw new Error('ChatLaetus 응답에서 메시지를 찾을 수 없습니다.');
  }

  return reply;
};
