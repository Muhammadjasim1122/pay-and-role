'use client';

import React from 'react';
import HR from '../main/hr/hr';

// Payroll module data
const payrollShortcuts = [
  { name: 'Payroll Entry', extra: '5 Pending', link: '#' },
  { name: 'Salary Slip', link: '#' },
  { name: 'Payroll Dashboard', link: '#' },
  { name: 'Employee Tax', link: '#' },
  { name: 'Payroll Reports', link: '#' },
];

const payrollReportsAndMasters = [
  {
    category: 'Setup',
    items: [
      { name: 'Salary Component', link: '#' },
      { name: 'Payroll Period', link: '#' },
      { name: 'Employee Tax Category', link: '#' },
    ],
  },
  {
    category: 'Payroll',
    items: [
      { name: 'Payroll Entry', link: '#' },
      { name: 'Salary Slip', link: '#' },
      { name: 'Employee Tax', link: '#' },
    ],
  },
  {
    category: 'Reports',
    items: [
      { name: 'Payroll Summary', link: '#' },
      { name: 'Tax Reports', link: '#' },
      { name: 'Employee Salary Report', link: '#' },
    ],
  },
];

export default function PayrollModule() {
  return (
    <HR 
      shortcuts={payrollShortcuts}
      reportsAndMasters={payrollReportsAndMasters}
      moduleTitle="Let's Set Up the Payroll Module."
      moduleDescription="Salary, Tax, and more."
    />
  );
}
