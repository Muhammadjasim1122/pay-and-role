'use client';

import React, { useState } from 'react';
import Logo from './Logo';
import SidebarItem from './SidebarItem';

const Sidebar = ({ onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
    onToggle?.(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    onToggle?.(false);
  };

  // Navigation items
  const mainNavItems = [
    { 
      icon: <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-600 text-sm font-bold">i</div>, 
      text: "About", 
      isActive: true 
    },
    { 
      icon: <div className="w-5 h-5 flex items-center justify-center text-gray-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      </div>, 
      text: "Pricing" 
    },
    { 
      icon: <div className="w-5 h-5 flex items-center justify-center text-gray-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      </div>, 
      text: "Documentation" 
    },
    { 
      icon: <div className="w-5 h-5 flex items-center justify-center text-gray-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      </div>, 
      text: "Blog" 
    },
    { 
      icon: <div className="w-5 h-5 flex items-center justify-center text-gray-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>, 
      text: "Contact" 
    },
  ];

  const featureItems = [
    { 
      icon: <div className="w-5 h-5 flex items-center justify-center text-gray-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
          <line x1="16" y1="3" x2="16" y2="7"/>
          <line x1="20" y1="5" x2="12" y2="5"/>
        </svg>
      </div>, 
      text: "Recruitment" 
    },
    { 
      icon: <div className="w-5 h-5 flex items-center justify-center text-gray-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </div>, 
      text: "Employee Lifecycle" 
    },
    { 
      icon: <div className="w-5 h-5 flex items-center justify-center text-gray-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      </div>, 
      text: "Shifts & Attendance" 
    },
    { 
      icon: <div className="w-5 h-5 flex items-center justify-center text-gray-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      </div>, 
      text: "Leave Management" 
    },
    { 
      icon: <div className="w-5 h-5 flex items-center justify-center text-gray-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      </div>, 
      text: "Expense Management" 
    },
    { 
      icon: <div className="w-5 h-5 flex items-center justify-center text-gray-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
        </svg>
      </div>, 
      text: "Performance Management" 
    },
    { 
      icon: <div className="w-5 h-5 flex items-center justify-center text-gray-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      </div>, 
      text: "Payroll" 
    },
    { 
      icon: <div className="w-5 h-5 flex items-center justify-center text-gray-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
        </svg>
      </div>, 
      text: "Payroll Tax & Reports" 
    },
    { 
      icon: <div className="w-5 h-5 flex items-center justify-center text-gray-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      </div>, 
      text: "Mobile App" 
    },
  ];

  return (
    <div
      className={`
        h-full bg-white border-r border-gray-200 transition-all duration-300 ease-out
        ${isExpanded ? 'w-64' : 'w-16'}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo Section */}
      <div className="p-3 border-b border-gray-200">
        {isExpanded ? (
          <Logo className="justify-start" />
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
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
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div className="py-1">
        {mainNavItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            isActive={item.isActive}
            isExpanded={isExpanded}
            onClick={() => console.log(`Clicked ${item.text}`)}
          />
        ))}
      </div>

      {/* Features Section */}
      <div className="py-1">
        {isExpanded && (
          <div className="px-3 py-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Features
            </span>
          </div>
        )}
        
        {featureItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            isExpanded={isExpanded}
            onClick={() => console.log(`Clicked ${item.text}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
