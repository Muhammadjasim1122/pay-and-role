'use client';

import React, { useState } from 'react';
import { Plus, Edit3 } from 'lucide-react';

export default function FormLayout({ 
  formFields = [],
  tableConfig = null,
  colorPicker = null,
  showEditNewButtons = true,
  onEdit,
  onNew
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colorSwatches = [
    '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444',
    '#EC4899', '#22C55E', '#2563EB', '#F97316', '#0EA5E9',
    '#06B6D4', '#84CC16'
  ];

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'date':
      case 'number':
        return (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              id={field.id}
              value={field.value}
              onChange={field.onChange}
              readOnly={field.readOnly}
              className={`w-full px-3 py-1 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${field.className || ''}`}
              placeholder={field.placeholder || ''}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          
          {/* Form Fields Section */}
          {formFields.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {formFields.filter(f => f.column === 'left').map(field => renderField(field))}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {formFields.filter(f => f.column === 'right').map(field => renderField(field))}
                </div>
              </div>

              {/* Border Separator if table exists */}
              {tableConfig && <div className="border-t border-gray-200 my-6"></div>}
            </>
          )}

          {/* Table Section */}
          {tableConfig && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{tableConfig.title}</h2>
              
              {tableConfig.subtitle && (
                <p className="text-sm text-gray-600 mb-3">{tableConfig.subtitle}</p>
              )}

              {/* Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {tableConfig.showCheckbox && (
                        <th scope="col" className="w-12 px-4 py-3 text-left">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </th>
                      )}
                      {tableConfig.columns.map((column, index) => (
                        <th 
                          key={index}
                          scope="col" 
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column.label} {column.required && <span className="text-red-500">*</span>}
                        </th>
                      ))}
                      {tableConfig.showActions && (
                        <th scope="col" className="w-12 px-4 py-3 text-center">
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(!tableConfig.data || tableConfig.data.length === 0) ? (
                      <tr>
                        <td colSpan={tableConfig.columns.length + (tableConfig.showCheckbox ? 1 : 0) + (tableConfig.showActions ? 1 : 0)} className="px-4 py-16 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-gray-500 text-sm">No Data</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      tableConfig.data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {tableConfig.showCheckbox && (
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                            </td>
                          )}
                          {tableConfig.columns.map((column, colIndex) => (
                            <td key={colIndex} className="px-4 py-3 text-sm text-gray-900">
                              {row[column.key]}
                            </td>
                          ))}
                          {tableConfig.showActions && (
                            <td className="px-4 py-3 text-center">
                              <button className="text-gray-400 hover:text-gray-600">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                              </button>
                            </td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              {tableConfig.showTableButtons && (
                <div className="flex flex-col space-y-2 mt-4">
                  <button 
                    onClick={tableConfig.onAddRow}
                    className="px-3 py-1.5 text-xs text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-left w-fit"
                  >
                    Add Row
                  </button>
                  <button 
                    onClick={tableConfig.onClearTable}
                    className="px-3 py-1.5 text-xs text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-left w-fit"
                  >
                    Clear Table
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Color Picker Section */}
          {colorPicker && (
            <>
              <div className="border-t border-gray-200 my-10"></div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {colorPicker.label || 'Color'}
                </label>
                <div className="relative max-w-md">
                  <div
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="flex items-center w-full pl-3 py-1 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm mr-3 flex-shrink-0"
                      style={{ backgroundColor: colorPicker.value }}
                    ></div>
                    <span className="text-gray-500 text-sm">{colorPicker.placeholder || 'Choose a color'}</span>
                  </div>

                  {/* Color Picker Dropdown */}
                  {showColorPicker && (
                    <div className="absolute z-50 bottom-full mb-2 p-4 bg-white rounded-lg shadow-xl border border-gray-200 w-80">
                      {/* Swatches Section */}
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Swatches</h4>
                        <div className="grid grid-cols-6 gap-2">
                          {colorSwatches.map((color) => (
                            <button
                              key={color}
                              onClick={() => {
                                colorPicker.onChange(color);
                                setShowColorPicker(false);
                              }}
                              className="w-10 h-10 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                              style={{ backgroundColor: color }}
                            ></button>
                          ))}
                        </div>
                      </div>

                      {/* Color Picker Section */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Color Picker</h4>
                        <div className="space-y-3">
                          {/* Color Gradient Box */}
                          <div className="relative w-full h-48 rounded-lg overflow-hidden cursor-crosshair"
                            style={{
                              background: `linear-gradient(to bottom, transparent, black),
                                          linear-gradient(to right, white, ${colorPicker.value})`
                            }}
                          >
                          </div>

                          {/* Hue Slider */}
                          <input
                            type="range"
                            min="0"
                            max="360"
                            onChange={(e) => {
                              const hue = e.target.value;
                              const color = `hsl(${hue}, 100%, 50%)`;
                              colorPicker.onChange(color);
                            }}
                            className="w-full h-3 rounded-lg cursor-pointer"
                            style={{
                              background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                              appearance: 'none',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>

                      {/* Close Button */}
                      <button
                        onClick={() => setShowColorPicker(false)}
                        className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>

                {/* Click outside to close */}
                {showColorPicker && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowColorPicker(false)}
                  ></div>
                )}
              </div>
            </>
          )}

          {/* Edit and New Buttons - Bottom Right Corner */}
          {showEditNewButtons && (
            <div className="flex justify-end mt-6 pr-6 pb-2">
              <div className="flex items-center space-x-1">
                <button 
                  onClick={onEdit}
                  className="inline-flex items-center space-x-1 px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button 
                  onClick={onNew}
                  className="inline-flex items-center space-x-1 px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>New</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
