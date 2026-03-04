import { Tabs, Tab } from "@heroui/react";
import { IconType } from "react-icons";
import { Key } from "@react-types/shared";

interface TabItem {
    key: string;
    title: string;
    icon?: IconType;
    disabled?: boolean;
    content?: React.ReactNode;
}

interface CustomTabsProps {
    items: TabItem[];
    variant?: "solid" | "underlined" | "bordered" | "light";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    showIcons?: boolean;
    defaultSelectedKey?: Key;
    onSelectionChange?: (key: Key) => void;
    iconClassName?: string;
}

export const CustomTabs = ({
    items,
    variant = "bordered",
    color = "primary",
    radius = "md",
    showIcons = true,
    defaultSelectedKey,
    onSelectionChange,
    iconClassName = "w-5 h-5",
}: CustomTabsProps) => {
    return (
        <div className="flex w-full flex-col">
            <Tabs
                aria-label="Opções"
                color={color}
                variant={variant}
                radius={radius}
                defaultSelectedKey={defaultSelectedKey}
                onSelectionChange={onSelectionChange}
            >
                {items.map((item) => (
                    <Tab
                        key={item.key}
                        title={
                            <div className="flex items-center space-x-2">
                                {showIcons && item.icon && (
                                    <item.icon className={iconClassName} />
                                )}
                                <span>{item.title}</span>
                            </div>
                        }
                        disabled={item.disabled}
                    >
                        {item.content}
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
};