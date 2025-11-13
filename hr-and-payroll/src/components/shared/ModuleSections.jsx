'use client';

import React from 'react';

export default function ModuleSections({ 
  shortcuts = [], 
  reportsAndMasters = [],
  shortcutsTitle = "Your Shortcuts",
  reportsTitle = "Reports & Masters"
}) {
  return (
    <>
      {/* Your Shortcuts Section */}
      {shortcuts.length > 0 && (
        <div className="px-2 py-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{shortcutsTitle}</h2>
          <div className="flex flex-wrap gap-4">
            {shortcuts.map((shortcut) => (
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
      )}

      {/* Reports & Masters Section */}
      {reportsAndMasters.length > 0 && (
        <div className="px-2 pb-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{reportsTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reportsAndMasters.map((category) => (
              <div key={category.category}>
                <h3 className="text-base font-semibold text-gray-900 mb-3">{category.category}</h3>
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.link}
                      className={`flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 ${
                        category.category === 'Key Reports' || category.category === 'Other Reports' 
                          ? 'justify-start' 
                          : ''
                      }`}
                    >
                      <span>{item.name}</span>
                      {(category.category !== 'Key Reports' && category.category !== 'Other Reports') && (
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
      )}
    </>
  );
}
