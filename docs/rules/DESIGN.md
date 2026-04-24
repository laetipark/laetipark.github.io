# Design Rules

이 문서는 UI 톤, 레이아웃, 토큰, 반응형, 접근성/상호작용 규칙의 정본이다.
React 컴포넌트 구조와 파일 위치는 `docs/rules/FRONTEND.md`를 따른다.

## Direction

- 기존 포트폴리오의 이력서형 구조와 컴팩트한 섹션을 유지한다.
- 첫 화면은 포트폴리오 본문이어야 하며 별도 마케팅형 랜딩 페이지를 만들지 않는다.
- 색상은 파스텔 톤으로 조정하되 한 가지 색 계열에 치우치지 않는다.
- 카드 반경은 8px 이하를 기본으로 한다.
- 카드 안에 또 다른 장식 카드를 중첩하지 않는다.

## Design Tokens

- 전역 스타일과 토큰은 `src/common/styles/index.css`에 정의한다.
- 라이트/다크 모드는 같은 토큰 이름을 공유하고 `:root[data-theme='dark']`에서 값을 바꾼다.
- 컴포넌트 CSS에서 hex, rgba 색상을 직접 늘리지 말고 가능한 `var(--*)` 토큰을 사용한다.
- 새 색상이 필요하면 라이트와 다크 값을 함께 추가한다.
- 주요 토큰은 아래 범주를 우선 사용한다.
  - 배경: `--page-bg`, `--page-top-bg`, `--surface-bg`, `--surface-strong-bg`, `--surface-muted-bg`, `--surface-elevated-bg`
  - 텍스트: `--text-main`, `--text-muted`
  - 브랜드/상태: `--brand`, `--brand-dark`, `--accent`, `--danger-bg`, `--danger-text`, `--success-bg`
  - 선/오버레이/그림자: `--border`, `--border-strong`, `--overlay-bg`, `--shadow-soft`, `--shadow-card`, `--shadow-floating`
  - 버튼: `--button-primary-bg`, `--button-primary-hover-bg`, `--button-primary-text`

## Layout And Responsiveness

- 전체 폭과 여백은 `src/assets/styles/app.module.css`의 `width: min(...)`, `padding`, `gap` 패턴을 따른다.
- 고정 형식 요소에는 `aspect-ratio`, `min-width: 0`, `flex-wrap`, `grid-template-columns` 같은 안정적인 제약을 둔다.
- 반응형 분기는 기존처럼 `@media (min-width: 768px)` 또는 `@media (min-width: 1024px)` 중심으로 작성한다.
- 모바일과 데스크톱에서 텍스트가 버튼, 카드, 모달 밖으로 넘치지 않게 한다.

## Icons And Assets

- 아이콘은 이미 설치된 Font Awesome 패키지를 사용한다.
- 아이콘 import는 `@fortawesome/free-solid-svg-icons`, 브랜드 아이콘은 `@fortawesome/free-brands-svg-icons`에서 가져오고 `FontAwesomeIcon`으로 렌더링한다.
- 새 아이콘 패키지를 추가하지 않는다.
- 프로젝트 이미지 자산은 `src/assets`에 두고 import해서 사용한다.
- favicon, 정적 HTML, 공개 SVG처럼 빌드 변환이 필요 없는 공개 자산은 `public`에 둔다.

## Accessibility And Interaction

- 버튼에는 `type="button"`을 명시한다.
- 아이콘만 있는 버튼에는 `aria-label`을 제공한다.
- 테마 토글은 우측 하단 고정 버튼으로 제공한다.
- 포커스 가능한 요소는 전역 `:focus-visible` 스타일이 보이도록 유지한다.
- 모달은 `role="dialog"`, `aria-modal="true"`, 제목 연결, Escape 닫기, backdrop 닫기 패턴을 유지한다.
- 모달과 채팅 입력은 키보드 접근성을 유지한다.
