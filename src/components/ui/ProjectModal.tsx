import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, GitFork, Star, Terminal, Check, Globe } from 'lucide-react';
import { GitHubRepo } from '../../types/github';
import { LANGUAGE_COLORS } from '../../services/githubApi';
import { PORTFOLIO_CONFIG } from '../../config/portfolio';

interface ProjectModalProps {
  repo: GitHubRepo | null;
  onClose: () => void;
}

export function ProjectModal({ repo, onClose }: ProjectModalProps) {
  const [copiedClone, setCopiedClone] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (repo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [repo, onClose]);

  if (!repo) return null;

  const cloneCommand = `git clone ${repo.html_url}.git`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || '#00E5FF' : '#94A3B8';

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-cyber-surface border border-cyber-cyan/40 rounded-2xl shadow-[0_0_50px_rgba(0,229,255,0.2)] overflow-hidden z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-cyber-cyan/20 bg-cyber-bg/60">
            <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
              <span>SYSTEM ARCHIVE // {repo.name.toUpperCase()}</span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close project modal"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Title and stats */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <h3 className="text-2xl font-bold font-mono text-white tracking-wide">
                  {repo.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyber-bg border border-cyber-cyan/30 text-cyber-cyan">
                    <Star className="w-3.5 h-3.5 fill-cyber-cyan text-cyber-cyan" />
                    {repo.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyber-bg border border-cyber-violet/30 text-cyber-violet">
                    <GitFork className="w-3.5 h-3.5" />
                    {repo.forks_count}
                  </span>
                </div>
              </div>

              {/* Verified description */}
              <p className="text-slate-300 text-sm leading-relaxed mt-2">
                {repo.description ||
                  PORTFOLIO_CONFIG.customRepoDescriptions?.[repo.name.toLowerCase()] ||
                  'No public repository description provided.'}
              </p>
            </div>

            {/* Language & Technical Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-cyber-bg/70 border border-slate-800">
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
                  Primary Engine
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: langColor }}
                  />
                  <span className="text-sm font-semibold text-white">
                    {repo.language || 'Unspecified'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
                  Default Branch
                </span>
                <span className="text-sm font-mono text-slate-200">
                  {repo.default_branch}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
                  Last Updated
                </span>
                <span className="text-sm font-mono text-slate-200">
                  {new Date(repo.pushed_at || repo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Topics */}
            {repo.topics && repo.topics.length > 0 && (
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  Repository Tags
                </span>
                <div className="flex flex-wrap gap-2">
                  {repo.topics.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Terminal Git Clone Box */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Terminal Clone Command
              </span>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2 overflow-x-auto select-all pr-2">
                  <Terminal className="w-4 h-4 text-cyber-cyan shrink-0" />
                  <code>{cloneCommand}</code>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 shrink-0 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  {copiedClone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-800">
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-violet/20 border border-cyber-violet/50 text-cyber-ice hover:bg-cyber-violet/30 transition-colors text-xs font-mono"
                >
                  <Globe className="w-4 h-4 text-cyber-violet" />
                  Live Preview
                </a>
              )}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg font-mono font-bold text-xs hover:bg-cyber-cyan/90 transition-all shadow-neon-cyan"
              >
                <span>View on GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
