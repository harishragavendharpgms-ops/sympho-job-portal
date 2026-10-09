import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  CandidateProfile,
  Job,
  Company,
  PlacementDrive,
  StudentProfile,
  Application,
  NotificationItem,
  ApplicationStatus,
} from '../types';
import {
  INITIAL_CANDIDATE_PROFILE,
  INITIAL_JOBS,
  INITIAL_COMPANIES,
  INITIAL_APPLICATIONS,
  INITIAL_PLACEMENT_DRIVES,
  INITIAL_STUDENTS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    headline: string;
    college?: string;
    organization?: string;
  };
  isDarkMode: boolean;
  toggleTheme: () => void;
  candidateProfile: CandidateProfile;
  updateCandidateProfile: (profile: Partial<CandidateProfile>) => void;
  jobs: Job[];
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  createJob: (jobData: Omit<Job, 'id' | 'postedDate' | 'applicantsCount'>) => void;
  applications: Application[];
  applyToJob: (job: Job, coverNote?: string) => boolean;
  updateApplicationStatus: (appId: string, status: ApplicationStatus, note?: string) => void;
  addRecruiterNote: (appId: string, note: string) => void;
  scheduleInterview: (
    appId: string,
    interviewData: { date: string; time: string; interviewer: string; stage: string; meetingLink: string }
  ) => void;
  companies: Company[];
  placementDrives: PlacementDrive[];
  students: StudentProfile[];
  createPlacementDrive: (driveData: Omit<PlacementDrive, 'id' | 'registeredCount' | 'shortlistedCount' | 'offersCount'>) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  resetDemoData: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
  selectedJobId: string | null;
  setSelectedJobId: (id: string | null) => void;
}

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // Ignore storage errors in restricted iframes
  }
}

function safeJsonParse<T>(key: string, fallback: T): T {
  try {
    const raw = safeGetItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch {
    return fallback;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (safeGetItem('nexora_role') as UserRole) || 'candidate';
  });

  const [activeView, setActiveView] = useState<string>('home');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = safeGetItem('nexora_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(() => {
    return safeJsonParse('nexora_candidate', INITIAL_CANDIDATE_PROFILE);
  });

  const [jobs, setJobs] = useState<Job[]>(() => {
    const list = safeJsonParse('nexora_jobs', INITIAL_JOBS);
    return Array.isArray(list) && list.length > 0 ? list : INITIAL_JOBS;
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    return safeJsonParse('nexora_saved_jobs', ['job-101', 'job-105']);
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    return safeJsonParse('nexora_apps', INITIAL_APPLICATIONS);
  });

  const [placementDrives, setPlacementDrives] = useState<PlacementDrive[]>(() => {
    return safeJsonParse('nexora_drives', INITIAL_PLACEMENT_DRIVES);
  });

  const [students, setStudents] = useState<StudentProfile[]>(() => {
    return safeJsonParse('nexora_students', INITIAL_STUDENTS);
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    return safeJsonParse('nexora_notifs', INITIAL_NOTIFICATIONS);
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    safeSetItem('nexora_role', role);
  }, [role]);

  useEffect(() => {
    safeSetItem('nexora_theme', isDarkMode ? 'dark' : 'light');
    try {
      if (typeof document !== 'undefined') {
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    } catch {
      // Ignore DOM theme errors
    }
  }, [isDarkMode]);

  useEffect(() => {
    safeSetItem('nexora_candidate', JSON.stringify(candidateProfile));
  }, [candidateProfile]);

  useEffect(() => {
    safeSetItem('nexora_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    safeSetItem('nexora_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    safeSetItem('nexora_apps', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    safeSetItem('nexora_drives', JSON.stringify(placementDrives));
  }, [placementDrives]);

  useEffect(() => {
    safeSetItem('nexora_notifs', JSON.stringify(notifications));
  }, [notifications]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    addToast({
      title: `Switched to ${newRole === 'candidate' ? 'Candidate' : newRole === 'recruiter' ? 'Recruiter' : 'Placement Officer'} Mode`,
      message: 'Workspace role updated with relevant permissions.',
      type: 'info',
    });
  };

  const user = {
    id: role === 'candidate' ? candidateProfile.id : role === 'recruiter' ? 'rec-001' : 'tpo-001',
    name:
      role === 'candidate'
        ? candidateProfile.name
        : role === 'recruiter'
        ? 'Elena Rostova'
        : 'Dr. K. S. Ramanathan',
    email:
      role === 'candidate'
        ? candidateProfile.email
        : role === 'recruiter'
        ? 'elena.rostova@nexuscore.ai'
        : 'ramanathan@apex.edu',
    avatar:
      role === 'candidate'
        ? candidateProfile.avatar
        : role === 'recruiter'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    headline:
      role === 'candidate'
        ? candidateProfile.headline
        : role === 'recruiter'
        ? 'Head of Talent & Technical Acquisition @ NexusCore AI'
        : 'Dean of Career Development & Placements @ Apex Institute of Tech',
    college: role === 'placement_officer' ? 'Apex Institute of Technology' : undefined,
    organization: role === 'recruiter' ? 'NexusCore AI Labs' : undefined,
  };

  const updateCandidateProfile = (updated: Partial<CandidateProfile>) => {
    setCandidateProfile(prev => ({ ...prev, ...updated }));
    addToast({
      title: 'Profile Saved',
      message: 'Candidate competencies and preferences updated.',
      type: 'success',
    });
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => {
      const exists = prev.includes(jobId);
      if (exists) {
        addToast({ title: 'Removed from Bookmarks', type: 'info' });
        return prev.filter(id => id !== jobId);
      } else {
        addToast({ title: 'Job Bookmarked', message: 'Saved to your candidate portal.', type: 'success' });
        return [...prev, jobId];
      }
    });
  };

  const createJob = (jobData: Omit<Job, 'id' | 'postedDate' | 'applicantsCount'>) => {
    const newJob: Job = {
      ...jobData,
      id: 'job-' + Date.now().toString().slice(-4),
      postedDate: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
    };
    setJobs(prev => [newJob, ...prev]);
    addToast({
      title: 'Job Published Successfully!',
      message: `"${newJob.title}" is now live on the NEXORA marketplace.`,
      type: 'success',
    });
  };

  const applyToJob = (job: Job, coverNote?: string): boolean => {
    const existing = applications.find(a => a.jobId === job.id && a.candidateId === candidateProfile.id);
    if (existing) {
      addToast({
        title: 'Already Applied',
        message: `You applied for ${job.title} on ${existing.appliedDate}.`,
        type: 'warning',
      });
      return false;
    }

    const newApp: Application = {
      id: 'app-' + Date.now().toString().slice(-4),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      companyLogo: job.companyLogo,
      candidateId: candidateProfile.id,
      candidateName: candidateProfile.name,
      candidateEmail: candidateProfile.email,
      candidateHeadline: candidateProfile.headline,
      candidateAvatar: candidateProfile.avatar,
      candidateLocation: candidateProfile.location,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'applied',
      matchScore: 89,
      coverNote: coverNote || 'Applied using verified NEXORA AI Profile.',
      notes: ['Candidate applied via 1-Click NEXORA profile.'],
      timeline: [
        {
          date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'applied',
          note: 'Application submitted successfully with verified credentials.',
        },
      ],
    };

    setApplications(prev => [newApp, ...prev]);
    setJobs(prev => prev.map(j => (j.id === job.id ? { ...j, applicantsCount: j.applicantsCount + 1 } : j)));

    addToast({
      title: 'Application Submitted! 🚀',
      message: `Your profile and AI resume have been sent to ${job.company}.`,
      type: 'success',
    });

    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      title: `Applied to ${job.title}`,
      message: `Your application is now under review with ${job.company}. Track updates in your dashboard.`,
      type: 'application',
      timestamp: 'Just now',
      read: false,
      link: 'applications',
    };
    setNotifications(prev => [newNotif, ...prev]);

    return true;
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus, note?: string) => {
    const timestamp = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setApplications(prev =>
      prev.map(app => {
        if (app.id !== appId) return app;
        const newTimeline = [
          ...app.timeline,
          {
            date: timestamp,
            status,
            note: note || `Candidate moved to ${status.replace('_', ' ').toUpperCase()}`,
          },
        ];
        return {
          ...app,
          status,
          notes: note ? [...app.notes, note] : app.notes,
          timeline: newTimeline,
        };
      })
    );

    addToast({
      title: `Status Updated to ${status.replace('_', ' ').toUpperCase()}`,
      message: note || 'Candidate pipeline state advanced.',
      type: 'success',
    });
  };

  const addRecruiterNote = (appId: string, note: string) => {
    setApplications(prev =>
      prev.map(app => (app.id === appId ? { ...app, notes: [...app.notes, note] } : app))
    );
    addToast({ title: 'Recruiter Note Saved', type: 'info' });
  };

  const scheduleInterview = (
    appId: string,
    interviewData: { date: string; time: string; interviewer: string; stage: string; meetingLink: string }
  ) => {
    const timestamp = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setApplications(prev =>
      prev.map(app => {
        if (app.id !== appId) return app;
        return {
          ...app,
          status: 'interview',
          interviewDetails: interviewData,
          timeline: [
            ...app.timeline,
            {
              date: timestamp,
              status: 'interview',
              note: `Interview confirmed: ${interviewData.stage} on ${interviewData.date} at ${interviewData.time}`,
            },
          ],
        };
      })
    );

    addToast({
      title: 'Interview Scheduled & Calendar Sync Sent! 📅',
      message: `Meeting details linked with ${interviewData.interviewer}.`,
      type: 'success',
    });
  };

  const createPlacementDrive = (
    driveData: Omit<PlacementDrive, 'id' | 'registeredCount' | 'shortlistedCount' | 'offersCount'>
  ) => {
    const newDrive: PlacementDrive = {
      ...driveData,
      id: 'drive-' + Date.now().toString().slice(-3),
      registeredCount: 0,
      shortlistedCount: 0,
      offersCount: 0,
    };
    setPlacementDrives(prev => [newDrive, ...prev]);
    addToast({
      title: 'Placement Drive Published! 🎓',
      message: `${newDrive.company} drive is now active for eligible university students.`,
      type: 'success',
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    addToast({ title: 'Notifications Cleared', type: 'info' });
  };

  const resetDemoData = () => {
    localStorage.removeItem('nexora_candidate');
    localStorage.removeItem('nexora_jobs');
    localStorage.removeItem('nexora_saved_jobs');
    localStorage.removeItem('nexora_apps');
    localStorage.removeItem('nexora_drives');
    localStorage.removeItem('nexora_students');
    localStorage.removeItem('nexora_notifs');

    setCandidateProfile(INITIAL_CANDIDATE_PROFILE);
    setJobs(INITIAL_JOBS);
    setSavedJobIds(['job-101', 'job-105']);
    setApplications(INITIAL_APPLICATIONS);
    setPlacementDrives(INITIAL_PLACEMENT_DRIVES);
    setStudents(INITIAL_STUDENTS);
    setNotifications(INITIAL_NOTIFICATIONS);

    addToast({
      title: 'Pristine Demo Data Restored! ✨',
      message: 'All profiles, sample applications, and drives have been reset for judging.',
      type: 'success',
    });
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        user,
        isDarkMode,
        toggleTheme,
        candidateProfile,
        updateCandidateProfile,
        jobs,
        savedJobIds,
        toggleSaveJob,
        createJob,
        applications,
        applyToJob,
        updateApplicationStatus,
        addRecruiterNote,
        scheduleInterview,
        companies: INITIAL_COMPANIES,
        placementDrives,
        students,
        createPlacementDrive,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        toasts,
        addToast,
        removeToast,
        resetDemoData,
        activeView,
        setActiveView,
        selectedJobId,
        setSelectedJobId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
