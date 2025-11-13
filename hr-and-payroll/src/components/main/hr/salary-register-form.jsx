'use client';

import React, { useState, useEffect } from 'react';
import { Save, X, CheckCircle, AlertCircle } from 'lucide-react';
import { usePayroll } from '../../../contexts/PayrollContext';

export default function SalaryRegisterForm({ isSidebarOpen = true, editId = null }) {
  const { addSalaryRegister, updateSalaryRegister, getSalaryRegisterById } = usePayroll();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [formData, setFormData] = useState({
    payPeriod: '',
    startDate: '',
    endDate: '',
    department: '',
    branch: '',
    company: '',
    status: 'Draft'
  });

  // Load data if editing
  useEffect(() => {
    if (editId) {
      const register = getSalaryRegisterById(editId);
      if (register) {
        setFormData({
          payPeriod: register.payPeriod || '',
          startDate: register.startDate || '',
          endDate: register.endDate || '',
          department: register.department || '',
          branch: register.branch || '',
          company: register.company || '',
          status: register.status || 'Draft'
        });
      }
    }
  }, [editId, getSalaryRegisterById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.payPeriod || !formData.startDate || !formData.endDate) {
      setToastType('error');
      setToastMessage('Please fill in all required fields (Pay Period, Start Date, End Date).');
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
        await updateSalaryRegister(editId, payload);
        setToastType('success');
        setToastMessage('Salary register updated successfully!');
      } else {
        await addSalaryRegister(payload);
        setToastType('success');
        setToastMessage('Salary register generated successfully!');
      }
      setShowToast(true);
  
      setTimeout(() => {
        const event = new CustomEvent('setActiveContent', { detail: 'salary-register' });
        window.dispatchEvent(event);
        window.history.pushState({ activeContent: 'salary-register' }, '', '/');
      }, 500);
    } catch (error) {
      console.error('Failed to generate salary register:', error);
      setToastType('error');
      setToastMessage(error.message || 'Failed to generate salary register. Please try again.');
      setShowToast(true);
    }
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'salary-register' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'salary-register' }, '', '/');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-4xl mx-auto">
        {/* Toast Notification */}
        {showToast && (
          <div className={`fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 rounded-md shadow-lg ${
            toastType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {toastType === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span className="text-sm font-medium">{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Form Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-gray-900">
              {editId ? 'Edit Salary Register' : 'Generate Salary Register'}
            </h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Generate</span>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Pay Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pay Period <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="payPeriod"
                value={formData.payPeriod}
                onChange={handleInputChange}
                placeholder="e.g., January 2024"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Select department"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch
                </label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  placeholder="Select branch"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Select company"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Draft">Draft</option>
                <option value="Submitted">Submitted</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

