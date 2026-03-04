import React, { ReactNode } from 'react';

// Tipos para as props do Card
type CardProps = {
  children: ReactNode | ReactNode[];
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isHoverable?: boolean;
  isPressable?: boolean;
  isBlurred?: boolean;
  isFooterBlurred?: boolean;
  isDisabled?: boolean;
  disableAnimation?: boolean;
  disableRipple?: boolean;
  allowTextSelectionOnPress?: boolean;
  classNames?: Partial<Record<'base' | 'header' | 'body' | 'footer', string>>;
  onPress?: (e: React.MouseEvent) => void;
  onPressStart?: (e: React.MouseEvent) => void;
  onPressEnd?: (e: React.MouseEvent) => void;
  onPressChange?: (isPressed: boolean) => void;
  onPressUp?: (e: React.MouseEvent) => void;
  className?: string;
};

// Componente Card principal
export const Card: React.FC<CardProps> = ({
  children,
  shadow = 'md',
  radius = 'lg',
  fullWidth = false,
  isHoverable = false,
  isPressable = false,
  isBlurred = false,
  isDisabled = false,
  disableAnimation = false,
  allowTextSelectionOnPress = false,
  classNames,
  onPress,
  onPressStart,
  onPressEnd,
  onPressChange,
  onPressUp,
  className = '',
}) => {
  // Construindo as classes CSS baseadas nas props
  const baseClasses = `
    relative overflow-hidden
    ${shadow === 'none' ? '' : shadow === 'sm' ? 'shadow-sm' : shadow === 'lg' ? 'shadow-lg' : 'shadow-md'}
    ${radius === 'none' ? '' : radius === 'sm' ? 'rounded-sm' : radius === 'lg' ? 'rounded-lg' : 'rounded-md'}
    ${fullWidth ? 'w-full' : ''}
    ${isHoverable ? 'hover:shadow-lg transition-shadow' : ''}
    ${isPressable ? 'cursor-pointer active:scale-95 transition-transform' : ''}
    ${isBlurred ? 'backdrop-blur-sm bg-white/50 dark:bg-black/50' : 'bg-white dark:bg-gray-900'}
    ${isDisabled ? 'opacity-50 pointer-events-none' : ''}
    ${disableAnimation ? '' : 'transition-all duration-200'}
    ${className}
    ${classNames?.base || ''}
  `;

  // Componente a ser renderizado (button ou div)
  const Component = isPressable ? 'button' : 'div';

  // Manipuladores de eventos para isPressable
  const handlePress = (e: React.MouseEvent) => {
    if (isPressable && onPress) onPress(e);
  };

  const handlePressStart = (e: React.MouseEvent) => {
    if (isPressable && onPressStart) onPressStart(e);
    if (isPressable && onPressChange) onPressChange(true);
  };

  const handlePressEnd = (e: React.MouseEvent) => {
    if (isPressable && onPressEnd) onPressEnd(e);
    if (isPressable && onPressChange) onPressChange(false);
  };

  const handlePressUp = (e: React.MouseEvent) => {
    if (isPressable && onPressUp) onPressUp(e);
  };

  return (
    <Component
      className={baseClasses}
      onClick={handlePress}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressUp}
      onMouseLeave={handlePressEnd}
      disabled={isDisabled}
      data-disabled={isDisabled || undefined}
      data-hoverable={isHoverable || undefined}
      data-pressable={isPressable || undefined}
      data-blurred={isBlurred || undefined}
      style={{
        userSelect: allowTextSelectionOnPress ? 'auto' : isPressable ? 'none' : 'auto',
      }}
    >
      {children}
    </Component>
  );
};

// Componente CardHeader
export type CardHeaderProps = {
  children: ReactNode | ReactNode[];
  className?: string;
};

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`px-6 py-4 flex flex-col gap-1 ${className}`}>
      {children}
    </div>
  );
};

// Componente CardBody
export type CardBodyProps = {
  children: ReactNode | ReactNode[];
  className?: string;
};

export const CardBody: React.FC<CardBodyProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`px-6 py-2 flex-grow ${className}`}>
      {children}
    </div>
  );
};

// Componente CardFooter
export type CardFooterProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  isBlurred?: boolean;
};

export const CardFooter: React.FC<CardFooterProps> = ({ 
  children, 
  className = '',
  isBlurred = false,
}) => {
  return (
    <div 
      className={`
        px-6 py-4 flex items-center
        ${isBlurred ? 'backdrop-blur-md bg-white/50 dark:bg-black/50 absolute bottom-0 z-10 border-t border-gray-200 dark:border-gray-800 w-full' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Exportação padrão do componente Card
export default Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
