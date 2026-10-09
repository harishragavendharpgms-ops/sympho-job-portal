import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Search,
  MapPin,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  FileCheck2,
  Bot,
  GraduationCap,
  ArrowRight,
  Zap,
  Users,
  Compass,
  Code,
  ChevronRight,
} from 'lucide-react';
import { calculateJobMatch } from '../utils/matchingEngine';
import { INITIAL_JOBS } from '../data/mockData';

export const HomeView: React.FC = () => {
  const { jobs, candidateProfile, setActiveView, setSelectedJobId, setRole } = useApp();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const effectiveJobs = jobs && jobs.length > 0 ? jobs : INITIAL_JOBS;
  const featuredJobs = effectiveJobs.slice(0, 3);
  const heroSampleJob = effectiveJobs[0] || INITIAL_JOBS[0];
  const heroMatch = calculateJobMatch(candidateProfile, heroSampleJob);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView('jobs');
  };

  return (
    <div className="relative min-h-screen text-slate-100 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-violet-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] left-0 w-[450px] h-[450px] bg-violet-600/10 blur-[120px] pointer-events-none -z-10" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Next-Generation Career & Talent Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              Your Potential. <br />
              <span className="gradient-text-hero">The Right Opportunity.</span> <br />
              <span className="gradient-text-accent">Powered by AI.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Discover opportunities calibrated to your true competencies, eliminate recruitment black boxes with
              explainable AI matching, and level up with personal career copilots and interview labs.
            </p>

            <form
              onSubmit={handleSearchSubmit}
              className="p-2 sm:p-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row gap-2 max-w-2xl"
            >
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <Search className="w-4 h-4 text-violet-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Job title, tech stack (e.g. React, Python), or company..."
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-slate-950/60 rounded-xl border border-slate-800/80 sm:w-44">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Location or Remote"
                  value={searchLocation}
                  onChange={e => setSearchLocation(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-sm transition-all shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Find Roles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-400">
              <span className="font-medium text-slate-300">Popular Competencies:</span>
              {['AI & LLMs', 'React 19', 'TypeScript', 'Distributed Systems', 'Python FastAPI', 'Cloud DevOps'].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchKeyword(tag);
                    setActiveView('jobs');
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setActiveView('jobs')}
                className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all shadow-lg shadow-violet-600/25 flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                Explore 45,000+ Verified Roles
              </button>
              <button
                onClick={() => setActiveView('resume-studio')}
                className="px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 text-violet-200 hover:text-white font-semibold text-sm transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Try AI Resume Intelligence
              </button>
            </div>
          </div>

          {/* Right Hero Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/95 border border-violet-500/30 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                    Live AI Matching Simulation
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 font-mono">
                  v2.6 Deterministic + LLM
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <img
                  src={candidateProfile.avatar}
                  alt={candidateProfile.name}
                  className="w-12 h-12 rounded-xl object-cover border border-violet-500/40"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-white truncate">{candidateProfile.name}</div>
                  <div className="text-xs text-slate-400 truncate">{candidateProfile.headline}</div>
                  <div className="text-[11px] text-cyan-400 font-medium">B.Tech CS • 4 Yrs Exp • Bengaluru</div>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Target Role:</span>
                    <h4 className="font-semibold text-sm text-slate-100">{heroSampleJob.title}</h4>
                    <span className="text-xs text-violet-400 font-medium">{heroSampleJob.company}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-black text-cyan-400 font-mono">{heroMatch.overallScore}%</div>
                    <span className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">
                      Optimal Match
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1 text-slate-300">
                      <span>Required Skills Fit</span>
                      <span className="font-semibold text-violet-400">{heroMatch.requiredSkillsScore}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                        style={{ width: `${heroMatch.requiredSkillsScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1 text-slate-300">
                      <span>Project Portfolio Relevance</span>
                      <span className="font-semibold text-cyan-400">{heroMatch.projectRelevanceScore}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                        style={{ width: `${heroMatch.projectRelevanceScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-violet-950/30 border border-violet-800/40 text-[11px] text-slate-300 leading-relaxed">
                  <div className="font-semibold text-violet-300 flex items-center gap-1 mb-1">
                    <Sparkles className="w-3 h-3 text-violet-400" />
                    Explainable AI Rationale:
                  </div>
                  "{heroMatch.rationale}"
                </div>

                <button
                  onClick={() => {
                    setSelectedJobId(heroSampleJob.id);
                    setActiveView('job-detail');
                  }}
                  className="w-full py-2 rounded-lg bg-violet-600/80 hover:bg-violet-600 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Inspect Full Algorithmic Breakdown</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="absolute -bottom-4 -left-4 p-2.5 rounded-xl bg-slate-900 border border-emerald-500/30 shadow-xl backdrop-blur-md flex items-center gap-2.5 text-xs text-white">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <div className="font-bold text-[11px]">Zero Blind Ghosting</div>
                  <div className="text-[10px] text-slate-400">100% Transparent Feedback</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & IMPACT METRICS */}
      <section className="border-y border-slate-800/80 bg-slate-950/60 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
              Platform Benchmark Metrics (Sample Competition Telemetry)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 font-mono">
                45,000+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Curated Tech Opportunities</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Across AI, Cloud & Systems</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-mono">
                1,200+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Verified Enterprise Employers</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Tier-1 Tech & AI Labs</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-mono">
                94.8%
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Skill Match Accuracy</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Explainable AI Scoring</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400 font-mono">
                18,500+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Campus Placements Facilitated</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Top Engineering Universities</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW NEXORA WORKS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Transparent Methodology</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How NEXORA Accelerates Your Career</h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            From raw resume to verified job offers, our intelligent pipeline eliminates recruitment friction with complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Build Verified Profile',
              desc: 'Import projects, GitHub repositories, and certifications. Our safe parser models your technical footprint.',
              icon: FileCheck2,
              color: 'from-violet-500 to-indigo-500',
            },
            {
              step: '02',
              title: 'Discover Explainable Matches',
              desc: 'Explore roles with transparent breakdown scores. Understand exactly why you match and what skills to bridge.',
              icon: BrainCircuit,
              color: 'from-indigo-500 to-cyan-500',
            },
            {
              step: '03',
              title: 'Level Up with AI Studio',
              desc: 'Run ATS resume health checks, simulate STAR behavioral interviews, and execute code challenges.',
              icon: Zap,
              color: 'from-cyan-500 to-emerald-500',
            },
            {
              step: '04',
              title: '1-Click Direct Application',
              desc: 'Apply directly to recruiter pipelines with live stage tracking from submission to final offer release.',
              icon: CheckCircle2,
              color: 'from-emerald-500 to-violet-500',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-violet-500/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-800 text-violet-300 border border-slate-700">
                      STEP {item.step}
                    </span>
                    <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${item.color} text-white shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SIGNATURE FEATURES SHOWCASE */}
      <section className="py-16 bg-slate-950/70 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Core Innovations</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Signature Intelligence Capabilities</h2>
            <p className="text-sm sm:text-base text-slate-400">
              Built with mathematical rigor, Gemini LLM reasoning, and enterprise-grade recruitment standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-violet-500/20 hover:border-violet-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-5">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Explainable AI Matching Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Transparent multi-factor scoring evaluating required competencies, projects, and work preferences with zero black-box bias.
              </p>
              <button
                onClick={() => setActiveView('jobs')}
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 cursor-pointer"
              >
                Inspect Matching Engine →
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-cyan-500/20 hover:border-cyan-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Resume Intelligence Studio</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Instant ATS parseability score, keyword gap detection, and one-click STAR-method bullet point transformers.
              </p>
              <button
                onClick={() => setActiveView('resume-studio')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                Open Resume Studio →
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-indigo-500/20 hover:border-indigo-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Career Copilot</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Interactive strategic advisor powered by Gemini 3.8 Flash for career transition plans, cover letters, and salary negotiations.
              </p>
              <button
                onClick={() => setActiveView('copilot')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                Chat with Copilot →
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-emerald-500/20 hover:border-emerald-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Interactive Interview Lab</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Realistic behavioral STAR interview simulator with real-time scoring and in-browser coding assessment with unit test runner.
              </p>
              <button
                onClick={() => setActiveView('interview-lab')}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                Enter Interview Lab →
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-purple-500/20 hover:border-purple-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Recruiter Enterprise Workspace</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Full-funnel applicant pipeline Kanban, AI job description composer, candidate match breakdowns, and calendar scheduling.
              </p>
              <button
                onClick={() => {
                  setRole('recruiter');
                  setActiveView('recruiter-dashboard');
                }}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
              >
                Recruiter Workspace →
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-cyan-500/20 hover:border-cyan-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">College Placement & TPO Hub</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Automated eligibility checking by CGPA, branch, and backlog constraints, plus aggregate student skill gap heatmaps.
              </p>
              <button
                onClick={() => {
                  setRole('placement_officer');
                  setActiveView('placement-dashboard');
                }}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                Explore TPO Portal →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED OPPORTUNITIES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Curated Vacancies</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Featured High-Compatibility Roles</h2>
            <p className="text-xs text-slate-400 mt-1">
              Demonstration listings scored against your active profile competencies
            </p>
          </div>
          <button
            onClick={() => setActiveView('jobs')}
            className="flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
          >
            <span>View All {jobs.length} Verified Roles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredJobs.map(job => {
            const match = calculateJobMatch(candidateProfile, job);
            return (
              <div
                key={job.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-violet-600/10 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-11 h-11 rounded-xl object-cover border border-slate-700"
                    />
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-bold font-mono">
                      <Sparkles className="w-3 h-3 text-violet-400" />
                      <span>{match.overallScore}% Match</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-violet-300 transition-colors">
                    {job.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">{job.company}</div>

                  <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] text-slate-300">
                    <span className="flex items-center gap-1 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {job.location}
                    </span>
                    <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800 capitalize">
                      {job.workArrangement}
                    </span>
                    <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800 text-emerald-400 font-medium">
                      {job.salaryRange.split('/')[0]}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {job.requiredSkills.slice(0, 3).map(skill => (
                      <span
                        key={skill}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.requiredSkills.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400">
                        +{job.requiredSkills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{job.applicantsCount} applicants</span>
                  <button
                    onClick={() => {
                      setSelectedJobId(job.id);
                      setActiveView('job-detail');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View & Apply</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-violet-900/50 via-indigo-900/40 to-cyan-900/40 border border-violet-500/40 p-8 sm:p-14 text-center relative overflow-hidden backdrop-blur-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">Start Your Ascent</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Discover Your True Compatibility?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Step into the future of intelligent career development. Benchmark your skills, eliminate hiring black boxes, and connect with visionary teams today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setActiveView('jobs')}
                className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-200 transition-colors shadow-lg cursor-pointer"
              >
                Browse Career Opportunities
              </button>
              <button
                onClick={() => setActiveView('resume-studio')}
                className="px-6 py-3 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white font-bold text-sm transition-colors border border-violet-400/30 cursor-pointer"
              >
                Run AI Resume Analysis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white">NEXORA</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
              Next-generation AI-powered career & talent ecosystem designed for high-velocity software engineering,
              transparent candidate matching, and enterprise campus placements.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              National Technology Competition Demonstration Edition • 2026
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Candidate Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveView('jobs')} className="hover:text-white transition-colors cursor-pointer">Explore Marketplace</button></li>
              <li><button onClick={() => setActiveView('resume-studio')} className="hover:text-white transition-colors cursor-pointer">Resume ATS Studio</button></li>
              <li><button onClick={() => setActiveView('interview-lab')} className="hover:text-white transition-colors cursor-pointer">Interview & Coding Lab</button></li>
              <li><button onClick={() => setActiveView('career-growth')} className="hover:text-white transition-colors cursor-pointer">Career Roadmaps</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Enterprise & Campus</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => { setRole('recruiter'); setActiveView('recruiter-dashboard'); }} className="hover:text-white transition-colors cursor-pointer">Recruiter Workspace</button></li>
              <li><button onClick={() => { setRole('placement_officer'); setActiveView('placement-dashboard'); }} className="hover:text-white transition-colors cursor-pointer">College TPO Portal</button></li>
              <li><button onClick={() => setActiveView('companies')} className="hover:text-white transition-colors cursor-pointer">Company Directory</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Governance & AI Ethics</h4>
            <ul className="space-y-2 text-xs">
              <li className="text-slate-400">Explainable Scoring Policy</li>
              <li className="text-slate-400">Zero Protected Bias Guarantee</li>
              <li className="text-slate-400">Privacy & Data Protections</li>
              <li className="text-slate-400">WCAG 2.1 AA Accessibility</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
          <div>© 2026 NEXORA Intelligence Platform. All demo data clearly marked for judging purposes.</div>
          <div className="mt-2 sm:mt-0 flex gap-4">
            <span>Server Proxy AI: Gemini 3.8 Flash</span>
            <span>Deterministic Fallback: Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
