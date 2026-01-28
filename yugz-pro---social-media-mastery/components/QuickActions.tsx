
import React, { useState } from 'react';
import { Plus, Camera, Send, MessageSquare, BarChart3, X } from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: <Camera size={20} />, label: 'Snap Post', id: 'snap' },
    { icon: <MessageSquare size={20} />, label: 'AI Caption', id: 'caption' },
    { icon: <Send size={20} />, label: 'Quick Post', id: 'post' },
    { icon: <BarChart3 size={20} />, label: 'Instant Report', id: 'report' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {actions.map((action, idx) => (
            <button
              key={action.id}
              onClick={() => {
                onAction(action.id);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 group"
            >
              <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {action.label}
              </span>
              {action.icon}
            </button>
          ))}
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform ${
          isOpen ? 'bg-rose-500 rotate-45' : 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 hover:scale-110 rotate-0'
        }`}
      >
        {isOpen ? <X size={28} /> : <Plus size={28} />}
      </button>
    </div>
  );
};
