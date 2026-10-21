import { PortfolioConfig } from '../types/github';

/**
 * =====================================================================
 * CYBERPUNK 3D PORTFOLIO CONFIGURATION
 * =====================================================================
 * This is the single configuration hub for the portfolio.
 * To point this portfolio to your own GitHub profile:
 * 1. Change `githubUsername` below or define VITE_GITHUB_USERNAME in your .env
 * 2. Update your display name, headline, bio, and social links.
 * 3. Choose your featured repositories (matching repository names on GitHub).
 *
 * If `githubUsername` is left empty (""), the portfolio will automatically
 * present an interactive Cyberpunk Setup Terminal guiding you through configuration!
 */

export const PORTFOLIO_CONFIG: PortfolioConfig = {
  // GitHub Username: Set to your GitHub handle, or set via VITE_GITHUB_USERNAME
  githubUsername: (import.meta.env.VITE_GITHUB_USERNAME as string) || 'abhishekpathak17052005',

  // Fallback Display Name (Used if GitHub profile name is null or before load)
  displayName: 'Abhishek Pathak',

  // Cyberpunk Terminal Headline
  headline: 'Full-Stack Engineer & Systems Architect',

  // Short Biography (supplemental to GitHub bio)
  bio: 'Engineering high-performance web systems, distributed architectures, and intelligent digital applications. Crafting modern user experiences with deep system-level discipline.',

  // Optional contact details (Do NOT invent fake emails; empty string hides email button)
  email: '', 
  location: 'Earth / Cyber-Grid',

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
    {
      platform: 'twitter',
      label: 'X / Twitter',
      url: 'https://twitter.com',
    },
  ],

  // Repositories to pin/highlight in the Featured Projects section
  // Matched case-insensitively against your actual public GitHub repositories
  featuredRepoNames: [
    'Pragyan',
    'ShikshaSetu',
    'SpectraShield',
    'RescueX',
    'OriginX',
    'MailGuard',
  ],

  // Focus areas for About & System specs
  focusAreas: [
    'Distributed Systems & Full-Stack Web Architecture',
    'Real-time 3D Graphics & Interactive Canvas Environments',
    'Defensive Security, Authentication & Cryptography',
    'Machine Learning Integration & Intelligent Automation',
  ],

  // Curated categorization mapping to organize verified repository topics and languages
  prioritizedSkills: [
    {
      category: 'Frontend & Creative',
      skills: ['TypeScript', 'JavaScript', 'React', 'Three.js', 'Next.js', 'Tailwind CSS', 'HTML5/CSS3'],
    },
    {
      category: 'Backend & Systems',
      skills: ['Node.js', 'Python', 'Java', 'Express', 'REST APIs', 'WebSockets', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Security & DevOps',
      skills: ['OAuth2 / JWT', 'Docker', 'Git / GitHub CI', 'SpectraShield Defense', 'Linux / Bash'],
    },
    {
      category: 'AI & Data Engineering',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Structures & Algorithms', 'OpenAI APIs'],
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
