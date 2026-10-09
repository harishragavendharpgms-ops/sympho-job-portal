import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';
import { aiService } from '../services/aiService';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isAiPowered?: boolean;
}

export const CopilotView: React.FC = () => {
  const { role, candidateProfile, addToast } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      content: `Hello **${candidateProfile.name.split(' ')[0]}**! I am your **NEXORA AI Career Copilot**, powered by Gemini.

I've reviewed your verified profile as a **Senior Full-Stack & Applied AI Engineer**. I can help you with:
- **Tailored Career Trajectories**: Roadmap to Staff Engineer or AI Systems Architect
- **High-Impact Resume Bullets**: Structuring achievements with quantified STAR metrics
- **Custom Cover Letters**: Formulating personalized pitches for your target companies
- **Interview Strategy**: System design narratives and behavioral questions

How can I accelerate your career goals today?`,
      timestamp: 'Just now',
      isAiPowered: true,
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'How can I bridge the gap from Senior Engineer to Principal AI Architect?',
    'Draft a compelling cover note for NexusCore AI Labs',
    'Review my STAR framework response for latency bottlenecks',
    'What are the highest-paying cloud & AI skills in 2026?',
    'Transform my project AuraGen into 3 high-impact resume bullets',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.content,
      }));

      const res = await aiService.askCopilot({
        message: text,
        history,
        userRole: role,
        candidateProfile,
      });

      const assistantMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAiPowered: res.isAiPowered,
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      addToast({
        title: 'Network Note',
        message: 'Loaded simulated AI response due to connection timeout.',
        type: 'info',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
    addToast({ title: 'Copied to Clipboard', type: 'info' });
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'assistant',
        content: `Chat session refreshed. Ready for your next career challenge!`,
        timestamp: 'Just now',
        isAiPowered: true,
      },
    ]);
    addToast({ title: 'Chat Cleared', type: 'info' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-violet-600/30">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-violet-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg text-white">NEXORA AI Career Copilot</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-950 border border-violet-500/30 text-violet-300">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-400">Context: {candidateProfile.name} • {candidateProfile.targetRole}</p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 text-xs transition-colors cursor-pointer"
          title="Clear Conversation"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      <div className="py-3 flex items-center gap-2 overflow-x-auto shrink-0 no-scrollbar">
        <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-400" /> Prompts:
        </span>
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="text-xs px-3 py-1 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in duration-200`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'bg-slate-900 border border-violet-500/30 text-violet-400 shadow-md'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-violet-600 text-white rounded-tr-none'
                    : 'bg-slate-900/90 border border-slate-800/90 text-slate-200 rounded-tl-none shadow-xl'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans space-y-1">
                  {msg.content}
                </div>

                <div
                  className={`flex items-center justify-between mt-2 pt-2 border-t text-[10px] ${
                    isUser ? 'border-violet-500/40 text-violet-200' : 'border-slate-800 text-slate-500'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleCopyMessage(msg.content, msg.id)}
                      className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                      title="Copy Response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-violet-500/30 text-violet-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-violet-400 animate-spin" />
              <span>Analyzing profile competencies & formulating strategy...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="pt-3 pb-2 shrink-0"
      >
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl focus-within:border-violet-500 transition-colors">
          <input
            type="text"
            placeholder="Ask Copilot: Career roadmap, resume bullets, STAR interview answer, cover note..."
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="p-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-bold transition-all shadow-md shadow-violet-600/30 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
