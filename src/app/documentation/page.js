'use client';

import React from 'react';

export default function Documentation() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Documentation</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Getting Started</h2>
          <p className="text-gray-600 mb-4">
            Welcome to Frappe HR documentation! This comprehensive guide will help you 
            get started with our HR management platform and make the most of its features.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Quick Start:</strong> Follow our step-by-step setup guide to get 
              your HR system up and running in minutes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Setup & Configuration</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Initial system setup</li>
              <li>• User account creation</li>
              <li>• Company profile configuration</li>
              <li>• Department and role setup</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">User Management</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Adding new employees</li>
              <li>• Managing user permissions</li>
              <li>• Employee profiles</li>
              <li>• Bulk import/export</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">API Documentation</h3>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-800">
              GET /api/employees<br/>
              POST /api/employees<br/>
              PUT /api/employees/&#123;id&#125;<br/>
              DELETE /api/employees/&#123;id&#125;
            </code>
          </div>
          <p className="text-gray-600">
            Our RESTful API allows you to integrate Frappe HR with your existing systems. 
            All API endpoints are documented with examples and response formats.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Support Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-green-700">Support</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">100+</div>
              <div className="text-sm text-blue-700">Guides</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">Live</div>
              <div className="text-sm text-purple-700">Chat</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
