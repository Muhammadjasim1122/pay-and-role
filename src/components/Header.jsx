'use client';

import React from 'react';
import Breadcrumbs from './Breadcrumbs';

const Header = ({ breadcrumbs = [] }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumbs */}
        <div className="flex-1">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        
        {/* Right side - Get Started Link */}
        <div className="flex items-center">
          <a 
            href="#" 
            className="text-gray-900 hover:text-gray-700 font-medium text-sm flex items-center gap-1 transition-colors"
          >
            Get started with Frappe HR
            <span className="text-gray-500">{'→'}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
