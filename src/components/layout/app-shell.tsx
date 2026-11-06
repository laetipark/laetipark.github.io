import type { ReactNode } from 'react';

import styles from '../../assets/styles/app.module.css';

type AppShellProps = {
  children: ReactNode;
  variant?: 'portfolio' | 'chat';
};

export const AppShell = ({
  children,
  variant = 'portfolio',
}: AppShellProps) => {
  return (
    <main className={`${styles.app} ${variant === 'chat' ? styles.chat : ''}`}>
      {children}
    </main>
  );
};
