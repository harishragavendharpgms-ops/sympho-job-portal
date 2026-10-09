import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Sparkles,
  Building2,
  TrendingUp,
  GraduationCap,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  MessageSquare,
  Award,
  Layers,
  ChevronDown,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    user,
    activeView,
    setActiveView,
    isDarkMode,
    toggleTheme,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [studioDropdownOpen, setStudioDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navigateTo = (view: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    setStudioDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-violet-200 transition-colors">
                  NEXORA
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 tracking-wider uppercase">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5 tracking-wider hidden sm:block font-medium">
                Intelligent Career Ecosystem
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => navigateTo('jobs')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeView === 'jobs'
                  ? 'text-violet-300 bg-violet-950/50 border border-violet-800/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Compass className="w-4 h-4 text-violet-400" />
              Explore Jobs
            </button>

            {/* AI Career Studio Dropdown */}
            <div className="relative">
              <button
                onClick={() => setStudioDropdownOpen(!studioDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  ['resume-studio', 'copilot', 'interview-lab'].includes(activeView)
                    ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-800/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                AI Career Studio
                <ChevronDown className="w-3.5 h-3.5 opacity-60 ml-0.5" />
              </button>

              {studioDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-64 rounded-xl bg-slate-900 border border-slate-700/80 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => navigateTo('resume-studio')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/70 transition-colors text-left cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-white">Resume Intelligence Studio</div>
                      <div className="text-[11px] text-slate-400">ATS health score & bullet rewriter</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateTo('copilot')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/70 transition-colors text-left cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-white">AI Career Copilot</div>
                      <div className="text-[11px] text-slate-400">Personalized advisor & strategy</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateTo('interview-lab')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/70 transition-colors text-left cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-white">Interview Lab & Coding</div>
                      <div className="text-[11px] text-slate-400">STAR simulation & code sandbox</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('companies')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeView === 'companies'
                  ? 'text-violet-300 bg-violet-950/50 border border-violet-800/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Building2 className="w-4 h-4 text-slate-400" />
              Companies
            </button>

            <button
              onClick={() => navigateTo('career-growth')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeView === 'career-growth'
                  ? 'text-violet-300 bg-violet-950/50 border border-violet-800/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Roadmaps
            </button>

            <button
              onClick={() => navigateTo('placement-dashboard')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeView === 'placement-dashboard'
                  ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-800/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              Campus Placements
            </button>
          </nav>
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              if (role === 'candidate') navigateTo('candidate-dashboard');
              else if (role === 'recruiter') navigateTo('recruiter-dashboard');
              else navigateTo('placement-dashboard');
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/30 hover:border-violet-400/50 text-xs font-semibold text-violet-200 hover:text-white transition-all shadow-sm cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            {role === 'candidate' ? 'Candidate Hub' : role === 'recruiter' ? 'Recruiter Hub' : 'TPO Portal'}
          </button>

          <button
            onClick={toggleTheme}
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-violet-500 ring-2 ring-slate-950 animate-pulse" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-slate-900 border border-slate-700/80 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5 font-semibold text-xs text-white">
                    <Bell className="w-3.5 h-3.5 text-violet-400" />
                    Activity Alerts ({notifications.length})
                  </div>
                  <button
                    onClick={clearAllNotifications}
                    className="text-[11px] text-slate-400 hover:text-violet-300 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-xs text-slate-500">No new alerts</div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationAsRead(n.id);
                          if (n.link === 'applications') navigateTo('candidate-dashboard');
                          else if (n.link === 'jobs') navigateTo('jobs');
                          else if (n.link === 'placement') navigateTo('placement-dashboard');
                          setNotificationsOpen(false);
                        }}
                        className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                          n.read
                            ? 'bg-slate-900/60 border-slate-800/60 text-slate-400'
                            : 'bg-violet-950/20 border-violet-800/30 text-slate-200 hover:bg-violet-950/30'
                        }`}
                      >
                        <div className="flex items-center justify-between font-medium text-slate-100">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-500 font-normal">{n.timestamp}</span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-300 leading-snug">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-violet-500/40 ring-1 ring-violet-500/20"
            />
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-white leading-tight truncate max-w-[120px]">{user.name}</div>
              <div className="text-[10px] text-violet-400 font-medium capitalize">{role.replace('_', ' ')}</div>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => navigateTo('home')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900 cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('jobs')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900 flex items-center justify-between cursor-pointer"
          >
            Explore Jobs
            <span className="text-xs text-violet-400 font-semibold">Active</span>
          </button>
          <button
            onClick={() => navigateTo('resume-studio')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900 cursor-pointer"
          >
            AI Resume Intelligence Studio
          </button>
          <button
            onClick={() => navigateTo('copilot')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900 cursor-pointer"
          >
            AI Career Copilot
          </button>
          <button
            onClick={() => navigateTo('interview-lab')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900 cursor-pointer"
          >
            Interview Lab & Coding Assessment
          </button>
          <button
            onClick={() => navigateTo('career-growth')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900 cursor-pointer"
          >
            Career Roadmaps
          </button>
          <button
            onClick={() => navigateTo('placement-dashboard')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900 cursor-pointer"
          >
            College Placement (TPO)
          </button>
          <button
            onClick={() => navigateTo('companies')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900 cursor-pointer"
          >
            Companies Showcase
          </button>

          <div className="pt-3 border-t border-slate-800">
            <div className="text-xs text-slate-400 mb-2 font-medium">Switch Active Role:</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setRole('candidate');
                  navigateTo('candidate-dashboard');
                }}
                className={`py-1.5 px-2 rounded text-xs font-semibold cursor-pointer ${
                  role === 'candidate' ? 'bg-violet-600 text-white' : 'bg-slate-900 text-slate-300'
                }`}
              >
                Candidate
              </button>
              <button
                onClick={() => {
                  setRole('recruiter');
                  navigateTo('recruiter-dashboard');
                }}
                className={`py-1.5 px-2 rounded text-xs font-semibold cursor-pointer ${
                  role === 'recruiter' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300'
                }`}
              >
                Recruiter
              </button>
              <button
                onClick={() => {
                  setRole('placement_officer');
                  navigateTo('placement-dashboard');
                }}
                className={`py-1.5 px-2 rounded text-xs font-semibold cursor-pointer ${
                  role === 'placement_officer' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300'
                }`}
              >
                Placement TPO
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
