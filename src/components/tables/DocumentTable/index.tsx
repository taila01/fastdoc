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

import TableBottomContent from "@/components/tables/DocumentTable/components/TableBottomContent";
import DocumentDeleteDialog from "@/components/tables/DocumentTable/dialogs/DocumentDeleteDialog";
import DocumentViewDialog from "@/components/tables/DocumentTable/dialogs/DocumentViewDialog";
import DocumentEditDialog from "@/components/tables/DocumentTable/dialogs/DocumentEditDialog";
import TableTopContent from "@/components/tables/DocumentTable/components/TableTopContent";
import TableLoading from "@/components/tables/TableLoading";
import TableActions from "@/components/tables/DocumentTable/components/TableActions";

export default function DocumentTable() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [documentData, setDocumentData] = useState<Document | undefined>(undefined);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");

  const { data, isLoading } = useDocuments(page, rowsPerPage, filterValue);
  const meta = data?.meta;

  const documentsData = useMemo(() => {
    if (!data?.data) return [];
    return Array.isArray(data.data) ? data.data : [data.data as Document];
  }, [data]);

  const visibleColumns = useMemo(() => new Set(INITIAL_VISIBLE_COLUMNS), []);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "titulo",
    direction: "ascending",
  });

  const handleView = useCallback((doc: Document) => {
    setDocumentData(doc);
    setIsViewDialogOpen(true);
  }, []);

  const handleDelete = useCallback((doc: Document) => {
    setDocumentData(doc);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleEdit = useCallback((doc: Document) => {
    setDocumentData(doc);
    setIsEditDialogOpen(true);
  }, []);

  const handleOpenModal = useCallback(
    (doc: Document, type: "view" | "delete" | "edit") => {
      if (type === "view") handleView(doc);
      if (type === "delete") handleDelete(doc);
      if (type === "edit") handleEdit(doc);
    },
    [handleView, handleDelete, handleEdit]
  );

  const pages = Math.ceil((meta?.total ?? 0) / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    return documentColumns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const sortedItems = useMemo(() => {
    if (!documentsData || documentsData.length === 0) return [];
    return [...documentsData].sort((a: Document, b: Document) => {
      const first = String(a[sortDescriptor.column as keyof Document] || "");
      const second = String(b[sortDescriptor.column as keyof Document] || "");
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, documentsData]);

  const renderCell = useCallback(
    (document: Document, columnKey: keyof Document | "actions") => {
      const cellValue = document[columnKey as keyof Document];

      switch (columnKey) {
        case "titulo":
          return <p className="text-bold text-md">{document.titulo || ""}</p>;
        case "descricao":
          return <p className="text-md">{document.descricao || ""}</p>;
        case "criado_em":
          return <p className="text-md">{document.criado_em ? formatDate(document.criado_em) : ""}</p>;
        case "status":
          return (
            <div className="flex items-center">
              <span
                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  document.status === "assinado" ? "bg-green-500" : "bg-gray-400"
                }`}
              />
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
    },
    [handleOpenModal]
  );

  const onRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value || "");
    if (value) setPage(1);
  }, []);

  const classNames = useMemo(
    () => ({
      table: "min-w-full divide-y divide-gray-200 dark:divide-gray-700",
      wrapper: [
        "overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700",
        "bg-white dark:bg-gray-800 shadow-sm",
        "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600",
        "scrollbar-track-gray-100 dark:scrollbar-track-gray-700",
      ],
      th: [
        "px-4 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100",
        "bg-gray-50 dark:bg-gray-700/50",
      ],
      td: [
        "px-4 py-4 text-sm whitespace-nowrap",
        "border-b border-gray-200 dark:border-gray-700",
        "transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/50",
      ],
      tr: "transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/50",
      baseRow: "transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/50",
      selectedRow: "bg-blue-50 dark:bg-blue-900/20",
    }),
    []
  );

  const validItems = Array.isArray(sortedItems) ? sortedItems : [];

  return (
    <>
      <Table
        isCompact
        removeWrapper
        bottomContent={
          <TableBottomContent page={page} pages={pages} hasSearchFilter={hasSearchFilter} setPage={setPage} />
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
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} allowsSorting={column.sortable} className="text-md font-medium">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
          <TableBody
          emptyContent="Sem documentos para exibir"
          items={validItems}
          loadingContent={<TableLoading />}
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="text-md">
                  {renderCell(item, columnKey as keyof Document | "actions")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DocumentViewDialog isOpen={isViewDialogOpen} onClose={() => { setIsViewDialogOpen(false); setDocumentData(undefined); }} documentData={documentData} />
      <DocumentDeleteDialog isOpen={isDeleteDialogOpen} onClose={() => { setIsDeleteDialogOpen(false); setDocumentData(undefined); }} documentId={documentData?.id || ""} />
      <DocumentEditDialog isOpen={isEditDialogOpen} onClose={() => { setIsEditDialogOpen(false); setDocumentData(undefined); }} documentData={documentData} />
    </>
  );
}