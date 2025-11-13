'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  MoreVertical,
  UserPlus,
  Paperclip,
  Tag,
  Share2,
  Heart,
  MessageCircle,
  Shield,
  Lock,
  Mail
} from 'lucide-react';

export default function UserSettings() {
  const [activeTab, setActiveTab] = useState('user-details');
  const [formData, setFormData] = useState({
    enabled: true,
    email: 'sobanhameed862@gmail.com',
    firstName: 'soban',
    middleName: '',
    lastName: 'hameed',
    fullName: 'soban hameed',
    username: 'soban',
    language: 'English',
    timeZone: 'Asia/Karachi',
    // More Information
    gender: '',
    dateOfBirth: '',
    interests: '',
    phone: '',
    location: '',
    bio: '',
    mobileNo: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  // Load saved user settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setFormData(JSON.parse(savedSettings));
    }
    const savedComments = localStorage.getItem('userSettingsComments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('userSettings', JSON.stringify(formData));
    
    // Show success toast like other forms
    setToastMessage('User settings updated successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'user-profile' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'user-profile' }, '', '/');
  };

  const handleAddComment = () => {
    const text = commentText.trim();
    if (!text) return;
    const newComment = {
      id: Date.now(),
      text,
      user: 'sh',
      createdAt: new Date().toISOString(),
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem('userSettingsComments', JSON.stringify(updated));
    setCommentText('');
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-900">soban hameed</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
          
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-1">
              <Lock className="h-4 w-4" />
              <span>Password</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>Create User Email</span>
            </button>
            <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              <ChevronRight className="h-5 w-5" />
            </button>
            <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              <Printer className="h-5 w-5" />
            </button>
            <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pl-6 pr-6 ">
          {/* Tabs */}
          <div className="bg-white border-b border-gray-200 px-6">
            <nav className="flex space-x-8">
              {[
                { id: 'user-details', label: 'User Details' },
                { id: 'more-information', label: 'More Information' }
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

          {/* Toast (top right, same as previous forms) */}
          {showToast && (
            <div className="fixed top-4 right-4 z-50 animate-in fade-in-0 slide-in-from-top-2">
              <div className="bg-white rounded-lg shadow-lg border border-green-200 px-4 py-3 pr-8 flex items-center gap-3 min-w-[300px]">
                <svg className="h-5 w-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-green-800">{toastMessage}</span>
                <button onClick={() => setShowToast(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Form Content - attached to tabs header (no gap) with side padding */}
          <div className=" pt-0 pb-6">
            <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg rounded-t-none">
              {activeTab === 'user-details' && (
                <div className="p-6 space-y-6">
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
                    <div className="grid grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
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
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            Language
                          </label>
                          <input
                            type="text"
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Time Zone
                          </label>
                          <input
                            type="text"
                            name="timeZone"
                            value={formData.timeZone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="pt-6 border-top border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Comments</h3>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-medium">sh</div>
                      <input
                        type="text"
                        value={commentText || ''}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(); }}
                        placeholder="Type a reply / comment"
                        className="w-full px-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleAddComment}
                        disabled={!commentText.trim()}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${commentText.trim() ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                      >
                        Comment
                      </button>
                    </div>

                    {/* Activity Feed */}
                    {comments.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <h4 className="text-sm font-medium text-gray-700">Activity</h4>
                        <div className="space-y-3">
                          {comments.map((c) => (
                            <div key={c.id} className="flex items-start space-x-3">
                              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-medium">{c.user}</div>
                              <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full">
                                <div className="text-sm text-gray-900">{c.text}</div>
                                <div className="text-[11px] text-gray-500 mt-1">{new Date(c.createdAt).toLocaleString()}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Footer Actions */}
                  <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}

              {/* Roles & Permissions removed */}

              {activeTab === 'more-information' && (
                <div className="p-6 space-y-6">
                  <div>
                    <div className="grid grid-cols-3 gap-6">
                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <input
                          type="text"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      {/* Mobile No */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile No</label>
                        <input
                          type="text"
                          name="mobileNo"
                          value={formData.mobileNo}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Birth Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Birth Date</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      {/* Location */}
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Interests */}
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                        <textarea
                          name="interests"
                          rows={8}
                          value={formData.interests}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Bio */}
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        <textarea
                          name="bio"
                          rows={8}
                          value={formData.bio}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Comments - same as User Details */}
                  <div className="pt-6 border-top border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Comments</h3>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-medium">sh</div>
                      <input
                        type="text"
                        value={commentText || ''}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(); }}
                        placeholder="Type a reply / comment"
                        className="w-full px-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleAddComment}
                        disabled={!commentText.trim()}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${commentText.trim() ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                      >
                        Comment
                      </button>
                    </div>

                    {comments.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <h4 className="text-sm font-medium text-gray-700">Activity</h4>
                        <div className="space-y-3">
                          {comments.map((c) => (
                            <div key={c.id} className="flex items-start space-x-3">
                              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-medium">{c.user}</div>
                              <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full">
                                <div className="text-sm text-gray-900">{c.text}</div>
                                <div className="text-[11px] text-gray-500 mt-1">{new Date(c.createdAt).toLocaleString()}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Settings and Connections removed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

