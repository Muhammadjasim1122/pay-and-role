'use client';

import React, { useState, useEffect } from 'react';
import { Save, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useRecruitment } from '../../../contexts/RecruitmentContext';

export default function JobApplicantForm({ isSidebarOpen = true, editId = null }) {
  const { addJobApplicant, getJobApplicantById, updateJobApplicant } = useRecruitment();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: '',
    coverLetter: '',
    status: 'Applied'
  });

  // Load data if editing
  useEffect(() => {
    if (editId) {
      const applicant = getJobApplicantById(editId);
      if (applicant) {
        setFormData({
          name: applicant.name || '',
          email: applicant.email || '',
          phone: applicant.phone || '',
          position: applicant.position || '',
          resume: applicant.resume || '',
          coverLetter: applicant.coverLetter || '',
          status: applicant.status || 'Applied'
        });
      }
    }
  }, [editId, getJobApplicantById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.position) {
      setToastType('error');
      setToastMessage('Please fill in all required fields.');
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
        await updateJobApplicant(editId, payload);
        setToastType('success');
        setToastMessage('Applicant updated successfully!');
      } else {
        await addJobApplicant(payload);
        setToastType('success');
        setToastMessage('Job applicant added successfully!');
      }
      
      setShowToast(true);
      
      setTimeout(() => {
        const event = new CustomEvent('setActiveContent', { detail: 'job-applicant' });
        window.dispatchEvent(event);
        window.history.pushState({ activeContent: 'job-applicant' }, '', '/');
      }, 500);
    } catch (error) {
      console.error('Failed to save applicant:', error);
      setToastType('error');
      setToastMessage(error.message || 'Failed to save applicant. Please try again.');
      setShowToast(true);
    }
  };

  const handleCancel = () => {
    // Navigate back to job applicant list
    const event = new CustomEvent('setActiveContent', { detail: 'job-applicant' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'job-applicant' }, '', '/');
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">{editId ? 'Edit Job Applicant' : 'Add Job Applicant'}</h2>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Applied Position <span className="text-red-500">*</span>
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
                <option value="Applied">Applied</option>
                <option value="Screening">Screening</option>
                <option value="Interview">Interview</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Resume */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume/ CV Link
              </label>
              <input
                type="text"
                name="resume"
                value={formData.resume}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter resume link or file path"
              />
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter cover letter"
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

