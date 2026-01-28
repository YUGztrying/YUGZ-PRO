
import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  GripVertical, 
  Type, 
  Heading1, 
  Heading2, 
  CheckSquare, 
  Instagram, 
  Table, 
  BookOpen, 
  Lightbulb,
  Sparkles,
  Trash2
} from 'lucide-react';
import { InstagramPostBlock, ProjectTrackerBlock, FinanceLearningBlock, AutomationIdeaBlock } from './Blocks';
import { Block, BlockType } from '../types';

interface EditorProps {
  page: { id: string; title: string; blocks: Block[] };
  onUpdateBlocks: (blocks: Block[]) => void;
  onUpdateTitle: (title: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ page, onUpdateBlocks, onUpdateTitle }) => {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const blockRefs = useRef<{ [key: string]: HTMLTextAreaElement | HTMLInputElement | null }>({});

  const addBlock = (type: BlockType, afterId?: string, focus = true) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newBlock: Block = {
      id: newId,
      type,
      content: type === 'project-tracker' ? [] : type === 'todo' ? { text: '', checked: false } : ''
    };
    
    const index = afterId ? page.blocks.findIndex(b => b.id === afterId) : -1;
    const newBlocks = [...page.blocks];
    if (index === -1) newBlocks.push(newBlock);
    else newBlocks.splice(index + 1, 0, newBlock);
    
    onUpdateBlocks(newBlocks);
    setShowMenu(null);

    if (focus) {
      setTimeout(() => {
        blockRefs.current[newId]?.focus();
      }, 0);
    }
  };

  const deleteBlock = (id: string, focusPrevious = false) => {
    const index = page.blocks.findIndex(b => b.id === id);
    const newBlocks = page.blocks.filter(b => b.id !== id);
    onUpdateBlocks(newBlocks);

    if (focusPrevious && index > 0) {
      const prevId = page.blocks[index - 1].id;
      setTimeout(() => {
        blockRefs.current[prevId]?.focus();
      }, 0);
    }
  };

  const updateBlockContent = (id: string, content: any) => {
    onUpdateBlocks(page.blocks.map(b => b.id === id ? { ...b, content } : b));
  };

  const handleKeyDown = (e: React.KeyboardEvent, block: Block) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Don't create new line in specific blocks if preferred, but standard Notion is Enter = New Block
      e.preventDefault();
      addBlock('text', block.id);
    } else if (e.key === 'Backspace' && !block.content && block.type === 'text') {
      // Delete block if empty text block
      e.preventDefault();
      deleteBlock(block.id, true);
    } else if (e.key === 'Backspace' && block.type === 'todo' && !block.content.text) {
      e.preventDefault();
      deleteBlock(block.id, true);
    }
  };

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case 'h1':
        return (
          <input
            // Fix: Ref callback should return void. Added braces to assignment.
            ref={(el) => { blockRefs.current[block.id] = el; }}
            className="text-4xl font-bold bg-transparent border-none outline-none w-full text-white placeholder:text-slate-800"
            value={block.content}
            onKeyDown={(e) => handleKeyDown(e, block)}
            onChange={(e) => updateBlockContent(block.id, e.target.value)}
            placeholder="Heading 1"
          />
        );
      case 'h2':
        return (
          <input
            // Fix: Ref callback should return void. Added braces to assignment.
            ref={(el) => { blockRefs.current[block.id] = el; }}
            className="text-2xl font-semibold bg-transparent border-none outline-none w-full text-slate-200 placeholder:text-slate-800"
            value={block.content}
            onKeyDown={(e) => handleKeyDown(e, block)}
            onChange={(e) => updateBlockContent(block.id, e.target.value)}
            placeholder="Heading 2"
          />
        );
      case 'todo':
        return (
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              checked={block.content.checked}
              onChange={(e) => updateBlockContent(block.id, { ...block.content, checked: e.target.checked })}
              className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500/20"
            />
            <input
              // Fix: Ref callback should return void. Added braces to assignment.
              ref={(el) => { blockRefs.current[block.id] = el; }}
              className={`flex-1 bg-transparent border-none outline-none text-slate-300 ${block.content.checked ? 'line-through opacity-40' : ''}`}
              value={block.content.text}
              onKeyDown={(e) => handleKeyDown(e, block)}
              onChange={(e) => updateBlockContent(block.id, { ...block.content, text: e.target.value })}
              placeholder="To-do"
            />
          </div>
        );
      case 'instagram':
        return <InstagramPostBlock draft={{ id: 'd', caption: block.content || 'Caption...', hashtags: ['yugz'], status: 'draft' }} />;
      case 'project-tracker':
        return <ProjectTrackerBlock projects={block.content.length > 0 ? block.content : [{ id: '1', name: 'BADAGUESTHOUSE', status: 'active', nextAction: 'Update images' }]} />;
      case 'finance-learning':
        return <FinanceLearningBlock concept={{ id: '1', name: 'DCF Analysis', explanation: 'Valuing assets by future cash.', example: 'Real estate ROI' }} />;
      case 'automation-idea':
        return <AutomationIdeaBlock idea={{ problem: 'Manual stock', solution: 'AI Scraper', tech: 'Python, Gemini' }} />;
      default:
        return (
          <textarea
            // Fix: Ref callback should return void. Added braces to assignment.
            ref={(el) => { blockRefs.current[block.id] = el; }}
            className="w-full bg-transparent border-none outline-none resize-none text-slate-300 leading-relaxed min-h-[1.5em] overflow-hidden placeholder:text-slate-800"
            value={block.content}
            onKeyDown={(e) => handleKeyDown(e, block)}
            onChange={(e) => {
              updateBlockContent(block.id, e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            placeholder="Type '/' for commands..."
          />
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <input
        className="w-full text-5xl font-black bg-transparent border-none outline-none text-white mb-12 placeholder:text-slate-800 tracking-tighter"
        value={page.title}
        onChange={(e) => onUpdateTitle(e.target.value)}
        placeholder="Untitled"
      />

      <div className="space-y-4 group/editor">
        {page.blocks.map((block) => (
          <div 
            key={block.id} 
            className="relative group/block flex items-start gap-2"
            onMouseEnter={() => setHoveredBlock(block.id)}
            onMouseLeave={() => setHoveredBlock(null)}
          >
            {/* Block Controls */}
            <div className={`absolute left-[-50px] top-1 flex items-center transition-opacity ${hoveredBlock === block.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <button 
                onClick={() => setShowMenu(showMenu === block.id ? null : block.id)}
                className="p-1.5 hover:bg-white/5 rounded text-slate-600 hover:text-slate-300"
              >
                <Plus size={16} />
              </button>
              <div className="p-1.5 cursor-grab text-slate-700">
                <GripVertical size={16} />
              </div>
            </div>

            {/* Block Menu Popover */}
            {showMenu === block.id && (
              <div className="absolute left-[-40px] top-10 glass-dark border border-white/10 rounded-xl p-2 w-64 z-50 shadow-2xl animate-in fade-in zoom-in-95">
                <p className="text-[10px] font-bold text-slate-500 uppercase px-3 py-2">Blocks</p>
                <div className="space-y-0.5">
                  <button onClick={() => addBlock('text', block.id)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-slate-300"><Type size={16} /> Text</button>
                  <button onClick={() => addBlock('h1', block.id)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-slate-300"><Heading1 size={16} /> Heading 1</button>
                  <button onClick={() => addBlock('h2', block.id)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-slate-300"><Heading2 size={16} /> Heading 2</button>
                  <button onClick={() => addBlock('todo', block.id)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-slate-300"><CheckSquare size={16} /> To-do List</button>
                  <div className="h-px bg-white/5 my-2 mx-3" />
                  <p className="text-[10px] font-bold text-indigo-500 uppercase px-3 py-2">Business Units</p>
                  <button onClick={() => addBlock('instagram', block.id)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-slate-300"><Instagram size={16} /> Instagram Post</button>
                  <button onClick={() => addBlock('project-tracker', block.id)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-slate-300"><Table size={16} /> Project Tracker</button>
                  <button onClick={() => addBlock('finance-learning', block.id)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-slate-300"><BookOpen size={16} /> Finance Concept</button>
                  <button onClick={() => addBlock('automation-idea', block.id)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-slate-300"><Lightbulb size={16} /> Automation Sketch</button>
                  <div className="h-px bg-white/5 my-2 mx-3" />
                  <button onClick={() => deleteBlock(block.id)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-rose-500/10 rounded-lg text-sm text-rose-500"><Trash2 size={16} /> Delete</button>
                </div>
              </div>
            )}

            <div className="flex-1 min-w-0">
              {renderBlock(block)}
            </div>
          </div>
        ))}

        {/* Empty Page Prompt */}
        {page.blocks.length === 0 && (
          <button 
            onClick={() => addBlock('text')}
            className="text-slate-600 hover:text-slate-400 text-sm italic transition-colors flex items-center gap-2 group"
          >
            <Plus size={16} className="opacity-0 group-hover:opacity-100" />
            Click to add your first block...
          </button>
        )}
      </div>

      {/* Floating AI Bottom Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 glass border border-indigo-500/20 px-6 py-3 rounded-2xl flex items-center gap-4 shadow-2xl backdrop-blur-xl">
         <Sparkles className="text-indigo-400" size={20} />
         <p className="text-sm font-medium text-slate-300">Omni-Assist is learning your workflow...</p>
         <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-all">
           Optimize Page
         </button>
      </div>
    </div>
  );
};
