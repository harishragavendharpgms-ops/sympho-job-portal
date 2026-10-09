import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Briefcase,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
  Plus,
  Video,
  X,
} from 'lucide-react';
import { ApplicationStatus, Application } from '../types';

export const RecruiterDashboardView: React.FC = () => {
  const {
    jobs,
    applications,
    updateApplicationStatus,
    addRecruiterNote,
    scheduleInterview,
    createJob,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pipeline' | 'jobs' | 'analytics'>('pipeline');
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<Application | null>(null);

  const [noteInput, setNoteInput] = useState('');

  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [interviewData, setInterviewData] = useState({
    date: '2026-10-16',
    time: '14:00 IST',
    interviewer: 'Elena Rostova (Hiring Lead)',
    stage: 'Round 1: System Design & Architecture',
    meetingLink: 'https://meet.google.com/nex-recruiter-call',
  });

  const [postJobModalOpen, setPostJobModalOpen] = useState(false);
  const [newJobForm, setNewJobForm] = useState({
    title: '',
    company: 'NexusCore AI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    companyTier: 'AI Unicorn' as const,
    location: 'Bengaluru, India',
    workArrangement: 'hybrid' as const,
    employmentType: 'Full-time' as const,
    salaryRange: '₹30,00,000 - ₹45,00,000 / yr',
    minSalary: 3000000,
    maxSalary: 4500000,
    experienceLevel: 'Mid-Level' as const,
    experienceYearsMin: 2,
    department: 'Core AI Platforms',
    deadline: '2026-11-30',
    description: '',
    responsibilities: [
      'Architect resilient microservices and distributed data pipelines.',
      'Collaborate with product designers to ship intuitive AI workflows.',
      'Maintain rigorous unit and integration test coverage across deployments.',
    ],
    requiredSkills: ['TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    preferredSkills: ['Redis', 'Vector DBs', 'Kubernetes'],
    benefits: ['Competitive Equity Grants', 'Health Cover', 'Annual Learning Allowance'],
    status: 'active' as const,
  });

  const filteredApplications = applications.filter(app => {
    if (selectedJobFilter !== 'all' && app.jobId !== selectedJobFilter) {
      return false;
    }
    return true;
  });

  const pipelineStages: { key: ApplicationStatus; label: string; color: string }[] = [
    { key: 'applied', label: 'Applied', color: 'border-slate-700 bg-slate-900/60' },
    { key: 'under_review', label: 'Under Review', color: 'border-amber-500/40 bg-amber-950/20' },
    { key: 'shortlisted', label: 'Shortlisted', color: 'border-indigo-500/40 bg-indigo-950/20' },
    { key: 'interview', label: 'Interview Scheduled', color: 'border-violet-500/40 bg-violet-950/20' },
    { key: 'offer', label: 'Offer Released', color: 'border-emerald-500/40 bg-emerald-950/20' },
  ];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate || !noteInput.trim()) return;
    addRecruiterNote(selectedCandidate.id, noteInput.trim());
    setSelectedCandidate({
      ...selectedCandidate,
      notes: [...selectedCandidate.notes, noteInput.trim()],
    });
    setNoteInput('');
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate) return;
    scheduleInterview(selectedCandidate.id, interviewData);
    setInterviewModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobForm.title) return;
    createJob(newJobForm);
    setPostJobModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
              alt="Elena Rostova"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Elena Rostova</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600/30 text-indigo-300 border border-indigo-500/40">
                  Talent Acquisition Lead
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">NexusCore AI Labs • Enterprise Recruitment Portal</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                <span>Active Openings: {jobs.length}</span>
                <span>•</span>
                <span>Total Applications: {applications.length}</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Offers Released: 1</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPostJobModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Opportunity</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'pipeline'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          Applicant Pipeline Kanban
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'jobs'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          Manage Listings ({jobs.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          Recruitment Funnel Analytics
        </button>
      </div>

      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold">Filter by Role:</span>
              <select
                value={selectedJobFilter}
                onChange={e => setSelectedJobFilter(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="all">All Active Positions</option>
                {jobs.map(j => (
                  <option key={j.id} value={j.id}>
                    {j.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs text-slate-400">
              Showing {filteredApplications.length} candidate applications
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {pipelineStages.map(stage => {
              const stageApps = filteredApplications.filter(a => a.status === stage.key);
              return (
                <div
                  key={stage.key}
                  className={`rounded-2xl border p-4 space-y-3 min-w-[220px] ${stage.color}`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-xs text-white">{stage.label}</span>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-slate-300">
                      {stageApps.length}
                    </span>
                  </div>

                  <div className="space-y-3 min-h-[300px]">
                    {stageApps.map(app => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedCandidate(app)}
                        className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer shadow-md space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <img
                            src={app.candidateAvatar}
                            alt={app.candidateName}
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-violet-950 border border-violet-500/30 text-violet-300">
                            {app.matchScore}% Match
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-xs text-white leading-tight">{app.candidateName}</h4>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{app.jobTitle}</p>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[10px] text-slate-500">
                          <span>{app.appliedDate}</span>
                          <span className="text-indigo-400 font-semibold">Inspect →</span>
                        </div>
                      </div>
                    ))}

                    {stageApps.length === 0 && (
                      <div className="text-center py-12 text-[11px] text-slate-600">
                        No candidates in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Active Corporate Postings ({jobs.length})</h3>
            <button
              onClick={() => setPostJobModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs cursor-pointer"
            >
              + Create Listing
            </button>
          </div>

          <div className="space-y-3">
            {jobs.map(job => (
              <div
                key={job.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-white">{job.title}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
                      {job.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex flex-wrap gap-2">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location} ({job.workArrangement})</span>
                    <span>•</span>
                    <span className="text-emerald-400">{job.salaryRange}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <div className="text-white font-mono font-bold text-sm">{job.applicantsCount}</div>
                    <div className="text-slate-500 text-[10px]">Applicants</div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedJobFilter(job.id);
                      setActiveTab('pipeline');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs cursor-pointer"
                  >
                    View Pipeline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="font-bold text-base text-white">Recruitment Funnel Conversion</h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Applications Received (100%)</span>
                  <span className="font-bold text-white">{applications.length} candidates</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-600 rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Screened & Reviewed (75%)</span>
                  <span className="font-bold text-amber-400">3 candidates</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-3/4" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Shortlisted for Technical Rounds (50%)</span>
                  <span className="font-bold text-indigo-400">2 candidates</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-1/2" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Offers Extended (25%)</span>
                  <span className="font-bold text-emerald-400">1 candidate</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-1/4" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="font-bold text-base text-white">AI Matching Quality Metrics</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[11px]">Avg Match Accuracy</div>
                <div className="text-2xl font-bold text-violet-400 font-mono mt-1">91.2%</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Skills + Project alignment</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[11px]">Time to Shortlist</div>
                <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">1.4 Days</div>
                <div className="text-[10px] text-slate-500 mt-0.5">60% faster than manual</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="max-w-2xl w-full rounded-2xl bg-slate-900 border border-indigo-500/40 p-6 shadow-2xl relative text-left max-h-[90vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 pb-4 border-b border-slate-800">
              <img
                src={selectedCandidate.candidateAvatar}
                alt={selectedCandidate.candidateName}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-700"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-lg text-white">{selectedCandidate.candidateName}</h3>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-violet-950 border border-violet-500/40 text-violet-300">
                    {selectedCandidate.matchScore}% Match
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{selectedCandidate.candidateHeadline}</p>
                <div className="text-[11px] text-slate-400 mt-1">
                  Target: {selectedCandidate.jobTitle} • {selectedCandidate.candidateLocation}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Advance Pipeline Status:</label>
              <div className="flex flex-wrap gap-2 text-xs">
                {(['applied', 'under_review', 'shortlisted', 'interview', 'offer', 'hired', 'rejected'] as ApplicationStatus[]).map(st => (
                  <button
                    key={st}
                    onClick={() => {
                      updateApplicationStatus(selectedCandidate.id, st);
                      setSelectedCandidate({ ...selectedCandidate, status: st });
                    }}
                    className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                      selectedCandidate.status === st
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-white block">Recruiter Evaluation Notes:</span>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {selectedCandidate.notes.map((note, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                    {note}
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add evaluation note..."
                  value={noteInput}
                  onChange={e => setNoteInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl cursor-pointer">
                  Add Note
                </button>
              </form>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={() => setInterviewModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Schedule Video Interview</span>
              </button>

              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {interviewModalOpen && selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-md w-full bg-slate-900 border border-violet-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <h3 className="font-bold text-base text-white">
              Schedule Interview with {selectedCandidate.candidateName}
            </h3>

            <form onSubmit={handleScheduleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Interview Stage</label>
                <input
                  type="text"
                  value={interviewData.stage}
                  onChange={e => setInterviewData({ ...interviewData, stage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={interviewData.date}
                    onChange={e => setInterviewData({ ...interviewData, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Time</label>
                  <input
                    type="text"
                    value={interviewData.time}
                    onChange={e => setInterviewData({ ...interviewData, time: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Interviewer</label>
                <input
                  type="text"
                  value={interviewData.interviewer}
                  onChange={e => setInterviewData({ ...interviewData, interviewer: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Video Meeting Link</label>
                <input
                  type="text"
                  value={interviewData.meetingLink}
                  onChange={e => setInterviewData({ ...interviewData, meetingLink: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setInterviewModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl cursor-pointer"
                >
                  Confirm & Sync Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {postJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-xl w-full bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-left max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg text-white">Create New Corporate Job Listing</h3>

            <form onSubmit={handleCreateJobSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Machine Learning Platform Architect"
                  value={newJobForm.title}
                  onChange={e => setNewJobForm({ ...newJobForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Work Arrangement</label>
                  <select
                    value={newJobForm.workArrangement}
                    onChange={e => setNewJobForm({ ...newJobForm, workArrangement: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="hybrid">Hybrid</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">On-Site</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Annual Compensation</label>
                  <input
                    type="text"
                    value={newJobForm.salaryRange}
                    onChange={e => setNewJobForm({ ...newJobForm, salaryRange: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Job Description</label>
                <textarea
                  rows={4}
                  value={newJobForm.description}
                  onChange={e => setNewJobForm({ ...newJobForm, description: e.target.value })}
                  placeholder="Outline squad responsibilities, system scale, and technologies..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPostJobModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl cursor-pointer"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
