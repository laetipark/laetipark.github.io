# 프론트엔드 규칙

[작업 가이드](../README.md) · [저장소 소개](../../README.md)

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

## 포트폴리오 데이터와 공통 인터페이스

프로필·학습·기술·이력은 [포트폴리오 데이터](../../src/common/data/portfolio.ts), 프로젝트 목록은 아래 데이터 모듈, 공유 타입은 [포트폴리오 타입](../../src/common/types/portfolio.ts)에 둡니다. 컴포넌트 안에 같은 문장이나 기술 목록을 중복하지 않습니다.

| 데이터 모듈                                                            | 역할                                                                          |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [project-catalog.ts](../../src/common/data/project-catalog.ts)         | 프로젝트 배열의 조합·순서, Brawl Tree·Sexynogi·UNINOTE·산등성이·Blossom Stats |
| [project-services.ts](../../src/common/data/project-services.ts)       | Orsem·Mystery Mango·Chat Laetus 서비스 소개                                   |
| [project-experiments.ts](../../src/common/data/project-experiments.ts) | 돈이머니·여기가자·피드모아 API와 Gowatch·Blossom Bot 소개                     |

`portfolio.ts`가 조합된 `projects`를 다시 export합니다. 목록·필터 개수·상세 모달은 이 배열을 함께 사용하며 별도 목록을 중복 유지하지 않습니다.

| 인터페이스                                                                           | 역할                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| `PortfolioProject.summary: string`                                                   | 프로젝트 목록에서 바로 읽는 한 문장 소개                      |
| `PortfolioProject.highlights: TextLine[]`                                            | 기존 설명에서 추출한 핵심 구현 경험                           |
| `PortfolioProject.category`                                                          | `web`, `app`, `backend`, `bot` 중 하나로 분류                 |
| `PortfolioProject.featured?: boolean`                                                | 대표 프로젝트 행으로 강조할 항목 선택                         |
| `PortfolioProject.period?: string` · `role?: string`                                 | 근거가 확인된 기간과 개인 담당 역할만 표시                    |
| `PortfolioProject.image?: string` · `imageAlt?: string` · `imageCaption?: string`    | 실제 자산과 대체 텍스트, 화면·로고·ERD·목업 종류 설명         |
| `PortfolioProject.banner?: string` · `bannerAlt?: string` · `bannerCaption?: string` | 카드에서 우선 표시할 프로젝트 배너와 대체 텍스트·출처 설명    |
| `PortfolioProject.story: ProjectStorySection[]`                                      | 제목과 `lines: TextLine[]`로 구분한 개발 배경·접근·구현 설명  |
| `PortfolioProject.links: ProjectLink[]`                                              | 서비스·소스 등 여러 링크의 `label`, `href`, 선택적 `external` |
| `SkillGroup.items: string[]`                                                         | 외부 이미지 요청 없이 렌더링하는 기술 이름 목록               |
| `Section.id?: string`                                                                | 같은 페이지 안에서 이동할 수 있는 안정적인 앵커               |
| `AppShell.variant?: 'portfolio' \| 'chat'`                                           | 기본 포트폴리오 배치와 채팅 전용 여백·높이의 구분             |
| `ProjectSection.onOpenChat: () => void`                                              | 프로젝트의 `/chat` 링크를 기존 앱 이동 함수에 연결            |

- 포트폴리오 탐색은 `projects`, `about`, `skills`, `history` 앵커를 사용합니다. 앵커를 바꾸면 해당 링크와 섹션 ID를 함께 갱신합니다.
- 프로젝트의 `bullets`, `facts`, `story`는 상세 설명에 사용합니다. 요약을 편집할 때 기간·상태·서비스 URL과 기존 사실을 임의로 변경하지 않습니다. 확인되지 않은 선택 필드는 비워 두고 화면에서 생략합니다.
- 분야별 필터는 `category`를 사용하고, 선택 상태는 `aria-pressed`, 결과 개수는 `aria-live`로 알립니다. 필터 결과 안에서도 `featured` 항목을 먼저 보여줍니다.
- `links`의 외부 링크는 새 탭과 `noreferrer`를 사용합니다. `external: false`인 `/chat`의 일반 클릭은 `onOpenChat`으로 처리하고 수정키 조합·중간 클릭은 브라우저 기본 동작을 유지합니다.
- 이미지가 있으면 내용에 맞는 `imageAlt`와 종류·출처를 설명하는 `imageCaption`을 함께 제공합니다. 자산과 소개의 근거는 [프로젝트 근거 자료](../design/project-sources.md)에 기록합니다.
- 카드는 `banner`를 우선 사용하고 없으면 `image`를 사용합니다. 배너에는 별도의 `bannerAlt`·`bannerCaption`을 사용해 상세 이미지의 설명이 섞이지 않게 합니다.
- 모달은 배너와 상세 이미지를 구분해 보여주고, 두 필드가 같은 원본 경로면 한 번만 표시합니다. 각 이미지의 원본 크게 보기 링크를 유지합니다.
- 테마, 모달, 채팅의 구체적인 화면 동작은 [디자인 규칙](DESIGN.md)을 따릅니다.

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
