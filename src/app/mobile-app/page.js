'use client';

import React from 'react';

export default function MobileApp() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Mobile App</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">HR on the Go</h2>
          <p className="text-gray-600 mb-4">
            Access your HR system anywhere, anytime with our comprehensive mobile application. 
            Employees and managers can manage their HR tasks, view information, and stay 
            connected with the organization from their mobile devices.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Mobile Users:</strong> 120 employees actively using the mobile app with 4.8-star rating.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Employee Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Clock in/out functionality</li>
              <li>• Leave request submission</li>
              <li>• Expense reporting</li>
              <li>• Pay stub access</li>
              <li>• Company directory</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Manager Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Team attendance overview</li>
              <li>• Leave approval workflow</li>
              <li>• Performance reviews</li>
              <li>• Expense approvals</li>
              <li>• Push notifications</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">App Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">120</div>
              <div className="text-sm text-blue-700">Active Users</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">4.8</div>
              <div className="text-sm text-green-700">App Rating</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">85%</div>
              <div className="text-sm text-purple-700">Daily Usage</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">iOS/Android</div>
              <div className="text-sm text-orange-700">Platforms</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Download Links</h3>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              <span>📱</span>
              Download for iOS
            </button>
            <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              <span>🤖</span>
              Download for Android
            </button>
          </div>
          <p className="text-gray-600 mt-4">
            Scan the QR code with your mobile device to download the app directly.
          </p>
        </div>
      </div>
    </div>
  );
}
