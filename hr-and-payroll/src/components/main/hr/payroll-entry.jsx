'use client';

import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { usePayroll } from '../../../contexts/PayrollContext';

export default function PayrollEntry() {
  const { payrollEntries, deletePayrollEntry } = usePayroll();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const filteredEntries = payrollEntries.filter((entry) =>
    entry.employee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    setOpenDropdown(null);
    const event = new CustomEvent('setActiveContent', { detail: `payroll-entry-form` });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: `payroll-entry-form`, editId: id }, '', '/');
  };

  const handleDelete = (id) => {
    setOpenDropdown(null);
    setEntryToDelete(id);
    setShowDeleteModal(true);
    setDeleteError('');
  };

  const confirmDelete = async () => {
    if (!entryToDelete) return;
    setIsDeleting(true);
    setDeleteError('');
    try {
      await deletePayrollEntry(entryToDelete);
      setShowDeleteModal(false);
      setEntryToDelete(null);
    } catch (error) {
      setDeleteError(error.message || 'Failed to delete payroll entry. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-full mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by employee name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                showFilter
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4 inline mr-2" />
              Filter
            </button>
          </div>

          {/* Add Payroll Entry Button */}
          <button
            onClick={() => {
              const event = new CustomEvent('setActiveContent', { detail: 'payroll-entry-form' });
              window.dispatchEvent(event);
              window.history.pushState({ activeContent: 'payroll-entry-form' }, '', '/');
            }}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Payroll Entry</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
            <div className="col-span-1 flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            </div>
            <div className="col-span-2">Employee ID</div>
            <div className="col-span-3">Employee Name</div>
            <div className="col-span-2">Pay Period</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {filteredEntries.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                <p className="text-sm">No payroll entries found. Create your first payroll entry.</p>
              </div>
            ) : (
              filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-1 flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="text-sm text-gray-900">{entry.employeeId || '—'}</span>
                  </div>
                  <div className="col-span-3 flex items-center">
                    <span className="text-sm text-gray-900">{entry.employee || '—'}</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="text-sm text-gray-600">{entry.payPeriod || '—'}</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="text-sm text-gray-900">{entry.status || '—'}</span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          if (openDropdown === entry.id) {
                            setOpenDropdown(null);
                          } else {
                            setOpenDropdown(entry.id);
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
                      {openDropdown === entry.id && (
                        <div
                          className="fixed w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                          style={dropdownStyle}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="py-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleEdit(entry.id); }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                            >
                              <Pencil className="h-4 w-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-sm p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Delete Payroll Entry</h3>
              <p className="text-sm text-gray-600 mb-5">
                Are you sure you want to delete this payroll entry? This action cannot be undone.
              </p>
              {deleteError && (
                <div className="bg-red-100 border border-red-200 text-red-800 px-3 py-2 rounded-md text-sm mb-4">
                  {deleteError}
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

