import { ArrowDown, Github, Sparkles, Terminal } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../../config/portfolio';
import { GitHubUserProfile } from '../../types/github';

interface HeroSectionProps {
  profile: GitHubUserProfile | null;
  currentUsername: string;
}

export function HeroSection({ profile, currentUsername }: HeroSectionProps) {
  const displayName = profile?.name || PORTFOLIO_CONFIG.displayName;
  const bio = profile?.bio || PORTFOLIO_CONFIG.bio;
  const githubUrl = currentUsername
    ? `https://github.com/${currentUsername}`
    : PORTFOLIO_CONFIG.socialLinks.find((l) => l.platform === 'github')?.url || 'https://github.com';

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="max-w-3xl space-y-6">
          {/* Status Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-surface/90 border border-cyber-cyan/40 text-cyber-cyan text-xs font-mono shadow-neon-cyan">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
            <span className="tracking-widest">DEVELOPER PORTFOLIO / SYSTEM ONLINE</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-mono leading-[1.1]">
            BUILDING THE FUTURE,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-sky-300 to-cyber-violet">
              ONE SYSTEM
            </span>{' '}
            AT A TIME.
          </h1>

          {/* Name & Headline */}
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl font-bold font-mono text-cyber-ice">
                {displayName}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyber-violet/20 border border-cyber-violet/40 text-cyber-violet">
                @{currentUsername || 'unconfigured'}
              </span>
            </div>
            <p className="text-base sm:text-lg font-mono text-cyber-cyan">
              {PORTFOLIO_CONFIG.headline}
            </p>
          </div>

          {/* Verified Biography */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            {bio}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-cyber-cyan text-cyber-bg font-mono font-bold text-sm hover:bg-cyber-cyan/90 transition-all shadow-neon-cyan transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Projects</span>
            </a>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-cyber-surface/90 border border-cyber-violet/40 text-white font-mono text-sm hover:bg-cyber-surfaceHover hover:border-cyber-violet transition-all shadow-neon-violet transform hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4 text-cyber-violet" />
              <span>View GitHub</span>
            </a>
          </div>

          {/* System Specs Chips */}
          <div className="pt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-surface/60 border border-slate-800">
              <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Arch: WebGL & Three.js</span>
            </div>
            {profile && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-surface/60 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Verified Public Repos: {profile.public_repos}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator Prompt */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cyber-cyan/60 pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL TO EXPLORE</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
