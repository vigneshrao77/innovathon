
import React, { useState } from 'react';
import { FileText, Upload, Trash2, Send, Database, Lightbulb, FileSearch } from 'lucide-react';

interface FileUploadProps {
  onAnalyze: (syllabus: string) => void;
}

const SAMPLE_SYLLABUS = `COURSE SYLLABUS: APPLIED COMPUTER SCIENCE
Course Overview: This course focuses on modern software engineering practices.
Learning Outcomes:
- Build scalable cloud architectures.
- Implement secure data management systems.
- Master DevOps CI/CD automation.

MODULES:
1. Advanced Web Architectures: Microservices, React, State Management.
2. Data Persistence: PostgreSQL, NoSQL Scalability, Distributed Caching.
3. DevOps & Cloud: AWS Lambda, Docker Orchestration, Terraform.
4. UI/UX Engineering: Accessibility Standards, User Research, Figma Prototyping.
5. Ethics in AI: Bias detection, Responsible ML deployment.`;

const FileUpload: React.FC<FileUploadProps> = ({ onAnalyze }) => {
  const [syllabusText, setSyllabusText] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!syllabusText.trim()) return;
    onAnalyze(syllabusText);
  };

  const loadSamples = () => {
    setSyllabusText(SAMPLE_SYLLABUS);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSyllabusText(event.target?.result as string || '');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-2 border border-blue-100 shadow-sm">
          <Database className="w-3.5 h-3.5" />
          Industry Alignment Engine v2.0
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Curriculum Analysis</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
          Upload or paste your syllabus to evaluate subject importance weights and industry readiness.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={loadSamples}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl transition-all text-sm font-bold border border-indigo-100 shadow-sm"
        >
          <Lightbulb className="w-4 h-4" />
          Load Full Sample Syllabus
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Syllabus Workspace</label>
            <div className="flex gap-3">
               <input
                type="file"
                id="syllabus-file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".txt,.md"
              />
              <label
                htmlFor="syllabus-file"
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl cursor-pointer transition-all text-sm font-bold border border-slate-200"
              >
                <Upload className="w-4 h-4" />
                Upload PDF/Text
              </label>
              {syllabusText && (
                <button
                  type="button"
                  onClick={() => setSyllabusText('')}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Clear Workspace"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div 
            className={`relative group transition-all duration-300 ${isDragging ? 'scale-[1.01]' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => setSyllabusText(event.target?.result as string || '');
                reader.readAsText(file);
              }
            }}
          >
            <textarea
              value={syllabusText}
              onChange={(e) => setSyllabusText(e.target.value)}
              placeholder="Paste syllabus modules, course outcomes, and technical descriptions here..."
              className={`w-full h-[500px] p-8 bg-white border rounded-[2.5rem] shadow-2xl shadow-slate-200/60 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none text-slate-700 font-medium leading-relaxed ${
                isDragging ? 'border-blue-500 bg-blue-50/20' : 'border-slate-200'
              }`}
              required
            />
            {!syllabusText && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20 space-y-4">
                <FileSearch className="w-32 h-32 text-slate-400" />
                <p className="text-slate-500 font-bold text-xl uppercase tracking-widest">Workspace Empty</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 py-8">
          <button
            type="submit"
            disabled={!syllabusText.trim()}
            className="group flex items-center gap-4 px-16 py-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-[2rem] font-black text-2xl shadow-2xl shadow-blue-400/40 transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
          >
            Run Pipeline Analysis
            <Send className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>
          
          <div className="flex items-center gap-8 text-slate-400">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-[10px]">NLP Parsing</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-[10px]">Skill Mapping</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-[10px]">Weight Calc</span>
             </div>
          </div>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <FileText className="w-5 h-5" />
          </div>
          <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider">Single Input</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">Just paste your document. Our NLP engine automatically extracts outcomes and modules.</p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Database className="w-5 h-5" />
          </div>
          <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider">Industry Datasets</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">Mapping against real-time 2024 tech stack requirements across FAANG and high-growth startups.</p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider">Smart Weights</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">Relative importance calculated using term frequency and industry relevance vectors.</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
