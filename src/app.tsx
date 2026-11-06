import { useCallback, useEffect, useState } from 'react';

import { activities, educationItems, profile } from './common/data/portfolio';
import { ThemeToggle } from './components/common/theme-toggle';
import { AppShell } from './components/layout/app-shell';
import { ProfileHero } from './components/profile/profile-hero';
import { ProjectSection } from './components/projects/project-section';
import { SkillSection } from './components/skills/skill-section';
import { SummarySection } from './components/summary/summary-section';
import { TimelineSection } from './components/timeline/timeline-section';
import { ChatLaetusPage } from './pages/chatlaetus/chatlaetus-page';
import styles from './assets/styles/app.module.css';

type AppRoute = 'portfolio' | 'chat';
type RoutePath = '/' | '/chat';

const chatPath = '/chat';

const routeFromPath = (pathname: string): AppRoute => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';

  return normalizedPath === chatPath ? 'chat' : 'portfolio';
};

const PortfolioPage = ({ onOpenChat }: { onOpenChat: () => void }) => {
  return (
    <AppShell>
      <ProfileHero onOpenChat={onOpenChat} />
      <ProjectSection onOpenChat={onOpenChat} />
      <SummarySection />
      <SkillSection />
      <div className={styles.history} id={'history'}>
        <TimelineSection title={'학력'} items={educationItems} />
        <TimelineSection title={'자격 · 활동'} items={activities} />
      </div>
      <footer className={styles.footer}>
        <span>박동훈 · Laetipark</span>
        <nav className={styles.footerLinks} aria-label={'연락처'}>
          {profile.contacts.map((contact) => (
            <a
              href={contact.href}
              key={contact.href}
              target={contact.external ? '_blank' : undefined}
              rel={contact.external ? 'noreferrer' : undefined}
            >
              {contact.label}
            </a>
          ))}
        </nav>
      </footer>
    </AppShell>
  );
};

const App = () => {
  const [route, setRoute] = useState<AppRoute>(() =>
    routeFromPath(window.location.pathname),
  );

  useEffect(() => {
    const handlePopState = () =>
      setRoute(routeFromPath(window.location.pathname));

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: RoutePath) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }

    setRoute(routeFromPath(path));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      {route === 'chat' ? (
        <ChatLaetusPage onNavigateHome={() => navigate('/')} />
      ) : (
        <PortfolioPage onOpenChat={() => navigate(chatPath)} />
      )}
      <ThemeToggle />
    </>
  );
};

export default App;
