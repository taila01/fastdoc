"use client";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/react";

import { FaEllipsisV } from "react-icons/fa";

import { Document } from "@/services/interfaces/Document/DocumentInterface";

interface TableActionsProps {
  onView: (document: Document) => void;
  onDelete: (document: Document) => void;
  onEdit: (document: Document) => void;
  onDownload: (document: Document) => void;
  documentData: Document;
}

export default function TableActions({
  onView,
  onDelete,
  onEdit,
  onDownload,
  documentData
}: TableActionsProps) {
  return (
    <div className="relative flex justify-start items-start gap-2">
      <Dropdown className="bg-background border border-default-200">
        <DropdownTrigger>
          <Button
            isIconOnly
            radius="full"
            size="md"
            variant="light"
          >
            <FaEllipsisV className="text-default-400" />
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Ações do documento"
          className="text-center"
        >
          <DropdownItem
            key="view"
            onPress={() => onView(documentData)}
          >
            Visualizar Documento
          </DropdownItem>

          <DropdownItem
            key="edit"
            onPress={() => onEdit(documentData)}
          >
            Editar Documento
          </DropdownItem>

          <DropdownItem
            key="download"
            onPress={() => onDownload(documentData)}
          >
            Baixar Documento
          </DropdownItem>

          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onPress={() => onDelete(documentData)}
          >
            Excluir Documento
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}