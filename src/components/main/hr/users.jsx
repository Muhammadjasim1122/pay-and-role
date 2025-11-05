'use client';

import React from 'react';
import { Plus, Edit3 } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function Users() {

  // Users shortcuts data
  const usersShortcuts = [
    { name: 'User', link: '#' },
    { name: 'User Type', link: '#' },
    { name: 'Role', link: '#' },
    { name: 'Permission Manager', link: '#' },
    { name: 'User Profile', link: '#' },
  ];

  // Users reports and masters data
  const usersReportsAndMasters = [
    {
      category: 'Users',
      items: [
        { name: 'User', link: '#', hasArrow: true },
        { name: 'Role', link: '#', hasArrow: true },
        { name: 'Role Profile', link: '#', hasArrow: true },
        { name: 'Module Profile', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Logs',
      items: [
        { name: 'Activity Log', link: '#', hasArrow: true },
        { name: 'Access Log', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Permissions',
      items: [
        { name: 'Role Permissions Manager', link: '#', hasArrow: true },
        { name: 'User Permissions', link: '#', hasArrow: true },
        { name: 'Role Permission for Page and Report', link: '#', hasArrow: true },
        { name: 'Permitted Documents For User', link: '#', hasArrow: true },
        { name: 'Document Share Report', link: '#', hasArrow: true },
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
            shortcuts={usersShortcuts}
            reportsAndMasters={usersReportsAndMasters}
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
