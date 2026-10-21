export interface GitHubUserProfile {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  topics?: string[];
  default_branch: string;
  archived?: boolean;
}

export interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface TelemetryStats {
  publicReposCount: number;
  aggregatedStars: number;
  totalForks: number;
  topLanguages: LanguageStat[];
  lastFetchedAt: string | null;
  rateLimitRemaining: number | null;
  rateLimitReset: Date | null;
  isRateLimited: boolean;
}

export interface PortfolioSocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'portfolio' | 'email';
  label: string;
  url: string;
}

export interface PortfolioConfig {
  githubUsername: string;
  displayName: string;
  headline: string;
  bio: string;
  email?: string;
  location?: string;
  socialLinks: PortfolioSocialLink[];
  featuredRepoNames: string[];
  prioritizedSkills: {
    category: string;
    skills: string[];
  }[];
  focusAreas: string[];
}
