# 프로젝트와 이미지 출처

[작업 가이드](../README.md) · [디자인 개편 기록](portfolio-redesign.md)

2026-11-07 공개 GitHub 저장소의 README, 패키지 명세와 소스를 확인해 프로젝트 13개로 정리했습니다. 관련 웹·앱·봇 저장소는 이용 목적이 같을 때 한 항목으로 묶었습니다. 개인 학습 저장소는 기존 학습 링크에 남기고, 비공개 저장소는 조사·소개 대상에서 제외했습니다.

## 선정과 표현 기준

- Brawl Tree·Sexynogi를 대표 프로젝트로 배치하고 웹 서비스 6개, 앱 1개, API·백엔드 4개, 봇 2개로 분류합니다.
- 기간과 상태는 기존 Brawl Tree·Blossom Stats의 표기를 보존합니다. 새 프로젝트의 날짜·운영 상태·성과 수치는 추정하지 않습니다.
- 협업 프로젝트는 README에 명시된 개인 담당 역할과 서비스 전체 기능을 구분합니다.
- 목록은 실제 배너를 우선 사용하고, 배너가 없는 경우 로고 또는 기존 화면을 표시합니다. 상세는 화면·ERD와 구현 설명을 연결합니다.
- 공개 원본은 `src/assets/projects/`에 저장합니다. 원본 비율을 유지하며 캡션에서 배너·로고·화면·목업·ERD를 구분합니다. 생성한 가상 서비스 화면은 사용하지 않았습니다.

## 기본 프로젝트

| 프로젝트      | 공개 근거                                                                                                                                                                                                                                                                                                                                                                                                                                  | 소개 범위                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Brawl Tree    | [README](https://github.com/laetipark/brawltree/blob/master/README.md), [API manifest](https://github.com/laetipark/brawltree/blob/master/package.json), [웹 manifest](https://github.com/laetipark/brawltree/blob/master/frontend/package.json)                                                                                                                                                                                           | 전적·브롤러·맵·랭킹 조회, 수집→MySQL→NestJS→React 구조. 병렬 수집 경험·기간·상태·Oracle Cloud는 기존 포트폴리오 자료 유지 |
| Sexynogi      | [웹 README](https://github.com/laetipark/mobinogi-web/blob/master/README.md), [봇 README](https://github.com/laetipark/mobinogi-bot/blob/master/README.md), [웹 진입 문서](https://github.com/laetipark/mobinogi-web/blob/master/frontend/index.html), [서버 manifest](https://github.com/laetipark/mobinogi-web/blob/master/pom.xml)                                                                                                      | 커뮤니티·길드·캐릭터 할 일·아이템 정보와 메신저 봇을 통합 소개. 서비스 주소는 canonical URL에 근거                        |
| UNINOTE       | [웹 로드맵 안내](https://github.com/laetipark/uninote-web/blob/master/BBS/WebContent/roadmapManual.jsp), [웹 홈](https://github.com/laetipark/uninote-web/blob/master/BBS/WebContent/home.jsp), [Android 마인드맵](https://github.com/laetipark/uninote-app/blob/master/app/src/main/java/com/example/schoollifeproject/fragment/MindMapFragment.kt), [앱 manifest](https://github.com/laetipark/uninote-app/blob/master/app/build.gradle) | 웹·Android의 마인드맵, 노트·파일, 학습 게시판 구성. 두 README가 제목만 제공하여 기능 소스로 확인                          |
| 산등성이      | [README](https://github.com/laetipark/happy-mountain/blob/master/README.md), [모바일 안내](https://github.com/laetipark/happy-mountain/blob/master/mobile/README.md), [앱 manifest](https://github.com/laetipark/happy-mountain/blob/master/mobile/pubspec.yaml), [프록시 안내](https://github.com/laetipark/happy-mountain/blob/master/server/README.md)                                                                                  | Flutter·지도·기상·산림 데이터와 Node.js 프록시. iOS 실기기 검증·스토어 배포는 주장하지 않음                               |
| Blossom Stats | 기존 포트폴리오의 [원본 데이터](https://github.com/laetipark/laetipark.github.io/blob/c4cdcbfa96eac1dc73da276c693590a3fcdce6f2/src/common/data/portfolio.ts)                                                                                                                                                                                                                                                                               | 첫 전적 서비스의 설명·기간·상태·서비스 주소를 보존하고 Brawl Tree와의 관계 정리                                           |

## 기본 이미지와 배너

| 프로젝트      | 목록 이미지                                                                                                                                                                                      | 상세 이미지와 출처                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| Brawl Tree    | [공식 가로형 로고](https://github.com/laetipark/brawltree/blob/master/frontend/public/images/logo/brawltree/logo_horizontal.png) → [로컬 자산](../../src/assets/projects/brawltree-wordmark.png) | 기존 [서비스 화면](../../src/assets/brawltree.png)    |
| Sexynogi      | [README 대표 배너](https://github.com/laetipark/mobinogi-web/blob/master/frontend/public/thumbnail.png) → [로컬 자산](../../src/assets/projects/sexynogi-banner.png)                             | 같은 원본 사용, 상세에서 중복 표시하지 않음           |
| UNINOTE       | [로드맵 안내 화면](https://github.com/laetipark/uninote-web/blob/master/BBS/WebContent/img/1.%20map.PNG) → [로컬 자산](../../src/assets/projects/uninote-screen.png)                             | 전용 배너를 찾지 못해 실제 화면 사용                  |
| 산등성이      | [앱 로고](https://github.com/laetipark/happy-mountain/blob/master/mobile/assets/images/logo.png) → [로컬 자산](../../src/assets/projects/happy-mountain.png)                                     | 전용 배너 없이 기존 로고 사용                         |
| Blossom Stats | [Blossom 가로형 로고](https://github.com/laetipark/brawltree/blob/master/frontend/public/images/logo/blossom/logo_horizontal.png) → [로컬 자산](../../src/assets/projects/blossom-banner.png)    | 기존 [서비스 화면](../../src/assets/blossomstats.png) |

공개 저장소 파일 목록과 README에서 자산 경로를 확인한 뒤 내려받아 직접 검토했습니다. 학습 기록 날짜나 저장소 생성일을 프로젝트 개발 기간으로 바꾸지 않았습니다.

## 추가 프로젝트의 상세 근거

- [서비스 프로젝트 근거와 배너](sources-services.md): Orsem, Mystery Mango, Chat Laetus · LaetiPark API
- [백엔드·봇 프로젝트 근거와 배너](sources-experiments.md): 돈이머니, 여기가자, 피드모아, Gowatch, Blossom Bot

배너가 없는 Chat Laetus는 실제 로컬 UI에서 통제된 예시 응답을 캡처했습니다. 해당 이미지는 모델의 실제 추론 결과나 운영 서버 성능을 나타내지 않습니다. 각 프로젝트 서버·봇의 기능 테스트를 이번 포트폴리오 조사에서 수행한 것은 아닙니다.
