'use client';

import React, { useState, useEffect } from 'react';
import { Filter, X, ArrowUpDown, MessageCircle, Heart, Plus } from 'lucide-react';

export default function UserList() {
  const [searchId, setSearchId] = useState('');
  const [searchFullName, setSearchFullName] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  const [searchUserType, setSearchUserType] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState(1);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertAction, setAlertAction] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('users');
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      // Set default dummy data
      const defaultData = [
        { id: 'sobanhameed862@gmail.com', username: 'sobanhameed862', fullName: 'soban hameed', userType: 'System User', status: 'Active', lastUpdated: '1 d' },
        { id: 'U002', username: 'john.smith', fullName: 'John Smith', userType: 'Administrator', status: 'Active', lastUpdated: '2 d' },
        { id: 'U003', username: 'sarah.johnson', fullName: 'Sarah Johnson', userType: 'Manager', status: 'Inactive', lastUpdated: '3 d' },
      ];
      setUsers(defaultData);
      localStorage.setItem('users', JSON.stringify(defaultData));
    }
  }, []);

  // Listen for updates from localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('users');
      if (saved) {
        setUsers(JSON.parse(saved));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    const handleDataChange = () => {
      const saved = localStorage.getItem('users');
      if (saved) {
        setUsers(JSON.parse(saved));
      }
    };
    
    window.addEventListener('userDataChanged', handleDataChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userDataChanged', handleDataChange);
    };
  }, []);

  const handleDelete = (id) => {
    setAlertMessage('Are you sure you want to delete this user?');
    setAlertAction(() => () => {
      const updatedUsers = users.filter(item => item.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setAlertOpen(false);
    });
    setAlertOpen(true);
  };

  const filteredUsers = users.filter(user => {
    const id = user.id || '';
    const fullName = user.fullName || '';
    const username = user.username || '';
    const userType = user.userType || '';
    
    return (
      id.toLowerCase().includes(searchId.toLowerCase()) &&
      fullName.toLowerCase().includes(searchFullName.toLowerCase()) &&
      username.toLowerCase().includes(searchUsername.toLowerCase()) &&
      userType.toLowerCase().includes(searchUserType.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(paginatedUsers.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(u => u !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Active') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const clearFilters = () => {
    setSearchId('');
    setSearchFullName('');
    setSearchUsername('');
    setSearchUserType('');
    setActiveFilters(0);
    setShowFilter(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User</h1>
          </div>
          <button 
            onClick={() => {
              const event = new CustomEvent('setActiveContent', { detail: 'user-form' });
              window.dispatchEvent(event);
              window.history.pushState({ activeContent: 'user-form' }, '', '/');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add User</span>
          </button>
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
            <input
              type="text"
              value={searchFullName}
              onChange={(e) => {
                setSearchFullName(e.target.value);
                if (e.target.value) setActiveFilters(activeFilters + (searchFullName ? 0 : 1));
                else setActiveFilters(Math.max(0, activeFilters - 1));
              }}
              placeholder="Full Name"
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={searchUsername}
              onChange={(e) => {
                setSearchUsername(e.target.value);
                if (e.target.value) setActiveFilters(activeFilters + (searchUsername ? 0 : 1));
                else setActiveFilters(Math.max(0, activeFilters - 1));
              }}
              placeholder="Username"
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={searchUserType}
              onChange={(e) => {
                setSearchUserType(e.target.value);
                if (e.target.value) setActiveFilters(activeFilters + (searchUserType ? 0 : 1));
                else setActiveFilters(Math.max(0, activeFilters - 1));
              }}
              placeholder="User Type"
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

        {/* Users Table */}
        {paginatedUsers.length > 0 ? (
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
                        checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.fullName || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status || 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.userType || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.id && user.id.length > 20 ? `${user.id.substring(0, 20)}...` : user.id || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastUpdated || '-'}
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No User found with matching filters</h3>
            <p className="text-sm text-gray-600 mb-6">Clear filters to see all Users.</p>
            <button
              onClick={() => {
                const event = new CustomEvent('setActiveContent', { detail: 'user-form' });
                window.dispatchEvent(event);
                window.history.pushState({ activeContent: 'user-form' }, '', '/');
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Create a new User
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredUsers.length > 0 && (
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
