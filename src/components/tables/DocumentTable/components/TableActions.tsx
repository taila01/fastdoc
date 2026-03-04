import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { FaEllipsisV} from "react-icons/fa";
import { Document } from "@/services/interfaces/Document/DocumentInterface";

interface TableActionsProps {
    onView: (document: Document) => void;
    onDelete: (document: Document) => void;
    onEdit: (document: Document) => void;
    documentData: Document;
}

export default function TableActions({ onView, onDelete, onEdit, documentData }: TableActionsProps) {
    return (
        <div className="relative flex justify-start items-start gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
                <DropdownTrigger>
                    <Button isIconOnly radius="full" size="md" variant="light">
                        <FaEllipsisV className="text-default-400" />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu className="text-center">
                    <DropdownItem key="view" onPress={() => onView(documentData)}>
                        Visualizar Administrador
                    </DropdownItem>
                    <DropdownItem key="edit" onPress={() => onEdit(documentData)}>
                        Alterar Administrador
                    </DropdownItem>
                    <DropdownItem key="delete" onPress={() => onDelete(documentData)}>
                        Excluir Administrador
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}