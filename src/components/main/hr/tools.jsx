'use client';

import React from 'react';
import { Plus, Edit3 } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function Tools() {
  console.log('Tools component is rendering');

  // Tools shortcuts data
  const toolsShortcuts = [
    { name: 'Import Data', link: '#' },
    { name: 'ToDo', link: '#' },
    { name: 'File', link: '#' },
    { name: 'Assignment Rule', link: '#' },
  ];

  // Tools reports and masters data
  const toolsReportsAndMasters = [
    {
      category: 'Data',
      items: [
        { name: 'Import Data', link: '#', hasArrow: true },
        { name: 'Export Data', link: '#', hasArrow: true },
        { name: 'Bulk Update', link: '#', hasArrow: true },
        { name: 'Download Backups', link: '#', hasArrow: true },
        { name: 'Deleted Documents', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Tools',
      items: [
        { name: 'To Do', link: '#', hasArrow: true },
        { name: 'Calendar', link: '#', hasArrow: true },
        { name: 'Note', link: '#', hasArrow: true },
        { name: 'Files', link: '#', hasArrow: true },
      ],
    },
      {
        category: 'Alerts and Notifications',
        items: [
          { name: 'Notification', link: '#', hasArrow: true },
          { name: 'Auto Email Report', link: '#', hasArrow: true },
          { name: 'Notification Settings', link: '#', hasArrow: true },
        ],
      },
      {
        category: 'Email',
        items: [
          { name: 'Email Account', link: '#', hasArrow: true },
          { name: 'Email Domain', link: '#', hasArrow: true },
          { name: 'Email Template', link: '#', hasArrow: true },
        ],
      },
      {
        category: 'Printing',
        items: [
          { name: 'Print Format Builder', link: '#', hasArrow: true },
          { name: 'Print Format Builder (New)', link: '#', hasArrow: true },
          { name: 'Print Settings', link: '#', hasArrow: true },
          { name: 'Print Heading', link: '#', hasArrow: true },
        ],
      },
      {
        category: 'Automation',
        items: [
          { name: 'Assignment Rule', link: '#', hasArrow: true },
          { name: 'Milestone', link: '#', hasArrow: true },
          { name: 'Auto Repeat', link: '#', hasArrow: true },
        ],
      },
      {
        category: 'Newsletter',
        items: [
          { name: 'Newsletter', link: '#', hasArrow: true },
          { name: 'Email Group', link: '#', hasArrow: true },
        ],
      },
    ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tools Module</h1>
          <p className="text-gray-600">This is the Tools module content.</p>
          
          {/* Dynamic Module Sections */}
          <ModuleSections 
            shortcuts={toolsShortcuts}
            reportsAndMasters={toolsReportsAndMasters}
            shortcutsTitle="Your Shortcuts"
            reportsTitle="Documents"
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
