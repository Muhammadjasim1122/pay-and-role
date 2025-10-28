'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreVertical, Pencil, Trash2 } from 'lucide-react';

export default function ShiftRequest() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [shiftRequests, setShiftRequests] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('shiftRequests');
    if (saved) {
      setShiftRequests(JSON.parse(saved));
    } else {
      // Set default dummy data
      const defaultData = [
        { id: 'SS001', employee: 'John Smith', shiftType: 'Day Shift', startDate: '2024-03-01', endDate: '2024-03-31', status: 'Active' },
        { id: 'SS002', employee: 'Sarah Johnson', shiftType: 'Night Shift', startDate: '2024-03-01', endDate: '2024-03-31', status: 'Active' },
        { id: 'SS003', employee: 'Michael Brown', shiftType: 'Evening Shift', startDate: '2024-03-01', endDate: '2024-03-31', status: 'Inactive' },
      ];
      setShiftRequests(defaultData);
      localStorage.setItem('shiftRequests', JSON.stringify(defaultData));
    }
  }, []);

  // Listen for updates from localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('shiftRequests');
      if (saved) {
        setShiftRequests(JSON.parse(saved));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events
    const handleDataChange = () => {
      const saved = localStorage.getItem('shiftRequests');
      if (saved) {
        setShiftRequests(JSON.parse(saved));
      }
    };
    
    window.addEventListener('shiftRequestDataChanged', handleDataChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('shiftRequestDataChanged', handleDataChange);
    };
  }, []);

  const handleEdit = (id) => {
    setOpenDropdown(null);
    const event = new CustomEvent('setActiveContent', { detail: `shift-request-edit-${id}` });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: `shift-request-edit-${id}`, editId: id }, '', '/');
  };

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setOpenDropdown(null);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!pendingDeleteId) return;
    const updatedRequests = shiftRequests.filter(item => item.id !== pendingDeleteId);
    setShiftRequests(updatedRequests);
    localStorage.setItem('shiftRequests', JSON.stringify(updatedRequests));
    setPendingDeleteId(null);
    setConfirmOpen(false);
  };

  const cancelDelete = () => {
    setPendingDeleteId(null);
    setConfirmOpen(false);
  };

  const filteredRequests = shiftRequests.filter(request => {
    const employee = request.employee || '';
    const shiftType = request.shiftType || '';
    const status = request.status || '';
    
    return (
      employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shiftType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Shift Request</h1>
            <p className="text-sm text-gray-600 mt-1">Manage and track shift requests</p>
          </div>
          <button 
            onClick={() => {
              const event = new CustomEvent('setActiveContent', { detail: 'shift-request-form' });
              window.dispatchEvent(event);
              window.history.pushState({ activeContent: 'shift-request-form' }, '', '/');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Shift Request</span>
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
                placeholder="Search by employee, shift type, or status..."
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

        {/* Shift Request Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{request.employee || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.shiftType || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.startDate || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.endDate || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>{request.status || 'Active'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={(e) => {
                          if (openDropdown === request.id) {
                            setOpenDropdown(null);
                          } else {
                            setOpenDropdown(request.id);
                            const rect = e.currentTarget.getBoundingClientRect();
                            const spaceAbove = rect.top;
                            const spaceBelow = window.innerHeight - rect.bottom;
                            if (spaceAbove > spaceBelow + 100) {
                              setDropdownStyle({ bottom: `${window.innerHeight - rect.top}px`, right: `${window.innerWidth - rect.right}px` });
                            } else {
                              setDropdownStyle({ top: `${rect.bottom}px`, right: `${window.innerWidth - rect.right}px` });
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
            <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)}></div>
            <div className="fixed w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50" style={dropdownStyle} onClick={(e) => e.stopPropagation()}>
              <div className="py-1">
                {(() => {
                  const selectedRequest = shiftRequests.find(r => r.id === openDropdown);
                  if (!selectedRequest) return null;
                  return (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(selectedRequest.id); }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Pencil className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); requestDelete(selectedRequest.id); }}
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
      </div>

      {/* Confirm Delete Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={cancelDelete}>
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Delete Shift Request</h3>
            <p className="text-sm text-gray-600 mb-5">Are you sure you want to delete this shift request?</p>
            <div className="flex justify-end space-x-2">
              <button onClick={cancelDelete} className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={confirmDelete} className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

