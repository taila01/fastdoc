'use client';

import dynamic from 'next/dynamic';

const DocumentTable = dynamic(
  () => import('@/components/tables/DocumentTable'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#030712]">
        <div className="text-brand-500 animate-pulse font-medium">
          Carregando documentos...
        </div>
      </div>
    ),
  }
);

export default function Page() {
  return (
    <div className="flex h-screen w-full bg-[#030712] overflow-hidden">

      <div className="flex-1 relative m-4 rounded-3xl border border-neutral-800 bg-[#030712] overflow-hidden shadow-2xl">
        
        <div className="h-full w-full overflow-y-auto p-8">

          <header className="mb-8">
            <h1 className="text-3xl font-semibold text-white">
              Documentos
            </h1>

            <p className="text-gray-400 mt-2">
              Gerencie os documentos cadastrados no sistema.
            </p>
          </header>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-xl">
            <DocumentTable />
          </div>

        </div>

      </div>

    </div>
  );
}