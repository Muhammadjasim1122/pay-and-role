'use client';

import React, { useState } from 'react';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import { 
  Info, 
  CreditCard, 
  FileText, 
  BookOpen, 
  Mail, 
  Users, 
  UserCheck, 
  Clock, 
  Calendar, 
  DollarSign, 
  Star, 
  Monitor, 
  X, 
  Smartphone 
} from 'lucide-react';

const Sidebar = ({ onToggle, onPageChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState('About');

  const handleMouseEnter = () => {
    setIsExpanded(true);
    onToggle?.(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    onToggle?.(false);
  };

  const handleItemClick = (itemText) => {
    setActiveItem(itemText);
    onPageChange?.(itemText);
    console.log(`Clicked ${itemText}`);
  };

  // Navigation items
  const mainNavItems = [
    { 
      icon: <Info className="w-4 h-4 text-gray-600" />, 
      text: "About"
    },
    { 
      icon: <CreditCard className="w-4 h-4 text-gray-600" />,
      text: "Pricing"
    },
    { 
      icon: <FileText className="w-4 h-4 text-gray-600" />,
      text: "Documentation"
    },
    { 
      icon: <BookOpen className="w-4 h-4 text-gray-600" />,
      text: "Blog"
    },
    { 
      icon: <Mail className="w-4 h-4 text-gray-600" />,
      text: "Contact"
    },
  ];

  const featureItems = [
    { 
      icon: <Users className="w-4 h-4 text-gray-600" />,
      text: "Recruitment"
    },
    { 
      icon: <UserCheck className="w-4 h-4 text-gray-600" />,
      text: "Employee Lifecycle"
    },
    { 
      icon: <Clock className="w-4 h-4 text-gray-600" />,
      text: "Shifts & Attendance"
    },
    { 
      icon: <Calendar className="w-4 h-4 text-gray-600" />,
      text: "Leave Management"
    },
    { 
      icon: <DollarSign className="w-4 h-4 text-gray-600" />,
      text: "Expense Management"
    },
    { 
      icon: <Star className="w-4 h-4 text-gray-600" />,
      text: "Performance Management"
    },
    { 
      icon: <Monitor className="w-4 h-4 text-gray-600" />,
      text: "Payroll"
    },
    { 
          icon: <X className="w-4 h-4 text-gray-600" />,
      text: "Payroll Tax & Reports"
    },
    { 
        icon: <Smartphone className="w-4 h-4 text-gray-600" />,
      text: "Mobile App"
    },
  ];

  return (
    <div
      className={`
        h-fit bg-gray-50 border-r border-gray-200 transition-all duration-500 ease-out overflow-y-auto overflow-x-hidden max-h-screen px-2
        ${isExpanded ? 'w-64' : 'w-16'} 
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo Section */}
      <div className="p-3 border-b border-gray-200">
        {isExpanded ? (
          <Logo className="justify-start whitespace-nowrap" />
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center ">
        {/* Person icon - simplified U shape with circle above */}
        <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
         <path d="M22.8571 0H9.14286C4.0934 0 0 4.0934 0 9.14286V22.8571C0 27.9066 4.0934 32 9.14286 32H22.8571C27.9066 32 32 27.9066 32 22.8571V9.14286C32 4.0934 27.9066 0 22.8571 0Z" fill="#06B58B"></path>
          <path d="M9.70274 25.1431L8.15991 23.4517C10.3199 21.4974 13.097 20.4116 15.9885 20.4116C18.8799 20.4116 21.6685 21.4859 23.8171 23.4517L22.2742 25.1431C20.537 23.5659 18.3085 22.6973 15.9885 22.6973C13.6685 22.6973 11.4285 23.5659 9.69137 25.1431H9.70274Z" fill="white"></path>
           <path d="M17.0514 6.85742H10.3542V9.14314H17.0514C18.3086 9.14314 19.3372 10.1717 19.3372 11.4289V13.5545C19.3372 14.8117 18.3086 15.8403 17.0514 15.8403H14.9257C13.6685 15.8403 12.64 14.8117 12.64 13.5545V12.1145H10.3542V13.5545C10.3542 16.0803 12.4 18.126 14.9257 18.126H17.0514C19.5772 18.126 21.6229 16.0803 21.6229 13.5545V11.4289C21.6229 8.90314 19.5772 6.85742 17.0514 6.85742Z" fill="white"></path> </svg>
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
             isActive={activeItem === item.text}
             isExpanded={isExpanded}
             onClick={() => handleItemClick(item.text)}
           />
         ))}
       </div>

      {/* Features Section */}
      <div className="py-1">
        <div className="flex py-2 items-center ">
        {isExpanded && (
          <div className="">
            <span className="text-xs font-semibold text-[#7C7C7C] uppercase tracking-wider"> 
              Features
            </span>
          </div>
        )}
                    <hr className="my-2 border-gray-200 w-full mx-1" />
        </div>
        
         {featureItems.map((item, index) => (
           <SidebarItem
             key={index}
             icon={item.icon}
             text={item.text}
             isActive={activeItem === item.text}
             isExpanded={isExpanded}
             onClick={() => handleItemClick(item.text)}
           />
         ))}
      </div>
    </div>
  );
};

export default Sidebar;
