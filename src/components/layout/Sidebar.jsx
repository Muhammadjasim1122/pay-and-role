'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  BriefcaseBusiness,
  Folder,
  Users,
  Monitor,
  Wrench,
  Settings,
  Plug,
  Link2,
  Star,
  ClipboardList,
  Shield,
  Heart,
  Menu as MenuIcon,
  ChevronDown,
  Coins,
  PieChart,
  Hammer,
  FileText,
  UserPlus,
  ArrowUpRight,
  CalendarDays
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, setActiveContent, activeContent }) {   // ✅ props passed from parent
  const [expandedSections, setExpandedSections] = useState({
    public: true,
    payroll: false,
    hr: true,
    recruitment: true,
    lifecycle: false,
    performance: false,
    attendance: false,
    expenseClaims: false,
    users: false
  });
  
  // Helper: active when exact match OR when navigating to that item's form/edit
  const isContentActive = (contentId) => {
    if (!activeContent) return false;
    if (activeContent === contentId) return true;
    // Only treat as active for common form/edit routes of the same base id
    const formLikePrefixes = ['-form', '-edit-'];
    return formLikePrefixes.some((suffix) => activeContent.startsWith(`${contentId}${suffix}`));
  };

  // Add smooth transitions for color changes
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .sidebar-item {
        transition: background-color 0.2s ease, color 0.2s ease;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Shift ONLY the page content container (not the whole page)
  useEffect(() => {
    const contentEl =
      document.getElementById('page-content') ||
      document.querySelector('[data-page-content]') ||
      document.querySelector('.page-content') ||
      document.querySelector('main');
    if (!contentEl) return;

    const previousMargin = contentEl.style.marginLeft;
    const previousTransition = contentEl.style.transition;
    // contentEl.style.transition = 'margin-left 200ms ease';
    // contentEl.style.marginLeft = isOpen ? '16rem' : '0px';

    return () => {
      contentEl.style.marginLeft = previousMargin;
      contentEl.style.transition = previousTransition;
    };
  }, [isOpen]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Removed extra standalone items (projects/website/tools/payroll per requirement)
  const menuItems = [];

  const getIcon = (iconName, size = 16) => {
    const commonProps = { size: size, strokeWidth: 1.75, className: 'shrink-0' };
    const map = {
      briefcase: <Briefcase {...commonProps} />,
      briefcaseOutline: <BriefcaseBusiness {...commonProps} />,
      folder: <Folder {...commonProps} />,
      users: <Users {...commonProps} />,
      monitor: <Monitor {...commonProps} />,
      star: <Star {...commonProps} />,
      clipboard: <ClipboardList {...commonProps} />,
      shield: <Shield {...commonProps} />,
      heart: <Heart {...commonProps} />,
      wrench: <Wrench {...commonProps} />,
      settings: <Settings {...commonProps} />,
      plug: <Plug {...commonProps} />,
      link2: <Link2 {...commonProps} />,
      coins: <Coins {...commonProps} />,
      'pie-chart': <PieChart {...commonProps} />,
      hammer: <Hammer {...commonProps} />,
      'file-text': <FileText {...commonProps} />,
      'user-plus': <UserPlus {...commonProps} />,
      'arrow-up-right': <ArrowUpRight {...commonProps} />,
      calendar: <CalendarDays {...commonProps} />
    };
    return map[iconName] || null;
  };

  return (
    <aside className={`border-r border-gray-200 h-full overflow-y-auto transform transition-transform duration-200 ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'}`}>
      <div className="p-2">
        {/* Sidebar header removed to avoid duplication; header lives above */}
      

        {/* Menu Items */}
        <nav className="space-y-0">
        {/* Root groups (no PUBLIC wrapper) */}
        <div className="mt-0 space-y-0">
                {/* HR (collapsible group) */}
                <button
                  onClick={() => toggleSection('hr')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out"
                >
                  <span className="flex items-center space-x-2">
                    {getIcon('briefcase')}
                    <span>HR</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.hr ? 'rotate-180' : ''}`} />
                </button>

                {expandedSections.hr && (
                  <div className="pl-6 space-y-1 mt-1">
                     <button 
                      onClick={() => setActiveContent('hr-dashboard')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('hr-dashboard')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('pie-chart', 14)}
                      <span>HR Dashboard</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('dashboard-details')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('dashboard-details')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('file-text', 14)}
                      <span>Dashboard Details</span>
                    </button>
        <button 
          onClick={() => setActiveContent('employee-list')}
          className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
            isContentActive('employee-list') || activeContent === 'employee'
              ? 'bg-gray-200 text-gray-800'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          {getIcon('users', 14)}
          <span>Employee</span>
        </button>
        <button 
          onClick={() => setActiveContent('holiday-list')}
          className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
            isContentActive('holiday-list')
              ? 'bg-gray-200 text-gray-800'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          {getIcon('calendar', 14)}
          <span>Holiday List</span>
        </button>
                    <button 
                      onClick={() => setActiveContent('leave-application-list')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('leave-application')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('heart', 14)}
                      <span>Leave Application</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('expense-claims-dashboard')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[12px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('expense-claims-dashboard')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('clipboard', 14)}
                      <span>Expense Claims Dashboard</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('expense-claims-details')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('expense-claims-details')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('file-text', 14)}
                      <span>Expense Claims Details</span>
                    </button>
                  </div>
                )}

                {/* Recruitment (collapsible group) */}
                    <button 
                  onClick={() => toggleSection('recruitment')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out"
                    >
                  <span className="flex items-center space-x-2">
                      {getIcon('users')}
                      <span>Recruitment</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.recruitment ? 'rotate-180' : ''}`} />
                </button>

                {expandedSections.recruitment && (
                  <div className="pl-6 space-y-1 mt-1">
                    <button 
                      onClick={() => setActiveContent('recruitment-dashboard')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('recruitment-dashboard')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('pie-chart', 14)}
                      <span>Recruitment Dashboard</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('recruitment-details')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('recruitment-details')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('file-text', 14)}
                      <span>Recruitment Details</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('job-opening')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('job-opening')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('briefcase', 14)}
                      <span>Job Opening</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('job-applicant')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('job-applicant')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('user-plus', 14)}
                      <span>Job Applicant</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('job-offer')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('job-offer')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('star', 14)}
                      <span>Job Offer</span>
                    </button>
                  </div>
                )}

                {/* Employee Lifecycle (collapsible group) */}
                <button
                  onClick={() => toggleSection('lifecycle')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out"
                >
                  <span className="flex items-center space-x-2">
                      {getIcon('briefcaseOutline')}
                      <span>Employee Lifecycle</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.lifecycle ? 'rotate-180' : ''}`} />
                </button>

                {expandedSections.lifecycle && (
                  <div className="pl-6 space-y-1 mt-1">
                    <button 
                      onClick={() => setActiveContent('lifecycle-dashboard')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('lifecycle-dashboard')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('pie-chart', 14)}
                      <span>Emp Lifecycle Dashboard</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('lifecycle-details')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('lifecycle-details')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('file-text', 14)}
                      <span>Emp Lifecycle Details</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('employee-onboarding')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('employee-onboarding')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('user-plus', 14)}
                      <span>Employee Onboarding</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('employee-separation')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('employee-separation')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('users', 14)}
                      <span>Employee Separation</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('employee-grievance')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('employee-grievance')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('file-text', 14)}
                      <span>Employee Grievance</span>
                    </button>
                  </div>
                )}

                {/* Performance Dropdown */}
                <div>
                  <button
                    onClick={() => toggleSection('performance')}
                    className="w-full flex items-center justify-between px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out"
                  >
                    <div className="flex items-center space-x-2">
                      {getIcon('star')}
                      <span>Performance</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.performance ? 'rotate-180' : ''}`} />
                  </button>

                  {expandedSections.performance && (
                    <div className="pl-3 space-y-1 mt-1">
                      <button 
                        onClick={() => setActiveContent('appraisal')}
                        className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                          isContentActive('appraisal')
                            ? 'bg-gray-200 text-gray-800'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {getIcon('file-text', 14)}
                        <span>Appraisal</span>
                      </button>
                      <button 
                        onClick={() => setActiveContent('performance-feedback')}
                        className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                          isContentActive('performance-feedback')
                            ? 'bg-gray-200 text-gray-800'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {getIcon('file-text', 14)}
                        <span>Emp Performance Feedback</span>
                      </button>
                      <button 
                        onClick={() => setActiveContent('goal')}
                        className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                          isContentActive('goal')
                            ? 'bg-gray-200 text-gray-800'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {getIcon('file-text', 14)}
                        <span>Goal</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Shift & Attendance (collapsible group) */}
                <button
                  onClick={() => toggleSection('attendance')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out"
                >
                  <span className="flex items-center space-x-2">
                      {getIcon('clipboard')}
                      <span>Shift & Attendance</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.attendance ? 'rotate-180' : ''}`} />
                </button>

                {expandedSections.attendance && (
                  <div className="pl-6 space-y-1 mt-1">
                    <button 
                      onClick={() => setActiveContent('attendance-dashboard')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('attendance-dashboard')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('pie-chart', 14)}
                      <span>Attendance Dashboard</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('attendance-details')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('attendance-details')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('file-text', 14)}
                      <span>Attendance Details</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('shift-schedule')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('shift-schedule')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('clipboard', 14)}
                      <span>Shift Schedule</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('attendance')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('attendance')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('clipboard', 14)}
                      <span>Attendance</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('shift-request')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('shift-request')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('clipboard', 14)}
                      <span>Shift Request</span>
                    </button>
                    {/* Shift Attendance removed per requirements */}
                  </div>
                )}

              {/* Other Siblings under PUBLIC */}
              <div>
                {/* Expense Claims (collapsible group) */}
                <button
                  onClick={() => toggleSection('expenseClaims')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out"
                >
                  <span className="flex items-center space-x-2">
                    {getIcon('clipboard')}
                    <span>Expense Claims</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.expenseClaims ? 'rotate-180' : ''}`} />
                </button>

                {expandedSections.expenseClaims && (
                  <div className="pl-6 space-y-1 mt-1">
                    <button 
                      onClick={() => setActiveContent('expense-claims')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('expense-claims')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('file-text', 14)}
                      <span>Expense Claim</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('employee-advance')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('employee-advance')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('file-text', 14)}
                      <span>Employee Advance</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('expense-claims-dashboard')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('expense-claims-dashboard')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('pie-chart', 14)}
                      <span>Dashboard</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('expense-claims-details')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('expense-claims-details')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('file-text', 14)}
                      <span>Details</span>
                    </button>
                  </div>
                )}
                {/* Projects removed */}

                {/* Users (collapsible group) */}
                <button 
                  onClick={() => toggleSection('users')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out"
                >
                  <span className="flex items-center space-x-2">
                    {getIcon('users')}
                    <span>Users</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.users ? 'rotate-180' : ''}`} />
                </button>

                {expandedSections.users && (
                  <div className="pl-6 space-y-1 mt-1">
                    <button 
                      onClick={() => setActiveContent('user')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('user')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('file-text', 14)}
                      <span>User</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('user-type')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('user-type')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('file-text', 14)}
                      <span>User Type</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('role')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('role')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('file-text', 14)}
                      <span>Role</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('permission-manager')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('permission-manager')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('file-text', 14)}
                      <span>Permission Manager</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('user-profile')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('user-profile')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('file-text', 14)}
                      <span>User Profile</span>
                    </button>
                  </div>
                )}
                {/* Website and Tools removed */}
              </div>

            </div>
            {/* Payroll, Standalone and below items removed */}
        </nav>
      </div>
    </aside>
  );
}