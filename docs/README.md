# 프로젝트 작업 하네스

이 문서는 Laetipark 포트폴리오 작업을 시작할 때 사용하는 작업 하네스이자 문서 분류표다.
루트의 `AGENTS.md`, `CLAUDE.md`는 이 문서로 진입시키는 짧은 라우터이며,
실제 규칙 정본은 `docs/rules/`에 둔다.

## 시작 절차

1. 먼저 이 문서를 읽는다.
2. 아래 문서 분류표에서 작업 성격에 맞는 세부 문서를 고른다.
3. 고른 세부 문서를 읽은 뒤 구현, 수정, 검증을 진행한다.
4. 작업이 여러 성격에 걸치면 관련 세부 문서를 모두 읽는다.

## 문서 분류표

| 문서 | 역할 | 읽는 경우 |
| --- | --- | --- |
| `docs/rules/FRONTEND.md` | React/Vite 구현 정본 | 컴포넌트, 화면, 라우팅, 상태, 타입, 빌드 검증 |
| `docs/rules/DESIGN.md` | UI/디자인 정본 | CSS, 레이아웃, 반응형, 토큰, 테마, 접근성 |
| `docs/rules/FIGMA.md` | Figma MCP 작업 정본 | Figma 디자인 구현, Figma 자산 처리, 디자인 번역 |
| `docs/rules/API.md` | Chat Laetus API 계약 정본 | API URL, 요청/응답, 오류 상태, 환경 변수 |
| `docs/rules/DEPLOYMENT.md` | 배포 정본 | GitHub Pages, Actions, 배포 산출물, 라우팅 복구 |

## 선택 기준

- UI 구현은 보통 `FRONTEND.md`와 `DESIGN.md`를 함께 읽는다.
- Figma 기반 UI 구현은 `FIGMA.md`, `FRONTEND.md`, `DESIGN.md`를 함께 읽는다.
- Chat Laetus 통신 변경은 `API.md`를 읽고, 화면 변경이 있으면 `FRONTEND.md`와 `DESIGN.md`도 읽는다.
- 배포 설정, GitHub Pages 경로, Actions 변경은 `DEPLOYMENT.md`를 읽는다.

## 우선순위

규칙 충돌 시 우선순위는 아래와 같다.

1. 사용자의 현재 명시 요청
2. 선택한 `docs/rules/*.md`
3. 이 작업 하네스 (`docs/README.md`)
4. 루트 라우터 파일 (`AGENTS.md`, `CLAUDE.md`)

## 유지 원칙

- 새 규칙은 먼저 `docs/rules/`에 추가한다.
- 새 세부 규칙 문서를 만들면 이 문서의 문서 분류표와 선택 기준에 연결한다.
- 중복 규칙은 한 문서에만 정본으로 두고, 다른 문서에서는 참조로 연결한다.
- 루트 라우터 파일에는 `docs/README.md` 링크와 운영 원칙만 둔다.
- 오래된 규칙은 방치하지 말고 삭제하거나 새 문서로 대체한다.
