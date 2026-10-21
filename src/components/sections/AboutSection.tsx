import { Terminal, Shield, Cpu, Network, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../../config/portfolio';
import { GlassPanel } from '../ui/GlassPanel';

interface AboutSectionProps {
  currentUsername: string;
}

export function AboutSection({ currentUsername }: AboutSectionProps) {
  const pillars = [
    {
      icon: Cpu,
      title: 'Architectural Performance',
      description:
        'Building systems optimized for speed, low-latency client rendering, and modular scalability across web runtimes.',
    },
    {
      icon: Shield,
      title: 'Defensive Engineering',
      description:
        'Integrating robust authentication models, API rate resilience, and secure data pipelines across every layer.',
    },
    {
      icon: Network,
      title: 'Real-Time Interactivity',
      description:
        'Leveraging WebGL, Three.js shaders, and asynchronous reactive state to deliver responsive, engaging user experiences.',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyber-violet mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-violet" />
            <span>CORE DIRECTIVE // 05</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
            ABOUT & ENGINEERING SPECIFICATIONS
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Biography Column */}
          <GlassPanel className="lg:col-span-7 p-6 sm:p-8 space-y-6" variant="violet">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyber-cyan font-mono text-xs">
                <Terminal className="w-4 h-4" />
                <span>PROFILE EXECUTION ENVIRONMENT</span>
              </div>
              <h3 className="text-2xl font-bold font-mono text-white">
                Engineering with Purpose, Precision & Polish.
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {PORTFOLIO_CONFIG.bio}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Driven by curiosity in modern 3D graphics, high-performance distributed systems, and clean UI engineering. Every project is built with clean architecture, verifiable testability, and attention to visual detail.
              </p>
            </div>

            {/* Verified Focus Areas */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-cyber-ice block">
                Primary Focus Areas:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PORTFOLIO_CONFIG.focusAreas.map((area, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-cyber-bg/60 border border-slate-800 text-xs font-mono text-slate-300"
                  >
                    <span className="text-cyber-cyan font-bold">{`0${i + 1}.`}</span>
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* External Profile Links */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3">
              {PORTFOLIO_CONFIG.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={
                    link.platform === 'github' && currentUsername
                      ? `https://github.com/${currentUsername}`
                      : link.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-surface border border-slate-700 text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan transition-colors text-xs font-mono"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </GlassPanel>

          {/* Pillars Column */}
          <div className="lg:col-span-5 space-y-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <GlassPanel key={idx} className="p-6 space-y-2" variant="cyan">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyber-bg border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold font-mono text-white">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-11">
                    {pillar.description}
                  </p>
                </GlassPanel>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
