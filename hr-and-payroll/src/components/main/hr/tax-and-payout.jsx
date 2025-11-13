'use client';

import React from 'react';
import { Plus, Edit3 } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function TaxAndPayout() {

  // Tax and Payout shortcuts data
  const taxAndPayoutShortcuts = [
    { name: 'Employee Tax Exemption Declaration: Additional Salary', link: '#' },
    { name: 'Income Tax Computation', link: '#' },
  ];

  // Tax and Payout reports and masters data
  const taxAndPayoutReportsAndMasters = [
    {
      category: 'Tax Setup',
      items: [
        { name: 'Income Tax Slab', link: '#', hasArrow: true },
        { name: 'Employee Tax Exemption Category', link: '#', hasArrow: true },
        { name: 'Employee Tax Exemption Sub Category', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Exemption',
      items: [
        { name: 'Employee Tax Exemption Declaration', link: '#', hasArrow: true },
        { name: 'Employee Tax Exemption Proof Submissio...', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Benefits',
      items: [
        { name: 'Employee Benefit Application', link: '#', hasArrow: true },
        { name: 'Employee Benefit Claim', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Reports',
      items: [
        { name: 'Income Tax Computation', link: '#', hasArrow: true },
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
            shortcuts={taxAndPayoutShortcuts}
            reportsAndMasters={taxAndPayoutReportsAndMasters}
            shortcutsTitle="Your Shortcuts"
            reportsTitle="Masters & Reports"
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
