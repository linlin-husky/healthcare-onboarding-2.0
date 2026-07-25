import React, { useState } from 'react';
import { HelpCircle, Info, ChevronRight, BookOpen } from 'lucide-react';

interface TooltipProps {
  title: string;
  explanation: string;
  whyEmmeNeedsThis?: string;
  eobLocation?: string;
  onOpenLocator?: () => void;
}

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  explanation,
  whyEmmeNeedsThis,
  eobLocation,
  onOpenLocator
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center ml-1.5 align-middle">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-emerald-400 hover:text-emerald-300 transition-colors p-0.5 rounded-full hover:bg-emerald-500/10 focus:outline-none focus:ring-1 focus:ring-emerald-400"
        aria-label={`Explanation for ${title}`}
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 sm:w-80 p-4 rounded-xl glass-panel bg-slate-900/95 border border-slate-700 shadow-2xl text-left text-xs text-slate-200 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <h4 className="font-semibold text-slate-100 text-sm">{title}</h4>
          </div>

          <p className="text-slate-300 leading-relaxed mb-2.5">
            {explanation}
          </p>

          {whyEmmeNeedsThis && (
            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 mb-2">
              <span className="font-semibold block mb-0.5 text-[11px] uppercase tracking-wider text-emerald-400">
                Why Emme Needs This:
              </span>
              <p className="text-[11px] leading-snug">{whyEmmeNeedsThis}</p>
            </div>
          )}

          {eobLocation && (
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-cyan-400" />
                {eobLocation}
              </span>
              {onOpenLocator && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                    onOpenLocator();
                  }}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-0.5 hover:underline"
                >
                  View on sample doc <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {/* Arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-900" />
        </div>
      )}
    </div>
  );
};
