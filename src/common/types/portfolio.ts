import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type HighlightVariant = 'mark' | 'accent';

export type HighlightToken = {
  text: string;
  variant: HighlightVariant;
};

export type LinkToken = {
  text: string;
  href: string;
  external?: boolean;
};

export type TextToken = string | HighlightToken | LinkToken;

export type TextLine = TextToken[];

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: IconDefinition;
  external?: boolean;
};

export type StudyRecord = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

export type SummaryCard = {
  id: string;
  title: string[];
  lines: TextLine[];
  studyRecords?: StudyRecord[];
};

export type ProjectStatusTone = 'development' | 'production';

export type ProjectStatus = {
  label: string;
  tone: ProjectStatusTone;
};

export type ProjectFact = {
  label: string;
  values: string[];
};

export type PortfolioProject = {
  id: string;
  title: string;
  period: string;
  image: string;
  imageAlt: string;
  statuses: ProjectStatus[];
  bullets: TextLine[];
  facts: ProjectFact[];
  description: TextLine[];
  link: {
    label: string;
    href: string;
  };
};

export type SkillBadge = {
  label: string;
  src: string;
};

export type SkillGroup = {
  title: string;
  badges: SkillBadge[];
};

export type TimelineItem = {
  title: string;
  lines: TextLine[];
};
