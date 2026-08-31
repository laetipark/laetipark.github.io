# 프론트엔드 규칙

이 문서는 React/Vite 애플리케이션 구조와 구현 규칙의 정본입니다. 시각 디자인, 토큰과 접근성은 [디자인 규칙](DESIGN.md)을 함께 따릅니다.

## 기술 스택과 진입점

- React, TypeScript, Vite를 사용합니다. 정확한 버전과 명령어는 [package.json](../../package.json)을 기준으로 합니다.
- 브라우저 진입 흐름은 [index.html](../../index.html) → [src/main.tsx](../../src/main.tsx) → [src/app.tsx](../../src/app.tsx)입니다.
- `src/main.tsx`는 React 루트를 마운트하고, `src/app.tsx`는 화면 조합과 얕은 라우팅을 담당합니다.
- 절대 경로 alias가 없으므로 기존 상대 import 스타일을 유지합니다.
- 별도 라우터 라이브러리 없이 `window.history`와 `popstate`를 사용하는 현재 방식을 유지합니다.

## 현재 라우팅 계약

| 경로    | 화면        |
| ------- | ----------- |
| `/`     | 포트폴리오  |
| `/chat` | Chat Laetus |

- 경로 끝의 `/`는 정규화합니다.
- 현재 알려지지 않은 경로는 포트폴리오 화면으로 처리합니다. 404 화면이나 새 라우트를 도입한다면 이 동작을 명시적으로 함께 변경합니다.
- 새 경로를 추가할 때는 `AppRoute`, `RoutePath`, 경로 판별과 이동 로직을 한 번에 갱신합니다.
- GitHub Pages 직접 접근과 새로고침 동작은 [배포 규칙](DEPLOYMENT.md)의 라우팅 복구 계약도 확인합니다.

## 디렉터리 역할

| 경로                           | 역할                                 |
| ------------------------------ | ------------------------------------ |
| `src/common/types`             | 여러 기능에서 공유하는 타입          |
| `src/common/data`              | 포트폴리오를 포함한 공통 정적 데이터 |
| `src/common/api`               | API 타입, 직렬화, 응답 파싱          |
| `src/pages`                    | 화면 단위 컴포넌트                   |
| `src/components/common`        | 범용 공통 컴포넌트                   |
| `src/components/layout`        | 앱 레이아웃 컴포넌트                 |
| `src/components/{feature}`     | 기능 또는 섹션별 컴포넌트            |
| `src/assets/styles/components` | 컴포넌트 CSS Modules                 |
| `src/assets/styles/pages`      | 페이지 CSS Modules                   |

## 컴포넌트와 import

- 새 컴포넌트 파일명은 kebab-case, React 컴포넌트 이름은 PascalCase를 사용합니다.
- 다른 파일에서 재사용하는 컴포넌트는 named export를 기본으로 합니다. 애플리케이션 루트 `App`의 default export는 현재 진입점 계약을 위한 예외입니다.
- 파일 내부에서만 쓰는 보조 컴포넌트는 export하지 않아도 됩니다.
- 새 섹션 UI를 만들기 전에 `Section`, `RichTextLine`, `AppShell` 같은 기존 공통 컴포넌트를 먼저 검토합니다.
- 외부 링크는 `target="_blank"`와 `rel="noreferrer"`를 함께 사용합니다.

## 스타일 통합

- 컴포넌트와 페이지 스타일은 `.module.css` 파일로 분리합니다.
- CSS 클래스명은 camelCase로 작성하고 `styles.className` 형태로 참조합니다.
- 전역 토큰과 reset 성격의 스타일만 `src/common/styles/index.css`에 둡니다.
- Tailwind, styled-components 또는 다른 CSS-in-JS 방식을 새로 도입하지 않습니다.

## 상태와 브라우저 저장소

- 사용자가 직접 선택한 테마와 닉네임, 마지막 채팅 스냅샷처럼 새로고침 뒤에도 필요한 값만 `localStorage`에 저장합니다.
- 저장된 JSON은 신뢰하지 않고 타입과 필수 필드를 확인한 뒤 사용합니다.
- 저장소 접근은 제한된 브라우징 환경에서 실패할 수 있으므로 화면 전체를 중단시키지 않게 처리합니다.
- 서버 응답에 의존하는 UI는 로딩, 성공, 오류와 설정 누락 상태를 모두 제공합니다.
- Chat Laetus의 구체적인 저장 필드와 네트워크 계약은 [API 규칙](API.md)을 따릅니다.

## 검증

- 개발 중 타입만 빠르게 확인할 때는 `npm run typecheck`를 사용합니다.
- TypeScript, React hook 또는 import를 변경했다면 `npm run lint`를 실행합니다.
- 코드 변경의 최종 검증은 `npm run build`로 타입 검사와 운영 번들 생성을 확인합니다.
- 라우팅을 변경했다면 `/`, `/chat`, 뒤로 가기와 새로고침을 관련 환경에서 확인합니다.
- 문서만 변경한 경우 빌드는 생략할 수 있습니다.
