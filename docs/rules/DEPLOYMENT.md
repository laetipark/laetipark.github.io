# 배포 규칙

[작업 가이드](../README.md) · [저장소 소개](../../README.md)

이 문서는 GitHub Pages와 GitHub Actions 배포 계약의 정본입니다.

## 관련 설정

- Node.js 버전: [.nvmrc](../../.nvmrc), [package.json](../../package.json)
- Vite 공개 경로: [vite.config.ts](../../vite.config.ts)
- 배포 워크플로: [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml)
- 직접 접근 복구: [public/404.html](../../public/404.html), [index.html](../../index.html)

## 배포 대상과 산출물

- GitHub Pages 주소는 [laetipark.github.io](https://laetipark.github.io/)이며, 저장소에 설정된 사용자 도메인 [laetipark.me](https://laetipark.me/)로 연결됩니다. 현재 Pages 설정은 `cname: laetipark.me`, `build_type: workflow`입니다.
- 사용자 사이트의 루트에 배포하므로 Vite `base`는 `/`를 유지합니다. 실제 자산 URL은 이 설정을 기준으로 생성됩니다.
- `package.json`의 `homepage`도 같은 주소를 가리키지만 Vite 공개 경로를 결정하는 값은 아닙니다.
- `npm run build`의 배포 산출물은 `dist/`이며 워크플로는 이 디렉터리만 Pages artifact로 업로드합니다.

## 공식 배포 경로

공식 배포 방식은 `.github/workflows/deploy.yml`의 GitHub Actions 워크플로입니다.

- `main` 브랜치 push 또는 `workflow_dispatch`로 실행합니다.
- 로컬과 CI는 `.nvmrc`와 `package.json#engines`에 선언한 Node.js 24를 사용합니다.
- 빌드 job은 checkout → Node 설정과 npm cache → `npm ci` → `npm run build` → `dist/` 업로드 순서로 실행합니다.
- deploy job은 build job이 성공한 뒤 `github-pages` environment에 artifact를 배포합니다.
- 저장소 Pages 설정의 Build and deployment Source는 **GitHub Actions**여야 합니다.
- `Deploy from a branch`의 `main / root`는 Vite 소스의 `index.html`을 그대로 서빙하므로 사용하지 않습니다.

`package.json`에 `gh-pages` 기반 `npm run deploy`가 남아 있지만 공식 경로가 아니며 Actions의 환경 변수 주입도 자동으로 상속하지 않습니다. 사용자가 수동 배포를 명시적으로 요청하지 않는 한 실행하지 않습니다.

## 환경 변수

- 운영 빌드에는 저장소 secret `VITE_API_BASE_URL`을 같은 이름의 환경 변수로 주입합니다.
- 값이 없으면 빌드는 성공할 수 있지만 Chat Laetus 입력은 비활성화됩니다.
- 이 값은 최종 브라우저 번들에 노출되므로 공개 가능한 API base URL만 저장합니다.
- 요청·응답 동작은 [API 규칙](API.md)을 따릅니다.

## SPA 직접 접근 복구

GitHub Pages는 애플리케이션 라우트를 서버에서 알지 못하므로 다음 순서를 유지합니다.

1. 존재하지 않는 경로로 직접 접근하면 `public/404.html`이 원래 path, query와 hash를 `sessionStorage`의 `laetipark.redirect`에 저장합니다.
2. 브라우저를 `/`로 이동합니다.
3. `index.html`의 인라인 스크립트가 저장값을 제거하고 `history.replaceState`로 원래 URL을 복구합니다.
4. React 앱이 복구된 경로를 읽어 화면을 선택합니다.

이 복구는 `/chat`뿐 아니라 Pages에서 404가 된 모든 경로에 적용됩니다. 현재 앱은 `/chat`만 별도 화면으로 인식하고 그 밖의 경로는 포트폴리오를 렌더링합니다. 새 라우트나 404 화면을 추가할 때 [프론트엔드 규칙](FRONTEND.md)의 경로 판별과 이 복구 흐름을 함께 수정합니다.

## 검증

- 배포 설정을 바꾸기 전에 `.nvmrc`, `package.json`, `vite.config.ts`와 워크플로의 값이 서로 맞는지 확인합니다.
- `npm run build`를 실행하고 `dist/index.html`과 `dist/404.html`이 생성되는지 확인합니다.
- Pages 또는 같은 404 동작을 재현하는 환경에서 `/`, `/chat` 직접 접근, `/chat` 새로고침과 브라우저 뒤로 가기를 확인합니다.
- 워크플로를 변경했다면 trigger, permissions, build artifact 경로와 deploy job 의존성을 확인합니다.
