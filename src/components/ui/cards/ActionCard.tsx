import React from 'react';
import { Card, CardBody, CardFooter, Spinner, Tooltip } from "@heroui/react";
import { IconType } from 'react-icons';

interface ActionCardProps {
    icon: IconType;
    label: string;
    onPress: () => void;
    isDisabled?: boolean;
    isLoading?: boolean;
    iconColor?: string;
    iconBgColor?: string;
    footerText?: string;
    tooltipContent?: string;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export default function ActionCard({
    icon: Icon,
    label,
    onPress,
    isDisabled = false,
    isLoading = false,
    iconColor,
    iconBgColor,
    footerText,
    tooltipContent,
    variant = 'default'
}: ActionCardProps) {

    const getVariantStyles = () => {
        const variants = {
            default: {
                card: 'bg-white dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-800/50 hover:border-gray-300 dark:hover:border-gray-700 dark:backdrop-blur-md',
                iconBg: iconBgColor || 'bg-gray-100 dark:bg-gray-800/80',
                iconColor: iconColor || 'text-gray-600 dark:text-gray-400',
                text: 'text-gray-900 dark:text-gray-100',
                hoverGlow: 'hover:shadow-gray-200/50 dark:hover:shadow-gray-800/30'
            },
            primary: {
                card: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:bg-blue-950/30 dark:backdrop-blur-md border-blue-200/50 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700',
                iconBg: iconBgColor || 'bg-blue-100 dark:bg-blue-900/50',
                iconColor: iconColor || 'text-blue-600 dark:text-blue-400',
                text: 'text-blue-900 dark:text-blue-100',
                hoverGlow: 'hover:shadow-blue-200/50 dark:hover:shadow-blue-800/30'
            },
            success: {
                card: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:bg-emerald-950/30 dark:backdrop-blur-md border-emerald-200/50 dark:border-emerald-800/50 hover:border-emerald-300 dark:hover:border-emerald-700',
                iconBg: iconBgColor || 'bg-emerald-100 dark:bg-emerald-900/50',
                iconColor: iconColor || 'text-emerald-600 dark:text-emerald-400',
                text: 'text-emerald-900 dark:text-emerald-100',
                hoverGlow: 'hover:shadow-emerald-200/50 dark:hover:shadow-emerald-800/30'
            },
            warning: {
                card: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:bg-amber-950/30 dark:backdrop-blur-md border-amber-200/50 dark:border-amber-800/50 hover:border-amber-300 dark:hover:border-amber-700',
                iconBg: iconBgColor || 'bg-amber-100 dark:bg-amber-900/50',
                iconColor: iconColor || 'text-amber-600 dark:text-amber-400',
                text: 'text-amber-900 dark:text-amber-100',
                hoverGlow: 'hover:shadow-amber-200/50 dark:hover:shadow-amber-800/30'
            },
            danger: {
                card: 'bg-gradient-to-br from-red-50 to-rose-50 dark:bg-red-950/30 dark:backdrop-blur-md border-red-200/50 dark:border-red-800/50 hover:border-red-300 dark:hover:border-red-700',
                iconBg: iconBgColor || 'bg-red-100 dark:bg-red-900/50',
                iconColor: iconColor || 'text-red-600 dark:text-red-400',
                text: 'text-red-900 dark:text-red-100',
                hoverGlow: 'hover:shadow-red-200/50 dark:hover:shadow-red-800/30'
            }
        };
        return variants[variant];
    };

    const styles = getVariantStyles();

    return (
        <Tooltip
            content={tooltipContent || label}
            delay={300}
            className="text-sm"
        >
            <Card
                isPressable={!isDisabled && !isLoading}
                onPress={onPress}
                className={`
          w-full h-full min-h-full flex flex-col transition-all duration-300 ease-out border backdrop-blur-sm
          ${styles.card}
          ${isDisabled || isLoading
                        ? 'opacity-40 cursor-not-allowed saturate-50'
                        : `hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] cursor-pointer ${styles.hoverGlow}`
                    }
          ${isLoading ? 'animate-pulse' : ''}
        `}
                isDisabled={isDisabled || isLoading}
            >
                <CardBody className="flex flex-col items-center justify-center gap-3 py-3 px-3 flex-1 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

                    {/* Icon container */}
                    <div className={`
            relative ${styles.iconBg} p-2.5 rounded-xl shadow-sm
            transition-transform duration-300 ease-out
            ${!isDisabled && !isLoading ? 'group-hover:scale-110' : ''}
          `}>
                        <Icon className={`${styles.iconColor} w-5 h-5 transition-colors duration-200`} />

                        {/* Subtle glow effect */}
                        <div className={`
              absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300
              ${!isDisabled && !isLoading ? 'group-hover:opacity-20' : ''}
              ${styles.iconBg}
            `} />
                    </div>

                    {/* Label */}
                    <p className={`
            text-xs font-semibold text-center leading-tight transition-colors duration-200
            ${isDisabled || isLoading
                            ? 'text-gray-400 dark:text-gray-600'
                            : styles.text
                        }
          `}>
                        {label}
                    </p>

                    {/* Loading indicator */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin opacity-60" />
                        </div>
                    )}
                </CardBody>

                {(isLoading || footerText) && (
                    <CardFooter className="flex justify-center py-1.5 px-3 border-t border-gray-100/50 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-800/20 mt-auto">
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {isLoading ? (
                                <span className="flex items-center gap-1.5">
                                    <Spinner color='secondary' />
                                    Carregando...
                                </span>
                            ) : (
                                footerText
                            )}
                        </span>
                    </CardFooter>
                )}
            </Card>
        </Tooltip>
    );
}