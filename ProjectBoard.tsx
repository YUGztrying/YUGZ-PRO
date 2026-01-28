
import React, { useState } from 'react';
import { Plus, MoreHorizontal, Tag, DollarSign, ArrowRight, X } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Task } from '../types';

export const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'BADAGUESTHOUSE SEO Package', status: 'todo', priority: 'high', tags: ['Growth'], revenue: 2500 },
  { id: '2', title: 'YECARS Sales Bot Integration', status: 'in-progress', priority: 'medium', tags: ['Automation'], revenue: 5000 },
  { id: '3', title: 'IFC Portfolio Review', status: 'done', priority: 'high', tags: ['Finance'], revenue: 1200 },
  { id: '4', title: 'Automated Guest Messaging', status: 'todo', priority: 'low', tags: ['Hospitality'], revenue: 1800 },
];

export const ProjectBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [isAddingTo, setIsAddingTo] = useState<Task['status'] | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskRevenue, setNewTaskRevenue] = useState<string>('0');

  const moveTask = (id: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const addTask = (status: Task['status']) => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTaskTitle,
      status: status,
      priority: 'medium',
      tags: ['New'],
      revenue: parseFloat(newTaskRevenue) || 0,
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
    setNewTaskRevenue('0');
    setIsAddingTo(null);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const Column = ({ title, status, tasks }: { title: string, status: Task['status'], tasks: Task[] }) => (
    <div className="flex flex-col gap-4 w-full min-w-[320px]">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-slate-100">{title}</h3>
          <span className="bg-white/5 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10">{tasks.length}</span>
        </div>
        <button 
          onClick={() => setIsAddingTo(status)}
          className="text-slate-600 hover:text-white transition-colors p-1"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-3 h-full min-h-[600px] bg-white/[0.01] rounded-2xl p-3 border border-dashed border-white/5">
        {isAddingTo === status && (
          <GlassCard className="p-4 border border-blue-500/50 bg-black/40 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-3">
              <input
                autoFocus
                type="text"
                placeholder="Project Title..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500/50"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask(status)}
              />
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <DollarSign size={14} className="text-blue-400" />
                <input
                  type="number"
                  placeholder="Revenue"
                  className="bg-transparent border-none outline-none text-sm text-blue-400 w-full"
                  value={newTaskRevenue}
                  onChange={(e) => setNewTaskRevenue(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => addTask(status)}
                  className="flex-1 bg-white text-black text-[10px] font-black uppercase py-2 rounded-lg hover:bg-slate-200"
                >
                  Save Project
                </button>
                <button 
                  onClick={() => setIsAddingTo(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </GlassCard>
        )}

        {tasks.map(task => (
          <GlassCard key={task.id} className="p-4 group border border-white/5 hover:border-blue-500/30 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-2">
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${
                  task.priority === 'high' ? 'bg-white text-black' : 
                  task.priority === 'medium' ? 'bg-blue-600/20 text-blue-400' : 
                  'bg-white/10 text-slate-400'
                }`}>
                  {task.priority}
                </span>
                <span className="text-[10px] font-bold text-blue-400 flex items-center bg-blue-500/10 px-1.5 py-0.5 rounded">
                  <DollarSign size={10} />{task.revenue.toLocaleString()}
                </span>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-rose-500/20 rounded text-rose-500"
              >
                <X size={12} />
              </button>
            </div>
            <h4 className="text-sm font-semibold text-white mb-4 leading-snug">{task.title}</h4>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {task.tags.map(tag => (
                  <span key={tag} className="text-[10px] text-slate-500 flex items-center gap-1 border border-white/5 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-1">
                {status !== 'todo' && (
                   <button onClick={() => moveTask(task.id, status === 'done' ? 'in-progress' : 'todo')} className="p-1 hover:bg-white/5 rounded text-slate-500"><ArrowRight size={14} className="rotate-180" /></button>
                )}
                {status !== 'done' && (
                   <button onClick={() => moveTask(task.id, status === 'todo' ? 'in-progress' : 'done')} className="p-1 hover:bg-blue-500/20 rounded text-blue-400"><ArrowRight size={14} /></button>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
        
        {isAddingTo !== status && (
          <button 
            onClick={() => setIsAddingTo(status)}
            className="w-full py-3 text-slate-600 hover:text-slate-400 text-xs font-bold border border-dashed border-white/5 rounded-xl hover:bg-white/[0.02] transition-all flex items-center justify-center gap-2"
          >
            <Plus size={14} /> Add New Project
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
      <Column title="Backlog" status="todo" tasks={tasks.filter(t => t.status === 'todo')} />
      <Column title="Active Execution" status="in-progress" tasks={tasks.filter(t => t.status === 'in-progress')} />
      <Column title="Revenue Generated" status="done" tasks={tasks.filter(t => t.status === 'done')} />
    </div>
  );
};
