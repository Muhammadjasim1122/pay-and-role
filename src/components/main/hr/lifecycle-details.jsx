'use client';

import React, { useState, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useDashboard } from '../../../contexts/DashboardContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LifecycleDetails() {
  const { lifecycleDashboards } = useDashboard();
  const [stats, setStats] = useState([
    { title: 'ONBOARDINGS (THIS MONTH)', value: '0', color: 'text-gray-900' },
    { title: 'SEPARATIONS (THIS MONTH)', value: '0', color: 'text-gray-900' },
    { title: 'PROMOTIONS (THIS MONTH)', value: '0', color: 'text-gray-900' },
    { title: 'TRANSFERS (THIS MONTH)', value: '0', color: 'text-gray-900' },
    { title: 'TRAININGS (THIS MONTH)', value: '0', color: 'text-gray-900' },
  ]);

  // Calculate stats from localStorage data
  useEffect(() => {
    const calculateStats = () => {
      if (typeof window === 'undefined') return;

      const onboardings = JSON.parse(localStorage.getItem('employeeOnboardings') || '[]');
      const separations = JSON.parse(localStorage.getItem('employeeSeparations') || '[]');
      const grievances = JSON.parse(localStorage.getItem('employeeGrievances') || '[]');

      // Get current month and year
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      // Filter data for this month
      const thisMonthOnboardings = onboardings.filter(item => {
        if (!item.dateOfJoining && !item.date && !item.onboardingBeginsOn) return false;
        const date = new Date(item.onboardingBeginsOn || item.dateOfJoining || item.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });

      const thisMonthSeparations = separations.filter(item => {
        if (!item.dateOfSeparation && !item.date && !item.separationBeginsOn) return false;
        const date = new Date(item.separationBeginsOn || item.dateOfSeparation || item.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });

      const thisMonthGrievances = grievances.filter(item => {
        if (!item.date) return false;
        const date = new Date(item.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });

      // Calculate promotions, transfers, trainings from grievances
      const thisMonthPromotions = thisMonthGrievances.filter(g => 
        g.grievanceType && g.grievanceType.toLowerCase().includes('promotion')
      ).length;
      
      const thisMonthTransfers = thisMonthGrievances.filter(g => 
        g.grievanceType && g.grievanceType.toLowerCase().includes('transfer')
      ).length;
      
      const thisMonthTrainings = thisMonthGrievances.filter(g => 
        g.grievanceType && g.grievanceType.toLowerCase().includes('training')
      ).length;

      setStats([
        { title: 'ONBOARDINGS (THIS MONTH)', value: thisMonthOnboardings.length.toString(), color: 'text-gray-900' },
        { title: 'SEPARATIONS (THIS MONTH)', value: thisMonthSeparations.length.toString(), color: 'text-gray-900' },
        { title: 'PROMOTIONS (THIS MONTH)', value: thisMonthPromotions.toString(), color: 'text-gray-900' },
        { title: 'TRANSFERS (THIS MONTH)', value: thisMonthTransfers.toString(), color: 'text-gray-900' },
        { title: 'TRAININGS (THIS MONTH)', value: thisMonthTrainings.toString(), color: 'text-gray-900' },
      ]);
    };

    calculateStats();

    // Listen for data changes
    const handleStorageChange = () => calculateStats();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('onboardingDataChanged', handleStorageChange);
    window.addEventListener('separationDataChanged', handleStorageChange);
    window.addEventListener('grievanceDataChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('onboardingDataChanged', handleStorageChange);
      window.removeEventListener('separationDataChanged', handleStorageChange);
      window.removeEventListener('grievanceDataChanged', handleStorageChange);
    };
  }, []);

  // Chart data for Y-O-Y charts
  const transfersData = [
    { year: '2024', transfers: 0 },
    { year: '2025', transfers: 0 }
  ];

  const promotionsData = [
    { year: '2024', promotions: 0 },
    { year: '2025', promotions: 0 }
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {stat.title}
                </h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <div className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Grievance Type */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Grievance Type</h2>
                  <p className="text-sm text-gray-500">Last synced 13 minutes ago</p>
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

          {/* Training Type */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Training Type</h2>
                  <p className="text-sm text-gray-500">Last synced 13 minutes ago</p>
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

        {/* Y-O-Y Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Y-O-Y Transfers */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Y-O-Y Transfers</h2>
                  <p className="text-sm text-gray-500">Last synced 19 minutes ago</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                  <select className="px-2 py-1 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Last Year</option>
                    <option>This Year</option>
                    <option>All Time</option>
                  </select>
                  <select className="px-2 py-1 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Yearly</option>
                    <option>Monthly</option>
                    <option>Weekly</option>
                  </select>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={transfersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      domain={[0, 5]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="transfers" 
                      stroke="#ec4899" 
                      strokeWidth={3}
                      dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#ec4899', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Y-O-Y Promotions */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Y-O-Y Promotions</h2>
                  <p className="text-sm text-gray-500">Last synced 19 minutes ago</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                  <select className="px-2 py-1 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Last Year</option>
                    <option>This Year</option>
                    <option>All Time</option>
                  </select>
                  <select className="px-2 py-1 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Yearly</option>
                    <option>Monthly</option>
                    <option>Weekly</option>
                  </select>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={promotionsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      domain={[0, 5]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="promotions" 
                      stroke="#ec4899" 
                      strokeWidth={3}
                      dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#ec4899', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
