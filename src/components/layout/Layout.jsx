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
import ExpenseClaims from '../main/hr/expense-claims';
import Leaves from '../main/hr/leaves';
import Projects from '../main/hr/projects';
import Users from '../main/hr/users';
import Website from '../main/hr/website';
import Payroll from '../main/hr/payroll';
import SalaryPayout from '../main/hr/salary-payout';
import TaxAndPayout from '../main/hr/tax-and-payout';
import Tools from '../main/hr/tools';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState('default');
  
  // Debug logging
  console.log('Current activeContent:', activeContent);
  const router = useRouter();

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
    } else if (activeContent === 'expense-claims') {
      // Update browser title
      document.title = 'Expense Claims - HRM App';
    } else if (activeContent === 'leaves') {
      // Update browser title
      document.title = 'Leaves - HRM App';
    } else if (activeContent === 'projects') {
      // Update browser title
      document.title = 'Projects - HRM App';
    } else if (activeContent === 'users') {
      // Update browser title
      document.title = 'Users - HRM App';
    } else if (activeContent === 'website') {
      // Update browser title
      document.title = 'Website - HRM App';
    } else if (activeContent === 'payroll') {
      // Update browser title
      document.title = 'Payroll - HRM App';
    } else if (activeContent === 'salary-payout') {
      // Update browser title
      document.title = 'Salary Payout - HRM App';
    } else if (activeContent === 'tax-and-payout') {
      // Update browser title
      document.title = 'Tax & Payout - HRM App';
    } else if (activeContent === 'tools') {
      // Update browser title
      document.title = 'Tools - HRM App';
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
      } else if (event.state?.activeContent === 'expense-claims') {
        setActiveContent('expense-claims');
      } else if (event.state?.activeContent === 'leaves') {
        setActiveContent('leaves');
      } else if (event.state?.activeContent === 'projects') {
        setActiveContent('projects');
      } else if (event.state?.activeContent === 'users') {
        setActiveContent('users');
      } else if (event.state?.activeContent === 'website') {
        setActiveContent('website');
      } else if (event.state?.activeContent === 'payroll') {
        setActiveContent('payroll');
      } else if (event.state?.activeContent === 'salary-payout') {
        setActiveContent('salary-payout');
      } else if (event.state?.activeContent === 'tax-and-payout') {
        setActiveContent('tax-and-payout');
      } else if (event.state?.activeContent === 'tools') {
        setActiveContent('tools');
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
          {activeContent === 'hr' ? <HR /> : activeContent === 'recruitment' ? <Recruitment /> : activeContent === 'lifecycle' ? <Lifecycle /> : activeContent === 'performance' ? <Performance /> : activeContent === 'shift-attendance' ? <ShiftAttendance /> : activeContent === 'expense-claims' ? <ExpenseClaims /> : activeContent === 'leaves' ? <Leaves /> : activeContent === 'projects' ? <Projects /> : activeContent === 'users' ? <Users /> : activeContent === 'website' ? <Website /> : activeContent === 'payroll' ? <Payroll /> : activeContent === 'salary-payout' ? <SalaryPayout /> : activeContent === 'tax-and-payout' ? <TaxAndPayout /> : activeContent === 'tools' ? <Tools /> : children}
        </main>
      </div>
    </div>
  );
}
