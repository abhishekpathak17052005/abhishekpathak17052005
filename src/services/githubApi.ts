import { GitHubUserProfile, GitHubRepo, TelemetryStats, LanguageStat } from '../types/github';

const BASE_URL = 'https://api.github.com';
const CACHE_PREFIX = 'cyber_gh_cache_';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface CachedPayload<T> {
  data: T;
  timestamp: number;
}

// Common GitHub language colors
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572a5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Shell: '#89e051',
  Go: '#00add8',
  Rust: '#dea584',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Swift: '#F05138',
  PHP: '#4F5D95',
  Ruby: '#701516',
};

class GitHubService {
  private memoryCache: Map<string, { data: unknown; timestamp: number }> = new Map();

  private getCached<T>(key: string): T | null {
    const mem = this.memoryCache.get(key);
    if (mem && Date.now() - mem.timestamp < CACHE_TTL_MS) {
      return mem.data as T;
    }

    try {
      const stored = localStorage.getItem(CACHE_PREFIX + key);
      if (stored) {
        const parsed: CachedPayload<T> = JSON.parse(stored);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          this.memoryCache.set(key, parsed);
          return parsed.data;
        }
      }
    } catch {
      // localStorage might be unavailable or disabled
    }
    return null;
  }

  private setCached<T>(key: string, data: T): void {
    const entry = { data, timestamp: Date.now() };
    this.memoryCache.set(key, entry);
    try {
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
    } catch {
      // ignore storage quota / sandbox errors
    }
  }

  private parseRateLimit(response: Response) {
    const remaining = response.headers.get('x-ratelimit-remaining');
    const reset = response.headers.get('x-ratelimit-reset');
    return {
      remaining: remaining !== null ? parseInt(remaining, 10) : null,
      reset: reset !== null ? new Date(parseInt(reset, 10) * 1000) : null,
    };
  }

  /**
   * Fetch public user profile
   */
  async fetchUserProfile(username: string, signal?: AbortSignal): Promise<{
    profile: GitHubUserProfile;
    rateLimitRemaining: number | null;
    rateLimitReset: Date | null;
  }> {
    if (!username.trim()) {
      throw new Error('MISSING_USERNAME');
    }

    const cacheKey = `user_${username.toLowerCase()}`;
    const cached = this.getCached<GitHubUserProfile>(cacheKey);
    if (cached) {
      return { profile: cached, rateLimitRemaining: null, rateLimitReset: null };
    }

    const response = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}`, {
      signal,
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const rateInfo = this.parseRateLimit(response);

    if (response.status === 404) {
      throw new Error(`GitHub user "${username}" was not found on GitHub.`);
    }

    if (response.status === 403) {
      throw new Error(
        `GitHub API rate limit exceeded. GitHub limits unauthenticated requests to 60/hr. Resets at ${
          rateInfo.reset ? rateInfo.reset.toLocaleTimeString() : 'the next hour'
        }.`
      );
    }

    if (!response.ok) {
      throw new Error(`GitHub API request failed with HTTP ${response.status}: ${response.statusText}`);
    }

    const profile: GitHubUserProfile = await response.json();
    this.setCached(cacheKey, profile);

    return {
      profile,
      rateLimitRemaining: rateInfo.remaining,
      rateLimitReset: rateInfo.reset,
    };
  }

  /**
   * Fetch user public repositories (up to 100 sorted by updated)
   */
  async fetchUserRepos(username: string, signal?: AbortSignal): Promise<{
    repos: GitHubRepo[];
    rateLimitRemaining: number | null;
    rateLimitReset: Date | null;
  }> {
    if (!username.trim()) {
      throw new Error('MISSING_USERNAME');
    }

    const cacheKey = `repos_${username.toLowerCase()}`;
    const cached = this.getCached<GitHubRepo[]>(cacheKey);
    if (cached) {
      return { repos: cached, rateLimitRemaining: null, rateLimitReset: null };
    }

    const response = await fetch(
      `${BASE_URL}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
      {
        signal,
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    const rateInfo = this.parseRateLimit(response);

    if (response.status === 404) {
      throw new Error(`GitHub repositories for "${username}" not found.`);
    }

    if (response.status === 403) {
      throw new Error(
        `GitHub API rate limit exceeded. Reset at ${
          rateInfo.reset ? rateInfo.reset.toLocaleTimeString() : 'next hour'
        }.`
      );
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const repos: GitHubRepo[] = await response.json();
    this.setCached(cacheKey, repos);

    return {
      repos,
      rateLimitRemaining: rateInfo.remaining,
      rateLimitReset: rateInfo.reset,
    };
  }

  /**
   * Fetch language bytes for a specific repository
   */
  async fetchRepoLanguages(owner: string, repo: string, signal?: AbortSignal): Promise<Record<string, number>> {
    const cacheKey = `lang_${owner.toLowerCase()}_${repo.toLowerCase()}`;
    const cached = this.getCached<Record<string, number>>(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`, {
        signal,
        headers: { Accept: 'application/vnd.github.v3+json' },
      });
      if (response.ok) {
        const data = await response.json();
        this.setCached(cacheKey, data);
        return data;
      }
    } catch {
      // Non-fatal, fallback to empty
    }
    return {};
  }

  /**
   * Aggregate statistics strictly from verified public data
   */
  aggregateTelemetry(
    profile: GitHubUserProfile | null,
    repos: GitHubRepo[],
    rateLimitRemaining: number | null,
    rateLimitReset: Date | null
  ): TelemetryStats {
    let aggregatedStars = 0;
    let totalForks = 0;
    const langCounts: Record<string, number> = {};

    for (const r of repos) {
      aggregatedStars += r.stargazers_count || 0;
      totalForks += r.forks_count || 0;
      if (r.language) {
        langCounts[r.language] = (langCounts[r.language] || 0) + 1;
      }
    }

    const totalTypedRepos = Object.values(langCounts).reduce((acc, c) => acc + c, 0) || 1;
    const sortedLangs = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => {
        const percentage = Math.round((count / totalTypedRepos) * 100);
        return {
          name,
          count,
          percentage,
          color: LANGUAGE_COLORS[name] || '#00E5FF',
        } as LanguageStat;
      });

    return {
      publicReposCount: profile ? profile.public_repos : repos.length,
      aggregatedStars,
      totalForks,
      topLanguages: sortedLangs,
      lastFetchedAt: new Date().toLocaleTimeString(),
      rateLimitRemaining,
      rateLimitReset,
      isRateLimited: rateLimitRemaining === 0,
    };
  }
}

export const githubApi = new GitHubService();
