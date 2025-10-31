// Fix: Import React to resolve React and JSX namespace errors.
import React from 'react';

export type Author = 'user' | 'ai';

export type AgentName = 'Chronos' | 'Clarity' | 'Forge' | 'Lens';

export interface Thought {
  id: string;
  timestamp: number;
  author: Author;
  agent?: AgentName;
  text?: string;
  imageUrl?: string;
  listId: string;
  color: string;
  parentId?: string;
}

export interface List {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface Agent {
  id: AgentName;
  color: string;
  onClick?: (id: AgentName) => void;
}
