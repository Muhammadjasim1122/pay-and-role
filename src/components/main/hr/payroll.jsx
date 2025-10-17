'use client';

import React, { useState } from 'react';
import { CheckCircle, Filter, MoreHorizontal, X, Edit3, Plus, ChevronDown, Calendar } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function Payroll({ 
  shortcuts = null, 
  reportsAndMasters = null,
  moduleTitle = "Let's Set Up the Payroll Module.",
  moduleDescription = "Salary, Compensation, and more."
}) {
  const [dismissed, setDismissed] = useState(false);
  const [selectedStep, setSelectedStep] = useState('payroll-settings');

  // Chart data for Outgoing Salary
  const chartData = [
    { month: 'Oct 2024', salary: 0 },
    { month: 'Nov 2024', salary: 0 },
    { month: 'Dec 2024', salary: 0 },
    { month: 'Jan 2025', salary: 0 },
    { month: 'Feb 2025', salary: 0 },
    { month: 'Mar 2025', salary: 0 },
    { month: 'Apr 2025', salary: 0 },
    { month: 'May 2025', salary: 0 },
    { month: 'Jun 2025', salary: 0 },
    { month: 'Jul 2025', salary: 0 },
    { month: 'Aug 2025', salary: 0 },
    { month: 'Sep 2025', salary: 0 },
    { month: 'Oct 2025', salary: 0 },
  ];

  const setupSteps = [
    {
      id: 'salary-component',
      title: 'Create Salary Component',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Create Entry',
      linkText: 'Show Salary Component List'
    },
    {
      id: 'payroll-period',
      title: 'Create Payroll Period',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Create Entry',
      linkText: 'Show Payroll Period List'
    },
    {
      id: 'income-tax-slab',
      title: 'Create Income Tax Slab',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Create Entry',
      linkText: 'Show Income Tax Slab List'
    },
    {
      id: 'salary-structure',
      title: 'Create & Assign Salary Structure',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Create Entry',
      linkText: 'Show Salary Structure List'
    },
    {
      id: 'salary-slip',
      title: 'Create Salary Slip',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Create Entry',
      linkText: 'Show Salary Slip List'
    },
    {
      id: 'payroll-settings',
      title: 'Payroll Settings',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Review Payroll Settings'
    }
  ];

  // Default data for Payroll module
  const defaultShortcuts = [
    { name: 'Dashboard', link: '#' },
    { name: 'Salary Register', link: '#' },
  ];

  const defaultReportsAndMasters = [
    {
      category: 'Quick Links',
      items: [
        { name: 'Payroll Entry', link: '#', hasArrow: true },
        { name: 'Salary Slip', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Settings',
      items: [
        { name: 'Payroll Settings', link: '#', hasArrow: true },
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
                  
                  {selectedStepData.linkText && (
                    <a href="#" className="text-sm text-black-600 hover:text-black-800 underline mb-4 block">
                      {selectedStepData.linkText}
                    </a>
                  )}
                  
                  {selectedStepData.description && (
                    <p className="text-sm text-gray-600 mb-4">
                      {selectedStepData.description}
                    </p>
                  )}
                  
                  {selectedStepData.hasExplore && (
                    <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-black bg-gray-200 rounded-md hover:bg-gray-200 transition-colors">
                      {selectedStepData.buttonText}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Separator Line */}
          <div className="border-t border-gray-200 mx-6 my-6"></div>

          {/* Outgoing Salary Section */}
          <div className="px-6 pb-6">
          {/* Chart Area */}
          <div className="relative h-70 bg-white border border-gray-100 rounded-lg p-4">
            {/* Title and Controls inside chart */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900 font-semibold">Outgoing Salary</h2>
                <p className="text-sm text-gray-500">Last synced 20 minutes ago</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                  <Filter className="h-4 w-4" />
                </button>
                <button className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                  <span>Last Year</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                <button className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                  <Calendar className="h-3 w-3" />
                  <span>Monthly</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Chart content area */}
            <div className="relative h-40">
              {/* Y-axis labels - properly aligned with grid lines */}
              <div className="absolute left-0 top-0 h-full">
                {[5, 4, 3, 2, 1, 0].map((value) => (
                  <span 
                    key={value} 
                    className="absolute text-xs text-gray-500 font-medium transform -translate-y-1/2"
                    style={{ top: `${(value / 5) * 100}%` }}
                  >
                    {value}
                  </span>
                ))}
              </div>
              
              {/* Grid lines */}
              <div className="absolute left-6 right-0 top-0 h-full">
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <div 
                    key={value}
                    className="absolute w-full border-t border-gray-100"
                    style={{ top: `${(value / 5) * 100}%` }}
                  />
                ))}
              </div>
              
              {/* Pink line at zero */}
              <div className="absolute left-6 right-0 top-[100%] h-0.5 bg-pink-500"></div>
              
              {/* Month labels */}
              <div className="absolute -bottom-5.5 left-6 right-0 flex justify-between">
                {chartData.map((item, index) => (
                  <span key={index} className="text-xs text-gray-500 font-medium">
                    {item.month.split(' ')[0]}
                  </span>
                ))}
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
          
          {/* Edit and New Buttons - Bottom Right Corner */}
          <div className="flex justify-end mt-6 pr-6 pb-2">
            <div className="flex items-center space-x-1">
              <button className="inline-flex items-center space-x-1 px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                <Edit3 className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button className="inline-flex items-center space-x-1 px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                <Plus className="h-4 w-4" />
                <span>New</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
