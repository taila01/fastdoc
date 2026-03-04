'use client';

import DocumentTable from '@/components/tables/DocumentTable';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black p-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
          Documentos
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Gerencie os documentos cadastrados no sistema.
        </p>
      </header>

      <section className="w-full">
        <DocumentTable />
      </section>
    </div>
  );
}