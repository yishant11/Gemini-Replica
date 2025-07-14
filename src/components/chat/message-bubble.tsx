'use client';

import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { format } from 'date-fns';
import { CopyButton } from './copy-button';

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === 'user';
  return (
    <div
      className={cn(
        'group flex w-full max-w-lg items-start gap-3',
        isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
      )}
    >
      <Avatar>
        <AvatarImage src={isUser ? `https://placehold.co/40x40/90AFC5/2A3439` : `https://placehold.co/40x40/80759C/F0F4F7`} />
        <AvatarFallback>{isUser ? 'U' : 'AI'}</AvatarFallback>
      </Avatar>
      <div className={cn('flex flex-col gap-1', isUser ? 'items-end' : 'items-start')}>
        <div className="flex items-center gap-2">
            {!isUser && <span className="text-sm font-semibold">Gemini</span>}
             <time className="text-xs text-muted-foreground">
                {format(new Date(message.timestamp), 'p')}
             </time>
        </div>
        <div className="relative rounded-lg bg-card p-3 shadow-sm">
          {message.imageUrl && (
            <Image
              src={message.imageUrl}
              alt="Uploaded image"
              width={300}
              height={300}
              className="mb-2 rounded-md"
            />
          )}
          <p className="text-sm">{message.text}</p>
           <div className="absolute top-0 opacity-0 transition-opacity group-hover:opacity-100" style={isUser ? {left: '-3rem'} : {right: '-3rem'}}>
              <CopyButton textToCopy={message.text} />
           </div>
        </div>
      </div>
    </div>
  );
}
