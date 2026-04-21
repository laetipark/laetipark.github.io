import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { skillGroups } from '../../common/data/portfolio';
import { Section } from '../common/section';

import styles from '../../assets/styles/components/skill-section.module.css';

export const SkillSection = () => {
  return (
    <Section title={'스킬'}>
      <div className={styles.groups}>
        {skillGroups.map((group) => (
          <article className={styles.group} key={group.title}>
            <h3 className={styles.groupTitle}>
              <FontAwesomeIcon icon={faCaretRight} />
              <span>{group.title}</span>
            </h3>
            <div className={styles.badges}>
              {group.badges.map((badge) => (
                <img
                  className={styles.badge}
                  src={badge.src}
                  alt={badge.label}
                  key={badge.label}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};
