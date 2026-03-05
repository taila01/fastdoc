'use client';

import { Input } from "@heroui/react";
import { FaSearch } from "react-icons/fa";
import { Selection } from "@heroui/react";
import { useRouter } from "next/navigation";

interface TableTopContentProps {
  filterValue: string;
  statusFilter: Selection;
  visibleColumns: Selection;
  onSearchChange: (value?: string) => void;
  setFilterValue: (value: string) => void;
  setStatusFilter: (value: Selection) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  rowsPerPage: number;
  meta?: {
    total: number;
  };
}

export default function TableTopContent({
  filterValue,
  onSearchChange,
  setFilterValue,
  onRowsPerPageChange,
  rowsPerPage,
  meta,
}: TableTopContentProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 px-1">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          classNames={{
            input:
              "text-default-400 border-0 h-11 focus:border-brand-500 hover:border-brand-500 lg:border-none lg:border-0 lg:border-transparent outline-none ring-0 focus:outline-0 focus:border-0 focus:ring-0 focus:ring-none",
            base: "w-full sm:max-w-[44%] hover:ring-none",
            inputWrapper:
              "bg-brand-50/30 dark:bg-default-300/30 border-1 border-brand-300 dark:border-transparent",
          }}
          placeholder="Pesquisar por nome"
          size="md"
          startContent={<FaSearch className="text-brand-300" />}
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-md">
          Total de usuários: {meta?.total ?? 0}
        </span>
        <div className="flex items-center gap-4">
          <label className="flex items-center text-default-400 text-md">
            Documentos por página:
            <select
              className="bg-transparent border-0 border-transparent outline-none text-default-400 text-md focus:outline-none rounded-xl ml-2"
              onChange={onRowsPerPageChange}
              defaultValue={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}