export type UserRole = 'candidate' | 'recruiter' | 'placement_officer';

export type WorkArrangement = 'remote' | 'hybrid' | 'onsite' | 'any';
export type EmploymentType = 'Full-time' | 'Internship' | 'Contract' | 'Part-time';
export type ExperienceLevel = 'Entry-Level' | 'Mid-Level' | 'Senior' | 'Lead' | 'Executive';

export interface SkillItem {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category?: 'Language' | 'Framework' | 'Cloud & DevOps' | 'AI & Data' | 'Tools & DB';
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  startYear: string;
  graduationYear: string;
  cgpa: number;
  maxCgpa: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  metrics?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  headline: string;
  bio: string;
  avatar: string;
  location: string;
  targetRole: string;
  expectedSalary: string;
  workArrangement: WorkArrangement;
  preferredLocations: string[];
  skills: SkillItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  resume: {
    fileName: string;
    uploadDate: string;
    fileSize: string;
    text: string;
  };
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  companyTier: 'Tier-1 Tech' | 'AI Unicorn' | 'High-Growth Startup' | 'Enterprise';
  location: string;
  workArrangement: WorkArrangement;
  employmentType: EmploymentType;
  salaryRange: string;
  minSalary: number;
  maxSalary: number;
  experienceLevel: ExperienceLevel;
  experienceYearsMin: number;
  department: string;
  postedDate: string;
  deadline: string;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  minimumCgpa?: number;
  eligibleDegrees?: string[];
  benefits: string[];
  applicantsCount: number;
  status: 'active' | 'paused' | 'closed';
  recruiterId?: string;
}

export interface MatchBreakdown {
  overallScore: number;
  requiredSkillsScore: number;
  preferredSkillsScore: number;
  projectRelevanceScore: number;
  experienceFitScore: number;
  preferenceScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  partialSkills: string[];
  rationale: string;
  suggestions: string[];
  radarData: {
    subject: string;
    score: number;
    benchmark: number;
  }[];
}

export type ApplicationStatus =
  | 'applied'
  | 'under_review'
  | 'shortlisted'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'rejected';

export interface ApplicationTimelineEvent {
  date: string;
  status: ApplicationStatus;
  note?: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidateHeadline: string;
  candidateAvatar: string;
  candidateLocation: string;
  appliedDate: string;
  status: ApplicationStatus;
  matchScore: number;
  matchBreakdown?: MatchBreakdown;
  coverNote?: string;
  notes: string[];
  timeline: ApplicationTimelineEvent[];
  interviewDetails?: {
    date: string;
    time: string;
    interviewer: string;
    stage: string;
    meetingLink: string;
  };
}

export interface ResumeAnalysisResult {
  overallScore: number;
  categoryScores: {
    atsFormatting: number;
    impactVerbs: number;
    technicalSkills: number;
    quantifiableMetrics: number;
    structureCompleteness: number;
  };
  summary: string;
  detectedSkills: string[];
  missingKeywords: string[];
  strengths: string[];
  criticalImprovements: string[];
  bulletTransformations: {
    original: string;
    improved: string;
    reasoning: string;
  }[];
  isAiPowered?: boolean;
  source?: string;
}

export interface PlacementDrive {
  id: string;
  company: string;
  companyLogo: string;
  role: string;
  packageLPA: number;
  driveDate: string;
  deadline: string;
  minCgpa: number;
  eligibleBranches: string[];
  maxBacklogs: number;
  registeredCount: number;
  shortlistedCount: number;
  offersCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
}

export interface StudentProfile {
  id: string;
  rollNumber: string;
  name: string;
  avatar: string;
  branch: string;
  cgpa: number;
  graduationYear: number;
  backlogs: number;
  skills: string[];
  placementStatus: 'unplaced' | 'shortlisted' | 'placed' | 'dream_placed';
  offersCount: number;
  offerCompany?: string;
  packageLPA?: number;
  resumeScore: number;
  email: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'application' | 'interview' | 'drive' | 'system' | 'ai';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  description: string;
  industry: string;
  size: string;
  headquarters: string;
  website: string;
  founded: string;
  verified: boolean;
  activeJobsCount: number;
  rating: number;
  benefits: string[];
  cultureHighlights: string[];
}

export interface InterviewQuestion {
  id: string;
  category: 'behavioral' | 'technical' | 'system_design';
  roleTarget: string;
  question: string;
  context: string;
  tips: string[];
  sampleStarter: string;
}
