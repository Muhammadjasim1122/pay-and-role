'use client';

import React, { useState, useEffect } from 'react';
import { Save, X, CheckCircle, AlertCircle } from 'lucide-react';
import { usePayroll } from '../../../contexts/PayrollContext';

export default function SalarySlipForm({ isSidebarOpen = true, editId = null }) {
  const { addSalarySlip, updateSalarySlip, getSalarySlipById } = usePayroll();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [formData, setFormData] = useState({
    employee: '',
    employeeId: '',
    payPeriod: '',
    startDate: '',
    endDate: '',
    postingDate: '',
    salaryStructure: '',
    base: '',
    grossPay: '',
    totalDeduction: '',
    netPay: '',
    status: 'Draft'
  });

  // Load data if editing
  useEffect(() => {
    if (editId) {
      const slip = getSalarySlipById(editId);
      if (slip) {
        setFormData({
          employee: slip.employee || '',
          employeeId: slip.employeeId || '',
          payPeriod: slip.payPeriod || '',
          startDate: slip.startDate || '',
          endDate: slip.endDate || '',
          postingDate: slip.postingDate || '',
          salaryStructure: slip.salaryStructure || '',
          base: slip.base?.toString() || '',
          grossPay: slip.grossPay?.toString() || '',
          totalDeduction: slip.totalDeduction?.toString() || '',
          netPay: slip.netPay?.toString() || '',
          status: slip.status || 'Draft'
        });
      }
    }
  }, [editId, getSalarySlipById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.employee || !formData.payPeriod || !formData.startDate || !formData.endDate) {
      setToastType('error');
      setToastMessage('Please fill in all required fields (Employee, Pay Period, Start Date, End Date).');
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
        await updateSalarySlip(editId, payload);
        setToastType('success');
        setToastMessage('Salary slip updated successfully!');
      } else {
        await addSalarySlip(payload);
        setToastType('success');
        setToastMessage('Salary slip saved successfully!');
      }
      setShowToast(true);
  
      setTimeout(() => {
        const event = new CustomEvent('setActiveContent', { detail: 'salary-slip' });
        window.dispatchEvent(event);
        window.history.pushState({ activeContent: 'salary-slip' }, '', '/');
      }, 500);
    } catch (error) {
      console.error('Failed to save salary slip:', error);
      setToastType('error');
      setToastMessage(error.message || 'Failed to save salary slip. Please try again.');
      setShowToast(true);
    }
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'salary-slip' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'salary-slip' }, '', '/');
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
              {editId ? 'Edit Salary Slip' : 'New Salary Slip'}
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
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Employee Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="employee"
                  value={formData.employee}
                  onChange={handleInputChange}
                  placeholder="Select employee"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="Employee ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Pay Period */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Posting Date
                </label>
                <input
                  type="date"
                  name="postingDate"
                  value={formData.postingDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Salary Structure */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Structure
              </label>
              <input
                type="text"
                name="salaryStructure"
                value={formData.salaryStructure}
                onChange={handleInputChange}
                placeholder="Select salary structure"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Salary Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base
                </label>
                <input
                  type="number"
                  name="base"
                  value={formData.base}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gross Pay
                </label>
                <input
                  type="number"
                  name="grossPay"
                  value={formData.grossPay}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Deduction
                </label>
                <input
                  type="number"
                  name="totalDeduction"
                  value={formData.totalDeduction}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Net Pay */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Net Pay
              </label>
              <input
                type="number"
                name="netPay"
                value={formData.netPay}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

