import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, Star, GitFork, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { GitHubRepo } from '../../types/github';
import { GlassPanel } from '../ui/GlassPanel';
import { ProjectModal } from '../ui/ProjectModal';
import { LANGUAGE_COLORS } from '../../services/githubApi';
import { PORTFOLIO_CONFIG } from '../../config/portfolio';

interface ProjectsSectionProps {
  repos: GitHubRepo[];
  featuredRepos: GitHubRepo[];
  isLoading: boolean;
  error: string | null;
}

export function ProjectsSection({
  repos,
  featuredRepos,
  isLoading,
  error,
}: ProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState<'featured' | 'all'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'updated' | 'stars'>('updated');
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  // Extract unique available languages
  const availableLanguages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return Array.from(set).sort();
  }, [repos]);

  // Filter and sort repositories
  const displayedRepos = useMemo(() => {
    const baseList = activeTab === 'featured' ? featuredRepos : repos;

    return baseList
      .filter((r) => {
        const desc = r.description || PORTFOLIO_CONFIG.customRepoDescriptions?.[r.name.toLowerCase()] || '';
        const matchesSearch =
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          desc.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLanguage =
          selectedLanguage === 'all' || r.language === selectedLanguage;

        return matchesSearch && matchesLanguage;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.pushed_at || b.updated_at).getTime() - new Date(a.pushed_at || a.updated_at).getTime();
      });
  }, [activeTab, featuredRepos, repos, searchQuery, selectedLanguage, sortBy]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background cyber accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyber-violet/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyber-cyan mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
              <span>REPOSITORY MATRIX // 02</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
              INTERACTIVE PROJECTS UNIVERSE
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Verified public repositories synchronized from GitHub. Select any card to inspect technical specifications, dependencies, and terminal clone directives.
            </p>
          </div>

          {/* View Tab Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-cyber-surface border border-slate-800">
            <button
              onClick={() => setActiveTab('featured')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'featured'
                  ? 'bg-cyber-cyan text-cyber-bg font-bold shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured ({featuredRepos.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-cyber-cyan text-cyber-bg font-bold shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>All Repos ({repos.length})</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-8 p-3 rounded-xl bg-cyber-surface/60 border border-slate-800/80 backdrop-blur-md">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter repositories by name or topic..."
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-slate-700/60 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          {/* Language Dropdown */}
          <div className="sm:col-span-3 relative">
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              aria-label="Filter repositories by language"
              className="w-full pl-9 pr-8 py-2 bg-black/50 border border-slate-700/60 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-cyber-cyan appearance-none cursor-pointer"
            >
              <option value="all">All Languages</option>
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Option */}
          <div className="sm:col-span-3 relative">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'updated' | 'stars')}
              aria-label="Sort repositories by criteria"
              className="w-full pl-9 pr-8 py-2 bg-black/50 border border-slate-700/60 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-cyber-cyan appearance-none cursor-pointer"
            >
              <option value="updated">Sort: Recently Updated</option>
              <option value="stars">Sort: Most Stars</option>
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-3 text-red-200 text-xs font-mono mb-8">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">TELEMETRY ACCESS NOTICE</p>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 rounded-xl bg-cyber-surface/40 border border-slate-800 animate-pulse p-6 space-y-4"
              >
                <div className="w-3/4 h-5 bg-slate-800 rounded" />
                <div className="w-full h-12 bg-slate-800/60 rounded" />
                <div className="w-1/2 h-4 bg-slate-800/40 rounded mt-8" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && displayedRepos.length === 0 && (
          <div className="text-center py-16 px-4 rounded-2xl bg-cyber-surface/40 border border-slate-800">
            <p className="text-sm font-mono text-slate-400">
              No repositories matched current filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLanguage('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono hover:bg-cyber-cyan/20 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Repository Cards Grid */}
        {!isLoading && displayedRepos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRepos.map((repo) => {
              const langColor = repo.language
                ? LANGUAGE_COLORS[repo.language] || '#00E5FF'
                : '#94A3B8';

              return (
                <GlassPanel
                  key={repo.id}
                  interactive
                  onClick={() => setSelectedRepo(repo)}
                  className="p-6 flex flex-col justify-between group"
                  variant="cyan"
                >
                  <div className="space-y-3">
                    {/* Header: Name and external indicator */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold font-mono text-white group-hover:text-cyber-cyan transition-colors line-clamp-1">
                        {repo.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyber-cyan shrink-0 transition-colors" />
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                      {repo.description ||
                        PORTFOLIO_CONFIG.customRepoDescriptions?.[repo.name.toLowerCase()] ||
                        'Public GitHub repository codebase.'}
                    </p>
                  </div>

                  <div className="pt-6 space-y-4">
                    {/* Topics badges */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyber-bg text-slate-300 border border-slate-800"
                          >
                            #{topic}
                          </span>
                        ))}
                        {repo.topics.length > 3 && (
                          <span className="text-[10px] font-mono text-slate-500 self-center">
                            +{repo.topics.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer: Language and Stars/Forks */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: langColor }}
                        />
                        <span className="text-slate-300 text-[11px]">
                          {repo.language || 'Code'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-cyber-cyan" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5 text-cyber-violet" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Project Inspection Modal */}
      <ProjectModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
    </section>
  );
}
