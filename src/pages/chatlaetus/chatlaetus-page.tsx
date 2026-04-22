import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import {
  faArrowLeft,
  faBrain,
  faCommentDots,
  faPaperPlane,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  hasChatLaetusApiUrl,
  sendChatLaetusMessage,
} from '../../common/api/chatlaetus';
import type { ChatMessage } from '../../common/api/chatlaetus';
import { AppShell } from '../../components/layout/app-shell';

import styles from '../../assets/styles/pages/chatlaetus-page.module.css';

const initialMessages: ChatMessage[] = [
  {
    role: 'assistant',
    content:
      '안녕하세요. 채팅 내용은 저장됩니다.',
  },
];

const clientNicknameStorageKey = 'chatlaetus-client-nickname';
const lastConversationStorageKey = 'chatlaetus-last-conversation-v1';
const clientNicknameMaxLength = 80;

type StoredConversationSnapshot = {
  conversationId: string | null;
  clientSessionId: string;
  messages: ChatMessage[];
  updatedAt: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const createInitialMessages = (): ChatMessage[] =>
  initialMessages.map((message) => ({ ...message }));

const getVisibleMessages = (messages: ChatMessage[]): ChatMessage[] => {
  let lastUserMessageIndex = -1;

  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role === 'user') {
      lastUserMessageIndex = index;
      break;
    }
  }

  if (lastUserMessageIndex === -1) {
    return messages;
  }

  return messages.slice(lastUserMessageIndex);
};

const createClientSessionId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `chatlaetus-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const toStoredChatMessage = (value: unknown): ChatMessage | null => {
  if (!isRecord(value)) {
    return null;
  }

  const { role, content, id, createdAt } = value;

  if (
    (role !== 'user' && role !== 'assistant') ||
    typeof content !== 'string' ||
    !content.trim()
  ) {
    return null;
  }

  return {
    role,
    content,
    id: typeof id === 'string' && id.trim() ? id : undefined,
    createdAt:
      typeof createdAt === 'string' && createdAt.trim() ? createdAt : undefined,
  };
};

const readStoredConversationSnapshot =
  (): StoredConversationSnapshot | null => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const storedValue = window.localStorage.getItem(
        lastConversationStorageKey,
      );

      if (!storedValue) {
        return null;
      }

      const parsedValue = JSON.parse(storedValue) as unknown;

      if (!isRecord(parsedValue)) {
        return null;
      }

      const { conversationId, clientSessionId, messages, updatedAt } =
        parsedValue;

      if (typeof clientSessionId !== 'string' || !clientSessionId.trim()) {
        return null;
      }

      if (!Array.isArray(messages)) {
        return null;
      }

      const storedMessages = messages
        .map(toStoredChatMessage)
        .filter((message): message is ChatMessage => message !== null);

      if (
        storedMessages.length === 0 ||
        !storedMessages.some((message) => message.role === 'user')
      ) {
        return null;
      }

      return {
        conversationId:
          typeof conversationId === 'string' && conversationId.trim()
            ? conversationId
            : null,
        clientSessionId,
        messages: storedMessages,
        updatedAt:
          typeof updatedAt === 'string' && updatedAt.trim() ? updatedAt : '',
      };
    } catch {
      return null;
    }
  };

const writeStoredConversationSnapshot = ({
  conversationId,
  clientSessionId,
  messages,
}: Omit<StoredConversationSnapshot, 'updatedAt'>) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const snapshot: StoredConversationSnapshot = {
      conversationId,
      clientSessionId,
      messages,
      updatedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      lastConversationStorageKey,
      JSON.stringify(snapshot),
    );
  } catch {
    // Storage can be unavailable in restricted browsing contexts.
  }
};

const clearStoredConversationSnapshot = () => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(lastConversationStorageKey);
  } catch {
    // Storage can be unavailable in restricted browsing contexts.
  }
};

const readStoredClientNickname = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  try {
    return (
      window.localStorage.getItem(clientNicknameStorageKey)?.slice(
        0,
        clientNicknameMaxLength,
      ) ?? ''
    );
  } catch {
    return '';
  }
};

type ChatLaetusPageProps = {
  onNavigateHome: () => void;
};

export const ChatLaetusPage = ({ onNavigateHome }: ChatLaetusPageProps) => {
  const [storedConversation] = useState(readStoredConversationSnapshot);
  const [messages, setMessages] = useState<ChatMessage[]>(
    () => storedConversation?.messages ?? createInitialMessages(),
  );
  const [conversationId, setConversationId] = useState<string | null>(
    () => storedConversation?.conversationId ?? null,
  );
  const [clientSessionId] = useState(
    () => storedConversation?.clientSessionId ?? createClientSessionId(),
  );
  const [clientNickname, setClientNickname] = useState(readStoredClientNickname);
  const [input, setInput] = useState('');
  const [enableThinking, setEnableThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const listEndRef = useRef<HTMLDivElement | null>(null);
  const isConfigured = hasChatLaetusApiUrl();
  const trimmedInput = input.trim();
  const canSend = isConfigured && trimmedInput.length > 0 && !isSending;
  const visibleMessages = getVisibleMessages(messages);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isSending]);

  useEffect(() => {
    if (!messages.some((message) => message.role === 'user')) {
      return;
    }

    writeStoredConversationSnapshot({
      conversationId,
      clientSessionId,
      messages,
    });
  }, [conversationId, clientSessionId, messages]);

  useEffect(() => {
    try {
      const trimmedClientNickname = clientNickname.trim();

      if (trimmedClientNickname) {
        window.localStorage.setItem(
          clientNicknameStorageKey,
          clientNickname.slice(0, clientNicknameMaxLength),
        );
        return;
      }

      window.localStorage.removeItem(clientNicknameStorageKey);
    } catch {
      // Storage can be unavailable in restricted browsing contexts.
    }
  }, [clientNickname]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSend) {
      return;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: trimmedInput,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput('');
    setError(null);
    setIsSending(true);

    try {
      const result = await sendChatLaetusMessage({
        message: userMessage.content,
        conversationId,
        clientSessionId,
        clientNickname,
        enableThinking,
      });

      setConversationId(result.conversationId);
      setMessages((currentMessages) => [
        ...currentMessages,
        result.message,
      ]);
    } catch (sendError) {
      const message =
        sendError instanceof Error
          ? sendError.message
          : 'Chat Laetus 요청 중 오류가 발생했습니다.';

      setError(message);
    } finally {
      setIsSending(false);
    }
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) {
      return;
    }

    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  };

  const resetChat = () => {
    clearStoredConversationSnapshot();
    setMessages(createInitialMessages());
    setConversationId(null);
    setError(null);
    setInput('');
    setEnableThinking(false);
  };

  return (
    <AppShell>
      <section className={styles.page} aria-labelledby={'chatlaetus-title'}>
        <header className={styles.header}>
          <button
            className={styles.iconButton}
            type={'button'}
            aria-label={'포트폴리오로 돌아가기'}
            onClick={onNavigateHome}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className={styles.titleGroup}>
            <p className={styles.eyebrow}>Laetipark assistant</p>
            <h1 className={styles.title} id={'chatlaetus-title'}>
              Chat Laetus
            </h1>
          </div>
          <button
            className={styles.iconButton}
            type={'button'}
            aria-label={'대화 초기화'}
            onClick={resetChat}
          >
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
        </header>

        {!isConfigured && (
          <div className={styles.notice} role={'status'}>
            GitHub Actions secret 또는 로컬 환경 변수에 VITE_API_BASE_URL을
            설정하면 채팅을 사용할 수 있습니다.
          </div>
        )}

        <div className={styles.chatPanel}>
          <div className={styles.messageList} aria-live={'polite'}>
            {visibleMessages.map((message, index) => (
              <article
                className={`${styles.message} ${
                  message.role === 'user'
                    ? styles.userMessage
                    : styles.assistantMessage
                }`}
                key={`${message.role}-${index}-${message.content}`}
              >
                <span className={styles.messageRole}>
                  {message.role === 'user' ? 'You' : 'Laetus'}
                </span>
                <p className={styles.messageContent}>{message.content}</p>
              </article>
            ))}
            {isSending && (
              <article
                className={`${styles.message} ${styles.assistantMessage}`}
                aria-label={'응답 작성 중'}
              >
                <span className={styles.messageRole}>Laetus</span>
                <p className={styles.typing}>
                  <FontAwesomeIcon icon={faCommentDots} />
                  <span>
                    {enableThinking
                      ? '깊게 검토 중입니다.'
                      : '응답을 준비하고 있습니다.'}
                  </span>
                </p>
              </article>
            )}
            <div ref={listEndRef} />
          </div>

          {error && (
            <div className={styles.error} role={'alert'}>
              {error}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.nicknameField}>
              <label
                className={styles.inputLabel}
                htmlFor={'chatlaetus-nickname'}
              >
                닉네임
              </label>
              <input
                className={styles.nicknameInput}
                id={'chatlaetus-nickname'}
                type={'text'}
                value={clientNickname}
                maxLength={clientNicknameMaxLength}
                autoComplete={'nickname'}
                placeholder={'선택 입력'}
                disabled={isSending}
                onChange={(event) =>
                  setClientNickname(
                    event.target.value.slice(0, clientNicknameMaxLength),
                  )
                }
              />
            </div>
            <button
              className={`${styles.thinkingButton} ${
                enableThinking ? styles.thinkingButtonActive : ''
              }`}
              type={'button'}
              aria-label={'깊게 생각하기'}
              aria-pressed={enableThinking}
              title={'깊게 생각하기'}
              disabled={isSending}
              onClick={() =>
                setEnableThinking((currentValue) => !currentValue)
              }
            >
              <FontAwesomeIcon icon={faBrain} />
            </button>
            <div className={styles.messageField}>
              <label className={styles.inputLabel} htmlFor={'chatlaetus-input'}>
                메시지
              </label>
              <textarea
                className={styles.textarea}
                id={'chatlaetus-input'}
                value={input}
                rows={1}
                placeholder={
                  isConfigured
                    ? '질문을 입력하세요.'
                    : 'API 설정이 필요합니다.'
                }
                disabled={!isConfigured || isSending}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
              />
            </div>
            <button
              className={styles.sendButton}
              type={'submit'}
              disabled={!canSend}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              <span>전송</span>
            </button>
          </form>
        </div>
      </section>
    </AppShell>
  );
};
