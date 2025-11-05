'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreVertical, Pencil, Trash2 } from 'lucide-react';

export default function Goal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [goals, setGoals] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertAction, setAlertAction] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('goals');
    if (saved) {
      setGoals(JSON.parse(saved));
    } else {
      // Set default dummy data
      const defaultData = [
        { id: 'GO001', name: 'Goal 1', company: 'Acme Corp', description: 'Complete project milestone', enabled: true, date: '2024-02-20' },
        { id: 'GO002', name: 'Goal 2', company: 'Tech Inc', description: 'Achieve sales target', enabled: true, date: '2024-02-22' },
        { id: 'GO003', name: 'Goal 3', company: 'Global Solutions', description: 'Improve team performance', enabled: false, date: '2024-02-24' },
      ];
      setGoals(defaultData);
      localStorage.setItem('goals', JSON.stringify(defaultData));
    }
  }, []);

  // Listen for updates from localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('goals');
      if (saved) {
        setGoals(JSON.parse(saved));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('goalDataChanged', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('goalDataChanged', handleStorageChange);
    };
  }, []);

  const handleEdit = (id) => {
    setOpenDropdown(null);
    const event = new CustomEvent('setActiveContent', { detail: `goal-edit-${id}` });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: `goal-edit-${id}`, editId: id }, '', '/');
  };

  const handleDelete = (id) => {
    setOpenDropdown(null);
    setAlertMessage('Are you sure you want to delete this goal?');
    setAlertAction(() => () => {
      const updatedGoals = goals.filter(item => item.id !== id);
      setGoals(updatedGoals);
      localStorage.setItem('goals', JSON.stringify(updatedGoals));
      setAlertOpen(false);
    });
    setAlertOpen(true);
  };

  const filteredGoals = goals.filter(goal => {
    const name = goal.name || '';
    const company = goal.company || '';
    const description = goal.description || '';
    
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Goal</h1>
            <p className="text-sm text-gray-600 mt-1">Manage and track employee goals</p>
          </div>
          <button 
            onClick={() => {
              const event = new CustomEvent('setActiveContent', { detail: 'goal-form' });
              window.dispatchEvent(event);
              window.history.pushState({ activeContent: 'goal-form' }, '', '/');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Goal</span>
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
                placeholder="Search by name, company, or description..."
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

        {/* Goal Table */}
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
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enabled
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
                {filteredGoals.map((goal) => (
                  <tr key={goal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {goal.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{goal.name || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {goal.company || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {goal.description || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${goal.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {goal.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {goal.date || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={(e) => {
                          if (openDropdown === goal.id) {
                            setOpenDropdown(null);
                          } else {
                            setOpenDropdown(goal.id);
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
                  const selectedGoal = goals.find(o => o.id === openDropdown);
                  if (!selectedGoal) return null;
                  
                  return (
                    <>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(selectedGoal.id);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Pencil className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(selectedGoal.id);
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

