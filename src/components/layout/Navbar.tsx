import { useState, useEffect } from 'react';
import { Menu, X, Github, Terminal, Activity } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../../config/portfolio';

interface NavbarProps {
  currentUsername: string;
  onOpenConfig: () => void;
}

export function Navbar({ currentUsername, onOpenConfig }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '01. CORE', href: '#hero' },
    { label: '02. PROJECTS', href: '#projects' },
    { label: '03. TELEMETRY', href: '#telemetry' },
    { label: '04. SKILLS', href: '#skills' },
    { label: '05. ABOUT', href: '#about' },
    { label: '06. CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050713]/90 backdrop-blur-md border-b border-cyber-cyan/20 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / System Status */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-cyber-surface border border-cyber-cyan/40 flex items-center justify-center group-hover:border-cyber-cyan transition-colors shadow-neon-cyan">
            <Activity className="w-4 h-4 text-cyber-cyan animate-pulse" />
          </div>
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-white flex items-center gap-2">
              CYBER_SYS <span className="text-cyber-cyan">v2.4</span>
            </span>
            <span className="font-mono text-[10px] text-emerald-400 block tracking-tight">
              ONLINE // GRID ACTIVE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 rounded text-xs font-mono text-slate-300 hover:text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors"
            >
              <span className="text-cyber-cyan/60">// </span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Active Username Switcher Pill */}
          <button
            onClick={onOpenConfig}
            title="Click to change GitHub username or view configuration"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-surface border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono hover:border-cyber-cyan hover:bg-cyber-cyan/10 transition-all"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>@{currentUsername || 'no_user'}</span>
          </button>

          {/* GitHub Profile External Link */}
          <a
            href={
              currentUsername
                ? `https://github.com/${currentUsername}`
                : PORTFOLIO_CONFIG.socialLinks.find((l) => l.platform === 'github')?.url || 'https://github.com'
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            className="p-2 rounded-lg bg-cyber-surface border border-slate-700 text-slate-300 hover:text-white hover:border-cyber-cyan transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-lg bg-cyber-surface border border-slate-700 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cyber-surface/95 border-b border-cyber-cyan/20 px-4 pt-3 pb-5 space-y-2 backdrop-blur-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-sm font-mono text-slate-200 hover:text-cyber-cyan hover:bg-cyber-cyan/10"
            >
              <span className="text-cyber-cyan/60">// </span>
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfig();
              }}
              className="flex items-center gap-2 text-xs font-mono text-cyber-cyan px-2 py-1"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Config: @{currentUsername || 'none'}</span>
            </button>
            <a
              href={`https://github.com/${currentUsername || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-300 hover:text-white"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
