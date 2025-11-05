'use client';

import React from 'react';
import { Filter, MoreHorizontal, RotateCcw, Plus, Edit3 } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function Lifecycle() {

  // Lifecycle shortcuts data
  const lifecycleShortcuts = [
    { name: 'Employee Onboarding', extra: '0 Pending', link: '#' },
    { name: 'Employee Separation', extra: '0 Pending', link: '#' },
    { name: 'Employee Grievance', extra: '0 Open', link: '#' },
    { name: 'Dashboard', link: '#' },
  ];

  // Lifecycle reports and masters data
  const lifecycleReportsAndMasters = [
    {
      category: 'Onboarding',
      items: [
        { name: 'Employee Onboarding Template', link: '#', hasArrow: true },
        { name: 'Employee Onboarding', link: '#', hasArrow: true },
        { name: 'Employee Skill Map', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Daily Work Summary',
      items: [
        { name: 'Daily Work Summary', link: '#', hasArrow: true },
        { name: 'Daily Work Summary Group', link: '#', hasArrow: true },
        { name: 'Daily Work Summary Replies', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Grievance',
      items: [
        { name: 'Grievance Type', link: '#', hasArrow: true },
        { name: 'Employee Grievance', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Training',
      items: [
        { name: 'Training Program', link: '#', hasArrow: true },
        { name: 'Training Event', link: '#', hasArrow: true },
        { name: 'Training Feedback', link: '#', hasArrow: true },
        { name: 'Training Result', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Reports',
      items: [
        { name: 'Employee Exits', link: '#', hasArrow: true },
        { name: 'Employee Birthday', link: '#', hasArrow: true },
        { name: 'Employee Information', link: '#', hasArrow: true },
        { name: 'Employee Analytics', link: '#', hasArrow: true },
      ],
    },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Main Container with Single Border */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Header */}
        

          {/* Shortcuts Section */}
          <div className="px-6 py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lifecycle Shortcuts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
              {lifecycleShortcuts.map((shortcut) => (
                <a
                  key={shortcut.name}
                  href={shortcut.link}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  <span>{shortcut.name}</span>
                  {shortcut.extra && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {shortcut.extra}
                    </span>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Separator Line */}
          {/* <div className="border-t border-gray-200 mx-6"></div> */}

           {/* Three Cards Section */}
           <div className="px-6 py-6">
             <div className="grid grid-cols-3 gap-4">
               {/* New Hires Card */}
               <div className="bg-white  rounded-lg p-4">
                 <div className="text-center">
                   <h3 className="text-sm font-medium text-gray-900 mb-4 pr-20">New Hires (This Month)</h3>
                   <div className="flex flex-col items-center justify-center mb-4" style={{ height: '120px' }}>
                     <p className="text-gray-500">No Data...</p>
                   </div>
                   <button className="w-full bg-gray-200 text-gray-700 py-1 px-2 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm">
                     View List
                   </button>
                 </div>
               </div>

               {/* Exits Card */}
               <div className="bg-white rounded-lg p-4">
                 <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-900 mb-4 pr-20">Exits (This Month)</h3>
                   <div className="flex flex-col items-center justify-center mb-4" style={{ height: '120px' }}>
                     <p className="text-gray-500">No Data...</p>
                   </div>
                   <button className="w-full bg-gray-200 text-gray-700 py-1 px-2 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm">
                     View List
                   </button>
                 </div>
               </div>

               {/* Trainings Card */}
               <div className="bg-white  rounded-lg p-4">
                 <div className="text-center">
                   <h3 className="text-sm font-medium text-gray-900 mb-4 pr-20 ">Trainings (This Week)</h3>
                   <div className="flex flex-col items-center justify-center mb-4" style={{ height: '120px' }}>
                     <p className="text-gray-500">No Data...</p>
                   </div>
                   <button className="w-full bg-gray-200 text-gray-700 py-1 px-2 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm">
                     View List
                   </button>
                 </div>
               </div>
             </div>
           </div>

           {/* Separator Line */}
           {/* <div className="border-t border-gray-200 mx-6"></div> */}

           {/* Reports & Masters Section */}
           <div className="px-6 py-6">
             <h2 className="font-semibold text-gray-900 mb-4">Masters & Reports</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {lifecycleReportsAndMasters.map((category) => (
                 <div key={category.category}>
                   <h3 className="text-base font-semibold text-gray-900 mb-3">{category.category}</h3>
                   <div className="space-y-2">
                     {category.items.map((item) => (
                       <a
                         key={item.name}
                         href={item.link}
                         className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
                       >
                         <span>{item.name}</span>
                         {item.hasArrow && (
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 24 24"
                             strokeWidth="2"
                             stroke="currentColor"
                             className="w-3 h-3"
                           >
                             <path
                               strokeLinecap="round"
                               strokeLinejoin="round"
                               d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                             />
                           </svg>
                         )}
                       </a>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
             
             <div className="flex justify-end mt-6">
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
    </div>
  );
}
