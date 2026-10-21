import { ArrowUp, Github, Shield, Terminal } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../../config/portfolio';

interface FooterProps {
  currentUsername: string;
  totalRepos?: number;
}

export function Footer({ currentUsername, totalRepos }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050713] border-t border-cyber-cyan/20 pt-16 pb-12 overflow-hidden">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-slate-800">
          {/* Identity & Status */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-sm font-bold text-white tracking-widest">
                CYBERPUNK DEV SYSTEM
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono leading-relaxed">
              Real-time 3D GitHub developer portfolio. Procedural WebGL geometry, live REST telemetry synchronization, and zero fabricated claims.
            </p>
          </div>

          {/* Telemetry metadata */}
          <div className="space-y-2 font-mono text-xs text-slate-400">
            <div className="text-cyber-cyan uppercase font-bold tracking-wider">
              TELEMETRY LOGS
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Target: @{currentUsername || 'unconfigured'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-cyber-violet" />
              <span>Public Repositories: {totalRepos !== undefined ? totalRepos : 'Loading'}</span>
            </div>
            <div className="text-slate-500">
              Protocol: HTTPS // GitHub REST v3 // React 18 & Three.js
            </div>
          </div>

          {/* Action & Return */}
          <div className="flex flex-col items-start md:items-end justify-between space-y-4">
            <button
              onClick={scrollToTop}
              className="px-4 py-2 rounded-lg bg-cyber-surface border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors font-mono text-xs flex items-center gap-2"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-3">
              <a
                href={
                  currentUsername
                    ? `https://github.com/${currentUsername}`
                    : PORTFOLIO_CONFIG.socialLinks.find((l) => l.platform === 'github')?.url || 'https://github.com'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-cyber-surface border border-slate-700 text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-3">
          <div>
            &copy; {new Date().getFullYear()} {PORTFOLIO_CONFIG.displayName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>SECURE PROTOCOL</span>
            <span className="w-1 h-1 rounded-full bg-cyber-cyan" />
            <span>AUTHENTIC DATA ONLY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
