'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';
import { DashboardProvider } from '../../contexts/DashboardContext';
import { EmployeeProvider } from '../../contexts/EmployeeContext';
import { LeaveApplicationProvider } from '../../contexts/LeaveApplicationContext';
import HR from '../main/hr/hr';
import HRDashboard from '../main/hr/hr-dashboard';
import HRDashboardForm from '../main/hr/hr-dashboard-form';
import DashboardDetails from '../main/hr/dashboard-details';
import RecruitmentDashboard from '../main/hr/recruitment-dashboard';
import RecruitmentDetails from '../main/hr/recruitment-details';
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
import EmployeeList from '../main/hr/settings/employee-list';
import LeaveType from '../main/hr/settings/leave-type';
import LeaveAllocation from '../main/hr/settings/leave-allocation';
import LeaveApplication from '../main/hr/settings/leave-application';
import LeaveApplicationList from '../main/hr/settings/leave-application-list';
import LifecycleDashboard from '../main/hr/lifecycle-dashboard';
import LifecycleDashboardForm from '../main/hr/lifecycle-dashboard-form';
import LifecycleDetails from '../main/hr/lifecycle-details';
import AttendanceDashboard from '../main/hr/attendance-dashboard';
import AttendanceDashboardForm from '../main/hr/attendance-dashboard-form';
import AttendanceDetails from '../main/hr/attendance-details';
import ExpenseClaimsDashboard from '../main/hr/expense-claims-dashboard';
import ExpenseClaimsDashboardForm from '../main/hr/expense-claims-dashboard-form';
import ExpenseClaimsDetails from '../main/hr/expense-claims-details';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState('hr-dashboard'); // Default to HR Dashboard
  
  // Debug logging
  console.log('Current activeContent:', activeContent);
  const router = useRouter();

  // Set initial content based on URL state
  useEffect(() => {
    // Check if there's a state in the browser history
    if (window.history.state?.activeContent) {
      setActiveContent(window.history.state.activeContent);
    } else {
      // Default to HR Dashboard
      setActiveContent('hr-dashboard');
    }
  }, []);

  // Listen for custom navigation events
  useEffect(() => {
    const handleSetActiveContent = (event) => {
      setActiveContent(event.detail);
    };

    window.addEventListener('setActiveContent', handleSetActiveContent);
    
    return () => {
      window.removeEventListener('setActiveContent', handleSetActiveContent);
    };
  }, []);

  // Update browser title when activeContent changes
  useEffect(() => {
    if (activeContent === 'hr') {
      // Update browser title
      document.title = 'HR - HRM App';
    } else if (activeContent === 'hr-dashboard') {
      // Update browser title
      document.title = 'HR Dashboard - HRM App';
    } else if (activeContent === 'dashboard-form') {
      // Update browser title
      document.title = 'New Dashboard - HRM App';
    } else if (activeContent === 'dashboard-details') {
      // Update browser title
      document.title = 'Dashboard Details - HRM App';
    } else if (activeContent === 'recruitment-dashboard') {
      // Update browser title
      document.title = 'Recruitment Dashboard - HRM App';
    } else if (activeContent === 'recruitment-details') {
      // Update browser title
      document.title = 'Recruitment Details - HRM App';
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
      } else if (activeContent === 'employee-list') {
        // Update browser title
        document.title = 'Employee - HRM App';
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
    } else if (activeContent === 'leave-application-list') {
      // Update browser title
      document.title = 'Leave Applications - HRM App';
    } else if (activeContent === 'lifecycle-dashboard') {
      // Update browser title
      document.title = 'Employee Lifecycle Dashboard - HRM App';
    } else if (activeContent === 'lifecycle-dashboard-form') {
      // Update browser title
      document.title = 'New Lifecycle Dashboard - HRM App';
    } else if (activeContent === 'lifecycle-details') {
      // Update browser title
      document.title = 'Employee Lifecycle Details - HRM App';
    } else if (activeContent === 'attendance-dashboard') {
      // Update browser title
      document.title = 'Attendance Dashboard - HRM App';
    } else if (activeContent === 'attendance-dashboard-form') {
      // Update browser title
      document.title = 'New Attendance Dashboard - HRM App';
    } else if (activeContent === 'attendance-details') {
      // Update browser title
      document.title = 'Attendance Details - HRM App';
    } else if (activeContent === 'expense-claims-dashboard') {
      // Update browser title
      document.title = 'Expense Claims Dashboard - HRM App';
    } else if (activeContent === 'expense-claims-dashboard-form') {
      // Update browser title
      document.title = 'New Expense Claims Dashboard - HRM App';
    } else if (activeContent === 'expense-claims-details') {
      // Update browser title
      document.title = 'Expense Claims Details - HRM App';
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
      } else if (event.state?.activeContent === 'hr-dashboard') {
        setActiveContent('hr-dashboard');
      } else if (event.state?.activeContent === 'dashboard-form') {
        setActiveContent('dashboard-form');
      } else if (event.state?.activeContent === 'dashboard-details') {
        setActiveContent('dashboard-details');
      } else if (event.state?.activeContent === 'recruitment-dashboard') {
        setActiveContent('recruitment-dashboard');
      } else if (event.state?.activeContent === 'recruitment-details') {
        setActiveContent('recruitment-details');
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
        } else if (event.state?.activeContent === 'employee-list') {
          setActiveContent('employee-list');
        } else if (event.state?.activeContent === 'employee') {
          setActiveContent('employee');
        } else if (event.state?.activeContent === 'leave-type') {
        setActiveContent('leave-type');
      } else if (event.state?.activeContent === 'leave-allocation') {
        setActiveContent('leave-allocation');
      } else if (event.state?.activeContent === 'leave-application') {
        setActiveContent('leave-application');
      } else if (event.state?.activeContent === 'leave-application-list') {
        setActiveContent('leave-application-list');
      } else if (event.state?.activeContent === 'lifecycle-dashboard') {
        setActiveContent('lifecycle-dashboard');
      } else if (event.state?.activeContent === 'lifecycle-dashboard-form') {
        setActiveContent('lifecycle-dashboard-form');
      } else if (event.state?.activeContent === 'lifecycle-details') {
        setActiveContent('lifecycle-details');
      } else if (event.state?.activeContent === 'attendance-dashboard') {
        setActiveContent('attendance-dashboard');
      } else if (event.state?.activeContent === 'attendance-dashboard-form') {
        setActiveContent('attendance-dashboard-form');
      } else if (event.state?.activeContent === 'attendance-details') {
        setActiveContent('attendance-details');
      } else if (event.state?.activeContent === 'expense-claims-dashboard') {
        setActiveContent('expense-claims-dashboard');
      } else if (event.state?.activeContent === 'expense-claims-dashboard-form') {
        setActiveContent('expense-claims-dashboard-form');
      } else if (event.state?.activeContent === 'expense-claims-details') {
        setActiveContent('expense-claims-details');
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
    <DashboardProvider>
      <EmployeeProvider>
        <LeaveApplicationProvider>
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
          {activeContent === 'hr' ? <HR /> : activeContent === 'hr-dashboard' ? <HRDashboard /> : activeContent === 'dashboard-form' ? <HRDashboardForm dashboardType="hr" isSidebarOpen={isSidebarOpen} /> : activeContent === 'recruitment-dashboard-form' ? <HRDashboardForm dashboardType="recruitment" isSidebarOpen={isSidebarOpen} /> : activeContent === 'dashboard-details' ? <DashboardDetails /> : activeContent === 'recruitment-dashboard' ? <RecruitmentDashboard /> : activeContent === 'recruitment-details' ? <RecruitmentDetails /> : activeContent === 'recruitment' ? <Recruitment /> : activeContent === 'lifecycle' ? <Lifecycle /> 
          : activeContent === 'performance' ? <Performance /> : activeContent === 'shift-attendance' ? <ShiftAttendance /> : activeContent === 'expense-claims' ? <ExpenseClaims /> : activeContent === 'leaves' ? <Leaves /> : activeContent === 'projects' ? <Projects /> : activeContent === 'users' ? <Users /> : activeContent === 'website' ? <Website /> : activeContent === 'payroll' ? <Payroll /> : activeContent === 'salary-payout' ? <SalaryPayout /> : activeContent === 'tax-and-payout' ? <TaxAndPayout /> : activeContent === 'tools' ? <Tools /> 
          : activeContent === 'erpnext-settings' ? <ERPNext /> : activeContent === 'integrations' ? <Integrations /> 
           : activeContent === 'erpnext-integrations' ? <ERPNextIntegrations /> : activeContent === 'build' ? <Build />
            : activeContent === 'hr-settings' ? <HRSettings /> : activeContent === 'holiday-list' ? <HolidayList /> : activeContent === 'employee-list' ? <EmployeeList /> : activeContent === 'employee' ? <Employee /> : activeContent === 'leave-type' ? <LeaveType /> : activeContent === 'leave-allocation' ? <LeaveAllocation /> : activeContent === 'leave-application' ? <LeaveApplication isSidebarOpen={isSidebarOpen} /> : activeContent === 'leave-application-list' ? <LeaveApplicationList /> : activeContent === 'lifecycle-dashboard' ? <LifecycleDashboard /> : activeContent === 'lifecycle-dashboard-form' ? <LifecycleDashboardForm dashboardType="lifecycle" isSidebarOpen={isSidebarOpen} /> : activeContent === 'lifecycle-details' ? <LifecycleDetails /> : activeContent === 'attendance-dashboard' ? <AttendanceDashboard /> : activeContent === 'attendance-dashboard-form' ? <AttendanceDashboardForm dashboardType="attendance" isSidebarOpen={isSidebarOpen} /> : activeContent === 'attendance-details' ? <AttendanceDetails /> : activeContent === 'expense-claims-dashboard' ? <ExpenseClaimsDashboard /> : activeContent === 'expense-claims-dashboard-form' ? <ExpenseClaimsDashboardForm dashboardType="expense-claims" isSidebarOpen={isSidebarOpen} /> : activeContent === 'expense-claims-details' ? <ExpenseClaimsDetails /> : children}
        </main>
      </div>
        </div>
        </LeaveApplicationProvider>
      </EmployeeProvider>
    </DashboardProvider>
  );
}
