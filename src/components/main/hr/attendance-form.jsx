'use client';

import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

export default function AttendanceForm({ isSidebarOpen = true, editId = null }) {
  const [formData, setFormData] = useState({
    series: `HR-ATT-${new Date().getFullYear()}-`,
    employee: '',
    status: 'Present',
    attendanceDate: '',
    company: '',
    shift: '',
    lateEntry: false,
    earlyExit: false
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    if (!formData.employee || !formData.attendanceDate || !formData.company || !formData.status) {
      alert('Please fill in required fields!');
      return;
    }
    
    // Get existing attendances from localStorage
    const saved = localStorage.getItem('attendances');
    const existingAttendances = saved ? JSON.parse(saved) : [];
    
    let updatedAttendances;
    
    if (editId) {
      // Update existing attendance
      updatedAttendances = existingAttendances.map(item => 
        item.id === editId ? { ...item, ...formData } : item
      );
      localStorage.setItem('attendances', JSON.stringify(updatedAttendances));
      setToastMessage('Attendance updated successfully!');
    } else {
      // Add new attendance
      const newAttendance = {
        id: `ATT${String(Date.now()).slice(-6)}`,
        series: `HR-ATT-${new Date().getFullYear()}-${String(existingAttendances.length + 1).padStart(4, '0')}`,
        ...formData
      };
      updatedAttendances = [...existingAttendances, newAttendance];
      localStorage.setItem('attendances', JSON.stringify(updatedAttendances));
      setToastMessage('Attendance saved successfully!');
    }
    
    // Trigger custom event to refresh the list
    window.dispatchEvent(new CustomEvent('attendanceDataChanged'));
    
    setShowToast(true);
    
    setTimeout(() => {
      const event = new CustomEvent('setActiveContent', { detail: 'attendance' });
      window.dispatchEvent(event);
      window.history.pushState({ activeContent: 'attendance' }, '', '/');
    }, 500);
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'attendance' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'attendance' }, '', '/');
  };

  // Load data when editing
  useEffect(() => {
    if (editId && typeof window !== 'undefined') {
      const saved = localStorage.getItem('attendances');
      if (saved) {
        const attendances = JSON.parse(saved);
        const attendanceToEdit = attendances.find(item => item.id === editId);
        if (attendanceToEdit) {
          setFormData(attendanceToEdit);
        }
      }
    }
  }, [editId]);

  return (
    <>
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in-0 slide-in-from-top-2">
          <div className="bg-white rounded-lg shadow-lg border border-green-200 px-4 py-3 pr-8 flex items-center gap-3 min-w-[300px]">
            <svg className="h-5 w-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-green-800">
              {toastMessage}
            </span>
            <button
              onClick={() => setShowToast(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    <div className={`bg-gray-50 min-h-full ${isSidebarOpen ? 'p-6' : 'p-6 min-h-screen'}`}>
      <div className={`mx-auto ${isSidebarOpen ? 'max-w-4xl' : 'max-w-full'}`}>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add Attendance</h2>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Series */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Series <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="series"
                  value={formData.series || `HR-ATT-${new Date().getFullYear()}-`}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="HR-ATT-.YYYY.-"
                />
              </div>

              {/* Employee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="employee"
                  value={formData.employee}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select employee"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>

              {/* Attendance Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attendance Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="attendanceDate"
                  value={formData.attendanceDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company"
                />
              </div>

              {/* Shift */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shift
                </label>
                <input
                  type="text"
                  name="shift"
                  value={formData.shift}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter shift"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
              <div className="space-y-4">
                {/* Late Entry */}
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="lateEntry"
                    checked={formData.lateEntry}
                    onChange={handleInputChange}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Late Entry</span>
                </label>

                {/* Early Exit */}
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="earlyExit"
                    checked={formData.earlyExit}
                    onChange={handleInputChange}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Early Exit</span>
                </label>
              </div>
            </div>
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
    </>
  );
}
