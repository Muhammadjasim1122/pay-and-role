'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Filter, X, ArrowUpDown, MessageCircle, Heart, List, MoreVertical, Pencil, Trash2 } from 'lucide-react';

export default function Role() {
  const [searchId, setSearchId] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertAction, setAlertAction] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('roles');
    if (saved) {
      setRoles(JSON.parse(saved));
    } else {
      // Set default dummy data
      const defaultData = [
        { id: 'Employee Self Service', status: 'Enabled', isCustom: true, lastUpdated: '1d' },
        { id: 'Leave Approver', status: 'Enabled', isCustom: false, lastUpdated: '1d' },
        { id: 'Expense Approver', status: 'Enabled', isCustom: false, lastUpdated: '1d' },
        { id: 'Interviewer', status: 'Enabled', isCustom: false, lastUpdated: '1d' },
        { id: 'Supplier', status: 'Enabled', isCustom: false, lastUpdated: '1d' },
        { id: 'Analytics', status: 'Enabled', isCustom: false, lastUpdated: '1d' },
        { id: 'Academics User', status: 'Enabled', isCustom: false, lastUpdated: '1d' },
        { id: 'Fleet Manager', status: 'Enabled', isCustom: false, lastUpdated: '1d' },
        { id: 'HR User', status: 'Enabled', isCustom: false, lastUpdated: '1d' },
      ];
      setRoles(defaultData);
      localStorage.setItem('roles', JSON.stringify(defaultData));
    }
  }, []);

  // Listen for updates from localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('roles');
      if (saved) {
        setRoles(JSON.parse(saved));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    const handleDataChange = () => {
      const saved = localStorage.getItem('roles');
      if (saved) {
        setRoles(JSON.parse(saved));
      }
    };
    
    window.addEventListener('roleDataChanged', handleDataChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('roleDataChanged', handleDataChange);
    };
  }, []);

  const filteredRoles = roles.filter(role => {
    const id = role.id || '';
    return id.toLowerCase().includes(searchId.toLowerCase());
  });

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRoles = filteredRoles.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRoles(paginatedRoles.map(r => r.id));
    } else {
      setSelectedRoles([]);
    }
  };

  const handleSelectRole = (id) => {
    if (selectedRoles.includes(id)) {
      setSelectedRoles(selectedRoles.filter(r => r !== id));
    } else {
      setSelectedRoles([...selectedRoles, id]);
    }
  };

  const handleEdit = (id) => {
    setOpenDropdown(null);
    const event = new CustomEvent('setActiveContent', { detail: `role-edit-${id}` });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: `role-edit-${id}`, editId: id }, '', '/');
  };

  const handleDelete = (id) => {
    setOpenDropdown(null);
    setAlertMessage('Are you sure you want to delete this role?');
    setAlertAction(() => () => {
      const updatedRoles = roles.filter(item => item.id !== id);
      setRoles(updatedRoles);
      localStorage.setItem('roles', JSON.stringify(updatedRoles));
      setAlertOpen(false);
    });
    setAlertOpen(true);
  };

  const clearFilters = () => {
    setSearchId('');
    setActiveFilters(0);
    setShowFilter(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Role</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <List className="h-4 w-4" />
              <span>List View</span>
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            <button 
              onClick={() => {
                const event = new CustomEvent('setActiveContent', { detail: 'role-form' });
                window.dispatchEvent(event);
                window.history.pushState({ activeContent: 'role-form' }, '', '/');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Role</span>
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="text"
              value={searchId}
              onChange={(e) => {
                setSearchId(e.target.value);
                if (e.target.value) setActiveFilters(activeFilters + (searchId ? 0 : 1));
                else setActiveFilters(Math.max(0, activeFilters - 1));
              }}
              placeholder="ID"
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            {activeFilters > 0 && (
              <button
                onClick={clearFilters}
                className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Last Updated On
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Roles Table */}
        {paginatedRoles.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200">
              <div className="text-sm text-gray-600">
                {itemsPerPage} of {filteredRoles.length}
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedRoles.length === paginatedRoles.length && paginatedRoles.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Is Custom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedRoles.map((role) => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedRoles.includes(role.id)}
                            onChange={() => handleSelectRole(role.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-900">{role.id || '-'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-blue-600">{role.status || '-'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={role.isCustom || false}
                          readOnly
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {role.lastUpdated || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1 text-gray-400">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-xs">0</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-400">
                            <Heart className="h-4 w-4" />
                            <span className="text-xs">0</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={(e) => {
                            if (openDropdown === role.id) {
                              setOpenDropdown(null);
                            } else {
                              setOpenDropdown(role.id);
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Role found with matching filters</h3>
            <p className="text-sm text-gray-600 mb-6">Clear filters to see all Roles.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredRoles.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Show:</span>
              {[20, 100, 500, 2500].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setItemsPerPage(num);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 text-sm rounded-md border ${
                    itemsPerPage === num
                      ? 'bg-gray-800 text-white border-gray-800'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
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
                  const selectedRole = roles.find(r => r.id === openDropdown);
                  if (!selectedRole) return null;
                  
                  return (
                    <>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(selectedRole.id);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Pencil className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(selectedRole.id);
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
