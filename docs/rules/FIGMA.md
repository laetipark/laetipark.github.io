# Figma Design System Rules

이 문서는 Figma MCP로 받은 디자인을 Laetipark 포트폴리오 코드에 구현할 때 따르는 규칙이다.

## Required Flow

1. Figma 구현 작업 전 `docs/README.md`, `docs/rules/FRONTEND.md`, `docs/rules/DESIGN.md`, 이 문서를 읽는다.
2. Figma MCP에서 정확한 노드의 구조 정보를 먼저 가져온다.
3. 구조 정보가 너무 크거나 잘리면 메타데이터로 노드 범위를 좁힌 뒤 필요한 노드만 다시 가져온다.
4. 구현 대상의 스크린샷을 함께 확인한 뒤 코드 변경을 시작한다.
5. Figma 출력이 React + Tailwind 형태여도 최종 코드는 이 프로젝트의 React, TypeScript, CSS Module 규칙으로 옮긴다.
6. 구현 후 `npm run build`로 타입과 번들 검증을 수행한다.

## Stack

- React 19, TypeScript, Vite를 사용한다.
- 라우터 라이브러리는 사용하지 않고 `src/app.tsx`의 `window.history` 기반 얕은 라우팅 패턴을 유지한다.
- 공통 데이터는 `src/common/data`, 공통 타입은 `src/common/types`, API 호출은 `src/common/api`, 화면 단위는 `src/pages`에 둔다.
- 절대 경로 alias가 없으므로 기존 상대 import 스타일을 따른다.

## Component Organization

- 공통 컴포넌트는 `src/components/common`에 둔다.
- 레이아웃 컴포넌트는 `src/components/layout`에 둔다.
- 기능/섹션별 컴포넌트는 `src/components/{feature}`에 둔다.
- 페이지 전용 화면은 `src/pages/{page-name}`에 둔다.
- 새 컴포넌트 파일명은 기존처럼 kebab-case를 사용하고, 컴포넌트 export 이름은 PascalCase named export를 사용한다.
- 재사용 가능한 섹션 UI는 `Section` 같은 기존 공통 컴포넌트를 먼저 검토한 뒤 확장한다.

## Styling

- 스타일은 CSS Module을 사용하고, 파일은 `src/assets/styles/components` 또는 `src/assets/styles/pages`에 둔다.
- 전역 스타일과 토큰은 `src/common/styles/index.css`에 정의한다.
- CSS 클래스명은 camelCase로 작성하고 `styles.className` 형태로 참조한다.
- Tailwind, styled-components, CSS-in-JS를 새로 도입하지 않는다.
- 카드 반경은 기존처럼 8px 이하를 기본으로 한다.
- 카드 안에 장식용 카드를 중첩하지 않는다.

## Design Tokens

- 색상, 배경, 테두리, 그림자 토큰은 `src/common/styles/index.css`의 CSS 변수로 정의한다.
- 라이트/다크 모드는 같은 토큰 이름을 공유하고 `:root[data-theme='dark']`에서 값을 바꾼다.
- IMPORTANT: 컴포넌트 CSS에서 hex, rgba 색상을 직접 늘리지 말고 가능한 `var(--*)` 토큰을 사용한다.
- IMPORTANT: 새 색상이 필요하면 라이트와 다크 값을 함께 추가하고, 한 가지 색 계열에 치우치지 않게 조정한다.
- 기존 주요 토큰:
  - 배경: `--page-bg`, `--page-top-bg`, `--surface-bg`, `--surface-strong-bg`, `--surface-muted-bg`, `--surface-elevated-bg`
  - 텍스트: `--text-main`, `--text-muted`
  - 브랜드/상태: `--brand`, `--brand-dark`, `--accent`, `--danger-bg`, `--danger-text`, `--success-bg`
  - 선/오버레이/그림자: `--border`, `--border-strong`, `--overlay-bg`, `--shadow-soft`, `--shadow-card`, `--shadow-floating`
  - 버튼: `--button-primary-bg`, `--button-primary-hover-bg`, `--button-primary-text`

## Layout And Responsiveness

- 첫 화면은 포트폴리오 본문이어야 하며 별도 마케팅형 랜딩 페이지로 바꾸지 않는다.
- 전체 폭과 여백은 `src/assets/styles/app.module.css`의 `width: min(...)`, `padding`, `gap` 패턴을 따른다.
- 고정 형식 요소에는 `aspect-ratio`, `min-width: 0`, `flex-wrap`, `grid-template-columns` 같은 안정적인 제약을 둔다.
- 반응형 분기는 기존처럼 `@media (min-width: 768px)` 또는 `@media (min-width: 1024px)` 중심으로 작성한다.
- 모바일과 데스크톱에서 텍스트가 버튼, 카드, 모달 밖으로 넘치지 않게 한다.

## Icons And Assets

- 아이콘은 이미 설치된 Font Awesome 패키지를 사용한다.
- 아이콘 import는 `@fortawesome/free-solid-svg-icons`, 브랜드 아이콘은 `@fortawesome/free-brands-svg-icons`에서 가져오고 `FontAwesomeIcon`으로 렌더링한다.
- IMPORTANT: Figma 구현만을 위해 새 아이콘 패키지를 설치하지 않는다.
- 프로젝트 이미지 자산은 `src/assets`에 두고 import해서 사용한다.
- favicon, 정적 HTML, 공개 SVG처럼 빌드 변환이 필요 없는 공개 자산은 `public`에 둔다.
- Figma MCP가 localhost 이미지나 SVG 소스를 제공하면 placeholder를 만들지 말고 해당 소스를 직접 사용하거나 필요한 경우 프로젝트 자산 위치로 옮긴다.

## Accessibility And Interaction

- 버튼에는 `type="button"`을 명시하고, 아이콘만 있는 버튼에는 `aria-label`을 제공한다.
- 외부 링크는 `target="_blank"`와 `rel="noreferrer"`를 같이 사용한다.
- 포커스 가능한 요소는 전역 `:focus-visible` 스타일이 보이도록 유지한다.
- 모달은 `role="dialog"`, `aria-modal="true"`, 제목 연결, Escape 닫기, backdrop 닫기 패턴을 유지한다.
- 테마처럼 사용자가 직접 선택한 값은 `localStorage`에 저장한다.
- 서버 응답에 의존하는 UI는 로딩, 성공, 오류, 설정 누락 상태를 모두 제공한다.

## Figma Translation Rules

- Figma MCP 출력은 최종 코드가 아니라 디자인 구조와 의도를 설명하는 참고 자료로 취급한다.
- Figma의 색상은 가장 가까운 `src/common/styles/index.css` 토큰으로 매핑한다.
- Figma의 spacing 값은 기존 4px 계열 간격과 현재 CSS의 `gap`, `padding` 패턴에 맞춰 조정한다.
- Figma의 카드, 칩, 버튼, 모달은 기존 `project-section`, `profile-hero`, `theme-toggle` 스타일 패턴을 먼저 재사용한다.
- 새 화면을 만들 때도 `AppShell`, `Section`, 기존 shallow routing 방식을 우선 사용한다.
- Figma와 1:1 시각 일치를 목표로 하되, 이력서형 포트폴리오의 컴팩트한 정보 밀도와 파스텔 라이트/다크 톤을 유지한다.

## Validation

- 변경 후 `npm run build`를 실행한다.
- UI 변경 폭이 크면 브라우저에서 모바일/데스크톱 화면을 확인한다.
- 다크 모드와 라이트 모드에서 토큰 대비, focus-visible, 모달/버튼 상태를 함께 확인한다.
