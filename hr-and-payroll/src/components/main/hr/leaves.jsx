'use client';

import React from 'react';
import { Plus, Edit3 } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function Leaves() {

  // Leaves shortcuts data
  const leavesShortcuts = [
    { name: 'Leave Application', extra: '0 Open', link: '#' },
    { name: 'Leave Allocation', link: '#' },
  ];

  // Leaves reports and masters data
  const leavesReportsAndMasters = [
    {
      category: 'Setup',
      items: [
        { name: 'Holiday List', link: '#', hasArrow: true },
        { name: 'Leave Type', link: '#', hasArrow: true },
        { name: 'Leave Period', link: '#', hasArrow: true },
        { name: 'Leave Policy', link: '#', hasArrow: true },
        { name: 'Leave Block List', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Allocation',
      items: [
        { name: 'Leave Allocation', link: '#', hasArrow: true },
        { name: 'Leave Policy Assignment', link: '#', hasArrow: true },
        { name: 'Leave Control Panel', link: '#', hasArrow: true },
        { name: 'Leave Encashment', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Application',
      items: [
        { name: 'Leave Application', link: '#', hasArrow: true },
        { name: 'Compensatory Leave Request', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Reports',
      items: [
        { name: 'Employee Leave Balance', link: '#', hasArrow: true },
        { name: 'Employee Leave Balance Summary', link: '#', hasArrow: true },
        { name: 'Employees working on a holiday', link: '#', hasArrow: true },
      ],
    },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Main Container with Single Border */}
        <div className="bg-white rounded-lg border border-gray-200">
          
          {/* Dynamic Module Sections */}
          <ModuleSections 
            shortcuts={leavesShortcuts}
            reportsAndMasters={leavesReportsAndMasters}
            shortcutsTitle="Your Shortcuts"
            reportsTitle="Masters & Reports"
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
