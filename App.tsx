
import React, { useState, useCallback } from 'react';
import { AppStep, AnalysisResult, ProcessingPhase } from './types';
import { CurriculumService } from './services/geminiService';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ResultsDashboard from './components/ResultsDashboard';
import { Loader2, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.UPLOAD);
  const [phase, setPhase] = useState<ProcessingPhase>(ProcessingPhase.PDF_PARSING);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartAnalysis = useCallback(async (syllabusText: string) => {
    setError(null);
    setStep(AppStep.PROCESSING);
    
    const phases = Object.values(ProcessingPhase);
    let currentPhaseIdx = 0;
    
    const phaseInterval = setInterval(() => {
      if (currentPhaseIdx < phases.length - 1) {
        currentPhaseIdx++;
        setPhase(phases[currentPhaseIdx]);
      }
    }, 1500);

    try {
      const service = new CurriculumService();
      const result = await service.analyzeCurriculum(syllabusText);
      
      // Delay for UX to show phase progress
      await new Promise(r => setTimeout(r, 2000));
      
      clearInterval(phaseInterval);
      setAnalysisResult(result);
      setStep(AppStep.RESULTS);
    } catch (err: any) {
      clearInterval(phaseInterval);
      setError(err.message || "An unexpected error occurred during analysis.");
      setStep(AppStep.UPLOAD);
    }
  }, []);

  const handleReset = () => {
    setStep(AppStep.UPLOAD);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentStep={step} onReset={handleReset} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6 md:p-12">
          {error && (
            <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="font-bold">!</span>
              </div>
              <div>
                <p className="font-semibold">Analysis Error</p>
                <p className="text-sm opacity-80">{error}</p>
              </div>
            </div>
          )}

          {step === AppStep.UPLOAD && (
            <FileUpload onAnalyze={handleStartAnalysis} />
          )}

          {step === AppStep.PROCESSING && (
            <div className="flex flex-col items-center justify-center h-full max-w-xl mx-auto text-center space-y-8 animate-in fade-in zoom-in duration-500">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                  <Activity className="w-12 h-12 text-blue-600 animate-pulse" />
                </div>
                <div className="absolute top-0 right-0">
                  <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Processing Pipeline</h2>
                <p className="text-blue-600 font-mono text-sm font-semibold tracking-widest uppercase">
                  {phase}
                </p>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-4">
                  <div 
                    className="bg-blue-600 h-full transition-all duration-1000 ease-out"
                    style={{ width: `${((Object.values(ProcessingPhase).indexOf(phase) + 1) / Object.values(ProcessingPhase).length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full text-left">
                {Object.values(ProcessingPhase).map((p, idx) => {
                  const isCurrent = p === phase;
                  const isDone = Object.values(ProcessingPhase).indexOf(phase) > idx;
                  return (
                    <div key={p} className={`p-3 rounded-lg border text-xs flex items-center gap-2 transition-all ${
                      isCurrent ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' : 
                      isDone ? 'bg-green-50 border-green-100 text-green-700' : 
                      'bg-white border-slate-100 text-slate-400'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-blue-600' : isDone ? 'bg-green-600' : 'bg-slate-300'}`} />
                      {p.split('...')[0]}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === AppStep.RESULTS && analysisResult && (
            <ResultsDashboard result={analysisResult} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
