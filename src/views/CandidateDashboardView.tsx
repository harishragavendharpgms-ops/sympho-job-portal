import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Briefcase,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
  Bookmark,
  FileText,
  ExternalLink,
  Plus,
  Trash2,
  Edit3,
  Award,
  Video,
  ChevronRight,
  MapPin,
  TrendingUp,
  BrainCircuit,
  Save,
} from 'lucide-react';
import { calculateJobMatch } from '../utils/matchingEngine';

export const CandidateDashboardView: React.FC = () => {
  const {
    candidateProfile,
    updateCandidateProfile,
    applications,
    jobs,
    savedJobIds,
    toggleSaveJob,
    setActiveView,
    setSelectedJobId,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'profile' | 'saved'>('overview');

  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(candidateProfile);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Advanced');

  const myApplications = applications.filter(a => a.candidateId === candidateProfile.id);
  const mySavedJobs = jobs.filter(j => savedJobIds.includes(j.id));

  const recommendedJobs = jobs
    .map(job => ({ ...job, match: calculateJobMatch(candidateProfile, job) }))
    .sort((a, b) => b.match.overallScore - a.match.overallScore)
    .slice(0, 3);

  const calculateCompletion = () => {
    let score = 50;
    if (candidateProfile.skills.length >= 6) score += 15;
    if (candidateProfile.experience.length >= 1) score += 15;
    if (candidateProfile.projects.length >= 1) score += 10;
    if (candidateProfile.resume.text) score += 10;
    return Math.min(100, score);
  };

  const completionPercentage = calculateCompletion();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidateProfile(profileForm);
    setEditingProfile(false);
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const updatedSkills = [
      ...profileForm.skills,
      { name: newSkillName.trim(), level: newSkillLevel, category: 'Framework' as const },
    ];
    setProfileForm({ ...profileForm, skills: updatedSkills });
    setNewSkillName('');
  };

  const handleRemoveSkill = (skillName: string) => {
    setProfileForm({
      ...profileForm,
      skills: profileForm.skills.filter(s => s.name !== skillName),
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-950/70 via-slate-900 to-indigo-950/70 border border-violet-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={candidateProfile.avatar}
              alt={candidateProfile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-violet-500/50 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{candidateProfile.name}</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-600/30 text-violet-300 border border-violet-500/40">
                  Verified Engineer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 max-w-xl">{candidateProfile.headline}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {candidateProfile.location}
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Target: {candidateProfile.targetRole}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-left min-w-[200px]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-300">Profile Health</span>
              <span className="text-cyan-400 font-mono">{completionPercentage}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
              <span>ATS Parseability: 94%</span>
              <button
                onClick={() => setActiveView('resume-studio')}
                className="text-violet-400 hover:text-violet-300 font-medium cursor-pointer"
              >
                Scan ATS →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs sm:text-sm font-semibold">
        {[
          { key: 'overview', label: 'Dashboard Overview' },
          { key: 'applications', label: `My Applications (${myApplications.length})` },
          { key: 'saved', label: `Saved Roles (${mySavedJobs.length})` },
          { key: 'profile', label: 'Manage Profile & Competencies' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === tab.key
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Active Applications</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
                {myApplications.length}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1">2 under review</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Scheduled Interviews</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mt-1 font-mono">
                {myApplications.filter(a => a.status === 'interview' || a.interviewDetails).length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Round 1 Technical upcoming</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Avg Compatibility</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-violet-400 mt-1 font-mono">
                89.4%
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Top 5% of applicant pool</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Resume Health</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
                88/100
              </div>
              <div className="text-[11px] text-slate-400 mt-1">ATS-Verified Clean</div>
            </div>
          </div>

          {/* Active Interview Alert */}
          {myApplications.some(a => a.interviewDetails) && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/60 to-slate-900 border border-violet-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-violet-600/30 text-violet-300 border border-violet-500/40">
                  <Video className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-violet-300">
                    Upcoming Interview Confirmed
                  </span>
                  <h3 className="font-bold text-white text-base">
                    NexusCore AI Labs • Round 1: System Architecture & Agent Workflow
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Oct 14, 2026 at 15:00 IST • Interviewer: Elena Rostova (Head of Talent & Engineering)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView('interview-lab')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Practice in Interview Lab
                </button>
                <a
                  href="https://meet.google.com/nex-arch-demo"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-violet-600/30 cursor-pointer"
                >
                  <span>Join Meeting</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* AI Recommended Jobs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Recommended Opportunities</h3>
                <p className="text-xs text-slate-400">Scored automatically against your verified skills</p>
              </div>
              <button
                onClick={() => setActiveView('jobs')}
                className="text-xs text-violet-400 hover:text-violet-300 font-semibold cursor-pointer"
              >
                Browse All Marketplace →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedJobs.map(job => (
                <div
                  key={job.id}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-violet-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <img src={job.companyLogo} alt={job.company} className="w-10 h-10 rounded-xl object-cover" />
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-violet-950 border border-violet-500/30 text-violet-300">
                        {job.match.overallScore}% Fit
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-white">{job.title}</h4>
                    <div className="text-xs text-slate-400 mt-0.5">{job.company}</div>
                    <div className="text-xs text-emerald-400 font-medium mt-2">{job.salaryRange.split('/')[0]}</div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">{job.location}</span>
                    <button
                      onClick={() => {
                        setSelectedJobId(job.id);
                        setActiveView('job-detail');
                      }}
                      className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inspect Match</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPLICATIONS TRACKER */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Submitted Applications ({myApplications.length})</h3>
            <span className="text-xs text-slate-400">Live Stage Tracker with Recruiter Notes</span>
          </div>

          {myApplications.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
              <FileText className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <h4 className="font-bold text-white text-sm">No applications submitted yet</h4>
              <button
                onClick={() => setActiveView('jobs')}
                className="mt-3 px-4 py-2 rounded-xl bg-violet-600 text-white font-semibold text-xs cursor-pointer"
              >
                Explore Marketplace
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myApplications.map(app => {
                const stages = ['applied', 'under_review', 'shortlisted', 'interview', 'offer'];
                const currentIdx = stages.indexOf(app.status);

                return (
                  <div
                    key={app.id}
                    className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.companyLogo}
                          alt={app.company}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                        />
                        <div>
                          <h4 className="font-bold text-base text-white">{app.jobTitle}</h4>
                          <div className="text-xs text-slate-400">{app.company} • Applied on {app.appliedDate}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-violet-950 border border-violet-500/40 text-violet-300">
                          {app.matchScore}% Match
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-200 capitalize">
                          {app.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="py-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                        {stages.map((stage, idx) => (
                          <span
                            key={stage}
                            className={`capitalize ${
                              idx <= currentIdx ? 'text-violet-300 font-bold' : 'text-slate-600'
                            }`}
                          >
                            {stage.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex">
                        {stages.map((stage, idx) => (
                          <div
                            key={stage}
                            className={`h-full flex-1 transition-all border-r border-slate-950 ${
                              idx <= currentIdx ? 'bg-gradient-to-r from-violet-600 to-cyan-500' : 'bg-slate-800'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="text-xs space-y-1.5 pt-2">
                      <span className="font-semibold text-slate-300">Activity Timeline:</span>
                      {app.timeline.map((event, i) => (
                        <div key={i} className="flex items-start gap-2 text-slate-400 text-[11px]">
                          <span className="text-violet-400">●</span>
                          <span className="font-mono text-slate-500">{event.date}:</span>
                          <span className="text-slate-300">{event.note || `Stage set to ${event.status}`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SAVED JOBS */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Bookmarked Opportunities ({mySavedJobs.length})</h3>

          {mySavedJobs.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
              <Bookmark className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <h4 className="font-bold text-white text-sm">No saved jobs</h4>
              <p className="text-xs text-slate-400 mt-1">Bookmark roles during search to review them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mySavedJobs.map(job => (
                <div
                  key={job.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <img src={job.companyLogo} alt={job.company} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{job.title}</h4>
                      <div className="text-xs text-slate-400">{job.company} • {job.location}</div>
                      <div className="text-xs text-emerald-400 font-medium mt-1">{job.salaryRange}</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className="text-slate-400 hover:text-rose-400 text-xs cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedJobId(job.id);
                        setActiveView('job-detail');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs cursor-pointer"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: MANAGE PROFILE */}
      {activeTab === 'profile' && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">Candidate Competency & Career Profile</h3>
              <p className="text-xs text-slate-400">Used by the Explainable Matching Engine to score opportunities.</p>
            </div>
            {!editingProfile ? (
              <button
                onClick={() => setEditingProfile(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-lg"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            )}
          </div>

          {editingProfile ? (
            <form onSubmit={handleSaveProfile} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Professional Headline</label>
                  <input
                    type="text"
                    value={profileForm.headline}
                    onChange={e => setProfileForm({ ...profileForm, headline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Role Title</label>
                  <input
                    type="text"
                    value={profileForm.targetRole}
                    onChange={e => setProfileForm({ ...profileForm, targetRole: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <label className="block text-slate-300 font-semibold mb-2">Verified Competencies & Skills</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {profileForm.skills.map(s => (
                    <span
                      key={s.name}
                      className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5"
                    >
                      <span>{s.name} ({s.level})</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(s.name)}
                        className="text-slate-400 hover:text-rose-400 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 max-w-md">
                  <input
                    type="text"
                    placeholder="Add skill (e.g. GraphQL, Kubernetes)..."
                    value={newSkillName}
                    onChange={e => setNewSkillName(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                  />
                  <select
                    value={newSkillLevel}
                    onChange={e => setNewSkillLevel(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-2 rounded-xl bg-violet-600 text-white font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProfile(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 text-xs sm:text-sm text-slate-300">
              <div>
                <h4 className="font-bold text-white mb-2">Technical Skills & Proficiencies</h4>
                <div className="flex flex-wrap gap-2">
                  {candidateProfile.skills.map(s => (
                    <span
                      key={s.name}
                      className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                    >
                      <strong className="text-violet-300">{s.name}</strong> • {s.level}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">Work Experience & Track Record</h4>
                <div className="space-y-3">
                  {candidateProfile.experience.map(exp => (
                    <div key={exp.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between font-bold text-white text-sm">
                        <span>{exp.title} • {exp.company}</span>
                        <span className="text-slate-400 text-xs">{exp.startDate} to {exp.endDate}</span>
                      </div>
                      <p className="text-slate-400 mt-1">{exp.description}</p>
                      <ul className="mt-2 space-y-1 list-disc list-inside text-slate-300">
                        {exp.achievements.map((ach, i) => (
                          <li key={i}>{ach}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">Projects & Open Source Repositories</h4>
                <div className="space-y-3">
                  {candidateProfile.projects.map(proj => (
                    <div key={proj.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between font-bold text-white text-sm">
                        <span>{proj.title}</span>
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-violet-400 flex items-center gap-1">
                            <span>Live Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-slate-400 mt-1">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.techStack.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
