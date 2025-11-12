'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreVertical, Eye, Download, Pencil, Trash2 } from 'lucide-react';
import { useRecruitment } from '../../../contexts/RecruitmentContext';

export default function JobApplicant() {
  const { jobApplicants, deleteJobApplicant } = useRecruitment();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertAction, setAlertAction] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    if (!feedback.message) return;
    const timer = setTimeout(() => setFeedback({ type: '', message: '' }), 3500);
    return () => clearTimeout(timer);
  }, [feedback]);

  const handleViewDetails = (id) => {
    setOpenDropdown(null);
    // Navigate to recruitment details
    const event = new CustomEvent('setActiveContent', { detail: 'recruitment-details' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'recruitment-details' }, '', '/');
  };

  const handleDelete = (id) => {
    setOpenDropdown(null);
    setAlertMessage('Are you sure you want to delete this applicant?');
    setAlertAction(() => async () => {
      try {
        await deleteJobApplicant(id);
        setFeedback({ type: 'success', message: 'Applicant deleted successfully.' });
      } catch (error) {
        console.error('Failed to delete applicant:', error);
        setFeedback({ type: 'error', message: error.message || 'Failed to delete applicant. Please try again.' });
      } finally {
        setAlertOpen(false);
      }
    });
    setAlertOpen(true);
  };

  const handleEdit = (id) => {
    setOpenDropdown(null);
    // Navigate to edit form with the item ID
    const event = new CustomEvent('setActiveContent', { detail: `job-applicant-edit-${id}` });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: `job-applicant-edit-${id}`, editId: id }, '', '/');
  };


  const filteredApplicants = jobApplicants.filter(applicant => 
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Screening': return 'bg-yellow-100 text-yellow-800';
      case 'Interview': return 'bg-purple-100 text-purple-800';
      case 'Hired': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {feedback.message && (
          <div
            className={`mb-4 rounded-md border px-4 py-2 text-sm font-medium ${
              feedback.type === 'error'
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-green-200 bg-green-50 text-green-700'
            }`}
          >
            {feedback.message}
          </div>
        )}
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Applicants</h1>
            <p className="text-sm text-gray-600 mt-1">Manage and track job applicants</p>
          </div>
          <button 
            onClick={() => {
              const event = new CustomEvent('setActiveContent', { detail: 'job-applicant-form' });
              window.dispatchEvent(event);
              window.history.pushState({ activeContent: 'job-applicant-form' }, '', '/');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Applicant</span>
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
                placeholder="Search by name, email, or position..."
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

        {/* Applicants Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resume
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {applicant.displayId || applicant.sequence || applicant.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {applicant.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {applicant.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {applicant.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(applicant.status)}`}>
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {applicant.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Download className="h-5 w-5" />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            if (openDropdown === applicant.id) {
                              setOpenDropdown(null);
                            } else {
                              setOpenDropdown(applicant.id);
                              // Calculate position for overlay
                              const rect = e.currentTarget.getBoundingClientRect();
                              const spaceAbove = rect.top;
                              const spaceBelow = window.innerHeight - rect.bottom;
                              // Position dropdown above or below based on space
                              if (spaceAbove > spaceBelow + 100) {
                                // Show above
                                setDropdownStyle({
                                  bottom: `${window.innerHeight - rect.top}px`,
                                  right: `${window.innerWidth - rect.right}px`
                                });
                              } else {
                                // Show below
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
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                const selectedApplicant = jobApplicants.find(a => a.id === openDropdown);
                if (!selectedApplicant) return null;
                
                return (
                  <>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(selectedApplicant.id);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <Pencil className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(selectedApplicant.id);
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
  );
}

