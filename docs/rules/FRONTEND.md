# Frontend Rules

## Stack

- React와 Vite를 사용한다.
- 별도 라우터 라이브러리 없이 현재 앱에서는 `window.history` 기반의 얕은 라우팅을 사용한다.
- 공통 타입은 `src/common/types`, API 호출은 `src/common/api`, 화면 단위는 `src/pages`에 둔다.

## Components

- 기존 포트폴리오처럼 정보 밀도가 높은 섹션과 8px 카드 UI를 유지한다.
- 새 컴포넌트는 CSS Module을 함께 둔다.
- 버튼에는 가능한 아이콘과 접근성 라벨을 함께 제공한다.
- 외부 링크는 `target="_blank"`와 `rel="noreferrer"`를 같이 사용한다.

## State

- 테마처럼 사용자가 직접 선택한 값은 `localStorage`에 저장한다.
- 서버 응답에 의존하는 UI는 로딩, 성공, 오류, 설정 누락 상태를 모두 제공한다.
