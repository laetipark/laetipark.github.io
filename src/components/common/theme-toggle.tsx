import { useEffect, useState } from 'react';

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../../assets/styles/components/theme-toggle.module.css';

type ThemeMode = 'light' | 'dark';
type ThemeToggleProps = {
  isChatOffset?: boolean;
};

const STORAGE_KEY = 'laetipark.theme';

const readPreferredTheme = (): ThemeMode => {
  const storedTheme = window.localStorage.getItem(STORAGE_KEY);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const ThemeToggle = ({ isChatOffset = false }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<ThemeMode>(readPreferredTheme);
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <button
      className={`${styles.toggle} ${isChatOffset ? styles.chatOffset : ''}`}
      type={'button'}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={isDark ? '라이트 모드' : '다크 모드'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
    </button>
  );
};
