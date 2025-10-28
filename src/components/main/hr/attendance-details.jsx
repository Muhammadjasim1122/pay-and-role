'use client';

import React, { useEffect, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useDashboard } from '../../../contexts/DashboardContext';

export default function AttendanceDetails() {
  const { attendanceDashboards } = useDashboard();

  // Stats derived from attendance list data in localStorage
  const [stats, setStats] = useState([
    { title: 'TOTAL PRESENT (THIS MONTH)', value: '0', color: 'text-green-600' },
    { title: 'TOTAL ABSENT (THIS MONTH)', value: '0', color: 'text-red-600' },
    { title: 'LATE ENTRY (THIS MONTH)', value: '0', color: 'text-red-600' },
    { title: 'EARLY EXIT (THIS MONTH)', value: '0', color: 'text-red-600' },
  ]);

  const isInCurrentMonth = (isoDateString) => {
    if (!isoDateString) return false;
    const d = new Date(isoDateString);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  };

  const recomputeStats = () => {
    // Fallback to dashboard context only if there is no attendance data at all
    const saved = typeof window !== 'undefined' ? localStorage.getItem('attendances') : null;
    const attendances = saved ? JSON.parse(saved) : [];

    if (attendances.length === 0) {
      // Keep zeros when no attendance data; do not rely on dashboard cards for counts
      setStats((prev) => prev.map((s) => ({ ...s, value: '0' })));
      return;
    }

    const thisMonth = attendances.filter((a) => isInCurrentMonth(a.attendanceDate));
    const present = thisMonth.filter((a) => (a.status || '').toLowerCase() === 'present').length;
    const absent = thisMonth.filter((a) => (a.status || '').toLowerCase() === 'absent').length;
    const late = thisMonth.filter((a) => a.lateEntry === true || (a.status || '').toLowerCase() === 'late').length;
    const early = thisMonth.filter((a) => a.earlyExit === true).length;

    setStats([
      { title: 'TOTAL PRESENT (THIS MONTH)', value: String(present), color: 'text-green-600' },
      { title: 'TOTAL ABSENT (THIS MONTH)', value: String(absent), color: 'text-red-600' },
      { title: 'LATE ENTRY (THIS MONTH)', value: String(late), color: 'text-red-600' },
      { title: 'EARLY EXIT (THIS MONTH)', value: String(early), color: 'text-red-600' },
    ]);
  };

  useEffect(() => {
    // Initial calculation
    recomputeStats();

    // Recompute when other tabs/windows modify localStorage
    const handleStorage = (e) => {
      if (e.key === 'attendances') {
        recomputeStats();
      }
    };
    window.addEventListener('storage', handleStorage);

    // Listen to custom events fired by list/form pages after changes
    const handleCustom = () => recomputeStats();
    window.addEventListener('attendanceDataChanged', handleCustom);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('attendanceDataChanged', handleCustom);
    };
  }, [attendanceDashboards]);

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

        {/* Attendance Count Section */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Attendance Count</h2>
                <p className="text-sm text-gray-500">Last synced 19 minutes ago</p>
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
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                </div>
                <div className="mt-4 text-gray-500 text-sm">Loading...</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Timesheet Activity Breakup */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Timesheet Activity Breakup</h2>
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

          {/* Shift Assignment Breakup */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm text-gray-900">Shift Assignment Breakup</h2>
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

        {/* Department wise Timesheet Hours */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Department wise Timesheet Hours</h2>
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
  );
}
