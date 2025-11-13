'use client';

import React, { useMemo } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRecruitment } from '../../../contexts/RecruitmentContext';

export default function RecruitmentDetails() {
  const { jobOpenings, jobApplicants, jobOffers } = useRecruitment();

  // Calculate application frequency data for the chart
  const chartData = useMemo(() => {
    const months = [];
    const last12Months = [];
    
    // Generate last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      last12Months.push(monthName);
    }
    
    // Count applications per month
    last12Months.forEach(month => {
      const count = jobApplicants.filter(applicant => {
        const applicantDate = new Date(applicant.date);
        const applicantMonth = applicantDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        return applicantMonth === month;
      }).length;
      
      months.push({ month, applications: count });
    });
    
    return months;
  }, [jobApplicants]);

  // Calculate dynamic stats from actual recruitment data
  const stats = useMemo(() => {
    const totalJobOpenings = jobOpenings.length;
    const activeJobOpenings = jobOpenings.filter(job => job.status === 'Active').length;
    
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    const thisMonthApplicants = jobApplicants.filter(applicant => {
      const applicantDate = new Date(applicant.date);
      return applicantDate.getMonth() === thisMonth && applicantDate.getFullYear() === thisYear;
    }).length;
    
    const acceptedApplicants = jobApplicants.filter(applicant => applicant.status === 'Hired').length;
    const rejectedApplicants = jobApplicants.filter(applicant => applicant.status === 'Rejected').length;
    
    const thisMonthOffers = jobOffers.filter(offer => {
      const offerDate = new Date(offer.offerDate);
      return offerDate.getMonth() === thisMonth && offerDate.getFullYear() === thisYear;
    }).length;
    
    const acceptedOffers = jobOffers.filter(offer => offer.status === 'Accepted').length;
    const totalOffers = jobOffers.length;
    
    const acceptanceRate = totalOffers > 0 ? ((acceptedOffers / totalOffers) * 100).toFixed(3) : '0.000';
    
    const applicantToHireRate = jobApplicants.length > 0 
      ? ((acceptedApplicants / jobApplicants.length) * 100).toFixed(3) 
      : '0.000';

    return [
      { title: 'JOB OPENINGS', value: activeJobOpenings.toString(), color: 'text-gray-900' },
      { title: 'TOTAL APPLICANTS (THIS MONTH)', value: thisMonthApplicants.toString(), color: 'text-gray-900' },
      { title: 'ACCEPTED JOB APPLICANTS', value: acceptedApplicants.toString(), color: 'text-green-600' },
      { title: 'REJECTED JOB APPLICANTS', value: rejectedApplicants.toString(), color: 'text-red-600' },
      { title: 'JOB OFFERS (THIS MONTH)', value: thisMonthOffers.toString(), color: 'text-gray-900' },
      { title: 'APPLICANT-TO-HIRE PERCENTAGE', value: `${applicantToHireRate}%`, color: 'text-gray-900' },
      { title: 'JOB OFFER ACCEPTANCE RATE', value: `${acceptanceRate}%`, color: 'text-gray-900' },
      { title: 'TOTAL JOB OPENINGS', value: totalJobOpenings.toString(), color: 'text-gray-900' },
    ];
  }, [jobOpenings, jobApplicants, jobOffers]);

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
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    domain={[0, 'auto']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#F9A8D4" 
                    strokeWidth={2}
                    dot={{ fill: '#F9A8D4', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
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
