'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Heart, MessageCircle, Grid3x3 } from 'lucide-react';
import { useDashboard } from '../../../contexts/DashboardContext';

export default function HRDashboard() {
  const { dashboards } = useDashboard();
  const [selectedView, setSelectedView] = useState('List View');

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-full mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {/* List View Dropdown */}
            <select 
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
            >
              <option>List View</option>
              <option>Grid View</option>
              <option>Kanban View</option>
            </select>

            {/* Refresh Button */}
            <button className="p-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            {/* More Options */}
            <button className="p-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          {/* Add Dashboard Button */}
          <button 
            onClick={() => {
              // Dispatch custom event to change activeContent to 'dashboard-form'
              const event = new CustomEvent('setActiveContent', { detail: 'dashboard-form' });
              window.dispatchEvent(event);
              // Update URL
              window.history.pushState({ activeContent: 'dashboard-form' }, '', '/');
            }}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Dashboard</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
            <div className="col-span-1 flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            </div>
            <div className="col-span-3">Dashboard Name</div>
            <div className="col-span-3">ID</div>
            <div className="col-span-5 text-right flex items-center justify-end space-x-4">
              <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-sm">Filter</span>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <span className="text-sm">Last Updated On</span>
              </button>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {dashboards.map((dashboard) => (
              <div 
                key={dashboard.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-1 flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                </div>
                <div className="col-span-3 flex items-center">
                  <span className="text-sm font-medium text-gray-900">{dashboard.name}</span>
                </div>
                <div className="col-span-3 flex items-center">
                  <span className="text-sm text-gray-600">{dashboard.idName}</span>
                </div>
                <div className="col-span-5 flex items-center justify-end space-x-6">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Grid3x3 className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-gray-600 min-w-[3ch]">{dashboard.lastUpdated}</span>
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-600">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{dashboard.comments}</span>
                  </button>
                  <span className="text-gray-400">·</span>
                  <button className="text-gray-400 hover:text-red-500">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">{dashboards.length} of {dashboards.length}</span>
            <button className="text-gray-400 hover:text-red-500">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
