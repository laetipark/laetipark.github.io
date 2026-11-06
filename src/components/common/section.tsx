import type { ReactNode } from 'react';
import { useId } from 'react';

import styles from '../../assets/styles/components/section.module.css';

type SectionProps = {
  id?: string;
  title: string;
  children: ReactNode;
};

export const Section = ({ id, title, children }: SectionProps) => {
  const titleId = useId();

  return (
    <section className={styles.section} id={id} aria-labelledby={titleId}>
      <h2 className={styles.sectionTitle} id={titleId}>
        {title}
      </h2>
      {children}
    </section>
  );
};
