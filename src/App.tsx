import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { JudgeDemoBanner } from './components/JudgeDemoBanner';
import { ToastContainer } from './components/ToastContainer';
import { HomeView } from './views/HomeView';
import { JobsView } from './views/JobsView';
import { JobDetailView } from './views/JobDetailView';
import { CandidateDashboardView } from './views/CandidateDashboardView';
import { ResumeStudioView } from './views/ResumeStudioView';
import { CopilotView } from './views/CopilotView';
import { InterviewLabView } from './views/InterviewLabView';
import { RecruiterDashboardView } from './views/RecruiterDashboardView';
import { PlacementDashboardView } from './views/PlacementDashboardView';
import { CareerGrowthView } from './views/CareerGrowthView';
import { CompaniesView } from './views/CompaniesView';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen bg-[#080b14] text-slate-100 flex flex-col font-sans selection:bg-violet-900 selection:text-white">
      <JudgeDemoBanner />
      <Navbar />

      <main className="flex-1">
        {(activeView === 'home' || !activeView) && <HomeView />}
        {activeView === 'jobs' && <JobsView />}
        {activeView === 'job-detail' && <JobDetailView />}
        {activeView === 'candidate-dashboard' && <CandidateDashboardView />}
        {activeView === 'resume-studio' && <ResumeStudioView />}
        {activeView === 'copilot' && <CopilotView />}
        {activeView === 'interview-lab' && <InterviewLabView />}
        {activeView === 'recruiter-dashboard' && <RecruiterDashboardView />}
        {activeView === 'placement-dashboard' && <PlacementDashboardView />}
        {activeView === 'career-growth' && <CareerGrowthView />}
        {activeView === 'companies' && <CompaniesView />}
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-bold text-slate-200">NEXORA</span>
            <span>— Intelligent Career & Talent Platform</span>
          </div>
          <div className="text-slate-500">
            Powered by Explainable AI Matching & Gemini 3.8 Flash • Enterprise Edition
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
