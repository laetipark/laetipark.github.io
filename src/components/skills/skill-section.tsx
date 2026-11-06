import { skillGroups } from '../../common/data/portfolio';
import { Section } from '../common/section';
import styles from '../../assets/styles/components/skill-section.module.css';

export const SkillSection = () => (
  <Section id={'skills'} title={'사용 기술'}>
    <div className={styles.groups}>
      {skillGroups.map((group) => (
        <div className={styles.group} key={group.title}>
          <h3 className={styles.groupTitle}>{group.title}</h3>
          <ul className={styles.items} aria-label={group.title}>
            {group.items.map((item) => (
              <li className={styles.item} key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);
