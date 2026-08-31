# Laetipark

박동훈의 개발 경험과 프로젝트를 소개하고 **Chat Laetus**를 제공하는 개인 포트폴리오입니다.

[포트폴리오 보기](https://laetipark.github.io/) · [Chat Laetus 열기](https://laetipark.github.io/chat)

## 주요 기능

- 프로젝트, 기술, 학력과 활동을 한 페이지에서 확인하는 반응형 포트폴리오
- Escape로 닫을 수 있는 프로젝트 상세 모달
- 시스템 설정을 기본값으로 사용하고 선택을 저장하는 라이트·다크 테마
- 텍스트와 이미지 첨부, 깊게 생각하기 옵션으로 심층 응답을 요청하는 Chat Laetus
- `/chat` 직접 접근을 복구하는 GitHub Pages용 SPA 라우팅

## 기술 구성

| 영역         | 기술                          |
| ------------ | ----------------------------- |
| 애플리케이션 | React 19, TypeScript, Vite    |
| 스타일       | CSS Modules, 전역 디자인 토큰 |
| 아이콘       | Font Awesome                  |
| 품질 검사    | TypeScript, ESLint            |
| 코드 형식    | Prettier                      |
| 배포         | GitHub Actions, GitHub Pages  |

## 로컬 실행

Node.js 24와 npm이 필요합니다.

```bash
npm ci
npm run dev
```

개발 서버가 출력한 주소에서 포트폴리오를 확인할 수 있습니다. Chat Laetus 백엔드는 이 저장소에 포함되지 않으므로, 채팅까지 사용하려면 `.env.example`을 참고해 `.env.local`에 계약과 호환되는 별도 API 주소를 설정합니다.

```dotenv
VITE_API_BASE_URL=https://your-api.example.com
```

이 값이 없어도 포트폴리오는 동작하며 Chat Laetus의 메시지·이미지 전송 기능만 비활성화됩니다. `VITE_` 접두사가 붙은 값은 브라우저 번들에 포함되므로 비밀키를 넣지 않습니다. 자세한 계약은 [Chat Laetus API 규칙](docs/rules/API.md)을 확인합니다.

## 명령어

| 명령어              | 용도                          |
| ------------------- | ----------------------------- |
| `npm run dev`       | 개발 서버 실행                |
| `npm run typecheck` | TypeScript 타입 검사          |
| `npm run lint`      | ESLint 검사                   |
| `npm run build`     | 타입 검사 후 운영 번들 생성   |
| `npm run preview`   | 생성한 `dist/` 번들 미리 보기 |

## 프로젝트 구조

```text
src/
├── common/       # API, 데이터, 전역 스타일, 공통 타입
├── components/   # 공통·레이아웃·기능별 컴포넌트
├── pages/        # 화면 단위 컴포넌트
└── assets/       # 이미지와 CSS Modules
public/           # 정적 자산과 GitHub Pages 404 복구 문서
docs/             # 작업 하네스와 프로젝트 규칙 정본
```

구현이나 문서를 변경하기 전에는 [프로젝트 작업 가이드](docs/README.md)에서 작업에 맞는 규칙 문서를 선택해 읽습니다.

## Chat Laetus 데이터 안내

입력한 메시지와 첨부 이미지, 클라이언트 세션 ID, 응답 뒤 이어지는 대화 ID와 선택 입력한 닉네임은 설정된 API로 전송됩니다. 닉네임과 마지막 대화 스냅샷은 대화를 이어 갈 수 있도록 브라우저 `localStorage`에 저장됩니다.

대화 초기화는 브라우저의 마지막 대화 스냅샷만 삭제하고 닉네임과 서버 데이터를 삭제하지 않습니다.

서버의 저장 범위와 보관 기간은 이 프론트엔드 저장소에서 정의하지 않습니다. 민감한 개인정보는 입력하지 않는 것을 권장합니다.

## 배포

`main` 브랜치에 push하면 [GitHub Actions 워크플로](.github/workflows/deploy.yml)가 의존성 설치와 빌드를 거쳐 GitHub Pages에 배포합니다. 운영 채팅 API 주소는 저장소 secret `VITE_API_BASE_URL`로 주입합니다.

배포 경로와 SPA 라우팅 제약은 [배포 규칙](docs/rules/DEPLOYMENT.md)을 따릅니다.

## 연락처

- GitHub: [@laetipark](https://github.com/laetipark)
- 기술 블로그: [blex.me/@laetipark](https://blex.me/@laetipark)
- 이메일: [creator98@naver.com](mailto:creator98@naver.com)
