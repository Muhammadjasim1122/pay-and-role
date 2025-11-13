'use client';

import React, { useState } from 'react';
import {
  UserPlus,
  Paperclip,
  Share2,
  Heart,
  MessageCircle,
  Plus,
  Upload,
  X,
  FileImage
} from 'lucide-react';

export default function HRSettingsSidebar({ isOpen, setIsOpen, setActiveContent }) {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const [attachments, setAttachments] = useState([]);
  
  // Listen for profile photo updates from upload dialog
  React.useEffect(() => {
    const handlePhotoUpdate = (event) => {
      if (event.detail && event.detail.photo) {
        setProfilePhoto(event.detail.photo);
      }
    };

    const handleAttachmentAdded = (event) => {
      if (event.detail && event.detail.files) {
        setAttachments(prev => [...prev, ...event.detail.files]);
      }
    };

    const handleAttachmentDeleted = (event) => {
      if (event.detail && event.detail.index !== undefined) {
        setAttachments(prev => prev.filter((_, i) => i !== event.detail.index));
      }
    };

    window.addEventListener('updateProfilePhoto', handlePhotoUpdate);
    window.addEventListener('attachmentAdded', handleAttachmentAdded);
    window.addEventListener('deleteAttachment', handleAttachmentDeleted);

    return () => {
      window.removeEventListener('updateProfilePhoto', handlePhotoUpdate);
      window.removeEventListener('attachmentAdded', handleAttachmentAdded);
      window.removeEventListener('deleteAttachment', handleAttachmentDeleted);
    };
  }, []);
  
  // Handle photo upload - opens the upload dialog
  const handlePhotoUploadClick = () => {
    setShowPhotoMenu(false);
    
    // Try direct function call first
    if (typeof window.openUploadDialog === 'function') {
      window.openUploadDialog();
    } else {
      // Dispatch custom event as fallback
      const event = new CustomEvent('openUploadDialog', { bubbles: true });
      window.dispatchEvent(event);
      
      // Also try again after a short delay in case the component is still mounting
      setTimeout(() => {
        if (typeof window.openUploadDialog === 'function') {
          window.openUploadDialog();
        }
      }, 100);
    }
  };
  
  // Handle photo remove
  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    setShowPhotoMenu(false);
  };

  // Handle attachment remove - dispatch event to show confirmation dialog
  const handleRemoveAttachment = (index) => {
    window.dispatchEvent(new CustomEvent('showDeleteAttachmentConfirm', {
      detail: { index },
      bubbles: true
    }));
  };
  
  const handleAssignedToClick = () => {
    // Call global function to open the ToDo dialog
    if (typeof window.openToDoDialog === 'function') {
      window.openToDoDialog();
    } else {
      // Fallback to custom event
      window.dispatchEvent(new CustomEvent('openToDoDialog'));
    }
  };

  const handleAttachmentsClick = () => {
    // Try direct function call first
    if (typeof window.openUploadDialog === 'function') {
      window.openUploadDialog();
    } else {
      // Dispatch custom event as fallback
      const event = new CustomEvent('openUploadDialog', { bubbles: true });
      window.dispatchEvent(event);
      
      // Also try again after a short delay in case the component is still mounting
      setTimeout(() => {
        if (typeof window.openUploadDialog === 'function') {
          window.openUploadDialog();
        }
      }, 100);
    }
  };

  const handleShareClick = () => {
    // Try direct function call first
    if (typeof window.openShareDialog === 'function') {
      window.openShareDialog();
    } else {
      // Dispatch custom event as fallback
      const event = new CustomEvent('openShareDialog', { bubbles: true });
      window.dispatchEvent(event);
      
      // Also try again after a short delay in case the component is still mounting
      setTimeout(() => {
        if (typeof window.openShareDialog === 'function') {
          window.openShareDialog();
        }
      }, 100);
    }
  };

  return (
    <aside className={`h-full overflow-y-auto transform transition-all duration-200 ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'}`}>
      <div className="px-1 py-5">
        {/* Photo Upload Box - Only for employee page */}
        {window.location.pathname.includes('employee') && (
          <div className="mb-2 px-7">
            <div className="rounded-lg p-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
              {/* Photo Display Area with Dropdown */}
              <div className="relative w-full">
                <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  {profilePhoto ? (
                    <img 
                      src={profilePhoto} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-7xl text-gray-400 font-light">mj</span>
                    </div>
                  )}
                </div>
                
                {/* Change Button - Centered on Image */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <button
                      onClick={() => setShowPhotoMenu(!showPhotoMenu)}
                      className="px-4 py-2  text-white text-sm font-medium   transition-colors flex items-center space-x-1"
                    >
                      <span>Change</span>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {showPhotoMenu && (
                      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-40 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                        <button
                          onClick={handlePhotoUploadClick}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                        >
                          Upload
                        </button>
                        <button
                          onClick={handleRemovePhoto}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Assigned To Section */}
        <div className="mb-0">
          <div 
            onClick={handleAssignedToClick}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <UserPlus className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Assigned To</span>
            </div>
            <Plus className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Attachments Section */}
        <div className="mb-0">
          <div 
            onClick={handleAttachmentsClick}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <Paperclip className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Attachments</span>
            </div>
            <Plus className="h-4 w-4 text-gray-400" />
          </div>
          
          {/* Display attached files */}
          {attachments.length > 0 && (
            <div className="mt-2 pl-10 space-y-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between px-3 py-2 bg-white rounded border border-gray-200">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <FileImage className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 truncate">{file.name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveAttachment(index);
                    }}
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Share Section */}
        <div className="mb-6">
          <div 
            onClick={handleShareClick}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Share2 className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Share</span>
            </div>
            <Plus className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Border Separator */}
        <div className="border-t border-gray-200"></div>

        {/* Likes and Comments Section */}
        <div className="pt-4 pl-2 ">
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">0</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">0</span>
            </div>
            <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              FOLLOW
            </button>
          </div>
        </div>

        {/* Activity Log Section */}
        <div className="space-y-2 text-xs text-gray-500 pl-2">
          <p>Administrator last edited this · 6 days ago</p>
          <p>Administrator created this.</p>
        </div>
      </div>
    </aside>
  );
}
