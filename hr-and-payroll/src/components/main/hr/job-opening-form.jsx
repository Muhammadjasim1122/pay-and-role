'use client';

import React, { useState, useEffect } from 'react';
import { Save, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useRecruitment } from '../../../contexts/RecruitmentContext';

export default function JobOpeningForm({ isSidebarOpen = true, editId = null }) {
  const { addJobOpening, getJobOpeningById, updateJobOpening } = useRecruitment();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    location: '',
    employmentType: '',
    experience: '',
    salary: '',
    status: 'Active'
  });

  // Load data if editing
  useEffect(() => {
    if (editId) {
      const job = getJobOpeningById(editId);
      if (job) {
        setFormData({
          title: job.title || '',
          department: job.department || '',
          description: job.description || '',
          location: job.location || '',
          employmentType: job.employmentType || '',
          experience: job.experience || '',
          salary: job.salary || '',
          status: job.status || 'Active'
        });
      }
    }
  }, [editId, getJobOpeningById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.department) {
      setToastType('error');
      setToastMessage('Please fill in all required fields (Title, Department, Location, Employment Type).');
      setShowToast(true);
      return;
    }
    if (!formData.location || !formData.employmentType) {
      setToastType('error');
      setToastMessage('Location and employment type are required.');
      setShowToast(true);
      return;
    }
    
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((key) => {
        if (payload[key] === '') {
          delete payload[key];
        }
      });

      if (editId) {
        await updateJobOpening(editId, payload);
        setToastType('success');
        setToastMessage('Job opening updated successfully!');
      } else {
        await addJobOpening(payload);
        setToastType('success');
        setToastMessage('Job opening saved successfully!');
      }
      setShowToast(true);
  
      setTimeout(() => {
        const event = new CustomEvent('setActiveContent', { detail: 'job-opening' });
        window.dispatchEvent(event);
        window.history.pushState({ activeContent: 'job-opening' }, '', '/');
      }, 500);
    } catch (error) {
      console.error('Failed to save job opening:', error);
      setToastType('error');
      setToastMessage(error.message || 'Failed to save job opening. Please try again.');
      setShowToast(true);
    }
  };

  const handleCancel = () => {
    // Navigate back to job opening list
    const event = new CustomEvent('setActiveContent', { detail: 'job-opening' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'job-opening' }, '', '/');
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in-0 slide-in-from-top-2">
          <div
            className={`bg-white rounded-lg shadow-lg border px-4 py-3 pr-8 flex items-center gap-3 min-w-[300px] ${
              toastType === 'error' ? 'border-red-200' : 'border-green-200'
            }`}
          >
            {toastType === 'error' ? (
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            )}
            <span
              className={`text-sm font-medium ${
                toastType === 'error' ? 'text-red-800' : 'text-green-800'
              }`}
            >
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">{editId ? 'Edit Job Opening' : 'New Job Opening'}</h2>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter job title"
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

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter location"
              />
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment Type <span className="text-red-500">*</span>
              </label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select employment type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Required
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 2-5 years"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., $50,000 - $70,000"
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
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter job description"
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

