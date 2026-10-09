import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  Sparkles,
  Bookmark,
  CheckCircle2,
  DollarSign,
  Building2,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  ExternalLink,
  ChevronRight,
  BrainCircuit,
} from 'lucide-react';
import { calculateJobMatch } from '../utils/matchingEngine';
import { Job } from '../types';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

export const JobsView: React.FC = () => {
  const {
    jobs,
    candidateProfile,
    savedJobIds,
    toggleSaveJob,
    applyToJob,
    applications,
    setSelectedJobId,
    setActiveView,
    addToast,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArrangement, setSelectedArrangement] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<string>('all');
  const [selectedEmployment, setSelectedEmployment] = useState<string>('all');
  const [onlySaved, setOnlySaved] = useState(false);
  const [sortBy, setSortBy] = useState<'match' | 'newest' | 'salary'>('match');

  const [activeJobId, setActiveJobId] = useState<string>(jobs[0]?.id || '');
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');

  const scoredJobs = useMemo(() => {
    return jobs.map(job => {
      const match = calculateJobMatch(candidateProfile, job);
      return {
        ...job,
        matchScore: match.overallScore,
        matchBreakdown: match,
      };
    });
  }, [jobs, candidateProfile]);

  const filteredJobs = useMemo(() => {
    return scoredJobs.filter(job => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesSkills = [...job.requiredSkills, ...job.preferredSkills].some(s =>
          s.toLowerCase().includes(q)
        );
        const matchesLoc = job.location.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesLoc) {
          return false;
        }
      }

      if (selectedArrangement !== 'all' && job.workArrangement !== selectedArrangement) {
        return false;
      }

      if (selectedExperience !== 'all' && job.experienceLevel !== selectedExperience) {
        return false;
      }

      if (selectedEmployment !== 'all' && job.employmentType !== selectedEmployment) {
        return false;
      }

      if (onlySaved && !savedJobIds.includes(job.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      if (sortBy === 'salary') return b.maxSalary - a.maxSalary;
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    });
  }, [scoredJobs, searchTerm, selectedArrangement, selectedExperience, selectedEmployment, onlySaved, sortBy, savedJobIds]);

  const activeJob = scoredJobs.find(j => j.id === activeJobId) || filteredJobs[0] || scoredJobs[0];
  const activeJobMatch = activeJob?.matchBreakdown;
  const isAppliedToActiveJob = applications.some(a => a.jobId === activeJob?.id && a.candidateId === candidateProfile.id);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJob) return;
    const success = applyToJob(activeJob, coverNote);
    if (success) {
      setApplyModalOpen(false);
      setCoverNote('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            Explainable AI Job Marketplace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Curated Opportunities & Compatibility Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every listing shows transparent score contributions matching your verified profile competencies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOnlySaved(!onlySaved)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              onlySaved
                ? 'bg-violet-600 border-violet-500 text-white shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({savedJobIds.length})</span>
          </button>

          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="match" className="bg-slate-900">Highest AI Match</option>
              <option value="salary" className="bg-slate-900">Highest Compensation</option>
              <option value="newest" className="bg-slate-900">Recently Posted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl mb-6 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-950/80 rounded-xl border border-slate-800">
            <Search className="w-4 h-4 text-violet-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by role, company, skill (e.g. React, Docker), or city..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedArrangement}
              onChange={e => setSelectedArrangement(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Workplaces</option>
              <option value="remote">Remote Only</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-Site</option>
            </select>

            <select
              value={selectedExperience}
              onChange={e => setSelectedExperience(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Experience Levels</option>
              <option value="Entry-Level">Entry-Level (0-1 yrs)</option>
              <option value="Mid-Level">Mid-Level (2-3 yrs)</option>
              <option value="Senior">Senior (4+ yrs)</option>
            </select>

            <select
              value={selectedEmployment}
              onChange={e => setSelectedEmployment(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>

            {(searchTerm || selectedArrangement !== 'all' || selectedExperience !== 'all' || selectedEmployment !== 'all' || onlySaved) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedArrangement('all');
                  setSelectedExperience('all');
                  setSelectedEmployment('all');
                  setOnlySaved(false);
                }}
                className="text-xs text-violet-400 hover:text-violet-300 font-semibold px-2 py-1 cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Split View Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 mb-1">
            <span>Showing {filteredJobs.length} matching positions</span>
            <span className="text-violet-400 font-semibold font-mono">Live Scored</span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
              <Search className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <h4 className="font-bold text-white text-sm">No positions match your search</h4>
              <p className="text-xs text-slate-400 mt-1">Try broadening keywords or clearing active filters.</p>
            </div>
          ) : (
            filteredJobs.map(job => {
              const isSelected = activeJob?.id === job.id;
              const isSaved = savedJobIds.includes(job.id);
              const isApplied = applications.some(a => a.jobId === job.id && a.candidateId === candidateProfile.id);

              return (
                <div
                  key={job.id}
                  onClick={() => setActiveJobId(job.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-900/90 border-violet-500/60 shadow-lg shadow-violet-950/40 ring-1 ring-violet-500/30'
                      : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-800 shrink-0 mt-0.5"
                      />
                      <div>
                        <h3 className="font-bold text-sm text-white leading-snug hover:text-violet-300 transition-colors">
                          {job.title}
                        </h3>
                        <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                          <span>{job.company}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-[11px] text-cyan-400">{job.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0">
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 font-mono font-bold text-xs">
                        <Sparkles className="w-3 h-3 text-violet-400" />
                        {job.matchScore}%
                      </span>
                      {isApplied && (
                        <span className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Applied
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] text-slate-300">
                    <span className="bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 text-emerald-400 font-medium">
                      {job.salaryRange.split('/')[0]}
                    </span>
                    <span className="bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 capitalize">
                      {job.workArrangement}
                    </span>
                    <span className="bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                      {job.experienceLevel}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {job.requiredSkills.slice(0, 3).map(skill => (
                      <span
                        key={skill}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{job.applicantsCount} applicants</span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleSaveJob(job.id);
                      }}
                      className="p-1 text-slate-400 hover:text-violet-400 transition-colors cursor-pointer"
                      title={isSaved ? 'Remove bookmark' : 'Bookmark job'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-violet-400 text-violet-400' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Detailed Job & AI Inspection */}
        {activeJob && (
          <div className="lg:col-span-7 sticky top-20 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="flex items-start gap-3.5">
                <img
                  src={activeJob.companyLogo}
                  alt={activeJob.company}
                  className="w-14 h-14 rounded-xl object-cover border border-slate-700 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold text-white">{activeJob.title}</h2>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {activeJob.companyTier}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-violet-300">{activeJob.company}</span>
                    <span className="text-slate-600">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {activeJob.location}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-emerald-400 font-semibold">{activeJob.salaryRange}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveJob(activeJob.id)}
                  className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    savedJobIds.includes(activeJob.id)
                      ? 'bg-violet-950/80 border-violet-500/40 text-violet-400'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark
                    className={`w-4 h-4 ${savedJobIds.includes(activeJob.id) ? 'fill-violet-400' : ''}`}
                  />
                </button>

                <button
                  onClick={() => {
                    if (isAppliedToActiveJob) {
                      addToast({
                        title: 'Already Applied',
                        message: 'You have an active submission for this role in your dashboard.',
                        type: 'info',
                      });
                    } else {
                      setApplyModalOpen(true);
                    }
                  }}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg flex items-center gap-2 cursor-pointer ${
                    isAppliedToActiveJob
                      ? 'bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 cursor-default'
                      : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-600/30'
                  }`}
                >
                  {isAppliedToActiveJob ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Applied (Tracking in Hub)</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>1-Click Apply with AI Profile</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Explainable AI Match Engine Card */}
            {activeJobMatch && (
              <div className="p-5 rounded-2xl bg-gradient-to-b from-violet-950/30 via-slate-950/60 to-slate-950/80 border border-violet-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-violet-400" />
                    <h3 className="font-bold text-sm text-white">Explainable AI Compatibility Score</h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-900/60 border border-violet-500/40 text-white font-mono font-bold text-sm">
                    <span>{activeJobMatch.overallScore}%</span>
                    <span className="text-[10px] text-violet-300 font-sans font-medium">Alignment</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-5 h-44 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={activeJobMatch.radarData}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 9 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                          name="Candidate Score"
                          dataKey="score"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.4}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="md:col-span-7 space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-0.5 text-slate-300">
                        <span>Required Skills Match (40% weight)</span>
                        <span className="font-semibold text-violet-400">{activeJobMatch.requiredSkillsScore}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-violet-500 rounded-full"
                          style={{ width: `${activeJobMatch.requiredSkillsScore}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-0.5 text-slate-300">
                        <span>Preferred & Bonus Skills (20% weight)</span>
                        <span className="font-semibold text-indigo-400">{activeJobMatch.preferredSkillsScore}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${activeJobMatch.preferredSkillsScore}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-0.5 text-slate-300">
                        <span>Project Portfolio Relevance (20% weight)</span>
                        <span className="font-semibold text-cyan-400">{activeJobMatch.projectRelevanceScore}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full"
                          style={{ width: `${activeJobMatch.projectRelevanceScore}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-0.5 text-slate-300">
                        <span>Workplace & Location Preference (10% weight)</span>
                        <span className="font-semibold text-emerald-400">{activeJobMatch.preferenceScore}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full"
                          style={{ width: `${activeJobMatch.preferenceScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-violet-300 block mb-1">Algorithmic Match Explanation:</span>
                  {activeJobMatch.rationale}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                    <span className="font-semibold text-emerald-400 block mb-1.5">
                      ✓ Matching Competencies ({activeJobMatch.matchingSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {activeJobMatch.matchingSkills.map(s => (
                        <span
                          key={s}
                          className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-200 border border-emerald-700/30"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20">
                    <span className="font-semibold text-amber-400 block mb-1.5">
                      ⚠ Identified Gaps ({activeJobMatch.missingSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {activeJobMatch.missingSkills.length === 0 ? (
                        <span className="text-[11px] text-slate-400">Zero missing core skills!</span>
                      ) : (
                        activeJobMatch.missingSkills.map(s => (
                          <span
                            key={s}
                            className="text-[10px] px-2 py-0.5 rounded bg-amber-900/40 text-amber-200 border border-amber-700/30"
                          >
                            {s}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Role Overview & Details */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div>
                <h4 className="font-bold text-white text-sm mb-2">About The Role</h4>
                <p className="leading-relaxed text-slate-400">{activeJob.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-2">Key Responsibilities</h4>
                <ul className="space-y-1.5 list-disc list-inside text-slate-400 leading-relaxed">
                  {activeJob.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-2">Required Core Competencies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeJob.requiredSkills.map(s => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-2">Preferred & Nice-to-Have Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeJob.preferredSkills.map(s => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/60 text-slate-400 border border-slate-700/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-2">Benefits & Perks</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeJob.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300">
                      <span className="text-emerald-400">✦</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 1-Click Application Modal */}
      {applyModalOpen && activeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="max-w-xl w-full rounded-2xl bg-slate-900 border border-violet-500/40 p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setApplyModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white">Apply to {activeJob.title}</h3>
                <p className="text-xs text-violet-300">{activeJob.company}</p>
              </div>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                <div className="text-slate-400 font-semibold uppercase text-[10px]">Applying as:</div>
                <div className="font-bold text-white text-sm">{candidateProfile.name}</div>
                <div className="text-slate-400">{candidateProfile.headline}</div>
                <div className="text-slate-400 flex items-center gap-3 pt-1">
                  <span>{candidateProfile.email}</span>
                  <span>•</span>
                  <span>{candidateProfile.phone}</span>
                </div>
                <div className="text-[11px] text-cyan-400 pt-1">
                  Attached Resume: {candidateProfile.resume.fileName} (Parsed & Verified)
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tailored Note to Hiring Team (Optional):
                </label>
                <textarea
                  rows={4}
                  value={coverNote}
                  onChange={e => setCoverNote(e.target.value)}
                  placeholder="Highlight key project achievements or reason for applying to this squad..."
                  className="w-full bg-slate-950 rounded-xl border border-slate-800 p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setCoverNote(
                    `I am excited to apply for the ${activeJob.title} position at ${activeJob.company}. My 4 years of experience building real-time TypeScript and Python systems align with your tech stack requirements, and my open-source project portfolio demonstrates my commitment to reliable production architectures.`
                  );
                }}
                className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-draft tailored note from my profile</span>
              </button>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
