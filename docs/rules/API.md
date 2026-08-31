# Chat Laetus API 규칙

이 문서는 포트폴리오 프론트엔드가 사용하는 Chat Laetus API 클라이언트 계약의 정본입니다. 백엔드 내부 설정과 데이터 보관 정책은 이 저장소의 범위가 아닙니다. 화면과 상태 구현은 [프론트엔드 규칙](FRONTEND.md)을 함께 따릅니다.

## 관련 구현

- 로컬 환경 변수 예시: [.env.example](../../.env.example)
- 요청 직렬화와 응답 파싱: [src/common/api/chatlaetus.ts](../../src/common/api/chatlaetus.ts)
- 입력 제한과 브라우저 저장: [src/pages/chatlaetus/chatlaetus-page.tsx](../../src/pages/chatlaetus/chatlaetus-page.tsx)
- 운영 변수 주입: [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml)

## 환경 변수

- API base URL은 `import.meta.env.VITE_API_BASE_URL`에서 읽고 요청 전에 끝의 `/`를 제거합니다.
- 로컬에서는 `.env.local`에 `VITE_API_BASE_URL=https://api.example.com` 형태로 설정합니다.
- 값이 없거나 빈 문자열이면 네트워크 요청을 보내지 않고 채팅 설정 필요 상태를 표시합니다. 포트폴리오의 나머지 기능은 계속 동작해야 합니다.
- 운영 빌드는 GitHub Actions의 `VITE_API_BASE_URL` secret을 같은 이름의 빌드 환경 변수로 주입합니다.
- `VITE_` 변수는 빌드 결과에 공개됩니다. 인증 토큰이나 비밀키를 넣지 말고 브라우저에 노출되어도 되는 API 주소만 사용합니다.

## 요청

기본 엔드포인트는 `POST ${VITE_API_BASE_URL}/chat/messages`이며 `Content-Type: application/json`을 사용합니다.

```json
{
  "message": "사용자 메시지",
  "clientSessionId": "클라이언트 대화 식별자",
  "conversationId": "기존 대화 UUID",
  "clientNickname": "선택 닉네임",
  "images": [
    {
      "mimeType": "image/png",
      "dataUrl": "data:image/png;base64,..."
    }
  ],
  "enableThinking": true
}
```

| 필드                               | 전송 조건과 제약                                                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `message`                          | 항상 전송합니다. 이미지 전용 입력이면 UI가 `이미지를 첨부했습니다.`를 사용합니다.                                                                                         |
| `clientSessionId`                  | 항상 전송합니다. 복원할 스냅샷이 없으면 페이지 상태 초기화 시 생성하고, 저장된 대화에서는 기존 값을 이어 씁니다. 같은 화면에서 대화만 초기화할 때는 다시 만들지 않습니다. |
| `conversationId`                   | 첫 요청에서는 생략하고, 응답에서 받은 뒤 다음 요청부터 전송합니다.                                                                                                        |
| `clientNickname`                   | 사용자가 입력한 경우만 최대 80자까지 전송합니다.                                                                                                                          |
| `images`                           | 첨부가 있을 때만 `mimeType`과 `dataUrl`을 전송합니다. `image/*`만 허용합니다.                                                                                             |
| `enableThinking`                   | 사용자가 깊게 생각하기를 켰을 때만 `true`를 전송합니다.                                                                                                                   |
| `temperature`, `topP`, `maxTokens` | API 클라이언트가 유한한 숫자에 한해 지원하는 호환 필드이며 현재 화면에서는 전송하지 않습니다.                                                                             |

이미지 입력은 화면에서 최대 4개, 파일당 5MB 이하로 제한합니다. 선택된 이미지의 인코딩된 data URL 합계도 12,000,000자를 넘기지 않습니다. API 모듈은 `data:image/` URL과 `image/` MIME type이 아닌 항목을 다시 걸러냅니다.

이 표에 없는 모델 또는 추론 설정을 프론트엔드에서 임의로 추가하지 않습니다. 새 필드가 필요하면 백엔드 계약을 확인하고 타입, 직렬화, UI와 이 문서를 함께 갱신합니다.

## 응답

우선 지원하는 응답은 아래 형태입니다.

```json
{
  "conversationId": "대화 UUID",
  "model": "모델명",
  "latencyMs": 1234,
  "message": {
    "id": "메시지 UUID",
    "role": "assistant",
    "content": "응답 메시지",
    "createdAt": "2026-04-22T00:00:00.000Z"
  }
}
```

- 응답 메시지는 비어 있지 않은 문자열이어야 합니다.
- 응답 문자열은 현재 객체의 `reply` → 문자열 `message` → `content` 순서로 찾은 뒤, 객체 `message`와 `data` 내부를 같은 방식으로 재귀 탐색합니다. 따라서 기본 응답의 `message.content`도 허용합니다.
- `conversationId`는 최상위 또는 `data` 내부에서 읽고, 없으면 기존 ID를 유지합니다.
- `message.id`, `message.role`, `message.createdAt`은 화면 메시지 메타데이터로 보존합니다.
- `model`과 `latencyMs`는 응답에 있어도 현재 UI 상태에는 보존하지 않습니다.
- 성공 상태인데 메시지 문자열을 찾을 수 없으면 파싱 오류로 처리합니다.

## 오류 처리

- 성공과 실패는 HTTP 상태의 `response.ok`로 판정합니다. 백엔드는 오류를 반드시 적절한 non-2xx 상태로 반환해야 하며, HTTP 2xx의 `success: false`만으로는 실패로 인식되지 않습니다.
- non-2xx 본문의 `message` 문자열 또는 문자열 배열, `error` 문자열이나 중첩 오류 메시지를 우선 표시합니다.
- JSON이 아닌 텍스트 응답은 메시지 문자열로 처리합니다.
- 오류 메시지를 찾지 못하면 HTTP 상태 코드를 포함한 기본 문구를 표시합니다.
- API 주소가 누락된 오류는 fetch 전에 발생시키고 설정 안내 상태로 연결합니다.

## 브라우저 저장 데이터

- 닉네임은 `chatlaetus-client-nickname` 키에 최대 80자로 저장합니다.
- 마지막 대화는 `chatlaetus-last-conversation-v1` 키에 `conversationId`, `clientSessionId`, 메시지, 첨부 이미지 data URL과 갱신 시각을 저장합니다.
- 저장된 값은 읽을 때 타입과 이미지 URL 형식을 검증하며, 손상됐거나 사용자 메시지가 없는 스냅샷은 복원하지 않습니다.
- 대화 초기화는 마지막 대화 스냅샷을 삭제하지만 닉네임은 유지합니다.
- 메시지와 이미지는 설정된 API에도 전송됩니다. 이 저장소는 서버의 보관 기간이나 삭제 정책을 정의하지 않으므로 문서에서 확인되지 않은 정책을 단정하지 않습니다.

## 검증

- API 주소가 없는 상태와 정상 설정 상태를 각각 확인합니다.
- 텍스트 전용, 이미지 전용, 이미지 제한 초과와 깊게 생각하기 요청을 확인합니다.
- 기본 응답, 허용한 호환 응답, non-2xx 오류와 메시지 누락 응답을 확인합니다.
- 새로고침 뒤 대화 복원과 대화 초기화를 확인합니다.
- 타입이나 직렬화를 바꾼 뒤 `npm run lint`와 `npm run build`를 실행합니다.
