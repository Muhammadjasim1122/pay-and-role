'use client';

import { useState } from 'react';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // Example breadcrumbs - you can modify this based on your navigation
  const breadcrumbs = [
    { label: "Frappe", onClick: () => console.log("Navigate to Frappe") },
    { label: "Products", onClick: () => console.log("Navigate to Products") },
    { label: "Frappe HR", onClick: () => console.log("Navigate to Frappe HR") }
  ];

  const handleSidebarToggle = (expanded) => {
    setIsSidebarExpanded(expanded);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="transition-all duration-300 ease-out">
        <Sidebar onToggle={handleSidebarToggle} />
      </div>
      
      {/* Right Side - Header + Content */}
      <div className="flex-1 flex flex-col">
        {/* Header - Always stays in place */}
        <Header breadcrumbs={breadcrumbs} />
        
        {/* Main Content Area - Pushes when sidebar opens */}
        <div className={`flex-1 transition-all duration-300 ease-out ${isSidebarExpanded ? 'ml-48' : 'ml-0'}`}>
          <main className="p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Welcome to Frappe HR
              </h1>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  HR Management Dashboard
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-medium text-blue-900 mb-2">Employees</h3>
                    <p className="text-blue-700 text-sm">Manage employee records and information</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h3 className="font-medium text-green-900 mb-2">Payroll</h3>
                    <p className="text-green-700 text-sm">Handle salary and payment processing</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h3 className="font-medium text-purple-900 mb-2">Attendance</h3>
                    <p className="text-purple-700 text-sm">Track employee attendance and leaves</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
