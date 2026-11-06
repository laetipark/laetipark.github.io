import type { PortfolioProject } from '../types/portfolio';

import orsemImage from '../../assets/projects/orsem-ui.png';
import mysteryMangoImage from '../../assets/projects/mystery-mango.jpg';
import chatLaetusImage from '../../assets/projects/chat-laetus.jpg';
import chatLaetusBanner from '../../assets/projects/chat-laetus-banner.png';
import orsemBanner from '../../assets/projects/orsem-banner.png';
import mysteryMangoBanner from '../../assets/projects/mystery-mango-banner.png';

export const serviceProjects: PortfolioProject[] = [
  {
    id: 'orsem',
    title: 'Orsem',
    category: 'web',
    banner: orsemBanner,
    bannerAlt:
      'ORSEM 공시·시장 관측 도구 문구와 합장한 손·상승 막대가 있는 배너',
    bannerCaption: '공개 저장소의 프로젝트 배너',
    image: orsemImage,
    imageAlt: 'Orsem의 데스크톱·모바일 관측 화면과 배치 설명을 담은 UI 목업',
    imageCaption: '저장소의 UI 목업 · 예시 데이터',
    summary:
      '공시, 시장 가격과 뉴스 메타데이터를 출처·시점과 함께 살펴보는 개인용 관측 서비스입니다.',
    highlights: [
      ['Python 수집 워커와 BullMQ 작업 큐를 연결한 데이터 처리'],
      ['공시·종목 차트·개인 및 공유 관심 목록을 하나의 화면 흐름으로 구성'],
    ],
    statuses: [],
    bullets: [
      ['국내외 공시와 내부자 소유변동, 정정 연결 및 검토 상태 탐색'],
      ['종목 가격 차트와 공시·뉴스 이벤트, 관심 목록과 통합 검색'],
      ['수집 실행 이력·실패·재시도 확인 및 Discord 조회·알림 연동'],
    ],
    facts: [
      { label: '프런트엔드', values: ['React', 'TypeScript', 'Vite'] },
      { label: 'API · 워커', values: ['NestJS', 'Python', 'BullMQ'] },
      { label: '데이터 · 계약', values: ['MySQL', 'Redis', 'TypeORM', 'Zod'] },
    ],
    story: [
      {
        title: '수집과 조회의 분리',
        lines: [
          [
            'NestJS API, React 웹, Python 수집 워커와 Discord 봇으로 구성을 나눕니다. 워커는 BullMQ 작업을 처리하고 MySQL에 수집 데이터를, Redis에 큐와 세션을 저장합니다.',
          ],
          [
            '공통 API 계약은 Zod로 검증하고 DB 변경은 TypeORM 마이그레이션으로 관리합니다. 수집 작업에는 재시도와 지수 백오프를 적용합니다.',
          ],
        ],
      },
      {
        title: '출처와 시점을 보존하는 데이터',
        lines: [
          [
            '원본 필드와 출처, 이용 권리, 사건일·접수일·최초 관측 시각을 구분합니다. 뉴스는 허용된 메타데이터를 다루며, 거래계획과 실제 소유변동을 서로 다른 사건으로 표시합니다.',
          ],
        ],
      },
    ],
    links: [
      {
        label: '서비스 방문',
        href: 'https://orsem.laetipark.me',
        external: true,
      },
      {
        label: 'GitHub',
        href: 'https://github.com/laetipark/orsem',
        external: true,
      },
    ],
  },
  {
    id: 'mystery-mango',
    title: 'Mystery Mango',
    category: 'web',
    banner: mysteryMangoBanner,
    bannerAlt:
      '망고 탐정과 주사위·카드, Mystery Mango 제목이 있는 프로젝트 배너',
    bannerCaption: '공개 저장소의 프로젝트 배너',
    image: mysteryMangoImage,
    imageAlt: 'Mystery Mango의 게임 제작·탐색과 게임 유형을 소개하는 홈 UI',
    imageCaption: '배포 화면을 바탕으로 정리한 Figma UI',
    summary:
      '머더미스터리와 보드게임을 직접 만들고, 공개된 작품을 찾아 함께 플레이하는 웹 플랫폼입니다.',
    highlights: [
      ['제작·시험·검수·공개로 이어지는 게임 제작 스튜디오'],
      ['Java 서버의 규칙 판정과 역할별 자료 열람 제어'],
    ],
    statuses: [],
    bullets: [
      ['작품 탐색, 방 생성·참가, 조건별 자동 매칭과 플레이 기록'],
      ['역할·단서·조사·투표·엔딩 및 카드·말·주사위를 활용하는 게임 진행'],
      ['템플릿 선택, 게임판·이야기 편집, 고정 버전 시험과 공개 검수'],
    ],
    facts: [
      {
        label: '프런트엔드',
        values: ['React', 'TypeScript', 'Konva', 'TanStack Query'],
      },
      {
        label: '백엔드 · 통신',
        values: ['Java', 'Spring Boot', 'WebSocket'],
      },
      { label: '데이터 · 배포', values: ['PostgreSQL', 'Flyway', 'Docker'] },
    ],
    story: [
      {
        title: '제작 버전과 실행 상태의 분리',
        lines: [
          [
            '초안 저장 시 revision을 비교해 편집 충돌을 검사합니다. 시험과 공개에는 고정한 버전을 사용하므로 이후 초안 수정이 진행 중인 게임을 바꾸지 않습니다.',
          ],
        ],
      },
      {
        title: '서버를 기준으로 맞추는 게임 상태',
        lines: [
          [
            'Java 서버가 게임 규칙과 참가자별 자료 열람 권한을 판정합니다. PostgreSQL 트랜잭션·잠금·제약 조건으로 상태와 중복 처리를 관리합니다.',
          ],
          [
            'WebSocket은 변경 알림을 전달하고 REST 조회가 최신 상태의 기준이 됩니다. 실제 플레이와 작가 시험은 같은 게임 계산과 권한별 응답을 공유합니다.',
          ],
        ],
      },
    ],
    links: [
      {
        label: '서비스 방문',
        href: 'https://mystery.laetipark.me',
        external: true,
      },
      {
        label: 'GitHub',
        href: 'https://github.com/laetipark/mystery-mango',
        external: true,
      },
    ],
  },
  {
    id: 'chat-laetus',
    title: 'Chat Laetus · LaetiPark API',
    category: 'backend',
    banner: chatLaetusBanner,
    bannerAlt:
      '초록 배경에 대화 말풍선과 이미지 입력을 표현한 Chat Laetus 배너',
    bannerCaption: '프로젝트 소개 배너 · AI 생성',
    image: chatLaetusImage,
    imageAlt:
      '예시 질문과 응답, 이미지 첨부와 깊게 생각하기 도구가 있는 Chat Laetus 화면',
    imageCaption: '로컬 채팅 화면 · 예시 응답',
    summary:
      '대화 기록과 이미지 입력을 처리하고 OpenAI 호환 llama-server에 연결하는 채팅 API와 클라이언트입니다.',
    highlights: [
      ['대화 ID를 통한 기록 저장·조회와 이어지는 질문 처리'],
      ['이미지 입력 정규화와 모델 응답의 오류·반복 패턴 검증'],
    ],
    statuses: [],
    bullets: [
      ['새 대화 생성, 기존 대화 이어가기 및 저장 메시지 조회'],
      ['텍스트·이미지 입력과 깊게 생각하기 옵션 전달'],
      ['이전 클라이언트용 호환 endpoint와 로컬 React 채팅 UI 제공'],
    ],
    facts: [
      { label: 'API', values: ['NestJS', 'TypeScript', 'Express'] },
      { label: '데이터', values: ['MySQL', 'TypeORM'] },
      { label: '모델 · 클라이언트', values: ['llama-server', 'React', 'Vite'] },
    ],
    story: [
      {
        title: '대화 저장과 모델 입력의 분리',
        lines: [
          [
            '대화 ID로 메시지를 저장하고 이어지는 요청을 연결합니다. 전체 텍스트 기록은 DB에 유지하되 모델에는 제한된 최근 대화 컨텍스트를 전달합니다.',
          ],
          [
            '이미지는 지원 형식으로 정규화해 현재 사용자 메시지의 모델 요청에 첨부합니다. API의 DB에는 이미지 대신 텍스트 메시지를 저장합니다.',
          ],
        ],
      },
      {
        title: '모델 응답을 클라이언트 계약으로 정리',
        lines: [
          [
            'llama-server의 OpenAI 호환 endpoint를 호출하고 응답에서 think 태그 내용을 제거합니다. 빈 응답, 파싱 오류와 반복 패턴으로 판정한 응답은 오류로 처리하며 assistant 메시지로 저장하지 않습니다.',
          ],
        ],
      },
    ],
    links: [
      { label: '채팅 체험', href: '/chat', external: false },
      {
        label: 'GitHub',
        href: 'https://github.com/laetipark/laetipark-api',
        external: true,
      },
    ],
  },
];
