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
  documentData: Document;
}

export default function TableActions({
  onView,
  onDelete,
  onEdit,
  documentData
}: TableActionsProps) {
  return (
    <div className="relative flex justify-start items-start gap-2">
      <Dropdown 
        className="bg-zinc-900 border border-gray-800 shadow-2xl !rounded-[24px] min-w-[200px]"
        backdrop="blur"
      >
        <DropdownTrigger>
          <Button
            isIconOnly
            radius="full"
            size="md"
            variant="light"
            className="hover:bg-white/10"
          >
            <FaEllipsisV className="text-zinc-400" />
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Ações do documento"
          className="p-2"
          itemClasses={{
            base: [
              "rounded-full", // Itens em formato de pílula
              "px-4",
              "py-2",
              "text-zinc-300",
              "data-[hover=true]:bg-white/10",
              "data-[hover=true]:text-white",
              "transition-all"
            ],
          }}
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
            key="delete"
            className="text-danger data-[hover=true]:bg-danger/10"
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