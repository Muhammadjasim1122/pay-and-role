'use client';

import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

export default function AppraisalForm({ isSidebarOpen = true, editId = null }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showSeriesDropdown, setShowSeriesDropdown] = useState(false);
  const [formData, setFormData] = useState({
    series: 'HR-APR-.YYYY.-',
    company: 'sdfsdf',
    employee: '',
    appraisalCycle: ''
  });

  const seriesOptions = [
    'HR-APR-.YYYY.-',
    'HR-APR-Q1-2024',
    'HR-APR-Q2-2024',
    'HR-APR-Q3-2024',
    'HR-APR-Q4-2024'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!formData.employee || !formData.appraisalCycle) {
      alert('Please fill in required fields!');
      return;
    }
    
    // Get existing appraisals from localStorage
    const saved = localStorage.getItem('appraisals');
    const existingAppraisals = saved ? JSON.parse(saved) : [];
    
    let updatedAppraisals;
    
    if (editId) {
      // Update existing appraisal
      updatedAppraisals = existingAppraisals.map(item => 
        item.id === editId ? { ...item, ...formData } : item
      );
      localStorage.setItem('appraisals', JSON.stringify(updatedAppraisals));
      setToastMessage('Appraisal updated successfully!');
    } else {
      // Add new appraisal
      const newAppraisal = {
        id: `AP${String(Date.now()).slice(-6)}`,
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      updatedAppraisals = [...existingAppraisals, newAppraisal];
      localStorage.setItem('appraisals', JSON.stringify(updatedAppraisals));
      setToastMessage('Appraisal saved successfully!');
    }
    
    // Trigger custom event to refresh the list
    window.dispatchEvent(new CustomEvent('appraisalDataChanged'));
    
    setShowToast(true);
    
    setTimeout(() => {
      const event = new CustomEvent('setActiveContent', { detail: 'appraisal' });
      window.dispatchEvent(event);
      window.history.pushState({ activeContent: 'appraisal' }, '', '/');
    }, 500);
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'appraisal' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'appraisal' }, '', '/');
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load data when editing
  useEffect(() => {
    if (editId && typeof window !== 'undefined') {
      const saved = localStorage.getItem('appraisals');
      if (saved) {
        const appraisals = JSON.parse(saved);
        const appraisalToEdit = appraisals.find(item => item.id === editId);
        if (appraisalToEdit) {
          setFormData(appraisalToEdit);
        }
      }
    }
  }, [editId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSeriesDropdown && !event.target.closest('.relative')) {
        setShowSeriesDropdown(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [showSeriesDropdown]);

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
          <h2 className="text-xl font-bold text-gray-900 mb-6">Appraisal</h2>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`pb-2 px-1 text-sm font-medium transition-colors ${
                  activeTab === 'overview' 
                    ? 'border-b-2 border-blue-600 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('kras')}
                className={`pb-2 px-1 text-sm font-medium transition-colors ${
                  activeTab === 'kras' 
                    ? 'border-b-2 border-blue-600 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                KRAs
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
              <button 
                onClick={() => setActiveTab('self-appraisal')}
                className={`pb-2 px-1 text-sm font-medium transition-colors ${
                  activeTab === 'self-appraisal' 
                    ? 'border-b-2 border-blue-600 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Self Appraisal
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Series */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Series <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="series"
                      value={formData.series || ''}
                      onChange={handleInputChange}
                      onClick={() => setShowSeriesDropdown(!showSeriesDropdown)}
                      className="w-full px-3 py-1 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      placeholder="Select series"
                    />
                    <svg 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {/* Dropdown Menu */}
                  {showSeriesDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {seriesOptions.map((option, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, series: option }));
                            setShowSeriesDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
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

                {/* Employee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee <span className="text-red-500">*</span>
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

                {/* Appraisal Cycle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appraisal Cycle <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="appraisalCycle"
                    value={formData.appraisalCycle || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select appraisal cycle"
                  />
                </div>
              </div>
            </div>
          ) : activeTab === 'kras' ? (
            <div className="space-y-6">
              {/* Appraisal Template */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appraisal Template
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select appraisal template"
                />
              </div>

              {/* Rate Goals Manually Checkbox */}
              <div className="mb-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Rate Goals Manually</span>
                </label>
              </div>

              {/* KRA vs Goals Table */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">KRA vs Goals</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <input type="checkbox" className="h-4 w-4 border-gray-300 rounded" />
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No.
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            KRA <span className="text-red-500">*</span>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Weightage (%) <span className="text-red-500">*</span>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Goal Completion (%)
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Goal Score (weighted)
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td colSpan="7" className="px-6 py-16 text-center text-gray-500">
                            <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p>No Data</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                      Add Row
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'self-appraisal' ? (
            <div className="space-y-8">
              {/* Ratings Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4">Ratings</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <input type="checkbox" className="h-4 w-4 border-gray-300 rounded" />
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No.
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Criteria <span className="text-red-500">*</span>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Weightage (%) <span className="text-red-500">*</span>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rating
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td colSpan="6" className="px-6 py-16 text-center text-gray-500">
                            <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p>No Data</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                      Add Row
                    </button>
                  </div>
                </div>
              </div>

              {/* Reflections Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4">Reflections</h3>
                <div className="border border-gray-300 rounded-md">
                  {/* Simple Text Area (Rich Text Editor can be added later) */}
                  <textarea
                    rows={12}
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    placeholder="Enter your reflections..."
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Feedback Display */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Feedback</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Form Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reviewer
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Feedback
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                          <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p>No feedback data available</p>
                          <p className="text-xs text-gray-400 mt-2">Feedback from Employee Performance, KRAs, and Self Appraisal will appear here</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Feedback Section */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Add Feedback</h3>
                <textarea
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  placeholder="Enter your feedback..."
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

