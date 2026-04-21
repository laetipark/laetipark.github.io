# Deployment Rules

## Target

- 배포 대상은 `https://laetipark.github.io/`이다.
- Vite `base`는 `/`를 유지한다.
- `package.json`의 `homepage`도 `https://laetipark.github.io/`로 유지한다.

## GitHub Actions

- `main` 브랜치 push 또는 수동 실행으로 배포한다.
- 빌드에는 `npm ci`와 `npm run build`를 사용한다.
- `VITE_API_BASE_URL`은 GitHub Actions secret에서 빌드 환경 변수로 주입한다.
- GitHub Pages의 Build and deployment Source는 `GitHub Actions`로 설정한다.
- `Deploy from a branch`의 `main / root`는 Vite 소스 `index.html`을 그대로 서빙하므로 사용하지 않는다.

## GitHub Pages Routing

- `/chatlaetus` 직접 접근을 지원하기 위해 `public/404.html`에서 원래 path를 sessionStorage에 저장한 뒤 `/`로 되돌린다.
- `index.html`은 저장된 redirect path를 읽어 `history.replaceState`로 복구한다.
