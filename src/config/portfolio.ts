import { PortfolioConfig } from '../types/github';

/**
 * =====================================================================
 * CYBERPUNK 3D PORTFOLIO CONFIGURATION
 * =====================================================================
 * Verified profile: https://github.com/abhishekpathak17052005
 * Parsed exactly from user developer profile specifications.
 */

export const PORTFOLIO_CONFIG: PortfolioConfig = {
  // Verified GitHub Username
  githubUsername: (import.meta.env.VITE_GITHUB_USERNAME as string) || 'abhishekpathak17052005',

  // Verified Display Name & Identity
  displayName: 'Abhishek Pathak',
  pronouns: 'he/him',

  // Cyberpunk Terminal Role
  headline: 'CYBERSECURITY DEVELOPER',

  // Verified Bio
  bio: 'Full-stack software engineer and cybersecurity developer specializing in AI-driven scam detection, defensive tooling, and interactive real-time 3D web applications.',

  // Verified Contact & Location
  email: 'ap17052005@gmail.com',
  location: 'Pune, Maharashtra, India',

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
    {
      platform: 'email',
      label: 'Email',
      url: 'mailto:ap17052005@gmail.com',
    },
  ],

  // Repositories prioritized in the Featured Projects section
  featuredRepoNames: [
    'PRAGYAN',
    'ShikshaSetu',
    'SpectraShield',
    'Rescue-X-AI',
    'RescueX',
    'CareerBridge',
    'CarrerBridge',
    'Pragati',
    'MailGuard',
    'PassGuard',
    'Cricscore',
    'OriginX',
  ],

  // Verified custom project descriptions (used when repository description is empty on GitHub)
  customRepoDescriptions: {
    pragyan: 'AI-powered Career Guidance and Skill Development Platform',
    shikshasetu: 'AI enabled learning platform for iGOT Karmayogi',
    spectrashield: 'AI Scam & Phishing Detection System',
    'rescue-x-ai': 'Emergency Response Android Application',
    rescuex: 'Emergency Response Android Application',
    careerbridge: 'AI Career Community Platform',
    carrerbridge: 'AI Career Community Platform',
    'portfolio-3d': 'This 3D GitHub Portfolio Website',
    abhishekpathak17052005: 'Cyberpunk 3D GitHub Portfolio Website',
    pragati: 'AI-Powered Student Growth, Internship & Placement Readiness Platform',
    mailguard: 'Cybersecurity phishing email detection tool analyzing suspicious keywords and links',
    passguard: 'Defensive password strength analysis and entropy evaluation tool',
    cricscore: 'Blockchain Verified Cricket Tournament Score Management Platform',
    'student-management-system-java': 'Console-based Student Management System built using Core Java',
  },

  // Focus areas for About & System specs
  focusAreas: [
    'Defensive Cybersecurity & Phishing Detection (SpectraShield, MailGuard)',
    'Real-time 3D Graphics & Holographic Canvas (Three.js & React Three Fiber)',
    'AI-Driven EdTech Platforms (PRAGYAN, ShikshaSetu, Pragati)',
    'Full-Stack Architecture & Cryptographic Systems (PassGuard, Cricscore)',
  ],

  // Organized by verified languages and technologies in your GitHub repositories
  prioritizedSkills: [
    {
      category: 'Frontend & Creative',
      skills: ['TypeScript', 'JavaScript', 'React', 'Three.js', 'Next.js', 'Tailwind CSS', 'HTML5/CSS3'],
    },
    {
      category: 'Backend & Systems',
      skills: ['Python', 'Java', 'Node.js', 'Express', 'Kotlin', 'REST APIs', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Security & DevOps',
      skills: ['AI Phishing Detection', 'Password Cryptography', 'Git / GitHub CI', 'Docker', 'Linux / Bash'],
    },
    {
      category: 'AI & Data Engineering',
      skills: ['Python', 'Machine Learning Models', 'Data Structures & Algorithms'],
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
