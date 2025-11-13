'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLeaveApplication } from '../../../../contexts/LeaveApplicationContext';
import { employeeAPI, leaveTypeAPI } from '../../../../lib/api';
import { Save, X } from 'lucide-react';

export default function LeaveApplication({ isSidebarOpen = true }) {
  const { addLeaveApplication } = useLeaveApplication();
  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredLeaveTypes, setFilteredLeaveTypes] = useState([]);
  const colorPickerRef = useRef(null);
  const [series, setSeries] = useState('HR-LAP-.YYYY.-');
  const [employee, setEmployee] = useState('');
  const [employeeId, setEmployeeId] = useState(''); // Store the actual employee ObjectId
  const [company, setCompany] = useState('Default Company');
  const [leaveType, setLeaveType] = useState('');
  const [leaveTypeId, setLeaveTypeId] = useState(''); // Store the actual leave type ObjectId
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [halfDay, setHalfDay] = useState(false);
  const [reason, setReason] = useState('');
  const [leaveApprover, setLeaveApprover] = useState('');
  const [postingDate, setPostingDate] = useState('');
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const colorSwatches = [
    '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444', 
    '#EC4899', '#22C55E', '#2563EB', '#F97316', '#3B82F6',
    '#14B8A6', '#84CC16'
  ];

  // Fetch employees and leave types on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch employees
        const employeesResponse = await employeeAPI.getAll({ limit: 100 });
        if (employeesResponse.success) {
          const employeeList = employeesResponse.data.map(emp => ({
            id: emp._id,
            name: `${emp.firstName} ${emp.middleName ? emp.middleName + ' ' : ''}${emp.lastName || ''}`.trim(),
            employeeId: emp.employeeId || `HR-EMP-${emp._id}`,
            fullData: emp
          }));
          setEmployees(employeeList);
          setFilteredEmployees(employeeList);
        }

        // Fetch leave types
        const leaveTypesResponse = await leaveTypeAPI.getAll({ limit: 100 });
        if (leaveTypesResponse.success) {
          const leaveTypeList = leaveTypesResponse.data.map(lt => ({
            id: lt._id,
            name: lt.leaveTypeName,
            fullData: lt
          }));
          setLeaveTypes(leaveTypeList);
          setFilteredLeaveTypes(leaveTypeList);
        }
      } catch (error) {
        console.error('Error fetching employees/leave types:', error);
      }
    };

    fetchData();
  }, []);

  // Filter employees based on input
  useEffect(() => {
    if (employee.trim()) {
      const filtered = employees.filter(emp => 
        emp.name.toLowerCase().includes(employee.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(employee.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      // Show all employees when field is empty
      setFilteredEmployees(employees);
    }
  }, [employee, employees]);

  // Filter leave types based on input
  useEffect(() => {
    if (leaveType.trim()) {
      const filtered = leaveTypes.filter(lt => 
        lt.name.toLowerCase().includes(leaveType.toLowerCase())
      );
      setFilteredLeaveTypes(filtered);
    } else {
      setFilteredLeaveTypes(leaveTypes);
    }
  }, [leaveType, leaveTypes]);

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

  const handleSave = async () => {
    // Validate required fields
    if (!employee.trim()) {
      setAlertMessage('Employee is required!');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    if (!leaveType.trim()) {
      setAlertMessage('Leave Type is required!');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    if (!fromDate) {
      setAlertMessage('From Date is required!');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    if (!toDate) {
      setAlertMessage('To Date is required!');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    if (!leaveApprover.trim()) {
      setAlertMessage('Leave Approver is required!');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    // Helper function to safely parse dates
    const parseDate = (dateValue) => {
      if (!dateValue || dateValue.trim() === '') return null;
      
      // If it's already a valid Date object
      if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
        return dateValue.toISOString();
      }
      
      // Try parsing as Date (handles ISO format, YYYY-MM-DD, etc.)
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        return date.toISOString();
      }
      
      // If it's in DD-MM-YYYY format, convert it
      if (typeof dateValue === 'string' && dateValue.includes('-')) {
        const parts = dateValue.split('-');
        if (parts.length === 3) {
          // Try DD-MM-YYYY format
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const year = parseInt(parts[2], 10);
          
          if (!isNaN(day) && !isNaN(month) && !isNaN(year) && day > 0 && day <= 31 && month > 0 && month <= 12) {
            const parsedDate = new Date(year, month - 1, day);
            if (!isNaN(parsedDate.getTime())) {
              return parsedDate.toISOString();
            }
          }
        }
      }
      
      console.warn(`Invalid date value: ${dateValue}`);
      return null;
    };

    // Validate employee exists and get ObjectId
    let finalEmployeeId = employeeId; // Use stored ID if available
    
    if (!finalEmployeeId || finalEmployeeId.trim() === '') {
      // If no stored ID, try to find employee by name or employeeId
      const employeeInput = employee.trim();
      const foundEmployee = employees.find(emp => 
        emp.name.toLowerCase() === employeeInput.toLowerCase() ||
        emp.employeeId.toLowerCase() === employeeInput.toLowerCase() ||
        emp.id === employeeInput
      );
      
      if (!foundEmployee) {
        if (employees.length === 0) {
          setAlertMessage('No employees found. Please create an employee first.');
        } else {
          setAlertMessage(`Employee "${employeeInput}" not found. Please select from the dropdown list or create a new employee.`);
        }
        setAlertType('error');
        setShowAlert(true);
        setShowEmployeeSuggestions(true);
        setTimeout(() => setShowAlert(false), 5000);
        return;
      }
      finalEmployeeId = foundEmployee.id;
    }

    // Validate leave type exists and get ObjectId
    let finalLeaveTypeId = leaveTypeId; // Use stored ID if available
    
    if (!finalLeaveTypeId || finalLeaveTypeId.trim() === '') {
      // If no stored ID, try to find leave type by name
      const leaveTypeInput = leaveType.trim();
      const foundLeaveType = leaveTypes.find(lt => 
        lt.name.toLowerCase() === leaveTypeInput.toLowerCase() ||
        lt.id === leaveTypeInput
      );
      
      if (!foundLeaveType) {
        setAlertMessage(`Leave Type "${leaveTypeInput}" not found. Please select from the dropdown list.`);
        setAlertType('error');
        setShowAlert(true);
        setShowLeaveTypeSuggestions(true);
        setTimeout(() => setShowAlert(false), 5000);
        return;
      }
      finalLeaveTypeId = foundLeaveType.id;
    }

    // Create application data with proper formatting
    const applicationData = {
      employee: finalEmployeeId, // Employee ObjectId
      company: company.trim() || 'Default Company',
      leaveType: finalLeaveTypeId, // LeaveType ObjectId
      fromDate: parseDate(fromDate),
      toDate: parseDate(toDate),
      halfDay: halfDay || false,
      reason: reason?.trim() || undefined,
      leaveApprover: leaveApprover.trim(),
      postingDate: postingDate ? parseDate(postingDate) : new Date().toISOString(),
      status: status || 'Open',
      followViaEmail: followViaEmail !== undefined ? followViaEmail : true,
      salarySlip: salarySlip?.trim() || undefined,
      letterHead: letterHead?.trim() || undefined,
      color: color || '#3B82F6'
    };

    // Clean undefined values
    const cleanedData = Object.fromEntries(
      Object.entries(applicationData).filter(([_, v]) => v !== undefined && v !== '')
    );

    console.log('Sending leave application data:', cleanedData);

    try {
      await addLeaveApplication(cleanedData);
      setAlertMessage('Leave Application saved successfully!');
      setAlertType('success');
      setShowAlert(true);
      
      // Reset form
      setEmployee('');
      setEmployeeId('');
      setLeaveType('');
      setLeaveTypeId('');
      setFromDate('');
      setToDate('');
      setHalfDay(false);
      setReason('');
      setLeaveApprover('');
      setStatus('Open');
      setFollowViaEmail(true);
      setSalarySlip('');
      setLetterHead('');
      setColor('');
      
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error('Error saving leave application:', error);
      setAlertMessage(error.message || 'Error saving leave application!');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  const handleCancel = () => {
    // Navigate back to leave application list
    const event = new CustomEvent('setActiveContent', { detail: 'leave-application-list' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'leave-application-list' }, '', '/');
  };

  return (
    <div className={`bg-gray-50 ${isSidebarOpen ? 'min-h-screen p-6' : 'min-h-screen p-6'}`}>
      <div className={`mx-auto ${isSidebarOpen ? 'max-w-7xl' : 'max-w-full'}`}>
        {/* Alert */}
        {showAlert && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
            alertType === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            <div className="flex items-center justify-between">
              <span>{alertMessage}</span>
              <button 
                onClick={() => setShowAlert(false)}
                className="ml-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

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
                    onChange={(e) => {
                      setEmployee(e.target.value);
                      setEmployeeId(''); // Clear ID when user types manually
                      setShowEmployeeSuggestions(true);
                    }}
                    onFocus={() => {
                      setShowEmployeeSuggestions(true);
                      // Show all employees when field is focused
                      if (!employee.trim()) {
                        setFilteredEmployees(employees);
                      }
                    }}
                    onBlur={() => setTimeout(() => setShowEmployeeSuggestions(false), 200)}
                    placeholder="Click to see employees or type to search..."
                    className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  
                  {/* Suggestions Dropdown */}
                  {showEmployeeSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md border border-gray-300 shadow-lg z-10 max-h-60 overflow-y-auto">
                      {employees.length === 0 ? (
                        <div className="px-3 py-4 text-sm text-gray-600">
                          <div className="mb-2">No employees found in the system.</div>
                          <button
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              window.location.href = '/hr/employee';
                            }}
                            className="text-blue-600 hover:text-blue-800 underline font-medium"
                          >
                            Create your first employee →
                          </button>
                        </div>
                      ) : filteredEmployees.length > 0 ? (
                        <>
                          {filteredEmployees.slice(0, 10).map((emp) => (
                            <button
                              key={emp.id}
                              type="button"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                setEmployee(emp.name);
                                setEmployeeId(emp.id); // Store the ObjectId
                                setShowEmployeeSuggestions(false);
                              }}
                              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between border-b border-gray-100"
                            >
                              <div>
                                <div className="font-medium">{emp.name}</div>
                                <div className="text-xs text-gray-500">{emp.employeeId}</div>
                              </div>
                            </button>
                          ))}
                          {employee.trim() && filteredEmployees.length === 0 && (
                            <div className="px-3 py-2 text-sm text-gray-500 border-b border-gray-200">
                              No employees match "{employee}"
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          {employee.trim() ? `No employees match "${employee}"` : 'Type to search employees...'}
                        </div>
                      )}
                      {employees.length > 0 && (
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            window.location.href = '/hr/employee';
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center border-t border-gray-200"
                        >
                          <span className="text-gray-500 mr-2">+</span>
                          <span>Create a new <span className="text-blue-600">Employee</span></span>
                        </button>
                      )}
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
                    onChange={(e) => {
                      setLeaveType(e.target.value);
                      setLeaveTypeId(''); // Clear ID when user types manually
                      setShowLeaveTypeSuggestions(true);
                    }}
                    onFocus={() => setShowLeaveTypeSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowLeaveTypeSuggestions(false), 200)}
                    placeholder="Type to search leave types..."
                    className="w-full px-3 py-0 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  
                  {/* Suggestions Dropdown */}
                  {showLeaveTypeSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md border border-gray-300 shadow-lg z-10 max-h-60 overflow-y-auto">
                      {filteredLeaveTypes.length > 0 ? (
                        filteredLeaveTypes.slice(0, 10).map((lt) => (
                          <button
                            key={lt.id}
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setLeaveType(lt.name);
                              setLeaveTypeId(lt.id); // Store the ObjectId
                              setShowLeaveTypeSuggestions(false);
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center border-b border-gray-100"
                          >
                            <div className="font-medium">{lt.name}</div>
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">No leave types found</div>
                      )}
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          window.location.href = '/hr/leave-type';
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center border-t border-gray-200"
                      >
                        <span className="text-gray-500 mr-2">+</span>
                        <span>Create a new <span className="text-blue-600">Leave Type</span></span>
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

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

