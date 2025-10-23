'use client';

import React, { useState } from 'react';
import { Settings, Save, X } from 'lucide-react';
import { useDashboard } from '../../../contexts/DashboardContext';

export default function LifecycleDashboardForm({ dashboardType = 'lifecycle', isSidebarOpen = true }) {
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
    // Navigate back to the appropriate dashboard based on type
    const targetContent = 'lifecycle-dashboard';
    const event = new CustomEvent('setActiveContent', { detail: targetContent });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: targetContent }, '', '/');
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
              placeholder=""
            />
          </div>

          {/* Is Default Checkbox */}
          <div className="mb-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Is Default</span>
            </label>
          </div>

          {/* Is Standard Checkbox */}
          <div className="mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isStandard}
                onChange={(e) => setIsStandard(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Is Standard</span>
            </label>
          </div>

          {/* Charts Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Charts</h3>
            
            {/* Table */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="col-span-1 flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                </div>
                <div className="col-span-1 text-sm font-medium text-gray-500">No.</div>
                <div className="col-span-6 text-sm font-medium text-gray-500">Chart</div>
                <div className="col-span-3 text-sm font-medium text-gray-500">Width</div>
                <div className="col-span-1 flex justify-end">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-200">
                {charts.map((chart) => (
                  <div 
                    key={chart.id}
                    className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50"
                  >
                    <div className="col-span-1 flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    </div>
                    <div className="col-span-1 flex items-center">
                      <span className="text-sm text-blue-600">{chart.no}</span>
                    </div>
                    <div className="col-span-6 flex items-center">
                      <input
                        type="text"
                        value={chart.chart}
                        onChange={(e) => updateChart(chart.id, 'chart', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder=""
                      />
                    </div>
                    <div className="col-span-3 flex items-center">
                      <span className="text-sm text-gray-900">{chart.width}</span>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Row Button */}
            <button
              onClick={addRow}
              className="mt-4 text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Add Row
            </button>
          </div>

          {/* Chart Options Section */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Chart Options</h3>
            
            {/* Expandable/Collapsible Box */}
            <textarea
              value={chartOptions}
              onChange={(e) => setChartOptions(e.target.value)}
              className={`w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2 font-mono transition-all ${
                isChartOptionsExpanded ? 'h-48' : 'h-12'
              }`}
              placeholder=""
            />

            {/* Description Text */}
            <p className="text-sm text-gray-500 mb-2">
              Set Default Options for all charts on this Dashboard (Ex: "colors": ["#d1d8dd", "#ff5858"])
            </p>

            {/* Expand/Collapse Button */}
            <button 
              onClick={() => setIsChartOptionsExpanded(!isChartOptionsExpanded)}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              {isChartOptionsExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>

          {/* Cards Section */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Cards</h3>
            
            {/* Table */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="col-span-1 flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                </div>
                <div className="col-span-1 text-sm font-medium text-gray-500">No.</div>
                <div className="col-span-9 text-sm font-medium text-gray-500">Card</div>
                <div className="col-span-1 flex justify-end">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-200">
                {cards.map((card) => (
                  <div 
                    key={card.id}
                    className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50"
                  >
                    <div className="col-span-1 flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    </div>
                    <div className="col-span-1 flex items-center">
                      <span className="text-sm text-blue-600">{card.no}</span>
                    </div>
                    <div className="col-span-9 flex items-center">
                      <input
                        type="text"
                        value={card.card}
                        onChange={(e) => updateCard(card.id, 'card', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Card"
                      />
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Row Button */}
            <button
              onClick={addCardRow}
              className="mt-4 text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Add Row
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
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
              <span>Save Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
