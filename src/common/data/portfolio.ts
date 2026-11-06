import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelopeSquare,
  faRssSquare,
} from '@fortawesome/free-solid-svg-icons';

export { projects } from './project-catalog';

import type {
  ContactLink,
  SkillGroup,
  StudyRecord,
  SummaryCard,
  TimelineItem,
} from '../types/portfolio';

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

export const studyRecords: StudyRecord[] = [
  {
    title: '코딩 테스트',
    links: [
      { label: 'GitHub', href: 'https://github.com/laetipark/coding-test' },
      {
        label: '블로그',
        href: 'https://blex.me/@laetipark/series/coding-test',
      },
    ],
  },
  {
    title: '웹 프로그래밍',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/laetipark/web-programming',
      },
    ],
  },
  {
    title: 'Node.js',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/laetipark/node_js-textbook',
      },
      { label: '블로그', href: 'https://blex.me/@laetipark/series/node_js' },
    ],
  },
];

export const summaryCards: SummaryCard[] = [
  {
    id: 'backend',
    title: ['데이터를 서비스로 연결합니다.'],
    lines: [
      [
        '데이터를 구조화하고 서비스의 동작을 구현하는 백엔드 개발에 관심이 있습니다.',
      ],
      [
        '즐기던 게임의 공식 API로 Brawl Tree를 개발·배포하고, 실제 플레이어의 피드백을 바탕으로 안정화와 고도화를 이어갑니다.',
      ],
    ],
  },
  {
    id: 'growth',
    title: ['기록하고, 함께 생각합니다.'],
    lines: [
      [
        '알고리즘 문제 풀이와 프로젝트에서 배운 점을 블로그와 GitHub에 기록합니다.',
      ],
      [
        '코드에 관한 의견을 나누고, 서비스의 목표를 이루기 위한 더 나은 방법을 꾸준히 생각합니다.',
      ],
    ],
    studyRecords,
  },
];

export const skillGroups: SkillGroup[] = [
  { title: '언어', items: ['JavaScript', 'TypeScript'] },
  { title: '런타임 및 프레임워크', items: ['Node.js', 'NestJS', 'React'] },
  {
    title: '데이터 · 인프라',
    items: ['MySQL', 'OCI', 'AWS', 'Ubuntu', 'Docker'],
  },
  { title: '개발 도구', items: ['WebStorm', 'VS Code', 'GitHub'] },
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
