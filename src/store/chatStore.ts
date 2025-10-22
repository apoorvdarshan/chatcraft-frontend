import { create } from 'zustand';
import { Chat, Message, AttachedFile } from '../types';

interface ChatState {
  chats: Chat[];
  currentChatId: string | null;
  sidebarOpen: boolean;
  attachedFiles: AttachedFile[];

  // Actions
  createNewChat: () => string;
  setCurrentChat: (chatId: string | null) => void;
  addMessage: (chatId: string, content: string, role: 'user' | 'assistant') => void;
  deleteChat: (chatId: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addAttachedFile: (file: AttachedFile) => void;
  removeAttachedFile: (fileId: string) => void;
  clearAttachedFiles: () => void;
  getCurrentChat: () => Chat | undefined;
}

const ASSISTANT_RESPONSES = [
  "I'm a placeholder AI assistant. I'm here to demonstrate the chat interface!",
  "That's an interesting question! In this demo, I can only provide placeholder responses.",
  "I understand what you're asking. This is a frontend-only implementation, so I'm simulating responses.",
  "Great question! In a real application, I would process your message and provide a meaningful response.",
  "I see what you mean. This interface is designed to showcase the chat functionality.",
];

const generateId = () => Math.random().toString(36).substring(2, 11);

const getRandomResponse = () =>
  ASSISTANT_RESPONSES[Math.floor(Math.random() * ASSISTANT_RESPONSES.length)];

const generateChatTitle = (firstMessage: string): string => {
  const words = firstMessage.split(' ').slice(0, 6);
  return words.length < firstMessage.split(' ').length
    ? words.join(' ') + '...'
    : words.join(' ');
};

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  currentChatId: null,
  sidebarOpen: true,
  attachedFiles: [],

  createNewChat: () => {
    const newChatId = generateId();
    const newChat: Chat = {
      id: newChatId,
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      chats: [newChat, ...state.chats],
      currentChatId: newChatId,
    }));

    return newChatId;
  },

  setCurrentChat: (chatId) => {
    set({ currentChatId: chatId });
  },

  addMessage: (chatId, content, role) => {
    const newMessage: Message = {
      id: generateId(),
      content,
      role,
      timestamp: new Date(),
    };

    set((state) => {
      const updatedChats = state.chats.map((chat) => {
        if (chat.id === chatId) {
          const updatedMessages = [...chat.messages, newMessage];
          const isFirstMessage = chat.messages.length === 0 && role === 'user';

          return {
            ...chat,
            messages: updatedMessages,
            title: isFirstMessage ? generateChatTitle(content) : chat.title,
            updatedAt: new Date(),
          };
        }
        return chat;
      });

      return { chats: updatedChats };
    });

    // Simulate AI response after user message
    if (role === 'user') {
      setTimeout(() => {
        const assistantMessage: Message = {
          id: generateId(),
          content: getRandomResponse(),
          role: 'assistant',
          timestamp: new Date(),
        };

        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [...chat.messages, assistantMessage],
                  updatedAt: new Date(),
                }
              : chat
          ),
        }));
      }, 800);
    }
  },

  deleteChat: (chatId) => {
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== chatId),
      currentChatId: state.currentChatId === chatId ? null : state.currentChatId,
    }));
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setSidebarOpen: (open) => {
    set({ sidebarOpen: open });
  },

  addAttachedFile: (file) => {
    set((state) => ({
      attachedFiles: [...state.attachedFiles, file],
    }));
  },

  removeAttachedFile: (fileId) => {
    set((state) => ({
      attachedFiles: state.attachedFiles.filter((f) => f.id !== fileId),
    }));
  },

  clearAttachedFiles: () => {
    set({ attachedFiles: [] });
  },

  getCurrentChat: () => {
    const state = get();
    return state.chats.find((chat) => chat.id === state.currentChatId);
  },
}));
