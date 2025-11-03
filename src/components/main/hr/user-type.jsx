'use client';

import React, { useState, useEffect } from 'react';
import { Filter, X, ArrowUpDown, MessageCircle, Heart } from 'lucide-react';

export default function UserType() {
  const [searchId, setSearchId] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [userTypes, setUserTypes] = useState([]);
  const [selectedUserTypes, setSelectedUserTypes] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertAction, setAlertAction] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('userTypes');
    if (saved) {
      setUserTypes(JSON.parse(saved));
    } else {
      // Set default dummy data
      const defaultData = [
        { id: 'Employee Self Service', status: 'Custom', role: 'Employee Self Service', lastUpdated: '1d' },
        { id: 'Website User', status: 'Standard', role: '', lastUpdated: '1d' },
        { id: 'System User', status: 'Standard', role: '', lastUpdated: '1d' },
      ];
      setUserTypes(defaultData);
      localStorage.setItem('userTypes', JSON.stringify(defaultData));
    }
  }, []);

  // Listen for updates from localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('userTypes');
      if (saved) {
        setUserTypes(JSON.parse(saved));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    const handleDataChange = () => {
      const saved = localStorage.getItem('userTypes');
      if (saved) {
        setUserTypes(JSON.parse(saved));
      }
    };
    
    window.addEventListener('userTypeDataChanged', handleDataChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userTypeDataChanged', handleDataChange);
    };
  }, []);

  const handleDelete = (id) => {
    setAlertMessage('Are you sure you want to delete this user type?');
    setAlertAction(() => () => {
      const updatedUserTypes = userTypes.filter(item => item.id !== id);
      setUserTypes(updatedUserTypes);
      localStorage.setItem('userTypes', JSON.stringify(updatedUserTypes));
      setAlertOpen(false);
    });
    setAlertOpen(true);
  };

  const filteredUserTypes = userTypes.filter(userType => {
    const id = userType.id || '';
    return id.toLowerCase().includes(searchId.toLowerCase());
  });

  const totalPages = Math.ceil(filteredUserTypes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUserTypes = filteredUserTypes.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUserTypes(paginatedUserTypes.map(ut => ut.id));
    } else {
      setSelectedUserTypes([]);
    }
  };

  const handleSelectUserType = (id) => {
    if (selectedUserTypes.includes(id)) {
      setSelectedUserTypes(selectedUserTypes.filter(u => u !== id));
    } else {
      setSelectedUserTypes([...selectedUserTypes, id]);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Custom') return 'bg-blue-100 text-blue-800';
    if (status === 'Standard') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
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
            <h1 className="text-2xl font-bold text-gray-900">User Type</h1>
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
              <span>Filters</span>
              {activeFilters > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {activeFilters}
                </span>
              )}
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
              <ArrowUpDown className="h-4 w-4" />
            </button>
            <div className="ml-auto text-sm text-gray-600">
              Last Updated On
            </div>
          </div>
        </div>

        {/* User Types Table */}
        {paginatedUserTypes.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200">
              <div className="text-sm text-gray-600">
                {currentPage} of {totalPages}
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
                        checked={selectedUserTypes.length === paginatedUserTypes.length && paginatedUserTypes.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUserTypes.map((userType) => (
                    <tr key={userType.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedUserTypes.includes(userType.id)}
                          onChange={() => handleSelectUserType(userType.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{userType.id || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(userType.status)}`}>
                          {userType.status || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {userType.role || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {userType.lastUpdated || '-'}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No User Type found with matching filters</h3>
            <p className="text-sm text-gray-600 mb-6">Clear filters to see all User Types.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredUserTypes.length > 0 && (
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
