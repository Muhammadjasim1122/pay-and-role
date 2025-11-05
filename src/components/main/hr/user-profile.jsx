'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpDown, X, CheckCircle } from 'lucide-react';

export default function UserProfile() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info (align with User Settings)
    enabled: true,
    email: '',
    fullName: '',
    username: '',
    language: 'English',
    timeZone: 'Asia/Karachi',
    firstName: '',
    middleName: '',
    lastName: '',
    // Additional (kept from previous modal)
    profileImage: '',
    location: '',
    interests: '',
    bio: ''
  });
  const [toast, setToast] = useState({ show: false, message: '' });

  // Load saved profile data on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setFormData(JSON.parse(savedProfile));
    }
  }, []);

  // Generate calendar data for the year
  const months = ['NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'];
  const daysOfWeek = ['Mon', 'Wed', 'Fri'];
  const weeks = Array.from({ length: 53 }, (_, i) => i + 1);

  // Function to check if a day should be shown (for example, show days randomly)
  const shouldShowDay = (month, week) => {
    // Simple logic to show some days - you can make this more sophisticated
    return (week % 3 === 0) || (week % 7 === 0) || (week % 11 === 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    // Keep modal open until user closes it manually

    // Show success toast (top-right)
    setToast({ show: true, message: 'Profile updated successfully' });
    setTimeout(() => setToast({ show: false, message: '' }), 1500);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowEditModal(true)}
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              Edit Profile
            </button>
            <button 
              onClick={() => {
                const event = new CustomEvent('setActiveContent', { detail: 'user-settings' });
                window.dispatchEvent(event);
                window.history.pushState({ activeContent: 'user-settings' }, '', '/');
              }}
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              User Settings
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center space-x-2">
              <ArrowUpDown className="h-4 w-4" />
              <span>Change User</span>
            </button>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm text-center"
                min="2020"
                max="2030"
              />
              <div className="flex flex-col">
                <button
                  onClick={() => setSelectedYear(prev => Math.min(2030, prev + 1))}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedYear(prev => Math.max(2020, prev - 1))}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="flex">
                {/* Day Labels */}
                <div className="flex flex-col mr-2">
                  {daysOfWeek.map((day, idx) => (
                    <div key={idx} className="h-8 flex items-center text-xs text-gray-500 font-medium">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="flex-1">
                  {/* Month Labels */}
                  <div className="flex mb-2">
                    {months.map((month, idx) => (
                      <div key={idx} className="text-xs text-gray-600 font-medium" style={{ width: '8.33%' }}>
                        {month}
                      </div>
                    ))}
                  </div>

                  {/* Days Grid */}
                  <div className="flex flex-col">
                    {daysOfWeek.map((day, dayIdx) => (
                      <div key={dayIdx} className="flex">
                        {weeks.map((week) => (
                          <div
                            key={week}
                            className={`w-2 h-2 m-0.5 rounded-sm ${
                              shouldShowDay(Math.floor(week / 4), week)
                                ? 'bg-gray-400'
                                : 'bg-transparent'
                            }`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Points Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Energy Points</h2>
            <div className="flex items-center space-x-2">
              {['All', 'Last Month', 'Daily'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1 text-sm border rounded-md flex items-center space-x-1 ${
                    selectedFilter === filter
                      ? 'bg-gray-100 border-gray-300 text-gray-900'
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{filter}</span>
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="relative h-48 border border-gray-200 rounded-md bg-white">
            <div className="absolute inset-0 p-4">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-2">
                {[5, 4, 3, 2, 1, 0].map((num) => (
                  <span key={num} className="text-xs text-gray-500">
                    {num}
                  </span>
                ))}
              </div>

              {/* Grid lines */}
              <div className="absolute left-8 right-0 top-0 bottom-0">
                {[5, 4, 3, 2, 1, 0].map((num) => (
                  <div
                    key={num}
                    className="absolute w-full border-t border-gray-100"
                    style={{ bottom: `${(num / 5) * 100}%` }}
                  />
                ))}
              </div>

              {/* Chart line */}
              <div className="absolute left-8 right-0 top-0 bottom-0 p-2">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-full h-0.5 bg-blue-600" />
                  </div>
                </div>
              </div>

              {/* X-axis grid lines */}
              <div className="absolute left-8 right-0 top-0 bottom-0">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <div
                    key={num}
                    className="absolute border-l border-gray-100 h-full"
                    style={{ left: `${(num / 10) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast now rendered inside modal overlay */}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40 backdrop-blur-sm">
          {toast.show && (
            <div className="absolute top-4 right-4 animate-in fade-in-0 slide-in-from-top-2">
              <div className="bg-white rounded-lg shadow-lg border border-green-200 px-4 py-3 pr-8 flex items-center gap-3 min-w-[280px]">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">{toast.message}</span>
                <button onClick={() => setToast({ show: false, message: '' })} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
          )}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body - simplified */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                  <div className="flex items-center">
                    <input type="file" accept="image/*" className="hidden" id="profileImage"
                      onChange={(e) => { const file = e.target.files[0]; if (file) setFormData(prev => ({ ...prev, profileImage: file.name })); }} />
                    <label htmlFor="profileImage" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">Attach</label>
                  </div>
                </div>
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input type="text" name="location" value={formData.location || ''} onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                {/* Interests full width */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                  <input type="text" name="interests" value={formData.interests || ''} onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <hr className="border-gray-200" />
              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea name="bio" value={formData.bio || ''} onChange={handleInputChange} rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
