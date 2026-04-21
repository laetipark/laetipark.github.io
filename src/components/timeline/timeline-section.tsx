import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { TimelineItem } from '../../common/types/portfolio';
import { RichTextLine } from '../common/rich-text';
import { Section } from '../common/section';

import styles from '../../assets/styles/components/timeline-section.module.css';

type TimelineSectionProps = {
  title: string;
  items: TimelineItem[];
};

export const TimelineSection = ({ title, items }: TimelineSectionProps) => {
  return (
    <Section title={title}>
      <div className={styles.list}>
        {items.map((item) => (
          <article className={styles.item} key={item.title}>
            <h3 className={styles.itemTitle}>
              <FontAwesomeIcon className={styles.icon} icon={faCaretRight} />
              <span>{item.title}</span>
            </h3>
            <ul className={styles.lineList}>
              {item.lines.map((line, index) => (
                <li key={`${item.title}-${index}`}>
                  <RichTextLine line={line} />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
};
