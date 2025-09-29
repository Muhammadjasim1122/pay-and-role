'use client';

import React from 'react';

export default function ExpenseManagement() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Expense Management</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Track Business Expenses</h2>
          <p className="text-gray-600 mb-4">
            Streamline expense reporting and reimbursement processes with automated workflows, 
            receipt management, and policy compliance tracking. Ensure accurate financial 
            reporting and timely reimbursements.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              <strong>Monthly Expenses:</strong> $45,230 processed this month with 95% approval rate.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Expense Categories</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Travel & transportation</li>
              <li>• Meals & entertainment</li>
              <li>• Office supplies</li>
              <li>• Training & development</li>
              <li>• Client meetings</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Approval Workflow</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Automated policy checks</li>
              <li>• Manager approval routing</li>
              <li>• Receipt verification</li>
              <li>• Budget impact analysis</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Expense Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$45K</div>
              <div className="text-sm text-blue-700">This Month</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">95%</div>
              <div className="text-sm text-green-700">Approval Rate</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-orange-700">Pending</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">3.2</div>
              <div className="text-sm text-purple-700">Avg Days</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Expense Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">John submitted $250 travel expense</span>
              <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Sarah's $180 meal expense approved</span>
              <span className="text-xs text-gray-400 ml-auto">4 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Mike's $320 training expense requires receipt</span>
              <span className="text-xs text-gray-400 ml-auto">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
