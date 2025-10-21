'use client';

import React from 'react';
import { Plus, Edit3 } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function Build() {
  // Build shortcuts data
  const buildShortcuts = [
    { name: 'DocType', link: '#' },
    { name: 'Server Script', link: '#' },
    { name: 'Customize Form', link: '#' },
    { name: 'Print Format Builder', link: '#' },
    { name: 'Report', link: '#' },
    { name: 'System Settings', link: '#' },
    { name: 'Client Script', link: '#' },
  ];

  // Build reports and masters data
  const buildReportsAndMasters = [
    {
      category: 'Models',
      items: [
        { name: 'DocType', link: '#', hasArrow: true },
        { name: 'Workflow', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Views',
      items: [
        { name: 'Report', link: '#', hasArrow: true },
        { name: 'Print Format', link: '#', hasArrow: true },
        { name: 'Workspace', link: '#', hasArrow: true },
        { name: 'Dashboard', link: '#', hasArrow: true },
        { name: 'Dashboard Chart', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Customization',
      items: [
        { name: 'Customize Form', link: '#', hasArrow: true },
        { name: 'Custom Field', link: '#', hasArrow: true },
        { name: 'Custom Translation', link: '#', hasArrow: true },
        { name: 'Navbar Settings', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Scripting',
      items: [
        { name: 'Server Script', link: '#', hasArrow: true },
        { name: 'Client Script', link: '#', hasArrow: true },
        { name: 'Scheduled Job Type', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Modules',
      items: [
        { name: 'Module Def', link: '#', hasArrow: true },
        { name: 'Module Onboarding', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Packages',
      items: [
        { name: 'Package', link: '#', hasArrow: true },
        { name: 'Package Import', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'System Logs',
      items: [
        { name: 'Background Jobs', link: '#', hasArrow: true },
        { name: 'Scheduled Jobs Logs', link: '#', hasArrow: true },
        { name: 'Error Logs', link: '#', hasArrow: true },
        { name: 'Communication Logs', link: '#', hasArrow: true },
        { name: 'Activity Log', link: '#', hasArrow: true },
      ],
    },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          
          {/* Dynamic Module Sections */}
          <ModuleSections 
            shortcuts={buildShortcuts}
            reportsAndMasters={buildReportsAndMasters}
            shortcutsTitle="Get started"
            reportsTitle="Components to build your app"
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
