import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelopeSquare,
  faRssSquare,
} from '@fortawesome/free-solid-svg-icons';

import blossomStatsImage from '../../assets/blossomstats.png';
import brawlTreeImage from '../../assets/brawltree.png';

import type {
  ContactLink,
  PortfolioProject,
  SkillGroup,
  StudyRecord,
  SummaryCard,
  TimelineItem,
} from '../types/portfolio';

const badgeUrl = (
  label: string,
  color: string,
  logo: string,
  logoColor = 'FFFFFF',
) =>
  `https://img.shields.io/badge/${label}-${color}?style=for-the-badge&logo=${logo}&logoColor=${logoColor}`;

export const profile = {
  name: '박동훈',
  headline: '데이터를 통해 일상을 편하고 즐겁게 만드는 개발자',
  contacts: [
    {
      label: '이메일',
      value: 'creator98@naver.com',
      href: 'mailto:creator98@naver.com',
      icon: faEnvelopeSquare,
    },
    {
      label: '깃허브',
      value: 'github.com/laetipark',
      href: 'https://github.com/laetipark',
      icon: faGithubSquare,
      external: true,
    },
    {
      label: '블로그',
      value: 'blex.me/@laetipark',
      href: 'https://blex.me/@laetipark',
      icon: faRssSquare,
      external: true,
    },
  ] satisfies ContactLink[],
};

const studyRecords: StudyRecord[] = [
  {
    title: '코딩 테스트',
    links: [
      { label: 'github', href: 'https://github.com/laetipark/coding-test' },
      { label: 'blex', href: 'https://blex.me/@laetipark/series/coding-test' },
    ],
  },
  {
    title: '웹 프로그래밍',
    links: [
      {
        label: 'github',
        href: 'https://github.com/laetipark/web-programming',
      },
    ],
  },
  {
    title: 'Node.js',
    links: [
      {
        label: 'github',
        href: 'https://github.com/laetipark/node_js-textbook',
      },
      { label: 'blex', href: 'https://blex.me/@laetipark/series/node_js' },
    ],
  },
];

export const summaryCards: SummaryCard[] = [
  {
    id: 'backend',
    title: [
      '데이터를 통해 일상을 편하고',
      '즐겁게 만드는 것을 좋아합니다.',
    ],
    lines: [
      [
        '데이터를 구조화하고 서비스 기능이 수행되도록 구현하는 ',
        { text: '백엔드', variant: 'mark' },
        ' 개발에 관심 있어요.',
      ],
      [
        '평소 즐기던 모바일게임 전적 데이터를 제공하는 서비스를 ',
        { text: '개발', variant: 'mark' },
        '(BRAWL TREE)하여 ',
        { text: '배포', variant: 'mark' },
        '한 경험이 있습니다.',
      ],
      [
        '해당 게임사의 공식 ',
        { text: 'API', variant: 'mark' },
        '를 활용하였으며 실제 게임 플레이어들의 피드백을 받으며 안정화 작업과 고도화 작업을 진행합니다.',
      ],
    ],
  },
  {
    id: 'growth',
    title: [
      '자기개발과 자기계발을 위해',
      '적극적으로 참여하는 것을 좋아합니다.',
    ],
    lines: [
      [
        '다양한 알고리즘이나 문제를 풀이하며 알게 된 내용과 프로젝트에서 배운 점을 ',
        { text: '블로그', variant: 'mark' },
        '와 ',
        { text: '깃허브', variant: 'mark' },
        '에 ',
        { text: '기록', variant: 'mark' },
        '하는 것을 좋아합니다.',
      ],
      [
        '평소 ',
        { text: '소통', variant: 'mark' },
        '하는 것을 좋아해 코드에 관한 의견을 주고받고, 서비스 목표를 달성하기 위해 꾸준히 ',
        { text: '생각', variant: 'mark' },
        '하는 습관이 있습니다.',
      ],
    ],
    studyRecords,
  },
];

export const projects: PortfolioProject[] = [
  {
    id: 'blossom-stats',
    title: 'Blossom Stats',
    period: '2023. 01 ~ 04',
    image: blossomStatsImage,
    imageAlt: 'Blossom Stats 프로젝트 화면',
    statuses: [{ label: '운영 중', tone: 'production' }],
    bullets: [
      [
        {
          text: '브롤스타즈 공식 API',
          href: 'https://developer.brawlstars.com/',
          external: true,
        },
        '를 이용해 개발한 전적 사이트',
      ],
      ['플레이어 정보와 전투 기록을 데이터베이스에 수집'],
      ['플레이어 프로필, 전투 맵, 브롤러별 통계 확인'],
    ],
    facts: [
      { label: '언어 및 런타임 환경', values: ['Node.js (NestJS)'] },
      { label: '클라우드 서비스', values: ['Oracle Cloud'] },
      { label: '데이터베이스', values: ['MySQL'] },
    ],
    description: [
      [
        '브롤스타즈를 즐기는 사용자들과 함께 통계를 보면서 게임을 즐기고 싶어 개발한 ',
        { text: '첫 전적 사이트 프로젝트', variant: 'mark' },
        '입니다.',
      ],
    ],
    link: {
      label: 'brawltree.me/blossom',
      href: 'https://brawltree.me/blossom/',
    },
  },
  {
    id: 'brawl-tree',
    title: 'Brawl Tree',
    period: '2023. 06 ~',
    image: brawlTreeImage,
    imageAlt: 'Brawl Tree 프로젝트 화면',
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
        '를 이용해 개발한 전적 사이트',
      ],
      ['플레이어 정보와 전투 기록을 데이터베이스에 수집'],
      ['플레이어 프로필, 전투 맵, 브롤러별 통계 확인'],
    ],
    facts: [
      { label: '언어 및 런타임 환경', values: ['Node.js (NestJS)'] },
      { label: '클라우드 서비스', values: ['Oracle Cloud'] },
      { label: '데이터베이스', values: ['MySQL'] },
    ],
    description: [
      [
        { text: 'Blossom Stats', variant: 'mark' },
        ' 프로젝트를 확장해 더 많은 데이터를 수집하고 다른 사람들도 이용할 수 있는 ',
        { text: '전적 사이트 프로젝트', variant: 'mark' },
        '입니다.',
      ],
      [
        '많은 사용자 데이터를 주기적으로 받아오는 어려움은 ',
        { text: '병렬 방식을 통한 대량의 데이터 수집 scheduler', variant: 'mark' },
        '로 해결했습니다.',
      ],
      [
        '전적 사이트처럼 핵심 전적을 빠르게 확인할 수 있도록 ',
        { text: 'REST API', variant: 'mark' },
        '를 구현하고, 지금도 추가 기능을 개발하고 있습니다.',
      ],
    ],
    link: {
      label: 'brawltree.me',
      href: 'https://brawltree.me/',
    },
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: '언어',
    badges: [
      {
        label: 'Javascript',
        src: badgeUrl('Javascript', 'F7DF1E', 'Javascript', '000000'),
      },
      {
        label: 'Typescript',
        src: badgeUrl('Typescript', '3178C6', 'Typescript'),
      },
    ],
  },
  {
    title: '런타임 및 프레임워크',
    badges: [
      { label: 'Node.js', src: badgeUrl('Node.js', '339933', 'Node.js') },
      { label: 'NestJS', src: badgeUrl('NestJS', 'E0234E', 'NestJS') },
      { label: 'React', src: badgeUrl('React', '61DAFB', 'React', '000000') },
    ],
  },
  {
    title: '도구',
    badges: [
      { label: 'MySQL', src: badgeUrl('MySQL', '4479A1', 'mysql') },
      { label: 'OCI', src: badgeUrl('OCI', 'F80000', 'oracle') },
      { label: 'AWS', src: badgeUrl('AWS', '232F3E', 'amazonaws') },
      { label: 'WebStorm', src: badgeUrl('WebStorm', '0870EF', 'WebStorm') },
      {
        label: 'VS Code',
        src: badgeUrl('VSCODE', '007ACC', 'VisualStudioCode'),
      },
      { label: 'Ubuntu', src: badgeUrl('Ubuntu', 'E95420', 'Ubuntu') },
      { label: 'Github', src: badgeUrl('Github', '181717', 'Github') },
      { label: 'Docker', src: badgeUrl('Docker', '2496ED', 'Docker') },
    ],
  },
];

export const educationItems: TimelineItem[] = [
  {
    title: '한라대학교 (2017.03 - 2023. 02)',
    lines: [
      ['ICT융합공학부 컴퓨터공학전공 학사 졸업 (4.44 / 4.5)'],
      [
        {
          text: '알고리즘, 데이터베이스, 웹 개발, 네트워크 등 과목 이수',
          variant: 'accent',
        },
      ],
    ],
  },
];

export const activities: TimelineItem[] = [
  {
    title: '정보처리기사 (2022.09)',
    lines: [['한국산업인력공단 발급(22202110222N)']],
  },
  {
    title: '한라대학교 제 14기 나눔공부방 (2020. 12)',
    lines: [
      ['3명의 대학생 튜티와 함께 2개월 동안 진행한 튜터 활동'],
      [
        '튜티들이 대학교에서 배우는 C언어 과목에서 부족한 것들을 확인하고 질문 받아 복습 진행',
      ],
      [
        'Baekjoon Online Judge에서 학습한 주제와 관련한 문제 풀이를 진행하고 서로의 코드를 리뷰',
      ],
      [
        {
          text: '문제 풀이를 하면서 다양한 풀이 방식과 가독성, 성능 관점의 코드를 배울 수 있었던 경험입니다.',
          variant: 'accent',
        },
      ],
    ],
  },
];
