
export type PageType = 'document' | 'dashboard' | 'board';

export type BlockType = 
  | 'text' 
  | 'h1' 
  | 'h2' 
  | 'todo' 
  | 'instagram' 
  | 'project-tracker' 
  | 'finance-learning' 
  | 'automation-idea';

export interface Block {
  id: string;
  type: BlockType;
  content: any;
}

export interface WorkspacePage {
  id: string;
  title: string;
  icon: string;
  blocks: Block[];
  isFavorite?: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  status: 'active' | 'blocked' | 'done';
  nextAction: string;
  revenue?: number;
}

export interface InstagramDraft {
  id: string;
  caption: string;
  hashtags: string[];
  status: 'draft' | 'scheduled' | 'posted';
}

export interface FinanceConcept {
  id: string;
  name: string;
  explanation: string;
  example: string;
}

export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  revenue: number;
}
