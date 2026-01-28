
import React from 'react';
import { GlassCard } from './GlassCard';
import { ProjectTrackerBlock } from './Blocks';
import { ProjectItem } from '../types';
import { Zap, Target, DollarSign, Clock, Briefcase } from 'lucide-react';
import { INITIAL_TASKS } from './ProjectBoard';

export const Dashboard: React.FC = () => {
  // Dynamic metrics from actual task data
  const totalProjects = INITIAL_TASKS.length;
  const doneCount = INITIAL_TASKS.filter(t => t.status === 'done').length;
  const completionRate = totalProjects > 0 ? Math.round((doneCount / totalProjects) * 100) : 0;
  const totalProjectedRevenue = INITIAL_TASKS.reduce((acc, curr) => acc + curr.revenue, 0);

  const MOCK_PROJECTS_DATA: ProjectItem[] = INITIAL_TASKS.map(t => ({
    id: t.id,
    name: t.title,
    status: t.status === 'done' ? 'done' : t.status === 'in-progress' ? 'active' : 'blocked',
    nextAction: t.tags[0],
    revenue: t.revenue
  }));

  return (
    <div className="space-y-12">
      {/* Dynamic Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard className="bg-black border-white/10 flex items-center gap-6 p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-600/10 transition-all" />
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white">
            <Briefcase size={28} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Active Projects</p>
            <p className="text-4xl font-black">{totalProjects}</p>
          </div>
        </GlassCard>
        
        <GlassCard className="bg-black border-white/10 flex items-center gap-6 p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-all" />
          <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
            <Target size={28} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Efficiency Level</p>
            <p className="text-4xl font-black">{completionRate}%</p>
          </div>
        </GlassCard>

        <GlassCard className="bg-black border-blue-900/50 flex items-center gap-6 p-8 relative overflow-hidden group shadow-[0_0_30px_rgba(37,99,235,0.1)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <DollarSign size={28} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Pipeline Value</p>
            <p className="text-4xl font-black tracking-tighter">${totalProjectedRevenue.toLocaleString()}</p>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-xl font-black flex items-center gap-3 tracking-tight">
              <Zap className="text-blue-500" size={24} /> Strategic Initiatives
            </h3>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Updated 2m ago</span>
          </div>
          
          <ProjectTrackerBlock projects={MOCK_PROJECTS_DATA} />
          
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">Next Milestone</h4>
                <p className="text-sm text-slate-500">Deploy Sales Bot to Production Environment</p>
              </div>
            </div>
            <button className="bg-white text-black px-6 py-2.5 rounded-xl font-black text-xs hover:bg-slate-200 transition-all uppercase tracking-widest">
              Set Focus
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-xl font-black border-b border-white/5 pb-4 tracking-tight">Financial Summary</h3>
          <div className="space-y-4">
            {MOCK_PROJECTS_DATA.map(p => (
              <div key={p.id} className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <span className="text-sm font-medium text-slate-400 truncate pr-4">{p.name}</span>
                <span className="text-sm font-bold text-blue-400 whitespace-nowrap">${p.revenue?.toLocaleString()}</span>
              </div>
            ))}
            <div className="pt-4 mt-4 border-t border-white/5 flex justify-between items-center px-4">
              <span className="text-xs font-bold text-slate-500 uppercase">Total Forecast</span>
              <span className="text-lg font-black text-white">${totalProjectedRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
