'use client';

import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo - Teal green square with rounded corners */}
      <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
        {/* Person icon - simplified U shape with circle above */}
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none" 
          className="text-white"
        >
          <path 
            d="M10 2C10.5523 2 11 2.44772 11 3C11 3.55228 10.5523 4 10 4C9.44772 4 9 3.55228 9 3C9 2.44772 9.44772 2 10 2Z" 
            fill="currentColor"
          />
          <path 
            d="M6 8C6 6.89543 6.89543 6 8 6H12C13.1046 6 14 6.89543 14 8V12C14 13.1046 13.1046 14 12 14H8C6.89543 14 6 13.1046 6 12V8Z" 
            fill="currentColor"
          />
        </svg>
      </div>
      
      {/* App Name */}
      <span className="text-xl font-bold text-gray-900">
        Frappe HR
      </span>
    </div>
  );
};

export default Logo;
