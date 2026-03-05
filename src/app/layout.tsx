
'use client';

import './globals.css'; // Tailwind
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <title>FastDoc</title>
      </head>
      <body className="bg-zinc-50 dark:bg-black text-gray-900 dark:text-zinc-50">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}