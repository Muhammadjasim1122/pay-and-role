'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Heart, MessageCircle, Grid3x3 } from 'lucide-react';
import { useDashboard } from '../../../contexts/DashboardContext';

export default function AttendanceDashboard() {
  const { attendanceDashboards } = useDashboard();
  const [selectedView, setSelectedView] = useState('List View');
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter dashboards based on search criteria
  const filteredDashboards = attendanceDashboards.filter(dashboard => {
    const matchesId = !searchId || dashboard.idName?.toLowerCase().includes(searchId.toLowerCase());
    const matchesName = !searchName || dashboard.name?.toLowerCase().includes(searchName.toLowerCase());
    return matchesId && matchesName;
  });

  // Sort dashboards
  const sortedDashboards = [...filteredDashboards].sort((a, b) => {
    let aValue, bValue;
    
    switch(sortBy) {
      case 'name':
        aValue = a.name?.toLowerCase() || '';
        bValue = b.name?.toLowerCase() || '';
        break;
      case 'id':
        aValue = a.idName?.toLowerCase() || '';
        bValue = b.idName?.toLowerCase() || '';
        break;
      default:
        aValue = a.lastUpdated || '';
        bValue = b.lastUpdated || '';
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleClearFilters = () => {
    setSearchId('');
    setSearchName('');
  };

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
              const event = new CustomEvent('setActiveContent', { detail: 'attendance-dashboard-form' });
              window.dispatchEvent(event);
              window.history.pushState({ activeContent: 'attendance-dashboard-form' }, '', '/');
            }}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Dashboard</span>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center space-x-4 mb-6">
          {/* Search Fields */}
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Dashboard Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filter</span>
            </button>
            
            <button 
              onClick={handleClearFilters}
              className="p-2 text-gray-400 hover:text-gray-600"
              title="Clear all filters"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <button 
              onClick={() => handleSort('lastUpdated')}
              className={`flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 ${
                sortBy === 'lastUpdated' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
              title="Sort by Last Updated"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              <span>Last Updated On</span>
              {sortBy === 'lastUpdated' && (
                <span className="text-xs">
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
            <div className="col-span-1 flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            </div>
            <button 
              onClick={() => handleSort('name')}
              className="col-span-5 text-left hover:text-gray-700 flex items-center space-x-1"
            >
              <span>Dashboard Name</span>
              {sortBy === 'name' && (
                <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
            <button 
              onClick={() => handleSort('id')}
              className="col-span-3 text-left hover:text-gray-700 flex items-center space-x-1"
            >
              <span>ID</span>
              {sortBy === 'id' && (
                <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
            <div className="col-span-3 text-right flex items-center justify-end space-x-4">
              <span className="text-sm">{sortedDashboards.length} of {sortedDashboards.length}</span>
              <button className="text-gray-400 hover:text-red-500">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {sortedDashboards.map((dashboard) => (
              <div 
                key={dashboard.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-1 flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                </div>
                <div className="col-span-5 flex items-center">
                  <span className="text-sm font-medium text-gray-900">{dashboard.name}</span>
                </div>
                <div className="col-span-3 flex items-center">
                  <span className="text-sm text-gray-600">{dashboard.idName}</span>
                </div>
                <div className="col-span-3 flex items-center justify-end space-x-4">
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
            
            {/* No results message */}
            {sortedDashboards.length === 0 && (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-500 text-sm">
                  {filteredDashboards.length === 0 ? 'No dashboards found with matching filters.' : 'No dashboards to display.'}
                </div>
                {filteredDashboards.length === 0 && (
                  <button 
                    onClick={handleClearFilters}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">{sortedDashboards.length} of {sortedDashboards.length}</span>
            <button className="text-gray-400 hover:text-red-500">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
