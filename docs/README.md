# 프로젝트 문서 인덱스

이 디렉터리는 Laetipark 포트폴리오의 개발 규칙 정본이다.

## 읽는 순서

1. `docs/README.md`
2. 작업 성격에 맞는 `docs/rules/*.md`

## 문서 지도

- `docs/rules/FRONTEND.md`
  - React/Vite 구현 구조, 컴포넌트 작성 기준
- `docs/rules/DESIGN.md`
  - 기존 포트폴리오 톤을 유지하는 파스텔 라이트/다크 디자인 기준
- `docs/rules/API.md`
  - `VITE_API_URL`과 ChatLaetus API 연결 계약
- `docs/rules/DEPLOYMENT.md`
  - GitHub Pages와 GitHub Actions 배포 기준

## 우선순위

규칙 충돌 시 우선순위는 아래와 같다.

1. 사용자의 현재 명시 요청
2. `docs/rules/*.md`
3. 루트의 짧은 라우터 파일 (`AGENTS.md`, `CLAUDE.md`)

## 유지 원칙

- 새 규칙은 먼저 `docs/`에 추가한다.
- 루트 라우터 파일에는 문서 링크만 둔다.
- 오래된 규칙은 방치하지 말고 삭제하거나 새 문서로 대체한다.
