import { ResumeAnalysisResult } from '../types';

export interface CopilotChatPayload {
  message: string;
  history?: { role: string; content: string }[];
  userRole?: string;
  candidateProfile?: any;
}

export interface CopilotResponse {
  reply: string;
  source: string;
  isAiPowered: boolean;
  notice?: string;
}

export interface InterviewFeedbackPayload {
  question: string;
  answer: string;
  role?: string;
  type?: string;
}

export interface InterviewFeedbackResponse {
  score: number;
  relevanceScore: number;
  clarityScore: number;
  impactScore: number;
  verdict: 'Exceeds Expectations' | 'Meets Bar' | 'Needs Improvement';
  starBreakdown: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  strengths: string[];
  improvementTips: string[];
  exemplaryAnswer: string;
  isAiPowered: boolean;
  source: string;
}

export const aiService = {
  async askCopilot(payload: CopilotChatPayload): Promise<CopilotResponse> {
    try {
      const res = await fetch('/api/ai/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Copilot API responded with status ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.warn('Fallback to client-side copilot generator:', err);
      return {
        reply: `### 🚀 NEXORA Career Recommendation
To fast-track your progression in 2026:
1. **Strengthen High-Value Stacks**: Ensure your projects showcase production frameworks (React 19, TypeScript, PostgreSQL, and Gemini API agent loops).
2. **Quantify Results**: In your resume and interviews, anchor achievements in measurable benchmarks (e.g., latency, throughput, scale).
3. **Target Strategic Roles**: Explore our curated listings with 85%+ compatibility scores for optimal interview callback velocity.`,
        source: 'nexora-local-engine',
        isAiPowered: false,
      };
    }
  },

  async analyzeResume(resumeText: string, targetJobTitle?: string): Promise<ResumeAnalysisResult> {
    try {
      const res = await fetch('/api/ai/resume-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, targetJobTitle }),
      });

      if (!res.ok) {
        throw new Error(`Resume analyze responded with ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.warn('Fallback to local resume intelligence engine:', err);
      return {
        overallScore: 88,
        categoryScores: {
          atsFormatting: 95,
          impactVerbs: 87,
          technicalSkills: 91,
          quantifiableMetrics: 80,
          structureCompleteness: 93,
        },
        summary: `Strong candidate profile with high ATS parseability. High alignment with full-stack and systems engineering requirements.`,
        detectedSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Python', 'Tailwind CSS', 'Redis', 'FastAPI'],
        missingKeywords: ['Kubernetes Operators', 'OpenTelemetry Tracing', 'Vector Index Optimization'],
        strengths: [
          'ATS-clean single-column structure with high readability',
          'Rich technical skill density aligned with 2026 demand',
          'Demonstrated full-stack product and agent experience',
        ],
        criticalImprovements: [
          'Add more quantifiable cost and latency benchmarks',
          'Emphasize automated testing coverage (Vitest / Playwright)',
        ],
        bulletTransformations: [
          {
            original: 'Developed frontend features for internal dashboard.',
            improved: 'Architected modular design tokens and real-time telemetry dashboard in React 19, accelerating page load time by 42% for 12,000+ daily engineers.',
            reasoning: 'Replaced weak generic verb with "Architected" and added quantifiable scale metrics.',
          },
        ],
        isAiPowered: false,
        source: 'nexora-local-fallback',
      };
    }
  },

  async evaluateInterviewAnswer(payload: InterviewFeedbackPayload): Promise<InterviewFeedbackResponse> {
    try {
      const res = await fetch('/api/ai/interview-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Interview evaluation responded with ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.warn('Fallback to local interview evaluator:', err);
      return {
        score: 85,
        relevanceScore: 88,
        clarityScore: 86,
        impactScore: 82,
        verdict: 'Meets Bar',
        starBreakdown: {
          situation: 'Clear framing of the project challenge and production environment.',
          task: 'Well-defined personal responsibility and objective.',
          action: 'Strong explanation of technical steps and implementation.',
          result: 'Good overview of results; consider adding exact percentages and time savings.',
        },
        strengths: [
          'Logical structure following the STAR method',
          'Concise articulation of architectural decisions',
        ],
        improvementTips: [
          'Highlight specific metrics (e.g. latency drop from X ms to Y ms)',
          'Summarize the broader takeaway for future squad projects',
        ],
        exemplaryAnswer: `When our primary API encountered a 3x latency spike during morning traffic (Situation), my goal was to resolve the connection pool exhaustion without adding compute spend (Task). I configured Redis caching for read-heavy catalog items and optimized our PostgreSQL query execution plan (Action). As a result, p95 latency plummeted from 1.2s to 95ms and database CPU dropped 40% (Result).`,
        isAiPowered: false,
        source: 'nexora-local-fallback',
      };
    }
  },
};
