'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
  SortDescriptor,
} from "@heroui/react";
import { useState, useMemo, useCallback, ChangeEvent } from "react";
import { INITIAL_VISIBLE_COLUMNS, documentColumns } from "./constants";
import { formatDate } from "@/utils/formatters";
import { useDocuments } from "@/hooks/document/useDocuments";
import { Document } from "@/services/interfaces/Document/DocumentInterface";

import TableBottomContent from "./components/TableBottomContent";
import DocumentDeleteDialog from "./dialogs/DocumentDeleteDialog";
import DocumentViewDialog from "./dialogs/DocumentViewDialog";
import DocumentEditDialog from "./dialogs/DocumentEditDialog";
import TableTopContent from "./components/TableTopContent";
import TableLoading from "@/components/tables/TableLoading";
import TableActions from "./components/TableActions";

export default function DocumentTable() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [documentData, setDocumentData] = useState<Document | undefined>(undefined);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");

  const { data, isLoading } = useDocuments(page, rowsPerPage, filterValue);

  const documentsData = useMemo(() => {
    if (!data) return [];
    const actualData = data.data || data;
    return Array.isArray(actualData) ? actualData : [actualData];
  }, [data]);

  const meta = data?.meta;
  const visibleColumns = useMemo(() => new Set(INITIAL_VISIBLE_COLUMNS), []);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "titulo",
    direction: "ascending",
  });

  const handleDownload = useCallback((doc: Document) => {
    const blob = new Blob([doc.descricao || ""], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = doc.titulo?.endsWith(".txt") ? doc.titulo : `${doc.titulo}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, []);

  const handleOpenModal = useCallback((doc: Document, type: "view" | "delete" | "edit") => {
    setDocumentData(doc);
    if (type === "view") setIsViewDialogOpen(true);
    if (type === "delete") setIsDeleteDialogOpen(true);
    if (type === "edit") setIsEditDialogOpen(true);
  }, []);

  const renderCell = useCallback((document: Document, columnKey: keyof Document | "actions") => {
    const cellValue = document[columnKey as keyof Document];

    switch (columnKey) {
      case "titulo":
        return <p className="font-semibold text-zinc-100 text-sm">{document.titulo || ""}</p>;
      case "descricao":
        return <p className="text-zinc-400 text-sm line-clamp-1">{document.descricao || ""}</p>;
      case "criado_em":
        return <p className="text-zinc-300 text-sm">{document.criado_em ? formatDate(document.criado_em) : ""}</p>;
      case "status":
        const isAssinado = document.status === "assinado";
        return (
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isAssinado ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-zinc-500"}`} />
            <span className={`text-sm ${isAssinado ? "text-green-500 font-medium" : "text-zinc-400"}`}>
              {isAssinado ? "Assinado" : "Pendente"}
            </span>
          </div>
        );
      case "actions":
        return (
          <TableActions
            onView={(doc) => handleOpenModal(doc, "view")}
            onDelete={(doc) => handleOpenModal(doc, "delete")}
            onEdit={(doc) => handleOpenModal(doc, "edit")}
            onDownload={handleDownload}
            documentData={document}
          />
        );
      default:
        return <span className="text-zinc-300 text-sm">{cellValue ? String(cellValue) : ""}</span>;
    }
  }, [handleOpenModal, handleDownload]);

  const sortedItems = useMemo(() => {
    return [...documentsData].sort((a, b) => {
      const first = String(a[sortDescriptor.column as keyof Document] || "");
      const second = String(b[sortDescriptor.column as keyof Document] || "");
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, documentsData]);

  const onRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value || "");
    setPage(1);
  }, []);

  const tableClassNames = useMemo(() => ({
    base: "w-full overflow-hidden rounded-2xl border border-gray-800 bg-zinc-900 shadow-2xl",
    table: "min-w-full",
    thead: "bg-white/3 [&>tr]:first:rounded-none",
    th: "bg-transparent text-zinc-400 font-bold py-4 px-6 border-b border-gray-800 uppercase text-xs tracking-wider",
    tbody: "divide-y divide-gray-800/50",
    tr: "group hover:bg-white/2 transition-all cursor-default",
    td: "py-4 px-6 text-zinc-300 transition-colors group-hover:text-zinc-100",
  }), []);

  return (
    <div className="w-full space-y-4">
      <Table
        isCompact
        removeWrapper
        aria-label="Tabela de Documentos"
        bottomContent={
          <div className="px-2 py-4 border-t border-gray-800 bg-zinc-900/50 rounded-b-2xl">
            <TableBottomContent
              page={page}
              pages={Math.ceil((meta?.total ?? 0) / rowsPerPage)}
              hasSearchFilter={Boolean(filterValue)}
              setPage={setPage}
            />
          </div>
        }
        bottomContentPlacement="outside"
        classNames={tableClassNames}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={
          <div className="p-4 bg-zinc-900 rounded-t-2xl border-b border-gray-800">
            <TableTopContent
              filterValue={filterValue}
              statusFilter={statusFilter}
              visibleColumns={visibleColumns}
              onSearchChange={onSearchChange}
              setFilterValue={setFilterValue}
              setStatusFilter={setStatusFilter}
              onRowsPerPageChange={onRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              meta={meta}
            />
          </div>
        }
        topContentPlacement="inside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={documentColumns.filter(c => Array.from(visibleColumns).includes(c.uid))}>
          {(column) => (
            <TableColumn 
              key={column.uid} 
              align={column.uid === "actions" ? "center" : "start"} 
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={<div className="py-20 text-zinc-500 font-medium">Nenhum documento encontrado.</div>}
          items={sortedItems}
          loadingContent={<TableLoading />}
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof Document | "actions")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DocumentViewDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        documentData={documentData}
      />

      <DocumentDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        documentId={documentData?.id || ""}
      />

      <DocumentEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        documentData={documentData}
      />
    </div>
  );
}