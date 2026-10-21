import { PortfolioConfig } from '../types/github';

/**
 * =====================================================================
 * CYBERPUNK 3D PORTFOLIO CONFIGURATION
 * =====================================================================
 * Single source of truth for portfolio settings.
 * Verified profile: https://github.com/abhishekpathak17052005
 */

export const PORTFOLIO_CONFIG: PortfolioConfig = {
  // Verified GitHub Username
  githubUsername: (import.meta.env.VITE_GITHUB_USERNAME as string) || 'abhishekpathak17052005',

  // Verified Display Name
  displayName: 'Abhishek Pathak',

  // Cyberpunk Terminal Headline
  headline: 'Full-Stack Software Engineer & Cyber-Systems Developer',

  // Verified & Professional Biography
  bio: 'Software engineer building intelligent web platforms, defensive cybersecurity tooling, and interactive 3D digital experiences. Developer behind Pragati, SpectraShield, ShikshaSetu, and RescueX.',

  // Optional contact details (Do NOT invent fake emails; empty string hides email button)
  email: '', 
  location: 'Cyber-Grid',

  // Verified social and external links
  socialLinks: [
    {
      platform: 'github',
      label: 'GitHub Profile',
      url: 'https://github.com/abhishekpathak17052005',
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com',
    },
  ],

  // Repositories prioritized in the Featured Projects section
  // Matched case-insensitively against your verified public GitHub repositories
  featuredRepoNames: [
    'Pragyan',
    'ShikshaSetu',
    'SpectraShield',
    'RescueX',
    'Pragati',
    'OriginX',
    'MailGuard',
    'Cricscore',
    'PassGuard',
  ],

  // Verified Focus areas
  focusAreas: [
    'Full-Stack Architecture & Distributed Web Systems',
    'Defensive Cybersecurity & Phishing Detection (MailGuard, PassGuard)',
    'Real-time 3D Web Graphics (Three.js & React Three Fiber)',
    'AI-Powered EdTech & Placement Readiness (Pragati, ShikshaSetu)',
  ],

  // Organized by verified languages and technologies in your GitHub repositories
  prioritizedSkills: [
    {
      category: 'Frontend & Creative',
      skills: ['TypeScript', 'JavaScript', 'React', 'Three.js', 'Next.js', 'Tailwind CSS', 'HTML5/CSS3'],
    },
    {
      category: 'Backend & Systems',
      skills: ['Python', 'Java', 'Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Security & DevOps',
      skills: ['Phishing Analysis', 'Password Strength Scoring', 'Git / GitHub CI', 'Docker', 'Linux / Bash'],
    },
    {
      category: 'AI & Data Engineering',
      skills: ['Python', 'Machine Learning Algorithms', 'Data Structures & Algorithms'],
    },
  ],
};

// UI & 3D Theme settings
export const THEME_CONFIG = {
  colors: {
    bg: '#050713',
    surface: '#0B1024',
    cyan: '#00E5FF',
    violet: '#8B5CF6',
    ice: '#E0F2FE',
  },
  particles: {
    desktopCount: 1200,
    mobileCount: 450,
  },
  bloomIntensity: 0.6,
};
