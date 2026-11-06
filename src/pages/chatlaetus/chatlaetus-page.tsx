import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  faArrowLeft,
  faBrain,
  faCommentDots,
  faPaperclip,
  faPaperPlane,
  faRotateLeft,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  hasChatLaetusApiUrl,
  sendChatLaetusMessage,
} from '../../common/api/chatlaetus';
import type {
  ChatImageAttachment,
  ChatMessage,
} from '../../common/api/chatlaetus';
import { AppShell } from '../../components/layout/app-shell';

import styles from '../../assets/styles/pages/chatlaetus-page.module.css';

const initialMessages: ChatMessage[] = [
  {
    role: 'assistant',
    content: '안녕하세요. 궁금한 점을 질문하거나 이미지를 첨부해 주세요.',
  },
];

const clientNicknameStorageKey = 'chatlaetus-client-nickname';
const lastConversationStorageKey = 'chatlaetus-last-conversation-v1';
const clientNicknameMaxLength = 80;
const maxImageCount = 4;
const maxImageSizeBytes = 5 * 1024 * 1024;
const maxImagePayloadCharacters = 12_000_000;

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

const toStoredImageAttachment = (
  value: unknown,
): ChatImageAttachment | null => {
  if (!isRecord(value)) {
    return null;
  }

  const { id, name, mimeType, dataUrl } = value;

  if (
    typeof mimeType !== 'string' ||
    !mimeType.startsWith('image/') ||
    typeof dataUrl !== 'string' ||
    !dataUrl.startsWith('data:image/')
  ) {
    return null;
  }

  return {
    id: typeof id === 'string' && id.trim() ? id : undefined,
    name: typeof name === 'string' && name.trim() ? name : undefined,
    mimeType,
    dataUrl,
  };
};

const toStoredChatMessage = (value: unknown): ChatMessage | null => {
  if (!isRecord(value)) {
    return null;
  }

  const { role, content, id, createdAt, images } = value;

  if (
    (role !== 'user' && role !== 'assistant') ||
    typeof content !== 'string' ||
    !content.trim()
  ) {
    return null;
  }

  const storedImages = Array.isArray(images)
    ? images
        .map(toStoredImageAttachment)
        .filter((image): image is ChatImageAttachment => image !== null)
    : [];

  return {
    role,
    content,
    ...(storedImages.length > 0 ? { images: storedImages } : {}),
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
      window.localStorage
        .getItem(clientNicknameStorageKey)
        ?.slice(0, clientNicknameMaxLength) ?? ''
    );
  } catch {
    return '';
  }
};

const readImageFile = (file: File): Promise<ChatImageAttachment> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('이미지를 읽을 수 없습니다.'));
        return;
      }

      resolve({
        id: `${file.name}-${file.lastModified}-${file.size}`,
        name: file.name,
        mimeType: file.type,
        dataUrl: reader.result,
      });
    });
    reader.addEventListener('error', () => {
      reject(new Error('이미지를 읽는 중 오류가 발생했습니다.'));
    });
    reader.readAsDataURL(file);
  });

const getImagePayloadLength = (images: ChatImageAttachment[]): number =>
  images.reduce((totalLength, image) => totalLength + image.dataUrl.length, 0);

const estimateDataUrlLength = (file: File): number =>
  Math.ceil(file.size / 3) * 4 + 128;

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
  const [clientNickname, setClientNickname] = useState(
    readStoredClientNickname,
  );
  const [input, setInput] = useState('');
  const [selectedImages, setSelectedImages] = useState<ChatImageAttachment[]>(
    [],
  );
  const [enableThinking, setEnableThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const listEndRef = useRef<HTMLDivElement | null>(null);
  const isConfigured = hasChatLaetusApiUrl();
  const trimmedInput = input.trim();
  const hasSendableContent =
    trimmedInput.length > 0 || selectedImages.length > 0;
  const canSend = isConfigured && hasSendableContent && !isSending;
  const visibleMessages = getVisibleMessages(messages);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    listEndRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'instant' : 'smooth',
      block: 'end',
    });
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
      content: trimmedInput || '이미지를 첨부했습니다.',
      ...(selectedImages.length > 0 ? { images: selectedImages } : {}),
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput('');
    setSelectedImages([]);
    setError(null);
    setIsSending(true);

    try {
      const result = await sendChatLaetusMessage({
        message: userMessage.content,
        conversationId,
        clientSessionId,
        clientNickname,
        images: userMessage.images,
        enableThinking,
      });

      setConversationId(result.conversationId);
      setMessages((currentMessages) => [...currentMessages, result.message]);
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

  const handleImageInputChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';

    if (files.length === 0) {
      return;
    }

    const remainingSlotCount = maxImageCount - selectedImages.length;
    const imageFiles = files
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, remainingSlotCount);
    const oversizedFiles = files.filter(
      (file) => file.type.startsWith('image/') && file.size > maxImageSizeBytes,
    );
    const validSizeFiles = imageFiles.filter(
      (file) => file.size <= maxImageSizeBytes,
    );
    const remainingPayloadCharacters =
      maxImagePayloadCharacters - getImagePayloadLength(selectedImages);
    let nextPayloadCharacters = 0;
    const validFiles = validSizeFiles.filter((file) => {
      nextPayloadCharacters += estimateDataUrlLength(file);

      return nextPayloadCharacters <= remainingPayloadCharacters;
    });

    if (remainingSlotCount <= 0) {
      setError(`이미지는 최대 ${maxImageCount}개까지 첨부할 수 있습니다.`);
      return;
    }

    if (validFiles.length === 0) {
      setError(
        imageFiles.length === 0
          ? '이미지 파일만 첨부할 수 있습니다.'
          : oversizedFiles.length > 0
            ? '이미지는 파일당 5MB 이하만 첨부할 수 있습니다.'
            : '이미지는 총 12MB 이하로 첨부할 수 있습니다.',
      );
      return;
    }

    try {
      const images = await Promise.all(validFiles.map(readImageFile));
      setSelectedImages((currentImages) => [...currentImages, ...images]);
      setError(
        files.length > validFiles.length || oversizedFiles.length > 0
          ? `이미지는 최대 ${maxImageCount}개, 파일당 5MB 이하만 첨부됩니다.`
          : null,
      );
    } catch (readError) {
      setError(
        readError instanceof Error
          ? readError.message
          : '이미지를 읽는 중 오류가 발생했습니다.',
      );
    }
  };

  const removeSelectedImage = (imageId: string | undefined, index: number) => {
    setSelectedImages((currentImages) =>
      currentImages.filter(
        (image, currentIndex) =>
          currentIndex !== index || (imageId && image.id !== imageId),
      ),
    );
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key !== 'Enter' ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    ) {
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
    setSelectedImages([]);
    setEnableThinking(false);
  };

  return (
    <AppShell variant={'chat'}>
      <section className={styles.page} aria-labelledby={'chatlaetus-title'}>
        <header className={styles.header}>
          <button
            className={styles.iconButton}
            type={'button'}
            aria-label={'포트폴리오로 돌아가기'}
            onClick={onNavigateHome}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className={styles.headerButtonLabel}>포트폴리오</span>
          </button>
          <div className={styles.titleGroup}>
            <p className={styles.eyebrow}>LAETIPARK / ASSISTANT</p>
            <h1 className={styles.title} id={'chatlaetus-title'}>
              Chat Laetus
            </h1>
          </div>
          <button
            className={styles.iconButton}
            type={'button'}
            aria-label={'대화 초기화'}
            disabled={isSending}
            onClick={resetChat}
          >
            <FontAwesomeIcon icon={faRotateLeft} />
            <span className={styles.headerButtonLabel}>대화 초기화</span>
          </button>
        </header>

        {!isConfigured && (
          <div className={styles.notice} role={'status'}>
            <strong>지금은 채팅을 사용할 수 없습니다.</strong>
            <span>잠시 후 다시 방문하거나 포트폴리오를 둘러보세요.</span>
          </div>
        )}

        <div className={styles.chatPanel}>
          <div
            className={styles.messageList}
            aria-label={'최근 질문과 응답'}
            aria-live={'polite'}
          >
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
                  {message.role === 'user' ? '나' : 'Laetus'}
                </span>
                {message.images && message.images.length > 0 && (
                  <div className={styles.messageImages}>
                    {message.images.map((image, imageIndex) => (
                      <img
                        className={styles.messageImage}
                        key={`${image.id ?? image.name ?? image.mimeType}-${imageIndex}`}
                        src={image.dataUrl}
                        alt={image.name ?? '첨부 이미지'}
                      />
                    ))}
                  </div>
                )}
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
            {selectedImages.length > 0 && (
              <div
                className={styles.attachmentTray}
                aria-label={'첨부할 이미지'}
              >
                {selectedImages.map((image, index) => (
                  <div
                    className={styles.attachmentPreview}
                    key={`${image.id ?? image.name ?? image.mimeType}-${index}`}
                  >
                    <img
                      src={image.dataUrl}
                      alt={image.name ?? '첨부 이미지'}
                    />
                    <button
                      className={styles.removeAttachmentButton}
                      type={'button'}
                      aria-label={`${image.name ?? `이미지 ${index + 1}`} 첨부 제거`}
                      disabled={isSending}
                      onClick={() => removeSelectedImage(image.id, index)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.messageField}>
              <div className={styles.messageLabelRow}>
                <label
                  className={styles.inputLabel}
                  htmlFor={'chatlaetus-input'}
                >
                  메시지
                </label>
                <span className={styles.inputHint} id={'chatlaetus-input-hint'}>
                  Enter 전송 · Shift+Enter 줄바꿈
                </span>
              </div>
              <textarea
                className={styles.textarea}
                id={'chatlaetus-input'}
                aria-describedby={
                  'chatlaetus-input-hint chatlaetus-storage-note'
                }
                value={input}
                rows={2}
                placeholder={
                  isConfigured
                    ? '질문을 입력하거나 이미지를 첨부하세요.'
                    : '채팅을 사용할 수 있게 되면 여기에 입력할 수 있어요.'
                }
                disabled={!isConfigured || isSending}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
              />
            </div>
            <div className={styles.toolbar}>
              <label
                className={`${styles.attachButton} ${
                  selectedImages.length > 0 ? styles.attachButtonActive : ''
                } ${!isConfigured || isSending ? styles.controlDisabled : ''}`}
              >
                <FontAwesomeIcon icon={faPaperclip} />
                <span>이미지 첨부</span>
                <input
                  className={styles.fileInput}
                  type={'file'}
                  accept={'image/*'}
                  aria-label={'이미지 첨부'}
                  multiple
                  disabled={!isConfigured || isSending}
                  onChange={handleImageInputChange}
                />
              </label>
              <button
                className={`${styles.thinkingButton} ${
                  enableThinking ? styles.thinkingButtonActive : ''
                }`}
                type={'button'}
                aria-pressed={enableThinking}
                disabled={isSending}
                onClick={() =>
                  setEnableThinking((currentValue) => !currentValue)
                }
              >
                <FontAwesomeIcon icon={faBrain} />
                <span>깊게 생각하기</span>
              </button>
              <button
                className={styles.sendButton}
                type={'submit'}
                disabled={!canSend}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                <span>전송</span>
              </button>
            </div>
            <div className={styles.nicknameField}>
              <label
                className={styles.inputLabel}
                htmlFor={'chatlaetus-nickname'}
              >
                닉네임 <span className={styles.optionalLabel}>(선택)</span>
              </label>
              <input
                className={styles.nicknameInput}
                id={'chatlaetus-nickname'}
                type={'text'}
                value={clientNickname}
                maxLength={clientNicknameMaxLength}
                autoComplete={'nickname'}
                placeholder={'어떻게 불러드릴까요?'}
                disabled={isSending}
                onChange={(event) =>
                  setClientNickname(
                    event.target.value.slice(0, clientNicknameMaxLength),
                  )
                }
              />
            </div>
            <p className={styles.storageNote} id={'chatlaetus-storage-note'}>
              메시지와 이미지는 응답 생성을 위해 전송되며, 마지막 대화는 이
              브라우저에 저장됩니다.
            </p>
          </form>
        </div>
      </section>
    </AppShell>
  );
};
