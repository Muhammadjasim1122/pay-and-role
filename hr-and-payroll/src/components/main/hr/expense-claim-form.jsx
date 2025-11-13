'use client';

import React, { useState, useEffect } from 'react';
import { Save, X, ChevronDown, Plus, Pencil, Settings } from 'lucide-react';

export default function ExpenseClaimForm({ isSidebarOpen = true, editId = null }) {
  const [activeTab, setActiveTab] = useState('expenses');
  const [showSeriesDropdown, setShowSeriesDropdown] = useState(false);
  const [showExpenseTypeDropdown, setShowExpenseTypeDropdown] = useState(null);
  const [expenseRows, setExpenseRows] = useState([
    { id: 1, expenseDate: '2025-11-02', expenseType: '', description: '', amount: '0.00', sanctionedAmount: '0.00' }
  ]);
  const [taxRows, setTaxRows] = useState([]);
  const [formData, setFormData] = useState({
    series: 'HR-EXP-.YYYY.-',
    fromEmployee: '',
    department: '',
    company: '',
    expenseApprover: '',
    approvalStatus: 'Draft',
    expenseType: '',
    amount: '',
    postingDate: '',
    project: '',
    description: '',
    isPaid: false,
    payableAccount: '',
    clearanceDate: '',
    remark: '',
    costCenter: '',
    task: ''
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const seriesSuggestions = [
    'HR-EXP-.YYYY.-',
    'HR-EXP-2024-00001',
    'HR-EXP-2024-00002',
    'HR-EXP-2024-00003'
  ];

  const expenseTypeSuggestions = ['Travel', 'Food', 'Accommodation', 'Office Supplies', 'Utilities', 'Miscellaneous'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSeriesSelect = (series) => {
    setFormData(prev => ({ ...prev, series }));
    setShowSeriesDropdown(false);
  };

  const handleExpenseTypeSelect = (rowId, value) => {
    handleExpenseRowChange(rowId, 'expenseType', value);
    setShowExpenseTypeDropdown(null);
  };

  const handleAddExpenseRow = () => {
    const newRow = {
      id: expenseRows.length + 1,
      expenseDate: '',
      expenseType: '',
      description: '',
      amount: '',
      sanctionedAmount: ''
    };
    setExpenseRows([...expenseRows, newRow]);
  };

  const handleExpenseRowChange = (id, field, value) => {
    setExpenseRows(expenseRows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleAddTaxRow = () => {
    const newRow = {
      id: taxRows.length + 1,
      accountHead: '',
      rate: '',
      amount: '',
      total: ''
    };
    setTaxRows([...taxRows, newRow]);
  };

  const handleTaxRowChange = (id, field, value) => {
    setTaxRows(taxRows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleSave = () => {
    if (!formData.fromEmployee || !formData.company || !formData.expenseApprover) {
      alert('Please fill in required fields!');
      return;
    }
    
    // Get existing claims from localStorage
    const saved = localStorage.getItem('expenseClaims');
    const existingClaims = saved ? JSON.parse(saved) : [];
    
    let updatedClaims;
    
    if (editId) {
      // Update existing claim
      updatedClaims = existingClaims.map(item => 
        item.id === editId ? { ...item, ...formData } : item
      );
      localStorage.setItem('expenseClaims', JSON.stringify(updatedClaims));
      setToastMessage('Expense claim updated successfully!');
    } else {
      // Add new claim
      const newClaim = {
        id: `EC${String(Date.now()).slice(-6)}`,
        employee: formData.fromEmployee,
        expenseType: formData.expenseType || '',
        amount: formData.amount || '',
        status: formData.approvalStatus,
        postingDate: formData.postingDate || '',
        company: formData.company,
        description: formData.description || '',
        project: formData.project || '',
        ...formData
      };
      updatedClaims = [...existingClaims, newClaim];
      localStorage.setItem('expenseClaims', JSON.stringify(updatedClaims));
      setToastMessage('Expense claim saved successfully!');
    }
    
    // Trigger custom event to refresh the list
    window.dispatchEvent(new CustomEvent('expenseClaimDataChanged'));
    
    setShowToast(true);
    
    setTimeout(() => {
      const event = new CustomEvent('setActiveContent', { detail: 'expense-claims' });
      window.dispatchEvent(event);
      window.history.pushState({ activeContent: 'expense-claims' }, '', '/');
    }, 500);
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'expense-claims' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'expense-claims' }, '', '/');
  };

  // Load data when editing
  useEffect(() => {
    if (editId && typeof window !== 'undefined') {
      const saved = localStorage.getItem('expenseClaims');
      if (saved) {
        const claims = JSON.parse(saved);
        const claimToEdit = claims.find(item => item.id === editId);
        if (claimToEdit) {
          setFormData(claimToEdit);
        }
      }
    }
  }, [editId]);

  return (
    <>
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in-0 slide-in-from-top-2">
          <div className="bg-white rounded-lg shadow-lg border border-green-200 px-4 py-3 pr-8 flex items-center gap-3 min-w-[300px]">
            <svg className="h-5 w-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-green-800">
              {toastMessage}
            </span>
            <button
              onClick={() => setShowToast(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    <div className={`bg-gray-50 min-h-full ${isSidebarOpen ? 'p-6' : 'p-6 min-h-screen'}`}>
      <div className={`mx-auto ${isSidebarOpen ? 'max-w-4xl' : 'max-w-full'}`}>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab('expenses')}
                className={`pb-3 px-1 text-sm font-medium ${
                  activeTab === 'expenses'
                    ? 'text-gray-900 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Expenses & Advances
              </button>
              <button
                onClick={() => setActiveTab('accounting')}
                className={`pb-3 px-1 text-sm font-medium ${
                  activeTab === 'accounting'
                    ? 'text-gray-900 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Accounting
              </button>
              <button
                onClick={() => setActiveTab('moreInfo')}
                className={`pb-3 px-1 text-sm font-medium ${
                  activeTab === 'moreInfo'
                    ? 'text-gray-900 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                More Info
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {activeTab === 'expenses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Series */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Series <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="series"
                      value={formData.series || ''}
                      onChange={handleInputChange}
                      onClick={() => setShowSeriesDropdown(!showSeriesDropdown)}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      placeholder="HR-EXP-.YYYY.-"
                    />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
                    {showSeriesDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {seriesSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSeriesSelect(suggestion)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty space for alignment */}
                <div></div>

                {/* From Employee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Employee <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fromEmployee"
                    value={formData.fromEmployee || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select employee"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select department"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter company name"
                  />
                </div>

                {/* Empty space for alignment */}
                <div></div>

                {/* Expense Approver */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expense Approver <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="expenseApprover"
                    value={formData.expenseApprover || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select approver"
                  />
                </div>

                {/* Approval Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Approval Status
                  </label>
                  <div className="relative">
                    <select
                      name="approvalStatus"
                      value={formData.approvalStatus || 'Draft'}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white pr-10"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'expenses' && (
              <div className="space-y-6">
                {/* Expenses Section */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Expenses</h3>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              <input type="checkbox" className="h-4 w-4 border-gray-300 rounded" />
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expense Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Expense Claim Type <span className="text-red-500">*</span>
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Amount <span className="text-red-500">*</span>
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sanctioned Amount</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                              <Settings className="h-5 w-5 text-gray-400 mx-auto" />
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {expenseRows.map((row) => (
                            <tr key={row.id}>
                              <td className="px-4 py-3">
                                <input type="checkbox" className="h-4 w-4 border-gray-300 rounded" />
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">{row.id}</td>
                              <td className="px-4 py-3">
                                <input
                                  type="date"
                                  value={row.expenseDate}
                                  onChange={(e) => handleExpenseRowChange(row.id, 'expenseDate', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={row.expenseType}
                                    onChange={(e) => handleExpenseRowChange(row.id, 'expenseType', e.target.value)}
                                    onFocus={() => setShowExpenseTypeDropdown(row.id)}
                                    onBlur={() => setTimeout(() => setShowExpenseTypeDropdown(null), 200)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm pr-8"
                                    placeholder="Select type"
                                  />
                                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                                  {showExpenseTypeDropdown === row.id && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
                                      {expenseTypeSuggestions.map((suggestion, index) => (
                                        <button
                                          key={index}
                                          onMouseDown={(e) => { e.preventDefault(); handleExpenseTypeSelect(row.id, suggestion); }}
                                          className="w-full text-left px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                                        >
                                          {suggestion}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  value={row.description}
                                  onChange={(e) => handleExpenseRowChange(row.id, 'description', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                  placeholder="Enter description"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  value={row.amount}
                                  onChange={(e) => handleExpenseRowChange(row.id, 'amount', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                  placeholder="Rs 0.00"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  value={row.sanctionedAmount}
                                  onChange={(e) => handleExpenseRowChange(row.id, 'sanctionedAmount', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                  placeholder="Rs 0.00"
                                />
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button className="text-gray-400 hover:text-gray-600">
                                  <Pencil className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                      <button 
                        onClick={handleAddExpenseRow}
                        className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Row</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Taxes & Charges Section */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-sm font-medium text-gray-900">Taxes & Charges</h3>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Expense Taxes and Charges</p>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              <input type="checkbox" className="h-4 w-4 border-gray-300 rounded" />
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Account Head <span className="text-red-500">*</span>
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                              <Settings className="h-5 w-5 text-gray-400 mx-auto" />
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {taxRows.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="px-6 py-16 text-center">
                                <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-500 text-sm">No Data</p>
                              </td>
                            </tr>
                          ) : (
                            taxRows.map((row) => (
                              <tr key={row.id}>
                                <td className="px-4 py-3">
                                  <input type="checkbox" className="h-4 w-4 border-gray-300 rounded" />
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900">{row.id}</td>
                                <td className="px-4 py-3">
                                  <input
                                    type="text"
                                    value={row.accountHead}
                                    onChange={(e) => handleTaxRowChange(row.id, 'accountHead', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                    placeholder="Select account"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    type="text"
                                    value={row.rate}
                                    onChange={(e) => handleTaxRowChange(row.id, 'rate', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                    placeholder="0.00"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    type="text"
                                    value={row.amount}
                                    onChange={(e) => handleTaxRowChange(row.id, 'amount', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                    placeholder="0.00"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    type="text"
                                    value={row.total}
                                    onChange={(e) => handleTaxRowChange(row.id, 'total', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                    placeholder="0.00"
                                  />
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <button className="text-gray-400 hover:text-gray-600">
                                    <Pencil className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                      <button 
                        onClick={handleAddTaxRow}
                        className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Row</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'accounting' && (
              <div className="space-y-6">
                {/* Accounting Details */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Accounting Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Posting Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Posting Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="postingDate"
                        value={formData.postingDate || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Is Paid */}
                    <div className="flex items-end">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="isPaid"
                          checked={formData.isPaid || false}
                          onChange={(e) => handleInputChange({ target: { name: 'isPaid', value: e.target.checked } })}
                          className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <label className="ml-2 block text-sm font-medium text-gray-700">
                          Is Paid
                        </label>
                      </div>
                    </div>

                    {/* Account */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account
                      </label>
                      <input
                        type="text"
                        name="payableAccount"
                        value={formData.payableAccount || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Select account"
                      />
                    </div>

                    {/* Clearance Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clearance Date
                      </label>
                      <input
                        type="date"
                        name="clearanceDate"
                        value={formData.clearanceDate || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Remark */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Remark
                      </label>
                      <textarea
                        name="remark"
                        value={formData.remark || ''}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter remark"
                      />
                    </div>
                  </div>
                </div>

                {/* Accounting Dimensions */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Accounting Dimensions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project
                      </label>
                      <input
                        type="text"
                        name="project"
                        value={formData.project || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Select project"
                      />
                    </div>

                    {/* Cost Center */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cost Center
                      </label>
                      <input
                        type="text"
                        name="costCenter"
                        value={formData.costCenter || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Select cost center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'moreInfo' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      name="status"
                      value={formData.status || formData.approvalStatus || 'Draft'}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white pr-10"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Task */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task
                  </label>
                  <input
                    type="text"
                    name="task"
                    value={formData.task || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select task"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
