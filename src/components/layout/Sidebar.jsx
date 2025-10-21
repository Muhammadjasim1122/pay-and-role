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
  Hammer
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, setActiveContent }) {   // ✅ props passed from parent
  const [expandedSections, setExpandedSections] = useState({
    public: true,
    payroll: false,
    hr: true
  });

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
    setExpandedSections(prev => {
      const next = { ...prev, [section]: !prev[section] };
      if (section === 'public' && prev.public) {
        // Collapsing PUBLIC should also collapse its nested groups and other sections
        next.hr = false;
        next.payroll = false;
      }
      return next;
    });
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

  const getIcon = (iconName) => {
    const commonProps = { size: 16, strokeWidth: 1.75, className: 'shrink-0' };
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
      hammer: <Hammer {...commonProps} />
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
              className="w-full flex items-center justify-between px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
                  onClick={() => {
                    console.log('HR button clicked');
                    setActiveContent('hr');
                  }}
                  className="w-full flex items-center justify-between px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    {getIcon('briefcase')}
                    <span>HR</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.hr ? 'rotate-180' : ''}`} />
                </button>

                {expandedSections.hr && (
                  <div className="pl-4 space-y-0">
                    <button 
                      onClick={() => setActiveContent('recruitment')}
                      className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {getIcon('users')}
                      <span>Recruitment</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('lifecycle')}
                      className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {getIcon('briefcaseOutline')}
                      <span>Employee Lifecycle</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('performance')}
                      className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {getIcon('star')}
                      <span>Performance</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('shift-attendance')}
                      className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {getIcon('clipboard')}
                      <span>Shift & Attendance</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('expense-claims')}
                      className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {getIcon('shield')}
                      <span>Expense Claims</span>
                    </button>
                    <button 
                      onClick={() => setActiveContent('leaves')}
                      className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {getIcon('heart')}
                      <span>Leaves</span>
                    </button>
                  </div>
                )}

                {/* Siblings under PUBLIC */}
                <button 
                  onClick={() => setActiveContent('projects')}
                  className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {getIcon('folder')}
                  <span>Projects</span>
                </button>
                <button 
                  onClick={() => setActiveContent('users')}
                  className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {getIcon('users')}
                  <span>Users</span>
                </button>
                <button 
                  onClick={() => setActiveContent('website')}
                  className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {getIcon('monitor')}
                  <span>Website</span>
                </button>
                <button 
                  onClick={() => {
                    console.log('Tools button clicked');
                    setActiveContent('tools');
                  }}
                  className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
                  className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {getIcon('coins')}
                  <span>Payroll</span>
                </button>
                {expandedSections.payroll && (
                  <div className="pl-4 space-y-0">
                    <button
                      onClick={() => setActiveContent('salary-payout')}
                      className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {getIcon('coins')}
                      <span>Salary Payout</span>
                    </button>
                    <button
                      onClick={() => setActiveContent('tax-and-payout')}
                      className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
                    className="flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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