# API Rules

이 문서는 Chat Laetus API 연결 계약의 정본이다.
API를 사용하는 화면 구현 규칙은 `docs/rules/FRONTEND.md`를 함께 따른다.

## Environment

- 프론트엔드는 `const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;`로 API base URL을 읽는다.
- 운영 값은 GitHub Actions secret `VITE_API_BASE_URL`로 주입한다.
- 로컬 개발자는 `.env.local`에 `VITE_API_BASE_URL=https://api.laetipark.me`처럼 설정한다.

## Request

- 기본 엔드포인트는 `POST ${apiBaseUrl}/chat/messages`이다.
- 요청 body는 아래 형태를 사용한다.

```json
{
  "message": "사용자 메시지",
  "conversationId": "기존 대화 UUID",
  "clientSessionId": "브라우저 세션 식별자",
  "images": [
    {
      "mimeType": "image/png",
      "dataUrl": "data:image/png;base64,..."
    }
  ],
  "enableThinking": true
}
```

- `conversationId`는 첫 메시지에는 보내지 않고, 응답으로 받은 값을 다음 메시지부터 보낸다.
- `clientSessionId`는 선택값이지만 브라우저 세션마다 안정적으로 유지한다.
- `images`는 선택값이며 이미지 첨부가 있을 때만 보낸다. 프론트는 최대 4개, 파일당 5MB 이하의 `image/*` 파일을 data URL로 변환해 전송한다.
- `enableThinking`은 선택값이다. 기본 빠른 응답에서는 보내지 않고, 사용자가 "깊게 생각하기"를 켰을 때만 `true`를 보낸다.
- 기존 선택값인 `clientNickname`, `temperature`, `topP`, `maxTokens`는 호환성을 유지한다.
- `model`, `topK`, `minP`, `reasoningFormat`은 프론트에서 노출하지 않고 백엔드 환경변수로만 관리한다.

## Response

- 응답은 아래 형태를 우선 지원한다.

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

- 백엔드가 공통 envelope를 쓰는 경우 `data.message.content`, `data.reply`, `data.message`, `data.content`도 허용한다.

## Error State

- 오류 응답은 `success: false`, `statusCode`, `message`, `path`, `timestamp` 형태를 우선 지원한다.
- `VITE_API_BASE_URL`이 없으면 요청하지 않고 설정 필요 상태를 보여준다.
