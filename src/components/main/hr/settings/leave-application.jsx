'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function LeaveApplication() {
  const colorPickerRef = useRef(null);
  const [series, setSeries] = useState('HR-LAP-.YYYY.-');
  const [employee, setEmployee] = useState('');
  const [company, setCompany] = useState('sdfsdf');
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [halfDay, setHalfDay] = useState(false);
  const [reason, setReason] = useState('');
  const [leaveApprover, setLeaveApprover] = useState('');
  const [postingDate, setPostingDate] = useState('22-10-2025');
  const [status, setStatus] = useState('Open');
  const [followViaEmail, setFollowViaEmail] = useState(true);
  const [otherDetailsExpanded, setOtherDetailsExpanded] = useState(true);
  const [salarySlip, setSalarySlip] = useState('');
  const [letterHead, setLetterHead] = useState('');
  const [color, setColor] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [showEmployeeSuggestions, setShowEmployeeSuggestions] = useState(false);
  const [showLeaveTypeSuggestions, setShowLeaveTypeSuggestions] = useState(false);

  const colorSwatches = [
    '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444', 
    '#EC4899', '#22C55E', '#2563EB', '#F97316', '#3B82F6',
    '#14B8A6', '#84CC16'
  ];

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Info Banner */}
        {showBanner && (
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-2 flex items-center justify-between">
            <span className="text-sm text-blue-800">Fill the form and save it</span>
            <button
              onClick={() => setShowBanner(false)}
              className="text-blue-800 hover:text-blue-900 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Main Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {/* Left Column - Input Fields */}
              <div className="space-y-4">
                {/* Series - Required */}
                <div>
                  <label htmlFor="series" className="block text-sm font-medium text-gray-700 mb-1">
                    Series <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="series"
                    value={series}
                    onChange={(e) => setSeries(e.target.value)}
                    className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="HR-LAP-.YYYY.-">HR-LAP-.YYYY.-</option>
                  </select>
                </div>

                {/* Employee - Required */}
                <div className="relative">
                  <label htmlFor="employee" className="block text-sm font-medium text-gray-700 mb-1">
                    Employee <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="employee"
                    value={employee}
                    onChange={(e) => setEmployee(e.target.value)}
                    onFocus={() => setShowEmployeeSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowEmployeeSuggestions(false), 200)}
                    className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  
                  {/* Suggestions Dropdown */}
                  {showEmployeeSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md border border-gray-300 shadow-lg z-10">
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          window.location.href = '/hr/employee';
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center border-b border-gray-200"
                      >
                        <span className="text-gray-500 mr-2">+</span>
                        <span>Create a new <span className="text-blue-600">Employee</span></span>
                      </button>
                      <button
                        type="button"
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                      >
                        <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>Advanced Search</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Input Fields */}
              <div className="space-y-4">
                {/* Leave Type - Required */}
                <div className="relative">
                  <label htmlFor="leave-type" className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="leave-type"
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    onFocus={() => setShowLeaveTypeSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowLeaveTypeSuggestions(false), 200)}
                    className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  
                  {/* Suggestions Dropdown */}
                  {showLeaveTypeSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md border border-gray-300 shadow-lg z-10">
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          window.location.href = '/hr/leave-type';
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center border-b border-gray-200"
                      >
                        <span className="text-gray-500 mr-2">+</span>
                        <span>Create a new <span className="text-blue-600">Leave Type</span></span>
                      </button>
                      <button
                        type="button"
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                      >
                        <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>Advanced Search</span>
                      </button>
                    </div>
                  )}
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
            </div>

            {/* Dates & Reason Section */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Dates & Reason</h3>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {/* Left Column */}
                <div className="space-y-4">
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

                  {/* Half Day Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="half-day"
                      checked={halfDay}
                      onChange={(e) => setHalfDay(e.target.checked)}
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="half-day" className="ml-2 text-sm text-gray-700">
                      Half Day
                    </label>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Reason */}
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                      Reason
                    </label>
                    <textarea
                      id="reason"
                      rows={8}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Approval Section */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Approval</h3>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Leave Approver - Required */}
                  <div>
                    <label htmlFor="leave-approver" className="block text-sm font-medium text-gray-700 mb-1">
                      Leave Approver <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="leave-approver"
                      value={leaveApprover}
                      onChange={(e) => setLeaveApprover(e.target.value)}
                      className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Follow via Email Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="follow-via-email"
                      checked={followViaEmail}
                      onChange={(e) => setFollowViaEmail(e.target.checked)}
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="follow-via-email" className="ml-2 text-sm text-gray-700">
                      Follow via Email
                    </label>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Posting Date - Required */}
                  <div>
                    <label htmlFor="posting-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Posting Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="posting-date"
                      value={postingDate}
                      onChange={(e) => setPostingDate(e.target.value)}
                      className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Status - Required */}
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="Open">Open</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Details Section - Expandable */}
            <div className="mt-6 border-t border-gray-200 pt-2">
              <div className="flex items-center mb-4 cursor-pointer" onClick={() => setOtherDetailsExpanded(!otherDetailsExpanded)}>
                <h3 className="text-base font-semibold text-gray-900">Other Details</h3>
                <button className="ml-2 text-gray-400 hover:text-gray-600">
                  <svg className={`h-5 w-5 transition-transform ${otherDetailsExpanded ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {otherDetailsExpanded && (
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Salary Slip */}
                    <div>
                      <label htmlFor="salary-slip" className="block text-sm font-medium text-gray-700 mb-1">
                        Salary Slip
                      </label>
                      <input
                        type="text"
                        id="salary-slip"
                        value={salarySlip}
                        onChange={(e) => setSalarySlip(e.target.value)}
                        className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Color */}
                    <div>
                      <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                        Color
                      </label>
                      <div className="relative" ref={colorPickerRef}>
                        <div 
                          onClick={() => setShowColorPicker(!showColorPicker)}
                          className="flex items-center w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors"
                        >
                          {color ? (
                            <>
                              <div className="w-5 h-5 rounded-full border border-gray-300 mr-2" style={{backgroundColor: color}}>
                              </div>
                              <span className="text-sm text-gray-700">{color}</span>
                            </>
                          ) : (
                            <>
                              <div className="w-5 h-5 rounded-full border border-gray-300 mr-2" style={{background: 'linear-gradient(135deg, red 0%, yellow 20%, green 40%, cyan 60%, blue 80%, magenta 100%)'}}>
                              </div>
                              <span className="text-sm text-gray-500">Choose a color</span>
                            </>
                          )}
                        </div>

                        {/* Color Picker Dropdown */}
                        {showColorPicker && (
                          <div className="absolute bottom-full left-0 mb-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50">
                            {/* Swatches */}
                            <div className="mb-3">
                              <h4 className="text-xs font-medium text-gray-700 mb-2">SWATCHES</h4>
                              <div className="grid grid-cols-7 gap-1.5">
                                {colorSwatches.map((swatch, index) => (
                                  <button
                                    key={index}
                                    onClick={() => {
                                      setColor(swatch);
                                      setShowColorPicker(false);
                                    }}
                                    className="w-7 h-7 rounded-full border border-gray-300 hover:scale-110 transition-transform"
                                    style={{backgroundColor: swatch}}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Color Picker */}
                            <div>
                              <h4 className="text-xs font-medium text-gray-700 mb-2">COLOR PICKER</h4>
                              <div className="relative w-full h-40 rounded-lg overflow-hidden mb-2" 
                                style={{
                                  background: 'linear-gradient(to bottom, transparent, black), linear-gradient(to right, white, red)'
                                }}>
                              </div>
                              
                              {/* Hue Slider */}
                              <div className="relative w-full h-3 rounded-full overflow-hidden" 
                                style={{
                                  background: 'linear-gradient(to right, red, yellow, green, cyan, blue, magenta, red)'
                                }}>
                                <div className="absolute top-1/2 left-0 w-3 h-3 bg-white border-2 border-gray-400 rounded-full transform -translate-y-1/2 shadow-md"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Letter Head */}
                    <div>
                      <label htmlFor="letter-head" className="block text-sm font-medium text-gray-700 mb-1">
                        Letter Head
                      </label>
                      <input
                        type="text"
                        id="letter-head"
                        value={letterHead}
                        onChange={(e) => setLetterHead(e.target.value)}
                        className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
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

