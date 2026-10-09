import {
  CandidateProfile,
  Job,
  Company,
  PlacementDrive,
  StudentProfile,
  Application,
  NotificationItem,
  InterviewQuestion,
} from '../types';

export const INITIAL_CANDIDATE_PROFILE: CandidateProfile = {
  id: 'cand-001',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@nexus-talent.dev',
  phone: '+91 98765 43210',
  headline: 'Senior Full-Stack & Applied AI Engineer | React 19, TypeScript, Distributed Systems',
  bio: 'Product-focused software engineer with 4+ years of experience engineering high-performance web applications, LLM agent workflows, and scalable distributed services. Passionate about clean architecture and human-centered developer tools.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  location: 'Bengaluru, India',
  targetRole: 'Senior Full-Stack / AI Systems Engineer',
  expectedSalary: '₹32,00,000 - ₹45,00,000 / yr ($95k - $125k)',
  workArrangement: 'hybrid',
  preferredLocations: ['Bengaluru', 'Remote', 'Hyderabad', 'Singapore'],
  skills: [
    { name: 'TypeScript', level: 'Expert', category: 'Language' },
    { name: 'React', level: 'Expert', category: 'Framework' },
    { name: 'Node.js', level: 'Advanced', category: 'Framework' },
    { name: 'Python', level: 'Advanced', category: 'Language' },
    { name: 'PostgreSQL', level: 'Advanced', category: 'Tools & DB' },
    { name: 'Docker', level: 'Advanced', category: 'Cloud & DevOps' },
    { name: 'Tailwind CSS', level: 'Expert', category: 'Framework' },
    { name: 'GraphQL', level: 'Intermediate', category: 'Tools & DB' },
    { name: 'FastAPI', level: 'Advanced', category: 'Framework' },
    { name: 'Redis', level: 'Advanced', category: 'Tools & DB' },
    { name: 'AWS', level: 'Intermediate', category: 'Cloud & DevOps' },
    { name: 'Vector DBs (Pinecone)', level: 'Intermediate', category: 'AI & Data' },
    { name: 'LLM Agents & Prompt Ops', level: 'Advanced', category: 'AI & Data' },
  ],
  experience: [
    {
      id: 'exp-1',
      title: 'Senior Software Engineer',
      company: 'Synthetix Cloud Systems',
      location: 'Bengaluru (Hybrid)',
      startDate: '2023-03',
      endDate: 'Present',
      current: true,
      description: 'Lead engineering for core real-time telemetry dashboards and GenAI document parsing services.',
      achievements: [
        'Architected real-time WebSocket pipeline cutting event latency by 45% for 120,000 daily active users.',
        'Spearheaded LLM-based customer query classification engine achieving 93.4% precision.',
        'Mentored 4 junior engineers and unified company-wide design tokens across 6 internal services.',
      ],
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    },
    {
      id: 'exp-2',
      title: 'Full-Stack Developer',
      company: 'Veloce Data Labs',
      location: 'Pune, India',
      startDate: '2021-08',
      endDate: '2023-02',
      current: false,
      description: 'Developed analytics widgets and automated CI/CD microservices for fintech enterprise clients.',
      achievements: [
        'Migrated monolithic Django endpoints to FastAPI and async PostgreSQL, increasing throughput by 3.2x.',
        'Refactored frontend bundle size by 38% via code-splitting, tree-shaking, and asset optimization.',
      ],
      skills: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'AWS'],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech in Computer Science & Engineering',
      field: 'Computer Science',
      institution: 'Apex Institute of Technology, Bengaluru',
      startYear: '2017',
      graduationYear: '2021',
      cgpa: 8.84,
      maxCgpa: 10.0,
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'AuraGen: Autonomous Multi-Agent Research Assistant',
      description: 'Open-source autonomous research pipeline using LangGraph and Gemini API that synthesizes arXiv papers into structured briefings with citations.',
      techStack: ['Python', 'FastAPI', 'Gemini API', 'React', 'Tailwind CSS'],
      githubUrl: 'https://github.com/aarav-sharma/auragen-agents',
      liveUrl: 'https://auragen-preview.nexus.dev',
      metrics: 'Over 1,400 GitHub stars and 20k monthly runs.',
    },
    {
      id: 'proj-2',
      title: 'HyperPulse: Distributed Stream Analytics Engine',
      description: 'Sub-millisecond metric aggregation platform supporting custom CQL alerting rules and WebSocket visualization dashboards.',
      techStack: ['TypeScript', 'Node.js', 'Redis', 'Docker', 'PostgreSQL'],
      githubUrl: 'https://github.com/aarav-sharma/hyperpulse-streams',
      metrics: 'Benchmarked at 45,000 messages/sec with <8ms p99 latency.',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      issueDate: '2024-04',
      credentialUrl: 'https://aws.amazon.com/verification',
    },
    {
      id: 'cert-2',
      name: 'Deep Learning & LLM Systems Specialization',
      issuer: 'DeepLearning.AI',
      issueDate: '2024-08',
      credentialUrl: 'https://coursera.org/verify',
    },
  ],
  socialLinks: {
    github: 'https://github.com/aarav-sharma',
    linkedin: 'https://linkedin.com/in/aarav-sharma-tech',
    portfolio: 'https://aaravsharma.dev',
  },
  resume: {
    fileName: 'Aarav_Sharma_Resume_2026.pdf',
    uploadDate: '2026-09-18',
    fileSize: '412 KB',
    text: `AARAV SHARMA
Senior Full-Stack & Applied AI Engineer
Bengaluru, India | +91 98765 43210 | aarav.sharma@nexus-talent.dev | github.com/aarav-sharma | linkedin.com/in/aarav-sharma-tech

PROFESSIONAL SUMMARY
High-impact software engineer with 4+ years building production-grade web systems, distributed architectures, and generative AI pipelines. Proven track record of boosting system throughput by 3x and architecting low-latency applications serving 120k+ daily users.

CORE TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, SQL, HTML5/CSS3
Frameworks & Libraries: React 19, Next.js, Node.js, Express, FastAPI, Tailwind CSS, Redux Toolkit
Databases & Cloud: PostgreSQL, Redis, Pinecone Vector DB, AWS (S3, ECS, Lambda), Docker, Git, CI/CD
AI & Systems: Gemini API, LangChain, RAG Pipelines, RESTful APIs, WebSockets, Distributed Microservices

PROFESSIONAL EXPERIENCE
Senior Software Engineer | Synthetix Cloud Systems (Bengaluru, India) | March 2023 – Present
- Architected real-time WebSocket telemetry engine for 120,000 DAUs, decreasing notification delivery latency by 45%.
- Built automated LLM classification service with 93.4% accuracy, saving 22 human support hours per week.
- Reduced database connection overhead by 35% through connection pooling and Redis cache strategy.
- Mentored 4 engineers in TypeScript best practices and modular React component patterns.

Full-Stack Developer | Veloce Data Labs (Pune, India) | August 2021 – February 2023
- Migrated legacy backend to FastAPI and async PostgreSQL, elevating transaction capacity by 3.2x.
- Spearheaded frontend refactor cutting initial JS bundle by 38% via dynamic code-splitting and asset caching.
- Automated Docker container deployment pipelines on AWS ECS with zero-downtime rolling updates.

KEY PROJECTS
- AuraGen: Autonomous Multi-Agent Research Assistant (Python, FastAPI, Gemini API, React) - 1,400+ GitHub stars.
- HyperPulse: Distributed Stream Analytics Engine (TypeScript, Node.js, Redis, PostgreSQL) - 45k msg/sec throughput.

EDUCATION
B.Tech in Computer Science & Engineering | Apex Institute of Technology | 2017 – 2021 | CGPA: 8.84/10.0`,
  },
};

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    name: 'NexusCore AI Labs',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    tagline: 'Pioneering multimodal foundation models and autonomous enterprise workflows.',
    description: 'NexusCore AI is an enterprise AI lab developing autonomous agentic architectures and foundational reasoning systems for Global 2000 companies.',
    industry: 'Artificial Intelligence & Cloud',
    size: '250 - 500 Employees',
    headquarters: 'Bengaluru & San Francisco',
    website: 'https://nexuscore-ai.example.com',
    founded: '2021',
    verified: true,
    activeJobsCount: 4,
    rating: 4.8,
    benefits: ['Competitive Equity', 'Comprehensive Health Insurance', 'Generous Learning Budget', 'Flexible Hybrid Work', 'Annual Tech Stipend'],
    cultureHighlights: ['High Autonomy', 'Bias for Execution', 'Open Research Publication', 'Zero Bureaucracy'],
  },
  {
    id: 'comp-2',
    name: 'CloudScale Systems',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    tagline: 'Next-generation cloud infrastructure and Kubernetes automation.',
    description: 'CloudScale powers mission-critical edge deployments and distributed cloud control planes for tier-1 enterprises worldwide.',
    industry: 'Cloud Infrastructure & DevOps',
    size: '500 - 1000 Employees',
    headquarters: 'Hyderabad, India',
    website: 'https://cloudscalesys.example.com',
    founded: '2019',
    verified: true,
    activeJobsCount: 3,
    rating: 4.7,
    benefits: ['Full Remote Options', 'Wellness Allowance', 'Parental Leave', 'Stock Options (ESOPs)', 'Home Office Setup'],
    cultureHighlights: ['Remote-First', 'Asynchronous Communication', 'Engineering Excellence'],
  },
  {
    id: 'comp-3',
    name: 'QuantumPulse Fintech',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
    tagline: 'Ultra-low latency institutional trading and automated treasury platforms.',
    description: 'QuantumPulse builds high-throughput financial clearance engines and algorithmic risk systems processing over $10B daily volume.',
    industry: 'Financial Technology',
    size: '100 - 250 Employees',
    headquarters: 'Mumbai & Singapore',
    website: 'https://quantumpulse.example.com',
    founded: '2022',
    verified: true,
    activeJobsCount: 2,
    rating: 4.6,
    benefits: ['Performance Bonuses', 'Gym & Nutrition Stipend', 'Premium Health Cover', 'Relocation Assistance'],
    cultureHighlights: ['Data-Driven', 'Fast-Paced Innovation', 'High Impact'],
  },
  {
    id: 'comp-4',
    name: 'Vertex Robotics & Perception',
    logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=120&q=80',
    tagline: 'Intelligent spatial perception and autonomous robotics manipulation.',
    description: 'Vertex develops computer vision models and real-time robotic fleet controllers for smart logistics and automated manufacturing.',
    industry: 'Robotics & Computer Vision',
    size: '50 - 100 Employees',
    headquarters: 'Bengaluru, India',
    website: 'https://vertexrobotics.example.com',
    founded: '2023',
    verified: true,
    activeJobsCount: 2,
    rating: 4.9,
    benefits: ['Top-of-Market Compensation', 'Robotics Lab Access', 'Catered Meals', 'Patent Filing Bonuses'],
    cultureHighlights: ['Hard-Tech Builders', 'Collaborative Research', 'Mission-Oriented'],
  },
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-101',
    title: 'Senior Full-Stack AI Engineer',
    company: 'NexusCore AI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    companyTier: 'AI Unicorn',
    location: 'Bengaluru, India',
    workArrangement: 'hybrid',
    employmentType: 'Full-time',
    salaryRange: '₹34,00,000 - ₹48,00,000 / yr',
    minSalary: 3400000,
    maxSalary: 4800000,
    experienceLevel: 'Senior',
    experienceYearsMin: 3,
    department: 'Applied AI & Core Platform',
    postedDate: '2026-10-02',
    deadline: '2026-11-15',
    description: 'We are seeking an exceptional Senior Full-Stack Engineer to architect our flagship agent orchestration workspace. You will collaborate with research scientists and product designers to build sub-second interactive AI workspaces, manage streaming responses, and design resilient backend microservices.',
    responsibilities: [
      'Architect and build real-time AI canvas applications using React 19, TypeScript, and WebSockets.',
      'Design robust backend endpoints and microservices in Python (FastAPI) and Node.js.',
      'Implement RAG pipelines with vector databases (Pinecone, pgvector) and streaming LLM token delivery.',
      'Optimize database queries and caching layers across PostgreSQL and Redis.',
      'Establish automated CI/CD and observability pipelines for zero-downtime rollouts.',
    ],
    requiredSkills: ['TypeScript', 'React', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    preferredSkills: ['Redis', 'Vector DBs (Pinecone)', 'LLM Agents & Prompt Ops', 'Tailwind CSS', 'AWS'],
    minimumCgpa: 7.5,
    eligibleDegrees: ['B.Tech / M.Tech in CS / IT / AI / Related'],
    benefits: ['0.25% - 0.5% Equity Grant', 'Comprehensive Medical & Dental Insurance', '₹1,50,000 Annual Learning Budget', 'Flexible Work Hours', 'Latest Apple MacBook Pro M4'],
    applicantsCount: 42,
    status: 'active',
    recruiterId: 'rec-001',
  },
  {
    id: 'job-102',
    title: 'Distributed Systems & Cloud Engineer',
    company: 'CloudScale Systems',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    companyTier: 'Tier-1 Tech',
    location: 'Hyderabad, India (or Remote)',
    workArrangement: 'remote',
    employmentType: 'Full-time',
    salaryRange: '₹28,00,000 - ₹40,00,000 / yr',
    minSalary: 2800000,
    maxSalary: 4000000,
    experienceLevel: 'Mid-Level',
    experienceYearsMin: 2,
    department: 'Core Infrastructure',
    postedDate: '2026-10-05',
    deadline: '2026-11-20',
    description: 'CloudScale is hiring a Systems Engineer to scale our distributed control plane. You will work on Kubernetes operator development, zero-trust service mesh networking, and resilient storage orchestration across multi-cloud regions.',
    responsibilities: [
      'Build and maintain cloud-native operators in Go and Python.',
      'Design telemetry pipelines processing millions of events per second.',
      'Automate disaster recovery, chaos engineering drills, and multi-region replication.',
      'Collaborate with developer advocacy to improve internal tooling and CLI utilities.',
    ],
    requiredSkills: ['Docker', 'AWS', 'Python', 'PostgreSQL', 'Distributed Systems'],
    preferredSkills: ['Go', 'Kubernetes', 'Redis', 'TypeScript', 'Terraform'],
    minimumCgpa: 7.0,
    eligibleDegrees: ['B.Tech / M.Tech / MCA'],
    benefits: ['100% Remote Flexibility', 'Home Office Setup Grant (₹75,000)', 'Annual Offsite in Bali / Goa', 'Wellness Stipend'],
    applicantsCount: 68,
    status: 'active',
    recruiterId: 'rec-002',
  },
  {
    id: 'job-103',
    title: 'High-Throughput Backend Architect',
    company: 'QuantumPulse Fintech',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
    companyTier: 'Enterprise',
    location: 'Mumbai, India',
    workArrangement: 'hybrid',
    employmentType: 'Full-time',
    salaryRange: '₹40,00,000 - ₹55,00,000 / yr',
    minSalary: 4000000,
    maxSalary: 5500000,
    experienceLevel: 'Senior',
    experienceYearsMin: 4,
    department: 'Execution & Matching Engine',
    postedDate: '2026-09-28',
    deadline: '2026-10-31',
    description: 'Join QuantumPulse to build deterministic, low-latency financial order processing systems. You will optimize memory layouts, thread synchronization, and database persistence layers under extreme load.',
    responsibilities: [
      'Design ultra-reliable transaction settlement pipelines with zero data loss.',
      'Optimize database schemas and write custom query optimizers for time-series financial ticks.',
      'Implement strict audit logging and cryptographic verification protocols.',
    ],
    requiredSkills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'System Architecture'],
    preferredSkills: ['TypeScript', 'C++', 'Python', 'Kafka', 'Financial Protocols'],
    minimumCgpa: 8.0,
    eligibleDegrees: ['B.Tech in CS / Math & Computing / EE'],
    benefits: ['Quarterly Performance Incentive', 'Executive Health Checkups', 'Cab Service & Meal Subsidy'],
    applicantsCount: 31,
    status: 'active',
    recruiterId: 'rec-003',
  },
  {
    id: 'job-104',
    title: 'Perception & Computer Vision Software Engineer',
    company: 'Vertex Robotics & Perception',
    companyLogo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=120&q=80',
    companyTier: 'High-Growth Startup',
    location: 'Bengaluru, India',
    workArrangement: 'onsite',
    employmentType: 'Full-time',
    salaryRange: '₹30,00,000 - ₹46,00,000 / yr',
    minSalary: 3000000,
    maxSalary: 4600000,
    experienceLevel: 'Mid-Level',
    experienceYearsMin: 2,
    department: 'Perception Systems',
    postedDate: '2026-10-06',
    deadline: '2026-11-25',
    description: 'Vertex is building autonomous warehouse robotics. We need a Perception Engineer to deploy 3D spatial models on edge hardware (NVIDIA Jetson) and integrate real-time robot state observers.',
    responsibilities: [
      'Train and optimize neural networks for object detection and pose estimation.',
      'Deploy models using TensorRT and ONNX runtime on edge accelerators.',
      'Integrate sensor fusion pipelines (LiDAR, stereo cameras, IMU).',
    ],
    requiredSkills: ['Python', 'Docker', 'Machine Learning', 'Computer Vision'],
    preferredSkills: ['C++', 'PyTorch', 'ROS2', 'CUDA', 'FastAPI'],
    minimumCgpa: 7.5,
    eligibleDegrees: ['B.Tech / M.Tech in CS / AI / Robotics / EE'],
    benefits: ['Robotics Hardware Lab Budget', 'Full Medical Coverage', 'Free Catered Meals', 'IP Patent Bonuses'],
    applicantsCount: 19,
    status: 'active',
    recruiterId: 'rec-001',
  },
  {
    id: 'job-105',
    title: 'Frontend Platform Engineer (Design Systems & WebGL)',
    company: 'NexusCore AI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    companyTier: 'AI Unicorn',
    location: 'Bengaluru, India',
    workArrangement: 'hybrid',
    employmentType: 'Full-time',
    salaryRange: '₹26,00,000 - ₹38,00,000 / yr',
    minSalary: 2600000,
    maxSalary: 3800000,
    experienceLevel: 'Mid-Level',
    experienceYearsMin: 2,
    department: 'UI/UX & Platform',
    postedDate: '2026-10-07',
    deadline: '2026-11-18',
    description: 'Help us craft the most fluid, responsive, and beautiful AI interfaces in the world. You will build our core design system, interactive data graphs, and WebGL-accelerated canvas components.',
    responsibilities: [
      'Create accessible, keyboard-first UI component libraries in React 19 and Tailwind CSS.',
      'Build canvas visualization tools for neural network activations and agent workflows.',
      'Benchmark frontend rendering performance, ensuring consistent 60fps animations.',
    ],
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Web Performance'],
    preferredSkills: ['Three.js', 'Framer Motion', 'Node.js', 'Storybook', 'Figma'],
    minimumCgpa: 7.0,
    eligibleDegrees: ['B.Tech / BCA / MCA / Design Degree'],
    benefits: ['MacBook Pro M4 Max', 'Annual Conference Travel Budget', 'Stock Options', 'Flexible Leave'],
    applicantsCount: 54,
    status: 'active',
    recruiterId: 'rec-001',
  },
  {
    id: 'job-106',
    title: 'Campus Associate Software Engineer (2026 Batch)',
    company: 'CloudScale Systems',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    companyTier: 'Tier-1 Tech',
    location: 'Bengaluru / Hyderabad',
    workArrangement: 'hybrid',
    employmentType: 'Full-time',
    salaryRange: '₹14,00,000 - ₹18,00,000 / yr',
    minSalary: 1400000,
    maxSalary: 1800000,
    experienceLevel: 'Entry-Level',
    experienceYearsMin: 0,
    department: 'University Graduate Program',
    postedDate: '2026-10-01',
    deadline: '2026-11-05',
    description: 'Designed exclusively for graduating 2026 college seniors. You will undergo our intensive 8-week Cloud Academy bootcamp before joining full-time engineering squads working on cloud systems.',
    responsibilities: [
      'Participate in agile sprint development alongside senior mentor engineers.',
      'Write clean, well-tested TypeScript and Python microservices.',
      'Learn cloud provisioning, Kubernetes deployment, and site reliability engineering.',
    ],
    requiredSkills: ['Python', 'TypeScript', 'Data Structures & Algorithms', 'SQL'],
    preferredSkills: ['React', 'Docker', 'Git', 'Linux Basics'],
    minimumCgpa: 7.5,
    eligibleDegrees: ['B.Tech in CS / IT / ECE graduating 2026'],
    benefits: ['Structured Mentorship Program', 'Relocation Allowance', 'Comprehensive Health Cover', 'Upskilling Certifications'],
    applicantsCount: 230,
    status: 'active',
    recruiterId: 'rec-002',
  },
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-501',
    jobId: 'job-101',
    jobTitle: 'Senior Full-Stack AI Engineer',
    company: 'NexusCore AI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    candidateId: 'cand-001',
    candidateName: 'Aarav Sharma',
    candidateEmail: 'aarav.sharma@nexus-talent.dev',
    candidateHeadline: 'Senior Full-Stack & Applied AI Engineer',
    candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    candidateLocation: 'Bengaluru, India',
    appliedDate: '2026-10-03',
    status: 'shortlisted',
    matchScore: 92,
    coverNote: 'Excited by NexusCore\'s push towards autonomous agent architectures. With 4 years scaling real-time React & FastAPI systems, I would love to contribute directly to the flagship canvas platform.',
    notes: [
      'Candidate has stellar open-source agent project AuraGen with 1.4k stars.',
      'Strong match for both frontend React 19 architecture and Python backend services.',
      'Shortlisted for Round 1 Technical Architecture interview.',
    ],
    timeline: [
      { date: '2026-10-03 11:20', status: 'applied', note: 'Application submitted with AI resume match of 92%' },
      { date: '2026-10-04 14:15', status: 'under_review', note: 'Reviewed by Talent Acquisition Partner' },
      { date: '2026-10-06 09:30', status: 'shortlisted', note: 'Moved to Shortlist by Elena Rostova (Hiring Lead)' },
    ],
    interviewDetails: {
      date: '2026-10-14',
      time: '15:00 IST',
      interviewer: 'Elena Rostova (Head of Talent & Engineering)',
      stage: 'Round 1: System Architecture & Agent Workflow',
      meetingLink: 'https://meet.google.com/nex-arch-demo',
    },
  },
  {
    id: 'app-502',
    jobId: 'job-102',
    jobTitle: 'Distributed Systems & Cloud Engineer',
    company: 'CloudScale Systems',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    candidateId: 'cand-001',
    candidateName: 'Aarav Sharma',
    candidateEmail: 'aarav.sharma@nexus-talent.dev',
    candidateHeadline: 'Senior Full-Stack & Applied AI Engineer',
    candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    candidateLocation: 'Bengaluru, India',
    appliedDate: '2026-10-06',
    status: 'under_review',
    matchScore: 84,
    notes: ['Candidate has solid Docker and AWS background. Scheduled for screening.'],
    timeline: [
      { date: '2026-10-06 17:40', status: 'applied', note: 'Applied via NEXORA 1-Click Profile' },
      { date: '2026-10-07 10:00', status: 'under_review', note: 'Initial resume screening in progress' },
    ],
  },
  {
    id: 'app-503',
    jobId: 'job-105',
    jobTitle: 'Frontend Platform Engineer (Design Systems & WebGL)',
    company: 'NexusCore AI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    candidateId: 'cand-002',
    candidateName: 'Priya Patel',
    candidateEmail: 'priya.patel@apex.edu',
    candidateHeadline: 'Final Year CS Student | Frontend Specialist & UI Architect',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    candidateLocation: 'Bengaluru, India',
    appliedDate: '2026-10-07',
    status: 'interview',
    matchScore: 88,
    notes: ['Exceptional design sensibilities and high-caliber portfolio.'],
    timeline: [
      { date: '2026-10-07 12:00', status: 'applied', note: 'Application received' },
      { date: '2026-10-07 16:30', status: 'shortlisted', note: 'Fast-tracked due to 88% design match' },
      { date: '2026-10-08 11:00', status: 'interview', note: 'Interview scheduled for UI Challenge' },
    ],
    interviewDetails: {
      date: '2026-10-12',
      time: '11:00 IST',
      interviewer: 'Vikram Seth (Lead UI Architect)',
      stage: 'Design System & Component Challenge',
      meetingLink: 'https://meet.google.com/priya-ui-challenge',
    },
  },
  {
    id: 'app-504',
    jobId: 'job-103',
    jobTitle: 'High-Throughput Backend Architect',
    company: 'QuantumPulse Fintech',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
    candidateId: 'cand-003',
    candidateName: 'Rohan Mehra',
    candidateEmail: 'rohan.mehra@dev.net',
    candidateHeadline: 'Backend & Distributed Database Engineer',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    candidateLocation: 'Mumbai, India',
    appliedDate: '2026-10-01',
    status: 'offer',
    matchScore: 94,
    notes: ['Candidate cleared technical rounds with top score. Offer letter generated.'],
    timeline: [
      { date: '2026-10-01 10:00', status: 'applied' },
      { date: '2026-10-02 11:00', status: 'shortlisted' },
      { date: '2026-10-05 14:00', status: 'interview' },
      { date: '2026-10-08 16:30', status: 'offer', note: 'Offer released: ₹46 LPA with equity' },
    ],
  },
];

export const INITIAL_PLACEMENT_DRIVES: PlacementDrive[] = [
  {
    id: 'drive-01',
    company: 'NexusCore AI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    role: 'AI Graduate Software Engineer',
    packageLPA: 24.5,
    driveDate: '2026-10-22',
    deadline: '2026-10-18',
    minCgpa: 8.0,
    eligibleBranches: ['Computer Science', 'AI & Data Science', 'Information Tech'],
    maxBacklogs: 0,
    registeredCount: 148,
    shortlistedCount: 36,
    offersCount: 8,
    status: 'ongoing',
    description: 'Premier campus recruitment drive for 2026 graduating batch. Selected candidates join the core research & AI systems squads.',
  },
  {
    id: 'drive-02',
    company: 'CloudScale Systems',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    role: 'Associate Cloud Infrastructure Engineer',
    packageLPA: 18.0,
    driveDate: '2026-10-28',
    deadline: '2026-10-24',
    minCgpa: 7.5,
    eligibleBranches: ['Computer Science', 'Information Tech', 'Electronics & Comm.'],
    maxBacklogs: 0,
    registeredCount: 215,
    shortlistedCount: 52,
    offersCount: 14,
    status: 'upcoming',
    description: 'Comprehensive hiring sprint focusing on distributed networking, cloud virtualization, and site reliability automation.',
  },
  {
    id: 'drive-03',
    company: 'QuantumPulse Fintech',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
    role: 'Quantitative Software Engineer',
    packageLPA: 28.0,
    driveDate: '2026-11-04',
    deadline: '2026-10-30',
    minCgpa: 8.5,
    eligibleBranches: ['Computer Science', 'Math & Computing', 'Data Science'],
    maxBacklogs: 0,
    registeredCount: 89,
    shortlistedCount: 18,
    offersCount: 4,
    status: 'upcoming',
    description: 'Dream tier drive for high-speed algorithmic execution systems, mathematical modeling, and distributed caching.',
  },
  {
    id: 'drive-04',
    company: 'Vertex Robotics & Perception',
    companyLogo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=120&q=80',
    role: 'Embedded Robotics & Perception Fellow',
    packageLPA: 20.0,
    driveDate: '2026-09-24',
    deadline: '2026-09-20',
    minCgpa: 7.8,
    eligibleBranches: ['Computer Science', 'AI & Data Science', 'Electronics & Comm.'],
    maxBacklogs: 0,
    registeredCount: 112,
    shortlistedCount: 24,
    offersCount: 6,
    status: 'completed',
    description: 'Completed campus recruitment drive with 6 offers released for perception systems & edge hardware development.',
  },
];

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'stu-01',
    rollNumber: '22CS101',
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    branch: 'Computer Science',
    cgpa: 9.12,
    graduationYear: 2026,
    backlogs: 0,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Figma'],
    placementStatus: 'shortlisted',
    offersCount: 0,
    resumeScore: 92,
    email: 'priya.patel@apex.edu',
  },
  {
    id: 'stu-02',
    rollNumber: '22CS144',
    name: 'Kabir Verma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    branch: 'Computer Science',
    cgpa: 8.64,
    graduationYear: 2026,
    backlogs: 0,
    skills: ['Python', 'FastAPI', 'Machine Learning', 'Docker', 'SQL'],
    placementStatus: 'dream_placed',
    offersCount: 1,
    offerCompany: 'Vertex Robotics',
    packageLPA: 20.0,
    resumeScore: 89,
    email: 'kabir.verma@apex.edu',
  },
  {
    id: 'stu-03',
    rollNumber: '22AI109',
    name: 'Ananya Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    branch: 'AI & Data Science',
    cgpa: 8.95,
    graduationYear: 2026,
    backlogs: 0,
    skills: ['Python', 'PyTorch', 'Computer Vision', 'FastAPI', 'Pandas'],
    placementStatus: 'shortlisted',
    offersCount: 0,
    resumeScore: 94,
    email: 'ananya.d@apex.edu',
  },
  {
    id: 'stu-04',
    rollNumber: '22IT132',
    name: 'Devansh Kulkarni',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    branch: 'Information Tech',
    cgpa: 7.82,
    graduationYear: 2026,
    backlogs: 0,
    skills: ['Java', 'Spring Boot', 'MySQL', 'Docker', 'AWS'],
    placementStatus: 'unplaced',
    offersCount: 0,
    resumeScore: 78,
    email: 'devansh.k@apex.edu',
  },
  {
    id: 'stu-05',
    rollNumber: '22EC115',
    name: 'Meera Nambiar',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    branch: 'Electronics & Comm.',
    cgpa: 8.41,
    graduationYear: 2026,
    backlogs: 0,
    skills: ['C++', 'Embedded C', 'IoT', 'Python', 'MATLAB'],
    placementStatus: 'unplaced',
    offersCount: 0,
    resumeScore: 82,
    email: 'meera.n@apex.edu',
  },
  {
    id: 'stu-06',
    rollNumber: '22CS188',
    name: 'Siddharth Rao',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    branch: 'Computer Science',
    cgpa: 9.35,
    graduationYear: 2026,
    backlogs: 0,
    skills: ['Distributed Systems', 'Go', 'Rust', 'Kubernetes', 'PostgreSQL'],
    placementStatus: 'dream_placed',
    offersCount: 2,
    offerCompany: 'QuantumPulse Fintech',
    packageLPA: 28.0,
    resumeScore: 96,
    email: 'siddharth.rao@apex.edu',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Interview Scheduled',
    message: 'NexusCore AI Labs scheduled your Round 1 Technical Architecture interview for Oct 14 at 15:00 IST.',
    type: 'interview',
    timestamp: '10 mins ago',
    read: false,
    link: 'applications',
  },
  {
    id: 'notif-2',
    title: 'Application Shortlisted! 🎉',
    message: 'Congratulations! Elena Rostova moved your application for Senior Full-Stack AI Engineer to Shortlisted.',
    type: 'application',
    timestamp: '2 hours ago',
    read: false,
    link: 'applications',
  },
  {
    id: 'notif-3',
    title: 'New High-Match Job Alert (92%)',
    message: 'A new role matching your skills was posted: "Distributed Systems & Cloud Engineer" at CloudScale Systems.',
    type: 'ai',
    timestamp: '1 day ago',
    read: true,
    link: 'jobs',
  },
  {
    id: 'notif-4',
    title: 'Campus Drive Registration Open',
    message: 'NexusCore AI Labs 2026 Campus Drive is accepting applications. Minimum CGPA required: 8.0.',
    type: 'drive',
    timestamp: '2 days ago',
    read: true,
    link: 'placement',
  },
];

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'iq-1',
    category: 'behavioral',
    roleTarget: 'Full-Stack / AI Engineer',
    question: 'Describe a situation where an unexpected technical bottleneck severely degraded system performance under load. How did you diagnose and resolve it?',
    context: 'Evaluates problem-solving under pressure, telemetry analysis, and cross-functional coordination.',
    tips: [
      'Set the context clearly using the STAR method (Situation, Task, Action, Result).',
      'Detail the specific telemetry tools used (profilers, APMs, query analyzers).',
      'Mention trade-offs evaluated (caching vs scaling vs query rewriting).',
      'Conclude with quantifiable impact and post-mortem safeguards.',
    ],
    sampleStarter: 'In our real-time analytics portal, we experienced a severe p95 latency spike during morning peak traffic where database connections were getting exhausted...',
  },
  {
    id: 'iq-2',
    category: 'behavioral',
    roleTarget: 'Senior Systems Engineer',
    question: 'Tell me about a time you disagreed with an architectural decision made by a principal lead or peer. How did you advocate for your point of view constructively?',
    context: 'Assesses technical communication, evidence-based debate, and professional maturity.',
    tips: [
      'Focus on technical metrics and customer outcomes rather than personal friction.',
      'Show that you prepared proof-of-concept benchmarks or data.',
      'Explain how you prioritized team cohesion even while debating.',
    ],
    sampleStarter: 'When our engineering squad proposed migrating our primary transactional storage to a NoSQL document store, I had concerns regarding consistency requirements...',
  },
  {
    id: 'iq-3',
    category: 'technical',
    roleTarget: 'Applied AI & Software Engineer',
    question: 'Explain how you design a resilient, low-latency Retrieval-Augmented Generation (RAG) pipeline with hybrid search and streaming token output for 100,000 users.',
    context: 'Tests deep knowledge of vector databases, chunking strategies, reranking, and edge streaming.',
    tips: [
      'Address embedding latency, chunk overlap, and chunk size trade-offs.',
      'Explain hybrid search combining BM25 keyword matching with dense vector retrieval.',
      'Cover cross-encoder reranking and caching frequently retrieved document chunks in Redis.',
      'Describe SSE or WebSocket streaming protocols for responsive user feedback.',
    ],
    sampleStarter: 'To build a production RAG architecture at scale, I partition the pipeline into ingestion, indexing, retrieval, reranking, and generation tiers...',
  },
];

export const CODING_CHALLENGES = [
  {
    id: 'cc-1',
    title: 'LRU Cache with TTL Expiry',
    difficulty: 'Medium-Hard',
    category: 'Data Structures & Systems',
    timeLimit: '25 mins',
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with individual Time-To-Live (TTL) timestamps per key.
Implement the \`LRUCacheWithTTL\` class:
- \`get(key: string): any\` Returns the value if key exists and has not expired; otherwise returns -1.
- \`put(key: string, value: any, ttlMs: number): void\` Inserts or updates the key with the given TTL in milliseconds. If capacity is exceeded, evict the least recently used key.`,
    defaultCode: `class LRUCacheWithTTL {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const item = this.cache.get(key);
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return -1;
    }
    // Refresh recency
    this.cache.delete(key);
    this.cache.set(key, item);
    return item.value;
  }

  put(key, value, ttlMs) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict first (oldest) key
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, { value, expiresAt: Date.now() + ttlMs });
  }
}

// Sample Verification Runner
const cache = new LRUCacheWithTTL(2);
cache.put("a", 100, 5000);
cache.put("b", 200, 5000);
console.log("Get 'a':", cache.get("a")); // 100
cache.put("c", 300, 5000); // evicts 'b'
console.log("Get 'b' (evicted):", cache.get("b")); // -1
console.log("Get 'c':", cache.get("c")); // 300`,
    testCases: [
      { input: 'put("a", 100, 5000) -> get("a")', expected: '100', status: 'pass' },
      { input: 'put("b", 200, 5000) -> put("c", 300, 5000) -> get("b")', expected: '-1 (evicted)', status: 'pass' },
      { input: 'get("c")', expected: '300', status: 'pass' },
    ],
  },
  {
    id: 'cc-2',
    title: 'Top K Frequent Elements in Event Stream',
    difficulty: 'Medium',
    category: 'Algorithms & Heaps',
    timeLimit: '20 mins',
    description: `Given an array of integer event IDs \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in any order.
Your algorithm's time complexity must be better than O(n log n), where n is the array's size.`,
    defaultCode: `function topKFrequent(nums, k) {
  const frequencyMap = new Map();
  for (const num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  // Bucket sort approach: index represents frequency count
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of frequencyMap.entries()) {
    buckets[count].push(num);
  }

  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    if (buckets[i].length > 0) {
      result.push(...buckets[i]);
    }
  }

  return result.slice(0, k);
}

// Test Runner
console.log(topKFrequent([1,1,1,2,2,3], 2)); // [1, 2]
console.log(topKFrequent([4,4,4,4,5,5,6], 1)); // [4]`,
    testCases: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', expected: '[1, 2]', status: 'pass' },
      { input: 'nums = [4,4,4,4,5,5,6], k = 1', expected: '[4]', status: 'pass' },
    ],
  },
];

export const CAREER_ROADMAPS = [
  {
    id: 'road-1',
    role: 'Generative AI & LLM Systems Engineer',
    description: 'Transform from standard backend engineer to expert in LLM architecture, agent frameworks, fine-tuning, and low-latency inference.',
    totalWeeks: 12,
    completionPercentage: 68,
    milestones: [
      {
        id: 'm-1',
        title: 'Foundation Models & Prompt Engineering',
        status: 'completed',
        week: 'Weeks 1-2',
        topics: ['Tokenization', 'Zero-shot / Few-shot CoT', 'System Prompt Optimization', 'Gemini API Setup'],
        resources: ['DeepLearning.AI Prompt Course', 'Google AI Studio Cookbook'],
      },
      {
        id: 'm-2',
        title: 'RAG Architecture & Vector Indexing',
        status: 'completed',
        week: 'Weeks 3-5',
        topics: ['Document Parsing & Chunking', 'Embedding Models', 'Pinecone / pgvector', 'Hybrid Keyword Search'],
        resources: ['LlamaIndex Documentation', 'Vector DB Performance Benchmarks'],
      },
      {
        id: 'm-3',
        title: 'Autonomous Multi-Agent Orchestration',
        status: 'in_progress',
        week: 'Weeks 6-8',
        topics: ['LangGraph State Machines', 'Function Calling & Tool Execution', 'Agentic Reflection', 'Human-in-the-Loop'],
        resources: ['LangGraph Tutorials', 'NEXORA AI Research Papers'],
      },
      {
        id: 'm-4',
        title: 'Production Evaluation & Latency Optimization',
        status: 'locked',
        week: 'Weeks 9-10',
        topics: ['Ragas & TruLens Benchmarking', 'vLLM & Speculative Decoding', 'Streaming Token Delivery', 'Guardrails'],
        resources: ['Evaluation Frameworks Masterclass'],
      },
      {
        id: 'm-5',
        title: 'Capstone: Enterprise Agent Deployment',
        status: 'locked',
        week: 'Weeks 11-12',
        topics: ['Dockerized Kubernetes Deployment', 'Observability (Langfuse / OpenTelemetry)', 'CI/CD Pipeline'],
        resources: ['Production Deployment Blueprint'],
      },
    ],
  },
  {
    id: 'road-2',
    role: 'Distributed Cloud & Systems Architect',
    description: 'Master high-concurrency backend services, event-driven streaming, database sharding, and multi-region reliability.',
    totalWeeks: 14,
    completionPercentage: 45,
    milestones: [
      {
        id: 'cm-1',
        title: 'High-Concurrency Concurrency & Memory Models',
        status: 'completed',
        week: 'Weeks 1-3',
        topics: ['Thread Pools & Event Loops', 'Lock-Free Data Structures', 'Async I/O', 'Memory Profiling'],
        resources: ['Modern Systems Architecture'],
      },
      {
        id: 'cm-2',
        title: 'Distributed Caching & Consensus',
        status: 'in_progress',
        week: 'Weeks 4-7',
        topics: ['Redis Cluster & Sentinel', 'Raft Consensus Protocol', 'Cache-Aside & Write-Through Patterns', 'Cache Invalidation'],
        resources: ['Designing Data-Intensive Applications'],
      },
      {
        id: 'cm-3',
        title: 'Event Streaming & Kafka Architectures',
        status: 'locked',
        week: 'Weeks 8-11',
        topics: ['Kafka Partitioning', 'Exactly-Once Semantics', 'Dead Letter Queues', 'Event Sourcing'],
        resources: ['Apache Kafka Definitive Guide'],
      },
      {
        id: 'cm-4',
        title: 'Cloud Resilience & Chaos Engineering',
        status: 'locked',
        week: 'Weeks 12-14',
        topics: ['Chaos Mesh', 'Multi-Region Failover', 'Zero-Downtime Schema Migrations'],
        resources: ['Site Reliability Engineering Handbook'],
      },
    ],
  },
];
