'use client';

import React, { useState } from 'react';
import {
  UserPlus,
  Paperclip,
  Share2,
  Heart,
  MessageCircle,
  Plus
} from 'lucide-react';

export default function HRSettingsSidebar({ isOpen, setIsOpen, setActiveContent }) {
  return (
    <aside className={`h-full overflow-y-auto transform transition-all duration-200 ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'}`}>
      <div className="px-1 py-5">
        {/* Assigned To Section */}
        <div className="mb-0">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
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
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <Paperclip className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Attachments</span>
            </div>
            <Plus className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Share Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <UserPlus className="h-5 w-5 text-gray-600" />
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
