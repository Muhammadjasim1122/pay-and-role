'use client';

import React from 'react';

const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="text-gray-400 mx-1">{'>'}</span>
          )}
          <span 
            className={`${
              index === items.length - 1 
                ? 'text-gray-600 font-medium' 
                : 'text-gray-500 hover:text-gray-700 cursor-pointer'
            }`}
            onClick={item.onClick}
          >
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
