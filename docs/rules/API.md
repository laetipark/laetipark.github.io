# API Rules

## Environment

- 프론트엔드는 `const apiUrl = import.meta.env.VITE_API_URL;`로 API base URL을 읽는다.
- 운영 값은 GitHub Actions secret `VITE_API_URL`로 주입한다.
- 로컬 개발자는 `.env.local`에 `VITE_API_URL=https://api.laetipark.me`처럼 설정한다.

## ChatLaetus

- 기본 엔드포인트는 `POST ${apiUrl}/api/chatlaetus`이다.
- 요청 body는 아래 형태를 사용한다.

```json
{
  "message": "사용자 메시지",
  "history": [
    {
      "role": "user",
      "content": "이전 사용자 메시지"
    }
  ]
}
```

- 응답은 아래 형태를 우선 지원한다.

```json
{
  "reply": "응답 메시지"
}
```

- 백엔드가 공통 envelope를 쓰는 경우 `data.reply`, `data.message`, `data.content`도 허용한다.
- `VITE_API_URL`이 없으면 요청하지 않고 설정 필요 상태를 보여준다.
