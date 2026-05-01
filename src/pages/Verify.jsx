import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import { UploadCloud, File, FileText, Bot, CheckCircle2, Loader2, AlertCircle, Type, Send } from 'lucide-react';
import { useVerificationStore } from '../store/useVerificationStore';
import { ResultsDashboard } from '../components/verify/ResultsDashboard';

export function Verify() {
  const { status, file, errorMsg, uploadProgress, startVerification, verifyText } = useVerificationStore();
  const [inputMode, setInputMode] = useState('file'); // 'file' or 'text'
  const [pastedText, setPastedText] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      startVerification(acceptedFiles[0]);
    }
  }, [startVerification]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1
  });

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (pastedText.trim().length < 50) {
      alert("Please paste more text for an accurate analysis (min 50 characters).");
      return;
    }
    verifyText(pastedText);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl relative z-10">
        
        {/* Hide header when success so dashboard gets full focus */}
        {status !== 'success' && (
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Verify your offer
            </h1>
            <p className="text-slate-400 text-lg">
              Upload your offer letter to get an instant scam-check verdict.
            </p>
          </div>
        )}

        <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden min-h-[400px] flex flex-col relative transition-all duration-500 ease-out ${status === 'success' ? 'max-w-4xl mx-auto ring-1 ring-white/20' : 'max-w-3xl mx-auto'}`}>
          
          {/* Input Mode Tabs */}
          {status === 'idle' && (
            <div className="flex border-b border-white/10">
              <button 
                onClick={() => setInputMode('file')}
                className={`flex-1 py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${inputMode === 'file' ? 'text-cyan-400 bg-white/5 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <UploadCloud className="w-4 h-4" />
                Upload File
              </button>
              <button 
                onClick={() => setInputMode('text')}
                className={`flex-1 py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${inputMode === 'text' ? 'text-indigo-400 bg-white/5 border-b-2 border-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Type className="w-4 h-4" />
                Paste Text
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {status === 'idle' && inputMode === 'file' && (
              <motion.div
                key="file-idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col items-center justify-center p-10 lg:p-16"
              >
                <div 
                  {...getRootProps()} 
                  className={`w-full max-w-xl p-12 border-2 border-dashed rounded-3xl text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
                    isDragActive ? 'border-cyan-400 bg-cyan-400/5' : 'border-white/20 hover:border-indigo-400 hover:bg-white/5'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 shadow-sm">
                    <UploadCloud className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Drag & drop your file here</h3>
                  <p className="text-slate-400 mb-6">or click to browse from your device</p>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-slate-300 text-xs font-medium rounded-full">PDF format</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-slate-300 text-xs font-medium rounded-full">Images (JPG, PNG)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'idle' && inputMode === 'text' && (
              <motion.div
                key="text-idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col p-10 lg:p-16"
              >
                <form onSubmit={handleTextSubmit} className="flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">Paste offer letter text</h3>
                    <p className="text-slate-400 text-sm">Include company name, salary, and any contact details mentioned.</p>
                  </div>
                  <textarea 
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder="Paste the offer letter content here... (e.g. Dear Candidate, we are pleased to offer you...)"
                    className="flex-1 min-h-[200px] bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none mb-6"
                  />
                  <button 
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                    disabled={!pastedText.trim()}
                  >
                    <Send className="w-5 h-5" />
                    Analyze Text Now
                  </button>
                </form>
              </motion.div>
            )}

            {['uploading', 'extracting', 'analyzing'].includes(status) && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col items-center justify-center p-10 lg:p-16"
              >
                <div className="w-full max-w-md">
                  <div className="flex items-center gap-4 mb-10 p-4 border border-white/10 bg-white/5 rounded-2xl shadow-sm relative overflow-hidden">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <File className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div className="flex-1 truncate">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className="text-white font-medium truncate pr-2">{file?.name || 'document.pdf'}</h4>
                        {status === 'uploading' && (
                          <span className="text-cyan-400 text-xs font-semibold tabular-nums">{uploadProgress}%</span>
                        )}
                      </div>
                      <p className="text-slate-400 text-xs space-x-2">
                        <span>{file ? (file.size / 1024 / 1024).toFixed(2) : '1.2'} MB</span>
                      </p>
                      {status === 'uploading' && (
                        <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden border border-white/5">
                          <div 
                            className="bg-cyan-400 h-full rounded-full transition-all duration-300 ease-out relative"
                            style={{ width: `${uploadProgress}%` }}
                          >
                            <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    {status === 'uploading' ? (
                      <Loader2 className="w-5 h-5 text-cyan-400 animate-spin shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${status === 'uploading' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {status === 'uploading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${status === 'uploading' ? 'text-white' : 'text-slate-300'}`}>Connecting...</h4>
                        <p className="text-slate-500 text-sm">Securely uploading file</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        status === 'uploading' ? 'bg-white/5 border border-white/10 text-slate-500' : 
                        status === 'extracting' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 
                        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {status === 'extracting' ? <Loader2 className="w-5 h-5 animate-spin" /> : 
                         status === 'uploading' ? <FileText className="w-5 h-5" /> : 
                         <CheckCircle2 className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          status === 'extracting' ? 'text-white' : 
                          status === 'uploading' ? 'text-slate-500' : 
                          'text-slate-300'
                        }`}>Extracting Context</h4>
                        <p className="text-slate-500 text-sm">Parsing text and layout structures</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        status === 'analyzing' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 
                        'bg-white/5 border border-white/10 text-slate-500'
                      }`}>
                        {status === 'analyzing' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Bot className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${status === 'analyzing' ? 'text-white' : 'text-slate-500'}`}>AI Analysis</h4>
                        <p className="text-slate-500 text-sm">Cross-referencing 20+ scam patterns</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col items-center justify-center p-10 lg:p-16 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mb-6 shadow-sm border border-red-500/30">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Verification Failed</h3>
                <p className="text-red-400 mb-8 max-w-md mx-auto">{errorMsg || "An unknown error occurred."}</p>
                
                <button 
                  onClick={() => useVerificationStore.getState().reset()}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors rounded-xl font-medium text-white tracking-wide"
                >
                  Try Another File
                </button>
              </motion.div>
            )}

            {status === 'success' && (
              <ResultsDashboard key="success" />
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
