import blossomBotLogo from '../../assets/projects/blossom-bot-logo.png';
import feedMoaBanner from '../../assets/projects/feed-moa-banner.png';
import feedMoaErd from '../../assets/projects/feed-moa-erd.png';
import gowatchLogo from '../../assets/projects/gowatch-logo.png';
import letsGoHereBanner from '../../assets/projects/lets-go-here-banner.png';
import letsGoHereErd from '../../assets/projects/lets-go-here-erd.png';
import moneyIsMoneyBanner from '../../assets/projects/money-is-money-banner.png';
import moneyIsMoneyErd from '../../assets/projects/money-is-money-erd.png';

import type { PortfolioProject } from '../types/portfolio';
import gowatchBanner from '../../assets/projects/gowatch-banner.png';
import blossomBotBanner from '../../assets/projects/blossom-bot-banner.png';

export const experimentProjects: PortfolioProject[] = [
  {
    id: 'money-is-money',
    title: '돈이머니',
    category: 'backend',
    banner: moneyIsMoneyBanner,
    bannerAlt: '저금통과 예산 관리 애플리케이션 문구가 담긴 돈이머니 소개 배너',
    bannerCaption: '프로젝트 소개 배너 · README 원본',
    image: moneyIsMoneyErd,
    imageAlt:
      '사용자·예산·카테고리·지출의 관계를 나타낸 돈이머니 데이터베이스 ERD',
    imageCaption: '데이터베이스 ERD · 프로젝트 README',
    summary:
      '월별 예산을 세우고 지출을 기록하며 소비 흐름을 확인하는 예산 관리 API입니다.',
    highlights: [
      ['비슷한 총예산을 가진 사용자의 카테고리별 예산 추천'],
      ['일일 지출 추천·현황 집계와 예약 이메일 알림'],
    ],
    statuses: [],
    bullets: [
      ['JWT 인증과 사용자별 예산·지출 접근 권한 관리'],
      ['기간·카테고리·금액 조건으로 지출 조회 및 합계 계산'],
      ['월별 예산을 바탕으로 일일 지출 가능 금액과 위험도 안내'],
    ],
    facts: [
      {
        label: '언어 · 프레임워크',
        values: ['TypeScript', 'Node.js', 'NestJS'],
      },
      { label: '데이터', values: ['TypeORM', 'MySQL', 'Redis'] },
      { label: '인증 · 검증', values: ['JWT', 'Jest'] },
    ],
    story: [
      {
        title: '예산 추천 기준',
        lines: [
          [
            '전체 사용자의 평균 예산 비율만으로는 예산 규모와 소비 성향의 차이를 반영하기 어렵다고 보고, 총예산이 가까운 사용자 10명의 카테고리별 예산을 참고하도록 구성했습니다.',
          ],
          [
            '지출 목록에서는 전체 합계와 카테고리별 합계를 함께 제공하고, 합계에서 제외할 항목도 지정할 수 있습니다.',
          ],
        ],
      },
      {
        title: '일상적인 확인을 돕는 자동화',
        lines: [
          [
            '월별 예산과 누적 지출을 바탕으로 오늘의 지출 추천 금액과 소비 현황을 계산합니다.',
          ],
          [
            '알림에 동의한 사용자에게 아침에는 추천 금액을, 저녁에는 당일 지출 현황을 이메일로 보내는 Cron 작업을 구현했습니다.',
          ],
        ],
      },
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/laetipark/money-is-money',
        external: true,
      },
    ],
  },
  {
    id: 'lets-go-here',
    title: '여기가자',
    category: 'backend',
    banner: letsGoHereBanner,
    bannerAlt:
      '음식과 태블릿 그림으로 위치 기반 맛집 추천을 소개하는 여기가자 배너',
    bannerCaption: '프로젝트 소개 배너 · 팀 README 원본',
    image: letsGoHereErd,
    imageAlt: '사용자와 음식점, 평가의 관계를 나타낸 여기가자 데이터베이스 ERD',
    imageCaption: '데이터베이스 ERD · 팀 프로젝트 README',
    summary:
      '공공데이터와 사용자 위치를 연결해 주변 음식점을 탐색하는 맛집 추천 API입니다.',
    highlights: [
      ['검색어·거리·평점 조건을 적용한 주변 맛집 조회'],
      ['사용자 인증·위치 설정과 시군구 데이터 캐싱'],
    ],
    role: 'TypeORM 마이그레이션, 회원가입·JWT 로그인, 사용자 위치·추천 설정, 시군구 캐싱과 주변 맛집 조회',
    statuses: [],
    bullets: [
      ['공공데이터 기반 음식점 목록 수집·갱신'],
      ['사용자 위치와 검색 조건에 맞는 음식점 목록 제공'],
      ['음식점 평가와 동의한 사용자를 위한 점심 추천'],
    ],
    facts: [
      {
        label: '언어 · 프레임워크',
        values: ['TypeScript', 'Node.js', 'NestJS'],
      },
      { label: '데이터', values: ['TypeORM', 'MySQL', 'Redis'] },
      { label: '인증 · 검증', values: ['JWT', 'Jest'] },
    ],
    story: [
      {
        title: '위치 정보를 검색 경험으로',
        lines: [
          [
            '사용자의 위도·경도와 검색어를 바탕으로 주변 맛집을 조회하고, 거리와 평점으로 정렬하는 API를 담당했습니다.',
          ],
          [
            '회원가입과 JWT 로그인, 사용자 정보 조회, 위치 및 점심 추천 여부 설정을 구현했습니다.',
          ],
        ],
      },
      {
        title: '함께 사용할 데이터 기반',
        lines: [
          [
            'TypeORM 마이그레이션으로 데이터베이스 구조를 관리하고, CSV와 스케줄링을 이용해 시군구 목록을 캐싱하는 작업에 참여했습니다.',
          ],
          [
            '팀에서는 공공데이터 전처리, 음식점 평가, 상세 정보 캐싱과 Discord 점심 추천을 함께 구성했습니다.',
          ],
        ],
      },
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/laetipark/lets-go-here',
        external: true,
      },
    ],
  },
  {
    id: 'feed-moa',
    title: '피드모아',
    category: 'backend',
    banner: feedMoaBanner,
    bannerAlt:
      '소셜 미디어 로고와 통합 피드 서비스 문구가 담긴 피드모아 소개 배너',
    bannerCaption: '프로젝트 소개 배너 · 팀 README 원본',
    image: feedMoaErd,
    imageAlt:
      '사용자·인증 코드·게시물·해시태그로 구성된 피드모아 데이터베이스 ERD',
    imageCaption: '데이터베이스 ERD · 팀 프로젝트 README',
    summary:
      '여러 SNS의 게시물을 해시태그로 탐색하고 통계를 확인하는 통합 피드 API입니다.',
    highlights: [
      ['회원가입 입력 검증과 가입 승인용 인증 코드 발급'],
      ['마이그레이션·시드 스크립트로 데이터베이스 초기화'],
    ],
    role: '데이터베이스 마이그레이션·시드 생성, 회원가입 검증과 가입 승인용 인증 코드 발급',
    statuses: [],
    bullets: [
      ['해시태그 검색, SNS 필터와 페이지네이션을 적용한 게시물 조회'],
      ['게시물 개수·조회수·좋아요·공유 횟수 통계'],
      ['가상 외부 API URL을 사용하는 좋아요·공유 요청'],
    ],
    facts: [
      {
        label: '언어 · 프레임워크',
        values: ['TypeScript', 'Node.js', 'NestJS'],
      },
      { label: '데이터', values: ['TypeORM', 'MySQL'] },
      { label: '인증 · 검증', values: ['JWT', 'Jest'] },
    ],
    story: [
      {
        title: '가입 과정과 초기 데이터',
        lines: [
          [
            '계정명 중복, 이메일 형식과 비밀번호 조건을 검증하는 회원가입 API를 담당하고, 가입 승인 단계에서 사용할 인증 코드를 발급했습니다.',
          ],
          [
            '팀에서 같은 데이터 구조와 초기 데이터로 작업할 수 있도록 테이블 마이그레이션과 시드 생성 스크립트를 구성했습니다.',
          ],
        ],
      },
      {
        title: '통합 피드의 API 설계',
        lines: [
          [
            '팀 프로젝트로 게시물 검색·조회, 통계, 가입 승인과 로그인 흐름을 구성했습니다.',
          ],
          [
            '좋아요와 공유 요청은 SNS 종류별 가상 API URL을 사용하는 모의 연동으로 구성했습니다.',
          ],
        ],
      },
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/laetipark/feed-moa',
        external: true,
      },
    ],
  },
  {
    id: 'gowatch-bot',
    title: 'Gowatch',
    category: 'bot',
    banner: gowatchBanner,
    bannerAlt: '노란 바탕의 G·스톱워치 아이콘과 Gowatch 이름을 나란히 배치한 소개 배너',
    bannerCaption: '프로젝트 소개 배너 · AI 생성',
    image: gowatchLogo,
    imageAlt: '노란 바탕에 타이머 모양을 더한 Gowatch 봇 로고',
    imageCaption: '봇 로고 · 프로젝트 저장소',
    summary:
      'Discord에서 집중 시간과 음성채팅 이용 시간을 기록하는 타이머 봇입니다.',
    highlights: [
      ['집중 타이머 시작·일시정지·재개·종료'],
      ['집중 시간과 음성채팅 기록을 보여주는 리더보드'],
    ],
    statuses: [],
    bullets: [
      ['시·분·초 단위로 집중 타이머 설정'],
      ['진행 중인 집중 모드 참여자와 남은 시간 확인'],
      ['집중·음성채팅 누적 시간 상위 사용자 조회'],
    ],
    facts: [
      { label: '언어 · 런타임', values: ['JavaScript', 'Node.js'] },
      { label: '봇', values: ['Discord.js'] },
      { label: '데이터', values: ['Sequelize', 'MySQL'] },
    ],
    story: [
      {
        title: '집중 상태를 이어가는 타이머',
        lines: [
          [
            '집중을 시작한 뒤 잠시 멈추거나 다시 이어갈 수 있도록 타이머와 상태 전환을 구성했습니다. 종료 시에는 기록한 시간과 결과를 Discord 메시지로 안내합니다.',
          ],
        ],
      },
      {
        title: '기록을 함께 확인하기',
        lines: [
          [
            '집중 상태와 음성채팅 상태, 각각의 누적 시간을 데이터 모델로 나누어 저장합니다.',
          ],
          [
            '현재 집중 중인 참여자 목록과 집중·음성채팅 리더보드를 Discord 임베드로 제공합니다.',
          ],
        ],
      },
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/laetipark/gowatch-bot',
        external: true,
      },
    ],
  },
  {
    id: 'blossom-bot',
    title: 'Blossom Bot',
    category: 'bot',
    banner: blossomBotBanner,
    bannerAlt: '벚꽃 B 아이콘과 Blossom Bot 이름을 나란히 배치한 보라색 소개 배너',
    bannerCaption: '프로젝트 소개 배너 · AI 생성',
    image: blossomBotLogo,
    imageAlt: '보라색 바탕의 벚꽃과 B 문양으로 구성한 Blossom Discord 봇 로고',
    imageCaption: '봇 로고 · 프로젝트 저장소',
    summary:
      '브롤스타즈 플레이어 정보와 랜덤 브롤러 선택을 Discord에서 제공하는 봇입니다.',
    highlights: [
      ['플레이어 태그로 프로필과 트로피 정보 조회'],
      ['희귀도·역할군·성별 조건으로 랜덤 브롤러 선택'],
    ],
    statuses: [],
    bullets: [
      ['도움말 명령으로 이용 안내 제공'],
      ['프로필 명령으로 플레이어 정보 확인'],
      ['뽑기 명령으로 조건에 맞는 브롤러 추천'],
    ],
    facts: [
      { label: '언어 · 런타임', values: ['TypeScript', 'Node.js'] },
      { label: '봇 · 통신', values: ['Discord.js', 'Axios'] },
    ],
    story: [
      {
        title: '게임 정보를 대화 안으로',
        lines: [
          [
            '슬래시 명령의 입력을 서비스 호출로 연결하고, 플레이어 프로필과 랜덤 브롤러 결과를 이미지가 포함된 Discord 임베드로 보여줍니다.',
          ],
        ],
      },
      {
        title: '조건을 선택하는 명령',
        lines: [
          [
            '프로필 조회에는 플레이어 태그를 받고, 랜덤 뽑기에는 희귀도·역할군·성별을 선택 조건으로 제공합니다.',
          ],
          [
            '명령 정의와 실행, 데이터 요청을 분리해 도움말·프로필·뽑기 기능을 구성했습니다.',
          ],
        ],
      },
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/laetipark/brawltree-discord',
        external: true,
      },
    ],
  },
];
