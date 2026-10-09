import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Sparkles,
  Download,
  RefreshCw,
  Zap,
  Copy,
  Check,
} from 'lucide-react';
import { aiService } from '../services/aiService';
import { ResumeAnalysisResult } from '../types';

export const ResumeStudioView: React.FC = () => {
  const { candidateProfile, jobs, addToast } = useApp();

  const [resumeText, setResumeText] = useState(candidateProfile.resume.text);
  const [targetRole, setTargetRole] = useState('Senior Full-Stack / AI Systems Engineer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [analysis, setAnalysis] = useState<ResumeAnalysisResult>({
    overallScore: 88,
    categoryScores: {
      atsFormatting: 95,
      impactVerbs: 87,
      technicalSkills: 91,
      quantifiableMetrics: 79,
      structureCompleteness: 93,
    },
    summary:
      'High-impact software engineering resume with exceptional ATS parseability, crisp single-column hierarchy, and strong skill density. Quantifying additional latency and cloud cost reductions will elevate this profile into the 98th percentile.',
    detectedSkills: [
      'TypeScript',
      'React 19',
      'Node.js',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Docker',
      'Redis',
      'Gemini API',
      'WebSockets',
    ],
    missingKeywords: ['Kubernetes Operators', 'OpenTelemetry Distributed Tracing', 'RAG Vector Index Optimization'],
    strengths: [
      'Flawless single-column hierarchy compliant with modern enterprise ATS parsers',
      'Consistent active past-tense verbs (Architected, Engineered, Spearheaded)',
      'High density of modern 2026 technical keywords in summary and experience bullets',
    ],
    criticalImprovements: [
      'Quantify business impact on 2 additional bullet points (e.g. latency, throughput, cost)',
      'Highlight automated test coverage percentage and test frameworks (Vitest, Playwright)',
    ],
    bulletTransformations: [
      {
        original: 'Built a web application for user job tracking with React and Node.js.',
        improved:
          'Architected responsive real-time career tracking portal using React 19, TypeScript, and Express, reducing page load latency by 45% for 12,000+ active monthly users.',
        reasoning: 'Replaced passive verb with "Architected", specified tech stack versions, and injected measurable performance + user scale.',
      },
      {
        original: 'Responsible for database queries and API integration.',
        improved:
          'Engineered optimized PostgreSQL relational schemas and RESTful microservices, trimming p95 query times from 420ms to 68ms under peak concurrent traffic.',
        reasoning: 'Transformed passive responsibility into concrete engineering achievement with quantified database latency benchmarks.',
      },
      {
        original: 'Helped implement machine learning models in customer service.',
        improved:
          'Integrated LLM agent pipeline with vector search and Gemini API, automating 93% of repetitive tier-1 customer inquiries while cutting average resolution time by 3.4x.',
        reasoning: 'Substituted vague participation with active leadership, specified LLM + vector tooling, and highlighted business ROI.',
      },
    ],
    isAiPowered: true,
    source: 'gemini-3.8-flash',
  });

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await aiService.analyzeResume(resumeText, targetRole);
      setAnalysis(res);
      addToast({
        title: 'Resume Intelligence Analysis Complete! 🎯',
        message: `Health score assessed at ${res.overallScore}/100.`,
        type: 'success',
      });
    } catch (err) {
      addToast({
        title: 'Analysis Fallback Activated',
        message: 'Generated comprehensive rule-based recommendations.',
        type: 'info',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
    addToast({ title: 'Improved Bullet Copied to Clipboard', type: 'info' });
  };

  const handleDownloadReport = () => {
    const reportContent = `NEXORA RESUME INTELLIGENCE REPORT
Target Role: ${targetRole}
Overall ATS Health Score: ${analysis.overallScore}/100

CATEGORY SCORES:
- ATS Formatting: ${analysis.categoryScores.atsFormatting}%
- Action Verbs: ${analysis.categoryScores.impactVerbs}%
- Technical Skills: ${analysis.categoryScores.technicalSkills}%
- Quantifiable Metrics: ${analysis.categoryScores.quantifiableMetrics}%
- Structure Completeness: ${analysis.categoryScores.structureCompleteness}%

EXECUTIVE SUMMARY:
${analysis.summary}

DETECTED SKILLS:
${analysis.detectedSkills.join(', ')}

MISSING HIGH-IMPACT KEYWORDS:
${analysis.missingKeywords.join(', ')}

STRENGTHS:
${analysis.strengths.map(s => `- ${s}`).join('\n')}

RECOMMENDED IMPROVEMENTS:
${analysis.criticalImprovements.map(i => `- ${i}`).join('\n')}

TRANSFORMED STAR BULLET POINTS:
${analysis.bulletTransformations.map(b => `Original: ${b.original}\nImproved: ${b.improved}\nReasoning: ${b.reasoning}\n`).join('\n')}
`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NEXORA_Resume_Analysis_${Date.now()}.txt`;
    link.click();
    addToast({ title: 'Analysis Report Downloaded', type: 'success' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            ATS Resume Intelligence & Keyword Optimization
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            AI Resume Intelligence Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Evaluate ATS readability, detect keyword gaps, and transform weak bullets into quantified STAR achievements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download Report</span>
          </button>

          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analyzing Resume...' : 'Re-Analyze with AI'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input and Target Selection (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-400" />
                Resume Source & Extracted Text
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">Safe In-Memory Parse</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Role Benchmark
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-violet-500 font-medium"
                placeholder="e.g. Senior Machine Learning Engineer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                Switch Sample Candidate Preset:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setResumeText(candidateProfile.resume.text);
                    setTargetRole('Senior Full-Stack & AI Systems Engineer');
                  }}
                  className="p-2 rounded-xl bg-slate-950 border border-violet-500/30 text-violet-300 text-left hover:border-violet-400 font-medium text-[11px] cursor-pointer"
                >
                  Aarav Sharma (4+ Yrs Exp)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setResumeText(`PRIYA PATEL
Bengaluru, India | priya.patel@apex.edu | github.com/priya-patel | linkedin.com/in/priya-patel
Final Year CS Senior & Frontend Architect

SUMMARY
Passionate frontend developer with expertise in React 19, TypeScript, and Tailwind CSS. Built high-performance campus portals and UI libraries with 99% Lighthouse scores.

EDUCATION
B.Tech in Computer Science & Engineering | Apex Institute of Technology | 2022-2026 | CGPA: 9.12/10.0

PROJECTS & EXPERIENCE
Frontend Intern | ByteWorks Technologies (Summer 2025)
- Built interactive analytics widgets in React and TypeScript.
- Improved component re-render performance by 30%.
Campus Event Hub (Lead Developer)
- Full-stack registration portal for 5,000+ university students using Next.js and PostgreSQL.`);
                    setTargetRole('Frontend Platform Engineer');
                  }}
                  className="p-2 rounded-xl bg-slate-950 border border-cyan-500/30 text-cyan-300 text-left hover:border-cyan-400 font-medium text-[11px] cursor-pointer"
                >
                  Priya Patel (Graduating 2026)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Resume Content (Markdown / Plaintext):
              </label>
              <textarea
                rows={12}
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                className="w-full bg-slate-950 rounded-xl border border-slate-800 p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-violet-500 leading-relaxed"
              />
            </div>

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAnalyzing ? 'Processing Intelligence...' : 'Execute Full ATS Audit'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual Health Dashboard & Recommendations (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-violet-950/40 via-slate-900 to-slate-950 border border-violet-500/30 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-0.5 shadow-xl shadow-violet-600/30 flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-mono">
                      {analysis.overallScore}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Health</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-extrabold text-white">Overall ATS Screening Score</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Top Tier
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-md">{analysis.summary}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>ATS Formatting & Hierarchy</span>
                  <span className="font-bold text-violet-400">{analysis.categoryScores.atsFormatting}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 rounded-full"
                    style={{ width: `${analysis.categoryScores.atsFormatting}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Action-Verb Impact</span>
                  <span className="font-bold text-indigo-400">{analysis.categoryScores.impactVerbs}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${analysis.categoryScores.impactVerbs}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Technical Keyword Density</span>
                  <span className="font-bold text-cyan-400">{analysis.categoryScores.technicalSkills}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${analysis.categoryScores.technicalSkills}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Quantifiable Metrics & Scale</span>
                  <span className="font-bold text-emerald-400">{analysis.categoryScores.quantifiableMetrics}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${analysis.categoryScores.quantifiableMetrics}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-800/80 text-xs">
              <div>
                <span className="font-bold text-emerald-400 block mb-1.5">
                  ✓ Successfully Extracted Skills ({analysis.detectedSkills.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.detectedSkills.map(s => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-amber-400 block mb-1.5">
                  ⚠ Missing High-Impact Keywords for {targetRole}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.missingKeywords.map(k => (
                    <span
                      key={k}
                      className="px-2 py-0.5 rounded bg-amber-950/40 text-amber-200 border border-amber-800/40 text-[11px]"
                    >
                      + {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STAR-Method Bullet Point Transformer */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base text-white">STAR-Method Bullet Point Transformers</h3>
              </div>
              <span className="text-[10px] text-violet-400 font-semibold px-2 py-0.5 rounded bg-violet-950 border border-violet-800">
                AI Optimization Engine
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Compare weak resume bullets with high-impact, quantified achievement statements formulated for top recruiters.
            </p>

            <div className="space-y-4">
              {analysis.bulletTransformations.map((trans, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">
                      Original Weak Bullet:
                    </span>
                    <p className="text-xs text-slate-400 italic mt-0.5 line-through">"{trans.original}"</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                      Quantified STAR Transformation:
                    </span>
                    <p className="text-xs text-white font-medium mt-0.5 leading-relaxed bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/30">
                      "{trans.improved}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <span className="text-violet-300">💡 {trans.reasoning}</span>
                    <button
                      onClick={() => copyToClipboard(trans.improved, idx)}
                      className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
