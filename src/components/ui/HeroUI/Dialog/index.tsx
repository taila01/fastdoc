import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

interface CustomModalProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  backdrop?: "opaque" | "blur" | "transparent";
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  isDisabled?: boolean;
  hideSecondaryButton?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full" | "xs" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
  hideCloseIcon?: boolean;
  hidePrimaryButton?: boolean;
  isKeyboardDismissDisabled?: boolean;
  isDismissable?: boolean;
  primaryButtonColor?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  secondaryButtonColor?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  primaryButtonVariant?: "solid" | "flat" | "faded" | "light" | "bordered" | "ghost" | "shadow";
  secondaryButtonVariant?: "solid" | "flat" | "faded" | "light" | "bordered" | "ghost" | "shadow";
  primaryButtonIcon?: React.ReactNode;
  secondaryButtonIcon?: React.ReactNode;
  padding?: "p-0" | "p-1" | "p-2" | "p-3" | "p-4" | "p-5" | "p-6" | "p-7" | "p-8" | "p-9" | "p-10";
  headerHidden?: boolean;
  bgColor?: string;
  headerClassName?: string;
  headerBgColor?: string;
  closeOnPrimaryAction?: boolean;
  closeOnSecondaryAction?: boolean;
  secondaryButtonClassName?: string;
  classNames?: any;
  headerBorderColor?: string;
}

export const CustomModal = ({
  title,
  children,
  isOpen,
  onClose,
  backdrop = "blur",
  primaryButtonText = "Confirmar",
  secondaryButtonText = "Cancelar",
  onPrimaryAction,
  onSecondaryAction,
  hideSecondaryButton = false,
  size = "md",
  hideCloseIcon = false,
  hidePrimaryButton = false,
  isKeyboardDismissDisabled = true,
  isDismissable = false,
  isDisabled = false,
  primaryButtonColor = "secondary",
  secondaryButtonColor = "default",
  primaryButtonVariant = "flat",
  secondaryButtonVariant = "faded",
  primaryButtonIcon,
  secondaryButtonIcon,
  padding = "p-5",
  headerHidden = false,
  bgColor = "bg-white dark:bg-neutral-900",
  headerBgColor = "",
  headerClassName = `border-b border-neutral-200 dark:border-neutral-800 p-3 ${headerBgColor} ${headerHidden ? "bg-transparent" : ""}`,
  closeOnPrimaryAction = true,
  closeOnSecondaryAction = true,
  secondaryButtonClassName,
  classNames,
  headerBorderColor,
}: CustomModalProps) => {
  const handlePrimaryAction = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
    }

    if (closeOnPrimaryAction) {
      onClose();
    }
  };

  const handleSecondaryAction = () => {
    if (onSecondaryAction) {
      onSecondaryAction();
    }

    if (closeOnSecondaryAction) {
      onClose();
    }
  };

  return (
    <Modal
      backdrop={backdrop}
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      hideCloseButton={hideCloseIcon}
      classNames={classNames || {
        wrapper: "z-999",
        backdrop: "z-999",
        base: "rounded-lg shadow-xl z-50",
        header: headerClassName,
        body: `${padding} ${bgColor}`,
        footer: "border-t border-neutral-200 dark:border-neutral-800"
      }}
      className="max-h-[90vh] overflow-y-auto"
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      isDismissable={isDismissable}
    >
      <ModalContent>
        {() => (
          <>
            {!headerHidden && (
              <>
                {headerBorderColor && <div className={`h-1 ${headerBorderColor} rounded-t-lg`} />}
                <ModalHeader className="flex items-center">
                  {typeof title === 'string' ? (
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white">{title}</h3>
                  ) : (
                    title
                  )}
                </ModalHeader>
              </>
            )}
            <ModalBody>
              <div className="text-sm text-neutral-700 dark:text-neutral-300">
                {children}
              </div>
            </ModalBody>
            {(!hideSecondaryButton || !hidePrimaryButton) && (
              <ModalFooter className="flex justify-end gap-2">
                {!hideSecondaryButton && (
                  <Button
                    color={secondaryButtonColor}
                    variant={secondaryButtonVariant}
                    onPress={handleSecondaryAction}
                    className={secondaryButtonClassName || "px-4 py-2 text-sm font-medium transition-colors bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"}
                    startContent={secondaryButtonIcon}
                  >
                    {secondaryButtonText}
                  </Button>
                )}
                {!hidePrimaryButton && (
                  <Button
                    isDisabled={isDisabled}
                    color={primaryButtonColor}
                    variant={primaryButtonVariant}
                    onPress={handlePrimaryAction}
                    className={`${isDisabled && 'cursor-not-allowed'} px-4 py-2 text-sm font-medium transition-colors`}
                    startContent={primaryButtonIcon}
                  >
                    {primaryButtonText}
                  </Button>
                )}
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};