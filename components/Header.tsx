
import React from 'react';
import { 
  User, 
  Bell, 
  Search, 
  Settings, 
  HelpCircle, 
  LayoutDashboard, 
  BookOpenCheck, 
  TrendingUp,
  BarChart3
} from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 md:px-10 transition-all">
      {/* Mobile Brand / Left Section */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="text-white w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-800">CurriAlign</h1>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl">
            <LayoutDashboard className="w-4 h-4" />
            Workspace
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
            <BookOpenCheck className="w-4 h-4" />
            Library
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
            <TrendingUp className="w-4 h-4" />
            Benchmarks
          </button>
        </nav>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-2.5 bg-slate-100 border-transparent border-2 focus:bg-white focus:border-blue-500 focus:ring-0 rounded-2xl text-sm font-medium transition-all outline-none text-slate-700"
            placeholder="Search syllabi, skills, or subjects..."
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 border border-slate-200 rounded text-[10px] font-mono font-medium text-slate-400 bg-white">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
      
      {/* Right Action Group */}
      <div className="flex items-center gap-2 md:gap-5">
        <div className="hidden sm:flex items-center gap-1">
          <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="h-8 w-px bg-slate-200 mx-1 hidden md:block"></div>

        <button className="flex items-center gap-3 p-1.5 pl-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all group">
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-xs font-black text-slate-900 leading-none">Judge Session</span>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">Premium Expert</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
            JS
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
