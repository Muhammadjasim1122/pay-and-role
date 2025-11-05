'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreVertical, Pencil, Trash2 } from 'lucide-react';

export default function EmployeeSeparation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [employeeSeparations, setEmployeeSeparations] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertAction, setAlertAction] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('employeeSeparations');
    if (saved) {
      setEmployeeSeparations(JSON.parse(saved));
    } else {
      // Set default dummy data
      const defaultData = [
        { id: 'SE001', employee: 'John Smith', company: 'ACME Corp', status: 'Pending', separationBeginsOn: '2024-02-20' },
        { id: 'SE002', employee: 'Sarah Johnson', company: 'ACME Corp', status: 'In Progress', separationBeginsOn: '2024-02-22' },
        { id: 'SE003', employee: 'Michael Brown', company: 'ACME Corp', status: 'Completed', separationBeginsOn: '2024-02-24' },
      ];
      setEmployeeSeparations(defaultData);
      localStorage.setItem('employeeSeparations', JSON.stringify(defaultData));
    }
  }, []);

  // Listen for updates from localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('employeeSeparations');
      if (saved) {
        setEmployeeSeparations(JSON.parse(saved));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events
    const handleDataChange = () => {
      const saved = localStorage.getItem('employeeSeparations');
      if (saved) {
        setEmployeeSeparations(JSON.parse(saved));
      }
    };
    
    window.addEventListener('separationDataChanged', handleDataChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('separationDataChanged', handleDataChange);
    };
  }, []);

  const handleEdit = (id) => {
    setOpenDropdown(null);
    const event = new CustomEvent('setActiveContent', { detail: `employee-separation-edit-${id}` });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: `employee-separation-edit-${id}`, editId: id }, '', '/');
  };

  const handleDelete = (id) => {
    setOpenDropdown(null);
    setAlertMessage('Are you sure you want to delete this separation?');
    setAlertAction(() => () => {
      const updatedSeparations = employeeSeparations.filter(item => item.id !== id);
      setEmployeeSeparations(updatedSeparations);
      localStorage.setItem('employeeSeparations', JSON.stringify(updatedSeparations));
      setAlertOpen(false);
    });
    setAlertOpen(true);
  };

  const filteredSeparations = employeeSeparations.filter(separation => {
    const employee = separation.employee || '';
    const company = separation.company || '';
    const status = separation.status || '';
    
    return (
      employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Separation</h1>
            <p className="text-sm text-gray-600 mt-1">Manage and track employee separation</p>
          </div>
          <button 
            onClick={() => {
              const event = new CustomEvent('setActiveContent', { detail: 'employee-separation-form' });
              window.dispatchEvent(event);
              window.history.pushState({ activeContent: 'employee-separation-form' }, '', '/');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Employee Separation</span>
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
                placeholder="Search by employee, company, or status..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Separation Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Separation Begins On
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSeparations.map((separation) => (
                  <tr key={separation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {separation.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{separation.employee || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {separation.company || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(separation.status)}`}>
                        {separation.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {separation.separationBeginsOn || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={(e) => {
                          if (openDropdown === separation.id) {
                            setOpenDropdown(null);
                          } else {
                            setOpenDropdown(separation.id);
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
                  const selectedSeparation = employeeSeparations.find(o => o.id === openDropdown);
                  if (!selectedSeparation) return null;
                  
                  return (
                    <>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(selectedSeparation.id);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Pencil className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(selectedSeparation.id);
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

