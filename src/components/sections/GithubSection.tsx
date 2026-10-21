import { RefreshCw, Star, GitFork, Users, Code, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import { GitHubUserProfile, GitHubRepo, TelemetryStats } from '../../types/github';
import { GlassPanel } from '../ui/GlassPanel';

interface GithubSectionProps {
  profile: GitHubUserProfile | null;
  repos: GitHubRepo[];
  telemetry: TelemetryStats | null;
  isLoading: boolean;
  onRefresh: () => void;
}

export function GithubSection({
  profile,
  repos,
  telemetry,
  isLoading,
  onRefresh,
}: GithubSectionProps) {
  const recentRepos = repos.slice(0, 4);

  return (
    <section id="telemetry" className="py-24 relative overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyber-violet mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-violet animate-pulse" />
              <span>LIVE GITHUB TELEMETRY // 03</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
              VERIFIED GITHUB TELEMETRY
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Real-time public data fetched directly from GitHub REST API v3. Strictly verified metrics without synthetic inflation or fabricated contribution claims.
            </p>
          </div>

          {/* Sync Status & Manual Refresh */}
          <div className="flex items-center gap-3">
            <div className="text-right text-xs font-mono text-slate-400 hidden sm:block">
              <div>Sync: {telemetry?.lastFetchedAt || 'Connected'}</div>
              <div className="text-[10px] text-slate-500">
                Rate Limit: {telemetry?.rateLimitRemaining !== null ? `${telemetry?.rateLimitRemaining} left` : 'Cached'}
              </div>
            </div>
            <button
              onClick={onRefresh}
              disabled={isLoading}
              title="Refresh telemetry from GitHub"
              className="p-2.5 rounded-xl bg-cyber-surface border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* 4 Key Verified Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Public Repos */}
          <GlassPanel className="p-6 space-y-3" variant="cyan">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono tracking-wider uppercase">Public Repos</span>
              <BookOpen className="w-4 h-4 text-cyber-cyan" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              {profile ? profile.public_repos : repos.length}
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              Verified public repositories on GitHub
            </p>
          </GlassPanel>

          {/* Card 2: Aggregated Stars */}
          <GlassPanel className="p-6 space-y-3" variant="violet">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono tracking-wider uppercase">Aggregated Stars</span>
              <Star className="w-4 h-4 text-cyber-violet" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              {telemetry?.aggregatedStars ?? 0}
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              Aggregated across fetched public repos
            </p>
          </GlassPanel>

          {/* Card 3: Network / Community */}
          <GlassPanel className="p-6 space-y-3" variant="neutral">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono tracking-wider uppercase">Community Network</span>
              <Users className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-white flex items-baseline gap-2">
              <span>{profile?.followers ?? 0}</span>
              <span className="text-xs font-normal text-slate-400 font-mono">
                / {profile?.following ?? 0} following
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              Followers on GitHub public profile
            </p>
          </GlassPanel>

          {/* Card 4: Total Forks */}
          <GlassPanel className="p-6 space-y-3" variant="cyan">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono tracking-wider uppercase">Total Forks</span>
              <GitFork className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              {telemetry?.totalForks ?? 0}
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              Forks distributed across public projects
            </p>
          </GlassPanel>
        </div>

        {/* Dual Panel: Language Breakdown & Recently Updated Repositories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Programming Languages */}
          <GlassPanel className="p-6 sm:p-8 space-y-6" variant="cyan">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-base font-bold font-mono text-white tracking-wide">
                  VERIFIED CODEBASE LANGUAGE PROFILE
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Derived from repo metadata
              </span>
            </div>

            {telemetry?.topLanguages && telemetry.topLanguages.length > 0 ? (
              <div className="space-y-4">
                {telemetry.topLanguages.slice(0, 6).map((lang) => (
                  <div key={lang.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-slate-200 font-medium">{lang.name}</span>
                      </div>
                      <span className="text-slate-400">{lang.percentage}%</span>
                    </div>
                    {/* Futuristic progress meter */}
                    <div className="w-full h-2 rounded-full bg-cyber-bg overflow-hidden border border-slate-800">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${lang.percentage}%`,
                          backgroundColor: lang.color,
                          boxShadow: `0 0 10px ${lang.color}66`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-mono text-slate-400 py-6 text-center">
                Language profile loading or unavailable...
              </p>
            )}
          </GlassPanel>

          {/* Recently Active Repositories */}
          <GlassPanel className="p-6 sm:p-8 space-y-6" variant="violet">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyber-violet" />
                <h3 className="text-base font-bold font-mono text-white tracking-wide">
                  RECENT REPOSITORY ACTIVITY
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Latest updates
              </span>
            </div>

            <div className="space-y-3">
              {recentRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-cyber-bg/70 border border-slate-800/80 hover:border-cyber-violet/40 transition-colors flex items-center justify-between group block"
                >
                  <div className="space-y-1 pr-3">
                    <span className="text-xs font-mono font-bold text-white group-hover:text-cyber-violet transition-colors block">
                      {repo.name}
                    </span>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {repo.description || 'Public repository.'}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-slate-400 block">
                      {new Date(repo.pushed_at || repo.updated_at).toLocaleDateString()}
                    </span>
                    <span className="text-[10px] font-mono text-cyber-cyan">
                      {repo.language || 'Code'}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Verification notice */}
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real data verified through GitHub REST API.</span>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
