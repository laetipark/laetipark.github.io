# Figma Design System Rules

이 문서는 Figma MCP로 받은 디자인을 Laetipark 포트폴리오 코드에 구현할 때 따르는 규칙이다.
React 구현 정본은 `docs/rules/FRONTEND.md`, UI/토큰 정본은 `docs/rules/DESIGN.md`다.

## Required Flow

1. Figma 구현 작업 전 `docs/README.md`, `docs/rules/FRONTEND.md`, `docs/rules/DESIGN.md`, 이 문서를 읽는다.
2. Figma MCP에서 정확한 노드의 구조 정보를 먼저 가져온다.
3. 구조 정보가 너무 크거나 잘리면 메타데이터로 노드 범위를 좁힌 뒤 필요한 노드만 다시 가져온다.
4. 구현 대상의 스크린샷을 함께 확인한 뒤 코드 변경을 시작한다.
5. Figma 출력이 React + Tailwind 형태여도 최종 코드는 이 프로젝트의 React, TypeScript, CSS Module 규칙으로 옮긴다.
6. 구현 후 `npm run build`로 타입과 번들 검증을 수행한다.

## Translation Rules

- Figma MCP 출력은 최종 코드가 아니라 디자인 구조와 의도를 설명하는 참고 자료로 취급한다.
- Figma의 색상, spacing, radius, shadow는 `docs/rules/DESIGN.md`의 토큰과 레이아웃 규칙으로 매핑한다.
- Figma의 컴포넌트 구조는 `docs/rules/FRONTEND.md`의 위치, naming, CSS Module 규칙으로 옮긴다.
- Figma의 카드, 칩, 버튼, 모달은 기존 `project-section`, `profile-hero`, `theme-toggle` 스타일 패턴을 먼저 재사용한다.
- 새 화면을 만들 때도 `AppShell`, `Section`, 기존 shallow routing 방식을 우선 사용한다.
- Figma와 1:1 시각 일치를 목표로 하되, 이력서형 포트폴리오의 컴팩트한 정보 밀도와 파스텔 라이트/다크 톤을 유지한다.

## Asset Handling

- Figma MCP가 localhost 이미지나 SVG 소스를 제공하면 placeholder를 만들지 않는다.
- 제공된 localhost 소스는 직접 사용하거나, 프로젝트에 보관해야 할 경우 `docs/rules/DESIGN.md`의 자산 위치 규칙에 맞춰 옮긴다.
- Figma 구현만을 위해 새 아이콘 패키지를 설치하지 않는다.
- Figma에 없는 임시 이미지를 만들 때는 실제 구현 전 반드시 대체 대상과 보관 위치를 명시한다.

## Validation

- 변경 후 `npm run build`를 실행한다.
- UI 변경 폭이 크면 브라우저에서 모바일/데스크톱 화면을 확인한다.
- 다크 모드와 라이트 모드에서 토큰 대비, focus-visible, 모달/버튼 상태를 함께 확인한다.
