'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';
import HR from '../main/hr/hr';
import Recruitment from '../main/hr/recruitment';
import Lifecycle from '../main/hr/lifecycle';
import Performance from '../main/hr/performance';
import ShiftAttendance from '../main/hr/shift-attendance';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState('default');
  const router = useRouter();

  console.log('Layout activeContent:', activeContent);

  // Update browser title when activeContent changes
  useEffect(() => {
    if (activeContent === 'hr') {
      // Update browser title
      document.title = 'HR - HRM App';
    } else if (activeContent === 'recruitment') {
      // Update browser title
      document.title = 'Recruitment - HRM App';
    } else if (activeContent === 'lifecycle') {
      // Update browser title
      document.title = 'Lifecycle - HRM App';
    } else if (activeContent === 'performance') {
      // Update browser title
      document.title = 'Performance - HRM App';
    } else if (activeContent === 'shift-attendance') {
      // Update browser title
      document.title = 'Shift & Attendance - HRM App';
    } else {
      // Reset to default
      document.title = 'HRM App';
    }
  }, [activeContent]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state?.activeContent === 'hr') {
        setActiveContent('hr');
      } else if (event.state?.activeContent === 'recruitment') {
        setActiveContent('recruitment');
      } else if (event.state?.activeContent === 'lifecycle') {
        setActiveContent('lifecycle');
      } else if (event.state?.activeContent === 'performance') {
        setActiveContent('performance');
      } else if (event.state?.activeContent === 'shift-attendance') {
        setActiveContent('shift-attendance');
      } else {
        setActiveContent('default');
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <Header 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen}
        activeContent={activeContent}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen}
          setActiveContent={setActiveContent}
        />

        {/* Main Content */}
        <main
          id="page-content"
          className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? ' ' : 'ml-0'}`}
        >
          {activeContent === 'hr' ? <HR /> : activeContent === 'recruitment' ? <Recruitment /> : activeContent === 'lifecycle' ? <Lifecycle /> : activeContent === 'performance' ? <Performance /> : activeContent === 'shift-attendance' ? <ShiftAttendance /> : children}
        </main>
      </div>
    </div>
  );
}
