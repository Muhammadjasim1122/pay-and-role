'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export default function RoleForm({ isSidebarOpen, editId }) {
  const [formData, setFormData] = useState({
    roleName: '',
    homePage: '',
    restrictToDomain: '',
    disabled: false,
    isCustom: false,
    deskAccess: true,
    twoFactorAuthentication: false,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (editId) {
      const saved = localStorage.getItem('roles');
      if (saved) {
        const roles = JSON.parse(saved);
        const roleToEdit = roles.find(r => r.id === editId);
        if (roleToEdit) {
          setFormData({
            roleName: roleToEdit.roleName || roleToEdit.id || '',
            homePage: roleToEdit.homePage || '',
            restrictToDomain: roleToEdit.restrictToDomain || '',
            disabled: roleToEdit.disabled || false,
            isCustom: roleToEdit.isCustom || false,
            deskAccess: roleToEdit.deskAccess !== undefined ? roleToEdit.deskAccess : true,
            twoFactorAuthentication: roleToEdit.twoFactorAuthentication || false,
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
    if (!formData.roleName) {
      alert('Please fill in Role Name');
      return;
    }

    const saved = localStorage.getItem('roles');
    let roles = saved ? JSON.parse(saved) : [];
    
    const roleData = {
      id: editId || formData.roleName,
      roleName: formData.roleName,
      homePage: formData.homePage,
      restrictToDomain: formData.restrictToDomain,
      disabled: formData.disabled,
      isCustom: formData.isCustom,
      deskAccess: formData.deskAccess,
      twoFactorAuthentication: formData.twoFactorAuthentication,
      status: formData.disabled ? 'Disabled' : 'Enabled',
      lastUpdated: '0 d',
    };

    if (editId) {
      const index = roles.findIndex(r => r.id === editId);
      if (index !== -1) {
        roles[index] = roleData;
      }
      setToastMessage('Role updated successfully!');
    } else {
      roles.push(roleData);
      setToastMessage('Role created successfully!');
    }

    localStorage.setItem('roles', JSON.stringify(roles));
    window.dispatchEvent(new CustomEvent('roleDataChanged'));

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      const event = new CustomEvent('setActiveContent', { detail: 'role' });
      window.dispatchEvent(event);
      window.history.pushState({ activeContent: 'role' }, '', '/');
    }, 1500);
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'role' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'role' }, '', '/');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center space-x-2 text-sm">
          <button
            onClick={handleCancel}
            className="text-gray-600 hover:text-gray-900"
          >
            Role
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">{editId ? 'Edit Role' : 'New Role'}</span>
        </div>

        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {editId ? 'Edit Role' : 'New Role'}
            </h1>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              Not Saved
            </span>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
          >
            Save
          </button>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Input Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="roleName"
                  value={formData.roleName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Page
                </label>
                <input
                  type="text"
                  name="homePage"
                  value={formData.homePage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">Route: Example "/app"</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restrict To Domain
                </label>
                <input
                  type="text"
                  name="restrictToDomain"
                  value={formData.restrictToDomain}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Right Column - Checkboxes */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="disabled"
                    name="disabled"
                    checked={formData.disabled}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <label htmlFor="disabled" className="text-sm font-medium text-gray-700">
                      Disabled
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      If disabled, this role will be removed from all users.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="isCustom"
                    name="isCustom"
                    checked={formData.isCustom}
                    onChange={handleInputChange}
                    disabled={true}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded opacity-50"
                  />
                  <div className="ml-3">
                    <label htmlFor="isCustom" className="text-sm font-medium text-gray-700">
                      Is Custom
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="deskAccess"
                    name="deskAccess"
                    checked={formData.deskAccess}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <label htmlFor="deskAccess" className="text-sm font-medium text-gray-700">
                      Desk Access
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="twoFactorAuthentication"
                    name="twoFactorAuthentication"
                    checked={formData.twoFactorAuthentication}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <label htmlFor="twoFactorAuthentication" className="text-sm font-medium text-gray-700">
                      Two Factor Authentication
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

