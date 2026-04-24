# Frontend Rules

이 문서는 React/Vite 구현 구조와 프론트엔드 코드 작성 규칙의 정본이다.
시각 디자인, 토큰, 접근성 기준은 `docs/rules/DESIGN.md`를 함께 따른다.

## Stack

- React, TypeScript, Vite를 사용한다.
- 별도 라우터 라이브러리 없이 `window.history` 기반의 얕은 라우팅을 유지한다.
- 절대 경로 alias가 없으므로 기존 상대 import 스타일을 따른다.

## Project Structure

- 앱 진입과 라우팅은 `src/app.tsx`에 둔다.
- 공통 타입은 `src/common/types`에 둔다.
- 공통 데이터는 `src/common/data`에 둔다.
- API 호출은 `src/common/api`에 둔다.
- 화면 단위 컴포넌트는 `src/pages`에 둔다.
- 공통 컴포넌트는 `src/components/common`에 둔다.
- 레이아웃 컴포넌트는 `src/components/layout`에 둔다.
- 기능/섹션별 컴포넌트는 `src/components/{feature}`에 둔다.

## Components

- 새 컴포넌트 파일명은 기존처럼 kebab-case를 사용한다.
- React 컴포넌트는 PascalCase named export를 사용한다.
- 재사용 가능한 섹션 UI는 새로 만들기 전에 `Section` 같은 기존 공통 컴포넌트를 먼저 검토한다.
- 외부 링크는 `target="_blank"`와 `rel="noreferrer"`를 같이 사용한다.

## Styling Integration

- 컴포넌트 스타일은 CSS Module을 함께 둔다.
- 컴포넌트 CSS는 `src/assets/styles/components`에 둔다.
- 페이지 전용 CSS는 `src/assets/styles/pages`에 둔다.
- CSS 클래스명은 camelCase로 작성하고 `styles.className` 형태로 참조한다.
- Tailwind, styled-components, CSS-in-JS를 새로 도입하지 않는다.

## State

- 테마처럼 사용자가 직접 선택한 값은 `localStorage`에 저장한다.
- 서버 응답에 의존하는 UI는 로딩, 성공, 오류, 설정 누락 상태를 모두 제공한다.

## Validation

- 코드 변경 후 `npm run build`로 타입 검사와 번들 생성을 확인한다.
- 문서만 변경한 경우 빌드는 생략할 수 있다.
