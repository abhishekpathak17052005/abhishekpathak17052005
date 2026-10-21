import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGithubData } from '../hooks/useGithubData';
import { PortfolioScene } from '../three/PortfolioScene';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { GithubSection } from '../components/sections/GithubSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { AboutSection } from '../components/sections/AboutSection';
import { ContactSection } from '../components/sections/ContactSection';
import { LoadingSequence } from '../components/ui/LoadingSequence';
import { SetupGuideModal } from '../components/ui/SetupGuideModal';

export function App() {
  const {
    username,
    setUsername,
    profile,
    repos,
    featuredRepos,
    telemetry,
    isLoading,
    error,
    isMissingUsername,
    refetch,
  } = useGithubData();

  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Extract unique languages verified in repos
  const verifiedLanguages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return Array.from(set);
  }, [repos]);

  return (
    <div className="relative min-h-screen bg-[#050713] text-slate-100 selection:bg-cyber-cyan/20 selection:text-cyber-cyan overflow-x-hidden">
      {/* Initial Boot Sequence (Only on first load when fetching) */}
      <AnimatePresence>
        {isLoading && !profile && repos.length === 0 && (
          <LoadingSequence />
        )}
      </AnimatePresence>

      {/* Cyberpunk Scanlines subtle overlay */}
      <div className="fixed inset-0 cyber-scanlines opacity-40 pointer-events-none z-30" />

      {/* 3D Canvas Background in Hero Area */}
      <div className="fixed inset-0 z-0 pointer-events-auto overflow-hidden">
        <PortfolioScene />
      </div>

      {/* Dark gradient fade for smooth transition to lower sections */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#050713]/70 to-[#050713] pointer-events-none z-0" />

      {/* Foreground Interface */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar
          currentUsername={username}
          onOpenConfig={() => setIsConfigOpen(true)}
        />

        {/* Hero Section */}
        <HeroSection profile={profile} currentUsername={username} />

        {/* Content Stream with Cyberpunk Backdrop */}
        <main className="relative bg-[#050713]/90 backdrop-blur-sm border-t border-cyber-cyan/15 space-y-8">
          {/* Projects Matrix */}
          <ProjectsSection
            repos={repos}
            featuredRepos={featuredRepos}
            isLoading={isLoading}
            error={error}
          />

          {/* GitHub Telemetry Dashboard */}
          <GithubSection
            profile={profile}
            repos={repos}
            telemetry={telemetry}
            isLoading={isLoading}
            onRefresh={refetch}
          />

          {/* Skills and Capabilities */}
          <SkillsSection verifiedLanguages={verifiedLanguages} />

          {/* About & Specifications */}
          <AboutSection currentUsername={username} />

          {/* Direct Transmission / Contact */}
          <ContactSection currentUsername={username} />
        </main>

        {/* System Footer */}
        <Footer
          currentUsername={username}
          totalRepos={profile?.public_repos ?? repos.length}
        />
      </div>

      {/* Interactive Setup / Configuration Modal */}
      {(isMissingUsername || isConfigOpen) && (
        <SetupGuideModal
          currentUsername={username}
          onApplyUsername={setUsername}
          onClose={!isMissingUsername ? () => setIsConfigOpen(false) : undefined}
        />
      )}
    </div>
  );
}

export default App;
