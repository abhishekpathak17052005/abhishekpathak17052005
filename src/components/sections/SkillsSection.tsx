import { useState } from 'react';
import { Cpu, Terminal, Shield, Brain, Layers, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../../config/portfolio';
import { GlassPanel } from '../ui/GlassPanel';

interface SkillsSectionProps {
  verifiedLanguages: string[];
}

export function SkillsSection({ verifiedLanguages }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Technologies', icon: Layers },
    { id: 'Frontend & Creative', label: 'Frontend & Creative', icon: Terminal },
    { id: 'Backend & Systems', label: 'Backend & Systems', icon: Cpu },
    { id: 'Security & DevOps', label: 'Security & Defense', icon: Shield },
    { id: 'AI & Data Engineering', label: 'AI & Data', icon: Brain },
  ];

  const displayedGroups =
    selectedCategory === 'all'
      ? PORTFOLIO_CONFIG.prioritizedSkills
      : PORTFOLIO_CONFIG.prioritizedSkills.filter((g) => g.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyber-cyan mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
              <span>CAPABILITIES MATRIX // 04</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
              SKILLS & SYSTEM ARCHITECTURE
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Cross-discipline engineering capabilities sourced from verified GitHub repository metadata and system architecture focus areas.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-cyber-cyan text-cyber-bg font-bold shadow-neon-cyan'
                      : 'bg-cyber-surface border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedGroups.map((group) => (
            <GlassPanel
              key={group.category}
              className="p-6 sm:p-8 space-y-4"
              variant="cyan"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold font-mono text-white tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
                  {group.category.toUpperCase()}
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  {group.skills.length} competencies
                </span>
              </div>

              {/* Skill Node Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {group.skills.map((skill) => {
                  const isVerifiedInRepos = verifiedLanguages.some(
                    (l) => l.toLowerCase() === skill.toLowerCase()
                  );

                  return (
                    <div
                      key={skill}
                      className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-cyber-bg/80 border border-slate-800 hover:border-cyber-cyan/50 hover:bg-cyber-surfaceHover transition-all cursor-default"
                    >
                      <span className="text-xs font-mono text-slate-200 group-hover:text-cyber-cyan transition-colors">
                        {skill}
                      </span>
                      {isVerifiedInRepos && (
                        <span title="Verified in public repository language data">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan shrink-0" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </GlassPanel>
          ))}
        </div>

        {/* Verified repo languages banner */}
        {verifiedLanguages.length > 0 && (
          <div className="mt-8 p-4 rounded-xl bg-cyber-surface/40 border border-cyber-cyan/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Detected in Active GitHub Codebases:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {verifiedLanguages.map((lang) => (
                <span
                  key={lang}
                  className="px-2.5 py-1 rounded bg-black/60 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
