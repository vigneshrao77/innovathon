
import React from 'react';
import { AppStep } from '../types';
import { BookOpen, BarChart3, Upload, CheckCircle2, RefreshCw } from 'lucide-react';

interface SidebarProps {
  currentStep: AppStep;
  onReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep, onReset }) => {
  const steps = [
    { id: AppStep.UPLOAD, label: 'Upload & Input', icon: Upload },
    { id: AppStep.PROCESSING, label: 'NLP Analysis', icon: BookOpen },
    { id: AppStep.RESULTS, label: 'Effectiveness Results', icon: BarChart3 },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">CurriAlign</h1>
        </div>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Academic Effectiveness</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isDone = steps.findIndex(s => s.id === currentStep) > steps.findIndex(s => s.id === step.id);

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-500'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              )}
              <span className={`font-medium ${isActive ? 'text-blue-700' : ''}`}>{step.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 transition-colors text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          New Analysis
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
