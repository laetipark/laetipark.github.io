import blossomStatsImage from '../../assets/blossomstats.png';
import brawlTreeBanner from '../../assets/projects/brawltree-wordmark.png';
import blossomBanner from '../../assets/projects/blossom-banner.png';
import brawlTreeImage from '../../assets/brawltree.png';
import sexynogiImage from '../../assets/projects/sexynogi-banner.png';
import uninoteImage from '../../assets/projects/uninote-screen.png';
import mountainImage from '../../assets/projects/happy-mountain.png';
import mountainBanner from '../../assets/projects/happy-mountain-banner.png';
import uninoteBanner from '../../assets/projects/uninote-banner.png';
import type { PortfolioProject } from '../types/portfolio';
import { experimentProjects } from './project-experiments';
import { serviceProjects } from './project-services';

export const projects: PortfolioProject[] = [
  {
    id: 'brawl-tree',
    title: 'Brawl Tree',
    category: 'web',
    featured: true,
    summary:
      '플레이어의 전적부터 브롤러·맵·랭킹까지, 브롤스타즈 데이터를 탐색하는 서비스입니다.',
    highlights: [
      ['병렬 스케줄러로 수집한 게임 데이터를 REST API로 연결'],
      ['플레이어 검색·전투 기록·맵 통계를 하나의 화면 흐름으로 구성'],
    ],
    period: '2023. 06 ~',
    banner: brawlTreeBanner,
    bannerAlt: 'Brawl Tree 가로형 브랜드 로고',
    bannerCaption: '프로젝트의 가로형 로고',
    image: brawlTreeImage,
    imageAlt: 'Brawl Tree 전적 조회 서비스 화면',
    imageCaption: '기존 포트폴리오에 수록된 서비스 화면',
    statuses: [
      { label: '개발 중', tone: 'development' },
      { label: '운영 중', tone: 'production' },
    ],
    bullets: [
      [
        {
          text: '브롤스타즈 공식 API',
          href: 'https://developer.brawlstars.com/',
          external: true,
        },
        ' 기반 게임 데이터 조회',
      ],
      ['플레이어 검색, 프로필, 보유 브롤러와 전투 기록 조회'],
      ['브롤러·맵별 통계와 현재·다음 이벤트 로테이션 확인'],
      ['플레이어·클럽·브롤러별 랭킹과 지역별 소식 탐색'],
    ],
    facts: [
      {
        label: '프론트엔드',
        values: ['React', 'TypeScript', 'Vite', 'ECharts'],
      },
      { label: '백엔드', values: ['NestJS', 'TypeORM', 'MySQL'] },
      { label: '인프라', values: ['Oracle Cloud'] },
    ],
    story: [
      {
        title: '작은 전적 사이트에서 데이터 서비스로',
        lines: [
          [
            'Blossom Stats에서 시작한 전적 조회 경험을 확장해 더 많은 플레이어가 게임 데이터를 탐색할 수 있도록 구성했습니다.',
          ],
        ],
      },
      {
        title: '수집부터 화면까지 이어지는 데이터 흐름',
        lines: [
          [
            '공식 API의 플레이어·전투 기록을 병렬 스케줄러로 수집해 MySQL에 저장하고, NestJS의 REST API로 제공합니다.',
          ],
          [
            'React 화면에서는 검색과 통계를 연결합니다. 프론트엔드 정적 파일과 /api 경로를 같은 서버에서 제공하는 구조를 사용합니다.',
          ],
        ],
      },
    ],
    links: [
      { label: '서비스 방문', href: 'https://brawltree.me/' },
      { label: 'GitHub', href: 'https://github.com/laetipark/brawltree' },
    ],
  },
  {
    id: 'sexynogi',
    title: 'Sexynogi',
    category: 'web',
    featured: true,
    summary:
      '마비노기 모바일의 커뮤니티, 길드 활동과 게임 정보를 함께 다루는 웹 서비스와 메신저 봇입니다.',
    highlights: [
      ['게시판·길드·캐릭터 할 일과 아이템 정보를 한곳에 구성'],
      ['웹 서비스와 카카오 메신저 봇으로 정보 조회·소식 알림 제공'],
    ],
    banner: sexynogiImage,
    bannerAlt: 'Sexynogi 프로젝트 대표 배너',
    bannerCaption: '저장소의 대표 배너',
    image: sexynogiImage,
    imageAlt: '픽셀 캐릭터와 Sexynogi 이름이 있는 프로젝트 대표 이미지',
    imageCaption: '프로젝트 브랜드 썸네일',
    statuses: [],
    bullets: [
      ['게시판·갤러리와 길드 활동, 캐릭터별 할 일 관리'],
      ['아이템·거래·제작 정보 탐색'],
      ['메신저 명령으로 아이템·캐릭터 조회와 새 소식 알림'],
    ],
    facts: [
      { label: '프론트엔드', values: ['React', 'TypeScript', 'Vite'] },
      {
        label: '백엔드',
        values: ['Java', 'Spring Boot', 'Spring Security', 'MySQL', 'Redis'],
      },
      { label: '배포 · 봇', values: ['Docker', 'Nginx', 'JavaScript'] },
    ],
    story: [
      {
        title: '커뮤니티와 게임 정보 연결',
        lines: [
          [
            'React 화면과 Spring Boot API로 커뮤니티와 캐릭터 관리 기능을 구성하고, 데이터 저장·캐시에는 MySQL과 Redis를 사용합니다.',
          ],
        ],
      },
      {
        title: '메신저에서도 이어지는 이용 흐름',
        lines: [
          [
            '별도 카카오 메신저 봇 저장소에서 명령 기반 조회와 공지 알림을 제공합니다. 새 글과 제목 변경을 감지하는 알림 로직을 포함하며, 메신저 봇 런타임에서 실행됩니다.',
          ],
        ],
      },
    ],
    links: [
      { label: '웹 GitHub', href: 'https://github.com/laetipark/mobinogi-web' },
      { label: '봇 GitHub', href: 'https://github.com/laetipark/mobinogi-bot' },
    ],
  },
  ...serviceProjects,
  {
    id: 'uninote',
    title: 'UNINOTE',
    category: 'web',
    banner: uninoteBanner,
    bannerAlt: '하늘색 배경의 노트와 마인드맵을 그린 UNINOTE 소개 배너',
    bannerCaption: '프로젝트 소개 배너 · AI 생성',
    summary:
      '학습 내용을 마인드맵으로 정리하고 노트와 첨부 자료를 관리하는 웹·Android 프로젝트입니다.',
    highlights: [
      ['학년별 로드맵과 노드를 편집하고 자동 저장'],
      ['노트·첨부 자료·공개 로드맵을 통한 학습 기록 공유'],
    ],
    image: uninoteImage,
    imageAlt: '학년별 노드가 연결된 UNINOTE 마인드맵 화면',
    imageCaption: '웹 저장소의 로드맵 사용 안내 화면',
    statuses: [],
    bullets: [
      ['마인드맵 노드 추가·이동·편집과 자동 저장'],
      ['노드별 설명과 첨부 파일 업로드·다운로드'],
      ['공개 로드맵, 학습 게시판과 자유 게시판'],
    ],
    facts: [
      { label: '웹', values: ['Java', 'JSP', 'MySQL'] },
      { label: 'Android', values: ['Kotlin', 'Retrofit', 'PHP'] },
    ],
    story: [
      {
        title: '학습 내용을 관계로 정리하기',
        lines: [
          [
            '학년과 주제를 노드로 연결하고 각 노드에 설명과 자료를 더하는 로드맵을 구현했습니다. 웹의 편집 안내와 Android의 마인드맵 화면을 하나의 프로젝트로 소개합니다.',
          ],
        ],
      },
      {
        title: '웹과 Android의 구성',
        lines: [
          [
            '웹은 JSP와 MySQL을 사용합니다. Android 앱은 Kotlin과 Retrofit으로 구성되어 있으며, 저장소에 PHP API 코드도 포함합니다.',
          ],
        ],
      },
    ],
    links: [
      { label: '웹 GitHub', href: 'https://github.com/laetipark/uninote-web' },
      {
        label: 'Android GitHub',
        href: 'https://github.com/laetipark/uninote-app',
      },
    ],
  },
  {
    id: 'happy-mountain',
    title: '산등성이',
    category: 'app',
    banner: mountainBanner,
    bannerAlt: '웃는 해와 산 아이콘 옆에 산등성이 이름을 배치한 소개 배너',
    bannerCaption: '프로젝트 소개 배너 · AI 생성',
    summary:
      '주변 산과 날씨, 지역별 산불 위험 예보를 지도에서 확인하는 Flutter 앱입니다.',
    highlights: [
      ['카카오 지도와 기상·산림 공공데이터 연결'],
      ['지역과 시점에 따른 산불 위험 예보 탐색'],
    ],
    image: mountainImage,
    imageAlt: '산등성이 앱 로고',
    imageCaption: '저장소의 앱 로고',
    statuses: [],
    bullets: [
      ['현재 위치를 기준으로 주변 산과 날씨 확인'],
      ['지역·시점 조건으로 산불 위험 예보 조회'],
      ['모바일 화면과 웹용 API 프록시 구성'],
    ],
    facts: [
      { label: '앱', values: ['Flutter', 'Dart'] },
      { label: '연동', values: ['Node.js', 'Kakao Maps', '공공데이터 API'] },
    ],
    story: [
      {
        title: '지도에 공공데이터를 더하기',
        lines: [
          [
            'Flutter 공통 화면에 카카오 지도와 기상·산림 데이터를 연결합니다. 웹에서는 Node.js 프록시를 통해 외부 API를 요청하도록 구성했습니다.',
          ],
        ],
      },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/laetipark/happy-mountain' },
    ],
  },
  ...experimentProjects,
  {
    id: 'blossom-stats',
    title: 'Blossom Stats',
    category: 'web',
    summary: '함께 통계를 보며 게임을 즐기기 위해 만든 첫 전적 서비스입니다.',
    highlights: [
      ['공식 API 기반 플레이어·전투 기록 수집'],
      ['프로필, 전투 맵과 브롤러별 통계 제공'],
    ],
    period: '2023. 01 ~ 04',
    banner: blossomBanner,
    bannerAlt: 'Blossom 프로젝트의 가로형 브랜드 로고',
    bannerCaption: '프로젝트의 가로형 로고',
    image: blossomStatsImage,
    imageAlt: 'Blossom Stats 전적 조회 서비스 화면',
    imageCaption: '기존 포트폴리오에 수록된 서비스 화면',
    statuses: [{ label: '운영 중', tone: 'production' }],
    bullets: [
      [
        {
          text: '브롤스타즈 공식 API',
          href: 'https://developer.brawlstars.com/',
          external: true,
        },
        '에서 플레이어 정보와 전투 기록 수집',
      ],
      ['플레이어 프로필, 전투 맵과 브롤러별 통계 확인'],
    ],
    facts: [
      { label: '백엔드', values: ['Node.js', 'NestJS', 'MySQL'] },
      { label: '인프라', values: ['Oracle Cloud'] },
    ],
    story: [
      {
        title: 'Brawl Tree로 이어진 첫 출발',
        lines: [
          [
            '브롤스타즈를 즐기는 사용자들과 함께 통계를 보며 게임을 즐기고 싶어 개발했습니다. 플레이어와 전투 기록을 모으는 경험을 이후 Brawl Tree의 확장으로 이어갔습니다.',
          ],
        ],
      },
    ],
    links: [{ label: '서비스 방문', href: 'https://brawltree.me/blossom/' }],
  },
];
