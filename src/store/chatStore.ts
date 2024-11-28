import { create } from 'zustand';
import { User, Message, Chat } from '../types';

interface ChatState {
  currentUser: User | null;
  chats: Chat[];
  activeChat: string | null;
  setCurrentUser: (user: User) => void;
  setActiveChat: (chatId: string) => void;
  sendMessage: (chatId: string, content: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  currentUser: {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    status: 'online',
  },
  chats: [
    {
      id: 'chat-1',
      participants: [
        {
          id: 'user-2',
          name: 'Jane Smith',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
          status: 'online',
        },
      ],
      messages: [],
      unreadCount: 0,
      isGroup: false,
    },
  ],
  activeChat: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  setActiveChat: (chatId) => set({ activeChat: chatId }),
  sendMessage: (chatId, content) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: `msg-${Date.now()}`,
                  senderId: state.currentUser?.id || '',
                  content,
                  timestamp: new Date(),
                  status: 'sent',
                  type: 'text',
                },
              ],
            }
          : chat
      ),
    })),
}));