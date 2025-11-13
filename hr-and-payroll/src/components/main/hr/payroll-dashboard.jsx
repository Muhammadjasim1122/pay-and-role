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
import { usePayroll } from '../../../contexts/PayrollContext';

const COLOR_PALETTE = ['#60a5fa', '#f472b6', '#34d399', '#fbbf24', '#a855f7', '#14b8a6', '#f97316'];

export default function PayrollDashboard() {
  const { salarySlips, payrollEntries, salaryRegisters } = usePayroll();

  // Calculate stats from actual data
  const stats = useMemo(() => {
    const totalSalaryPaid = salarySlips.reduce((sum, slip) => sum + (parseFloat(slip.netPay) || 0), 0);
    const totalEmployees = new Set(salarySlips.map(slip => slip.employeeId).filter(Boolean)).size;
    const averageSalary = totalEmployees > 0 ? totalSalaryPaid / totalEmployees : 0;
    const pendingPayrolls = payrollEntries.filter(entry => entry.status === 'Draft' || entry.status === 'Submitted').length;
    const completedPayrolls = payrollEntries.filter(entry => entry.status === 'Paid' || entry.status === 'Approved').length;
    const totalTaxDeductions = salarySlips.reduce((sum, slip) => sum + (parseFloat(slip.totalDeduction) || 0), 0);

    return [
      { title: 'TOTAL SALARY PAID', value: `$${totalSalaryPaid.toFixed(2)}` },
      { title: 'TOTAL EMPLOYEES', value: totalEmployees.toString() },
      { title: 'AVERAGE SALARY', value: `$${averageSalary.toFixed(2)}` },
      { title: 'PENDING PAYROLLS', value: pendingPayrolls.toString() },
      { title: 'COMPLETED PAYROLLS', value: completedPayrolls.toString() },
      { title: 'TAX DEDUCTIONS', value: `$${totalTaxDeductions.toFixed(2)}` },
    ];
  }, [salarySlips, payrollEntries]);

  // Calculate monthly salary data
  const salaryData = useMemo(() => {
    const months = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear();
      const monthNum = date.getMonth();
      
      // Calculate salary for this month
      const monthSalary = salarySlips.reduce((sum, slip) => {
        if (slip.postingDate) {
          const slipDate = new Date(slip.postingDate);
          if (slipDate.getMonth() === monthNum && slipDate.getFullYear() === year) {
            return sum + (parseFloat(slip.netPay) || 0);
          }
        }
        return sum;
      }, 0);
      
      months.push({ month: monthName, salary: monthSalary });
    }
    return months;
  }, [salarySlips]);

  // Calculate payroll status distribution
  const payrollStatusData = useMemo(() => {
    const completed = payrollEntries.filter(entry => entry.status === 'Paid' || entry.status === 'Approved').length;
    const pending = payrollEntries.filter(entry => entry.status === 'Draft' || entry.status === 'Submitted').length;
    return [
      { name: 'Completed', value: completed },
      { name: 'Pending', value: pending }
    ];
  }, [payrollEntries]);

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
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
                <h2 className="text-sm text-gray-900">Monthly Salary Trend</h2>
                <p className="text-xs text-gray-500">Salary payments over the last 12 months</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salaryData} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tick={{ fill: '#6b7280' }} />
                  <YAxis stroke="#6b7280" fontSize={12} tick={{ fill: '#6b7280' }} allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="salary" stroke="#60a5fa" strokeWidth={2} dot={{ r: 3 }} name="Salary" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-gray-900">Payroll Status</h2>
                <p className="text-xs text-gray-500">Distribution of payroll status</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={payrollStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {COLOR_PALETTE.slice(0, 2).map((color, index) => (
                      <Cell key={index} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

