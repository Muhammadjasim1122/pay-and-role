'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreVertical, Pencil, Trash2 } from 'lucide-react';

export default function EmployeeAdvance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [employeeAdvances, setEmployeeAdvances] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertAction, setAlertAction] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('employeeAdvances');
    if (saved) {
      setEmployeeAdvances(JSON.parse(saved));
    } else {
      // Set default dummy data
      const defaultData = [
        { id: 'EA001', employeeName: 'John Smith', company: 'Acme Corp', amount: '5000.00', status: 'Submitted', date: '2024-02-20' },
        { id: 'EA002', employeeName: 'Sarah Johnson', company: 'Tech Solutions', amount: '3000.00', status: 'Approved', date: '2024-02-22' },
        { id: 'EA003', employeeName: 'Michael Brown', company: 'Global Inc', amount: '2000.00', status: 'Draft', date: '2024-02-24' },
      ];
      setEmployeeAdvances(defaultData);
      localStorage.setItem('employeeAdvances', JSON.stringify(defaultData));
    }
  }, []);

  // Listen for updates from localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('employeeAdvances');
      if (saved) {
        setEmployeeAdvances(JSON.parse(saved));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events
    const handleDataChange = () => {
      const saved = localStorage.getItem('employeeAdvances');
      if (saved) {
        setEmployeeAdvances(JSON.parse(saved));
      }
    };
    
    window.addEventListener('employeeAdvanceDataChanged', handleDataChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('employeeAdvanceDataChanged', handleDataChange);
    };
  }, []);

  const handleEdit = (id) => {
    setOpenDropdown(null);
    const event = new CustomEvent('setActiveContent', { detail: `employee-advance-edit-${id}` });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: `employee-advance-edit-${id}`, editId: id }, '', '/');
  };

  const handleDelete = (id) => {
    setOpenDropdown(null);
    setAlertMessage('Are you sure you want to delete this employee advance?');
    setAlertAction(() => () => {
      const updatedAdvances = employeeAdvances.filter(item => item.id !== id);
      setEmployeeAdvances(updatedAdvances);
      localStorage.setItem('employeeAdvances', JSON.stringify(updatedAdvances));
      setAlertOpen(false);
    });
    setAlertOpen(true);
  };

  const filteredAdvances = employeeAdvances.filter(advance => {
    const employeeName = advance.employeeName || '';
    const id = advance.id || '';
    
    return (
      employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Submitted': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Advance</h1>
            <p className="text-sm text-gray-600 mt-1">Manage and track employee advances</p>
          </div>
          <button 
            onClick={() => {
              const event = new CustomEvent('setActiveContent', { detail: 'employee-advance-form' });
              window.dispatchEvent(event);
              window.history.pushState({ activeContent: 'employee-advance-form' }, '', '/');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Employee Advance</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by ID or Employee Name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5" />
              <span>Filter</span>
              {showFilter && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  1
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Employee Advances Table */}
        {filteredAdvances.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAdvances.map((advance) => (
                    <tr key={advance.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {advance.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{advance.employeeName || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {advance.company || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        ${advance.amount || '0.00'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(advance.status)}`}>
                          {advance.status || 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {advance.date || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={(e) => {
                            if (openDropdown === advance.id) {
                              setOpenDropdown(null);
                            } else {
                              setOpenDropdown(advance.id);
                              const rect = e.currentTarget.getBoundingClientRect();
                              const spaceAbove = rect.top;
                              const spaceBelow = window.innerHeight - rect.bottom;
                              if (spaceAbove > spaceBelow + 100) {
                                setDropdownStyle({
                                  bottom: `${window.innerHeight - rect.top}px`,
                                  right: `${window.innerWidth - rect.right}px`
                                });
                              } else {
                                setDropdownStyle({
                                  top: `${rect.bottom}px`,
                                  right: `${window.innerWidth - rect.right}px`
                                });
                              }
                            }
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Employee Advance found with matching filters</h3>
            <p className="text-sm text-gray-600 mb-6">Clear filters to see all Employee Advance.</p>
            <button
              onClick={() => {
                const event = new CustomEvent('setActiveContent', { detail: 'employee-advance-form' });
                window.dispatchEvent(event);
                window.history.pushState({ activeContent: 'employee-advance-form' }, '', '/');
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Create a new Employee Advance
            </button>
          </div>
        )}

        {/* Overlay Dropdown */}
        {openDropdown && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setOpenDropdown(null)}
            ></div>
            <div 
              className="fixed w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
              style={dropdownStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1">
                {(() => {
                  const selectedAdvance = employeeAdvances.find(a => a.id === openDropdown);
                  if (!selectedAdvance) return null;
                  
                  return (
                    <>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(selectedAdvance.id);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Pencil className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(selectedAdvance.id);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </>
                  );
                })()}
              </div>
            </div>
          </>
        )}

        {/* Custom Alert Modal */}
        {alertOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-sm p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Confirm Delete</h3>
              <p className="text-sm text-gray-600 mb-5">{alertMessage}</p>
              <div className="flex justify-end space-x-2">
                <button onClick={() => setAlertOpen(false)} className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">No</button>
                <button onClick={() => { if (alertAction) alertAction(); }} className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700">Yes, Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
