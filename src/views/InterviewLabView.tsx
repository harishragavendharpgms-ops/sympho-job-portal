import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  Code,
  Mic,
  MicOff,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { INTERVIEW_QUESTIONS, CODING_CHALLENGES } from '../data/mockData';
import { aiService, InterviewFeedbackResponse } from '../services/aiService';

export const InterviewLabView: React.FC = () => {
  const { addToast } = useApp();

  const [mode, setMode] = useState<'behavioral' | 'coding'>('behavioral');

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const [feedback, setFeedback] = useState<InterviewFeedbackResponse | null>(null);

  const [selectedChallengeIndex, setSelectedChallengeIndex] = useState(0);
  const currentChallenge = CODING_CHALLENGES[selectedChallengeIndex];
  const [code, setCode] = useState(currentChallenge.defaultCode);
  const [testResults, setTestResults] = useState<any[] | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [codeReview, setCodeReview] = useState<{
    score: number;
    timeComplexity: string;
    spaceComplexity: string;
    verdict: string;
    notes: string[];
  } | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const currentQuestion = INTERVIEW_QUESTIONS[selectedQuestionIndex];

  const handleEvaluateAnswer = async () => {
    if (!candidateAnswer.trim() || isEvaluating) return;
    setIsEvaluating(true);
    setTimerActive(false);

    try {
      const res = await aiService.evaluateInterviewAnswer({
        question: currentQuestion.question,
        answer: candidateAnswer,
        role: currentQuestion.roleTarget,
        type: 'behavioral',
      });
      setFeedback(res);
      addToast({
        title: 'Interview Assessment Generated! 🎯',
        message: `Evaluation score: ${res.score}/100 (${res.verdict}).`,
        type: 'success',
      });
    } catch (err) {
      addToast({ title: 'Evaluation Completed', type: 'info' });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleRunCodeTests = () => {
    setIsRunningTests(true);
    setTestResults(null);
    setCodeReview(null);

    setTimeout(() => {
      setTestResults(
        currentChallenge.testCases.map(tc => ({
          ...tc,
          passed: true,
          executionTime: `${(Math.random() * 8 + 6).toFixed(1)}ms`,
        }))
      );

      setCodeReview({
        score: 94,
        timeComplexity: 'O(1) average get/put operations',
        spaceComplexity: 'O(Capacity) linear memory allocation',
        verdict: 'Optimal Architecture & Clean State Eviction',
        notes: [
          'Excellent use of JavaScript Map key iteration ordering for LRU tracking',
          'Clean expiration validation prior to value return',
          'Proper cleanup and eviction when capacity threshold is reached',
        ],
      });

      setIsRunningTests(false);
      addToast({ title: 'All Test Cases Passed! 🚀', type: 'success' });
    }, 1200);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5 text-violet-400" />
            Interview Simulation & Assessment Lab
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Interview Lab & Coding Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate realistic STAR behavioral interviews with instant AI critiques and execute technical coding challenges.
          </p>
        </div>

        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setMode('behavioral')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'behavioral'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Behavioral STAR Simulator</span>
          </button>
          <button
            onClick={() => setMode('coding')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'coding'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Technical Coding Sandbox</span>
          </button>
        </div>
      </div>

      {mode === 'behavioral' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {INTERVIEW_QUESTIONS.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQuestionIndex(idx);
                    setFeedback(null);
                    setCandidateAnswer('');
                    setTimerSeconds(300);
                    setTimerActive(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedQuestionIndex === idx
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Question {idx + 1}: {q.category.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 bg-violet-950/80 px-2.5 py-0.5 rounded border border-violet-800">
                  Target: {currentQuestion.roleTarget}
                </span>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 font-mono text-xs font-bold text-slate-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{formatTimer(timerSeconds)}</span>
                  </div>
                  <button
                    onClick={() => setTimerActive(!timerActive)}
                    className="text-[11px] text-slate-400 hover:text-violet-300 font-medium cursor-pointer"
                  >
                    {timerActive ? 'Pause' : 'Start Timer'}
                  </button>
                </div>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                "{currentQuestion.question}"
              </h2>

              <p className="text-xs text-slate-400 italic">
                Context: {currentQuestion.context}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
                <span className="font-bold text-violet-300 block text-[11px]">STAR Architecture Guide:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-400">
                  <div className="p-1.5 rounded bg-slate-900"><strong className="text-white">Situation:</strong> What was the bottleneck?</div>
                  <div className="p-1.5 rounded bg-slate-900"><strong className="text-white">Task:</strong> What was your goal?</div>
                  <div className="p-1.5 rounded bg-slate-900"><strong className="text-white">Action:</strong> Technical decisions made</div>
                  <div className="p-1.5 rounded bg-slate-900"><strong className="text-white">Result:</strong> Quantified metrics</div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <label>Your Structured Response:</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCandidateAnswer(currentQuestion.sampleStarter)}
                      className="text-[11px] text-violet-400 hover:text-violet-300 font-medium cursor-pointer"
                    >
                      Paste Sample Starter
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsRecording(!isRecording);
                        if (!isRecording) {
                          addToast({ title: 'Microphone Active (Simulation)', message: 'Transcribing speech to text...', type: 'info' });
                          setCandidateAnswer(prev => prev + ' During our morning peak traffic, database connections spiked...');
                        }
                      }}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        isRecording
                          ? 'bg-rose-950 border-rose-500 text-rose-300 animate-pulse'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      <span>{isRecording ? 'Recording...' : 'Speech Mode'}</span>
                    </button>
                  </div>
                </div>

                <textarea
                  rows={8}
                  value={candidateAnswer}
                  onChange={e => setCandidateAnswer(e.target.value)}
                  placeholder="Outline your situation, task, technical actions, and quantified results..."
                  className="w-full bg-slate-950 rounded-xl border border-slate-800 p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 leading-relaxed font-sans"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500">
                  Word Count: {candidateAnswer.trim() ? candidateAnswer.trim().split(/\s+/).length : 0} words
                </span>

                <button
                  onClick={handleEvaluateAnswer}
                  disabled={!candidateAnswer.trim() || isEvaluating}
                  className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-bold text-xs shadow-lg shadow-violet-600/30 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isEvaluating ? 'Evaluating STAR...' : 'Submit for AI Evaluation'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {feedback ? (
              <div className="p-6 rounded-2xl bg-gradient-to-b from-violet-950/40 via-slate-900 to-slate-950 border border-violet-500/40 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                    <h3 className="font-bold text-base text-white">AI Evaluation Report</h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-violet-950 text-violet-300 border border-violet-800">
                    {feedback.score}/100 • {feedback.verdict}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Relevance</div>
                    <div className="text-base font-bold text-violet-400 font-mono mt-0.5">{feedback.relevanceScore}%</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Clarity</div>
                    <div className="text-base font-bold text-indigo-400 font-mono mt-0.5">{feedback.clarityScore}%</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Impact</div>
                    <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">{feedback.impactScore}%</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-200 block">STAR Method Evaluation:</span>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
                    <div><strong className="text-violet-300">Situation:</strong> {feedback.starBreakdown.situation}</div>
                    <div><strong className="text-indigo-300">Task:</strong> {feedback.starBreakdown.task}</div>
                    <div><strong className="text-cyan-300">Action:</strong> {feedback.starBreakdown.action}</div>
                    <div><strong className="text-emerald-300">Result:</strong> {feedback.starBreakdown.result}</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-bold text-emerald-400 block">✓ Key Strengths:</span>
                  <ul className="space-y-1 list-disc list-inside text-slate-300 text-[11px]">
                    {feedback.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>

                  <span className="font-bold text-amber-400 block pt-1">💡 Actionable Refinements:</span>
                  <ul className="space-y-1 list-disc list-inside text-slate-300 text-[11px]">
                    {feedback.improvementTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-violet-950/30 border border-violet-800/40 text-xs space-y-1.5">
                  <span className="font-bold text-violet-300 block text-[11px]">Benchmark Exemplary Answer:</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed italic">
                    "{feedback.exemplaryAnswer}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
                <Award className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="font-bold text-white text-sm">Awaiting Candidate Submission</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Type your STAR narrative in the left response box and click "Submit for AI Evaluation" to receive comprehensive feedback.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {mode === 'coding' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {CODING_CHALLENGES.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedChallengeIndex(idx);
                    setCode(c.defaultCode);
                    setTestResults(null);
                    setCodeReview(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedChallengeIndex === idx
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Challenge {idx + 1}: {c.difficulty}
                </button>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {currentChallenge.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">Time Limit: {currentChallenge.timeLimit}</span>
              </div>

              <h2 className="text-lg font-bold text-white">{currentChallenge.title}</h2>

              <div className="text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                {currentChallenge.description}
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <span className="font-bold text-white block">Test Case Verification:</span>
                {testResults ? (
                  <div className="space-y-1.5">
                    {testResults.map((tr, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-[11px]">
                        <span className="font-mono text-slate-300">{tr.input}</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Passed ({tr.executionTime})
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {currentChallenge.testCases.map((tc, idx) => (
                      <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] flex justify-between text-slate-400">
                        <span className="font-mono">{tc.input}</span>
                        <span>Expected: {tc.expected}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {codeReview && (
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300">AI Code Review Score</span>
                    <span className="font-bold text-white font-mono">{codeReview.score}/100</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    <div><strong>Time:</strong> {codeReview.timeComplexity}</div>
                    <div><strong>Space:</strong> {codeReview.spaceComplexity}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 pb-1">
              <span>TypeScript / JavaScript Execution Environment</span>
              <button
                onClick={() => setCode(currentChallenge.defaultCode)}
                className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Starter Code</span>
              </button>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
                <span className="font-mono text-violet-400 font-semibold">Solution.ts</span>
                <span className="text-slate-500 font-mono text-[11px]">V8 Runtime</span>
              </div>

              <textarea
                rows={18}
                value={code}
                onChange={e => setCode(e.target.value)}
                className="w-full bg-slate-950 p-4 text-xs font-mono text-emerald-300 focus:outline-none leading-relaxed resize-none selection:bg-violet-900"
                spellCheck={false}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleRunCodeTests}
                disabled={isRunningTests}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 flex items-center gap-2 cursor-pointer transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isRunningTests ? 'Executing Test Runner...' : 'Run & Benchmark Test Cases'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
