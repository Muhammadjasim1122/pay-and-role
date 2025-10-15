'use client';

import React, { useState } from 'react';
import { Menu as MenuIcon } from 'lucide-react'; // ✅ FIXED: Added import

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // ✅ You’re using setIsOpen below, so define it here

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  return (
    <header className="  sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center h-14">
          
          {/* Left side - Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center bg-green-500 rounded-md">
              <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.8571 0H9.14286C4.0934 0 0 4.0934 0 9.14286V22.8571C0 27.9066 4.0934 32 9.14286 32H22.8571C27.9066 32 32 27.9066 32 22.8571V9.14286C32 4.0934 27.9066 0 22.8571 0Z" fill="#06B58B"></path>
                <path d="M9.70274 25.1431L8.15991 23.4517C10.3199 21.4974 13.097 20.4116 15.9885 20.4116C18.8799 20.4116 21.6685 21.4859 23.8171 23.4517L22.2742 25.1431C20.537 23.5659 18.3085 22.6973 15.9885 22.6973C13.6685 22.6973 11.4285 23.5659 9.69137 25.1431H9.70274Z" fill="white"></path>
                <path d="M17.0514 6.85742H10.3542V9.14314H17.0514C18.3086 9.14314 19.3372 10.1717 19.3372 11.4289V13.5545C19.3372 14.8117 18.3086 15.8403 17.0514 15.8403H14.9257C13.6685 15.8403 12.64 14.8117 12.64 13.5545V12.1145H10.3542V13.5545C10.3542 16.0803 12.4 18.126 14.9257 18.126H17.0514C19.5772 18.126 21.6229 16.0803 21.6229 13.5545V11.4289C21.6229 8.90314 19.5772 6.85742 17.0514 6.85742Z" fill="white"></path>
              </svg>
            </div>
          </div>

          {/* Center - Search Bar */}
          

          {/* Right side - Notifications, Help, User Avatar */}
          <div className="flex items-center space-x-4">

          <div className="flex-1     max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative ">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-[300px] pl-10 pr-4 py-1 bg-gray-100 border border-transparent rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Search or type a command (Ctrl + G)"
              />
            </form>
          </div>
            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-5 w-5 fill-current">
                <path d="M320 64C306.7 64 296 74.7 296 88L296 97.7C214.6 109.3 152 179.4 152 264L152 278.5C152 316.2 142 353.2 123 385.8L101.1 423.2C97.8 429 96 435.5 96 442.2C96 463.1 112.9 480 133.8 480L506.2 480C527.1 480 544 463.1 544 442.2C544 435.5 542.2 428.9 538.9 423.2L517 385.7C498 353.1 488 316.1 488 278.4L488 263.9C488 179.3 425.4 109.2 344 97.6L344 87.9C344 74.6 333.3 63.9 320 63.9zM488.4 432L151.5 432L164.4 409.9C187.7 370 200 324.6 200 278.5L200 264C200 197.7 253.7 144 320 144C386.3 144 440 197.7 440 264L440 278.5C440 324.7 45 252.1 528z"/>
              </svg>
            </button>

            {/* Divider */}
            <div className="h-4 w-px bg-gray-300"></div>

            {/* Help Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowHelpDropdown(!showHelpDropdown)}
                className="flex items-center space-x-1 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium">Help</span>
                <svg className={`h-4 w-4 transition-transform ${showHelpDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Help Dropdown Menu */}
              {showHelpDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Documentation</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Support</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Community</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact Us</a>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-700">mj</span>
            </div>
          </div>
        </div>
      </div>
       <div className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3  ">
            <button
              onClick={() => setIsOpen(v => !v)}
              className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-700"
              title="Toggle Sidebar"
              aria-label="Toggle Sidebar"
            >
              <MenuIcon className="h-5 w-5" />
              </button>
            <h1 className="text-xl font-bold text-gray-900">Payables</h1>
            </div>
    </header>
  );
}
