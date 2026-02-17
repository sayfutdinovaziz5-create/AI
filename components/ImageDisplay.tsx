import React, { useState, useEffect } from 'react';

interface ImageDisplayProps {
  currentImage: string | null;
  originalImage: string | null;
  isProcessing: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ 
  currentImage, 
  originalImage, 
  isProcessing 
}) => {
  const [showOriginal, setShowOriginal] = useState(false);
  
  // Reset view when processing starts or image changes
  useEffect(() => {
    setShowOriginal(false);
  }, [currentImage, isProcessing]);

  if (!currentImage) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-slate-600 bg-slate-900/50">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto mb-2 opacity-50">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <p>Generated image will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative group flex items-center justify-center bg-black/20">
      <img 
        src={showOriginal && originalImage ? originalImage : currentImage} 
        alt="Preview" 
        className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${isProcessing ? 'opacity-50 blur-sm scale-95' : 'opacity-100 scale-100'}`}
      />
      
      {isProcessing && (
         <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-white font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">Generating...</p>
         </div>
      )}

      {/* Compare Button */}
      {originalImage && currentImage !== originalImage && !isProcessing && (
        <button
          className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white text-sm px-4 py-2 rounded-full backdrop-blur-md transition-all flex items-center gap-2 border border-white/10"
          onMouseDown={() => setShowOriginal(true)}
          onMouseUp={() => setShowOriginal(false)}
          onMouseLeave={() => setShowOriginal(false)}
          onTouchStart={() => setShowOriginal(true)}
          onTouchEnd={() => setShowOriginal(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Hold to Compare
        </button>
      )}
      
      {/* Label for current view */}
      <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-mono px-2 py-1 rounded backdrop-blur-md border border-white/10 pointer-events-none">
         {showOriginal ? 'ORIGINAL' : 'GENERATED'}
      </div>
    </div>
  );
};