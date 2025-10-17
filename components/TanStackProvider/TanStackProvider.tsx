'use client';
import { QueryClient, QueryClientProvider, HydrationBoundary, DehydratedState } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface TanStackProviderProps {
  children: ReactNode;
  dehydratedState?: DehydratedState | null;
}

export default function TanStackProvider({ children, dehydratedState = null }: TanStackProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}




