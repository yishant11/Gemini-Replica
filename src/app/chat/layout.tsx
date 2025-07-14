import { AppSidebar } from '@/components/app-sidebar';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen w-full grid-cols-[280px_1fr]">
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      <main className="flex flex-col">
        {children}
      </main>
    </div>
  );
}
