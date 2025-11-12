'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useRecruitment } from '../../../contexts/RecruitmentContext';

export default function JobOpening() {
  const { jobOpenings, deleteJobOpening } = useRecruitment();
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
    setAlertMessage('Are you sure you want to delete this job opening?');
    setAlertAction(() => async () => {
      try {
        await deleteJobOpening(id);
        setFeedback({ type: 'success', message: 'Job opening deleted successfully.' });
      } catch (error) {
        console.error('Failed to delete job opening:', error);
        setFeedback({ type: 'error', message: error.message || 'Failed to delete job opening. Please try again.' });
      } finally {
        setAlertOpen(false);
      }
    });
    setAlertOpen(true);
  };

  const handleEdit = (id) => {
    setOpenDropdown(null);
    // Navigate to edit form with the item ID
    const event = new CustomEvent('setActiveContent', { detail: `job-opening-edit-${id}` });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: `job-opening-edit-${id}`, editId: id }, '', '/');
  };


  const filteredOpenings = jobOpenings.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-2xl font-bold text-gray-900">Job Openings</h1>
            <p className="text-sm text-gray-600 mt-1">Manage and track job openings</p>
          </div>
          <button 
            onClick={() => {
              const event = new CustomEvent('setActiveContent', { detail: 'job-opening-form' });
              window.dispatchEvent(event);
              window.history.pushState({ activeContent: 'job-opening-form' }, '', '/');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Job Opening</span>
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
                placeholder="Search by title or department..."
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

        {/* Job Openings Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOpenings.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.displayId || job.sequence || job.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.applicants}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.postedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            if (openDropdown === job.id) {
                              setOpenDropdown(null);
                            } else {
                              setOpenDropdown(job.id);
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
                const selectedJob = jobOpenings.find(j => j.id === openDropdown);
                if (!selectedJob) return null;
                
                return (
                  <>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Edit clicked for:', selectedJob.id);
                        handleEdit(selectedJob.id);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <Pencil className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('View Details clicked for:', selectedJob.id);
                        handleViewDetails(selectedJob.id);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <Search className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Delete clicked for:', selectedJob.id);
                        handleDelete(selectedJob.id);
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

