'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/store';
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from '@/components/theme-toggle';
import { Plus, MessageSquare, Trash2, LogOut, Search } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

function AppLogo() {
    return (
        <div className="flex items-center gap-2 p-4 pb-2">
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
            >
                <path
                d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                />
                <path
                d="M2 7L12 12L22 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                />
                <path
                d="M12 22V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                />
            </svg>
            <h1 className="text-xl font-headline font-semibold">Gemini Replica</h1>
        </div>
    )
}


export function AppSidebar() {
  const { chats, createChat, deleteChat, logout } = useAppStore();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const chatId = params.chatId as string;

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const handleNewChat = () => {
    const newChatId = createChat();
    toast({ title: "Chatroom Created", description: "Your new chat is ready." });
    router.push(`/chat/${newChatId}`);
  };

  const handleDelete = (id: string) => {
    deleteChat(id);
    toast({ title: "Chatroom Deleted", variant: "destructive" });
    if (chatId === id) {
      router.push('/chat');
    }
  };

  const handleLogout = () => {
    logout();
    toast({ title: "Logged Out" });
    router.push('/login');
  }

  return (
    <div className="flex h-full w-full flex-col border-r bg-secondary/50 dark:bg-card">
      <AppLogo />
      <div className="flex flex-col p-2">
        <Button onClick={handleNewChat} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
        <div className="relative mt-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search chats..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid items-start p-2 text-sm font-medium">
          {filteredChats.map((chat) => (
            <div key={chat.id} className="group relative flex items-center">
              <Link
                href={`/chat/${chat.id}`}
                className={`flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  chat.id === chatId ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span className="truncate">{chat.title}</span>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute right-1 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100">
                      <Trash2 className="h-4 w-4 text-destructive/70" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this chatroom and all its messages.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(chat.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto flex items-center justify-between border-t p-2">
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}
