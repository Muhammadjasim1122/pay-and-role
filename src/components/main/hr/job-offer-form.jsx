'use client';

import React, { useState, useEffect } from 'react';
import { Save, X, CheckCircle } from 'lucide-react';
import { useRecruitment } from '../../../contexts/RecruitmentContext';

export default function JobOfferForm({ isSidebarOpen = true, editId = null }) {
  const { addJobOffer, getJobOfferById, updateJobOffer } = useRecruitment();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [formData, setFormData] = useState({
    candidate: '',
    position: '',
    department: '',
    salary: '',
    startDate: '',
    offerDate: '',
    status: 'Pending',
    notes: ''
  });

  // Load data if editing
  useEffect(() => {
    if (editId) {
      const offer = getJobOfferById(editId);
      if (offer) {
        setFormData({
          candidate: offer.candidate || '',
          position: offer.position || '',
          department: offer.department || '',
          salary: offer.salary || '',
          startDate: offer.startDate || '',
          offerDate: offer.offerDate || '',
          status: offer.status || 'Pending',
          notes: offer.notes || ''
        });
      }
    }
  }, [editId, getJobOfferById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!formData.candidate || !formData.position || !formData.department || !formData.salary) {
      alert('Please fill in required fields!');
      return;
    }
    
    // Save or update to context
    if (editId) {
      updateJobOffer(editId, formData);
      setToastMessage('Job offer updated successfully!');
    } else {
      addJobOffer(formData);
      setToastMessage('Job offer sent successfully!');
    }
    
    setShowToast(true);
    
    // Navigate back to job offer list after showing toast
    setTimeout(() => {
      const event = new CustomEvent('setActiveContent', { detail: 'job-offer' });
      window.dispatchEvent(event);
      window.history.pushState({ activeContent: 'job-offer' }, '', '/');
    }, 500);
  };

  const handleCancel = () => {
    // Navigate back to job offer list
    const event = new CustomEvent('setActiveContent', { detail: 'job-offer' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'job-offer' }, '', '/');
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in-0 slide-in-from-top-2">
          <div className="bg-white rounded-lg shadow-lg border border-green-200 px-4 py-3 pr-8 flex items-center gap-3 min-w-[300px]">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">{editId ? 'Edit Job Offer' : 'Send Job Offer'}</h2>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Candidate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Candidate Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="candidate"
                value={formData.candidate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter candidate name"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter position"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter department"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter salary"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Offer Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Offer Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="offerDate"
                value={formData.offerDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter any additional notes"
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
              <span>Send Offer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

