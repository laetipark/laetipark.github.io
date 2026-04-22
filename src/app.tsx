import { useCallback, useEffect, useState } from 'react';

import { activities, educationItems } from './common/data/portfolio';
import { ThemeToggle } from './components/common/theme-toggle';
import { AppShell } from './components/layout/app-shell';
import { ProfileHero } from './components/profile/profile-hero';
import { ProjectSection } from './components/projects/project-section';
import { SkillSection } from './components/skills/skill-section';
import { SummarySection } from './components/summary/summary-section';
import { TimelineSection } from './components/timeline/timeline-section';
import { ChatLaetusPage } from './pages/chatlaetus/chatlaetus-page';

type AppRoute = 'portfolio' | 'chat';
type RoutePath = '/' | '/chat';

const chatPath = '/chat';
const legacyChatPath = '/chatlaetus';

const routeFromPath = (pathname: string): AppRoute => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';

  return normalizedPath === chatPath || normalizedPath === legacyChatPath
    ? 'chat'
    : 'portfolio';
};

const PortfolioPage = ({ onOpenChat }: { onOpenChat: () => void }) => {
  return (
    <AppShell>
      <ProfileHero onOpenChat={onOpenChat} />
      <SummarySection />
      <ProjectSection />
      <SkillSection />
      <TimelineSection title={'학력'} items={educationItems} />
      <TimelineSection title={'자격증 및 기타 활동'} items={activities} />
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

  useEffect(() => {
    const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';

    if (normalizedPath !== legacyChatPath) {
      return;
    }

    window.history.replaceState(
      null,
      '',
      `${chatPath}${window.location.search}${window.location.hash}`,
    );
  }, []);

  const navigate = useCallback((path: RoutePath) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }

    setRoute(routeFromPath(path));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {route === 'chat' ? (
        <ChatLaetusPage onNavigateHome={() => navigate('/')} />
      ) : (
        <PortfolioPage onOpenChat={() => navigate(chatPath)} />
      )}
      <ThemeToggle isChatOffset={route === 'chat'} />
    </>
  );
};

export default App;
