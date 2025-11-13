'use client';

import React from 'react';

export default function Blog() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Featured Article */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:col-span-2">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">HR</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  The Future of HR Management: Trends to Watch in 2024
                </h2>
                <p className="text-gray-600 mb-2">
                  Discover the latest trends shaping the HR industry and how technology 
                  is revolutionizing workforce management.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>By Sarah Johnson</span>
                  <span>•</span>
                  <span>Dec 15, 2024</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Regular Articles */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="w-full h-32 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-green-600 font-bold">Payroll</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Streamlining Payroll Processes
            </h3>
            <p className="text-gray-600 mb-3">
              Learn how to automate your payroll processes and reduce errors 
              with modern HR technology.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>By Mike Chen</span>
              <span>•</span>
              <span>Dec 12, 2024</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="w-full h-32 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-purple-600 font-bold">Recruit</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Best Practices for Remote Hiring
            </h3>
            <p className="text-gray-600 mb-3">
              Essential tips for conducting effective remote interviews and 
              building a strong virtual team.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>By Emily Davis</span>
              <span>•</span>
              <span>Dec 10, 2024</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="w-full h-32 bg-orange-100 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-orange-600 font-bold">Performance</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Employee Performance Reviews
            </h3>
            <p className="text-gray-600 mb-3">
              How to conduct meaningful performance reviews that drive 
              employee growth and development.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>By David Wilson</span>
              <span>•</span>
              <span>Dec 8, 2024</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="w-full h-32 bg-red-100 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-red-600 font-bold">Compliance</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              HR Compliance Checklist 2024
            </h3>
            <p className="text-gray-600 mb-3">
              Stay compliant with the latest HR regulations and avoid 
              costly legal issues.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>By Lisa Brown</span>
              <span>•</span>
              <span>Dec 5, 2024</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Newsletter Signup</h3>
          <p className="text-gray-600 mb-4">
            Stay updated with the latest HR trends, tips, and industry insights.
          </p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
