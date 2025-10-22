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
import ERPNext from '../main/hr/erpnext';
import Integrations from '../main/hr/integrations';
import ERPNextIntegrations from '../main/hr/erpnext-integrations';
import Build from '../main/hr/build';
import HRSettings from '../main/hr/settings/hr-settings';
import HRSettingsSidebar from '../main/hr/settings/hr-settings-sidebar';
import HolidayList from '../main/hr/settings/holiday-list';
import Employee from '../main/hr/settings/employee';
import LeaveType from '../main/hr/settings/leave-type';
import LeaveAllocation from '../main/hr/settings/leave-allocation';
import LeaveApplication from '../main/hr/settings/leave-application';

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
    } else if (activeContent === 'erpnext-settings') {
      // Update browser title
      document.title = 'ERPNext Settings - HRM App';
    } else if (activeContent === 'integrations') {
      // Update browser title
      document.title = 'Integrations - HRM App';
    } else if (activeContent === 'erpnext-integrations') {
      // Update browser title
      document.title = 'ERPNext Integrations - HRM App';
    } else if (activeContent === 'build') {
      // Update browser title
      document.title = 'Build - HRM App';
    } else if (activeContent === 'hr-settings') {
      // Update browser title
      document.title = 'HR Settings - HRM App';
    } else if (activeContent === 'holiday-list') {
      // Update browser title
      document.title = 'Holiday List - HRM App';
    } else if (activeContent === 'employee') {
      // Update browser title
      document.title = 'New Employee - HRM App';
    } else if (activeContent === 'leave-type') {
      // Update browser title
      document.title = 'New Leave Type - HRM App';
    } else if (activeContent === 'leave-allocation') {
      // Update browser title
      document.title = 'New Leave Allocation - HRM App';
    } else if (activeContent === 'leave-application') {
      // Update browser title
      document.title = 'New Leave Application - HRM App';
    } else {
      // Reset to default
      document.title = 'HRM App';
    }
  }, [activeContent]);

  // Handle browser back/forward navigation and custom events
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
      } else if (event.state?.activeContent === 'erpnext-settings') {
        setActiveContent('erpnext-settings');
      } else if (event.state?.activeContent === 'integrations') {
        setActiveContent('integrations');
      } else if (event.state?.activeContent === 'erpnext-integrations') {
        setActiveContent('erpnext-integrations');
      } else if (event.state?.activeContent === 'build') {
        setActiveContent('build');
      } else if (event.state?.activeContent === 'hr-settings') {
        setActiveContent('hr-settings');
      } else if (event.state?.activeContent === 'holiday-list') {
        setActiveContent('holiday-list');
      } else if (event.state?.activeContent === 'employee') {
        setActiveContent('employee');
      } else if (event.state?.activeContent === 'leave-type') {
        setActiveContent('leave-type');
      } else if (event.state?.activeContent === 'leave-allocation') {
        setActiveContent('leave-allocation');
      } else if (event.state?.activeContent === 'leave-application') {
        setActiveContent('leave-application');
      } else {
        setActiveContent('default');
      }
    };

    const handleSetActiveContent = (event) => {
      setActiveContent(event.detail);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('setActiveContent', handleSetActiveContent);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('setActiveContent', handleSetActiveContent);
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
        {/* Sidebar - Hide for Holiday List, Leave Type, Leave Allocation, and Leave Application */}
        {activeContent !== 'holiday-list' && activeContent !== 'leave-type' && activeContent !== 'leave-allocation' && activeContent !== 'leave-application' && (
          <>
            {(activeContent === 'hr-settings' || activeContent === 'employee') ? (
              <HRSettingsSidebar 
                isOpen={isSidebarOpen} 
                setIsOpen={setIsSidebarOpen} 
                setActiveContent={setActiveContent} 
              /> 
            ) : ( 
              <Sidebar 
                isOpen={isSidebarOpen} 
                setIsOpen={setIsSidebarOpen} 
                setActiveContent={setActiveContent} 
              /> 
            )}
          </>
        )}

        {/* Main Content */}
        <main
          id="page-content"
          className="flex-1 overflow-auto"
        >
          {activeContent === 'hr' ? <HR /> : activeContent === 'recruitment' ? <Recruitment /> : activeContent === 'lifecycle' ? <Lifecycle /> 
          : activeContent === 'performance' ? <Performance /> : activeContent === 'shift-attendance' ? <ShiftAttendance /> : activeContent === 'expense-claims' ? <ExpenseClaims /> : activeContent === 'leaves' ? <Leaves /> : activeContent === 'projects' ? <Projects /> : activeContent === 'users' ? <Users /> : activeContent === 'website' ? <Website /> : activeContent === 'payroll' ? <Payroll /> : activeContent === 'salary-payout' ? <SalaryPayout /> : activeContent === 'tax-and-payout' ? <TaxAndPayout /> : activeContent === 'tools' ? <Tools /> 
          : activeContent === 'erpnext-settings' ? <ERPNext /> : activeContent === 'integrations' ? <Integrations /> 
           : activeContent === 'erpnext-integrations' ? <ERPNextIntegrations /> : activeContent === 'build' ? <Build />
            : activeContent === 'hr-settings' ? <HRSettings /> : activeContent === 'holiday-list' ? <HolidayList /> : activeContent === 'employee' ? <Employee /> : activeContent === 'leave-type' ? <LeaveType /> : activeContent === 'leave-allocation' ? <LeaveAllocation /> : activeContent === 'leave-application' ? <LeaveApplication /> : children}
        </main>
      </div>
    </div>
  );
}
