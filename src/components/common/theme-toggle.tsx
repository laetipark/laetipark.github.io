import { useEffect, useState } from 'react';

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../../assets/styles/components/theme-toggle.module.css';

type ThemeMode = 'light' | 'dark';
const STORAGE_KEY = 'laetipark.theme';

const readPreferredTheme = (): ThemeMode => {
  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  } catch {
    // Use the system theme when browser storage is unavailable.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<ThemeMode>(readPreferredTheme);
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Theme selection still works without persistent storage.
    }
  }, [theme]);

  return (
    <button
      className={styles.toggle}
      type={'button'}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={isDark ? '라이트 모드' : '다크 모드'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
    </button>
  );
};
