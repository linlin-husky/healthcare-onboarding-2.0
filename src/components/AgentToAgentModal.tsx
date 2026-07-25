import React, { useState, useEffect, useRef } from 'react';
import { AGENT_PRESETS, type AgentPreset, type AgentMessage } from '../data/agentDataPresets';
import { useOnboarding } from '../context/OnboardingContext';
import { Bot, UserCheck, ShieldCheck, Cpu, Play, CheckCircle2, X, Sparkles, ArrowRight, Zap, RefreshCw, Lock } from 'lucide-react';

interface AgentToAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgentToAgentModal: React.FC<AgentToAgentModalProps> = ({ isOpen, onClose }) => {
  const { applyAgentPreset } = useOnboarding();
  const [selectedPresetId, setSelectedPresetId] = useState<string>('emmas_ai');
  const [visibleMessageCount, setVisibleMessageCount] = useState<number>(0);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activePreset: AgentPreset = AGENT_PRESETS.find(p => p.id === selectedPresetId) || AGENT_PRESETS[0];

  // Reset conversation stream when switching presets
  useEffect(() => {
    setVisibleMessageCount(0);
    setIsStreaming(false);
    setIsCompleted(false);
  }, [selectedPresetId]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMessageCount]);

  // Auto message streamer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isStreaming && visibleMessageCount < activePreset.messages.length) {
      timer = setTimeout(() => {
        setVisibleMessageCount(prev => {
          const next = prev + 1;
          if (next >= activePreset.messages.length) {
            setIsStreaming(false);
            setIsCompleted(true);
          }
          return next;
        });
      }, 700);
    }
    return () => clearTimeout(timer);
  }, [isStreaming, visibleMessageCount, activePreset.messages.length]);

  if (!isOpen) return null;

  const handleStartSync = () => {
    setVisibleMessageCount(0);
    setIsCompleted(false);
    setIsStreaming(true);
  };

  const handleInstantComplete = () => {
    setVisibleMessageCount(activePreset.messages.length);
    setIsStreaming(false);
    setIsCompleted(true);
  };

  const handleApplyToWizard = () => {
    applyAgentPreset(activePreset);
    onClose();
  };

  const visibleMessages: AgentMessage[] = activePreset.messages.slice(0, visibleMessageCount).map((m, idx) => ({
    ...m,
    timestamp: new Date(Date.now() - (activePreset.messages.length - idx) * 1200).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-indigo-500/20 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg text-white">Agent-to-Agent (A2A) Autonomous Sync</h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Lock className="w-3 h-3" /> mTLS 256-bit
                </span>
              </div>
              <p className="text-xs text-slate-400">
                User's Personal AI Agent directly negotiates health coverage and populates intake data.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Selector */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium whitespace-nowrap">
            <span>Select User Agent Persona:</span>
          </div>
          <div className="flex items-center gap-2">
            {AGENT_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedPresetId === preset.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/50'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>{preset.agentName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dialogue Stream Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950/50 font-mono text-sm">
          {visibleMessages.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
              <Sparkles className="w-10 h-10 text-emerald-400/60 mb-3 animate-bounce" />
              <h4 className="text-slate-200 font-medium mb-1">Ready to Initiate A2A Autonomous Exchange</h4>
              <p className="text-xs text-slate-400 max-w-md mb-4 font-sans">
                Press <strong>Start Autonomous Sync</strong> below to watch the Website AI Concierge and {activePreset.userAvatarName}'s AI Agent negotiate plan benefits in real-time.
              </p>
              <button
                onClick={handleStartSync}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg transition-all shadow-lg shadow-emerald-500/20"
              >
                <Play className="w-4 h-4 fill-current" /> Start Autonomous Sync
              </button>
            </div>
          ) : (
            visibleMessages.map(msg => {
              if (msg.sender === 'system') {
                return (
                  <div key={msg.id} className="flex justify-center my-2">
                    <div className="px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-400 text-xs flex items-center gap-2 font-sans">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{msg.content}</span>
                    </div>
                  </div>
                );
              }

              const isWebAgent = msg.sender === 'website_agent';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col space-y-1 ${isWebAgent ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
                    {isWebAgent ? (
                      <>
                        <span className="font-semibold text-emerald-400 flex items-center gap-1">
                          <Bot className="w-3.5 h-3.5" /> {msg.senderName}
                        </span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </>
                    ) : (
                      <>
                        <span>{msg.timestamp}</span>
                        <span>•</span>
                        <span className="font-semibold text-cyan-400 flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5" /> {msg.senderName}
                        </span>
                      </>
                    )}
                  </div>

                  <div
                    className={`max-w-xl p-3.5 rounded-xl border font-sans text-xs sm:text-sm leading-relaxed ${
                      isWebAgent
                        ? 'bg-slate-900/90 border-slate-800 text-slate-200 rounded-tl-none'
                        : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-100 rounded-tr-none'
                    }`}
                  >
                    <p>{msg.content}</p>

                    {msg.payloadSnippet && (
                      <div className="mt-2.5 p-2 bg-slate-950/80 border border-slate-800/80 rounded-md font-mono text-[11px] text-emerald-400/90 overflow-x-auto">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-sans">JSON-RPC Data Payload</div>
                        <pre>{JSON.stringify(msg.payloadSnippet, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Action & Status Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            {isStreaming && (
              <span className="flex items-center gap-2 text-emerald-400">
                <RefreshCw className="w-4 h-4 animate-spin" /> Negotiating coverage protocol...
              </span>
            )}
            {isCompleted && (
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Consensus Reached! Ready to auto-fill.
              </span>
            )}
            {!isStreaming && !isCompleted && (
              <span>Status: Idle. Click start to begin live agent dialogue.</span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {visibleMessageCount < activePreset.messages.length && (
              <button
                onClick={handleInstantComplete}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors border border-slate-700"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Fast Forward
              </button>
            )}

            <button
              onClick={handleApplyToWizard}
              disabled={!isCompleted && visibleMessageCount < activePreset.messages.length}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition-all shadow-lg ${
                isCompleted || visibleMessageCount >= activePreset.messages.length
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/20 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
              }`}
            >
              <span>Apply Verified Data to Onboarding</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
