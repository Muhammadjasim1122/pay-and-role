'use client';

import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

export default function EmployeeGrievanceForm({ isSidebarOpen = true, editId = null }) {
  const [formData, setFormData] = useState({
    subject: '',
    date: '',
    raisedBy: '',
    status: 'Open',
    grievanceAgainstParty: '',
    grievanceAgainst: '',
    grievanceType: '',
    associatedDocumentType: '',
    associatedDocument: '',
    description: '',
    resolution: '',
    resolvedBy: '',
    resolutionDate: '',
    employeeResponsible: '',
    resolutionDetails: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    if (!formData.subject || !formData.date || !formData.raisedBy || !formData.grievanceAgainstParty || !formData.grievanceAgainst || !formData.grievanceType || !formData.description) {
      alert('Please fill in required fields!');
      return;
    }
    
    // Get existing grievances from localStorage
    const saved = localStorage.getItem('employeeGrievances');
    const existingGrievances = saved ? JSON.parse(saved) : [];
    
    let updatedGrievances;
    
    if (editId) {
      // Update existing grievance
      updatedGrievances = existingGrievances.map(item => 
        item.id === editId ? { ...item, ...formData } : item
      );
      localStorage.setItem('employeeGrievances', JSON.stringify(updatedGrievances));
      setToastMessage('Employee grievance updated successfully!');
    } else {
      // Add new grievance
      const newGrievance = {
        id: `GR${String(Date.now()).slice(-6)}`,
        ...formData
      };
      updatedGrievances = [...existingGrievances, newGrievance];
      localStorage.setItem('employeeGrievances', JSON.stringify(updatedGrievances));
      setToastMessage('Employee grievance saved successfully!');
    }
    
    // Trigger custom event to refresh the list
    window.dispatchEvent(new CustomEvent('grievanceDataChanged'));
    
    setShowToast(true);
    
    setTimeout(() => {
      const event = new CustomEvent('setActiveContent', { detail: 'employee-grievance' });
      window.dispatchEvent(event);
      window.history.pushState({ activeContent: 'employee-grievance' }, '', '/');
    }, 500);
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'employee-grievance' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'employee-grievance' }, '', '/');
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load data when editing
  useEffect(() => {
    if (editId && typeof window !== 'undefined') {
      const saved = localStorage.getItem('employeeGrievances');
      if (saved) {
        const grievances = JSON.parse(saved);
        const grievanceToEdit = grievances.find(item => item.id === editId);
        if (grievanceToEdit) {
          setFormData(grievanceToEdit);
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">Employee Grievance</h2>

          {/* Grievance Details Section */}
          <div className="mb-6">
            {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">Grievance Details</h3> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter subject"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Raised By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Raised By <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="raisedBy"
                  value={formData.raisedBy || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status || 'Open'}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Open">Open</option>
                  <option value="In Review">In Review</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              {/* Grievance Against Party */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grievance Against Party <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="grievanceAgainstParty"
                  value={formData.grievanceAgainstParty || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter party"
                />
              </div>

              {/* Associated Document Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Associated Document Type
                </label>
                <input
                  type="text"
                  name="associatedDocumentType"
                  value={formData.associatedDocumentType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter document type"
                />
              </div>

              {/* Grievance Against */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grievance Against <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="grievanceAgainst"
                  value={formData.grievanceAgainst || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter details"
                />
              </div>

              {/* Associated Document */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Associated Document
                </label>
                <input
                  type="text"
                  name="associatedDocument"
                  value={formData.associatedDocument}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter document"
                />
              </div>

              {/* Grievance Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grievance Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="grievanceType"
                  value={formData.grievanceType || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter grievance type"
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder="Enter description..."
            />
          </div>

          {/* Resolution Details Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resolution Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Resolved By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolved By
                </label>
                <input
                  type="text"
                  name="resolvedBy"
                  value={formData.resolvedBy || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                />
              </div>

              {/* Resolution Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution Date
                </label>
                <input
                  type="date"
                  name="resolutionDate"
                  value={formData.resolutionDate || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Employee Responsible */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Responsible
                </label>
                <input
                  type="text"
                  name="employeeResponsible"
                  value={formData.employeeResponsible || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                />
              </div>
            </div>

            {/* Resolution Details Textarea */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resolution Details
              </label>
              <textarea
                name="resolutionDetails"
                value={formData.resolutionDetails || ''}
                onChange={handleInputChange}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                placeholder="Enter resolution details..."
              />
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

