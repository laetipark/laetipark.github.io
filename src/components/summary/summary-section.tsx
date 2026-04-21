import { useState } from 'react';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { summaryCards } from '../../common/data/portfolio';
import { RichTextLine } from '../common/rich-text';
import { Section } from '../common/section';

import styles from '../../assets/styles/components/summary-section.module.css';

export const SummarySection = () => {
  const [openedCardId, setOpenedCardId] = useState<string | null>(null);

  return (
    <Section title={'소개'}>
      <div className={styles.grid}>
        {summaryCards.map((card) => {
          const isOpen = openedCardId === card.id;
          const recordsId = `${card.id}-study-records`;

          return (
            <article className={styles.card} key={card.id}>
              <header className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  {card.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
              </header>
              <div className={styles.cardBody}>
                <ul className={styles.lineList}>
                  {card.lines.map((line, index) => (
                    <li key={`${card.id}-${index}`}>
                      <RichTextLine line={line} />
                    </li>
                  ))}
                </ul>
                {card.studyRecords && (
                  <div className={styles.studyRecord}>
                    <button
                      className={styles.recordToggle}
                      type={'button'}
                      aria-expanded={isOpen}
                      aria-controls={recordsId}
                      onClick={() => setOpenedCardId(isOpen ? null : card.id)}
                    >
                      <FontAwesomeIcon
                        className={`${styles.toggleIcon} ${
                          isOpen ? styles.toggleIconOpen : ''
                        }`}
                        icon={faAngleRight}
                      />
                      <span>학습 기록 목록</span>
                    </button>
                    {isOpen && (
                      <ul className={styles.recordList} id={recordsId}>
                        {card.studyRecords.map((record) => (
                          <li className={styles.recordItem} key={record.title}>
                            <span className={styles.recordContent}>
                              <strong>{record.title}:</strong>
                              <span className={styles.recordLinks}>
                                {record.links.map((link) => (
                                  <a
                                    href={link.href}
                                    key={link.href}
                                    target={'_blank'}
                                    rel={'noreferrer'}
                                  >
                                    {link.label}
                                  </a>
                                ))}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
};
