'use client';

import React from 'react';

export default function YourShortcuts({ data, title = "Your Shortcuts" }) {
  return (
    <div className="px-6 py-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {data.map((shortcut) => (
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
  );
}
