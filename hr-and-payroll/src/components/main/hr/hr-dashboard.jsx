'use client';

import React, { useMemo } from 'react';
import { MoreHorizontal } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useEmployee } from '../../../contexts/EmployeeContext';
import { useLeaveApplication } from '../../../contexts/LeaveApplicationContext';

const COLOR_PALETTE = ['#60a5fa', '#f472b6', '#34d399', '#fbbf24', '#a855f7', '#14b8a6', '#f97316'];

const parseDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const countBy = (items, accessor) => {
  const counts = new Map();
  items.forEach((item) => {
    const raw = accessor(item);
    const label = raw ? String(raw).trim() : 'Not specified';
    counts.set(label, (counts.get(label) || 0) + 1);
  });
  return Array.from(counts.entries()).map(([name, value]) => ({ name, value }));
};

const ensureData = (data, fallbackLabel = 'No data') =>
  data.length ? data : [{ name: fallbackLabel, value: 0 }];

const getQuarterRange = (date) => {
  const year = date.getFullYear();
  const startMonth = Math.floor(date.getMonth() / 3) * 3;
  const start = new Date(year, startMonth, 1);
  const end = new Date(year, startMonth + 3, 1);
  return { start, end };
};

const computeAge = (dateValue, referenceDate) => {
  const date = parseDate(dateValue);
  if (!date) return null;
  let age = referenceDate.getFullYear() - date.getFullYear();
  const monthDiff = referenceDate.getMonth() - date.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < date.getDate())) {
    age -= 1;
  }
  return age;
};

const getAgeBucket = (age) => {
  if (age === null) return null;
  if (age < 25) return '< 25';
  if (age < 35) return '25-34';
  if (age < 45) return '35-44';
  if (age < 55) return '45-54';
  return '55+';
};

const buildHiringAttritionSeries = (employees, monthsBack = 6) => {
  const now = new Date();
  const series = [];
  for (let i = monthsBack - 1; i >= 0; i -= 1) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthLabel = monthDate.toLocaleString('default', { month: 'short', year: 'numeric' });
    const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1);

    const hires = employees.filter((emp) => {
      const doj = parseDate(emp.dateOfJoining);
      return doj && doj >= monthStart && doj < monthEnd;
    }).length;

    const exits = employees.filter((emp) => {
      const relieving = parseDate(emp.relievingDate);
      return relieving && relieving >= monthStart && relieving < monthEnd;
    }).length;

    series.push({ month: monthLabel, hiringCount: hires, attritionCount: exits });
  }
  return series;
};

const formatNumber = (value) => value.toLocaleString();

export default function HRDashboard() {
  const { employees } = useEmployee();
  const { leaveApplications } = useLeaveApplication();

  const now = new Date();
  const { start: quarterStart, end: quarterEnd } = getQuarterRange(now);
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);

  const stats = useMemo(() => {
    const totalEmployees = employees.length;

    const newHiresThisYear = employees.filter((emp) => {
      const doj = parseDate(emp.dateOfJoining);
      return doj && doj >= startOfYear && doj < startOfNextYear;
    }).length;

    const exitsThisYear = employees.filter((emp) => {
      const relieving = parseDate(emp.relievingDate);
      return relieving && relieving >= startOfYear && relieving < startOfNextYear;
    }).length;

    const joiningThisQuarter = employees.filter((emp) => {
      const doj = parseDate(emp.dateOfJoining);
      return doj && doj >= quarterStart && doj < quarterEnd;
    }).length;

    const relievingThisQuarter = employees.filter((emp) => {
      const relieving = parseDate(emp.relievingDate);
      return relieving && relieving >= quarterStart && relieving < quarterEnd;
    }).length;

    const pendingLeaves = leaveApplications.filter(
      (app) => (app.status || 'Open').toLowerCase() === 'open',
    ).length;

    return [
      { title: 'TOTAL EMPLOYEES', value: formatNumber(totalEmployees) },
      { title: 'NEW HIRES (THIS YEAR)', value: formatNumber(newHiresThisYear) },
      { title: 'EMPLOYEE EXITS (THIS YEAR)', value: formatNumber(exitsThisYear) },
      { title: 'JOINING THIS QUARTER', value: formatNumber(joiningThisQuarter) },
      { title: 'RELIEVING THIS QUARTER', value: formatNumber(relievingThisQuarter) },
      { title: 'PENDING LEAVE REQUESTS', value: formatNumber(pendingLeaves) },
    ];
  }, [employees, leaveApplications, quarterStart, quarterEnd, startOfYear, startOfNextYear]);

  const hiringAttritionData = useMemo(
    () => buildHiringAttritionSeries(employees, 6),
    [employees],
  );

  const departmentData = useMemo(() => {
    const data = countBy(employees, (emp) => emp.department || 'Not specified')
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
    return ensureData(data);
  }, [employees]);

  const genderData = useMemo(() => {
    const data = countBy(employees, (emp) => {
      const gender = emp.gender;
      if (!gender) return 'Not specified';
      return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
    });
    return ensureData(data).map((item, index) => ({
      ...item,
      color: COLOR_PALETTE[index % COLOR_PALETTE.length],
    }));
  }, [employees]);

  const statusData = useMemo(() => {
    const data = countBy(employees, (emp) => emp.status || 'Not specified');
    return ensureData(data).map((item, index) => ({
      ...item,
      color: COLOR_PALETTE[index % COLOR_PALETTE.length],
    }));
  }, [employees]);

  const ageData = useMemo(() => {
    const buckets = { '< 25': 0, '25-34': 0, '35-44': 0, '45-54': 0, '55+': 0 };
    employees.forEach((emp) => {
      const age = computeAge(emp.dateOfBirth, now);
      const bucket = getAgeBucket(age);
      if (bucket) {
        buckets[bucket] += 1;
      }
    });
    return Object.entries(buckets).map(([name, count]) => ({ name, count }));
  }, [employees, now]);

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {stat.title}
                </h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Hiring vs Attrition</h2>
                <p className="text-xs text-gray-500">Based on joining and relieving dates</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hiringAttritionData} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tick={{ fill: '#6b7280' }} />
                  <YAxis stroke="#6b7280" fontSize={12} tick={{ fill: '#6b7280' }} allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hiringCount" stroke="#60a5fa" strokeWidth={2} dot={{ r: 3 }} name="Hires" />
                  <Line type="monotone" dataKey="attritionCount" stroke="#f472b6" strokeWidth={2} dot={{ r: 3 }} name="Attrition" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Employees by Department</h2>
                <p className="text-xs text-gray-500">Top departments by headcount</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} margin={{ top: 16, right: 24, left: 8, bottom: 24 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    fontSize={12}
                    tick={{ fill: '#6b7280' }}
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                    height={60}
                  />
                  <YAxis stroke="#6b7280" fontSize={12} tick={{ fill: '#6b7280' }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Gender Distribution</h2>
                <p className="text-xs text-gray-500">Across all active employees</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={genderData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={4} dataKey="value">
                    {genderData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {genderData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2 text-sm">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-medium text-gray-900">{formatNumber(item.value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Employees by Status</h2>
                <p className="text-xs text-gray-500">Current employee status mix</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={4} dataKey="value">
                    {statusData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2 text-sm">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-medium text-gray-900">{formatNumber(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm text-gray-900">Employees by Age Band</h2>
              <p className="text-xs text-gray-500">Calculated from date of birth</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 16, right: 24, left: 8, bottom: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tick={{ fill: '#6b7280' }} />
                <YAxis stroke="#6b7280" fontSize={12} tick={{ fill: '#6b7280' }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#34d399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
