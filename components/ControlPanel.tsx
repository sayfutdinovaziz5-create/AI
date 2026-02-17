import React from 'react';

interface ControlPanelProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onGenerate: () => void;
  onUpscale: () => void;
  isProcessing: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  prompt, 
  setPrompt, 
  onGenerate, 
  onUpscale,
  isProcessing 
}) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl flex flex-col gap-5">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Edit Instruction
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Make it look like a cyberpunk city' or 'Add a cat on the table'"
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-32 transition-all"
          disabled={isProcessing}
        />
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onGenerate}
          disabled={isProcessing || !prompt.trim()}
          className={`
            w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all
            ${isProcessing || !prompt.trim()
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 active:scale-[0.98]'
            }
          `}
        >
          {isProcessing ? (
             <>
               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               <span>Processing...</span>
             </>
          ) : (
            <>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436h.001c-1.303 1.013-2.614 1.838-3.924 2.497-2.35 1.183-4.52 1.34-6.326.697C2.964 16.398.75 12.2.75 7.5a.75.75 0 01.75-.75c4.699 0 8.897 2.213 10.385 5.426.643 1.805.485 3.975-.698 6.325-.658 1.31-1.483 2.62-2.496 3.924a.75.75 0 01-1.182-1.018c.99-1.278 1.796-2.556 2.438-3.834.793-1.577 1.057-3.058.825-4.405-1.347.232-2.827-.032-4.404-.825-1.278-.642-2.556-1.448-3.834-2.438a.75.75 0 011.018-1.182c1.304.658 2.615 1.483 3.924 2.496 1.805 1.405 3.975 1.564 6.326.698 3.213-1.183 5.426-5.381 5.426-10.08a.75.75 0 01.75-.75c-4.699 0-8.898 2.213-10.386 5.426-.643 1.805-.485 3.975.698 6.326.658 1.309 1.483 2.62 2.496 3.924a.75.75 0 01-1.182 1.018c-.99-1.278-1.796-2.557-2.438-3.834-.793-1.577-1.057-3.058-.825-4.405 1.347.232 2.827-.032 4.404-.825 1.278-.643 2.557-1.448 3.834-2.439a.75.75 0 011.018 1.182z" clipRule="evenodd" />
               </svg>
               <span>Generate Edit (Fast)</span>
            </>
          )}
        </button>

        <button
          onClick={onUpscale}
          disabled={isProcessing || !prompt.trim()}
          className={`
            w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all border
            ${isProcessing || !prompt.trim()
              ? 'border-slate-700 text-slate-500 cursor-not-allowed bg-transparent'
              : 'border-green-500/50 text-green-400 hover:bg-green-500/10 active:scale-[0.98]'
            }
          `}
        >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
             <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
           </svg>
           <span>Enhance to 4K (Free)</span>
        </button>
      </div>
      
      <p className="text-xs text-slate-500 text-center">
        All modes powered by Nano Banana (Gemini 2.5 Flash). <br/>
        4K mode uses enhanced prompting for higher detail.
      </p>
    </div>
  );
};