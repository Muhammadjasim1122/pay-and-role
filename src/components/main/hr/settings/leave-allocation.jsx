'use client';

import React, { useState } from 'react';

export default function LeaveAllocation() {
  const [series, setSeries] = useState('HR-LAL-.YYYY.-');
  const [employee, setEmployee] = useState('');
  const [company, setCompany] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('2025-10-22');
  const [toDate, setToDate] = useState('');
  const [newLeavesAllocated, setNewLeavesAllocated] = useState('');
  const [addUnusedLeaves, setAddUnusedLeaves] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [description, setDescription] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Container */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Main Content */}
          <div className="p-6">
            {/* Two Column Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Input Fields */}
              <div className="space-y-4">
                {/* Series - Required */}
                <div>
                  <label htmlFor="series" className="block text-sm font-medium text-gray-700 mb-1">
                    Series <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="series"
                    value={series}
                    onChange={(e) => setSeries(e.target.value)}
                    className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Employee - Required */}
                <div>
                  <label htmlFor="employee" className="block text-sm font-medium text-gray-700 mb-1">
                    Employee <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="employee"
                    value={employee}
                    onChange={(e) => setEmployee(e.target.value)}
                    className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Company - Required */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Right Column - Input Fields */}
              <div className="space-y-4">
                {/* Leave Type - Required */}
                <div>
                  <label htmlFor="leave-type" className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="leave-type"
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* From Date - Required */}
                <div>
                  <label htmlFor="from-date" className="block text-sm font-medium text-gray-700 mb-1">
                    From Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="from-date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* To Date - Required */}
                <div>
                  <label htmlFor="to-date" className="block text-sm font-medium text-gray-700 mb-1">
                    To Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="to-date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Allocation Section */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Allocation</h3>
              
              <div className="space-y-4">
                {/* New Leaves Allocated */}
                <div className="max-w-md">
                  <label htmlFor="new-leaves" className="block text-sm font-medium text-gray-700 mb-1">
                    New Leaves Allocated
                  </label>
                  <input
                    type="number"
                    id="new-leaves"
                    value={newLeavesAllocated}
                    onChange={(e) => setNewLeavesAllocated(e.target.value)}
                    className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Add unused leaves from previous allocations */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="add-unused"
                    checked={addUnusedLeaves}
                    onChange={(e) => setAddUnusedLeaves(e.target.checked)}
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="add-unused" className="ml-2 text-sm text-gray-700">
                    Add unused leaves from previous allocations
                  </label>
                </div>
              </div>
            </div>

            {/* Notes Section - Expandable */}
            <div className="mt-6 border-t border-gray-200 pt-2">
              <div className="flex items-center mb-4 cursor-pointer" onClick={() => setNotesExpanded(!notesExpanded)}>
                <button className="text-gray-400 hover:text-gray-600 mr-2">
                  <svg className={`h-5 w-5 transition-transform ${notesExpanded ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <h3 className="text-base font-semibold text-gray-900">Notes</h3>
              </div>

              {notesExpanded && (
                <div>
                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={8}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

