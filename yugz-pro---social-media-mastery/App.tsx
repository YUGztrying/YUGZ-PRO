
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Kanban, 
  Settings, 
  Bell, 
  Search,
  Zap,
  ChevronRight,
  LogOut,
  Plus,
  Star,
  Clock,
  ChevronDown,
  Rocket,
  PlusCircle,
  Hash
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Editor } from './components/Editor';
import { ProjectBoard } from './components/ProjectBoard';
import { QuickActions } from './components/QuickActions';
import { WorkspacePage, Block, PageType } from './types';

const INITIAL_PAGES: WorkspacePage[] = [
  { 
    id: 'p1', 
    title: 'Business Strategy 2024', 
    icon: '🚀', 
    isFavorite: true,
    blocks: [
      { id: 'b1', type: 'h1', content: 'Omni-Strategy' },
      { id: 'b2', type: 'text', content: 'The plan to dominate the hospitality and automotive automation market.' },
      { id: 'b3', type: 'project-tracker', content: [
        { id: '1', name: 'BADAGUESTHOUSE', status: 'active', nextAction: 'SEO Optimization' },
        { id: '2', name: 'YECARS Sales Bot', status: 'blocked', nextAction: 'Finish training dataset' }
      ] },
      { id: 'b4', type: 'h2', content: 'Key Goals' },
      { id: 'b5', type: 'todo', content: { text: 'Automate guest check-ins', checked: false } },
      { id: 'b6', type: 'todo', content: { text: 'IFC Finance Certification', checked: true } },
    ]
  },
  { id: 'p2', title: 'BADAGUESTHOUSE Growth', icon: '🏠', blocks: [] }
];

const App: React.FC = () => {
  const [pages, setPages] = useState<WorkspacePage[]>(INITIAL_PAGES);
  const [activePageId, setActivePageId] = useState<string>('dashboard');

  const activePage = pages.find(p => p.id === activePageId);

  const createPage = () => {
    const newPage: WorkspacePage = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Page',
      icon: '📄',
      blocks: [{ id: 'b1', type: 'text', content: '' }]
    };
    setPages([...pages, newPage]);
    setActivePageId(newPage.id);
  };

  const updatePageBlocks = (id: string, blocks: Block[]) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, blocks } : p));
  };

  const updatePageTitle = (id: string, title: string) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, title } : p));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0b0f1a] text-slate-300 selection:bg-indigo-500/30">
      {/* Sidebar */}
      <aside className={`w-full md:w-64 glass-dark border-r border-white/5 flex flex-col z-20 transition-all duration-300`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="text-white fill-white" size={18} />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-white">
              YUGZ<span className="text-indigo-500">.</span>PRO
            </h1>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <button 
                onClick={() => setActivePageId('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  activePageId === 'dashboard' ? 'bg-white/5 text-white' : 'text-slate-500 hover:text-white'
                }`}
              >
                <LayoutDashboard size={18} />
                <span className="text-sm font-semibold">Home Feed</span>
              </button>

              <button 
                onClick={() => setActivePageId('board')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  activePageId === 'board' ? 'bg-white/5 text-white' : 'text-slate-500 hover:text-white'
                }`}
              >
                <Kanban size={18} />
                <span className="text-sm font-semibold">Project Board</span>
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between px-3 mb-2">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">My Pages</p>
                <button onClick={createPage} className="text-slate-600 hover:text-indigo-400"><PlusCircle size={14} /></button>
              </div>
              <nav className="space-y-0.5">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => setActivePageId(page.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${
                      activePageId === page.id 
                      ? 'bg-indigo-600/10 text-indigo-400' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg leading-none">{page.icon}</span>
                    <span className="font-medium text-sm truncate">{page.title || 'Untitled'}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3">
             <img src="https://picsum.photos/seed/yugz_pro/40/40" className="w-8 h-8 rounded-lg border border-white/10" alt="Avatar" />
             <div className="flex-1 min-w-0">
               <p className="text-xs font-bold text-white truncate">Yugz</p>
               <p className="text-[10px] text-slate-500">Workspace Owner</p>
             </div>
             <Settings size={14} className="text-slate-600 hover:text-white cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0b0f1a]">
        <header className="glass-dark border-b border-white/5 px-8 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span className="font-medium text-slate-500">Omnispace</span>
              <ChevronRight size={14} />
              <span className="text-slate-200 font-bold tracking-tight">
                {activePageId === 'dashboard' ? 'Home Feed' : activePageId === 'board' ? 'Project Board' : activePage?.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
              <Search size={16} className="text-slate-600" />
              <span className="text-xs text-slate-600">Search Workspace...</span>
              <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-slate-700">⌘K</span>
            </div>
            <div className="h-6 w-[1px] bg-white/5 mx-2"></div>
            <button className="text-slate-400 hover:text-white font-bold text-xs">Share</button>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg">Publish</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {activePageId === 'dashboard' ? (
            <div className="p-8 max-w-7xl mx-auto">
              <Dashboard />
            </div>
          ) : activePageId === 'board' ? (
            <div className="p-8 max-w-7xl mx-auto">
              <ProjectBoard />
            </div>
          ) : activePage ? (
            <Editor 
              page={activePage} 
              onUpdateBlocks={(blocks) => updatePageBlocks(activePage.id, blocks)} 
              onUpdateTitle={(title) => updatePageTitle(activePage.id, title)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full opacity-20">
              <Rocket size={64} className="mb-4" />
              <p className="text-xl font-bold">Workspace initialized</p>
            </div>
          )}
        </div>

        <QuickActions onAction={(id) => id === 'post' && createPage()} />
      </main>

      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>
  );
};

export default App;
