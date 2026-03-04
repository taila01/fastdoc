'use client';

import {
  Button as HeroButton,
  ButtonProps as HeroButtonProps,
  Spinner,
} from '@heroui/react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CustomButtonProps extends Omit<HeroButtonProps, 'size' | 'variant'> {
  children: ReactNode;
  size?: keyof typeof sizeClasses | HeroButtonProps['size'];
  variant?: keyof typeof variantClasses | HeroButtonProps['variant'];
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

const sizeClasses = {
  xsm: 'px-3 py-2.5 text-sm',
  sm: 'px-4 py-3 text-sm',
  md: 'px-5 py-3.5 text-sm',
};

const variantClasses = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-600 hover:shadow-md transition-colors',
  outline:
    'bg-transparent text-brand-500 ring-2 ring-brand-500 hover:bg-brand-50 transition-colors',
  danger:
    'bg-red-500 text-white hover:bg-red-600 hover:shadow-md transition-colors',
  success:
    'bg-success-500 text-white hover:bg-success-600 hover:shadow-md transition-colors',
  clean: 'hover:bg-gray-100 text-gray-800 transition-colors',
};

const Button = ({
  children,
  size = 'md',
  variant = 'primary',
  startIcon,
  endIcon,
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}: CustomButtonProps) => {
  const customSize = sizeClasses[size as keyof typeof sizeClasses] || '';
  const customVariant = variantClasses[variant as keyof typeof variantClasses] || '';
  const padronize = 'hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <HeroButton
      {...props}
      isDisabled={disabled || isLoading}
      className={cn(customSize, customVariant, className, padronize)}
    >
      {!isLoading && startIcon && <span className="mr-2 w-full">{startIcon}</span>}
      {isLoading ? <Spinner size="sm" className="mx-auto w-full" /> : children}
      {!isLoading && endIcon && <span className="ml-2 w-full">{endIcon}</span>}
    </HeroButton>
  );
};

export default Button;
