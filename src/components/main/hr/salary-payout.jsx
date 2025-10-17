'use client';

import React from 'react';
import { Plus, Edit3 } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function SalaryPayout() {

  // Salary Payout shortcuts data
  const salaryPayoutShortcuts = [
    { name: 'Salary Slip', extra: '0 Draft', link: '#' },
    { name: 'Payroll Entry', extra: '0 Draft', link: '#' },
    { name: 'Salary Register', link: '#' },
  ];

  // Salary Payout reports and masters data
  const salaryPayoutReportsAndMasters = [
    {
      category: 'Masters',
      items: [
        { name: 'Salary Component', link: '#', hasArrow: true },
        { name: 'Salary Structure', link: '#', hasArrow: true },
        { name: 'Income Tax Slab', link: '#', hasArrow: true },
        { name: 'Payroll Period', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Payroll',
      items: [
        { name: 'Salary Structure Assignment', link: '#', hasArrow: true },
        { name: 'Bulk Salary Structure Assignment', link: '#', hasArrow: true },
        { name: 'Salary Slip', link: '#', hasArrow: true },
        { name: 'Payroll Entry', link: '#', hasArrow: true },
        { name: 'Salary Withholding', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Incentives',
      items: [
        { name: 'Additional Salary', link: '#', hasArrow: true },
        { name: 'Employee Incentive', link: '#', hasArrow: true },
        { name: 'Retention Bonus', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Accounting',
      items: [
        { name: 'Chart of Accounts', link: '#', hasArrow: true },
        { name: 'Chart of Cost Centers', link: '#', hasArrow: true },
        { name: 'Payment Entry', link: '#', hasArrow: true },
        { name: 'Journal Entry', link: '#', hasArrow: true },
        { name: 'Accounts Settings', link: '#', hasArrow: true },
        { name: 'Accounting Dimension', link: '#', hasArrow: true },
        { name: 'Currency', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Accounting Reports',
      items: [
        { name: 'General Ledger', link: '#', hasArrow: true },
        { name: 'Accounts Payable', link: '#', hasArrow: true },
        { name: 'Accounts Receivable', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Payroll Reports',
      items: [
        { name: 'Salary Register', link: '#', hasArrow: true },
        { name: 'Bank Remittance', link: '#', hasArrow: true },
        { name: 'Salary Payments Based On Payment Mod...', link: '#', hasArrow: true },
        { name: 'Salary Payments via ECS', link: '#', hasArrow: true },
        { name: 'Income Tax Computation', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Deduction Reports',
      items: [
        { name: 'Provident Fund Deductions', link: '#', hasArrow: true },
        { name: 'Professional Tax Deductions', link: '#', hasArrow: true },
        { name: 'Income Tax Deductions', link: '#', hasArrow: true },
      ],
    },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Main Container with Single Border */}
        <div className="bg-white rounded-lg border border-gray-200">
          
          {/* Dynamic Module Sections */}
          <ModuleSections 
            shortcuts={salaryPayoutShortcuts}
            reportsAndMasters={salaryPayoutReportsAndMasters}
            shortcutsTitle="Your Shortcuts"
            reportsTitle="Transactions & Reports"
          />
          
          {/* Edit and New Buttons - Bottom Right Corner */}
          <div className="flex justify-end mt-6 pr-6 pb-2">
            <div className="flex items-center space-x-1">
              <button className="inline-flex items-center space-x-1 px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                <Edit3 className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button className="inline-flex items-center space-x-1 px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                <Plus className="h-4 w-4" />
                <span>New</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
