'use client';

import React, { useState, useEffect } from 'react';
import { Save, X, ChevronDown } from 'lucide-react';

export default function EmployeeAdvanceForm({ isSidebarOpen = true, editId = null }) {
  const [formData, setFormData] = useState({
    series: 'HR-EAD-.YYYY.-',
    postingDate: '',
    employee: '',
    company: '',
    purpose: '',
    advanceAmount: '',
    amountOfExpense: ''
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showSeriesDropdown, setShowSeriesDropdown] = useState(false);

  const seriesSuggestions = [
    'HR-EAD-.YYYY.-',
    'HR-EAD-2024-00001',
    'HR-EAD-2024-00002',
    'HR-EAD-2024-00003'
  ];

  useEffect(() => {
    if (editId) {
      const saved = localStorage.getItem('employeeAdvances');
      if (saved) {
        const advances = JSON.parse(saved);
        const advanceToEdit = advances.find(a => a.id === editId);
        if (advanceToEdit) {
          setFormData({
            series: advanceToEdit.series || 'HR-EAD-.YYYY.-',
            postingDate: advanceToEdit.date || '',
            employee: advanceToEdit.employeeName || '',
            company: advanceToEdit.company || '',
            purpose: advanceToEdit.purpose || '',
            advanceAmount: advanceToEdit.amount || '',
            amountOfExpense: advanceToEdit.amountOfExpense || ''
          });
        }
      }
    }
  }, [editId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSeriesSelect = (series) => {
    setFormData(prev => ({ ...prev, series }));
    setShowSeriesDropdown(false);
  };

  const handleSave = () => {
    if (!formData.postingDate || !formData.employee || !formData.company || !formData.purpose || !formData.advanceAmount) {
      alert('Please fill in all required fields!');
      return;
    }
    
    // Get existing advances from localStorage
    const saved = localStorage.getItem('employeeAdvances');
    const existingAdvances = saved ? JSON.parse(saved) : [];
    
    let updatedAdvances;
    
    if (editId) {
      // Update existing advance
      updatedAdvances = existingAdvances.map(item => 
        item.id === editId ? { 
          ...item, 
          series: formData.series,
          date: formData.postingDate,
          employeeName: formData.employee,
          company: formData.company,
          purpose: formData.purpose,
          amount: formData.advanceAmount,
          amountOfExpense: formData.amountOfExpense,
          status: item.status || 'Draft'
        } : item
      );
      localStorage.setItem('employeeAdvances', JSON.stringify(updatedAdvances));
      setToastMessage('Employee advance updated successfully!');
    } else {
      // Add new advance
      const newAdvance = {
        id: `EA${String(Date.now()).slice(-6)}`,
        series: formData.series,
        date: formData.postingDate,
        employeeName: formData.employee,
        company: formData.company,
        purpose: formData.purpose,
        amount: formData.advanceAmount,
        amountOfExpense: formData.amountOfExpense,
        status: 'Draft'
      };
      updatedAdvances = [...existingAdvances, newAdvance];
      localStorage.setItem('employeeAdvances', JSON.stringify(updatedAdvances));
      setToastMessage('Employee advance saved successfully!');
    }
    
    // Trigger custom event to refresh the list
    window.dispatchEvent(new CustomEvent('employeeAdvanceDataChanged'));
    
    setShowToast(true);
    
    setTimeout(() => {
      const event = new CustomEvent('setActiveContent', { detail: 'employee-advance' });
      window.dispatchEvent(event);
      window.history.pushState({ activeContent: 'employee-advance' }, '', '/');
    }, 500);
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'employee-advance' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'employee-advance' }, '', '/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSeriesDropdown(false);
    };

    if (showSeriesDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showSeriesDropdown]);

  return (
    <div className={`flex-1 p-6 bg-gray-50 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {editId ? 'Edit Employee Advance' : 'Add Employee Advance'}
          </h2>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Form Fields */}
          <div className="space-y-6">
            {/* General Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Series */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Series
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="series"
                    value={formData.series || ''}
                    onChange={handleInputChange}
                    onClick={(e) => { e.stopPropagation(); setShowSeriesDropdown(!showSeriesDropdown); }}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    placeholder="HR-EAD-.YYYY.-"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
                  {showSeriesDropdown && (
                    <div 
                      className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {seriesSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSeriesSelect(suggestion)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Posting Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Posting Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="postingDate"
                  value={formData.postingDate || ''}
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
                  placeholder="Enter company name"
                />
              </div>
            </div>

            {/* Purpose & Amount Section */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">Purpose & Amount</h3>
              
              <div className="space-y-4">
                {/* Purpose */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="purpose"
                    value={formData.purpose || ''}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter purpose"
                  />
                </div>

                {/* Advance Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Advance Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="advanceAmount"
                    value={formData.advanceAmount || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter advance amount"
                  />
                </div>

                {/* Amount of expense */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount of expense
                  </label>
                  <input
                    type="text"
                    name="amountOfExpense"
                    value={formData.amountOfExpense || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount of expense"
                  />
                </div>
              </div>
            </div>

            {/* Accounting Section */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">Accounting</h3>
              {/* Add accounting fields here if needed */}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
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

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in-0 slide-in-from-top-2">
          <div className="bg-white rounded-lg shadow-lg border border-green-200 px-4 py-3 pr-8 flex items-center gap-3 min-w-[300px]">
            <svg className="h-5 w-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

