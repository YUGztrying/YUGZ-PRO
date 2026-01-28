
import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Sparkles, Hash, Send, Clock, Image as ImageIcon, Copy, Check } from 'lucide-react';
import { generateInstagramContent } from '../services/geminiService';

export const InstagramTool: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ caption: string; hashtags: string[] } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    try {
      const data = await generateInstagramContent(topic);
      setResult(data);
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `${result.caption}\n\n${result.hashtags.join(' ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GlassCard className="space-y-6">
        <div className="flex items-center gap-3">
          <Sparkles className="text-amber-400" size={24} />
          <h2 className="text-xl font-bold">AI Post Architect</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">What is your post about?</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="E.g. A sunset photo at the beach in Bali with a cocktail..."
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none min-h-[120px] text-slate-200 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Tone</p>
              <select className="bg-transparent text-sm w-full outline-none">
                <option>Professional</option>
                <option>Witty</option>
                <option>Inspirational</option>
                <option>Minimalist</option>
              </select>
            </div>
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Target</p>
              <select className="bg-transparent text-sm w-full outline-none">
                <option>General</option>
                <option>Gen Z</option>
                <option>Techies</option>
                <option>Travelers</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !topic}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles size={20} className="group-hover:animate-pulse" />
                Generate Magic
              </>
            )}
          </button>
        </div>
      </GlassCard>

      <div className="space-y-6">
        {result ? (
          <GlassCard className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-slate-300">Preview</h3>
              <button 
                onClick={copyToClipboard}
                className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
              >
                {copied ? <Check className="text-green-400" size={18} /> : <Copy size={18} />}
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-950/40 rounded-xl p-4 border border-slate-800">
                <p className="text-slate-300 whitespace-pre-wrap">{result.caption}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.hashtags.map((tag, i) => (
                    <span key={i} className="text-indigo-400 text-sm font-medium hover:underline cursor-pointer">
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2">
                  <Clock size={18} />
                  Schedule
                </button>
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                  <Send size={18} />
                  Post Now
                </button>
              </div>
            </div>
          </GlassCard>
        ) : (
          <GlassCard className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4 border-dashed border-2">
            <div className="p-4 bg-slate-800 rounded-full">
              <ImageIcon size={32} className="text-slate-400" />
            </div>
            <div>
              <p className="font-medium">No Content Yet</p>
              <p className="text-sm text-slate-400">Your AI generated captions will appear here.</p>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
};
