import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, UserCheck, Code, Check } from 'lucide-react';

interface SetupGuideModalProps {
  currentUsername: string;
  onApplyUsername: (username: string) => void;
  onClose?: () => void;
}

export function SetupGuideModal({
  currentUsername,
  onApplyUsername,
  onClose,
}: SetupGuideModalProps) {
  const [inputVal, setInputVal] = useState(currentUsername || 'abhishekpathak17052005');
  const [copiedPath, setCopiedPath] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onApplyUsername(inputVal.trim());
      if (onClose) onClose();
    }
  };

  const copyConfigPath = () => {
    navigator.clipboard.writeText('src/config/portfolio.ts');
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-cyber-surface border border-cyber-cyan/50 rounded-2xl shadow-[0_0_60px_rgba(0,229,255,0.3)] overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-cyber-bg/90 border-b border-cyber-cyan/25">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyber-cyan animate-pulse" />
            <span className="font-mono text-xs text-cyber-cyan font-bold tracking-widest">
              SYSTEM CONFIGURATION // GITHUB SYNC
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              [CLOSE]
            </button>
          )}
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-mono text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyber-cyan" />
              Connect Your GitHub Digital Universe
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              This portfolio dynamically binds to public GitHub REST data without requiring personal access tokens.
            </p>
          </div>

          {/* Instant Interactive Profile Input */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-xs font-mono uppercase text-cyber-cyan">
              Option 1: Test Any GitHub Username Instantly
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">
                  @
                </span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="e.g. abhishekpathak17052005"
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg bg-black/60 border border-cyber-cyan/30 font-mono text-sm text-white focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg font-mono font-bold text-xs hover:bg-cyber-cyan/90 transition-all flex items-center gap-2 shadow-neon-cyan shrink-0"
              >
                <span>Connect</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Option 2: Config file */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="block text-xs font-mono uppercase text-cyber-violet">
              Option 2: Permanent Configuration in Codebase
            </label>
            <p className="text-xs text-slate-400">
              Set your username permanently by editing the single dedicated configuration file:
            </p>

            <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs">
              <div className="flex items-center gap-2 text-cyber-ice">
                <Code className="w-4 h-4 text-cyber-violet" />
                <span>src/config/portfolio.ts</span>
              </div>
              <button
                onClick={copyConfigPath}
                className="px-2.5 py-1 rounded bg-cyber-violet/20 border border-cyber-violet/40 text-cyber-violet hover:bg-cyber-violet/30 text-[11px] font-mono flex items-center gap-1 transition-colors"
              >
                {copiedPath ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <span>Copy Path</span>
                )}
              </button>
            </div>

            <div className="p-3 rounded-lg bg-black/80 border border-slate-800 font-mono text-xs text-slate-300">
              <span className="text-slate-500">// src/config/portfolio.ts</span>
              <br />
              <span className="text-cyber-cyan">githubUsername</span>: <span className="text-amber-300">'abhishekpathak17052005'</span>,
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
            <button
              type="button"
              onClick={() => {
                setInputVal('abhishekpathak17052005');
                onApplyUsername('abhishekpathak17052005');
                if (onClose) onClose();
              }}
              className="text-cyber-cyan hover:underline flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Load abhishekpathak17052005 (Recommended)
            </button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
