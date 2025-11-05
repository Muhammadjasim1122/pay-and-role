'use client';

import React from 'react';
import { Plus, Edit3 } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function ERPNext() {
  // ERPNext shortcuts data
  const erpnextShortcuts = [
    { name: 'System Settings', link: '#' },
    { name: 'Accounts Settings', link: '#' },
    { name: 'Selling Settings', link: '#' },
    { name: 'Buying Settings', link: '#' },
    { name: 'Global Defaults', link: '#' },
    { name: 'Print Settings', link: '#' },
  ];

  // ERPNext reports and masters data
  const erpnextReportsAndMasters = [
    {
      category: 'Module Settings',
      items: [
        { name: 'Accounts Settings', link: '#', hasArrow: true },
        { name: 'Selling Settings', link: '#', hasArrow: true },
        { name: 'Buying Settings', link: '#', hasArrow: true },
        { name: 'CRM Settings', link: '#', hasArrow: true },
        { name: 'Projects Settings', link: '#', hasArrow: true },
        { name: 'Support Settings', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Email / Notifications',
      items: [
        { name: 'Email Account', link: '#', hasArrow: true },
        { name: 'Email Domain', link: '#', hasArrow: true },
        { name: 'Notification', link: '#', hasArrow: true },
        { name: 'Email Template', link: '#', hasArrow: true },
        { name: 'Auto Email Report', link: '#', hasArrow: true },
        { name: 'Newsletter', link: '#', hasArrow: true },
        { name: 'Notification Settings', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Website',
      items: [
        { name: 'Website Settings', link: '#', hasArrow: true },
        { name: 'Website Theme', link: '#', hasArrow: true },
        { name: 'Website Script', link: '#', hasArrow: true },
        { name: 'About Us Settings', link: '#', hasArrow: true },
        { name: 'Contact Us Settings', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Core',
      items: [
        { name: 'System Settings', link: '#', hasArrow: true },
        { name: 'Domain Settings', link: '#', hasArrow: true },
        { name: 'Global Defaults', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Printing',
      items: [
        { name: 'Print Format Builder', link: '#', hasArrow: true },
        { name: 'Print Settings', link: '#', hasArrow: true },
        { name: 'Print Format', link: '#', hasArrow: true },
        { name: 'Print Style', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Workflow',
      items: [
        { name: 'Workflow', link: '#', hasArrow: true },
        { name: 'Workflow State', link: '#', hasArrow: true },
        { name: 'Workflow Action', link: '#', hasArrow: true },
      ],
    },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          
          {/* Dynamic Module Sections */}
          <ModuleSections 
            shortcuts={erpnextShortcuts}
            reportsAndMasters={erpnextReportsAndMasters}
            shortcutsTitle="Your Shortcuts"
            reportsTitle="ERPNext Settings"
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
