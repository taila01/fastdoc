import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { FaEllipsisV } from "react-icons/fa";

export type ActionItemType = {
  key: string;
  label: string;
  onClick: (data: any) => void;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  disabled?: boolean;
  showIf?: boolean;
}

interface TableActionsProps<T> {
  actions: ActionItemType[];
  data: T;
  buttonSize?: "sm" | "md" | "lg";
  buttonVariant?: "light" | "flat" | "solid" | "bordered";
  className?: string;
}

export default function TableActions<T>({
  actions,
  data,
  buttonSize = "md",
  buttonVariant = "light",
  className = ""
}: TableActionsProps<T>) {
  return (
    <div className={`relative flex justify-start items-start gap-2 ${className}`}>
      <Dropdown className="bg-background border-1 border-default-200">
        <DropdownTrigger>
          <Button
            isIconOnly
            radius="full"
            size={buttonSize}
            variant={buttonVariant}
          >
            <FaEllipsisV className="text-default-400" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className="text-center"
          aria-label="Ações da tabela"
        >
          {actions.filter(action => action.showIf !== false).map((action) => (
            <DropdownItem
              key={action.key}
              color={action.color}
              isDisabled={action.disabled}
              onPress={() => action.onClick(data)}
            >
              {action.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}