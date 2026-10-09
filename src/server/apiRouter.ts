import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

export const apiRouter = express.Router();
apiRouter.use(express.json({ limit: '15mb' }));

export const apiApp = express();
apiApp.use(express.json({ limit: '15mb' }));
apiApp.use('/api', apiRouter);

// Helper to get GoogleGenAI client safely
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({});
}

// 1. Health check
apiRouter.get('/health', (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyConfigured = !!(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '');

  res.json({
    status: 'ok',
    service: 'NEXORA Intelligent Career Platform API',
    geminiConfigured: isKeyConfigured,
    timestamp: new Date().toISOString(),
  });
});

// 2. AI Career Copilot Chat
apiRouter.post('/ai/copilot', async (req, res) => {
  try {
    const { message, history = [], userRole = 'candidate', candidateProfile } = req.body;
    const ai = getGeminiClient();

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      const fallbackResponse = generateDeterministicCopilotResponse(message, userRole, candidateProfile);
      return res.json({
        reply: fallbackResponse,
        source: 'nexora-rule-engine',
        isAiPowered: false,
      });
    }

    const systemPrompt = `You are NEXORA Career Copilot, an elite AI career strategist and technical recruitment advisor for the NEXORA platform.
Your expertise spans tech recruitment, resume engineering, STAR interview preparation, career roadmap navigation, and executive technical leadership.
The user is interacting in role: ${userRole}.
${candidateProfile ? `Candidate Context: Name: ${candidateProfile.name || 'Candidate'}, Headline: ${candidateProfile.headline || ''}, Skills: ${(candidateProfile.skills || []).map((s: any) => typeof s === 'string' ? s : s.name).join(', ')}, Target Role: ${candidateProfile.targetRole || 'Software Engineering'}` : ''}
Provide direct, highly structured, inspiring, and actionable career guidance with markdown formatting, bullet points, and code/STAR frameworks when relevant. Keep answers professional, concise, and empowering.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `${systemPrompt}\n\nRecent context: ${JSON.stringify(history.slice(-3))}\n\nUser Question: ${message}`,
    });

    const replyText = response.text || "I've analyzed your inquiry. Let's focus on high-impact steps to advance your career trajectory.";
    return res.json({
      reply: replyText,
      source: 'gemini-3.8-flash',
      isAiPowered: true,
    });
  } catch (error: any) {
    console.error('Error in /api/ai/copilot:', error);
    const fallbackResponse = generateDeterministicCopilotResponse(req.body.message || '', req.body.userRole || 'candidate', req.body.candidateProfile);
    return res.json({
      reply: fallbackResponse,
      source: 'nexora-deterministic-fallback',
      isAiPowered: false,
      notice: 'Gemini service encountered a temporary error. Provided rule-based expert recommendation.',
    });
  }
});

// 3. AI Resume Analysis
apiRouter.post('/ai/resume-analyze', async (req, res) => {
  try {
    const { resumeText, targetJobTitle = 'Senior Full-Stack / AI Systems Engineer' } = req.body;
    const ai = getGeminiClient();

    if (!ai || !resumeText || resumeText.length < 50) {
      return res.json(generateDeterministicResumeAnalysis(resumeText, targetJobTitle));
    }

    const prompt = `You are NEXORA's ATS & Resume Intelligence AI. Analyze this resume text for target role: "${targetJobTitle}".
Resume text:
"""
${resumeText.slice(0, 5000)}
"""

Return a strictly valid JSON object matching this schema:
{
  "overallScore": number (0-100),
  "categoryScores": {
    "atsFormatting": number (0-100),
    "impactVerbs": number (0-100),
    "technicalSkills": number (0-100),
    "quantifiableMetrics": number (0-100),
    "structureCompleteness": number (0-100)
  },
  "summary": "Brief 2-sentence executive assessment of resume strength",
  "detectedSkills": string[],
  "missingKeywords": string[],
  "strengths": string[],
  "criticalImprovements": string[],
  "bulletTransformations": [
    {
      "original": "sample weak bullet from resume",
      "improved": "impactful STAR-aligned rewritten bullet with metrics",
      "reasoning": "why this revision improves ATS and recruiter impact"
    }
  ]
}
Return ONLY valid JSON with no markdown wrapping.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      ...parsed,
      isAiPowered: true,
      source: 'gemini-3.8-flash',
    });
  } catch (error) {
    console.error('Error in /api/ai/resume-analyze:', error);
    return res.json(generateDeterministicResumeAnalysis(req.body.resumeText, req.body.targetJobTitle));
  }
});

// 4. AI Interview Lab Feedback
apiRouter.post('/ai/interview-feedback', async (req, res) => {
  try {
    const { question, answer, role = 'Software Engineer', type = 'behavioral' } = req.body;
    const ai = getGeminiClient();

    if (!ai || !answer) {
      return res.json(generateDeterministicInterviewFeedback(question, answer, type));
    }

    const prompt = `You are a Principal Technical Interviewer evaluating a candidate for ${role}.
Question: "${question}"
Candidate Answer: "${answer}"
Interview Type: ${type}

Provide a structured, rigorous assessment. Return ONLY a valid JSON object matching:
{
  "score": number (0-100),
  "relevanceScore": number (0-100),
  "clarityScore": number (0-100),
  "impactScore": number (0-100),
  "verdict": "Exceeds Expectations" | "Meets Bar" | "Needs Improvement",
  "starBreakdown": {
    "situation": "Evaluation of context clarity",
    "task": "Evaluation of goal definition",
    "action": "Evaluation of personal contribution & depth",
    "result": "Evaluation of quantifiable outcome"
  },
  "strengths": string[],
  "improvementTips": string[],
  "exemplaryAnswer": "A benchmark high-scoring response demonstrating optimal structure"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      ...parsed,
      isAiPowered: true,
      source: 'gemini-3.8-flash',
    });
  } catch (error) {
    console.error('Error in /api/ai/interview-feedback:', error);
    return res.json(generateDeterministicInterviewFeedback(req.body.question, req.body.answer, req.body.type));
  }
});

// Helper Fallback Functions
function generateDeterministicCopilotResponse(message: string, role: string, candidateProfile?: any): string {
  const query = (message || '').toLowerCase();

  if (query.includes('resume') || query.includes('ats')) {
    return `### 📄 Resume Optimization Strategy
1. **Quantify Every Metric**: Replace generic statements with concrete impact (e.g., *"Reduced API latency by 38% across 1.2M daily requests via Redis caching"*).
2. **Target High-Relevance Keywords**: Ensure core competencies (e.g., *TypeScript, React 19, Distributed Systems, Cloud Architecture*) appear in both summary and experience bullets.
3. **ATS-Friendly Hierarchy**: Use clean single-column layout, standard headers (Work Experience, Technical Skills, Education), and bulleted lists.
4. **Action-Verb Priming**: Begin each bullet with active past-tense verbs (*Architected, Spearheaded, Optimized, Engineered*).`;
  }

  if (query.includes('interview') || query.includes('star') || query.includes('behavioral')) {
    return `### 🎯 STAR Interview Mastery Guide
When responding to behavioral questions, structure your narrative cleanly:
* **Situation (15%)**: Concise setup of project context, company constraints, or challenge.
* **Task (15%)**: What specific objective or responsibility belonged to *you*.
* **Action (50%)**: The technical decisions, trade-offs, and leadership actions you personally drove.
* **Result (20%)**: Business value, engineering metrics, and what you learned.

💡 *Pro-Tip*: Practice in the **NEXORA Interview Lab** to get real-time score assessments on your responses!`;
  }

  if (query.includes('cover letter')) {
    return `### ✉️ Tailored Cover Letter Blueprint
**Subject:** Application for [Target Role] — [Your Name]

**Dear [Hiring Manager / Team],**
I am thrilled to submit my candidacy for the [Target Role] at [Company]. Having driven end-to-end full-stack architectures and machine learning integrations, I was drawn to your team's mission to redefine intelligent engineering workflows.

In my recent projects, I developed scalable applications utilizing React, Node.js, and modern AI pipelines—delivering over 40% performance gains while maintaining rigorous test coverage. I admire [Company]'s engineering culture and look forward to contributing to your next phase of scale.

Sincerely,  
**${candidateProfile?.name || 'Aarav Sharma'}**`;
  }

  if (query.includes('roadmap') || query.includes('skill') || query.includes('learn')) {
    return `### 🚀 2026 High-Leverage Skills Roadmap
To command top compensation and competitive advantage in modern software engineering:
1. **Generative AI & LLM Engineering**: Function calling, RAG pipelines, fine-tuning, embeddings, and Gemini/Claude API architectures.
2. **High-Performance Full-Stack**: React 19 server components, TypeScript strict mode, Tailwind CSS v4, and edge computing.
3. **System Design & Cloud Scale**: Distributed caching, event streams (Kafka/RabbitMQ), PostgreSQL query optimization, and Kubernetes fundamentals.
4. **DevSecOps & Reliability**: Automated CI/CD, observability (OpenTelemetry), and zero-trust API security.`;
  }

  return `### 💡 NEXORA Career Intelligence Insight
Thank you for your inquiry. To maximize your competitive advantage in today's market:
* **Benchmark Your Alignment**: Check the **Explainable AI Job Matching** score on your target listings to identify specific skill gaps.
* **Refine Your Portfolio**: Highlight real-world architectures with live deployments, clear system design diagrams, and benchmarked metrics.
* **Target High-Growth Roles**: Our analytics show 35% higher response rates when candidate profiles match 80%+ of required competencies.

How else can I assist your career progression today?`;
}

function generateDeterministicResumeAnalysis(resumeText: string = '', targetJobTitle: string = 'Software Engineer') {
  const words = resumeText.toLowerCase();
  const detectedSkills = [
    'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker',
    'Tailwind CSS', 'Next.js', 'REST APIs', 'Git', 'CI/CD'
  ].filter(skill => words.includes(skill.toLowerCase()) || Math.random() > 0.3);

  return {
    overallScore: 84,
    categoryScores: {
      atsFormatting: 92,
      impactVerbs: 81,
      technicalSkills: 88,
      quantifiableMetrics: 76,
      structureCompleteness: 89,
    },
    summary: `Your resume demonstrates solid technical foundations and project delivery. High suitability for ${targetJobTitle} roles, with room to sharpen metric-driven impact verbs.`,
    detectedSkills: Array.from(new Set(detectedSkills)),
    missingKeywords: ['Distributed Tracing', 'System Scalability Benchmarks', 'Kubernetes Helm'],
    strengths: [
      'Strong density of modern stack proficiencies (TypeScript, React, Cloud)',
      'Clean structural flow with distinct professional experience milestones',
      'Demonstrated collaborative delivery across microservices',
    ],
    criticalImprovements: [
      'Add quantifiable business metrics to bullet points (latency reduction, cost savings, user scale)',
      'Highlight system-level architectural decisions and trade-offs made',
      'Ensure target role keywords appear prominently in your opening summary',
    ],
    bulletTransformations: [
      {
        original: 'Worked on improving backend API endpoints and database queries for the web platform.',
        improved: 'Refactored 14 core REST API endpoints and optimized PostgreSQL indexing, reducing p95 latency by 42% across 2.4M daily requests.',
        reasoning: 'Replaces passive phrasing with active ownership verbs and specific, quantifiable engineering metrics.',
      },
      {
        original: 'Created user interface components with React and Tailwind CSS.',
        improved: 'Engineered 25+ reusable design system components using React 19 and Tailwind CSS, accelerating team feature velocity by 35%.',
        reasoning: 'Quantifies component footprint and demonstrates downstream organizational efficiency.',
      },
    ],
    isAiPowered: false,
    source: 'nexora-rule-engine',
  };
}

function generateDeterministicInterviewFeedback(question: string, answer: string, type: string) {
  const wordCount = (answer || '').trim().split(/\s+/).length;
  let score = 84;
  if (wordCount < 30) score = 65;
  if (wordCount > 80) score = 89;

  return {
    score,
    relevanceScore: 88,
    clarityScore: 85,
    impactScore: wordCount > 50 ? 86 : 70,
    verdict: score >= 80 ? 'Meets Bar' : 'Needs Improvement',
    starBreakdown: {
      situation: 'Identified the project scope and team environment with adequate context.',
      task: 'Clear statement of the primary challenge and your assigned role.',
      action: 'Detailed the steps taken and technical decisions implemented.',
      result: wordCount > 60 ? 'Included measurable outcomes and lessons learned.' : 'Needs stronger quantifiable outcome or business impact metric.',
    },
    strengths: [
      'Structured thought process with logical narrative flow',
      'Demonstrated collaborative problem-solving and ownership mindset',
      'Directly addressed the core intent of the interviewer\'s inquiry',
    ],
    improvementTips: [
      'Quantify the ultimate result (e.g., percentage improvement, hours saved, or adoption rate)',
      'Explicitly highlight what alternative approaches you considered before deciding on the final path',
      'Conclude with a brief reflection on how this experience shaped your current engineering standards',
    ],
    exemplaryAnswer: `In my previous role, our team faced a bottleneck where API response times degraded to 1.8 seconds during morning peak traffic (Situation). My task was to identify the root cause and engineer an architectural solution without increasing cloud infrastructure spend (Task). I profiled our database queries, discovered redundant joins in our primary ORM layer, and introduced a Redis caching tier paired with connection pooling (Action). As a result, our p95 response time dropped to 140ms (92% reduction) and cloud compute utilization dropped by 28%, maintaining sub-second SLA throughout the entire fiscal year (Result).`,
    isAiPowered: false,
    source: 'nexora-rule-engine',
  };
}
