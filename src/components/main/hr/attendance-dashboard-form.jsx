'use client';

import React, { useState } from 'react';
import { Settings, Save, X } from 'lucide-react';
import { useDashboard } from '../../../contexts/DashboardContext';

export default function AttendanceDashboardForm({ dashboardType = 'attendance', isSidebarOpen = true }) {
  const { addDashboard } = useDashboard();
  const [dashboardName, setDashboardName] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [isStandard, setIsStandard] = useState(false);
  const [charts, setCharts] = useState([
    { id: 1, no: 1, chart: '', width: 'Half' }
  ]);
  const [isChartOptionsExpanded, setIsChartOptionsExpanded] = useState(false);
  const [chartOptions, setChartOptions] = useState('1');
  const [cards, setCards] = useState([
    { id: 1, no: 1, card: '' }
  ]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const addRow = () => {
    const newChart = { 
      id: charts.length + 1, 
      no: charts.length + 1,
      chart: '', 
      width: 'Half'
    };
    setCharts([...charts, newChart]); 
  };

  const updateChart = (id, field, value) => { 
    setCharts(charts.map(chart => 
      chart.id === id ? { ...chart, [field]: value } : chart
    ));
  };

  const addCardRow = () => {
    const newCard = {
      id: cards.length + 1,
      no: cards.length + 1,
      card: ''
    };
    setCards([...cards, newCard]);
  };

  const updateCard = (id, field, value) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const handleSave = () => {
    if (!dashboardName.trim()) {
      setAlertMessage('Dashboard name is required!');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    const dashboardData = {
      name: dashboardName.trim(),
      isDefault,
      isStandard,
      charts: charts.filter(chart => chart.chart.trim() !== ''),
      chartOptions,
      cards: cards.filter(card => card.card.trim() !== ''),
      type: dashboardType,
      createdAt: new Date().toISOString()
    };

    try {
      addDashboard(dashboardData);
      setAlertMessage('Dashboard saved successfully!');
      setAlertType('success');
      setShowAlert(true);
      
      // Reset form
      setDashboardName('');
      setIsDefault(false);
      setIsStandard(false);
      setCharts([{ id: 1, no: 1, chart: '', width: 'Half' }]);
      setCards([{ id: 1, no: 1, card: '' }]);
      setChartOptions('1');
      
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      setAlertMessage('Error saving dashboard!');
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleCancel = () => {
    const event = new CustomEvent('setActiveContent', { detail: 'attendance-dashboard' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'attendance-dashboard' }, '', '/');
  };

  return (
    <div className={`bg-gray-50 min-h-full ${isSidebarOpen ? 'p-6' : 'p-6 min-h-screen'}`}>
      {/* Alert */}
      {showAlert && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
          alertType === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <div className="flex items-center justify-between">
            <span>{alertMessage}</span>
            <button 
              onClick={() => setShowAlert(false)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className={`mx-auto ${isSidebarOpen ? 'max-w-4xl' : 'max-w-full'}`}>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {/* Dashboard Name Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dashboard Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={dashboardName}
              onChange={(e) => setDashboardName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter dashboard name"
            />
          </div>

          {/* Checkboxes */}
          <div className="mb-6 flex space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Is Default</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isStandard}
                onChange={(e) => setIsStandard(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Is Standard</span>
            </label>
          </div>

          {/* Charts Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Charts</h3>
              <button
                onClick={addRow}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Add Row
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">No.</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Chart</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Width
                      <button className="ml-2 text-gray-400 hover:text-gray-600">
                        <Settings className="h-4 w-4" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {charts.map((chart) => (
                    <tr key={chart.id}>
                      <td className="px-4 py-2 border-r border-gray-200">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      </td>
                      <td className="px-4 py-2 border-r border-gray-200">
                        <span className="text-sm text-gray-900">{chart.no}</span>
                      </td>
                      <td className="px-4 py-2 border-r border-gray-200">
                        <input
                          type="text"
                          value={chart.chart}
                          onChange={(e) => updateChart(chart.id, 'chart', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter chart name"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={chart.width}
                            onChange={(e) => updateChart(chart.id, 'width', e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart Options Section */}
          <div className="mb-6">
            <div className="flex items-center mb-4 cursor-pointer" onClick={() => setIsChartOptionsExpanded(!isChartOptionsExpanded)}>
              <h3 className="text-lg font-medium text-gray-900">Chart Options</h3>
              <button className="ml-2 text-gray-400 hover:text-gray-600">
                <svg className={`h-5 w-5 transition-transform ${isChartOptionsExpanded ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {isChartOptionsExpanded && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Number of Charts:</label>
                  <select
                    value={chartOptions}
                    onChange={(e) => setChartOptions(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Cards Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Cards</h3>
              <button
                onClick={addCardRow}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Add Row
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">No.</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Card</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cards.map((card) => (
                    <tr key={card.id}>
                      <td className="px-4 py-2 border-r border-gray-200">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      </td>
                      <td className="px-4 py-2 border-r border-gray-200">
                        <span className="text-sm text-gray-900">{card.no}</span>
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={card.card}
                          onChange={(e) => updateCard(card.id, 'card', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter card name"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
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
  );
}
