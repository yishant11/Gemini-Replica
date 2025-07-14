import { MessageSquareText } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-background">
        <div className="p-6 bg-secondary/50 rounded-full">
            <MessageSquareText className="h-12 w-12 text-muted-foreground" />
        </div>
      <h2 className="text-2xl font-headline font-semibold">Your Personal AI Assistant</h2>
      <p className="text-muted-foreground">
        Select a chat from the sidebar or create a new one to get started.
      </p>
    </div>
  );
}
