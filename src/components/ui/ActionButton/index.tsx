"use client";

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { FaEllipsisV } from "react-icons/fa";

interface ActionItem {
  label: string;
  action: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface ActionButtonProps {
  items: ActionItem[];
  onAction: (action: string) => void;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "flat" | "solid" | "bordered";
  className?: string;
}

export default function ActionButton({
  items,
  onAction,
  isLoading = false,
  size = "md",
  variant = "light",
  className = ""
}: ActionButtonProps) {
  const availableItems = items.filter(item => !item.disabled);

  return (
    <div className={`relative flex justify-start items-start gap-2 ${className}`}>
      <Dropdown className="bg-background border-1 border-default-200">
        <DropdownTrigger>
          <Button
            isIconOnly
            radius="full"
            size={size}
            variant={variant}
            isDisabled={isLoading}
            className="min-w-unit-8 w-8 h-8"
          >
            <FaEllipsisV className="text-default-400" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className="text-center"
          aria-label="Ações disponíveis"
        >
          {availableItems.map((item) => (
            <DropdownItem
              key={item.action}
              color={item.color}
              isDisabled={isLoading}
              onPress={() => onAction(item.action)}
              startContent={item.icon}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
