import { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, MessageSquare, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../../config/portfolio';
import { GlassPanel } from '../ui/GlassPanel';

interface ContactSectionProps {
  currentUsername: string;
}

export function ContactSection({ currentUsername }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const hasEmail = Boolean(PORTFOLIO_CONFIG.email && PORTFOLIO_CONFIG.email.trim());
  const emailAddress = PORTFOLIO_CONFIG.email || '';

  const copyEmail = () => {
    if (!hasEmail) return;
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const githubUrl = currentUsername
    ? `https://github.com/${currentUsername}`
    : PORTFOLIO_CONFIG.socialLinks.find((l) => l.platform === 'github')?.url || 'https://github.com';

  const linkedinLink = PORTFOLIO_CONFIG.socialLinks.find((l) => l.platform === 'linkedin');

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GlassPanel className="p-8 sm:p-12 max-w-4xl mx-auto space-y-8" variant="cyan" cutCorners>
          {/* Header */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyber-cyan">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
              <span>COMMUNICATION FREQUENCY // 06</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
              ESTABLISH DIRECT TRANSMISSION
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Available for high-impact software engineering roles, technical internships, open-source collaboration, and distributed systems discussions.
            </p>
          </div>

          {/* Contact options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* GitHub Primary Channel */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl bg-cyber-bg/80 border border-cyber-cyan/30 hover:border-cyber-cyan flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyber-surface flex items-center justify-center text-cyber-cyan group-hover:scale-105 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold font-mono text-white group-hover:text-cyber-cyan transition-colors block">
                    GitHub Profile
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    @{currentUsername || 'developer'}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyber-cyan transition-colors" />
            </a>

            {/* LinkedIn Channel */}
            {linkedinLink && (
              <a
                href={linkedinLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-cyber-bg/80 border border-cyber-violet/30 hover:border-cyber-violet flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyber-surface flex items-center justify-center text-cyber-violet group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold font-mono text-white group-hover:text-cyber-violet transition-colors block">
                      LinkedIn Network
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Professional Connections
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyber-violet transition-colors" />
              </a>
            )}

            {/* Email Option ONLY if configured */}
            {hasEmail && (
              <div className="p-5 rounded-xl bg-cyber-bg/80 border border-slate-800 flex items-center justify-between col-span-1 sm:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyber-surface flex items-center justify-center text-cyber-cyan">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold font-mono text-white block">
                      Direct Email Dispatch
                    </span>
                    <a
                      href={`mailto:${emailAddress}`}
                      className="text-xs font-mono text-cyber-cyan hover:underline"
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="px-3.5 py-2 rounded-lg bg-cyber-surface border border-slate-700 hover:border-cyber-cyan text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Quick Issue / Discussion Dispatch CTA */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyber-cyan" />
              <span>Ready to collaborate on open-source engineering.</span>
            </div>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg font-bold hover:bg-cyber-cyan/90 transition-all shadow-neon-cyan"
            >
              Initiate Contact via GitHub
            </a>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
