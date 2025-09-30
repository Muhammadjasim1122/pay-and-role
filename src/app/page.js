'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

// Import all page components
import About from './about/page';
import Pricing from './pricing/page';
import Documentation from './documentation/page';
import Blog from './blog/page';
import Contact from './contact/page';
import Recruitment from './recruitment/page';
import EmployeeLifecycle from './employee-lifecycle/page';
import ShiftsAttendance from './shifts-attendance/page';
import LeaveManagement from './leave-management/page';
import ExpenseManagement from './expense-management/page';
import PerformanceManagement from './performance-management/page';
import Payroll from './payroll/page';
import PayrollTaxReports from './payroll-tax-reports/page';
import MobileApp from './mobile-app/page';

export default function Home() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activePage, setActivePage] = useState('About');

  // Page mapping
  const pageComponents = {
    'About': About,
    'Pricing': Pricing,
    'Documentation': Documentation,
    'Blog': Blog,
    'Contact': Contact,
    'Recruitment': Recruitment,
    'Employee Lifecycle': EmployeeLifecycle,
    'Shifts & Attendance': ShiftsAttendance,
    'Leave Management': LeaveManagement,
    'Expense Management': ExpenseManagement,
    'Performance Management': PerformanceManagement,
    'Payroll': Payroll,
    'Payroll Tax & Reports': PayrollTaxReports,
    'Mobile App': MobileApp,
  };

  // Dynamic breadcrumbs based on active page
  const getBreadcrumbs = (pageName) => {
    // Main navigation items that should NOT show "Frappe HR" in breadcrumbs
    const mainNavItems = [
      'About',
      'Pricing', 
      'Documentation',
      'Blog',
      'Contact'
    ];

    // Feature items that should show the full breadcrumb path with "Frappe HR"
    const featureItems = [
      'Recruitment',
      'Employee Lifecycle', 
      'Shifts & Attendance',
      'Leave Management',
      'Expense Management',
      'Performance Management',
      'Payroll',
      'Payroll Tax & Reports',
      'Mobile App'
    ];

    if (mainNavItems.includes(pageName)) {
      // For main nav items: "Frappe > Products > [Page Name]"
      return [
        { label: "Frappe", onClick: () => console.log("Navigate to Frappe") },
        { label: "Products", onClick: () => console.log("Navigate to Products") },
        { label: pageName, onClick: () => console.log(`Navigate to ${pageName}`) }
      ];
    } else if (featureItems.includes(pageName)) {
      // For feature items: "Frappe > Products > Frappe HR > [Page Name]"
      return [
        { label: "Frappe", onClick: () => console.log("Navigate to Frappe") },
        { label: "Products", onClick: () => console.log("Navigate to Products") },
        { label: "Frappe HR", onClick: () => console.log("Navigate to Frappe HR") },
        { label: pageName, onClick: () => console.log(`Navigate to ${pageName}`) }
      ];
    } else {
      // Default: "Frappe > Products > Frappe HR"
      return [
        { label: "Frappe", onClick: () => console.log("Navigate to Frappe") },
        { label: "Products", onClick: () => console.log("Navigate to Products") },
        { label: "Frappe HR", onClick: () => console.log("Navigate to Frappe HR") }
      ];
    }
  };

  const breadcrumbs = getBreadcrumbs(activePage);

  const handleSidebarToggle = (expanded) => {
    setIsSidebarExpanded(expanded);
  };

  const handlePageChange = (pageName) => {
    setActivePage(pageName);
  };

  // Set up global navigation function
  useEffect(() => {
    window.navigateToPage = (pageName) => {
      console.log('Global navigation function called with:', pageName);
      setActivePage(pageName);
    };
    
    return () => {
      delete window.navigateToPage;
    };
  }, []);

          // Listen for navigation events from other components
          useEffect(() => {
            const handleNavigateToEmployeeLifecycle = () => {
              console.log('Event received: navigateToEmployeeLifecycle');
              setActivePage('Employee Lifecycle');
            };

            const handleNavigateToShiftsAttendance = () => {
              console.log('Event received: navigateToShiftsAttendance');
              setActivePage('Shifts & Attendance');
            };

            const handleNavigateToRecruitment = () => {
              console.log('Event received: navigateToRecruitment');
              setActivePage('Recruitment');
            };

            const handleNavigateToPricing = () => {
              console.log('Event received: navigateToPricing');
              setActivePage('Pricing');
            };

            const handleNavigateToLeaveManagement = () => {
              console.log('Event received: navigateToLeaveManagement');
              setActivePage('Leave Management');
            };

            const handleNavigateToExpenseManagement = () => {
              console.log('Event received: navigateToExpenseManagement');
              setActivePage('Expense Management');
            };

            const handleNavigateToPerformanceManagement = () => {
              console.log('Event received: navigateToPerformanceManagement');
              setActivePage('Performance Management');
            };

            const handleNavigateToPayroll = () => {
              console.log('Event received: navigateToPayroll');
              setActivePage('Payroll');
            };

            const handleNavigateToPayrollTaxReports = () => {
              console.log('Event received: navigateToPayrollTaxReports');
              setActivePage('Payroll Tax & Reports');
            };

            const handleNavigateToMobileApp = () => {
              console.log('Event received: navigateToMobileApp');
              setActivePage('Mobile App');
            };

            console.log('Setting up navigation event listeners');
            window.addEventListener('navigateToEmployeeLifecycle', handleNavigateToEmployeeLifecycle);
            window.addEventListener('navigateToShiftsAttendance', handleNavigateToShiftsAttendance);
            window.addEventListener('navigateToRecruitment', handleNavigateToRecruitment);
            window.addEventListener('navigateToPricing', handleNavigateToPricing);
            window.addEventListener('navigateToLeaveManagement', handleNavigateToLeaveManagement);
            window.addEventListener('navigateToExpenseManagement', handleNavigateToExpenseManagement);
            window.addEventListener('navigateToPerformanceManagement', handleNavigateToPerformanceManagement);
            window.addEventListener('navigateToPayroll', handleNavigateToPayroll);
            window.addEventListener('navigateToPayrollTaxReports', handleNavigateToPayrollTaxReports);
            window.addEventListener('navigateToMobileApp', handleNavigateToMobileApp);
            
            return () => {
              console.log('Cleaning up navigation event listeners');
              window.removeEventListener('navigateToEmployeeLifecycle', handleNavigateToEmployeeLifecycle);
              window.removeEventListener('navigateToShiftsAttendance', handleNavigateToShiftsAttendance);
              window.removeEventListener('navigateToRecruitment', handleNavigateToRecruitment);
              window.removeEventListener('navigateToPricing', handleNavigateToPricing);
              window.removeEventListener('navigateToLeaveManagement', handleNavigateToLeaveManagement);
              window.removeEventListener('navigateToExpenseManagement', handleNavigateToExpenseManagement);
              window.removeEventListener('navigateToPerformanceManagement', handleNavigateToPerformanceManagement);
              window.removeEventListener('navigateToPayroll', handleNavigateToPayroll);
              window.removeEventListener('navigateToPayrollTaxReports', handleNavigateToPayrollTaxReports);
              window.removeEventListener('navigateToMobileApp', handleNavigateToMobileApp);
            };
          }, []);

  const ActiveComponent = pageComponents[activePage] || About;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="transition-all duration-300 ease-out">
        <Sidebar onToggle={handleSidebarToggle} onPageChange={handlePageChange} activePage={activePage} />
      </div>

      {/* Right Side - Header + Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header - Always stays in place */}
        <Header breadcrumbs={breadcrumbs} />

        {/* Main Content Area - Independent scrolling */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}
