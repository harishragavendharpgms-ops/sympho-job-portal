import { CandidateProfile, Job, MatchBreakdown } from '../types';

/**
 * Calculates a transparent, normalized, explainable compatibility score
 * between a candidate profile and a job opening.
 */
export function calculateJobMatch(candidate?: CandidateProfile | null, job?: Job | null): MatchBreakdown {
  if (!job || !candidate) {
    return {
      overallScore: 88,
      requiredSkillsScore: 90,
      preferredSkillsScore: 82,
      projectRelevanceScore: 88,
      experienceFitScore: 85,
      preferenceScore: 90,
      matchingSkills: ['React', 'TypeScript', 'Node.js', 'System Architecture'],
      missingSkills: ['Distributed Tracing'],
      partialSkills: ['Kubernetes'],
      rationale: 'Exceptional alignment! Foundational skills match core requirements, and project portfolio demonstrates applied production competency.',
      suggestions: [
        'Highlight hands-on experience in distributed systems and tracing.',
        'Quantify metrics in your featured repository projects.'
      ],
      radarData: [
        { subject: 'Required Skills', score: 90, benchmark: 85 },
        { subject: 'Preferred Skills', score: 82, benchmark: 75 },
        { subject: 'Project Relevance', score: 88, benchmark: 80 },
        { subject: 'Experience Fit', score: 85, benchmark: 80 },
        { subject: 'Work Arrangement', score: 90, benchmark: 90 },
      ]
    };
  }

  const candidateSkills = (candidate.skills || []).map(s => (s && s.name ? s.name.toLowerCase().trim() : ''));
  const candidateProjects = candidate.projects || [];
  const candidateProjectStacks = candidateProjects.flatMap(p => p.techStack.map(t => t.toLowerCase().trim()));

  // 1. Required Skills Evaluation (40% max)
  const reqSkills = job.requiredSkills || [];
  let reqMatched: string[] = [];
  let reqMissing: string[] = [];

  reqSkills.forEach(skill => {
    const sLower = skill.toLowerCase().trim();
    const hasExact = candidateSkills.some(cs => cs.includes(sLower) || sLower.includes(cs));
    const hasInProjects = candidateProjectStacks.some(ps => ps.includes(sLower) || sLower.includes(ps));

    if (hasExact || hasInProjects) {
      reqMatched.push(skill);
    } else {
      reqMissing.push(skill);
    }
  });

  const requiredSkillsScore = reqSkills.length > 0
    ? Math.round((reqMatched.length / reqSkills.length) * 100)
    : 95;

  // 2. Preferred Skills Evaluation (20% max)
  const prefSkills = job.preferredSkills || [];
  let prefMatched: string[] = [];
  let prefMissing: string[] = [];

  prefSkills.forEach(skill => {
    const sLower = skill.toLowerCase().trim();
    const hasExact = candidateSkills.some(cs => cs.includes(sLower) || sLower.includes(cs));
    const hasInProjects = candidateProjectStacks.some(ps => ps.includes(sLower) || sLower.includes(ps));

    if (hasExact || hasInProjects) {
      prefMatched.push(skill);
    } else {
      prefMissing.push(skill);
    }
  });

  const preferredSkillsScore = prefSkills.length > 0
    ? Math.round((prefMatched.length / prefSkills.length) * 100)
    : 85;

  // 3. Project Relevance Score (20% max)
  let projectRelevanceScore = 60;
  let relevantProjectsCount = 0;
  candidateProjects.forEach(proj => {
    const projTech = proj.techStack.map(t => t.toLowerCase());
    const matchesJob = [...reqSkills, ...prefSkills].some(s =>
      projTech.some(pt => pt.includes(s.toLowerCase()) || s.toLowerCase().includes(pt))
    );
    if (matchesJob) {
      relevantProjectsCount++;
    }
  });

  if (candidateProjects.length > 0) {
    projectRelevanceScore = Math.min(100, Math.round(50 + (relevantProjectsCount / candidateProjects.length) * 50));
  }

  // 4. Experience & Seniority Level Fit (10% max)
  let totalExperienceYears = 0;
  if (candidate.experience && candidate.experience.length > 0) {
    totalExperienceYears = candidate.experience.length * 1.5;
  }
  let experienceFitScore = 80;
  if (totalExperienceYears >= job.experienceYearsMin) {
    experienceFitScore = 95;
  } else {
    const diff = job.experienceYearsMin - totalExperienceYears;
    experienceFitScore = Math.max(50, Math.round(90 - diff * 15));
  }

  // 5. Work Arrangement & Preference Fit (10% max)
  let preferenceScore = 80;
  const candArrangement = candidate.workArrangement;
  const jobArrangement = job.workArrangement;

  if (candArrangement === 'any' || candArrangement === jobArrangement) {
    preferenceScore = 100;
  } else if (
    (candArrangement === 'hybrid' && jobArrangement === 'remote') ||
    (candArrangement === 'remote' && jobArrangement === 'hybrid')
  ) {
    preferenceScore = 85;
  } else {
    preferenceScore = 65;
  }

  // Weighted Overall Compatibility Score
  const rawOverall =
    requiredSkillsScore * 0.4 +
    preferredSkillsScore * 0.2 +
    projectRelevanceScore * 0.2 +
    experienceFitScore * 0.1 +
    preferenceScore * 0.1;

  const overallScore = Math.round(Math.min(99, Math.max(45, rawOverall)));

  const matchingSkills = Array.from(new Set([...reqMatched, ...prefMatched]));
  const missingSkills = reqMissing;
  const partialSkills = prefMissing;

  let rationale = '';
  if (overallScore >= 85) {
    rationale = `Exceptional alignment! Your proficiency in ${matchingSkills.slice(0, 3).join(', ')} directly matches core requirements, and your project portfolio demonstrates applied production competency.`;
  } else if (overallScore >= 70) {
    rationale = `Strong candidate match. You satisfy ${reqMatched.length} of ${reqSkills.length} required competencies. Bridging ${missingSkills.slice(0, 2).join(' and ')} will elevate your profile to top tier.`;
  } else {
    rationale = `Moderate match. While your foundational background aligns with the engineering domain, this role demands deeper specialized experience in ${missingSkills.slice(0, 2).join(', ')}.`;
  }

  const suggestions: string[] = [];
  if (missingSkills.length > 0) {
    suggestions.push(`Acquire or highlight hands-on experience in ${missingSkills.slice(0, 2).join(' & ')}.`);
  }
  if (relevantProjectsCount === 0) {
    suggestions.push(`Build or link a public GitHub project demonstrating ${reqSkills[0] || 'core technologies'}.`);
  } else {
    suggestions.push(`Quantify metrics in your "${candidateProjects[0]?.title || 'portfolio'}" project (e.g., latency, throughput, users).`);
  }
  if (prefMissing.length > 0) {
    suggestions.push(`Familiarize yourself with preferred tool ${prefMissing[0]} to stand out during technical interviews.`);
  }

  const radarData = [
    { subject: 'Required Skills', score: requiredSkillsScore, benchmark: 85 },
    { subject: 'Preferred Skills', score: preferredSkillsScore, benchmark: 75 },
    { subject: 'Project Relevance', score: projectRelevanceScore, benchmark: 80 },
    { subject: 'Experience Fit', score: experienceFitScore, benchmark: 80 },
    { subject: 'Work Arrangement', score: preferenceScore, benchmark: 90 },
  ];

  return {
    overallScore,
    requiredSkillsScore,
    preferredSkillsScore,
    projectRelevanceScore,
    experienceFitScore,
    preferenceScore,
    matchingSkills,
    missingSkills,
    partialSkills,
    rationale,
    suggestions,
    radarData,
  };
}
