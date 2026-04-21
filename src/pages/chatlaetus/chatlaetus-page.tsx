import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import {
  faArrowLeft,
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

const createClientSessionId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `chatlaetus-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

type ChatLaetusPageProps = {
  onNavigateHome: () => void;
};

export const ChatLaetusPage = ({ onNavigateHome }: ChatLaetusPageProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [clientSessionId] = useState(createClientSessionId);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const listEndRef = useRef<HTMLDivElement | null>(null);
  const isConfigured = hasChatLaetusApiUrl();
  const trimmedInput = input.trim();
  const canSend = isConfigured && trimmedInput.length > 0 && !isSending;

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isSending]);

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
          : 'ChatLaetus 요청 중 오류가 발생했습니다.';

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
    setMessages(initialMessages);
    setConversationId(null);
    setError(null);
    setInput('');
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
              ChatLaetus
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
            {messages.map((message, index) => (
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
                  <span>응답을 준비하고 있습니다.</span>
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
            <label className={styles.inputLabel} htmlFor={'chatlaetus-input'}>
              메시지
            </label>
            <textarea
              className={styles.textarea}
              id={'chatlaetus-input'}
              value={input}
              rows={3}
              placeholder={
                isConfigured
                  ? '프로젝트, 기술 스택, 경험에 대해 질문해보세요.'
                  : 'VITE_API_BASE_URL 설정이 필요합니다.'
              }
              disabled={!isConfigured || isSending}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
            />
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
