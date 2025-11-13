'use client';

import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

export default function ShiftRequestForm({ isSidebarOpen = true, editId = null }) {
  const [formData, setFormData] = useState({
    shiftType: '',
    employee: '',
    status: 'Draft',
    company: '',
    approver: '',
    fromDate: '',
    toDate: ''
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!formData.shiftType || !formData.employee || !formData.status || !formData.company || !formData.approver || !formData.fromDate) {
      alert('Please fill in required fields!');
      return;
    }
    
    // Get existing shift requests from localStorage
    const saved = localStorage.getItem('shiftRequests');
    const existingRequests = saved ? JSON.parse(saved) : [];
    
    let updatedRequests;
    
    if (editId) {
      // Update existing shift request
      updatedRequests = existingRequests.map(item => 
        item.id === editId ? { ...item, ...formData } : item
      );
      localStorage.setItem('shiftRequests', JSON.stringify(updatedRequests));
      setToastMessage('Shift request updated successfully!');
    } else {
      // Add new shift request
      const newRequest = {
        id: `SR${String(Date.now()).slice(-6)}`,
        ...formData
      };
      updatedRequests = [...existingRequests, newRequest];
      localStorage.setItem('shiftRequests', JSON.stringify(updatedRequests));
      setToastMessage('Shift request saved successfully!');
    }
    
    // Trigger custom event to refresh the list
    window.dispatchEvent(new CustomEvent('shiftRequestDataChanged'));
    
    setShowToast(true);
    
    setTimeout(() => {
      const event = new CustomEvent('setActiveContent', { detail: 'shift-request' });
      window.dispatchEvent(event);
      window.history.pushState({ activeContent: 'shift-request' }, '', '/');
    }, 500);
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'shift-request' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'shift-request' }, '', '/');
  };

  // Load data when editing
  useEffect(() => {
    if (editId && typeof window !== 'undefined') {
      const saved = localStorage.getItem('shiftRequests');
      if (saved) {
        const requests = JSON.parse(saved);
        const requestToEdit = requests.find(item => item.id === editId);
        if (requestToEdit) {
          setFormData(requestToEdit);
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add Shift Request</h2>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shift Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shift Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="shiftType"
                  value={formData.shiftType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter shift type"
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

              {/* Approver */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approver <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="approver"
                  value={formData.approver}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select approver"
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
                  <option value="Draft">Draft</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {/* From Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select date"
                />
              </div>

              {/* To Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Date
                </label>
                <input
                  type="text"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select date"
                />
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

