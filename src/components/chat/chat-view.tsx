'use client';

import { useEffect, useRef, useState } from 'react';
import type { Chat } from '@/lib/types';
import { useAppStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageBubble } from './message-bubble';
import { TypingIndicator } from './typing-indicator';
import { ArrowUp, Image as ImageIcon } from 'lucide-react';

function ChatHeader({ title }: { title: string }) {
  return (
    <div className="flex h-14 items-center border-b px-4">
      <h2 className="text-lg font-headline font-semibold">{title}</h2>
    </div>
  );
}

export function ChatView({ chatId }: { chatId: string }) {
  const { getChatById, addMessage, isTyping, loadMoreMessages } = useAppStore();
  const chat = getChatById(chatId);
  const [inputValue, setInputValue] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(scrollToBottom, [chat?.messages, isTyping]);
  
  const handleScrollTop = () => {
      if(scrollAreaRef.current) {
          const { scrollTop } = scrollAreaRef.current;
          if(scrollTop === 0) {
              loadMoreMessages(chatId);
          }
      }
  }

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      scrollArea.addEventListener('scroll', handleScrollTop);
      return () => scrollArea.removeEventListener('scroll', handleScrollTop);
    }
  }, [chatId, loadMoreMessages]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && !imagePreview) return;
    addMessage(chatId, {
      text: inputValue,
      sender: 'user',
      imageUrl: imagePreview || undefined,
    });
    setInputValue('');
    setImagePreview(null);
    if (imageInputRef.current) {
        imageInputRef.current.value = '';
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!chat) {
    return (
        <div className="flex flex-col h-full">
            <ChatHeader title="Chat" />
            <div className="flex-1 flex items-center justify-center">
                <p className="text-muted-foreground">Chat not found.</p>
            </div>
        </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <ChatHeader title={chat.title} />
      <div className="flex-1 overflow-hidden">
         <ScrollArea className="h-full" viewportRef={scrollAreaRef}>
             <div className="p-4 space-y-4">
             {chat.messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
                </div>
             )}
            {chat.messages.map((msg, index) =>
                msg ? <MessageBubble key={msg.id} message={msg} /> : <Skeleton key={index} className="h-16 w-3/4" />
            )}
            {isTyping && <TypingIndicator />}
             <div ref={messagesEndRef} />
            </div>
         </ScrollArea>
      </div>
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="relative">
          {imagePreview && (
            <div className="relative mb-2 h-24 w-24">
              <img src={imagePreview} alt="Preview" className="h-full w-full rounded-md object-cover" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                onClick={() => {
                    setImagePreview(null);
                    if(imageInputRef.current) imageInputRef.current.value = '';
                }}
              >X</Button>
            </div>
          )}
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="pr-24"
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
                <Button type="button" variant="ghost" size="icon" onClick={() => imageInputRef.current?.click()}>
                    <ImageIcon className="h-5 w-5" />
                </Button>
                <input type="file" accept="image/*" ref={imageInputRef} onChange={handleImageUpload} className="hidden" />
                <Button type="submit" size="icon" disabled={isTyping}>
                    <ArrowUp className="h-5 w-5" />
                </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
