'use client';

import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

export default function PerformanceFeedbackForm({ isSidebarOpen = true, editId = null }) {
  const [activeTab, setActiveTab] = useState('details');
  const [formData, setFormData] = useState({
    employee: '',
    reviewer: '',
    addedOn: new Date().toLocaleString('en-GB', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }),
    company: 'sdfsdf',
    feedback: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!formData.employee || !formData.reviewer) {
      alert('Please fill in required fields!');
      return;
    }
    
    // Get existing feedbacks from localStorage
    const saved = localStorage.getItem('performanceFeedbacks');
    const existingFeedbacks = saved ? JSON.parse(saved) : [];
    
    let updatedFeedbacks;
    
    if (editId) {
      // Update existing feedback
      updatedFeedbacks = existingFeedbacks.map(item => 
        item.id === editId ? { ...item, ...formData } : item
      );
      localStorage.setItem('performanceFeedbacks', JSON.stringify(updatedFeedbacks));
      setToastMessage('Performance feedback updated successfully!');
    } else {
      // Add new feedback
      const newFeedback = {
        id: `PF${String(Date.now()).slice(-6)}`,
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      updatedFeedbacks = [...existingFeedbacks, newFeedback];
      localStorage.setItem('performanceFeedbacks', JSON.stringify(updatedFeedbacks));
      setToastMessage('Performance feedback saved successfully!');
    }
    
    // Trigger custom event to refresh the list
    window.dispatchEvent(new CustomEvent('feedbackDataChanged'));
    
    setShowToast(true);
    
    setTimeout(() => {
      const event = new CustomEvent('setActiveContent', { detail: 'performance-feedback' });
      window.dispatchEvent(event);
      window.history.pushState({ activeContent: 'performance-feedback' }, '', '/');
    }, 500);
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'performance-feedback' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'performance-feedback' }, '', '/');
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load data when editing
  useEffect(() => {
    if (editId && typeof window !== 'undefined') {
      const saved = localStorage.getItem('performanceFeedbacks');
      if (saved) {
        const feedbacks = JSON.parse(saved);
        const feedbackToEdit = feedbacks.find(item => item.id === editId);
        if (feedbackToEdit) {
          setFormData(feedbackToEdit);
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">Employee Details</h2>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button 
                onClick={() => setActiveTab('details')}
                className={`pb-2 px-1 text-sm font-medium transition-colors ${
                  activeTab === 'details' 
                    ? 'border-b-2 border-blue-600 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Employee Details
              </button>
              <button 
                onClick={() => setActiveTab('feedback')}
                className={`pb-2 px-1 text-sm font-medium transition-colors ${
                  activeTab === 'feedback' 
                    ? 'border-b-2 border-blue-600 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Feedback
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'details' ? (
            /* Employee Details Fields */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* For Employee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    For Employee <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="employee"
                    value={formData.employee || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select employee"
                  />
                </div>

                {/* Reviewer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reviewer <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="reviewer"
                    value={formData.reviewer || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select reviewer"
                  />
                </div>

                {/* Added On */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Added On <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="addedOn"
                    value={formData.addedOn || ''}
                    readOnly
                    className="w-full px-3 py-1 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Asia/Karachi</p>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Feedback Tab */
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="feedback"
                  value={formData.feedback || ''}
                  onChange={handleInputChange}
                  rows={20}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  placeholder="Enter feedback..."
                />
              </div>
            </div>
          )}

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

