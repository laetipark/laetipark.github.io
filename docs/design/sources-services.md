# 서비스 프로젝트의 공개 근거

2026-11-07에 GitHub connector로 각 저장소의 공개 상태, 기본 브랜치, README와 관련 소스를 확인했습니다. 아래 문서는 [서비스 프로젝트 데이터](../../src/common/data/project-services.ts)의 근거입니다.

개발 기간·개인 담당 범위·성과 수치는 확인되지 않아 추가하지 않았습니다. 서비스 주소가 문서에 기재된 사실과 현재 운영 상태는 구분하며, 운영 상태 배지는 추가하지 않습니다.

## Orsem

- [프로젝트 소개와 기술 구성](https://github.com/laetipark/orsem/blob/master/README.md): 공시·시장·뉴스 관측, 관심 목록, 통합 검색, 운영 상태와 알림 연동
- [아키텍처](https://github.com/laetipark/orsem/blob/master/docs/ARCHITECTURE.md): Python 수집 워커, BullMQ, MySQL·Redis, 출처·권리·시각 보존
- [작업 큐 구현](https://github.com/laetipark/orsem/blob/master/apps/api/src/operations/worker-queue.service.ts): 재시도와 지수 백오프
- [API manifest](https://github.com/laetipark/orsem/blob/master/apps/api/package.json), [웹 manifest](https://github.com/laetipark/orsem/blob/master/apps/web/package.json), [Python manifest](https://github.com/laetipark/orsem/blob/master/apps/worker/python/pyproject.toml): 소개한 기술 확인
- 서비스 주소 `https://orsem.laetipark.me`는 저장소 homepage와 [배포 문서](https://github.com/laetipark/orsem/blob/master/docs/DEPLOYMENT.md)에 기재돼 있습니다.

## Mystery Mango

- [프로젝트 소개](https://github.com/laetipark/mystery-mango/blob/main/README.md): 작품 탐색·매칭·플레이·제작·시험·공개 흐름과 서비스 주소
- [작품 저장과 버전 고정](https://github.com/laetipark/mystery-mango/blob/main/backend/src/main/java/com/mysterymango/author/AuthorService.java): revision 충돌 검사, 시험·공개 버전 생성
- [게임 서비스](https://github.com/laetipark/mystery-mango/blob/main/backend/src/main/java/com/mysterymango/game/GameService.java): 서버 규칙·참가 권한과 트랜잭션 처리
- [변경 알림](https://github.com/laetipark/mystery-mango/blob/main/backend/src/main/java/com/mysterymango/common/Events.java): 이벤트 outbox와 WebSocket 전송
- [백엔드 manifest](https://github.com/laetipark/mystery-mango/blob/main/backend/build.gradle), [프런트엔드 manifest](https://github.com/laetipark/mystery-mango/blob/main/frontend/package.json): 소개한 기술 확인

## Chat Laetus · LaetiPark API

- [프로젝트 소개](https://github.com/laetipark/laetipark-api/blob/master/README.md): NestJS API, TypeORM·MySQL, llama-server, 로컬 React/Vite 클라이언트
- [API 명세](https://github.com/laetipark/laetipark-api/blob/master/docs/api.md): 대화 저장·조회, 이미지 입력, 컨텍스트 범위, 호환 endpoint, 오류와 응답 정제
- [채팅 서비스 구현](https://github.com/laetipark/laetipark-api/blob/master/src/chat/chat.service.ts): 이미지 정규화, 모델 호출, think 내용 제거와 응답 검증
- [manifest](https://github.com/laetipark/laetipark-api/blob/master/package.json): 소개한 서버 기술 확인
- 체험 링크는 현재 포트폴리오의 `/chat`입니다. API 문서의 `https://api.laetipark.me`는 운영 권장 주소로 표현돼 있어 방문용 링크로 추가하지 않았습니다.

## 상세 이미지의 출처

공개 저장소의 원본 파일을 2026-11-07 내려받아 시각적으로 확인했습니다. Git blob SHA로 원본과 다운로드 파일의 일치도 확인했습니다. Chat Laetus는 같은 날 현재 포트폴리오의 로컬 화면을 별도로 캡처하고 확인했습니다.

| 로컬 자산                               | 원본                                                                                           | Git blob SHA                               |
| --------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `src/assets/projects/orsem-ui.png`      | [Orsem UI 보드](https://github.com/laetipark/orsem/blob/master/docs/assets/orsem-figma-ui.png) | `d8a461276e965325f1b451a64e21538a260c1ba1` |
| `src/assets/projects/mystery-mango.jpg` | [Mystery Mango 홈](https://github.com/laetipark/mystery-mango/blob/main/docs/images/home.jpg)  | `7ae582b0db4b582f00be5bca1e3a374e87b544ad` |
| `src/assets/projects/chat-laetus.jpg`   | 현재 포트폴리오의 로컬 `/chat` 화면                                                            | `8906c38233e47831736405fd4a0ec5467c2e6f11` |

- Orsem은 1414×2200px 원본 UI 보드이며 모의 데이터를 사용합니다. 캡션은 `저장소의 UI 목업 · 예시 데이터`로 표기하고 [README의 이미지 기준](https://github.com/laetipark/orsem/blob/master/README.md)을 따릅니다.
- Mystery Mango는 1838×871px 홈 이미지입니다. 배포 화면을 바탕으로 정리한 Figma UI이며, 화면 기준일과 브랜딩 갱신일, 캡처 방식을 [이미지 기준](https://github.com/laetipark/mystery-mango/blob/main/docs/screens.md#이미지-기준과-갱신)과 구분합니다. 캡션은 `배포 화면을 바탕으로 정리한 Figma UI`로 표기합니다.
- LaetiPark API 저장소에는 2026-11-07 최초 조사 시점에 이미지 자산이 없었습니다. Chat Laetus의 상세 이미지는 현재 포트폴리오의 로컬 UI를 1200×800px로 캡처했습니다. 실제 모델 응답이 아닌 통제된 로컬 API의 예시 응답을 표시했으며 캡션은 `로컬 채팅 화면 · 예시 응답`입니다.

## 프로젝트 배너의 출처

2026-11-07 Orsem과 Mystery Mango의 공개 저장소 README와 전체 파일 트리에서 실제 배너를 확인해 원본을 내려받았습니다. 아래 두 파일을 직접 열어 확인하고 Git blob SHA가 원본과 일치하는지 검사했습니다. 기존 UI 이미지는 상세 화면용으로 유지합니다.

| 로컬 배너                                      | 원본                                                                                                            | 크기       | Git blob SHA                               |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------ |
| `src/assets/projects/orsem-banner.png`         | [Orsem README 배너](https://github.com/laetipark/orsem/blob/master/docs/assets/orsem-banner.png)                | 2172×724px | `0d80e0dd7449ff0466041964125ab289b3cdabc1` |
| `src/assets/projects/mystery-mango-banner.png` | [Mystery Mango README 배너](https://github.com/laetipark/mystery-mango/blob/main/docs/images/readme-banner.png) | 1730×909px | `12c8cd9d712f5f32da418fabdb7400de088b0a2e` |

두 배너의 캡션은 `공개 저장소의 프로젝트 배너`입니다.

LaetiPark API에는 2026-11-07 최초 조사 시점에 배너·커버·이미지 자산이 확인되지 않았습니다. 이후 사용자 요청으로 [Chat Laetus 소개 배너](../../src/assets/projects/chat-laetus-banner.png)를 생성해 `banner`에 연결하고 `프로젝트 소개 배너 · AI 생성`으로 표시합니다. 이 배너는 실제 채팅 화면을 표현하지 않으며 기존 로컬 채팅 화면은 상세용 `image`로 보존합니다. 제작 근거와 출력 정보는 [생성 배너 기록](generated-banners.md)에 둡니다.
