'use client';

import React, { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2, Settings } from 'lucide-react';

export default function EmployeeOnboardingForm({ isSidebarOpen = true, editId = null }) {
  const [formData, setFormData] = useState({
    jobApplicant: '',
    jobOffer: '',
    template: '',
    company: '',
    status: 'Pending',
    employeeName: '',
    department: '',
    designation: '',
    employeeGrade: '',
    holidayList: '',
    dateOfJoining: '',
    onboardingBeginsOn: '',
    notifyByEmail: false
  });

  const [activities, setActivities] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddActivity = () => {
    const newActivity = {
      id: Date.now(),
      activityName: '',
      user: '',
      beginOn: '',
      duration: ''
    };
    setActivities([...activities, newActivity]);
  };

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const handleActivityChange = (id, field, value) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, [field]: value } : activity
    ));
  };

  const handleSave = () => {
    if (!formData.jobApplicant || !formData.jobOffer || !formData.company || !formData.employeeName || !formData.dateOfJoining || !formData.onboardingBeginsOn) {
      alert('Please fill in required fields!');
      return;
    }
    
    // Get existing onboardings from localStorage
    const saved = localStorage.getItem('employeeOnboardings');
    const existingOnboardings = saved ? JSON.parse(saved) : [];
    
    let updatedOnboardings;
    
    if (editId) {
      // Update existing onboarding
      updatedOnboardings = existingOnboardings.map(item => 
        item.id === editId ? { ...item, ...formData } : item
      );
      localStorage.setItem('employeeOnboardings', JSON.stringify(updatedOnboardings));
      setToastMessage('Employee onboarding updated successfully!');
    } else {
      // Add new onboarding
      const newOnboarding = {
        id: `ON${String(Date.now()).slice(-6)}`,
        ...formData
      };
      updatedOnboardings = [...existingOnboardings, newOnboarding];
      localStorage.setItem('employeeOnboardings', JSON.stringify(updatedOnboardings));
      setToastMessage('Employee onboarding saved successfully!');
    }
    
    // Trigger custom event to refresh the list
    window.dispatchEvent(new CustomEvent('onboardingDataChanged'));
    
    setShowToast(true);
    
    setTimeout(() => {
      const event = new CustomEvent('setActiveContent', { detail: 'employee-onboarding' });
      window.dispatchEvent(event);
      window.history.pushState({ activeContent: 'employee-onboarding' }, '', '/');
    }, 500);
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'employee-onboarding' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'employee-onboarding' }, '', '/');
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load data when editing
  useEffect(() => {
    if (editId && typeof window !== 'undefined') {
      const saved = localStorage.getItem('employeeOnboardings');
      if (saved) {
        const onboardings = JSON.parse(saved);
        const onboardingToEdit = onboardings.find(item => item.id === editId);
        if (onboardingToEdit) {
          setFormData(onboardingToEdit);
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">Employee Onboarding</h2>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Applicant */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Applicant <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jobApplicant"
                  value={formData.jobApplicant}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select job applicant"
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
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                />
              </div>

              {/* Job Offer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Offer <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jobOffer"
                  value={formData.jobOffer}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select job offer"
                />
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
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Employee Onboarding Template */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Onboarding Template
                </label>
                <input
                  type="text"
                  name="template"
                  value={formData.template}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select template"
                />
              </div>
            </div>

            {/* Employee Details Section */}
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Employee Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter employee name"
                />
              </div>

              {/* Date of Joining */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Joining <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
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

              {/* Onboarding Begins On */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Onboarding Begins On <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="onboardingBeginsOn"
                  value={formData.onboardingBeginsOn}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter designation"
                />
              </div>

              {/* Employee Grade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Grade
                </label>
                <input
                  type="text"
                  name="employeeGrade"
                  value={formData.employeeGrade}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter employee grade"
                />
              </div>

              {/* Holiday List */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Holiday List
                </label>
                <input
                  type="text"
                  name="holidayList"
                  value={formData.holidayList}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select holiday list"
                />
              </div>
            </div>

            {/* Onboarding Activities Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Onboarding Activities</h3>
              <p className="text-sm text-gray-600 mb-4">Activities</p>

              {/* Activities Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                          No.
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                          Activity Name <span className="text-red-500">*</span>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                          User
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                          Begin On (Days)
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                          Duration (Days)
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                          <Settings className="h-4 w-4 mx-auto" />
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {activities.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-4 py-12 text-center">
                            <div className="flex flex-col items-center text-gray-400">
                              <svg className="h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                              </svg>
                              <span className="text-sm">No Data</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        activities.map((activity, index) => (
                          <tr key={activity.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <input type="checkbox" className="rounded border-gray-300" />
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={activity.activityName}
                                onChange={(e) => handleActivityChange(activity.id, 'activityName', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter activity name"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={activity.user}
                                onChange={(e) => handleActivityChange(activity.id, 'user', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Select user"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={activity.beginOn}
                                onChange={(e) => handleActivityChange(activity.id, 'beginOn', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Days"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={activity.duration}
                                onChange={(e) => handleActivityChange(activity.id, 'duration', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Days"
                              />
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => handleDeleteActivity(activity.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Row Button and Notify Checkbox */}
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={handleAddActivity}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Row</span>
                </button>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifyByEmail"
                    checked={formData.notifyByEmail}
                    onChange={handleInputChange}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Notify users by email</span>
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

