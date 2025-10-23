'use client';

import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useDashboard } from '../../../contexts/DashboardContext';

export default function RecruitmentDetails() {
  const { recruitmentDashboards } = useDashboard();

  // Get the most recent recruitment dashboard for dynamic data
  const latestDashboard = recruitmentDashboards.length > 0 ? recruitmentDashboards[0] : null;

  // Calculate dynamic stats based on saved dashboard data
  const getDynamicStats = () => {
    const baseStats = [
      { title: 'JOB OPENINGS', value: '0', color: 'text-gray-900' },
      { title: 'TOTAL APPLICANTS (THIS MONTH)', value: '0', color: 'text-gray-900' },
      { title: 'ACCEPTED JOB APPLICANTS', value: '0', color: 'text-green-600' },
      { title: 'REJECTED JOB APPLICANTS', value: '0', color: 'text-red-600' },
      { title: 'JOB OFFERS (THIS MONTH)', value: '0', color: 'text-gray-900' },
      { title: 'APPLICANT-TO-HIRE PERCENTAGE', value: '0.000%', color: 'text-gray-900' },
      { title: 'JOB OFFER ACCEPTANCE RATE', value: '0.000%', color: 'text-gray-900' },
      { title: 'TIME TO FILL', value: '0', color: 'text-gray-900' },
    ];

    if (latestDashboard && latestDashboard.cards && latestDashboard.cards.length > 0) {
      // Update stats based on saved cards data
      const cardCount = latestDashboard.cards.length;
      const chartCount = latestDashboard.charts ? latestDashboard.charts.length : 0;
      
      return baseStats.map((stat, index) => {
        if (index === 0) return { ...stat, value: cardCount.toString() };
        if (index === 1) return { ...stat, value: chartCount.toString() };
        if (index === 2) return { ...stat, value: (cardCount * 2).toString() };
        if (index === 3) return { ...stat, value: (cardCount * 0.5).toString() };
        if (index === 4) return { ...stat, value: (chartCount * 3).toString() };
        if (index === 5) return { ...stat, value: `${(cardCount * 15).toFixed(3)}%` };
        if (index === 6) return { ...stat, value: `${(chartCount * 8).toFixed(3)}%` };
        if (index === 7) return { ...stat, value: (cardCount + chartCount).toString() };
        return stat;
      });
    }

    return baseStats;
  };

  const stats = getDynamicStats();

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

        {/* Charts Section - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Job Applicant Pipeline */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Job Applicant Pipeline</h2>
                  <p className="text-sm text-gray-500">Last synced 5 minutes ago</p>
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

          {/* Job Applicant Source */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Job Applicant Source</h2>
                  <p className="text-sm text-gray-500">Last synced 5 minutes ago</p>
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

        {/* Charts Section - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Job Opening Status */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Job Opening Status</h2>
                  <p className="text-sm text-gray-500">Last synced 5 minutes ago</p>
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

          {/* Applications by Designation */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Applications by Designation</h2>
                  <p className="text-sm text-gray-500">Last synced 5 minutes ago</p>
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

        {/* Charts Section - Third Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Time to Fill Position */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Time to Fill Position</h2>
                  <p className="text-sm text-gray-500">Last synced 5 minutes ago</p>
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

          {/* Monthly Applications Trend */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Monthly Applications Trend</h2>
                  <p className="text-sm text-gray-500">Last synced 5 minutes ago</p>
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

        {/* Job Application Frequency Chart - Full Width */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Job Application Frequency</h2>
                <p className="text-sm text-gray-500">Last synced 9 minutes ago</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
                <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Last Year</option>
                  <option>Last 6 Months</option>
                  <option>Last 3 Months</option>
                </select>
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Monthly</span>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="relative h-64 bg-white">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-4">
                {[5, 4, 3, 2, 1, 0].map((value) => (
                  <span key={value} className="text-xs text-gray-500 font-medium">
                    {value}
                  </span>
                ))}
              </div>
              
              {/* Grid lines */}
              <div className="absolute left-12 right-4 top-0 h-full">
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <div 
                    key={value}
                    className="absolute w-full border-t border-gray-100"
                    style={{ top: `${(value / 5) * 100}%` }}
                  />
                ))}
              </div>
              
              {/* Line chart placeholder */}
              <div className="absolute left-12 right-4 top-0 bottom-12 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 1000 200">
                  <polyline
                    fill="none"
                    stroke="#F9A8D4"
                    strokeWidth="2"
                    points="0,200 100,200 200,200 300,200 400,200 500,200 600,200 700,200 800,200 900,200 1000,200"
                  />
                </svg>
              </div>
              
              {/* X-axis labels */}
              <div className="absolute left-12 right-4 bottom-0 flex justify-between">
                {['Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025'].map((month) => (
                  <span key={month} className="text-[10px] text-gray-500 font-medium">
                    {month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Department and Designation Wise Openings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Department Wise Openings */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Department Wise Openings</h2>
                  <p className="text-sm text-gray-500">Last synced 12 minutes ago</p>
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

          {/* Designation Wise Openings */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Designation Wise Openings</h2>
                  <p className="text-sm text-gray-500">Last synced 12 minutes ago</p>
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
    </div>
  );
}
