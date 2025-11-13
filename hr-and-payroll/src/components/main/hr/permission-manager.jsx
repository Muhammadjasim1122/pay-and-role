'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreVertical, Pencil, Trash2 } from 'lucide-react';

export default function PermissionManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [permissions, setPermissions] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertAction, setAlertAction] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('permissions');
    if (saved) {
      setPermissions(JSON.parse(saved));
    } else {
      // Set default dummy data
      const defaultData = [
        { id: 'PM001', name: 'User Management', role: 'Administrator', enabled: true, description: 'Manage users and their permissions' },
        { id: 'PM002', name: 'HR Management', role: 'HR Manager', enabled: true, description: 'Manage HR related operations' },
        { id: 'PM003', name: 'View Reports', role: 'Employee', enabled: true, description: 'View system reports' },
      ];
      setPermissions(defaultData);
      localStorage.setItem('permissions', JSON.stringify(defaultData));
    }
  }, []);

  // Listen for updates from localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('permissions');
      if (saved) {
        setPermissions(JSON.parse(saved));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events
    const handleDataChange = () => {
      const saved = localStorage.getItem('permissions');
      if (saved) {
        setPermissions(JSON.parse(saved));
      }
    };
    
    window.addEventListener('permissionDataChanged', handleDataChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('permissionDataChanged', handleDataChange);
    };
  }, []);

  const handleEdit = (id) => {
    setOpenDropdown(null);
    const event = new CustomEvent('setActiveContent', { detail: `permission-manager-edit-${id}` });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: `permission-manager-edit-${id}`, editId: id }, '', '/');
  };

  const handleDelete = (id) => {
    setOpenDropdown(null);
    setAlertMessage('Are you sure you want to delete this permission?');
    setAlertAction(() => () => {
      const updatedPermissions = permissions.filter(item => item.id !== id);
      setPermissions(updatedPermissions);
      localStorage.setItem('permissions', JSON.stringify(updatedPermissions));
      setAlertOpen(false);
    });
    setAlertOpen(true);
  };

  const filteredPermissions = permissions.filter(permission => {
    const name = permission.name || '';
    const role = permission.role || '';
    const description = permission.description || '';
    
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Permission Manager</h1>
            <p className="text-sm text-gray-600 mt-1">Manage and track permissions</p>
          </div>
          <button 
            onClick={() => {
              const event = new CustomEvent('setActiveContent', { detail: 'permission-manager-form' });
              window.dispatchEvent(event);
              window.history.pushState({ activeContent: 'permission-manager-form' }, '', '/');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Permission</span>
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
                placeholder="Search by name, role, or description..."
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

        {/* Permissions Table */}
        {filteredPermissions.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enabled
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPermissions.map((permission) => (
                    <tr key={permission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {permission.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{permission.name || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {permission.role || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {permission.description || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${permission.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {permission.enabled ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={(e) => {
                            if (openDropdown === permission.id) {
                              setOpenDropdown(null);
                            } else {
                              setOpenDropdown(permission.id);
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Permission found with matching filters</h3>
            <p className="text-sm text-gray-600 mb-6">Clear filters to see all Permissions.</p>
            <button
              onClick={() => {
                const event = new CustomEvent('setActiveContent', { detail: 'permission-manager-form' });
                window.dispatchEvent(event);
                window.history.pushState({ activeContent: 'permission-manager-form' }, '', '/');
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Create a new Permission
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
                  const selectedPermission = permissions.find(p => p.id === openDropdown);
                  if (!selectedPermission) return null;
                  
                  return (
                    <>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(selectedPermission.id);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Pencil className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(selectedPermission.id);
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

