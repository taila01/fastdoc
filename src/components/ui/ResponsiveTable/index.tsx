"use client";

import React from 'react';
import { Table, TableProps } from '@heroui/react';

interface ResponsiveTableProps {
  children?: React.ReactNode;
  mobileCardRenderer?: (item: any) => React.ReactNode;
  data?: any[];
  showMobileCards?: boolean;
  className?: string;
  [key: string]: any; // Para permitir outras props do Table
}

export default function ResponsiveTable({ 
  children, 
  mobileCardRenderer, 
  data = [], 
  showMobileCards = true,
  className = "",
  ...props 
}: ResponsiveTableProps) {
  
  // Mobile Card View
  if (showMobileCards && mobileCardRenderer && data.length > 0) {
    return (
      <>
        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="overflow-x-auto admin-table-responsive">
            <Table 
              {...props}
              className={`min-w-full ${className}`}
            >
              {children as any}
            </Table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {data.map((item, index) => (
            <div key={item.id || index}>
              {mobileCardRenderer(item)}
            </div>
          ))}
        </div>
      </>
    );
  }

  // Default responsive table with horizontal scroll
  return (
    <div className="overflow-x-auto admin-table-responsive">
      <Table 
        {...props}
        className={`min-w-full ${className}`}
      >
        {children as any}
      </Table>
    </div>
  );
}
