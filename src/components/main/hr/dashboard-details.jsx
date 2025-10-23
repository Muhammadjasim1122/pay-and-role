'use client';

import React, { useState, useEffect } from 'react';
import { MoreHorizontal, Plus, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useDashboard } from '../../../contexts/DashboardContext';

export default function DashboardDetails() {
  const { dashboards } = useDashboard();
  const [selectedDashboard, setSelectedDashboard] = useState(null);

  // Set default dashboard on component mount
  useEffect(() => {
    if (dashboards.length > 0 && !selectedDashboard) {
      setSelectedDashboard(dashboards[0]);
    }
  }, [dashboards, selectedDashboard]);

  // Dynamic stats based on selected dashboard
  const getDynamicStats = () => {
    if (!selectedDashboard) {
      return [
        { title: 'TOTAL EMPLOYEES', value: '0' },
        { title: 'NEW HIRES (THIS YEAR)', value: '0' },
        { title: 'EMPLOYEE EXITS (THIS YEAR)', value: '0' },
        { title: 'EMPLOYEES JOINING (THIS QUARTER)', value: '0' },
        { title: 'EMPLOYEES RELIEVING (THIS QUARTER)', value: '0' }
      ];
    }

    // Calculate dynamic values based on dashboard data
    const totalEmployees = selectedDashboard.charts ? selectedDashboard.charts.length * 2 : 0;
    const newHires = selectedDashboard.cards ? selectedDashboard.cards.length * 3 : 0;
    const employeeExits = Math.floor(totalEmployees * 0.1); // 10% exit rate
    const joiningThisQuarter = Math.floor(newHires * 0.8); // 80% of new hires
    const relievingThisQuarter = Math.floor(employeeExits * 0.6); // 60% of exits

    return [
      { title: 'TOTAL EMPLOYEES', value: totalEmployees.toString() },
      { title: 'NEW HIRES (THIS YEAR)', value: newHires.toString() },
      { title: 'EMPLOYEE EXITS (THIS YEAR)', value: employeeExits.toString() },
      { title: 'EMPLOYEES JOINING (THIS QUARTER)', value: joiningThisQuarter.toString() },
      { title: 'EMPLOYEES RELIEVING (THIS QUARTER)', value: relievingThisQuarter.toString() }
    ];
  };

  const stats = getDynamicStats();

  // Dynamic chart data based on selected dashboard
  const getDynamicChartData = () => {
    if (!selectedDashboard) {
      return {
        hiringAttritionData: [{ month: 'Oct 2025', hiringCount: 0, attritionCount: 0 }],
        employeesByAgeData: [
          { ageGroup: '15-19', count: 0 },
          { ageGroup: '20-24', count: 0 },
          { ageGroup: '25-29', count: 0 },
          { ageGroup: '30-34', count: 0 },
          { ageGroup: '35-39', count: 0 },
          { ageGroup: '40-44', count: 0 },
          { ageGroup: '45-49', count: 0 },
          { ageGroup: '50-54', count: 0 },
          { ageGroup: '55-59', count: 0 },
          { ageGroup: '60-64', count: 0 },
          { ageGroup: '65-69', count: 0 },
          { ageGroup: '70-74', count: 0 },
          { ageGroup: '75-79', count: 0 },
          { ageGroup: '80+', count: 0 }
        ],
        genderDiversityData: [
          { name: 'Male', value: 0, color: '#60a5fa' },
          { name: 'Female', value: 0, color: '#f472b6' }
        ],
        employeesByTypeData: [
          { name: 'Full Time', value: 0, color: '#60a5fa' },
          { name: 'Part Time', value: 0, color: '#f472b6' },
          { name: 'Contract', value: 0, color: '#34d399' }
        ],
        employeesByGradeData: [
          { name: 'Grade A', value: 0, color: '#60a5fa' }
        ],
        employeesByBranchData: [
          { name: 'Main Branch', value: 0, color: '#60a5fa' }
        ],
        designationWiseData: [
          { name: 'Manager', value: 0, color: '#60a5fa' },
          { name: 'Developer', value: 0, color: '#f472b6' }
        ],
        departmentWiseData: [
          { name: 'IT', value: 0, color: '#60a5fa' },
          { name: 'HR', value: 0, color: '#f472b6' }
        ]
      };
    }

    const totalEmployees = parseInt(stats[0].value);
    const newHires = parseInt(stats[1].value);
    const employeeExits = parseInt(stats[2].value);

    return {
      hiringAttritionData: [
        { month: 'Oct 2025', hiringCount: newHires, attritionCount: employeeExits },
        { month: 'Nov 2025', hiringCount: Math.floor(newHires * 0.8), attritionCount: Math.floor(employeeExits * 0.9) },
        { month: 'Dec 2025', hiringCount: Math.floor(newHires * 1.2), attritionCount: Math.floor(employeeExits * 1.1) }
      ],
      employeesByAgeData: [
        { ageGroup: '15-19', count: Math.floor(totalEmployees * 0.05) },
        { ageGroup: '20-24', count: Math.floor(totalEmployees * 0.15) },
        { ageGroup: '25-29', count: Math.floor(totalEmployees * 0.25) },
        { ageGroup: '30-34', count: Math.floor(totalEmployees * 0.20) },
        { ageGroup: '35-39', count: Math.floor(totalEmployees * 0.15) },
        { ageGroup: '40-44', count: Math.floor(totalEmployees * 0.10) },
        { ageGroup: '45-49', count: Math.floor(totalEmployees * 0.05) },
        { ageGroup: '50-54', count: Math.floor(totalEmployees * 0.03) },
        { ageGroup: '55-59', count: Math.floor(totalEmployees * 0.02) },
        { ageGroup: '60-64', count: 0 },
        { ageGroup: '65-69', count: 0 },
        { ageGroup: '70-74', count: 0 },
        { ageGroup: '75-79', count: 0 },
        { ageGroup: '80+', count: 0 }
      ],
      genderDiversityData: [
        { name: 'Male', value: Math.floor(totalEmployees * 0.6), color: '#60a5fa' },
        { name: 'Female', value: Math.floor(totalEmployees * 0.4), color: '#f472b6' }
      ],
      employeesByTypeData: [
        { name: 'Full Time', value: Math.floor(totalEmployees * 0.8), color: '#60a5fa' },
        { name: 'Part Time', value: Math.floor(totalEmployees * 0.15), color: '#f472b6' },
        { name: 'Contract', value: Math.floor(totalEmployees * 0.05), color: '#34d399' }
      ],
      employeesByGradeData: [
        { name: 'Grade A', value: Math.floor(totalEmployees * 0.3), color: '#60a5fa' },
        { name: 'Grade B', value: Math.floor(totalEmployees * 0.4), color: '#f472b6' },
        { name: 'Grade C', value: Math.floor(totalEmployees * 0.3), color: '#34d399' }
      ],
      employeesByBranchData: [
        { name: 'Main Branch', value: Math.floor(totalEmployees * 0.6), color: '#60a5fa' },
        { name: 'Branch 2', value: Math.floor(totalEmployees * 0.4), color: '#f472b6' }
      ],
      designationWiseData: [
        { name: 'Manager', value: Math.floor(totalEmployees * 0.2), color: '#60a5fa' },
        { name: 'Developer', value: Math.floor(totalEmployees * 0.4), color: '#f472b6' },
        { name: 'Analyst', value: Math.floor(totalEmployees * 0.4), color: '#34d399' }
      ],
      departmentWiseData: [
        { name: 'IT', value: Math.floor(totalEmployees * 0.5), color: '#60a5fa' },
        { name: 'HR', value: Math.floor(totalEmployees * 0.3), color: '#f472b6' },
        { name: 'Finance', value: Math.floor(totalEmployees * 0.2), color: '#34d399' }
      ]
    };
  };

  const chartData = getDynamicChartData();

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
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
              <div className="text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Hiring vs Attrition Count Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm text-gray-900">Hiring vs Attrition Count</h2>
              <p className="text-sm text-gray-500">Last synced 11 minutes ago</p>
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

                 {/* Chart */}
                 <div className="h-48">
                   <ResponsiveContainer width="100%" height="100%">
                     <LineChart
                       data={chartData.hiringAttritionData}
                       margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                     >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#e5e7eb" 
                  horizontal={true}
                  vertical={true}
                />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={true}
                  axisLine={true}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={true}
                  axisLine={true}
                  domain={[0, 5]}
                  tick={{ fill: '#6b7280' }}
                  tickCount={6}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: '20px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="hiringCount" 
                  stroke="#60a5fa" 
                  strokeWidth={2}
                  dot={{ fill: '#60a5fa', strokeWidth: 2, r: 3 }}
                  name="Hiring Count"
                  connectNulls={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="attritionCount" 
                  stroke="#1e40af" 
                  strokeWidth={2}
                  dot={{ fill: '#1e40af', strokeWidth: 2, r: 3 }}
                  name="Attrition Count"
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Employees by Age Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm text-gray-900">Employees by Age</h2>
              <p className="text-sm text-gray-500">Last synced 40 minutes ago</p>
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

                 {/* Chart */}
                 <div className="h-48">
                   <ResponsiveContainer width="100%" height="100%">
                     <BarChart
                       data={chartData.employeesByAgeData}
                       margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                     >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#e5e7eb" 
                  horizontal={true}
                  vertical={false}
                />
                <XAxis 
                  dataKey="ageGroup" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={true}
                  axisLine={true}
                  tick={{ fill: '#6b7280' }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={true}
                  axisLine={true}
                  domain={[0, 1]}
                  tick={{ fill: '#6b7280' }}
                  tickCount={3}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#60a5fa"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Diversity Ratio and Employees by Type Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Gender Diversity Ratio Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Gender Diversity Ratio</h2>
                <p className="text-sm text-gray-500">Last synced 43 minutes ago</p>
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

            {/* Chart */}
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                           data={chartData.genderDiversityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                           {chartData.genderDiversityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2">
                     {chartData.genderDiversityData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm text-gray-900 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Employees by Type Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Employees by Type</h2>
                <p className="text-sm text-gray-500">Last synced 43 minutes ago</p>
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

            {/* Chart */}
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.employeesByTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.employeesByTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2">
              {chartData.employeesByTypeData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm text-gray-900 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional 4 Charts - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Employees by Grade Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Employees by Grade</h2>
                <p className="text-sm text-gray-500">Last synced 46 minutes ago</p>
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

            {/* Chart */}
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.employeesByGradeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.employeesByGradeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2">
              {chartData.employeesByGradeData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm text-gray-900 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Employees by Branch Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Employees by Branch</h2>
                <p className="text-sm text-gray-500">Last synced 46 minutes ago</p>
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

            {/* Chart */}
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.employeesByBranchData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.employeesByBranchData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2">
              {chartData.employeesByBranchData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm text-gray-900 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Designation Wise Employee Count Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Designation Wise Employee Count</h2>
                <p className="text-sm text-gray-500">Last synced 46 minutes ago</p>
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

            {/* Chart */}
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.designationWiseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.designationWiseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2">
              {chartData.designationWiseData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm text-gray-900 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Department Wise Employee Count Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Department Wise Employee Count</h2>
                <p className="text-sm text-gray-500">Last synced 46 minutes ago</p>
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

            {/* Chart */}
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.departmentWiseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.departmentWiseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2">
              {chartData.departmentWiseData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm text-gray-900 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
