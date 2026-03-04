import React from "react";
import { Select as HeroSelect, SelectItem, SelectSection, Avatar, Chip, SelectedItems } from "@heroui/react";
import type { Selection } from "@heroui/react";
import { Key } from "@react-types/shared";

interface SelectOption {
    id?: number | string;
    key?: string;
    label?: string;
    name?: string;
    email?: string;
    avatar?: string;
    section?: string;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    [key: string]: any;
}

interface CustomSelectProps {
    items: SelectOption[];
    label?: string;
    placeholder?: string;
    variant?: "flat" | "bordered" | "underlined" | "faded";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    className?: string;
    isMultiple?: boolean;
    isMultiline?: boolean;
    description?: string;
    errorMessage?: string;
    isInvalid?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    isLoading?: boolean;
    showScrollIndicators?: boolean;
    labelPlacement?: "inside" | "outside" | "outside-left";
    defaultSelectedKeys?: Selection;
    selectedKeys?: Selection;
    defaultOpen?: boolean;
    isOpen?: boolean;
    disabledKeys?: Iterable<Key>;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    selectorIcon?: React.ReactNode;
    disableSelectorIconRotation?: boolean;
    maxListboxHeight?: number;
    itemHeight?: number;
    isVirtualized?: boolean;
    autoFocus?: boolean;
    disallowEmptySelection?: boolean;
    disableAnimation?: boolean;
    hideEmptyContent?: boolean;
    onSelectionChange?: (keys: Selection) => void;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onOpenChange?: (isOpen: boolean) => void;
    onClose?: () => void;
    scrollShadowProps?: any;
    popoverProps?: any;
    listboxProps?: any;
    classNames?: {
        base?: string;
        trigger?: string;
        label?: string;
        mainWrapper?: string;
        innerWrapper?: string;
        selectorIcon?: string;
        value?: string;
        listboxWrapper?: string;
        listbox?: string;
        popoverContent?: string;
        helperWrapper?: string;
        description?: string;
        errorMessage?: string;
        [key: string]: any;
    };
}

export const CustomSelect = ({
    items,
    label = "",
    placeholder = "Selecione uma opção",
    variant = "bordered",
    color = "default",
    size = "md",
    radius = "md",
    className = "max-w-xs",
    isMultiple = false,
    isMultiline = false,
    description,
    errorMessage,
    isInvalid,
    isDisabled,
    isRequired,
    isLoading,
    showScrollIndicators = true,
    labelPlacement,
    defaultSelectedKeys,
    selectedKeys,
    defaultOpen,
    isOpen,
    disabledKeys = [],
    startContent,
    endContent,
    selectorIcon,
    disableSelectorIconRotation,
    maxListboxHeight,
    itemHeight,
    isVirtualized,
    autoFocus,
    disallowEmptySelection,
    disableAnimation,
    hideEmptyContent,
    onSelectionChange,
    onChange,
    onOpenChange,
    onClose,
    scrollShadowProps,
    popoverProps,
    listboxProps,
    classNames,
}: CustomSelectProps) => {
    const renderValue = (items: SelectedItems<SelectOption>) => {
        if (!items.length) return null;

        if (items[0].data?.avatar) {
            if (isMultiple) {
                return (
                    <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                            <Chip key={item.key} color={color === "default" ? "primary" : color}>
                                {item.data?.name || item.data?.label}
                            </Chip>
                        ))}
                    </div>
                );
            }

            return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                    <Avatar
                        alt={item.data?.name || item.data?.label}
                        className="flex-shrink-0"
                        size="sm"
                        src={item.data?.avatar}
                    />
                    <div className="flex flex-col">
                        <span>{item.data?.name || item.data?.label}</span>
                        {item.data?.email && (
                            <span className="text-default-500 text-tiny">({item.data.email})</span>
                        )}
                    </div>
                </div>
            ));
        }

        if (isMultiple) {
            return (
                <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                        <Chip key={item.key} color={color === "default" ? "primary" : color}>
                            {item.data?.label || item.data?.name}
                        </Chip>
                    ))}
                </div>
            );
        }

        return items.map((item) => item.data?.label || item.data?.name).join(", ");
    };

    const groupedItems: Record<string, SelectOption[]> = {};
    const nonSectionItems: SelectOption[] = [];

    items.forEach(item => {
        if (item.section) {
            if (!groupedItems[item.section]) {
                groupedItems[item.section] = [];
            }
            groupedItems[item.section].push(item);
        } else {
            nonSectionItems.push(item);
        }
    });

    const hasSections = Object.keys(groupedItems).length > 0;

    const renderItem = (item: SelectOption) => {
        if (item.avatar || item.startContent || item.endContent) {
            return (
                <SelectItem
                    key={item.id || item.key}
                    textValue={item.name || item.label}
                    startContent={
                        item.avatar ? (
                            <Avatar
                                alt={item.name || item.label}
                                className="flex-shrink-0"
                                size="sm"
                                src={item.avatar}
                            />
                        ) : item.startContent
                    }
                    endContent={item.endContent}
                >
                    <div className="flex flex-col">
                        <span className="text-small">{item.name || item.label}</span>
                        {item.email && (
                            <span className="text-tiny text-default-400">{item.email}</span>
                        )}
                    </div>
                </SelectItem>
            );
        }

        return (
            <SelectItem key={item.key || item.id}>
                {item.label || item.name}
            </SelectItem>
        );
    };

    return (
        <HeroSelect
            aria-label={label || "Select"}
            className={className}
            classNames={classNames}
            color={color}
            defaultOpen={defaultOpen}
            defaultSelectedKeys={defaultSelectedKeys}
            description={description}
            disableAnimation={disableAnimation}
            disallowEmptySelection={disallowEmptySelection}
            disableSelectorIconRotation={disableSelectorIconRotation}
            disabledKeys={disabledKeys}
            errorMessage={errorMessage}
            hideEmptyContent={hideEmptyContent}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            isLoading={isLoading}
            isMultiline={isMultiline}
            isOpen={isOpen}
            isRequired={isRequired}
            isVirtualized={isVirtualized}
            itemHeight={itemHeight}
            items={hasSections ? [] : items}
            label={label}
            labelPlacement={labelPlacement}
            listboxProps={listboxProps}
            maxListboxHeight={maxListboxHeight}
            placeholder={placeholder}
            popoverProps={popoverProps}
            radius={radius}
            renderValue={renderValue}
            scrollShadowProps={scrollShadowProps}
            selectorIcon={selectorIcon}
            selectedKeys={selectedKeys}
            selectionMode={isMultiple ? "multiple" : "single"}
            showScrollIndicators={showScrollIndicators}
            size={size}
            startContent={startContent}
            endContent={endContent}
            variant={variant}
            onChange={onChange}
            onClose={onClose}
            onOpenChange={onOpenChange}
            onSelectionChange={onSelectionChange}
            autoFocus={autoFocus}
        >
            {hasSections ? (
                <>
                    {Object.entries(groupedItems).map(([section, sectionItems]) => (
                        <SelectSection key={section} title={section}>
                            {sectionItems.map(renderItem)}
                        </SelectSection>
                    ))}
                    {nonSectionItems.length > 0 && nonSectionItems.map(renderItem)}
                </>
            ) : (
                (item) => renderItem(item)
            )}
        </HeroSelect>
    );
};