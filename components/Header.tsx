import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="container mx-auto flex justify-between items-center max-w-6xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-900">
              <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436h.001c-1.303 1.013-2.614 1.838-3.924 2.497-2.35 1.183-4.52 1.34-6.326.697C2.964 16.398.75 12.2.75 7.5a.75.75 0 01.75-.75c4.699 0 8.897 2.213 10.385 5.426.643 1.805.485 3.975-.698 6.325-.658 1.31-1.483 2.62-2.496 3.924a.75.75 0 01-1.182-1.018c.99-1.278 1.796-2.556 2.438-3.834.793-1.577 1.057-3.058.825-4.405-1.347.232-2.827-.032-4.404-.825-1.278-.642-2.556-1.448-3.834-2.438a.75.75 0 011.018-1.182c1.304.658 2.615 1.483 3.924 2.496 1.805 1.405 3.975 1.564 6.326.698 3.213-1.183 5.426-5.381 5.426-10.08a.75.75 0 01.75-.75c-4.699 0-8.898 2.213-10.386 5.426-.643 1.805-.485 3.975.698 6.326.658 1.309 1.483 2.62 2.496 3.924a.75.75 0 01-1.182 1.018c-.99-1.278-1.796-2.557-2.438-3.834-.793-1.577-1.057-3.058-.825-4.405 1.347.232 2.827-.032 4.404-.825 1.278-.643 2.557-1.448 3.834-2.439a.75.75 0 011.018 1.182z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              NanoEdit
            </h1>
            <p className="text-xs text-slate-500 font-medium">Free AI Image Editor</p>
          </div>
        </div>
      </div>
    </header>
  );
};