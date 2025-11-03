'use client';

import React, { useEffect, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ExpenseClaimsDetails() {
  const [stats, setStats] = useState([
    { title: 'EXPENSE CLAIMS (THIS MONTH)', value: 0, color: 'text-gray-900' },
    { title: 'APPROVED CLAIMS (THIS MONTH)', value: 0, color: 'text-green-600' },
    { title: 'REJECTED CLAIMS (THIS MONTH)', value: 0, color: 'text-red-600' },
    { title: 'EMPLOYEE ADVANCES (THIS MONTH)', value: 0, color: 'text-blue-600' },
  ]);

  const isInCurrentMonth = (dateString) => {
    if (!dateString) return false;
    try {
      const d = new Date(dateString);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    } catch {
      return false;
    }
  };

  const recomputeStats = () => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('expenseClaims') : null;
    const expenseClaims = saved ? JSON.parse(saved) : [];

    const employeeAdvancesSaved = typeof window !== 'undefined' ? localStorage.getItem('employeeAdvances') : null;
    const employeeAdvances = employeeAdvancesSaved ? JSON.parse(employeeAdvancesSaved) : [];

    const thisMonthClaims = expenseClaims.filter((claim) => isInCurrentMonth(claim.postingDate));
    const approved = thisMonthClaims.filter((claim) => (claim.status || '').toLowerCase() === 'approved').length;
    const rejected = thisMonthClaims.filter((claim) => (claim.status || '').toLowerCase() === 'rejected').length;

    const thisMonthAdvances = employeeAdvances.filter((advance) => isInCurrentMonth(advance.date));

    setStats([
      { title: 'EXPENSE CLAIMS (THIS MONTH)', value: thisMonthClaims.length, color: 'text-gray-900' },
      { title: 'APPROVED CLAIMS (THIS MONTH)', value: approved, color: 'text-green-600' },
      { title: 'REJECTED CLAIMS (THIS MONTH)', value: rejected, color: 'text-red-600' },
      { title: 'EMPLOYEE ADVANCES (THIS MONTH)', value: thisMonthAdvances.length, color: 'text-blue-600' },
    ]);
  };

  useEffect(() => {
    // Initial calculation
    recomputeStats();

    // Recompute when other tabs/windows modify localStorage
    const handleStorage = (e) => {
      if (e.key === 'expenseClaims' || e.key === 'employeeAdvances') {
        recomputeStats();
      }
    };
    window.addEventListener('storage', handleStorage);

    // Listen to custom events fired by list/form pages after changes
    const handleExpenseClaimChanged = () => recomputeStats();
    const handleEmployeeAdvanceChanged = () => recomputeStats();
    window.addEventListener('expenseClaimDataChanged', handleExpenseClaimChanged);
    window.addEventListener('employeeAdvanceDataChanged', handleEmployeeAdvanceChanged);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('expenseClaimDataChanged', handleExpenseClaimChanged);
      window.removeEventListener('employeeAdvanceDataChanged', handleEmployeeAdvanceChanged);
    };
  }, []);

  // Sample data for the line chart (flat line at 0)
  const chartData = [
    { month: 'Oct 2024', value: 0 },
    { month: 'Nov 2024', value: 0 },
    { month: 'Dec 2024', value: 0 },
    { month: 'Jan 2025', value: 0 },
    { month: 'Feb 2025', value: 0 },
    { month: 'Mar 2025', value: 0 },
    { month: 'Apr 2025', value: 0 },
    { month: 'May 2025', value: 0 },
    { month: 'Jun 2025', value: 0 },
    { month: 'Jul 2025', value: 0 },
    { month: 'Aug 2025', value: 0 },
    { month: 'Sep 2025', value: 0 },
    { month: 'Oct 2025', value: 0 },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm text-gray-900 uppercase">{stat.title}</h2>
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Expense Claims Chart */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Expense Claims</h2>
                <p className="text-sm text-gray-500">Last synced 34 minutes ago</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
                <select className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white">
                  <option>Last Year</option>
                </select>
                <select className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white">
                  <option>Monthly</option>
                </select>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#666"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#666"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 5]}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value, name) => [`Rs ${value.toFixed(2)}`, 'Expense Claims']}
                    labelFormatter={(label) => label}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Claims by Type */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Claims by Type</h2>
                  <p className="text-sm text-gray-500">Last synced 44 minutes ago</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center h-48">
                <span className="text-gray-500">No Data</span>
              </div>
            </div>
          </div>

          {/* Employee Advance Status */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Employee Advance Status</h2>
                  <p className="text-sm text-gray-500">Last synced 44 minutes ago</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center h-48">
                <span className="text-gray-500">No Data</span>
              </div>
            </div>
          </div>
        </div>

        {/* Department wise Expense Claims */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Department wise Expense Claims</h2>
                <p className="text-sm text-gray-500">Last synced 44 minutes ago</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center h-48">
              <span className="text-gray-500">No Data</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}