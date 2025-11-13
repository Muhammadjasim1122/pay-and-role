'use client';

import React from 'react';

const SidebarItem = ({ icon, text, isActive = false, onClick, isExpanded = false }) => {
  return (
    <div
      className={`
        flex items-center gap-3 px-3 py-2 cursor-pointer transition-all duration-300 ease-out
        ${isActive 
          ? 'bg-white shadow-sm rounded-lg ' 
          : 'hover:bg-gray-50 '
        }
        ${isExpanded ? 'w-full opacity-100' : 'justify-center opacity-100'}
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
          text-sm font-medium transition-all duration-300 ease-out whitespace-nowrap
          ${isActive ? 'text-gray-900' : 'text-gray-600'}
        `}>
          {text}
        </span>
      )}
    </div>
  );
};

export default SidebarItem;
