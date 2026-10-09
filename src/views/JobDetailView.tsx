import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Sparkles,
  MapPin,
  Bookmark,
  CheckCircle2,
  BrainCircuit,
} from 'lucide-react';
import { calculateJobMatch } from '../utils/matchingEngine';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

export const JobDetailView: React.FC = () => {
  const {
    jobs,
    selectedJobId,
    candidateProfile,
    savedJobIds,
    toggleSaveJob,
    applyToJob,
    applications,
    setActiveView,
    addToast,
  } = useApp();

  const [coverNote, setCoverNote] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const job = jobs.find(j => j.id === selectedJobId) || jobs[0];
  const match = calculateJobMatch(candidateProfile, job);
  const isApplied = applications.some(a => a.jobId === job.id && a.candidateId === candidateProfile.id);
  const isSaved = savedJobIds.includes(job.id);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyToJob(job, coverNote);
    if (success) {
      setModalOpen(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <button
        onClick={() => setActiveView('jobs')}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Job Search Marketplace</span>
      </button>

      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-start gap-4">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">{job.title}</h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800">
                  {job.companyTier}
                </span>
              </div>
              <div className="text-sm text-slate-300 font-medium mt-1 flex flex-wrap items-center gap-2">
                <span className="text-violet-400">{job.company}</span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {job.location} ({job.workArrangement})
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-semibold">{job.salaryRange}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-violet-950/80 border-violet-500/40 text-violet-400'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-violet-400' : ''}`} />
            </button>

            <button
              onClick={() => {
                if (isApplied) {
                  addToast({ title: 'Application Active', message: 'You have already applied.', type: 'info' });
                } else {
                  setModalOpen(true);
                }
              }}
              className={`px-6 py-3 rounded-xl font-bold text-xs transition-all shadow-lg flex items-center gap-2 cursor-pointer ${
                isApplied
                  ? 'bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 cursor-default'
                  : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/30'
              }`}
            >
              {isApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Applied</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Apply with NEXORA Profile</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-slate-500 text-[10px] uppercase font-semibold">Experience Level</div>
            <div className="font-bold text-white text-sm mt-0.5">{job.experienceLevel} ({job.experienceYearsMin}+ yrs)</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-slate-500 text-[10px] uppercase font-semibold">Employment Type</div>
            <div className="font-bold text-white text-sm mt-0.5">{job.employmentType}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-slate-500 text-[10px] uppercase font-semibold">Min CGPA / Degree</div>
            <div className="font-bold text-white text-sm mt-0.5">{job.minimumCgpa ? `${job.minimumCgpa}+ CGPA` : 'Open'}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-slate-500 text-[10px] uppercase font-semibold">Application Deadline</div>
            <div className="font-bold text-white text-sm mt-0.5">{job.deadline}</div>
          </div>
        </div>
      </div>

      {/* Signature Explainable AI Matching Analysis Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-violet-950/40 via-slate-900/90 to-slate-950 border border-violet-500/30 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-violet-400" />
            <div>
              <h2 className="text-lg font-bold text-white">Explainable AI Match Assessment</h2>
              <p className="text-xs text-slate-400">Personalized algorithmic comparison for {candidateProfile.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-900/60 border border-violet-500/50 text-white font-mono font-bold text-base">
            <Sparkles className="w-4 h-4 text-violet-300" />
            <span>{match.overallScore}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={match.radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Compatibility" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="md:col-span-7 space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-xs mb-1 text-slate-300">
                <span>Required Skills Alignment (40%)</span>
                <span className="font-semibold text-violet-400">{match.requiredSkillsScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: `${match.requiredSkillsScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 text-slate-300">
                <span>Preferred Competencies (20%)</span>
                <span className="font-semibold text-indigo-400">{match.preferredSkillsScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${match.preferredSkillsScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 text-slate-300">
                <span>Project Portfolio Alignment (20%)</span>
                <span className="font-semibold text-cyan-400">{match.projectRelevanceScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${match.projectRelevanceScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 text-slate-300">
                <span>Experience Seniority Fit (10%)</span>
                <span className="font-semibold text-emerald-400">{match.experienceFitScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${match.experienceFitScore}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <span className="font-bold text-violet-300 block mb-1">Explainable Reasoning:</span>
          {match.rationale}
        </div>

        <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-800/30 text-xs space-y-2">
          <span className="font-bold text-violet-300 block">Personalized Recommendations to Reach 95%+ Fit:</span>
          <ul className="space-y-1 list-disc list-inside text-slate-300">
            {match.suggestions.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full Description & Requirements */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 text-sm text-slate-300">
        <div>
          <h3 className="font-bold text-white text-base mb-2">Role Overview</h3>
          <p className="leading-relaxed text-slate-400">{job.description}</p>
        </div>

        <div>
          <h3 className="font-bold text-white text-base mb-2">Responsibilities</h3>
          <ul className="space-y-1.5 list-disc list-inside text-slate-400 leading-relaxed">
            {job.responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white text-base mb-2">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.map(s => (
              <span key={s} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white text-base mb-2">Perks & Benefits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {job.benefits.map((b, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center gap-2">
                <span className="text-emerald-400">✦</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-md w-full bg-slate-900 border border-violet-500/40 rounded-2xl p-6 shadow-2xl text-left">
            <h3 className="text-lg font-bold text-white mb-2">Apply for {job.title}</h3>
            <p className="text-xs text-slate-400 mb-4">{job.company}</p>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Cover Note (Optional)</label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={e => setCoverNote(e.target.value)}
                  placeholder="Introduce yourself or highlight why your skills align..."
                  className="w-full bg-slate-950 rounded-xl border border-slate-800 p-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
