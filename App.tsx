import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ControlPanel } from './components/ControlPanel';
import { ImageDisplay } from './components/ImageDisplay';
import { generateEditedImage } from './services/geminiService';
import { AppState, ProcessingState, EditedImage } from './types';
import { Toaster, toast } from 'react-hot-toast';

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    originalImage: null,
    currentImage: null, // The image currently being viewed/edited
    history: [],
    processingState: ProcessingState.IDLE,
    error: null,
  });

  const [prompt, setPrompt] = useState('');

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setAppState(prev => ({
        ...prev,
        originalImage: result,
        currentImage: result,
        history: [], // Reset history on new upload
        error: null,
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleGenerate = async (isHighQuality: boolean) => {
    if (!appState.currentImage || !prompt) {
      toast.error("Please upload an image and enter a prompt.");
      return;
    }

    setAppState(prev => ({ ...prev, processingState: ProcessingState.PROCESSING, error: null }));
    const loadingToast = toast.loading(isHighQuality ? "Upscaling to 4K..." : "Editing with Nano Banana...");

    try {
      // For 4K, we might need to prompt for API key first if not selected
      if (isHighQuality) {
        // We do this check inside the service or here. 
        // Ideally the service handles the specific model call logic.
      }

      const resultImageBase64 = await generateEditedImage(
        appState.currentImage,
        prompt,
        isHighQuality
      );

      const newEdit: EditedImage = {
        id: Date.now().toString(),
        dataUrl: resultImageBase64,
        prompt: prompt,
        timestamp: Date.now(),
        isHighQuality,
      };

      setAppState(prev => ({
        ...prev,
        currentImage: resultImageBase64,
        history: [newEdit, ...prev.history],
        processingState: ProcessingState.IDLE,
      }));
      
      toast.success(isHighQuality ? "4K Image Generated!" : "Image Edited!", { id: loadingToast });

    } catch (err: any) {
      console.error(err);
      setAppState(prev => ({
        ...prev,
        processingState: ProcessingState.ERROR,
        error: err.message || "An error occurred",
      }));
      toast.error(`Error: ${err.message}`, { id: loadingToast });
    }
  };

  const handleSelectHistoryItem = (item: EditedImage) => {
    setAppState(prev => ({ ...prev, currentImage: item.dataUrl }));
  };

  const handleReset = () => {
    setAppState(prev => ({ ...prev, currentImage: prev.originalImage }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white selection:bg-indigo-500 selection:text-white">
      <Toaster position="bottom-center" toastOptions={{
        style: {
          background: '#334155',
          color: '#fff',
        },
      }} />
      
      <Header />

      <main className="flex-grow container mx-auto px-4 py-6 flex flex-col gap-6 max-w-6xl">
        
        {/* Top Section: Upload & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 flex flex-col gap-4">
             {/* If no image, show uploader. If image, show mini-preview/reset and controls */}
             {!appState.originalImage ? (
               <div className="h-full min-h-[300px]">
                 <ImageUploader onUpload={handleImageUpload} />
               </div>
             ) : (
                <div className="flex flex-col gap-4">
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-400">Original Source</span>
                        <button onClick={handleReset} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Reset to Original</button>
                     </div>
                     <img 
                      src={appState.originalImage} 
                      alt="Original" 
                      className="w-full h-32 object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer border border-slate-600" 
                      onClick={handleReset}
                     />
                  </div>
                  
                  <ControlPanel 
                    prompt={prompt} 
                    setPrompt={setPrompt} 
                    onGenerate={() => handleGenerate(false)} 
                    onUpscale={() => handleGenerate(true)}
                    isProcessing={appState.processingState === ProcessingState.PROCESSING}
                  />
                </div>
             )}
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-1 flex-grow min-h-[500px] relative overflow-hidden shadow-2xl">
               <ImageDisplay 
                  currentImage={appState.currentImage} 
                  originalImage={appState.originalImage}
                  isProcessing={appState.processingState === ProcessingState.PROCESSING}
               />
            </div>
          </div>
          
        </div>

        {/* Bottom Section: History */}
        {appState.history.length > 0 && (
          <div className="mt-4">
             <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">History</h3>
             <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
               {appState.history.map((item) => (
                 <button 
                  key={item.id}
                  onClick={() => handleSelectHistoryItem(item)}
                  className={`flex-shrink-0 group relative w-32 h-32 rounded-lg overflow-hidden border-2 transition-all ${appState.currentImage === item.dataUrl ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-700 hover:border-slate-500'}`}
                 >
                   <img src={item.dataUrl} alt={item.prompt} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                     <p className="text-xs text-white truncate w-full text-left">{item.prompt}</p>
                   </div>
                   {item.isHighQuality && (
                     <div className="absolute top-1 right-1 bg-yellow-500/90 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">4K</div>
                   )}
                 </button>
               ))}
             </div>
          </div>
        )}
      </main>
    </div>
  );
}