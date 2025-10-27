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
  ArrowUpRight
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, setActiveContent, activeContent }) {   // ✅ props passed from parent
  const [expandedSections, setExpandedSections] = useState({
    public: true,
    payroll: false,
    hr: true,
    recruitment: true,
    lifecycle: false,
    performance: false
  });
  
  // Helper function to check if a content item is active
  const isContentActive = (contentId) => {
    if (!activeContent) return false;
    return activeContent === contentId || activeContent?.startsWith(`${contentId}-`);
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

  const menuItems = [
    {
      id: 'public',
      title: 'PUBLIC',
      icon: null,
      isSection: true,
      // children are rendered custom to allow HR nested list like in screenshots
    },
    {
      id: 'payroll',
      title: 'Payroll',
      icon: null,
      isSection: true
    },
    { id: 'tools', title: 'Tools', icon: 'wrench', href: '#' },
    { id: 'erpnext-settings', title: 'ERPNext Settings', icon: 'settings', href: '#' },
    { id: 'integrations', title: 'Integrations', icon: 'plug', href: '#' },
    { id: 'erpnext-integrations', title: 'ERPNext Integrations', icon: 'plug', href: '#' },
    { id: 'build', title: 'Build', icon: 'hammer', href: '#' }
  ];

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
      'arrow-up-right': <ArrowUpRight {...commonProps} />
    };
    return map[iconName] || null;
  };

  return (
    <aside className={`border-r border-gray-200 h-full overflow-y-auto transform transition-transform duration-200 ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'}`}>
      <div className="p-2">
        {/* Sidebar header removed to avoid duplication; header lives above */}
      

        {/* Menu Items */}
        <nav className="space-y-0">
          {/* PUBLIC Section */}
          <div>
            <button
              onClick={() => toggleSection('public')}
              className="w-full flex items-center justify-between px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out"
            >
              <span className="flex items-center space-x-2">
                <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.public ? 'rotate-180' : ''}`} />
                <span className="text-[12px] text-black-500 uppercase tracking-wide">PUBLIC</span>
              </span>
            </button>

            {expandedSections.public && (
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
                      onClick={() => setActiveContent('attendance-dashboard')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('attendance-dashboard')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('clipboard', 14)}
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
                      onClick={() => setActiveContent('expense-claims-dashboard')}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-[13px] transition-all duration-200 ease-in-out rounded-md ${
                        isContentActive('expense-claims-dashboard')
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getIcon('shield', 14)}
                      <span className="text-left">Expense Claims Dashboard</span>
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

                {/* Other Siblings under PUBLIC */}
                    <button 
                      onClick={() => setActiveContent('shift-attendance')}
                      className={`w-full flex items-center space-x-2 px-2 py-1 text-sm transition-all duration-200 ease-in-out rounded-lg ${
                        activeContent === 'shift-attendance'
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {getIcon('clipboard')}
                      <span>Shift & Attendance</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('expense-claims')}
                      className={`w-full flex items-center space-x-2 px-2 py-1 text-sm transition-all duration-200 ease-in-out rounded-lg ${
                        activeContent === 'expense-claims'
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {getIcon('shield')}
                      <span>Expense Claims</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('leaves')}
                      className={`w-full flex items-center space-x-2 px-2 py-1 text-sm transition-all duration-200 ease-in-out rounded-lg ${
                        activeContent === 'leaves'
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {getIcon('heart')}
                      <span>Leaves</span>
                    </button>
                <button 
                  onClick={() => setActiveContent('projects')}
                  className={`w-full flex items-center space-x-2 px-2 py-1 text-sm transition-all duration-200 ease-in-out rounded-lg ${
                    activeContent === 'projects'
                      ? 'bg-gray-200 text-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {getIcon('folder')}
                  <span>Projects</span>
                </button>
                <button 
                  onClick={() => setActiveContent('users')}
                  className={`w-full flex items-center space-x-2 px-2 py-1 text-sm transition-all duration-200 ease-in-out rounded-lg ${
                    activeContent === 'users'
                      ? 'bg-gray-200 text-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {getIcon('users')}
                  <span>Users</span>
                </button>
                <button 
                  onClick={() => setActiveContent('website')}
                  className={`w-full flex items-center space-x-2 px-2 py-1 text-sm transition-all duration-200 ease-in-out rounded-lg ${
                    activeContent === 'website'
                      ? 'bg-gray-200 text-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {getIcon('monitor')}
                  <span>Website</span>
                </button>
                <button 
                  onClick={() => {
                    console.log('Tools button clicked');
                    setActiveContent('tools');
                  }}
                  className={`w-full flex items-center space-x-2 px-2 py-1 text-sm transition-all duration-200 ease-in-out rounded-lg ${
                    activeContent === 'tools'
                      ? 'bg-gray-200 text-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {getIcon('hammer')}
                  <span>Tools</span>
                </button>
              </div>
            )}
          </div>

          {expandedSections.public && (
            <>
              {/* PAYROLL Section */}
              <div>
                <button
                  onClick={() => setActiveContent('payroll')}
                  className={`w-full flex items-center space-x-2 px-2 py-1 text-sm transition-all duration-200 ease-in-out rounded-lg ${
                    activeContent === 'payroll'
                      ? 'bg-gray-200 text-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {getIcon('coins')}
                  <span>Payroll</span>
                </button>
                {expandedSections.payroll && (
                  <div className="pl-4 space-y-0">
                    <button
                      onClick={() => setActiveContent('salary-payout')}
                      className={`w-full flex items-center space-x-2 px-2 py-1 text-sm transition-all duration-200 ease-in-out rounded-lg ${
                        activeContent === 'salary-payout'
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {getIcon('coins')}
                      <span>Salary Payout</span>
                    </button>
                    <button
                      onClick={() => setActiveContent('tax-and-payout')}
                      className={`w-full flex items-center space-x-2 px-2 py-1 text-sm transition-all duration-200 ease-in-out rounded-lg ${
                        activeContent === 'tax-and-payout'
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {getIcon('pie-chart')}
                      <span>Tax & Payout</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Standalone Items */}
              {menuItems
                .filter((m) => !m.isSection)
                .map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveContent(item.id);
                    }}
                    className={`flex items-center space-x-2 px-2 py-1 text-sm transition-all duration-200 ease-in-out rounded-lg ${
                      activeContent === item.id
                        ? 'bg-gray-200 text-gray-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {getIcon(item.icon)}
                    <span>{item.title}</span>
                  </a>
                ))}
            </>
          )}
        </nav>
      </div>
    </aside>
  );
}