import { useState, useEffect, useCallback, useRef } from 'react';
import { GitHubUserProfile, GitHubRepo, TelemetryStats } from '../types/github';
import { githubApi } from '../services/githubApi';
import { PORTFOLIO_CONFIG } from '../config/portfolio';

export interface UseGithubDataResult {
  username: string;
  setUsername: (user: string) => void;
  profile: GitHubUserProfile | null;
  repos: GitHubRepo[];
  featuredRepos: GitHubRepo[];
  telemetry: TelemetryStats | null;
  isLoading: boolean;
  error: string | null;
  isMissingUsername: boolean;
  refetch: () => Promise<void>;
}

export function useGithubData(): UseGithubDataResult {
  const [username, setUsername] = useState<string>(() => {
    // Check URL query param first (?user=...), then localStorage, then config
    const params = new URLSearchParams(window.location.search);
    const queryUser = params.get('user');
    if (queryUser) return queryUser;
    const storedUser = localStorage.getItem('cyber_portfolio_active_user');
    if (storedUser !== null) return storedUser;
    return PORTFOLIO_CONFIG.githubUsername.trim();
  });

  const [profile, setProfile] = useState<GitHubUserProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [telemetry, setTelemetry] = useState<TelemetryStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSetUsername = useCallback((newUsername: string) => {
    const trimmed = newUsername.trim();
    setUsername(trimmed);
    localStorage.setItem('cyber_portfolio_active_user', trimmed);
    const url = new URL(window.location.href);
    if (trimmed) {
      url.searchParams.set('user', trimmed);
    } else {
      url.searchParams.delete('user');
    }
    window.history.replaceState({}, '', url.toString());
  }, []);

  const loadData = useCallback(async () => {
    if (!username) {
      setIsLoading(false);
      setProfile(null);
      setRepos([]);
      setTelemetry(null);
      setError(null);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const [profileRes, reposRes] = await Promise.all([
        githubApi.fetchUserProfile(username, controller.signal),
        githubApi.fetchUserRepos(username, controller.signal),
      ]);

      setProfile(profileRes.profile);
      setRepos(reposRes.repos);

      const computedTelemetry = githubApi.aggregateTelemetry(
        profileRes.profile,
        reposRes.repos,
        profileRes.rateLimitRemaining ?? reposRes.rateLimitRemaining,
        profileRes.rateLimitReset ?? reposRes.rateLimitReset
      );
      setTelemetry(computedTelemetry);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') return;
        setError(err.message);
      } else {
        setError('An unexpected telemetry connection error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    loadData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData]);

  // Compute featured repositories by prioritizing names configured in PORTFOLIO_CONFIG
  const featuredRepos = repos.filter((r) => {
    const lowerName = r.name.toLowerCase();
    return PORTFOLIO_CONFIG.featuredRepoNames.some(
      (featured) => featured.toLowerCase() === lowerName
    );
  });

  return {
    username,
    setUsername: handleSetUsername,
    profile,
    repos,
    featuredRepos: featuredRepos.length > 0 ? featuredRepos : repos.slice(0, 6),
    telemetry,
    isLoading,
    error,
    isMissingUsername: !username,
    refetch: loadData,
  };
}
