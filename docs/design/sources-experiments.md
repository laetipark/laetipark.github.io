# 추가 프로젝트 선정 근거

[작업 가이드](../README.md) · [화면 개편 기록](portfolio-redesign.md)

2026년 11월 7일 공개 GitHub 저장소의 README, 패키지 명세와 기능 소스를 확인했습니다. 이 문서는 [추가 프로젝트 데이터](../../src/common/data/project-experiments.ts)의 출처와 선정 이유를 기록합니다. 저장소 생성일이나 최근 커밋을 개발 기간으로 해석하지 않았으며, 운영 여부·사용자 수·개인 기여율은 추정하지 않았습니다.

## 선정한 프로젝트

| 프로젝트    | 선정 이유                                                      | 표현 범위와 근거                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 돈이머니    | 예산·지출 관리, 추천과 알림을 구현한 API 프로젝트              | [README](https://github.com/laetipark/money-is-money/blob/main/README.md), [예산 서비스](https://github.com/laetipark/money-is-money/blob/main/src/feature/budget/budget.service.ts), [지출·예약 알림 서비스](https://github.com/laetipark/money-is-money/blob/main/src/feature/expense/expense.service.ts), [패키지 명세](https://github.com/laetipark/money-is-money/blob/main/package.json)를 근거로 기능과 기술을 정리했습니다. 개인 담당 범위는 명시되지 않아 역할 필드를 생략했습니다.                                |
| 여기가자    | 실제 팀 기여가 명시된 위치 기반 음식점 추천 API                | [README의 역할](https://github.com/laetipark/lets-go-here/blob/main/README.md)에 기재된 박동훈의 마이그레이션, 인증, 사용자 설정, 시군구 캐싱과 주변 조회를 개인 역할로 사용했습니다. 공공데이터 수집·평가·추천 등 서비스 전체 기능과 구분했습니다. 기술은 [패키지 명세](https://github.com/laetipark/lets-go-here/blob/main/package.json)를 함께 확인했습니다.                                                                                                                                                             |
| 피드모아    | 회원가입과 초기 데이터 구성의 팀 기여가 확인되는 통합 피드 API | [README의 역할과 구현 범위](https://github.com/laetipark/feed-moa/blob/main/README.md), [패키지 명세](https://github.com/laetipark/feed-moa/blob/main/package.json)를 확인했습니다. 박동훈의 마이그레이션·시드 생성, 회원가입 검증과 인증 코드 발급만 개인 역할로 표시합니다. 좋아요·공유는 가상 외부 API URL을 사용하는 과제이며 실제 SNS 연동 서비스로 표현하지 않습니다.                                                                                                                                                 |
| Gowatch     | 명령 처리, 시간 기록 모델과 타이머 동작이 있는 Discord 봇      | [README](https://github.com/laetipark/gowatch-bot/blob/master/README.md), [명령 처리](https://github.com/laetipark/gowatch-bot/blob/master/events/command_execution.js), [리더보드 표시](https://github.com/laetipark/gowatch-bot/blob/master/commands/leaderBoardCommand.js), [패키지 명세](https://github.com/laetipark/gowatch-bot/blob/master/package.json)를 근거로 집중 타이머와 음성·집중 기록을 소개합니다.                                                                                                         |
| Blossom Bot | 게임 정보 API를 Discord 명령에 연결한 구현                     | [현재 명령 등록](https://github.com/laetipark/brawltree-discord/blob/master/src/commands/index.ts), [프로필](https://github.com/laetipark/brawltree-discord/blob/master/src/commands/profile.command.ts), [랜덤 뽑기](https://github.com/laetipark/brawltree-discord/blob/master/src/commands/random.command.ts), [패키지 명세](https://github.com/laetipark/brawltree-discord/blob/master/package.json)를 확인했습니다. 도움말·프로필·뽑기만 소개하며, 등록이 주석 처리된 브롤러 상세·로테이션 명령은 포함하지 않았습니다. |

여기가자와 피드모아는 팀 저장소의 fork이지만 README에 사용자와 구체적인 담당 역할이 명시되어 있어 협업 프로젝트로 선정했습니다. 모든 추가 항목은 공개 소스가 있는 프로젝트로 소개하며, `period`, `featured`는 생략하고 `statuses`는 빈 목록으로 둡니다.

## 목록 배너 출처

돈이머니·여기가자·피드모아는 README 첫머리에 있는 프로젝트 소개 배너를 목록용 `banner`로 사용합니다. 세 배너 모두 1024×683 PNG 원본이며 직접 내용을 확인했습니다. 아래의 상세용 ERD는 `image`에 그대로 유지합니다.

| 프로젝트 | 공개 원본                                                                                                                                                                      | 로컬 자산                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| 돈이머니 | 현재 README가 참조하는 [GitHub 배너 첨부](https://github.com/laetipark/budget-manager/assets/68440583/a9d1c114-d60e-425f-85b0-ae4a93d0d3b8)                                    | [money-is-money-banner.png](../../src/assets/projects/money-is-money-banner.png) |
| 여기가자 | 팀 저장소의 [GitHub 배너 첨부](https://github.com/Wanted-Pre-Onboarding-Team-E/geography-based-restaurant-recommendation/assets/68440583/9c848047-be3f-4827-9b14-bccf398b6022) | [lets-go-here-banner.png](../../src/assets/projects/lets-go-here-banner.png)     |
| 피드모아 | 팀 저장소의 [GitHub 배너 첨부](https://github.com/Wanted-Pre-Onboarding-Team-E/social-media-integration-feed/assets/68440583/4f74e658-1226-4caa-82c2-80885ed1b49d)             | [feed-moa-banner.png](../../src/assets/projects/feed-moa-banner.png)             |

Gowatch와 Blossom Bot은 2026-11-07 최초 조사에서 README와 저장소 파일 목록에 별도의 배너·헤더·커버 이미지가 없었습니다. 이후 사용자 요청으로 [Gowatch 소개 배너](../../src/assets/projects/gowatch-banner.png)와 [Blossom Bot 소개 배너](../../src/assets/projects/blossom-bot-banner.png)를 생성해 `banner`에 연결합니다. 캡션은 `프로젝트 소개 배너 · AI 생성`이며 실제 봇 화면을 나타내지 않습니다. 기존 로고는 상세용 `image`로 보존하고 제작 근거와 출력 정보는 [생성 배너 기록](generated-banners.md)에 둡니다.

## 상세 이미지와 로고 출처

아래 상세 이미지는 공개 README나 저장소가 제공하는 원본을 그대로 내려받았습니다. 서비스 화면으로 오해하지 않도록 이미지 설명에 ERD 또는 로고를 표시합니다.

| 프로젝트    | 이미지 종류                  | 원본과 로컬 자산                                                                                                                                                                                                |
| ----------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 돈이머니    | 데이터베이스 ERD · 678×408   | README의 [GitHub 첨부 원본](https://github.com/laetipark/budget-manager/assets/68440583/77b0d92b-f086-4548-9230-ceccecc61da2) → [money-is-money-erd.png](../../src/assets/projects/money-is-money-erd.png)      |
| 여기가자    | 데이터베이스 ERD · 2202×1420 | README의 [HackMD 첨부 원본](https://hackmd.io/_uploads/S1j4QjDmT.png) → [lets-go-here-erd.png](../../src/assets/projects/lets-go-here-erd.png)                                                                  |
| 피드모아    | 데이터베이스 ERD · 1990×1118 | README의 [HackMD 첨부 원본](https://hackmd.io/_uploads/r1phpypMT.png) → [feed-moa-erd.png](../../src/assets/projects/feed-moa-erd.png)                                                                          |
| Gowatch     | 봇 로고 · 120×120            | 저장소의 [public/Gowatch.png](https://github.com/laetipark/gowatch-bot/blob/master/public/Gowatch.png) → [gowatch-logo.png](../../src/assets/projects/gowatch-logo.png)                                         |
| Blossom Bot | 봇 로고 · 400×480            | 저장소의 [images/blossom_discord_logo.png](https://github.com/laetipark/brawltree-discord/blob/master/images/blossom_discord_logo.png) → [blossom-bot-logo.png](../../src/assets/projects/blossom-bot-logo.png) |

돈이머니 README가 사용하는 첨부 URL에는 이전 저장소 이름인 `budget-manager`가 남아 있습니다. 현재 README에서 참조하는 원본임을 확인했습니다. 이 문서에 기재한 기존 배너 3개와 상세 이미지 5개는 PNG 형식과 크기, 실제 내용을 검토한 원본이며 생성 이미지로 대체하지 않습니다.

## 제외한 항목

[wanted-pre-onboarding-backend](https://github.com/laetipark/wanted-pre-onboarding-backend)는 다른 기업 과제의 인덱스와 채용 서비스 사전 과제를 함께 담고 있습니다. [채용공고 컨트롤러](https://github.com/laetipark/wanted-pre-onboarding-backend/blob/master/src/recruitment/recruitment.controller.ts)에 CRUD·검색·지원 기능이 있어 빈 scaffold는 아니지만, 이번에는 같은 프로그램의 프로젝트가 반복되지 않도록 별도 카드에서 제외했습니다.

## 기록의 한계

- 소스와 문서에 구현된 범위를 확인했으며 각 프로젝트의 서버나 봇을 실행하지 않았습니다.
- README에 나온 기술은 패키지 명세와 대조했지만 테스트 통과나 운영 성능을 검증한 것은 아닙니다.
- 날짜가 명시되지 않은 프로젝트의 기간을 커밋 이력이나 프로그램의 학습 기록 날짜로 보완하지 않았습니다.
- UI 스크린샷이 없는 백엔드·봇 프로젝트에 가상의 서비스 화면을 추가하지 않았습니다.
