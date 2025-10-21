'use client';

import React, { useState } from 'react';
import { Plus, Edit3, ChevronUp } from 'lucide-react';
import ModuleSections from '../../../shared/ModuleSections';

export default function HRSettings() {
  // State for Reminders section
  const [isRemindersExpanded, setIsRemindersExpanded] = useState(true);
  const [workAnniversaries, setWorkAnniversaries] = useState(true);
  const [birthdays, setBirthdays] = useState(false);
  const [holidays, setHolidays] = useState(true);
  const [holidayFrequency, setHolidayFrequency] = useState('Weekly');
  const [sender, setSender] = useState('');

  // State for Leave and Expense Claim Settings section
  const [isLeaveExpenseExpanded, setIsLeaveExpenseExpanded] = useState(true);
  const [sendLeaveNotification, setSendLeaveNotification] = useState(true);
  const [leaveApprovalTemplate, setLeaveApprovalTemplate] = useState('');
  const [leaveStatusTemplate, setLeaveStatusTemplate] = useState('');
  const [leaveApproverMandatory, setLeaveApproverMandatory] = useState(true);
  const [restrictBackdatedLeave, setRestrictBackdatedLeave] = useState(false);
  const [preventSelfApprovalLeaves, setPreventSelfApprovalLeaves] = useState(false);
  const [preventSelfApprovalExpense, setPreventSelfApprovalExpense] = useState(false);
  const [expenseApproverMandatory, setExpenseApproverMandatory] = useState(true);
  const [showLeavesInCalendar, setShowLeavesInCalendar] = useState(false);
  const [autoLeaveEncashment, setAutoLeaveEncashment] = useState(false);

  // State for Shift, Hiring, and Employee Exit Settings
  const [allowMultipleShiftAssignments, setAllowMultipleShiftAssignments] = useState(false);
  const [checkVacanciesOnJobOffer, setCheckVacanciesOnJobOffer] = useState(false);
  const [sendInterviewReminder, setSendInterviewReminder] = useState(false);
  const [sendInterviewFeedbackReminder, setSendInterviewFeedbackReminder] = useState(false);
  const [hiringSender, setHiringSender] = useState('');
  const [exitQuestionnaireWebForm, setExitQuestionnaireWebForm] = useState('');
  const [exitQuestionnaireNotificationTemplate, setExitQuestionnaireNotificationTemplate] = useState('');

  // State for Attendance and Unlink Payment Settings
  const [allowEmployeeCheckinMobile, setAllowEmployeeCheckinMobile] = useState(true);
  const [allowGeolocationTracking, setAllowGeolocationTracking] = useState(false);
  const [unlinkPaymentOnCancellation, setUnlinkPaymentOnCancellation] = useState(false);
  const [standardWorkingHours, setStandardWorkingHours] = useState('0.000');

  // HR Settings shortcuts data
  const hrSettingsShortcuts = [
    { name: 'Employee', extra: '0 Active', link: '#' },
    { name: 'Leave Application', link: '#' },
    { name: 'HR Dashboard', link: '#' },
    { name: 'Recruitment Dashboard', link: '#' },
  ];

  // HR Settings reports and masters data
  const hrSettingsReportsAndMasters = [
    {
      category: 'Employee Lifecycle',
      items: [
        { name: 'Employee', link: '#', hasArrow: true },
        { name: 'Employee Onboarding', link: '#', hasArrow: true },
        { name: 'Employee Separation', link: '#', hasArrow: true },
        { name: 'Employee Grievance', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Leave Management',
      items: [
        { name: 'Leave Type', link: '#', hasArrow: true },
        { name: 'Leave Allocation', link: '#', hasArrow: true },
        { name: 'Leave Application', link: '#', hasArrow: true },
        { name: 'Holiday List', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Attendance',
      items: [
        { name: 'Attendance', link: '#', hasArrow: true },
        { name: 'Attendance Request', link: '#', hasArrow: true },
        { name: 'Employee Checkin', link: '#', hasArrow: true },
        { name: 'Shift Type', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Expense Management',
      items: [
        { name: 'Expense Claim', link: '#', hasArrow: true },
        { name: 'Employee Advance', link: '#', hasArrow: true },
        { name: 'Travel Request', link: '#', hasArrow: true },
        { name: 'Expense Type', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Performance',
      items: [
        { name: 'Appraisal', link: '#', hasArrow: true },
        { name: 'Appraisal Template', link: '#', hasArrow: true },
        { name: 'Goal', link: '#', hasArrow: true },
        { name: 'Training Program', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Reports',
      items: [
        { name: 'Employee Analytics', link: '#', hasArrow: true },
        { name: 'Leave Balance Report', link: '#', hasArrow: true },
        { name: 'Attendance Report', link: '#', hasArrow: true },
        { name: 'Expense Report', link: '#', hasArrow: true },
      ],
    },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          
          {/* Employee Settings Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Employee Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee Naming By */}
              <div>
                <label htmlFor="employee-naming" className="block text-sm font-medium text-gray-700 mb-1">
                  Employee Naming By
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="employee-naming"
                    className="mt-1 block w-full px-3 py-1  border border-gray-300 rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
                    value="Naming Series"
                    readOnly
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Employee records are created using the selected option
                </p>
              </div>

              {/* Retirement Age (In Years) */}
              <div>
                <label htmlFor="retirement-age" className="block text-sm font-medium text-gray-700 mb-1">
                  Retirement Age (In Years)
                </label>
                <input
                  type="number"
                  id="retirement-age"
                  className="mt-1 block w-full px-3 py-1 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder=""
                />
              </div>

              {/* Standard Working Hours */}
              <div>
                <label htmlFor="standard-working-hours" className="block text-sm font-medium text-gray-700 mb-1">
                  Standard Working Hours
                </label>
                <input
                  type="number"
                  id="standard-working-hours"
                  className="mt-1 block w-full px-3 py-1 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={standardWorkingHours}
                  onChange={(e) => setStandardWorkingHours(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="border-t pt-4 border-gray-200"></div>
          {/* Reminders Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Reminders</h2>
              <button
                onClick={() => setIsRemindersExpanded(!isRemindersExpanded)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronUp className={`h-5 w-5 text-gray-500 transition-transform ${isRemindersExpanded ? 'rotate-0' : 'rotate-180'}`} />
              </button>
            </div>

            {isRemindersExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Checkboxes and Frequency */}
                <div className="space-y-4">
                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={workAnniversaries}
                        onChange={(e) => setWorkAnniversaries(e.target.checked)}
                        className="h-3 w-3   text-black-600 focus:ring-black-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Work Anniversaries</span>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={birthdays}
                        onChange={(e) => setBirthdays(e.target.checked)}
                          className="h-3 w-3  text-black-600 focus:ring-black-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Birthdays</span>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={holidays}
                        onChange={(e) => setHolidays(e.target.checked)}
                        className="h-3 w-3 text-black-600 focus:ring-black-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Holidays</span>
                    </label>
                  </div>

                  {/* Holiday Frequency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Set the frequency for holiday reminders <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={holidayFrequency}
                        onChange={(e) => setHolidayFrequency(e.target.value)}
                        className="w-full px-3 py-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col">
                        <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Sender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sender
                  </label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                        className="w-full px-3 py-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder=""
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Leave and Expense Claim Settings Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Leave and Expense Claim Settings</h2>
              <button
                onClick={() => setIsLeaveExpenseExpanded(!isLeaveExpenseExpanded)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronUp className={`h-5 w-5 text-gray-500 transition-transform ${isLeaveExpenseExpanded ? 'rotate-0' : 'rotate-180'}`} />
              </button>
            </div>

            {isLeaveExpenseExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Send Leave Notification */}
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={sendLeaveNotification}
                      onChange={(e) => setSendLeaveNotification(e.target.checked)}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Send Leave Notification</span>
                  </label>

                  {/* Leave Approval Notification Template */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Leave Approval Notification Template <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={leaveApprovalTemplate}
                      onChange={(e) => setLeaveApprovalTemplate(e.target.value)}
                      className="w-full px-3 py-1 border border-red-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder=""
                    />
                  </div>

                  {/* Leave Status Notification Template */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Leave Status Notification Template <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={leaveStatusTemplate}
                      onChange={(e) => setLeaveStatusTemplate(e.target.value)}
                      className="w-full px-3 py-1 border border-red-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder=""
                    />
                  </div>

                  {/* Leave Approver Mandatory */}
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={leaveApproverMandatory}
                      onChange={(e) => setLeaveApproverMandatory(e.target.checked)}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Leave Approver Mandatory In Leave Application</span>
                  </label>

                  {/* Restrict Backdated Leave */}
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={restrictBackdatedLeave}
                      onChange={(e) => setRestrictBackdatedLeave(e.target.checked)}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Restrict Backdated Leave Application</span>
                  </label>

                  {/* Prevent Self Approval Leaves */}
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={preventSelfApprovalLeaves}
                      onChange={(e) => setPreventSelfApprovalLeaves(e.target.checked)}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Prevent self approval for leaves even if user has permissions</span>
                  </label>

                  {/* Prevent Self Approval Expense */}
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={preventSelfApprovalExpense}
                      onChange={(e) => setPreventSelfApprovalExpense(e.target.checked)}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Prevent self approval for expense claims even if user has permissions</span>
                  </label>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Expense Approver Mandatory */}
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={expenseApproverMandatory}
                      onChange={(e) => setExpenseApproverMandatory(e.target.checked)}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Expense Approver Mandatory In Expense Claim</span>
                  </label>

                  {/* Show Leaves In Calendar */}
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={showLeavesInCalendar}
                      onChange={(e) => setShowLeavesInCalendar(e.target.checked)}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Show Leaves Of All Department Members In Calendar</span>
                  </label>

                  {/* Auto Leave Encashment */}
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={autoLeaveEncashment}
                      onChange={(e) => setAutoLeaveEncashment(e.target.checked)}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Auto Leave Encashment</span>
                  </label>
                </div>
              </div>
            )}
          </div>
          
          {/* Shift Settings Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Shift Settings</h2>
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={allowMultipleShiftAssignments}
                  onChange={(e) => setAllowMultipleShiftAssignments(e.target.checked)}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Allow Multiple Shift Assignments for Same Date</span>
              </label>
            </div>
          </div>

          {/* Hiring Settings Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Hiring Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Checkboxes */}
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={checkVacanciesOnJobOffer}
                    onChange={(e) => setCheckVacanciesOnJobOffer(e.target.checked)}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Check Vacancies On Job Offer Creation</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={sendInterviewReminder}
                    onChange={(e) => setSendInterviewReminder(e.target.checked)}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Send Interview Reminder</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={sendInterviewFeedbackReminder}
                    onChange={(e) => setSendInterviewFeedbackReminder(e.target.checked)}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Send Interview Feedback Reminder</span>
                </label>
              </div>

              {/* Right Column - Sender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sender
                </label>
                <input
                  type="text"
                  value={hiringSender}
                  onChange={(e) => setHiringSender(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          {/* Employee Exit Settings Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Employee Exit Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Exit Questionnaire Web Form */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exit Questionnaire Web Form
                </label>
                <input
                  type="text"
                  value={exitQuestionnaireWebForm}
                  onChange={(e) => setExitQuestionnaireWebForm(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder=""
                />
              </div>

              {/* Exit Questionnaire Notification Template */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exit Questionnaire Notification Template
                </label>
                <input
                  type="text"
                  value={exitQuestionnaireNotificationTemplate}
                  onChange={(e) => setExitQuestionnaireNotificationTemplate(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          {/* Attendance Settings Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Attendance Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={allowEmployeeCheckinMobile}
                  onChange={(e) => setAllowEmployeeCheckinMobile(e.target.checked)}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Allow Employee Checkin from Mobile App</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={allowGeolocationTracking}
                  onChange={(e) => setAllowGeolocationTracking(e.target.checked)}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Allow Geolocation Tracking</span>
              </label>
            </div>
          </div>

          {/* Unlink Payment Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Unlink Payment</h2>
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={unlinkPaymentOnCancellation}
                  onChange={(e) => setUnlinkPaymentOnCancellation(e.target.checked)}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Unlink Payment on Cancellation of Employee Advance</span>
              </label>
            </div>
          </div>
          
      
        </div>

        {/* Comments Section - Outside main container */}
        <div className="   p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Comments</h2>
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-blue-700">mj</span>
            </div>
            <input
              type="text"
              placeholder="Type a reply / comment"
              className="flex-1 px-4 py-1 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Activity Section - Outside main container */}
        <div className=" p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Activity</h2>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
              + New Email
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute left-1 top-2 bottom-2 w-0.5 bg-gray-300"></div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-1.5 relative z-10"></div>
                <p className="text-sm text-gray-600">Administrator created this.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-1.5 relative z-10"></div>
                <p className="text-sm text-gray-600">Administrator last edited this · 6 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
