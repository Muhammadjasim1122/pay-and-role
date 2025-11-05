'use client';

import React from 'react';

export default function ReportsAndMasters({ 
  data, 
  title = "Reports & Masters",
  categoriesWithoutArrows = [] 
}) {
  return (
    <div className="px-6 pb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((category) => (
          <div key={category.category}>
            <h3 className="text-base font-semibold text-gray-900 mb-3">{category.category}</h3>
            <div className="space-y-2">
              {category.items.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className={`flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 ${
                    categoriesWithoutArrows.includes(category.category)
                      ? 'justify-start' 
                      : ''
                  }`}
                >
                  <span>{item.name}</span>
                  {!categoriesWithoutArrows.includes(category.category) && (
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
    </div>
  );
}
