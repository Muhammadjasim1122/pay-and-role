'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';

export default function UserForm({ isSidebarOpen, editId }) {
  const [activeTab, setActiveTab] = useState('user-details');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    language: 'English',
    timeZone: 'Asia/Karachi',
    enabled: true,
    sendWelcomeEmail: true,
    userType: '',
    role: '',
    fullName: '',
    phone: '',
    mobileNo: '',
    location: '',
    interests: '',
    department: '',
    designation: '',
    company: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    bio: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (editId) {
      const saved = localStorage.getItem('users');
      if (saved) {
        const users = JSON.parse(saved);
        const userToEdit = users.find(u => u.id === editId);
        if (userToEdit) {
          setFormData({
            email: userToEdit.email || '',
            username: userToEdit.username || '',
            firstName: userToEdit.firstName || '',
            middleName: userToEdit.middleName || '',
            lastName: userToEdit.lastName || '',
            language: userToEdit.language || 'English',
            timeZone: userToEdit.timeZone || 'Asia/Karachi',
            enabled: userToEdit.enabled !== undefined ? userToEdit.enabled : true,
            sendWelcomeEmail: userToEdit.sendWelcomeEmail !== undefined ? userToEdit.sendWelcomeEmail : true,
            userType: userToEdit.userType || '',
            role: userToEdit.role || '',
            fullName: userToEdit.fullName || '',
            phone: userToEdit.phone || '',
            mobileNo: userToEdit.mobileNo || '',
            location: userToEdit.location || '',
            interests: userToEdit.interests || '',
            department: userToEdit.department || '',
            designation: userToEdit.designation || '',
            company: userToEdit.company || '',
            dateOfBirth: userToEdit.dateOfBirth || '',
            gender: userToEdit.gender || '',
            bloodGroup: userToEdit.bloodGroup || '',
            bio: userToEdit.bio || '',
            address: userToEdit.address || '',
            city: userToEdit.city || '',
            state: userToEdit.state || '',
            country: userToEdit.country || '',
            pincode: userToEdit.pincode || '',
          });
        }
      }
    }
  }, [editId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Validation
    if (!formData.email || !formData.firstName) {
      alert('Please fill in all required fields (Email and First Name)');
      return;
    }

    const saved = localStorage.getItem('users');
    let users = saved ? JSON.parse(saved) : [];
    
    const userData = {
      id: editId || formData.email || `U${Date.now()}`,
      email: formData.email,
      username: formData.username || formData.email.split('@')[0],
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`.trim(),
      language: formData.language,
      timeZone: formData.timeZone,
      enabled: formData.enabled,
      sendWelcomeEmail: formData.sendWelcomeEmail,
      userType: formData.userType || 'System User',
      role: formData.role,
      phone: formData.phone,
      mobileNo: formData.mobileNo,
      location: formData.location,
      interests: formData.interests,
      department: formData.department,
      designation: formData.designation,
      company: formData.company,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      bio: formData.bio,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      pincode: formData.pincode,
      status: formData.enabled ? 'Active' : 'Inactive',
      lastUpdated: '0 d',
    };

    if (editId) {
      const index = users.findIndex(u => u.id === editId);
      if (index !== -1) {
        users[index] = userData;
      }
      setToastMessage('User updated successfully!');
    } else {
      users.push(userData);
      setToastMessage('User created successfully!');
    }

    localStorage.setItem('users', JSON.stringify(users));
    window.dispatchEvent(new CustomEvent('userDataChanged'));

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      const event = new CustomEvent('setActiveContent', { detail: 'user' });
      window.dispatchEvent(event);
      window.history.pushState({ activeContent: 'user' }, '', '/');
    }, 1500);
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'user' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'user' }, '', '/');
  };

  const isSaved = false; // You can track this based on whether changes were made

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center space-x-2 text-sm">
          <button
            onClick={handleCancel}
            className="text-gray-600 hover:text-gray-900"
          >
            User
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">{editId ? 'Edit User' : 'New User'}</span>
        </div>

        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {editId ? 'Edit User' : 'New User'}
            </h1>
            {!isSaved && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Not Saved
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Create User Email
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
            >
              Save
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'user-details', label: 'User Details' },
              { id: 'roles-permissions', label: 'Roles & Permissions' },
              { id: 'more-information', label: 'More Information' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {activeTab === 'user-details' && (
            <div className="space-y-6">
              {/* Enabled Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enabled"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enabled" className="ml-2 text-sm font-medium text-gray-700">
                  Enabled
                </label>
              </div>

              {/* Basic Info Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Zone
                    </label>
                    <select
                      name="timeZone"
                      value={formData.timeZone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Asia/Karachi">Asia/Karachi</option>
                      <option value="America/New_York">America/New_York</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="Asia/Dubai">Asia/Dubai</option>
                      <option value="Asia/Tokyo">Asia/Tokyo</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    id="sendWelcomeEmail"
                    name="sendWelcomeEmail"
                    checked={formData.sendWelcomeEmail}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sendWelcomeEmail" className="ml-2 text-sm font-medium text-gray-700">
                    Send Welcome Email
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roles-permissions' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Roles & Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User Type
                    </label>
                    <select
                      name="userType"
                      value={formData.userType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select User Type</option>
                      <option value="System User">System User</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Role</option>
                      <option value="Administrator">Administrator</option>
                      <option value="HR Manager">HR Manager</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'more-information' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">More Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <input
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile No
                    </label>
                    <input
                      type="tel"
                      name="mobileNo"
                      value={formData.mobileNo || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Date
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div></div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interests
                    </label>
                    <textarea
                      name="interests"
                      value={formData.interests || ''}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div></div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg">
            <CheckCircle className="h-5 w-5" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}

