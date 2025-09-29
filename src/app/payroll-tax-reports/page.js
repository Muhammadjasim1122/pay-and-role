'use client';

import React from 'react';

export default function PayrollTaxReports() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Payroll Tax & Reports</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Compliance & Reporting</h2>
          <p className="text-gray-600 mb-4">
            Ensure tax compliance with automated tax calculations, reporting, and filing. 
            Generate comprehensive reports for management, government agencies, and 
            financial audits with our robust reporting system.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">
              <strong>Tax Filing:</strong> Q4 tax reports due January 31st - 95% complete.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Tax Management</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Federal tax calculations</li>
              <li>• State tax compliance</li>
              <li>• Social Security & Medicare</li>
              <li>• Unemployment taxes</li>
              <li>• Workers' compensation</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Report Types</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Payroll summaries</li>
              <li>• Tax liability reports</li>
              <li>• Employee earnings</li>
              <li>• Departmental reports</li>
              <li>• Custom analytics</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tax Compliance Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">95%</div>
              <div className="text-sm text-green-700">Q4 Complete</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$35K</div>
              <div className="text-sm text-blue-700">Tax Liability</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-purple-700">Reports Generated</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-orange-700">Pending Filing</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Tax Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Federal tax deposit submitted</span>
              <span className="text-xs text-gray-400 ml-auto">1 hour ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">State tax report generated</span>
              <span className="text-xs text-gray-400 ml-auto">3 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">W-2 forms prepared for distribution</span>
              <span className="text-xs text-gray-400 ml-auto">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
