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
        return <p className="font-medium text-md">{document.titulo || ""}</p>;
      case "descricao":
        return <p className="text-md">{document.descricao || ""}</p>;
      case "criado_em":
        return <p className="text-md">{document.criado_em ? formatDate(document.criado_em) : ""}</p>;
      case "status":
        return (
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${document.status === "assinado" ? "bg-green-500" : "bg-gray-400"}`} />
            <span>{document.status === "assinado" ? "Assinado" : "Pendente"}</span>
          </div>
        );
      case "actions":
        return (
          <TableActions
            onView={(doc) => handleOpenModal(doc, "view")}
            onDelete={(doc) => handleOpenModal(doc, "delete")}
            onEdit={(doc) => handleOpenModal(doc, "edit")}
            documentData={document}
          />
        );
      default:
        return cellValue ? String(cellValue) : "";
    }
  }, [handleOpenModal]);

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

  const classNames = useMemo(() => ({
    wrapper: ["max-h-[382px]", "max-w-3xl"],
    th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
    td: ["py-3"]
  }), []);

  return (
    <>
      <Table
        isCompact
        removeWrapper
        aria-label="Tabela de Documentos"
        bottomContent={
          <TableBottomContent 
            page={page} 
            pages={Math.ceil((meta?.total ?? 0) / rowsPerPage)} 
            hasSearchFilter={Boolean(filterValue)} 
            setPage={setPage} 
          />
        }
        bottomContentPlacement="outside"
        classNames={classNames}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={
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
        }
        topContentPlacement="inside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={documentColumns.filter(c => Array.from(visibleColumns).includes(c.uid))}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent="Sem documentos para exibir"
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

      <DocumentViewDialog isOpen={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} documentData={documentData} />
      <DocumentDeleteDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} documentId={documentData?.id || ""} />
      <DocumentEditDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} documentData={documentData} />
    </>
  );
}