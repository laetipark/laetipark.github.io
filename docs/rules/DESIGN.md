# 디자인 규칙

이 문서는 UI 방향, 레이아웃, 디자인 토큰, 반응형과 접근성 규칙의 정본입니다. 컴포넌트 구조와 파일 위치는 [프론트엔드 규칙](FRONTEND.md)을 따릅니다.

## 디자인 방향

- 기존 포트폴리오의 이력서형 구조와 컴팩트한 정보 밀도를 유지합니다.
- 첫 화면은 포트폴리오 본문이어야 하며 별도 마케팅형 랜딩 페이지로 바꾸지 않습니다.
- 파스텔 색조를 사용하되 한 가지 계열에만 치우치지 않습니다.
- 카드 반경은 8px 이하를 기본으로 하고, 카드 안에 장식용 카드를 반복 중첩하지 않습니다.
- 새 시각 표현보다 기존 섹션, 카드, 버튼과 모달 패턴의 일관성을 우선합니다.

## 구현 기준점

- 전역 토큰과 기본 스타일: [src/common/styles/index.css](../../src/common/styles/index.css)
- 앱 너비와 전체 여백: [src/assets/styles/app.module.css](../../src/assets/styles/app.module.css)
- 대표 카드와 모달: [src/assets/styles/components/project-section.module.css](../../src/assets/styles/components/project-section.module.css)
- Chat Laetus 화면: [src/assets/styles/pages/chatlaetus-page.module.css](../../src/assets/styles/pages/chatlaetus-page.module.css)

## 디자인 토큰

- 전역 토큰은 `src/common/styles/index.css`의 `:root`에 정의합니다.
- 라이트와 다크 모드는 같은 토큰 이름을 공유하고 `:root[data-theme='dark']`에서 값만 바꿉니다.
- 컴포넌트 CSS에 hex나 rgba 색상을 반복해서 추가하지 말고 가능한 `var(--*)` 토큰과 기존 `color-mix()` 패턴을 사용합니다.
- 새 색상 토큰이 필요하면 의미가 드러나는 이름으로 라이트와 다크 값을 함께 추가합니다.

| 범주               | 우선 사용할 토큰                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| 배경               | `--page-bg`, `--page-top-bg`, `--surface-bg`, `--surface-strong-bg`, `--surface-muted-bg`, `--surface-elevated-bg` |
| 텍스트             | `--text-main`, `--text-muted`                                                                                      |
| 브랜드·강조        | `--brand`, `--brand-dark`, `--accent`, `--mark-bg`, `--mark-text`                                                  |
| 상태               | `--danger-bg`, `--danger-text`, `--success-bg`                                                                     |
| 선·오버레이·그림자 | `--border`, `--border-strong`, `--overlay-bg`, `--shadow-soft`, `--shadow-card`, `--shadow-floating`               |
| 주요 버튼          | `--button-primary-bg`, `--button-primary-hover-bg`, `--button-primary-text`                                        |

## 레이아웃과 반응형

- 전체 폭과 여백은 `app.module.css`의 `width: min(...)`, `padding`, `gap` 패턴을 따릅니다.
- 고정 비율이나 가변 폭 요소에는 `aspect-ratio`, `min-width: 0`, `flex-wrap`, `minmax()`처럼 overflow를 막는 제약을 둡니다.
- 반응형 분기는 기존처럼 `@media (min-width: 768px)` 또는 `@media (min-width: 1024px)`를 우선 사용합니다.
- 최소 320px 너비와 데스크톱에서 텍스트, 버튼, 카드, 모달과 채팅 입력이 컨테이너 밖으로 넘치지 않게 합니다.
- 채팅처럼 화면 높이에 의존하는 UI는 주소창 변화와 내부 스크롤을 고려해 `dvh`와 `min-height: 0` 패턴을 유지합니다.

## 아이콘과 자산

- 아이콘은 설치된 Font Awesome 패키지와 `FontAwesomeIcon`을 사용합니다.
- 일반 아이콘은 `@fortawesome/free-solid-svg-icons`, 브랜드 아이콘은 `@fortawesome/free-brands-svg-icons`에서 가져옵니다.
- 아이콘을 위해 새 패키지를 추가하지 않습니다.
- 빌드에서 관리할 이미지 자산은 `src/assets`에 두고 import해서 사용합니다.
- favicon, 404 문서와 같이 변환하지 않을 공개 자산만 `public`에 둡니다.
- 정보성 이미지에는 내용을 설명하는 `alt`를 제공하고, 장식 이미지는 스크린 리더에서 중복 안내되지 않게 처리합니다.

## 접근성과 상호작용

- 모든 버튼은 용도에 맞는 `type`을 명시합니다. 일반 버튼은 `button`, 폼 전송 버튼은 `submit`을 사용합니다.
- 아이콘만 있는 버튼과 컨트롤에는 동작을 설명하는 `aria-label`을 제공합니다.
- 테마 토글은 우측 하단 고정 위치와 현재의 라이트·다크 선택 저장 방식을 유지합니다.
- 버튼, 링크, 입력과 textarea의 `:focus-visible` 표시가 전역 또는 해당 CSS Module에서 보이도록 합니다.
- 모달은 최소한 `role="dialog"`, `aria-modal="true"`, 제목 연결, Escape 닫기와 backdrop 닫기를 유지합니다.
- 모달을 새로 만들거나 크게 바꿀 때는 초기 포커스, 내부 포커스 이동과 닫힌 뒤 포커스 복귀까지 함께 검토합니다.
- 비동기 상태와 오류는 시각적 표현만 두지 말고 적절한 `role`, `aria-live` 또는 연결된 레이블을 유지합니다.
- 색상만으로 상태를 구분하지 않고 텍스트나 아이콘을 함께 제공합니다.

## 시각 검증

- 라이트와 다크 모드에서 텍스트·경계·상태 색의 대비를 확인합니다.
- 최소 모바일 너비와 768px, 1024px 전후에서 overflow와 레이아웃 변화를 확인합니다.
- 키보드만으로 주요 링크, 버튼, 모달과 채팅 입력에 접근할 수 있는지 확인합니다.
- UI 변경 폭이 크면 브라우저에서 실제 화면을 확인한 뒤 `npm run build`를 실행합니다.
