import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { studyRecords, summaryCards } from '../../common/data/portfolio';
import { RichTextLine } from '../common/rich-text';
import { Section } from '../common/section';
import styles from '../../assets/styles/components/summary-section.module.css';

export const SummarySection = () => (
  <Section id={'about'} title={'개발 방식과 기록'}>
    <div className={styles.grid}>
      <div className={styles.principles}>
        {summaryCards.map((card, index) => (
          <article className={styles.principle} key={card.id}>
            <span className={styles.number} aria-hidden={'true'}>
              0{index + 1}
            </span>
            <div>
              <h3 className={styles.title}>{card.title.join(' ')}</h3>
              <div className={styles.paragraphs}>
                {card.lines.map((line, lineIndex) => (
                  <p key={`${card.id}-${lineIndex}`}>
                    <RichTextLine line={line} />
                  </p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <aside className={styles.records} aria-labelledby={'study-title'}>
        <p className={styles.eyebrow}>LEARNING NOTES</p>
        <h3 className={styles.title} id={'study-title'}>
          배운 것을 남깁니다.
        </h3>
        <p className={styles.recordIntro}>
          문제를 풀고 서비스를 만들며 쌓은 학습 기록입니다.
        </p>
        <ul className={styles.recordList}>
          {studyRecords.map((record) => (
            <li className={styles.recordItem} key={record.title}>
              <span>{record.title}</span>
              <div className={styles.recordLinks}>
                {record.links.map((link) => (
                  <a
                    href={link.href}
                    key={link.href}
                    target={'_blank'}
                    rel={'noreferrer'}
                    aria-label={`${record.title} ${link.label} 기록 (새 창)`}
                  >
                    {link.label}{' '}
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      aria-hidden={'true'}
                    />
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  </Section>
);
