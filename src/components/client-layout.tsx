'use client';

import { useAppStore } from '@/store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Skeleton } from '@/components/ui/skeleton';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { theme, isAuthenticated, _hasHydrated } = useAppStore(state => ({
    theme: state.theme,
    isAuthenticated: state.isAuthenticated,
    _hasHydrated: state._hasHydrated,
  }));
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    if (_hasHydrated) {
      const isAuthPage = pathname === '/login';
      if (!isAuthenticated && !isAuthPage) {
        router.replace('/login');
      }
      if (isAuthenticated && isAuthPage) {
        router.replace('/chat');
      }
    }
  }, [isAuthenticated, _hasHydrated, pathname, router]);

  if (!_hasHydrated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background p-4">
        <div className="flex w-full max-w-md flex-col items-center gap-4">
           <Skeleton className="h-8 w-48" />
           <Skeleton className="h-10 w-full" />
           <Skeleton className="h-10 w-full" />
           <Skeleton className="h-10 w-24 self-start" />
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
