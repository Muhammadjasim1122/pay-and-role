'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Plus, Trash2, Loader2, RefreshCcw, CalendarPlus } from 'lucide-react';
import { holidayListAPI } from '../../../../lib/api';

const COLOR_SWATCHES = [
  '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444',
  '#EC4899', '#22C55E', '#2563EB', '#F97316', '#0EA5E9',
  '#06B6D4', '#84CC16'
];

const createRow = () => ({ id: `${Date.now()}-${Math.random()}`, date: '', description: '' });

export default function HolidayList() {
  const [holidayListName, setHolidayListName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [holidays, setHolidays] = useState([createRow()]);
  const [totalHolidays, setTotalHolidays] = useState(holidays.length);

  useEffect(() => {
    setTotalHolidays(holidays.length);
  }, [holidays]);

  const cleanHolidays = useMemo(() => {
    return holidays
      .map(({ date, description }) => {
        if (!date || !description.trim()) {
          return null;
        }

        const parsed = new Date(date);
        if (Number.isNaN(parsed.getTime())) {
          return null;
        }

        return {
          date: parsed.toISOString(),
          description: description.trim(),
        };
      })
      .filter(Boolean);
  }, [holidays]);

  const [alert, setAlert] = useState({ type: '', message: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingLists, setIsLoadingLists] = useState(false);
  const [holidayLists, setHolidayLists] = useState([]);

  const clearAlert = useCallback(() => setAlert({ type: '', message: '' }), []);

  const showAlert = useCallback((type, message) => {
    setAlert({ type, message });
    setTimeout(clearAlert, 4000);
  }, [clearAlert]);

  useEffect(() => {
    if (showColorPicker) {
      const handleEsc = (event) => {
        if (event.key === 'Escape') {
          setShowColorPicker(false);
        }
      };
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
    return undefined;
  }, [showColorPicker]);

  const fetchHolidayLists = useCallback(async () => {
    try {
      setIsLoadingLists(true);
      const response = await holidayListAPI.getAll({ limit: 50 });
      if (response?.success && Array.isArray(response.data)) {
        setHolidayLists(response.data);
      } else {
        setHolidayLists([]);
      }
    } catch (error) {
      console.error('Failed to fetch holiday lists:', error);
      showAlert('error', error.message || 'Failed to load holiday lists.');
      setHolidayLists([]);
    } finally {
      setIsLoadingLists(false);
    }
  }, [showAlert]);

  useEffect(() => {
    fetchHolidayLists();
  }, [fetchHolidayLists]);

  const resetForm = () => {
    setHolidayListName('');
    setFromDate('');
    setToDate('');
    setSelectedColor('#3B82F6');
    setHolidays([createRow()]);
    setShowColorPicker(false);
  };

  const addHolidayRow = () => {
    setHolidays((prev) => [...prev, createRow()]);
    setTotalHolidays((prev) => prev + 1);
  };

  const removeHolidayRow = (id) => {
    setHolidays((prev) => {
      if (prev.length <= 1) {
        return prev;
      }
      const updated = prev.filter((row) => row.id !== id);
      setTotalHolidays(updated.length);
      return updated;
    });
  };

  const updateHolidayRow = (id, field, value) => {
    setHolidays((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const validate = () => {
    if (!holidayListName.trim()) {
      showAlert('error', 'Holiday List Name is required.');
      return false;
    }

    if (!fromDate) {
      showAlert('error', 'From Date is required.');
      return false;
    }

    if (!toDate) {
      showAlert('error', 'To Date is required.');
      return false;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (from > to) {
      showAlert('error', 'To Date must be on or after From Date.');
      return false;
    }
    
    return true;
  };

  const handleSave = async () => {
    if (isSaving) return;
    if (!validate()) return;

    const payload = {
      holidayListName: holidayListName.trim(),
      fromDate: new Date(fromDate).toISOString(),
      toDate: new Date(toDate).toISOString(),
      color: selectedColor,
      totalHolidays: cleanHolidays.length,
      holidays: cleanHolidays,
    };

    try {
      setIsSaving(true);
      const response = await holidayListAPI.create(payload);
      if (response?.success) {
        showAlert('success', 'Holiday list saved successfully.');
        resetForm();
        if (response.data) {
          setHolidayLists((prev) => [response.data, ...prev]);
        } else {
          fetchHolidayLists();
        }
      } else {
        showAlert('error', 'Failed to save holiday list.');
      }
    } catch (error) {
      console.error('Failed to save holiday list:', error);
      showAlert('error', error.message || 'Failed to save holiday list.');
    } finally {
      setIsSaving(false);
    }
  };

  const populatedHolidayLists = useMemo(() => holidayLists || [], [holidayLists]);

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center space-x-2">
              <CalendarPlus className="h-6 w-6 text-blue-500" />
              <span>Holiday List</span>
            </h1>
            <p className="text-sm text-gray-600">Create and manage holiday lists that can be assigned to employees.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchHolidayLists}
              className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={isLoadingLists}
            >
              {isLoadingLists && <Loader2 className="h-4 w-4 animate-spin" />}
              <RefreshCcw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-600"
              disabled={isSaving}
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              <span>{isSaving ? 'Saving…' : 'Save Holiday List'}</span>
            </button>
          </div>
        </div>

        {alert.message && (
          <div
            className={`rounded-md px-4 py-3 text-sm font-medium ${
              alert.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {alert.message}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="holiday-list-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Holiday List Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="holiday-list-name"
                      value={holidayListName}
                      onChange={(e) => setHolidayListName(e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="E.g. 2025 Public Holidays"
                    />
                  </div>
                  <div>
                    <label htmlFor="from-date" className="block text-sm font-medium text-gray-700 mb-1">
                      From Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="from-date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="to-date" className="block text-sm font-medium text-gray-700 mb-1">
                      To Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="to-date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Holidays</label>
                    <input
                      type="number"
                      value={totalHolidays}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (Number.isNaN(value) || value <= 0) {
                          return;
                        }
                        const difference = value - holidays.length;
                        if (difference > 0) {
                          setHolidays((prev) => [
                            ...prev,
                            ...Array.from({ length: difference }, () => createRow()),
                          ]);
                        } else if (difference < 0) {
                          setHolidays((prev) => prev.slice(0, value));
                        }
                        setTotalHolidays(value);
                      }}
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min={1}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <div className="relative max-w-xs">
                      <button
                        type="button"
                        onClick={() => setShowColorPicker((prev) => !prev)}
                        className="flex w-full items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
                      >
                        <span
                          className="mr-3 h-6 w-6 rounded-full border-2 border-white shadow"
                          style={{ backgroundColor: selectedColor }}
                        />
                        <span>Select a color</span>
                      </button>
                      {showColorPicker && (
                        <div className="absolute z-30 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                          <div className="grid grid-cols-6 gap-2">
                            {COLOR_SWATCHES.map((color) => (
                              <button
                                type="button"
                                key={color}
                                onClick={() => {
                                  setSelectedColor(color);
                                  setShowColorPicker(false);
                                }}
                                className="h-8 w-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowColorPicker(false)}
                            className="mt-4 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                          >
                            Close
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Holidays</h2>
                    <p className="text-sm text-gray-600">Add the specific dates and descriptions that belong to this list.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addHolidayRow}
                    className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Row</span>
                  </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50 text-xs font-medium uppercase tracking-wider text-gray-500">
                      <tr>
                        <th className="px-4 py-3 text-left w-1/5">Date</th>
                        <th className="px-4 py-3 text-left">Description</th>
                        <th className="px-4 py-3 text-center w-12">Remove</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {holidays.map((row, index) => (
                        <tr key={row.id}>
                          <td className="px-4 py-2 align-top">
                            <input
                              type="date"
                              value={row.date}
                              onChange={(e) => updateHolidayRow(row.id, 'date', e.target.value)}
                              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-2 align-top">
                            <textarea
                              value={row.description}
                              onChange={(e) => updateHolidayRow(row.id, 'description', e.target.value)}
                              rows={2}
                              placeholder={`Holiday ${index + 1}`}
                              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-2 text-center align-top">
                            <button
                              type="button"
                              onClick={() => removeHolidayRow(row.id)}
                              className="rounded-md border border-gray-200 p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
                              disabled={holidays.length <= 1}
                              title="Remove row"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setHolidays([createRow()])}
                    className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    disabled={holidays.length <= 1 && !holidays[0].date && !holidays[0].description}
                  >
                    Clear Table
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="text-base font-semibold text-gray-900">Existing Holiday Lists</h2>
              <p className="text-sm text-gray-600">Recently created holiday lists are shown here.</p>

              {isLoadingLists ? (
                <div className="flex items-center justify-center py-12 text-gray-500">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="ml-2 text-sm">Loading…</span>
                </div>
              ) : populatedHolidayLists.length === 0 ? (
                <div className="py-12 text-center text-sm text-gray-500">
                  No holiday lists yet. Create your first list using the form.
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {populatedHolidayLists.map((list) => (
                    <div key={list._id} className="rounded-md border border-gray-200 p-3 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{list.holidayListName}</p>
                          <p className="text-xs text-gray-500">
                            {list.totalHolidays ?? list.holidays?.length ?? 0} holidays ·{' '}
                            {list.fromDate ? new Date(list.fromDate).toLocaleDateString() : '—'} -{' '}
                            {list.toDate ? new Date(list.toDate).toLocaleDateString() : '—'}
                          </p>
                        </div>
                        <span
                          className="inline-block h-4 w-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: list.color || '#3B82F6' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
