'use client';

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ Added state

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> {/* ✅ pass props */}

        {/* Main Content */}
        <main
          id="page-content"
          className={`flex-1 overflow-x-hidden transition-all duration-300 ${isSidebarOpen ? ' ' : 'ml-0'}`} // ✅ adjust width dynamically
        >
          {children}
        </main>
      </div>
    </div>
  );
}
