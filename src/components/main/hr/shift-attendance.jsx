'use client';

import React from 'react';
import { Filter, MoreHorizontal, RotateCcw, Plus, Edit3 } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function ShiftAttendance() {

  // Shift & Attendance shortcuts data
  const shiftAttendanceShortcuts = [
    { name: 'Shift Schedule', extra: '0 Active', link: '#' },
    { name: 'Attendance', extra: '0 Today', link: '#' },
    { name: 'Leave Request', extra: '0 Pending', link: '#' },
    { name: 'Dashboard', link: '#' },
  ];

  // Shift & Attendance reports and masters data
  const shiftAttendanceReportsAndMasters = [
    {
      category: 'Shift Management',
      items: [
        { name: 'Shift Type', link: '#', hasArrow: true },
        { name: 'Shift Schedule', link: '#', hasArrow: true },
        { name: 'Shift Request', link: '#', hasArrow: true },
        { name: 'Shift Swap', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Attendance',
      items: [
        { name: 'Attendance Settings', link: '#', hasArrow: true },
        { name: 'Attendance Marking', link: '#', hasArrow: true },
        { name: 'Attendance Regularization', link: '#', hasArrow: true },
        { name: 'Attendance Log', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Leave Management',
      items: [
        { name: 'Leave Type', link: '#', hasArrow: true },
        { name: 'Leave Application', link: '#', hasArrow: true },
        { name: 'Leave Allocation', link: '#', hasArrow: true },
        { name: 'Leave Balance', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Reports',
      items: [
        { name: 'Monthly Attendance Sheet', link: '#', hasArrow: true },
        { name: 'Shift Attendance', link: '#', hasArrow: true },
        { name: 'Employee Hours Utilization Based On Tim...', link: '#', hasArrow: true },
        { name: 'Project Profitability', link: '#', hasArrow: true },
        { name: 'Employees working on a holiday', link: '#', hasArrow: true },
      ],
    },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
    <div className="max-w-6xl mx-auto">
      {/* Main Container with Single Border */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Department Wise Opening Section */}
        <div className="px-6 py-6">
          <div className="bg-white border border-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text font-semibold text-gray-900">Attendance Count </h2>
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
            <div className="h-64  flex items-center justify-center">
              <p className="text-gray-500">No data to display</p>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-200 mx-6"></div>

        {/* Shortcuts Section */}
        <div className="px-6 py-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recruitment Shortcuts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {shiftAttendanceShortcuts.map((shortcut) => (
              <a
                key={shortcut.name}
                href={shortcut.link}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
              >
                <span>{shortcut.name}</span>
                {shortcut.extra && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {shortcut.extra}
                  </span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Separator Line */}
        {/* <div className="border-t border-gray-200 mx-6"></div> */}

        {/* Two Column Layout: Interviews (Left) and Reports (Right) */}
        <div className="px-6 py-6">
          <div className="grid grid-col-5 gap-6">
            {/* Left Column - Interviews Section */}
            <div className="col-span-2">
             
              {/* No Data State */}
             
              
              {/* View List Button */}
              
            </div>

            {/* Right Column - Reports & Masters Section */}
            <div className="col-span-3">
              <h2 className="font-semibold text-gray-900 mb-4">Masters & Reports</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 whitespace-nowrap lg:grid-cols-3 gap-8">
                {shiftAttendanceReportsAndMasters.map((category) => (
                  <div key={category.category}>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">{category.category}</h3>
                    <div className="space-y-2">
                      {category.items.map((item) => (
                        <a
                          key={item.name}
                          href={item.link}
                          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
                        >
                          <span>{item.name}</span>
                          {item.hasArrow && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              className="w-3 h-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                              />
                            </svg>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
           
              <div className="flex justify-end ">
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
      </div>
      
      {/* Action Buttons - Bottom Right Corner */}
      
    </div>
  
  </div>
  );
}
