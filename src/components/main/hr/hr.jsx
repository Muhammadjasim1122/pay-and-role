'use client';

import React, { useState } from 'react';
import { CheckCircle, Filter, MoreHorizontal, X } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function HR({ 
  shortcuts = null, 
  reportsAndMasters = null,
  moduleTitle = "Let's Set Up the Human Resource Module.",
  moduleDescription = "Employee, Leaves, and more."
}) {
  const [dismissed, setDismissed] = useState(false);
  const [selectedStep, setSelectedStep] = useState('hr-settings');

  const setupSteps = [
    {
      id: 'hr-settings',
      title: 'HR Settings',
      description: 'HR Settings consists of major settings related to Employee Lifecycle, Leave Management, etc. Click on Explore, to explore Hr Settings.',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Explore'
    },
    {
      id: 'holiday-list',
      title: 'Create Holiday List',
      description: 'Create and manage company holidays for the year. Define public holidays, company-specific holidays, and regional holidays that will be used in leave calculations.',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Show Tour'
    },
    {
      id: 'employee',
      title: 'Create Employee',
      description: 'Add new employees to your organization. Set up employee profiles with personal information, job details, reporting structure, and employment terms.',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Show Tour'
    },
    {
      id: 'import-data',
      title: 'Import Data from Spreadsheet',
      description: 'Import employee data, leave records, and other HR information from Excel or CSV files. Bulk import saves time when setting up your HR system.',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Learn more about data migration'
    },
    {
      id: 'leave-type',
      title: 'Create Leave Type',
      description: 'Configure different types of leaves available in your organization such as Sick Leave, Annual Leave, Maternity Leave, etc. Set leave policies and accrual rules.',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Show Tour'
    },
    {
      id: 'leave-allocation',
      title: 'Create Leave Allocation',
      description: 'Allocate leave balances to employees for the current period. Set up leave entitlements, carry forward policies, and ensure employees have their leave quotas.',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Show Tour'
    },
    {
      id: 'leave-application',
      title: 'Create Leave Application',
      description: 'Set up the leave application workflow. Configure approval processes, notification settings, and leave application forms for employees to request time off.',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Show Tour'
    }
  ];

  // Default data for HR module
  const defaultShortcuts = [
    { name: 'Employee', extra: '0 Active', link: '#' },
    { name: 'Leave Application', link: '#' },
    { name: 'HR Dashboard', link: '#' },
    { name: 'Recruitment Dashboard', link: '#' },
    { name: 'Employee Lifecycle Dashboard', link: '#' },
    { name: 'Attendance Dashboard', link: '#' },
    { name: 'Expense Claims Dashboard', link: '#' },
  ];

  const defaultReportsAndMasters = [
    {
      category: 'Settings',
      items: [
        { name: 'HR Settings', link: '#' },
        { name: 'Daily Work Summary Group', link: '#' },
        { name: 'Team Updates', link: '#' },
      ],
    },
    {
      category: 'Attendance',
      items: [
        { name: 'Attendance', link: '#' },
        { name: 'Attendance Request', link: '#' },
        { name: 'Employee Checkin', link: '#' },
      ],
    },
    {
      category: 'Expense Claim',
      items: [
        { name: 'Expense Claim', link: '#' },
        { name: 'Employee Advance', link: '#' },
        { name: 'Travel Request', link: '#' },
      ],
    },
    {
      category: 'Key Reports',
      items: [
        { name: 'Monthly Attendance Sheet', link: '#' },
        { name: 'Recruitment Analytics', link: '#' },
        { name: 'Employee Analytics', link: '#' },
        { name: 'Employee Leave Balance', link: '#' },
        { name: 'Employee Leave Balance Summary', link: '#' },
        { name: 'Employee Advance Summary', link: '#' },
        { name: 'Employee Exits', link: '#' },
      ],
    },
    {
      category: 'Other Reports',
      items: [
        { name: 'Employee Information', link: '#' },
        { name: 'Employee Birthday', link: '#' },
        { name: 'Employees Working on a Holiday', link: '#' },
        { name: 'Daily Work Summary Replies', link: '#' },
      ],
    },
  ];

  // Use provided data or default data
  const yourShortcutsData = shortcuts || defaultShortcuts;
  const reportsAndMastersData = reportsAndMasters || defaultReportsAndMasters;

  const selectedStepData = setupSteps.find(step => step.id === selectedStep);

  return (
    <div className="p-10  bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Main Container with Single Border */}
        <div className="bg-white rounded-lg border border-gray-200 ">
          {/* Header */}
          <div className="flex justify-between items-start p-6 pb-4">
            <div>
              <h1 className="text-1xl font-bold text-gray-900 mb-2">
                {moduleTitle}
              </h1>
              <p className="text-gray-600">{moduleDescription}</p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Dismiss
            </button>
          </div>

          {/* Two Panel Layout */}
          <div className="grid grid-cols-5 px-6 gap-4">
            {/* Left Panel - Setup Steps List */}
            <div className="col-span-2">
              <div className="">
                {setupSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedStep === step.id 
                        ? 'bg-gray-100' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedStep(step.id)}
                  >
                    {/* Checkbox */}
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 " />
                    </div>
                    
                    {/* Title and Skip Button */}
                    <div className="flex-1 flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-600">{step.title}</h3>
                      {step.hasSkip && selectedStep === step.id && (
                        <button className="text-[14px] text-grey-600 hover:text-grey-800 font-medium">
                          Skip
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel - Selected Step Details */}
            <div className="col-span-3">
              {selectedStepData && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    {selectedStepData.title}
                  </h2>
                  
                  {selectedStepData.description && (
                    <p className="text-sm text-gray-600 mb-4">
                      {selectedStepData.description}
                    </p>
                  )}
                  
                  {selectedStepData.hasExplore && (
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                      {selectedStepData.buttonText}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Separator Line */}
          <div className="border-t border-gray-200 mx-6 my-6"></div>

          {/* Hiring vs Attrition Section */}
          <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm text-gray-900">Hiring vs Attrition Count</h2>
              <p className="text-sm text-gray-500">Last synced 3 hours ago</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                <Filter className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Chart Area */}
          <div className="relative h-64 bg-white border border-gray-100 rounded-lg">
            {/* Y-axis labels */}
            <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
              {[5, 4, 3, 2, 1, 0].map((value) => (
                <span key={value} className="text-xs text-gray-500 font-medium">
                  {value}
                </span>
              ))}
            </div>
            
            {/* Grid lines */}
            <div className="absolute left-8 right-4 top-0 h-full">
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <div 
                  key={value}
                  className="absolute w-full border-t border-gray-100"
                  style={{ top: `${(value / 5) * 100}%` }}
                />
              ))}
            </div>
            
            {/* X-axis label */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <span className="text-xs text-gray-500 font-medium">Oct 2025</span>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-4 left-8 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-300 rounded-sm"></div>
                <span className="text-xs text-gray-600">Hiring Count</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-700 rounded-sm"></div>
                <span className="text-xs text-gray-600">Attrition Count</span>
              </div>
            </div>
          </div>
          </div>

          {/* Separator Line */}
          {/* <div className="border-t border-gray-200 mx-6"></div> */}

          {/* Dynamic Module Sections */}
          <ModuleSections 
            shortcuts={yourShortcutsData}
            reportsAndMasters={reportsAndMastersData}
            shortcutsTitle="Your Shortcuts"
            reportsTitle="Reports & Masters"
          />
        </div>
      </div>
    </div>
  );
}