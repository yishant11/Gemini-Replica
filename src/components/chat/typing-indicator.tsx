import { cn } from '@/lib/utils';

export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2">
      <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground"></div>
      <span className="text-sm text-muted-foreground">Gemini is typing...</span>
    </div>
  );
}
