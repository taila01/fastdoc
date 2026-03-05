"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { Button } from "@heroui/react";

interface ComponentCardProps {
  title?: React.ReactNode;
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  desc?: string;
  backButtonRoute?: string;
  headerButton?: {
    text: string;
    onClick?: () => void;
    variant?: "light" | "solid" | "flat" | "bordered";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    className?: string;
  };
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  aside,
  className = "",
  desc,
  backButtonRoute,
  headerButton
}) => {
  const router = useRouter();

  return (
    <div
      className={`rounded-2xl border mr-0 sm:mr-3 border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 ${className}`}
    >
      <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0">
        
        <div className="w-full">
          <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0">
            
            {title && (
              <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                {title}
              </h3>
            )}

            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              {headerButton && (
                <Button
                  variant={headerButton.variant || "light"}
                  color={headerButton.color || "primary"}
                  onClick={headerButton.onClick}
                  disabled={headerButton.disabled}
                  className={
                    headerButton.className ||
                    "shadow-sm bg-brand-500/10 text-brand-500 border border-brand-100 dark:border-brand-900"
                  }
                  size={headerButton.size || "md"}
                >
                  {headerButton.text}
                </Button>
              )}

              {aside}
            </div>
          </div>

          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>

        {backButtonRoute && (
          <button
            onClick={() => router.push(backButtonRoute)}
            className="px-3 py-1.5 align-center flex text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition whitespace-nowrap"
          >
            <IoChevronBack className="w-4 h-4 m-0.5" />
            Voltar
          </button>
        )}
      </div>

      <div className="py-3 border-t border-gray-300 dark:border-gray-800 overflow-visible">
        <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 overflow-visible">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;