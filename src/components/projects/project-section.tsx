import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { projects } from '../../common/data/portfolio';
import type {
  PortfolioProject,
  ProjectCategory,
  ProjectStatusTone,
} from '../../common/types/portfolio';
import { RichTextLine } from '../common/rich-text';
import { Section } from '../common/section';

import styles from '../../assets/styles/components/project-section.module.css';

const statusClassName: Record<ProjectStatusTone, string> = {
  development: styles.statusDevelopment,
  production: styles.statusProduction,
};

const categoryLabels: Record<ProjectCategory, string> = {
  web: '웹 서비스',
  app: '앱',
  backend: 'API · 백엔드',
  bot: '봇',
};

type ProjectFilter = 'all' | ProjectCategory;

const projectFilters: { id: ProjectFilter; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'web', label: categoryLabels.web },
  { id: 'app', label: categoryLabels.app },
  { id: 'backend', label: categoryLabels.backend },
  { id: 'bot', label: categoryLabels.bot },
];

type ProjectSectionProps = {
  onOpenChat: () => void;
};

const ProjectStatuses = ({ project }: { project: PortfolioProject }) => (
  <span className={styles.statusList}>
    {project.statuses.map((status) => (
      <span
        className={`${styles.status} ${statusClassName[status.tone]}`}
        key={status.label}
      >
        {status.label}
      </span>
    ))}
  </span>
);

const ProjectLinks = ({
  project,
  onOpenChat,
}: { project: PortfolioProject } & ProjectSectionProps) => (
  <>
    {project.links.map((link) => {
      const isExternal = link.external ?? link.href.startsWith('http');

      return (
        <a
          className={styles.serviceLink}
          key={link.href}
          href={link.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer' : undefined}
          aria-label={`${project.title} ${link.label}`}
          onClick={(event) => {
            if (
              !isExternal &&
              link.href === '/chat' &&
              event.button === 0 &&
              !event.metaKey &&
              !event.ctrlKey &&
              !event.shiftKey &&
              !event.altKey
            ) {
              event.preventDefault();
              onOpenChat();
            }
          }}
        >
          <span>{link.label}</span>
          <FontAwesomeIcon
            icon={isExternal ? faArrowUpRightFromSquare : faArrowRight}
          />
        </a>
      );
    })}
  </>
);

type ProjectMediaProps = {
  title: string;
  source: string;
  alt: string;
  caption?: string;
  isBanner?: boolean;
};

const ProjectModalMedia = ({
  title,
  source,
  alt,
  caption,
  isBanner = false,
}: ProjectMediaProps) => (
  <figure className={styles.dialogFigure}>
    <img
      className={`${styles.dialogImage} ${isBanner ? styles.dialogBanner : ''}`}
      src={source}
      alt={alt}
    />
    {caption && (
      <figcaption className={styles.imageCaption}>{caption}</figcaption>
    )}
    <a
      className={styles.serviceLink}
      href={source}
      target={'_blank'}
      rel={'noreferrer'}
      aria-label={`${title} ${isBanner ? '배너' : '상세 이미지'} 원본 보기`}
    >
      {isBanner ? '배너 크게 보기' : '이미지 크게 보기'}
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
    </a>
  </figure>
);

type ProjectModalProps = ProjectSectionProps & {
  project: PortfolioProject;
  onClose: () => void;
};

const ProjectModal = ({ project, onClose, onOpenChat }: ProjectModalProps) => {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const appRoot = document.getElementById('root');
    const previousInert = appRoot?.inert ?? false;
    const previousOverflow = document.body.style.overflow;

    if (appRoot) {
      appRoot.inert = true;
    }
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements =
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not(:disabled), [tabindex="0"]',
        );
      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (appRoot) {
        appRoot.inert = previousInert;
      }
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styles.backdrop}
      role={'presentation'}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <article
        className={styles.dialog}
        ref={dialogRef}
        role={'dialog'}
        aria-modal={'true'}
        aria-labelledby={`${project.id}-dialog-title`}
      >
        <header className={styles.dialogHeader}>
          <div className={styles.dialogHeading}>
            <p className={styles.eyebrow}>{categoryLabels[project.category]}</p>
            <h2
              className={styles.dialogTitle}
              id={`${project.id}-dialog-title`}
            >
              {project.title}
            </h2>
            <div className={styles.metadata}>
              {project.period && (
                <p className={styles.period}>{project.period}</p>
              )}
              {project.statuses.length > 0 && (
                <ProjectStatuses project={project} />
              )}
            </div>
          </div>
          <button
            className={styles.closeButton}
            ref={closeButtonRef}
            type={'button'}
            aria-label={'프로젝트 상세 닫기'}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </header>
        <div className={styles.dialogBody}>
          {project.banner && (
            <ProjectModalMedia
              title={project.title}
              source={project.banner}
              alt={project.bannerAlt ?? `${project.title} 배너`}
              caption={project.bannerCaption}
              isBanner
            />
          )}
          <section className={styles.detailSection}>
            <h3 className={styles.detailTitle}>개요</h3>
            <p>{project.summary}</p>
          </section>
          {project.image && project.image !== project.banner && (
            <ProjectModalMedia
              title={project.title}
              source={project.image}
              alt={project.imageAlt ?? `${project.title} 이미지`}
              caption={project.imageCaption}
            />
          )}
          {project.role && (
            <section className={styles.detailSection}>
              <h3 className={styles.detailTitle}>담당 역할</h3>
              <p>{project.role}</p>
            </section>
          )}
          {project.bullets.length > 0 && (
            <section className={styles.detailSection}>
              <h3 className={styles.detailTitle}>주요 기능</h3>
              <ul className={styles.bulletList}>
                {project.bullets.map((line, index) => (
                  <li key={`${project.id}-bullet-${index}`}>
                    <RichTextLine line={line} />
                  </li>
                ))}
              </ul>
            </section>
          )}
          {project.story.map((section, sectionIndex) => (
            <section
              className={styles.detailSection}
              key={`${project.id}-story-${sectionIndex}`}
            >
              <h3 className={styles.detailTitle}>{section.title}</h3>
              <div className={styles.descriptionList}>
                {section.lines.map((line, lineIndex) => (
                  <p key={`${project.id}-story-${sectionIndex}-${lineIndex}`}>
                    <RichTextLine line={line} />
                  </p>
                ))}
              </div>
            </section>
          ))}
          {project.facts.length > 0 && (
            <section className={styles.detailSection}>
              <h3 className={styles.detailTitle}>기술 환경</h3>
              <dl className={styles.facts}>
                {project.facts.map((fact) => (
                  <div className={styles.fact} key={fact.label}>
                    <dt className={styles.factLabel}>{fact.label}</dt>
                    <dd className={styles.chipList}>
                      {fact.values.map((value) => (
                        <span className={styles.chip} key={value}>
                          {value}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          {project.links.length > 0 && (
            <nav className={styles.dialogLinks} aria-label={'프로젝트 링크'}>
              <ProjectLinks project={project} onOpenChat={onOpenChat} />
            </nav>
          )}
        </div>
      </article>
    </div>,
    document.body,
  );
};

type ProjectCardProps = ProjectSectionProps & {
  project: PortfolioProject;
  compact?: boolean;
  onOpen: (id: string) => void;
};

const ProjectCard = ({
  project,
  compact = false,
  onOpen,
  onOpenChat,
}: ProjectCardProps) => {
  const previewSource = project.banner ?? project.image;
  const previewAlt = project.banner
    ? (project.bannerAlt ?? `${project.title} 배너`)
    : (project.imageAlt ?? `${project.title} 이미지`);
  const previewCaption = project.banner
    ? project.bannerCaption
    : project.imageCaption;

  return (
    <article
      className={`${styles.card} ${
        compact ? styles.compactCard : styles.featuredCard
      } ${!previewSource ? styles.textCard : ''}`}
      aria-labelledby={`${project.id}-title`}
    >
      {previewSource && (
        <figure
          className={`${styles.visual} ${compact ? styles.compactVisual : ''}`}
        >
          <img
            className={styles.thumbnail}
            src={previewSource}
            alt={previewAlt}
            loading={'lazy'}
          />
          {previewCaption && (
            <figcaption className={styles.imageCaption}>
              {previewCaption}
            </figcaption>
          )}
        </figure>
      )}
      <div className={styles.cardBody}>
        <div className={styles.metadata}>
          <span className={styles.category}>
            {categoryLabels[project.category]}
          </span>
          {project.period && <p className={styles.period}>{project.period}</p>}
          {project.statuses.length > 0 && <ProjectStatuses project={project} />}
        </div>
        <div className={styles.cardHeading}>
          <h3 className={styles.cardTitle} id={`${project.id}-title`}>
            {project.title}
          </h3>
        </div>
        <p className={styles.summary}>{project.summary}</p>
        {project.highlights.length > 0 && (
          <ul className={styles.highlights}>
            {project.highlights.map((line, index) => (
              <li key={`${project.id}-highlight-${index}`}>
                <RichTextLine line={line} />
              </li>
            ))}
          </ul>
        )}
        {project.facts.length > 0 && (
          <ul className={styles.chipList} aria-label={'사용 기술'}>
            {project.facts.flatMap((fact) =>
              fact.values.map((value) => (
                <li className={styles.chip} key={`${fact.label}-${value}`}>
                  {value}
                </li>
              )),
            )}
          </ul>
        )}
        <div className={styles.actions}>
          <button
            className={styles.detailButton}
            type={'button'}
            aria-label={`${project.title} 상세 보기`}
            aria-haspopup={'dialog'}
            onClick={() => onOpen(project.id)}
          >
            <span>상세 보기</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <ProjectLinks project={project} onOpenChat={onOpenChat} />
        </div>
      </div>
    </article>
  );
};

export const ProjectSection = ({ onOpenChat }: ProjectSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const activeProject = projects.find(
    (project) => project.id === activeProjectId,
  );
  const filteredProjects = projects.filter(
    (project) => activeFilter === 'all' || project.category === activeFilter,
  );
  const featuredProjects = filteredProjects.filter(
    (project) => project.featured,
  );
  const otherProjects = filteredProjects.filter((project) => !project.featured);
  const closeProject = useCallback(() => setActiveProjectId(null), []);

  return (
    <Section id={'projects'} title={'프로젝트'}>
      <div className={styles.collectionHeader}>
        <div
          className={styles.filters}
          role={'group'}
          aria-label={'프로젝트 종류'}
        >
          {projectFilters.map((filter) => {
            const count = projects.filter(
              (project) =>
                filter.id === 'all' || project.category === filter.id,
            ).length;

            return (
              <button
                className={styles.filterButton}
                type={'button'}
                key={filter.id}
                aria-pressed={activeFilter === filter.id}
                aria-controls={'project-list'}
                onClick={() => setActiveFilter(filter.id)}
              >
                <span>{filter.label}</span>
                <span className={styles.filterCount}>{count}</span>
              </button>
            );
          })}
        </div>
        <p
          className={styles.resultCount}
          aria-live={'polite'}
          aria-atomic={'true'}
        >
          {filteredProjects.length}개 프로젝트
        </p>
      </div>
      <div className={styles.collection} id={'project-list'}>
        {featuredProjects.length > 0 && (
          <div className={styles.grid}>
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={setActiveProjectId}
                onOpenChat={onOpenChat}
              />
            ))}
          </div>
        )}
        {otherProjects.length > 0 && (
          <div className={styles.compactGrid}>
            {otherProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                compact
                onOpen={setActiveProjectId}
                onOpenChat={onOpenChat}
              />
            ))}
          </div>
        )}
        {filteredProjects.length === 0 && (
          <p className={styles.emptyState}>
            이 종류에 등록된 프로젝트가 없습니다.
          </p>
        )}
      </div>
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={closeProject}
          onOpenChat={onOpenChat}
        />
      )}
    </Section>
  );
};
