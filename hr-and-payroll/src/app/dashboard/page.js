'use client';

import React from 'react';
import Layout from '../../components/layout/Layout';

export default function DashboardPage() {
  return (
    <Layout>
      <div id="page-content" className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Frappe HR dashboard!</p>
        
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900">Employees</h3>
              <p className="text-sm text-gray-600 mt-1">Manage your team</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900">Payroll</h3>
              <p className="text-sm text-gray-600 mt-1">Process payments</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900">Reports</h3>
              <p className="text-sm text-gray-600 mt-1">View analytics</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
