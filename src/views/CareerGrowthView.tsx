import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { CAREER_ROADMAPS } from '../data/mockData';

export const CareerGrowthView: React.FC = () => {
  const { addToast } = useApp();

  const [selectedRoadmapIndex, setSelectedRoadmapIndex] = useState(0);
  const activeRoadmap = CAREER_ROADMAPS[selectedRoadmapIndex];

  const [milestonesState, setMilestonesState] = useState(activeRoadmap.milestones);

  const toggleMilestone = (id: string) => {
    setMilestonesState(prev =>
      prev.map(m => {
        if (m.id === id) {
          const nextStatus = m.status === 'completed' ? 'in_progress' : 'completed';
          addToast({
            title: nextStatus === 'completed' ? 'Milestone Completed! 🎉' : 'Milestone In Progress',
            message: `Updated progress for "${m.title}".`,
            type: 'info',
          });
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
            Personalized Engineering Roadmaps
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Career Growth & Learning Roadmaps
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Bridge identified skill gaps with curated multi-week milestones, recommended architectures, and hands-on projects.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {CAREER_ROADMAPS.map((r, idx) => (
            <button
              key={r.id}
              onClick={() => {
                setSelectedRoadmapIndex(idx);
                setMilestonesState(CAREER_ROADMAPS[idx].milestones);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedRoadmapIndex === idx
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r.role.split(' ')[0]} Track
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-violet-400 bg-violet-950 px-2 py-0.5 rounded border border-violet-800">
                12-Week Specialization
              </span>
              <span className="text-xs text-slate-400 font-mono">High Market Demand</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">{activeRoadmap.role}</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {activeRoadmap.description}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 min-w-[200px]">
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Track Progress</span>
              <span className="text-violet-400 font-mono">{activeRoadmap.completionPercentage}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-cyan-400 rounded-full"
                style={{ width: `${activeRoadmap.completionPercentage}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-2">
              Estimated duration: {activeRoadmap.totalWeeks} Weeks
            </div>
          </div>
        </div>

        <div className="pt-8 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
            Interactive Progression Milestones
          </h3>

          <div className="space-y-4">
            {milestonesState.map((m, idx) => {
              const isCompleted = m.status === 'completed';
              const isInProgress = m.status === 'in_progress';
              const isLocked = m.status === 'locked';

              return (
                <div
                  key={m.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isCompleted
                      ? 'bg-slate-950/80 border-emerald-500/40'
                      : isInProgress
                      ? 'bg-violet-950/20 border-violet-500/50 shadow-lg shadow-violet-950/30'
                      : 'bg-slate-950/40 border-slate-800/80 opacity-70'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      onClick={() => !isLocked && toggleMilestone(m.id)}
                      disabled={isLocked}
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-colors ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isInProgress
                          ? 'bg-violet-600/30 border border-violet-500 text-violet-300'
                          : 'bg-slate-800 text-slate-600'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isLocked ? (
                        <Lock className="w-3.5 h-3.5" />
                      ) : (
                        <span className="text-xs font-bold font-mono">{idx + 1}</span>
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-white">{m.title}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {m.week}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {m.topics.map(t => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] text-slate-500 block">Curated Resource</span>
                      <span className="text-violet-300 font-medium text-xs">{m.resources[0]}</span>
                    </div>

                    {!isLocked && (
                      <button
                        onClick={() => toggleMilestone(m.id)}
                        className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
                          isCompleted
                            ? 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
                            : 'bg-violet-600 hover:bg-violet-500 text-white shadow-md'
                        }`}
                      >
                        {isCompleted ? 'Mark In Progress' : 'Mark Completed'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
