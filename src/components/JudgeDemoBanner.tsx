import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, RefreshCw, UserCheck, Briefcase, GraduationCap, X, ChevronDown, ChevronUp } from 'lucide-react';

export const JudgeDemoBanner: React.FC = () => {
  const { role, setRole, resetDemoData, setActiveView } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-violet-950/90 via-indigo-950/90 to-slate-950/90 border-b border-violet-500/30 text-white backdrop-blur-md px-4 py-2.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-600/30 border border-violet-400/30 text-violet-300 font-semibold uppercase tracking-wider text-[11px]">
            <Sparkles className="w-3 h-3 text-violet-400 animate-pulse" />
            Judges Competition Demo Mode
          </span>
          <span className="text-slate-300 hidden md:inline">
            Active Role: <strong className="text-violet-300 capitalize">{role.replace('_', ' ')}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-900/80 p-0.5 rounded-lg border border-slate-700/60">
            <button
              onClick={() => {
                setRole('candidate');
                setActiveView('candidate-dashboard');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                role === 'candidate'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Candidate
            </button>
            <button
              onClick={() => {
                setRole('recruiter');
                setActiveView('recruiter-dashboard');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                role === 'recruiter'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Recruiter
            </button>
            <button
              onClick={() => {
                setRole('placement_officer');
                setActiveView('placement-dashboard');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                role === 'placement_officer'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Placement TPO
            </button>
          </div>

          <button
            onClick={resetDemoData}
            title="Reset all demo data to pristine initial state"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-medium cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-violet-900/40 hover:bg-violet-800/40 border border-violet-700/50 text-violet-200 text-xs font-medium cursor-pointer"
          >
            Guide
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-slate-200 p-1 cursor-pointer"
            title="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-violet-500/20 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300 animate-in fade-in duration-200">
          <div className="bg-slate-900/90 p-3 rounded-lg border border-violet-500/20">
            <h4 className="font-semibold text-violet-300 flex items-center gap-1.5 mb-1.5">
              <UserCheck className="w-3.5 h-3.5 text-violet-400" /> 1. Candidate Evaluation Flow
            </h4>
            <ol className="space-y-1 list-decimal list-inside text-slate-400">
              <li>Navigate to <span className="text-white">Explore Jobs</span> & open a listing</li>
              <li>Inspect <span className="text-white">Explainable AI Match</span> radar breakdown</li>
              <li>Run <span className="text-white">AI Resume Intelligence</span> scan & ATS review</li>
              <li>Practice in <span className="text-white">Interview Lab</span> with STAR feedback</li>
            </ol>
            <button
              onClick={() => {
                setRole('candidate');
                setActiveView('jobs');
              }}
              className="mt-2 text-violet-400 hover:text-violet-300 underline font-medium text-[11px] block"
            >
              Start Candidate Workflow →
            </button>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-lg border border-indigo-500/20">
            <h4 className="font-semibold text-indigo-300 flex items-center gap-1.5 mb-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" /> 2. Recruiter Enterprise Pipeline
            </h4>
            <ol className="space-y-1 list-decimal list-inside text-slate-400">
              <li>Open <span className="text-white">Recruiter Workspace</span> board</li>
              <li>Review applicants & inspect calculated compatibility</li>
              <li>Advance candidate through pipeline (Shortlist → Interview)</li>
              <li>Schedule Google Meet interview or post new job</li>
            </ol>
            <button
              onClick={() => {
                setRole('recruiter');
                setActiveView('recruiter-dashboard');
              }}
              className="mt-2 text-indigo-400 hover:text-indigo-300 underline font-medium text-[11px] block"
            >
              Start Recruiter Workflow →
            </button>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-lg border border-cyan-500/20">
            <h4 className="font-semibold text-cyan-300 flex items-center gap-1.5 mb-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> 3. University TPO Placement Module
            </h4>
            <ol className="space-y-1 list-decimal list-inside text-slate-400">
              <li>Open <span className="text-white">College Placement</span> dashboard</li>
              <li>Filter 2026 batch by CGPA threshold & active backlogs</li>
              <li>Review campus drive eligibility & batch skill gaps</li>
              <li>Export student rosters & manage placement status</li>
            </ol>
            <button
              onClick={() => {
                setRole('placement_officer');
                setActiveView('placement-dashboard');
              }}
              className="mt-2 text-cyan-400 hover:text-cyan-300 underline font-medium text-[11px] block"
            >
              Start University TPO Workflow →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
