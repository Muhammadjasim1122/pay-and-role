'use client';

import React from 'react';
import { Filter, MoreHorizontal, RotateCcw, Plus, Edit3 } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function Projects() {

  // Projects shortcuts data
  const projectsShortcuts = [
    { name: 'Task', extra: '0 Assigned', link: '#' },
    { name: 'Project', extra: '0 Open', link: '#' },
    { name: 'Dashboard', link: '#' },
    { name: 'Learn Project Management', link: '#' },
    { name: 'Timesheet', link: '#' },
    { name: 'Project Billing Summary', link: '#' },
  ];

  // Projects reports and masters data
  const projectsReportsAndMasters = [
    {
      category: 'Projects',
      items: [
        { name: 'Project', link: '#', hasArrow: true },
        { name: 'Task', link: '#', hasArrow: true },
        { name: 'Project Template', link: '#', hasArrow: true },
        { name: 'Project Type', link: '#', hasArrow: true },
        { name: 'Project Update', link: '#', hasArrow: false },
      ],
    },
    {
      category: 'Time Tracking',
      items: [
        { name: 'Timesheet', link: '#', hasArrow: true },
        { name: 'Activity Type', link: '#', hasArrow: true },
        { name: 'Activity Cost', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Reports',
      items: [
        { name: 'Daily Timesheet Summary', link: '#', hasArrow: false },
        { name: 'Project wise Stock Tracking', link: '#', hasArrow: false },
        { name: 'Project Billing Summary', link: '#', hasArrow: false },
        { name: 'Delayed Tasks Summary', link: '#', hasArrow: false },
      ],
    },
    {
      category: 'Settings',
      items: [
        { name: 'Projects Settings', link: '#', hasArrow: true },
      ],
    },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Main Container with Single Border */}
        <div className="bg-white rounded-lg border border-gray-200">
          
          {/* Open Projects Section */}
          <div className="px-6 py-6">
            <div className="bg-white border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text font-semibold text-gray-900">Open Projects</h2>
                  <p className="text-sm text-gray-500">No data available</p>
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
              
              {/* Empty State */}
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500">No data to display</p>
              </div>
              
              {/* Legend at bottom */}
              <div className="flex items-start justify-start space-x-20 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                  <span className="text-xs text-gray-600">Overdue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                  <span className="text-xs text-gray-600">Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                  <span className="text-xs text-gray-600">Total Tasks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className="border-t border-gray-200 mx-6"></div>

          {/* Dynamic Module Sections */}
          <ModuleSections 
            shortcuts={projectsShortcuts}
            reportsAndMasters={projectsReportsAndMasters}
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
