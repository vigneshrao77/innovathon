
import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  Award, Target, Layout, CheckCircle, FileJson, ExternalLink, 
  Tags, Cpu, Info, ChevronRight, Hash 
} from 'lucide-react';

interface ResultsDashboardProps {
  result: AnalysisResult;
}

const COLORS = ['#2563eb', '#4f46e5', '#7c3aed', '#9333ea', '#c026d3', '#db2777', '#dc2626'];

/**
 * A sub-component to handle skill lists with intelligent truncation and popover
 */
const SkillBadgeList: React.FC<{ skills: string[], color: string }> = ({ skills, color }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const limit = 3;
  const hasMore = skills.length > limit;
  const displayedSkills = isExpanded ? skills : skills.slice(0, limit);

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 max-w-sm">
        {displayedSkills.map((skill, idx) => (
          <span 
            key={idx} 
            className="bg-white border border-slate-200 text-slate-700 text-[10px] md:text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all cursor-default flex items-center gap-1.5"
          >
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
            {skill}
          </span>
        ))}
        
        {hasMore && !isExpanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
            className="bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-black px-3 py-1.5 rounded-lg shadow-sm hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1 group/btn"
          >
            +{skills.length - limit} more
            <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        )}

        {isExpanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
            className="text-blue-600 text-[10px] font-bold underline hover:text-blue-800 ml-1"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000 pb-20">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-8 border-b border-slate-200">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Effectiveness Analysis</h2>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500" />
            Comparative Subject Importance & Skill-Industry Mapping Matrix
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <FileJson className="w-4 h-4 text-blue-600" />
            Export Raw Data
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            Download PDF Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
            <Award className="w-8 h-8" />
          </div>
          <h4 className="text-4xl font-black text-slate-900">{result.overallScore}%</h4>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Readiness Score</p>
        </div>
        
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
            <Target className="w-8 h-8" />
          </div>
          <h4 className="text-4xl font-black text-slate-900">{result.topSkillsCovered.length}</h4>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Skills Mapped</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-purple-500/5 transition-all">
          <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-4">
            <Layout className="w-8 h-8" />
          </div>
          <h4 className="text-4xl font-black text-slate-900">{result.subjects.length}</h4>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Active Subjects</p>
        </div>

        <div className="bg-blue-600 p-8 rounded-[2rem] shadow-lg shadow-blue-200 text-white hover:scale-105 transition-all">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h4 className="text-4xl font-black">High</h4>
          <p className="text-sm font-bold text-blue-100 uppercase tracking-widest mt-1">Industry Alignment</p>
        </div>
      </div>

      {/* Primary Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-slate-900">Relative Subject Importance</h3>
            <p className="text-slate-500 mt-2">Weight allocation based on total curriculum effectiveness (100% Scale)</p>
          </div>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={result.subjects} layout="vertical" margin={{ left: 20, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis 
                  dataKey="subjectName" 
                  type="category" 
                  tick={{ fontSize: 13, fontWeight: 700, fill: '#475569' }} 
                  width={150}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '15px' }}
                />
                <Bar dataKey="importanceScore" radius={[0, 12, 12, 0]} barSize={32}>
                  {result.subjects.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-black text-slate-900">Subject Distribution</h3>
            <p className="text-slate-500 mt-2">Visualizing the core focus areas of the syllabus</p>
          </div>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={result.subjects}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={130}
                  paddingAngle={8}
                  dataKey="importanceScore"
                  nameKey="subjectName"
                  stroke="none"
                >
                  {result.subjects.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Mapping Matrix Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-2xl font-black text-slate-900">Subject-to-Skill Mapping Matrix</h3>
            <p className="text-slate-500 mt-1 font-medium">NLP-extracted cross-referencing with industry benchmarks</p>
          </div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            <CheckCircle className="w-4 h-4" />
            Verified Alignment
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-10 py-6">
                  <div className="flex items-center gap-2">
                    <Layout className="w-3 h-3" />
                    Subject Area
                  </div>
                </th>
                <th className="px-10 py-6">
                  <div className="flex items-center gap-2">
                    <Hash className="w-3 h-3" />
                    Weight (%)
                  </div>
                </th>
                <th className="px-10 py-6">
                  <div className="flex items-center gap-2">
                    <Target className="w-3 h-3" />
                    Industry Relevance
                  </div>
                </th>
                <th className="px-10 py-6">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3 h-3" />
                    Competencies Covered
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {result.subjects.map((subject, idx) => {
                const rowColor = COLORS[idx % COLORS.length];
                return (
                  <tr key={idx} className="group hover:bg-blue-50/40 transition-all duration-300">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-10 rounded-full" style={{ backgroundColor: rowColor }}></div>
                        <span className="font-black text-slate-800 text-lg leading-tight">{subject.subjectName}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <span className="text-2xl font-black text-slate-900">{subject.importanceScore}%</span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                          <div 
                            className="h-full transition-all duration-1000 ease-out" 
                            style={{ 
                              width: `${subject.importanceScore}%`,
                              backgroundColor: rowColor 
                            }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="relative group/tooltip">
                        <p className="text-slate-600 text-sm leading-relaxed max-w-[240px] italic font-medium">
                          "{subject.industryRelevance}"
                        </p>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <SkillBadgeList skills={subject.mappedSkills} color={rowColor} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 transform group-hover:scale-110 transition-transform duration-700 pointer-events-none">
            <Target className="w-48 h-48" />
          </div>
          <h3 className="text-3xl font-black mb-6 flex items-center gap-3">
            <Target className="text-blue-400 w-8 h-8" />
            Alignment Summary
          </h3>
          <p className="text-xl leading-relaxed text-slate-300 font-medium relative z-10">
            {result.industryAlignmentSummary}
          </p>
          <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-400" />
             </div>
             <p className="text-sm font-bold text-slate-400">Analysis validated against global tech benchmarks 2024-2025.</p>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100">
          <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <Tags className="w-6 h-6 text-blue-600" />
            Top Extracted Topics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {result.extractedTopics.map((topic, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all cursor-default group">
                <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
                <span className="text-slate-700 font-bold text-sm tracking-tight">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
