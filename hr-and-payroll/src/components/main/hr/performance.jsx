'use client';

import React from 'react';
import { Filter, MoreHorizontal, RotateCcw, Plus, Edit3 } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function Performance() {

  // Performance shortcuts data
  const performanceShortcuts = [
    { name: 'Appraisal', extra: '0 Pending', link: '#' },
    { name: 'Employee Performance Feedback', link: '#' },
    { name: 'Goal', link: '#' },
  ];

  // Performance reports and masters data
  const performanceReportsAndMasters = [
    {
      category: 'Masters',
      items: [
        { name: 'Appraisal Template', link: '#', hasArrow: true },
        { name: 'KRA', link: '#', hasArrow: true },
        { name: 'Employee Feedback Criteria', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Appraisal',
      items: [
        { name: 'Appraisal', link: '#', hasArrow: true },
        { name: 'Appraisal Cycle', link: '#', hasArrow: true },
        { name: 'Employee Performance Feedback', link: '#', hasArrow: true },
        { name: 'Goal', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Energy Points',
      items: [
        { name: 'Energy Point Rule', link: '#', hasArrow: true },
        { name: 'Energy Point Settings', link: '#', hasArrow: true },
        { name: 'Energy Point Log', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Promotion',
      items: [
        { name: 'Employee Promotion', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Reports',
      items: [
        { name: 'Appraisal Overview', link: '#', hasArrow: true },
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
                  <h2 className="text font-semibold text-gray-900">Department wise opening</h2>
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
              {performanceShortcuts.map((shortcut) => (
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
            <div className="grid grid-row-5 gap-6">
              {/* Left Column - Interviews Section */}
              <div className="col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className=" font-semibold text-gray-900">Interviews (This Week)</h2>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                      <Filter className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                      <RotateCcw className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* No Data State */}
                <div className="h-48 flex flex-col items-center justify-center mb-4">
                  <p className="text-gray-500 text-lg">No Data...</p>
                </div>
                
                {/* View List Button */}
                <div className="flex justify-center">
                  <button className="w-full bg-gray-200 text-gray-700 py-0 px-2 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                    View List
                  </button>
                </div>
              </div>

              {/* Right Column - Reports & Masters Section */}
              <div className="col-span-3">
                <h2 className="font-semibold text-gray-900 mb-4">Masters & Reports</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {performanceReportsAndMasters.map((category) => (
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
      </div>
    </div>
  );
}
