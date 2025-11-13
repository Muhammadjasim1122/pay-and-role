'use client';

import React from 'react';
import { Plus, Edit3 } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function Integrations() {
  // Integrations shortcuts data
  const integrationsShortcuts = [
    { name: 'API Integration', link: '#' },
    { name: 'Webhook', link: '#' },
    { name: 'Third Party', link: '#' },
    { name: 'Data Sync', link: '#' },
  ];

  // Integrations reports and masters data
  const integrationsReportsAndMasters = [
    {
      category: 'Backup',
      items: [
        { name: 'Dropbox Settings', link: '#', hasArrow: true },
        { name: 'S3 Backup Settings', link: '#', hasArrow: true },
        { name: 'Google Drive', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Google Services',
      items: [
        { name: 'Google Settings', link: '#', hasArrow: true },
        { name: 'Google Contacts', link: '#', hasArrow: true },
        { name: 'Google Calendar', link: '#', hasArrow: true },
        { name: 'Google Drive', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Authentication',
      items: [
        { name: 'Social Login Key', link: '#', hasArrow: true },
        { name: 'LDAP Settings', link: '#', hasArrow: true },
        { name: 'OAuth Client', link: '#', hasArrow: true },
        { name: 'OAuth Provider Settings', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Settings',
      items: [
        { name: 'Webhook', link: '#', hasArrow: true },
        { name: 'Slack Webhook URL', link: '#', hasArrow: true },
        { name: 'SMS Settings', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Push Notifications',
      items: [
        { name: 'Push Notification Settings', link: '#', hasArrow: true },
      ],
    },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          
          {/* Dynamic Module Sections */}
          <ModuleSections 
            shortcuts={integrationsShortcuts}
            reportsAndMasters={integrationsReportsAndMasters}
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
