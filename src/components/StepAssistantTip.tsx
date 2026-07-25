import React from 'react';
import { Lightbulb, Sparkles, HelpCircle } from 'lucide-react';

interface StepAssistantTipProps {
  title: string;
  description: string;
  tipBadge?: string;
  plainEnglishExplanation?: string;
}

export const StepAssistantTip: React.FC<StepAssistantTipProps> = ({
  title,
  description,
  tipBadge = '✨ Quick Guide',
  plainEnglishExplanation
}) => {
  const [showExplanation, setShowExplanation] = React.useState(false);

  return (
    <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-lg space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 shrink-0">
            <Lightbulb className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {tipBadge}
              </span>
              <h4 className="text-sm font-bold text-slate-100">{title}</h4>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{description}</p>
          </div>
        </div>

        {plainEnglishExplanation && (
          <button
            type="button"
            onClick={() => setShowExplanation(!showExplanation)}
            className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-emerald-300 text-xs font-bold transition-all shrink-0 hover:scale-105"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showExplanation ? 'Hide Explanation' : '💡 Explain Like I\'m 5'}</span>
          </button>
        )}
      </div>

      {showExplanation && plainEnglishExplanation && (
        <div className="mt-3 p-3.5 bg-slate-950 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 leading-relaxed font-sans animate-fade-in flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-300 block mb-1">Plain-English Summary:</strong>
            {plainEnglishExplanation}
          </div>
        </div>
      )}
    </div>
  );
};
