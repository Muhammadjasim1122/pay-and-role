'use client';

import React from 'react';

export default function EmployeeLifecycle() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Employee Lifecycle Management</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Complete Employee Journey</h2>
          <p className="text-gray-600 mb-4">
            Manage every stage of the employee lifecycle from onboarding to offboarding. 
            Track career progression, performance milestones, and ensure smooth transitions 
            throughout their journey with your organization.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              <strong>Active Employees:</strong> 150 employees across 8 departments with comprehensive lifecycle tracking.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Onboarding</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Digital welcome packets</li>
              <li>• Document collection</li>
              <li>• Training assignments</li>
              <li>• Buddy system setup</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Development</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Career path planning</li>
              <li>• Skill assessments</li>
              <li>• Training programs</li>
              <li>• Mentorship programs</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Offboarding</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Exit interviews</li>
              <li>• Asset return tracking</li>
              <li>• Knowledge transfer</li>
              <li>• Final documentation</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Lifecycle Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-blue-700">New Hires</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-green-700">Promotions</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-purple-700">Transfers</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-orange-700">Departures</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Lifecycle Events</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Alex Johnson completed onboarding process</span>
              <span className="text-xs text-gray-400 ml-auto">1 day ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Maria Garcia promoted to Senior Developer</span>
              <span className="text-xs text-gray-400 ml-auto">3 days ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">David Lee transferred to Marketing Department</span>
              <span className="text-xs text-gray-400 ml-auto">1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
