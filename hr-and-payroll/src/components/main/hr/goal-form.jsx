'use client';

import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

export default function GoalForm({ isSidebarOpen = true, editId = null }) {
  const [formData, setFormData] = useState({
    name: '',
    enabled: true,
    company: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.company) {
      alert('Please fill in required fields!');
      return;
    }
    
    // Get existing goals from localStorage
    const saved = localStorage.getItem('goals');
    const existingGoals = saved ? JSON.parse(saved) : [];
    
    let updatedGoals;
    
    if (editId) {
      // Update existing goal
      updatedGoals = existingGoals.map(item => 
        item.id === editId ? { ...item, ...formData } : item
      );
      localStorage.setItem('goals', JSON.stringify(updatedGoals));
      setToastMessage('Goal updated successfully!');
    } else {
      // Add new goal
      const newGoal = {
        id: `GO${String(Date.now()).slice(-6)}`,
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      updatedGoals = [...existingGoals, newGoal];
      localStorage.setItem('goals', JSON.stringify(updatedGoals));
      setToastMessage('Goal saved successfully!');
    }
    
    // Trigger custom event to refresh the list
    window.dispatchEvent(new CustomEvent('goalDataChanged'));
    
    setShowToast(true);
    
    setTimeout(() => {
      const event = new CustomEvent('setActiveContent', { detail: 'goal' });
      window.dispatchEvent(event);
      window.history.pushState({ activeContent: 'goal' }, '', '/');
    }, 500);
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'goal' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'goal' }, '', '/');
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load data when editing
  useEffect(() => {
    if (editId && typeof window !== 'undefined') {
      const saved = localStorage.getItem('goals');
      if (saved) {
        const goals = JSON.parse(saved);
        const goalToEdit = goals.find(item => item.id === editId);
        if (goalToEdit) {
          setFormData(goalToEdit);
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">Goal</h2>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
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
                  placeholder="Select company"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  placeholder="Enter description..."
                />
              </div>

              {/* Enabled Checkbox */}
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="enabled"
                    checked={formData.enabled}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Enabled</span>
                </label>
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

