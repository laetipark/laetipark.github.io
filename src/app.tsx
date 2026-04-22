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

type AppRoute = 'portfolio' | 'chatlaetus';
type RoutePath = '/' | '/chatlaetus';

const routeFromPath = (pathname: string): AppRoute => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';

  return normalizedPath === '/chatlaetus' ? 'chatlaetus' : 'portfolio';
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

  const navigate = useCallback((path: RoutePath) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }

    setRoute(routeFromPath(path));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {route === 'chatlaetus' ? (
        <ChatLaetusPage onNavigateHome={() => navigate('/')} />
      ) : (
        <PortfolioPage onOpenChat={() => navigate('/chatlaetus')} />
      )}
      <ThemeToggle isChatOffset={route === 'chatlaetus'} />
    </>
  );
};

export default App;
