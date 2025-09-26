'use client';

import React from 'react';

const SidebarItem = ({ icon, text, isActive = false, onClick, isExpanded = false }) => {
  return (
    <div
      className={`
        flex items-center gap-3 px-3 py-2 cursor-pointer transition-all duration-150 ease-out
        ${isActive 
          ? 'bg-gray-100 border-l-4 border-gray-400' 
          : 'hover:bg-gray-50'
        }
        ${isExpanded ? 'w-full' : 'justify-center'}
      `}
      onClick={onClick}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
        {icon}
      </div>
      
      {/* Text - only show when expanded */}
      {isExpanded && (
        <span className={`
          text-sm font-medium transition-opacity duration-200
          ${isActive ? 'text-gray-900' : 'text-gray-600'}
        `}>
          {text}
        </span>
      )}
    </div>
  );
};

export default SidebarItem;
