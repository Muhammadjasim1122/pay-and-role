'use client';

import React from 'react';
import { Filter, MoreHorizontal, ChevronDown, Calendar, Plus, Edit3 } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function ExpenseClaims() {

  // Chart data - all values are 0 to show flat line
  const chartData = [
    { month: 'Oct 2024', value: 0 },
    { month: 'Nov 2024', value: 0 },
    { month: 'Dec 2024', value: 0 },
    { month: 'Jan 2025', value: 0 },
    { month: 'Feb 2025', value: 0 },
    { month: 'Mar 2025', value: 0 },
    { month: 'Apr 2025', value: 0 },
    { month: 'May 2025', value: 0 },
    { month: 'Jun 2025', value: 0 },
    { month: 'Jul 2025', value: 0 },
    { month: 'Aug 2025', value: 0 },
    { month: 'Sep 2025', value: 0 },
    { month: 'Oct 2025', value: 0 },
  ];

  // Expense Claims shortcuts data
  const expenseClaimsShortcuts = [
    { name: 'Expense Claim', extra: '0 Pending', link: '#' },
    { name: 'Employee Advance', extra: '0 Unclaimed', link: '#' },
    { name: 'Dashboard', link: '#' },
  ];

  // Expense Claims reports and masters data
  const expenseClaimsReportsAndMasters = [
    {
      category: 'Claims',
      items: [
        { name: 'Expense Claim', link: '#', hasArrow: true },
        { name: 'Expense Claim Type', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Travel',
      items: [
        { name: 'Travel Request', link: '#', hasArrow: true },
        { name: 'Purpose of Travel', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Advances',
      items: [
        { name: 'Employee Advance', link: '#', hasArrow: true },
        { name: 'Payment Entry', link: '#', hasArrow: true },
        { name: 'Journal Entry', link: '#', hasArrow: true },
        { name: 'Additional Salary', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Reports',
      items: [
        { name: 'Employee Advance Summary', link: '#', hasArrow: true },
        { name: 'Unpaid Expense Claim', link: '#', hasArrow: true },
        { name: 'Vehicle Expenses', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Fleet Management',
      items: [
        { name: 'Vehicle', link: '#', hasArrow: true },
        { name: 'Driver', link: '#', hasArrow: true },
        { name: 'Vehicle Service Item', link: '#', hasArrow: true },
        { name: 'Vehicle Log', link: '#', hasArrow: true },
        { name: 'Vehicle Expenses', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Accounting Reports',
      items: [
        { name: 'Accounts Receivable', link: '#', hasArrow: true },
        { name: 'Accounts Payable', link: '#', hasArrow: true },
        { name: 'General Ledger', link: '#', hasArrow: true },
      ],
    },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Main Container with Single Border */}
        <div className="bg-white rounded-lg border border-gray-200">
          
          {/* Expense Claims Section */}
          <div className="px-6 py-10">
            
            
            {/* Chart Section */}
            <div className="bg-white border border-gray-100 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-sm font-bold text-gray-500">Expense Claims</h2>
                  <p className="text-sm text-gray-500">Last synced just now</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                    <Filter className="h-4 w-4" />
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <span>Last Year</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <Calendar className="h-4 w-4" />
                    <span>Monthly</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Custom Chart */}
              <div className="relative h-64">
                {/* Y-axis labels */}
                <div className="absolute left-2 top-0 h-full flex flex-col justify-between">
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
                
                {/* Blue line at 0 value */}
                <div className="absolute left-8 right-4 bottom-12 h-0.5 bg-blue-500"></div>
                
                {/* Month labels */}
                <div className="absolute -bottom-5 left-8 right-4 flex justify-between">
                  {chartData.map((item) => (
                    <span key={item.month} className="text-xs text-gray-500 font-medium">
                      {item.month}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

         

          {/* Dynamic Module Sections */}
          <ModuleSections 
            shortcuts={expenseClaimsShortcuts}
            reportsAndMasters={expenseClaimsReportsAndMasters}
            shortcutsTitle="Your Shortcuts"
            reportsTitle="Masters & Reports"
          />
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
        
        {/* Edit and New Buttons - Bottom Right Corner */}
        
      </div>
    </div>
  );
}
