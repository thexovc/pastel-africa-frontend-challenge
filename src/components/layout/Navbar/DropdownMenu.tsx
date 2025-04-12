"use client"

import { motion } from "motion/react";
import { DropdownItem as DropdownItemType } from './types';

interface DropdownMenuProps {
  isOpen: boolean;
  type: 'product' | 'resources' | 'support';
  items: DropdownItemType[];
}

const DropdownItem = ({ icon, title, description }: DropdownItemType) => (
  <div className="flex items-start space-x-3 group cursor-pointer">
    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-lg">
      {icon}
    </div>
    <div>
      <h3 className="text-gray-900 font-medium group-hover:text-purple-600">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  </div>
);

export const DropdownMenu = ({ isOpen, type, items }: DropdownMenuProps) => {
  if (!isOpen) return null;

  const isProduct = type === 'product';
  const gridCols = isProduct ? 'grid-cols-2' : 'grid-cols-1';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={`absolute top-full left-0 ${isProduct ? 'w-[600px]' : 'w-[300px]'} bg-white rounded-xl shadow-lg p-6 mt-2`}
    >
      <div className={`grid ${gridCols} gap-6`}>
        {isProduct ? (
          <>
            <div className="space-y-6">
              {items.slice(0, 6).map((item, index) => (
                <DropdownItem key={index} {...item} />
              ))}
            </div>
            <div className="space-y-6">
              {items.slice(6).map((item, index) => (
                <DropdownItem key={index + 6} {...item} />
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            {items.map((item, index) => (
              <DropdownItem key={index} {...item} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};