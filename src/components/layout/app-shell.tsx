import type { ReactNode } from 'react';

import styles from '../../assets/styles/app.module.css';

type AppShellProps = {
  children: ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
  return <main className={styles.app}>{children}</main>;
};
