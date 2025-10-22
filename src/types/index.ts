export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SuggestionCard {
  id: string;
  title: string;
  icon: string;
}

export interface AttachedFile {
  id: string;
  name: string;
  progress?: number;
}
