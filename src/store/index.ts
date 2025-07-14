import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Chat, Message } from '@/lib/types';
import { format }s 'date-fns';

type Theme = 'light' | 'dark';

interface AppState {
  _hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;

  theme: Theme;
  toggleTheme: () => void;

  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;

  chats: Chat[];
  isTyping: boolean;
  getChatById: (id: string) => Chat | undefined;
  createChat: () => string;
  deleteChat: (id:string) => void;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  loadMoreMessages: (chatId: string) => void;
}

const initialChats: Chat[] = [
  {
    id: '1',
    title: 'Welcome to Gemini',
    createdAt: new Date().toISOString(),
    messages: [
      {
        id: '1',
        text: 'Hello! How can I help you today?',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      },
    ],
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      setHasHydrated: (hydrated) => {
        set({ _hasHydrated: hydrated });
      },
      theme: 'light',
      toggleTheme: () => {
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }));
      },
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false, chats: initialChats }),
      chats: initialChats,
      isTyping: false,
      getChatById: (id) => get().chats.find((chat) => chat.id === id),
      createChat: () => {
        const newChatId = (get().chats.length + 1).toString();
        const newChat: Chat = {
          id: newChatId,
          title: `New Chat ${newChatId}`,
          createdAt: new Date().toISOString(),
          messages: [
            {
              id: '1',
              text: 'Hello! How can I help you today?',
              sender: 'ai',
              timestamp: new Date().toISOString(),
            },
          ],
        };
        set((state) => ({ chats: [newChat, ...state.chats] }));
        return newChatId;
      },
      deleteChat: (id) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== id),
        }));
      },
      addMessage: (chatId, messageContent) => {
        set((state) => ({ isTyping: true }));
        const newMessage: Message = {
          ...messageContent,
          id: Math.random().toString(),
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? { ...chat, messages: [...chat.messages, newMessage] }
              : chat
          ),
        }));

        if (newMessage.sender === 'user') {
            setTimeout(() => {
                const aiResponse: Message = {
                    id: Math.random().toString(),
                    text: `This is a simulated response to "${messageContent.text}". I am a friendly AI assistant ready to help you with your tasks.`,
                    sender: 'ai',
                    timestamp: new Date().toISOString(),
                };
                set((state) => ({
                    chats: state.chats.map((chat) =>
                      chat.id === chatId
                        ? { ...chat, messages: [...chat.messages, aiResponse] }
                        : chat
                    ),
                    isTyping: false,
                }));
            }, 1500 + Math.random() * 1000); // Throttled response
        }
      },
      loadMoreMessages: (chatId: string) => {
        const chat = get().getChatById(chatId);
        if (!chat) return;
        
        const olderMessages: Message[] = Array.from({ length: 10 }).map((_, i) => ({
            id: `older-${chat.messages.length + i}-${Math.random()}`,
            text: `This is an older simulated message ${chat.messages.length + i + 1}.`,
            sender: i % 2 === 0 ? 'user' : 'ai',
            timestamp: new Date(new Date().getTime() - (chat.messages.length + i) * 60000).toISOString()
        }));

        set(state => ({
            chats: state.chats.map(c => 
                c.id === chatId ? { ...c, messages: [...olderMessages, ...c.messages] } : c
            )
        }))
      }
    }),
    {
      name: 'gemini-clone-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
            state.setHasHydrated(true);
        }
      },
       partialize: (state) => ({
        theme: state.theme,
        isAuthenticated: state.isAuthenticated,
        chats: state.chats,
      }),
    }
  )
);

// Initial call to set hydration status on load
useAppStore.getState().setHasHydrated(useAppStore.persist.hasHydrated());
