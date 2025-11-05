'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Heart, MessageCircle, Grid3x3 } from 'lucide-react';
import { useEmployee } from '../../../../contexts/EmployeeContext';

export default function EmployeeList() {
  const { employees } = useEmployee();
  const [selectedView, setSelectedView] = useState('List View');
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');
  const [activeFilters, setActiveFilters] = useState(0);
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [sortOrder, setSortOrder] = useState('desc');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter employees based on search criteria
  const filteredEmployees = employees.filter(employee => {
    const matchesId = !searchId || employee.employeeId?.toLowerCase().includes(searchId.toLowerCase());
    const matchesName = !searchName || employee.fullName?.toLowerCase().includes(searchName.toLowerCase());
    const matchesDepartment = !searchDepartment || employee.department?.toLowerCase().includes(searchDepartment.toLowerCase());
    
    return matchesId && matchesName && matchesDepartment;
  });

  // Sort employees
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let aValue, bValue;
    
    switch(sortBy) {
      case 'name':
        aValue = a.fullName?.toLowerCase() || '';
        bValue = b.fullName?.toLowerCase() || '';
        break;
      case 'status':
        aValue = a.status?.toLowerCase() || '';
        bValue = b.status?.toLowerCase() || '';
        break;
      case 'designation':
        aValue = a.designation?.toLowerCase() || '';
        bValue = b.designation?.toLowerCase() || '';
        break;
      case 'id':
        aValue = a.employeeId?.toLowerCase() || '';
        bValue = b.employeeId?.toLowerCase() || '';
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

  // Pagination
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = sortedEmployees.slice(startIndex, endIndex);

  // Update active filters count
  React.useEffect(() => {
    let count = 0;
    if (searchId) count++;
    if (searchName) count++;
    if (searchDepartment) count++;
    setActiveFilters(count);
  }, [searchId, searchName, searchDepartment]);

  const handleAddEmployee = () => {
    // Navigate to employee form
    const event = new CustomEvent('setActiveContent', { detail: 'employee' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'employee' }, '', '/');
  };

  const handleRefresh = () => {
    // Reset search fields
    setSearchId('');
    setSearchName('');
    setSearchDepartment('');
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchId('');
    setSearchName('');
    setSearchDepartment('');
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            <button 
              onClick={handleRefresh}
              className="p-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
              title="Refresh and clear filters"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            {/* More Options */}
            <button className="p-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          {/* Add Employee Button */}
          <button 
            onClick={handleAddEmployee}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Employee</span>
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
              placeholder="Full Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Department"
              value={searchDepartment}
              onChange={(e) => setSearchDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex items-center space-x-2">
            <button 
              className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
              title="Active filters"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filters</span>
              {activeFilters > 0 && (
                <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {activeFilters}
                </span>
              )}
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
              className={`flex items-center space-x-1 px-5 py-1 border border-gray-300 rounded-md text-[10px] hover:bg-gray-50 ${
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
            
            <button className="p-2 text-gray-400 hover:text-gray-600" title="More options">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
            <div className="col-span-1 flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            </div>
            <button 
              onClick={() => handleSort('name')}
              className="col-span-3 text-left hover:text-gray-700 flex items-center space-x-1"
            >
              <span>Full Name</span>
              {sortBy === 'name' && (
                <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
            <button 
              onClick={() => handleSort('status')}
              className="col-span-2 text-left hover:text-gray-700 flex items-center space-x-1"
            >
              <span>Status</span>
              {sortBy === 'status' && (
                <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
            <button 
              onClick={() => handleSort('designation')}
              className="col-span-2 text-left hover:text-gray-700 flex items-center space-x-1"
            >
              <span>Designation</span>
              {sortBy === 'designation' && (
                <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
            <div className="col-span-4 text-right flex items-center justify-end space-x-4">
              <button 
                onClick={() => handleSort('id')}
                className="hover:text-gray-700 flex items-center space-x-1"
              >
                <span>ID</span>
                {sortBy === 'id' && (
                  <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {paginatedEmployees.map((employee) => (
              <div 
                key={employee.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-1 flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                </div>
                <div className="col-span-3 flex items-center">
                  <span className="text-sm font-medium text-gray-900">{employee.fullName}</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    employee.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    employee.status === 'Inactive' ? 'bg-red-100 text-red-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {employee.status}
                  </span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-600">{employee.designation}</span>
                </div>
                <div className="col-span-4 flex items-center justify-end space-x-6">
                  <span className="text-sm text-gray-600">{employee.employeeId}</span>
                  <span className="text-sm text-gray-500">{employee.lastUpdated}</span>
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-600">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{employee.comments || 0}</span>
                  </button>
                  <span className="text-gray-400">·</span>
                  <button className="text-gray-400 hover:text-red-500">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            
            {/* No results message */}
            {paginatedEmployees.length === 0 && (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-500 text-sm">
                  {filteredEmployees.length === 0 ? 'No employees found matching your search criteria.' : 'No employees to display.'}
                </div>
                {filteredEmployees.length === 0 && (
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
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {startIndex + 1}-{Math.min(endIndex, sortedEmployees.length)} of {sortedEmployees.length}
              </span>
              {totalPages > 1 && (
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Show</span>
              <select 
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="20">20</option>
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="2500">2500</option>
              </select>
              <span className="text-sm text-gray-600">per page</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
