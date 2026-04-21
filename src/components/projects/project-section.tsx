import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  faTimes,
  faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { projects } from '../../common/data/portfolio';
import type {
  PortfolioProject,
  ProjectStatusTone,
} from '../../common/types/portfolio';
import { RichTextLine } from '../common/rich-text';
import { Section } from '../common/section';

import styles from '../../assets/styles/components/project-section.module.css';

const statusClassName: Record<ProjectStatusTone, string> = {
  development: styles.statusDevelopment,
  production: styles.statusProduction,
};

type ProjectModalProps = {
  project: PortfolioProject;
  onClose: () => void;
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose} role={'presentation'}>
      <article
        className={styles.dialog}
        role={'dialog'}
        aria-modal={'true'}
        aria-labelledby={`${project.id}-dialog-title`}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.dialogHeader}>
          <div>
            <h3 className={styles.dialogTitle} id={`${project.id}-dialog-title`}>
              {project.title}
              <span className={styles.statusList}>
                {project.statuses.map((status) => (
                  <span
                    className={`${styles.status} ${
                      statusClassName[status.tone]
                    }`}
                    key={status.label}
                  >
                    {status.label}
                  </span>
                ))}
              </span>
            </h3>
            <p className={styles.period}>{project.period}</p>
          </div>
          <button
            className={styles.closeButton}
            type={'button'}
            aria-label={'프로젝트 상세 닫기'}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </header>
        <div className={styles.dialogBody}>
          <ul className={styles.bulletList}>
            {project.bullets.map((line, index) => (
              <li key={`${project.id}-bullet-${index}`}>
                <RichTextLine line={line} />
              </li>
            ))}
          </ul>
          <dl className={styles.facts}>
            {project.facts.map((fact) => (
              <div className={styles.fact} key={fact.label}>
                <dt className={styles.factLabel}>{fact.label}:</dt>
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
          <ul className={styles.descriptionList}>
            {project.description.map((line, index) => (
              <li key={`${project.id}-description-${index}`}>
                <RichTextLine line={line} />
              </li>
            ))}
          </ul>
          <a
            className={styles.projectLink}
            href={project.link.href}
            target={'_blank'}
            rel={'noreferrer'}
          >
            <FontAwesomeIcon icon={faWindowMaximize} />
            <span>{project.link.label}</span>
          </a>
        </div>
      </article>
    </div>
  );
};

export const ProjectSection = () => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId),
    [activeProjectId],
  );
  const closeProject = useCallback(() => setActiveProjectId(null), []);

  return (
    <Section title={'프로젝트'}>
      <div className={styles.grid}>
        {projects.map((project) => (
          <button
            className={styles.card}
            type={'button'}
            key={project.id}
            onClick={() => setActiveProjectId(project.id)}
          >
            <img
              className={styles.thumbnail}
              src={project.image}
              alt={project.imageAlt}
            />
            <span className={styles.cardBody}>
              <span className={styles.cardTitle}>
                <span>{project.title}</span>
                <span className={styles.statusList}>
                  {project.statuses.map((status) => (
                    <span
                      className={`${styles.status} ${
                        statusClassName[status.tone]
                      }`}
                      key={status.label}
                    >
                      {status.label}
                    </span>
                  ))}
                </span>
              </span>
              <span className={styles.period}>{project.period}</span>
            </span>
          </button>
        ))}
      </div>
      {activeProject && (
        <ProjectModal project={activeProject} onClose={closeProject} />
      )}
    </Section>
  );
};
