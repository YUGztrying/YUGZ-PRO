
import React from 'react';
import { 
  Instagram, 
  ArrowRight, 
  BookOpen, 
  Lightbulb, 
  MoreVertical,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { ProjectItem, InstagramDraft, FinanceConcept } from '../types';

export const InstagramPostBlock: React.FC<{ draft: InstagramDraft }> = ({ draft }) => (
  <GlassCard className="p-5 border-l-4 border-l-blue-500 hover:translate-y-[-2px] transition-transform bg-black">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2 text-blue-400">
        <Instagram size={18} />
        <span className="text-xs font-bold uppercase tracking-widest">Post Draft</span>
      </div>
      <span className="text-[10px] bg-white/10 text-white px-2 py-1 rounded uppercase font-bold">
        {draft.status}
      </span>
    </div>
    <p className="text-slate-300 text-sm mb-4 italic leading-relaxed">"{draft.caption}"</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {draft.hashtags.map((tag, i) => (
        <span key={i} className="text-[10px] bg-white/5 text-blue-400 px-2 py-1 rounded border border-white/5">#{tag}</span>
      ))}
    </div>
    <button className="w-full py-2.5 bg-white text-black rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-2 hover:bg-slate-200">
      <Sparkles size={14} /> Refine Content
    </button>
  </GlassCard>
);

export const ProjectTrackerBlock: React.FC<{ projects: ProjectItem[] }> = ({ projects }) => (
  <GlassCard className="p-0 overflow-hidden bg-black border-white/10">
    <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Live Project Feed</h3>
      <div className="flex gap-2">
        <span className="bg-blue-600/10 text-blue-500 text-[10px] font-bold px-2 py-1 rounded border border-blue-500/20 uppercase">Revenue Focused</span>
      </div>
    </div>
    <div className="divide-y divide-white/5">
      {projects.map((project) => (
        <div key={project.id} className="p-6 flex items-center justify-between hover:bg-white/[0.01] transition-colors group">
          <div className="flex items-center gap-6">
            <div className={`w-3 h-3 rounded-full ${
              project.status === 'active' ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]' : 
              project.status === 'blocked' ? 'bg-white/20' : 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]'
            }`} />
            <div>
              <div className="flex items-center gap-3">
                <h4 className="text-base font-bold text-white tracking-tight">{project.name}</h4>
                {project.revenue && (
                   <span className="text-[10px] font-bold text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded border border-blue-700/30">
                     +${project.revenue.toLocaleString()}
                   </span>
                )}
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-2 mt-1 font-medium">
                <ArrowRight size={12} className="text-slate-700" /> {project.nextAction}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
               <p className="text-[10px] text-slate-600 font-bold uppercase">Status</p>
               <p className="text-xs font-bold text-slate-300 uppercase tracking-tighter">{project.status}</p>
             </div>
             <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/5 rounded-lg transition-all text-slate-500">
               <MoreVertical size={18} />
             </button>
          </div>
        </div>
      ))}
    </div>
  </GlassCard>
);

export const FinanceLearningBlock: React.FC<{ concept: FinanceConcept }> = ({ concept }) => (
  <GlassCard className="p-5 border-l-4 border-l-white bg-black">
    <div className="flex items-center gap-2 text-white mb-3">
      <BookOpen size={18} />
      <span className="text-xs font-black uppercase tracking-widest">Mastery Base</span>
    </div>
    <h3 className="text-lg font-black text-white mb-2">{concept.name}</h3>
    <p className="text-sm text-slate-400 mb-4 leading-relaxed">{concept.explanation}</p>
    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
      <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Practical Application</p>
      <p className="text-xs text-slate-300 italic leading-relaxed">{concept.example}</p>
    </div>
  </GlassCard>
);

export const AutomationIdeaBlock: React.FC<{ idea: { problem: string, solution: string, tech: string } }> = ({ idea }) => (
  <GlassCard className="p-6 bg-black border-white/10 hover:border-blue-500/50 transition-all">
    <div className="flex items-center gap-3 text-white mb-6">
      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
        <Lightbulb size={20} className="text-white" />
      </div>
      <h3 className="font-black text-lg tracking-tight">Automation Sketch</h3>
    </div>
    <div className="space-y-5">
      <div>
        <p className="text-[10px] text-slate-500 font-black uppercase mb-1 tracking-widest">The Friction</p>
        <p className="text-sm text-slate-300 leading-relaxed">{idea.problem}</p>
      </div>
      <div>
        <p className="text-[10px] text-slate-500 font-black uppercase mb-1 tracking-widest">The Lever</p>
        <p className="text-sm text-white font-medium leading-relaxed">{idea.solution}</p>
      </div>
      <div className="flex gap-2 pt-2">
        {idea.tech.split(',').map(t => (
          <span key={t} className="text-[9px] bg-white text-black px-2 py-1 rounded font-black uppercase tracking-tighter">
            {t.trim()}
          </span>
        ))}
      </div>
    </div>
  </GlassCard>
);
