'use client';

import React, { useState } from 'react';
import { Plus, Edit3 } from 'lucide-react';

export default function Employee() {
  const [activeTab, setActiveTab] = useState('overview');
  const [series, setSeries] = useState('HR-EMP-');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [salutation, setSalutation] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [status, setStatus] = useState('Active');
  
  // Joining tab states
  const [jobApplicant, setJobApplicant] = useState('');
  const [offerDate, setOfferDate] = useState('');
  const [confirmationDate, setConfirmationDate] = useState('');
  const [contractEndDate, setContractEndDate] = useState('');
  const [noticedays, setNoticeDays] = useState('');
  const [dateOfRetirement, setDateOfRetirement] = useState('');
  
  // Address & Contacts tab states
  const [mobile, setMobile] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [preferredContactEmail, setPreferredContactEmail] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [relation, setRelation] = useState('');
  
  // Attendance & Leaves tab states
  const [attendanceDeviceId, setAttendanceDeviceId] = useState('');
  const [holidayList, setHolidayList] = useState('');
  const [applicableHolidayList, setApplicableHolidayList] = useState('');
  const [defaultShift, setDefaultShift] = useState('');
  const [expenseApprover, setExpenseApprover] = useState('');
  const [shiftRequestApprover, setShiftRequestApprover] = useState('');
  const [leaveApprover, setLeaveApprover] = useState('');
  
  // Salary tab states
  const [costToCompany, setCostToCompany] = useState('');
  const [payrollCostCenter, setPayrollCostCenter] = useState('');
  const [salaryCurrency, setSalaryCurrency] = useState('PKR');
  const [salaryMode, setSalaryMode] = useState('');
  
  // Personal Details tab states
  const [maritalStatus, setMaritalStatus] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [familyBackground, setFamilyBackground] = useState('');
  const [healthDetails, setHealthDetails] = useState('');
  const [healthInsuranceProvider, setHealthInsuranceProvider] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [dateOfIssue, setDateOfIssue] = useState('');
  const [validUpto, setValidUpto] = useState('');
  const [placeOfIssue, setPlaceOfIssue] = useState('');
  
  // Profile tab states
  const [bioCoverLetter, setBioCoverLetter] = useState('');
  
  // Employee Exit tab states
  const [resignationLetterDate, setResignationLetterDate] = useState('');
  const [exitInterviewHeldOn, setExitInterviewHeldOn] = useState('');
  const [leaveEncashed, setLeaveEncashed] = useState('');
  const [relievingDate, setRelievingDate] = useState('');
  const [newWorkplace, setNewWorkplace] = useState('');
  const [reasonForLeaving, setReasonForLeaving] = useState('');
  const [exitFeedback, setExitFeedback] = useState('');

  const tabs = [
    'Overview',
    'Joining',
    'Address & Contacts',
    'Attendance & Leaves',
    'Salary',
    'Personal Details',
    'Profile',
    'Employee Exit'
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Tabbed Navigation Header - Sticky */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 rounded-t-lg">
            <div className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'))}
                  className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {/* Overview Tab Content */}
            {activeTab === 'overview' && (
            <>
            {/* Three Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Column 1 */}
              <div className="space-y-6">
                {/* Series */}
                <div>
                  <label htmlFor="series" className="block text-sm font-medium text-gray-700 mb-1">
                    Series <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="series"
                      value={series}
                      onChange={(e) => setSeries(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* First Name */}
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Middle Name */}
                <div>
                  <label htmlFor="middle-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="middle-name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="date-of-birth" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="date-of-birth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Salutation */}
                <div>
                  <label htmlFor="salutation" className="block text-sm font-medium text-gray-700 mb-1">
                    Salutation
                  </label>
                  <input
                    type="text"
                    id="salutation"
                    value={salutation}
                    onChange={(e) => setSalutation(e.target.value)}
                    className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-6">
                {/* Date of Joining */}
                <div>
                  <label htmlFor="date-of-joining" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Joining <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="date-of-joining"
                    value={dateOfJoining}
                    onChange={(e) => setDateOfJoining(e.target.value)}
                    className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Left">Left</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Details Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">User Details</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* User ID */}
                <div>
                  <label htmlFor="user-id" className="block text-sm font-medium text-gray-700 mb-1">
                    User ID
                  </label>
                  <input
                    type="text"
                    id="user-id"
                    className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    System User (login) ID. If set, it will become default for all HR forms.
                  </p>
                </div>

                {/* Create User Button */}
                <div>
                  <button className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                    Create User
                  </button>
                </div>
              </div>
            </div>

            {/* Company Details Section */}
            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Company Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1 */}
                <div className="space-y-6">
                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      defaultValue="sdfsdf"
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      id="department"
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label htmlFor="employment-type" className="block text-sm font-medium text-gray-700 mb-1">
                      Employment Type
                    </label>
                    <input
                      type="text"
                      id="employment-type"
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                  {/* Designation */}
                  <div>
                    <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                      Designation
                    </label>
                    <input
                      type="text"
                      id="designation"
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Reports to */}
                  <div>
                    <label htmlFor="reports-to" className="block text-sm font-medium text-gray-700 mb-1">
                      Reports to
                    </label>
                    <input
                      type="text"
                      id="reports-to"
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-6">
                  {/* Branch */}
                  <div>
                    <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
                      Branch
                    </label>
                    <input
                      type="text"
                      id="branch"
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Grade */}
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                      Grade
                    </label>
                    <input
                      type="text"
                      id="grade"
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
            </>
            )}

            {/* Joining Tab Content */}
            {activeTab === 'joining' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Column 1 */}
                <div className="space-y-6">
                  {/* Job Applicant */}
                  <div>
                    <label htmlFor="job-applicant" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Applicant
                    </label>
                    <input
                      type="text"
                      id="job-applicant"
                      value={jobApplicant}
                      onChange={(e) => setJobApplicant(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Offer Date */}
                  <div>
                    <label htmlFor="offer-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Offer Date
                    </label>
                    <input
                      type="date"
                      id="offer-date"
                      value={offerDate}
                      onChange={(e) => setOfferDate(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                  {/* Confirmation Date */}
                  <div>
                    <label htmlFor="confirmation-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmation Date
                    </label>
                    <input
                      type="date"
                      id="confirmation-date"
                      value={confirmationDate}
                      onChange={(e) => setConfirmationDate(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Contract End Date */}
                  <div>
                    <label htmlFor="contract-end-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Contract End Date
                    </label>
                    <input
                      type="date"
                      id="contract-end-date"
                      value={contractEndDate}
                      onChange={(e) => setContractEndDate(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-6">
                  {/* Notice (days) */}
                  <div>
                    <label htmlFor="notice-days" className="block text-sm font-medium text-gray-700 mb-1">
                      Notice (days)
                    </label>
                    <input
                      type="number"
                      id="notice-days"
                      value={noticedays}
                      onChange={(e) => setNoticeDays(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Date Of Retirement */}
                  <div>
                    <label htmlFor="date-of-retirement" className="block text-sm font-medium text-gray-700 mb-1">
                      Date Of Retirement
                    </label>
                    <input
                      type="date"
                      id="date-of-retirement"
                      value={dateOfRetirement}
                      onChange={(e) => setDateOfRetirement(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Address & Contacts Tab Content */}
            {activeTab === 'address-contacts' && (
              <>
                {/* Contact Information - Three Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Column 1 */}
                  <div className="space-y-6">
                    {/* Mobile */}
                    <div>
                      <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile
                      </label>
                      <input
                        type="tel"
                        id="mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-6">
                    {/* Personal Email */}
                    <div>
                      <label htmlFor="personal-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Personal Email
                      </label>
                      <input
                        type="email"
                        id="personal-email"
                        value={personalEmail}
                        onChange={(e) => setPersonalEmail(e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Company Email */}
                    <div>
                      <label htmlFor="company-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Email
                      </label>
                      <input
                        type="email"
                        id="company-email"
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Provide Email Address registered in company
                      </p>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-6">
                    {/* Preferred Contact Email */}
                    <div>
                      <label htmlFor="preferred-contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Contact Email
                      </label>
                      <div className="relative">
                        <select
                          id="preferred-contact-email"
                          value={preferredContactEmail}
                          onChange={(e) => setPreferredContactEmail(e.target.value)}
                          className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select...</option>
                          <option value="personal">Personal Email</option>
                          <option value="company">Company Email</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Unsubscribed */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="unsubscribed"
                        checked={unsubscribed}
                        onChange={(e) => setUnsubscribed(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="unsubscribed" className="ml-2 text-sm font-medium text-gray-700">
                        Unsubscribed
                      </label>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-900">Address</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* First Row - Current Address and Permanent Address */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Current Address */}
                    <div>
                      <label htmlFor="current-address-main" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Address
                      </label>
                      <textarea
                        id="current-address-main"
                        rows={6}
                        className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Permanent Address */}
                    <div>
                      <label htmlFor="permanent-address-main" className="block text-sm font-medium text-gray-700 mb-1">
                        Permanent Address
                      </label>
                      <textarea
                        id="permanent-address-main"
                        rows={6}
                        className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>

                  {/* Second Row - Current Address Is and Permanent Address Is */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current Address Is */}
                    <div>
                      <label htmlFor="current-address-is" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Address Is
                      </label>
                      <input
                        type="text"
                        id="current-address-is"
                        value={currentAddress}
                        onChange={(e) => setCurrentAddress(e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Permanent Address Is */}
                    <div>
                      <label htmlFor="permanent-address-is" className="block text-sm font-medium text-gray-700 mb-1">
                        Permanent Address Is
                      </label>
                      <input
                        type="text"
                        id="permanent-address-is"
                        value={permanentAddress}
                        onChange={(e) => setPermanentAddress(e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact Section */}
                <div className="mb-8">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Emergency Contact</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Emergency Contact Name */}
                    <div>
                      <label htmlFor="emergency-contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        id="emergency-contact-name"
                        value={emergencyContactName}
                        onChange={(e) => setEmergencyContactName(e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Emergency Phone */}
                    <div>
                      <label htmlFor="emergency-phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Emergency Phone
                      </label>
                      <input
                        type="tel"
                        id="emergency-phone"
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Relation */}
                    <div>
                      <label htmlFor="relation" className="block text-sm font-medium text-gray-700 mb-1">
                        Relation
                      </label>
                      <input
                        type="text"
                        id="relation"
                        value={relation}
                        onChange={(e) => setRelation(e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Attendance & Leaves Tab Content */}
            {activeTab === 'attendance-leaves' && (
              <>
                {/* Top Section - Two Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Column 1 */}
                  <div className="space-y-6">
                    {/* Attendance Device ID */}
                    <div>
                      <label htmlFor="attendance-device-id" className="block text-sm font-medium text-gray-700 mb-1">
                        Attendance Device ID (Biometric/RF tag ID)
                      </label>
                      <input
                        type="text"
                        id="attendance-device-id"
                        value={attendanceDeviceId}
                        onChange={(e) => setAttendanceDeviceId(e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-6">
                    {/* Holiday List */}
                    <div>
                      <label htmlFor="holiday-list" className="block text-sm font-medium text-gray-700 mb-1">
                        Holiday List
                      </label>
                      <input
                        type="text"
                        id="holiday-list"
                        value={holidayList}
                        onChange={(e) => setHolidayList(e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Applicable Holiday List */}
                    <div>
                      <label htmlFor="applicable-holiday-list" className="block text-sm font-medium text-gray-700 mb-1">
                        Applicable Holiday List
                      </label>
                      <input
                        type="text"
                        id="applicable-holiday-list"
                        value={applicableHolidayList}
                        onChange={(e) => setApplicableHolidayList(e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Default Shift */}
                    <div>
                      <label htmlFor="default-shift" className="block text-sm font-medium text-gray-700 mb-1">
                        Default Shift
                      </label>
                      <input
                        type="text"
                        id="default-shift"
                        value={defaultShift}
                        onChange={(e) => setDefaultShift(e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Approvers Section */}
                <div className="mb-8">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Approvers</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-6">
                      {/* Expense Approver */}
                      <div>
                        <label htmlFor="expense-approver" className="block text-sm font-medium text-gray-700 mb-1">
                          Expense Approver
                        </label>
                        <input
                          type="text"
                          id="expense-approver"
                          value={expenseApprover}
                          onChange={(e) => setExpenseApprover(e.target.value)}
                          className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Leave Approver */}
                      <div>
                        <label htmlFor="leave-approver" className="block text-sm font-medium text-gray-700 mb-1">
                          Leave Approver
                        </label>
                        <input
                          type="text"
                          id="leave-approver"
                          value={leaveApprover}
                          onChange={(e) => setLeaveApprover(e.target.value)}
                          className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6">
                      {/* Shift Request Approver */}
                      <div>
                        <label htmlFor="shift-request-approver" className="block text-sm font-medium text-gray-700 mb-1">
                          Shift Request Approver
                        </label>
                        <input
                          type="text"
                          id="shift-request-approver"
                          value={shiftRequestApprover}
                          onChange={(e) => setShiftRequestApprover(e.target.value)}
                          className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Salary Tab Content */}
            {activeTab === 'salary' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Column 1 */}
                <div className="space-y-6">
                  {/* Cost to Company (CTC) */}
                  <div>
                    <label htmlFor="cost-to-company" className="block text-sm font-medium text-gray-700 mb-1">
                      Cost to Company (CTC)
                    </label>
                    <input
                      type="text"
                      id="cost-to-company"
                      value={costToCompany}
                      onChange={(e) => setCostToCompany(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Salary Currency */}
                  <div>
                    <label htmlFor="salary-currency" className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Currency
                    </label>
                    <input
                      type="text"
                      id="salary-currency"
                      value={salaryCurrency}
                      onChange={(e) => setSalaryCurrency(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Salary Mode */}
                  <div>
                    <label htmlFor="salary-mode" className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Mode
                    </label>
                    <div className="relative">
                      <select
                        id="salary-mode"
                        value={salaryMode}
                        onChange={(e) => setSalaryMode(e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Select...</option>
                        <option value="bank">Bank</option>
                        <option value="cash">Cash</option>
                        <option value="cheque">Cheque</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                  {/* Payroll Cost Center */}
                  <div>
                    <label htmlFor="payroll-cost-center" className="block text-sm font-medium text-gray-700 mb-1">
                      Payroll Cost Center
                    </label>
                    <input
                      type="text"
                      id="payroll-cost-center"
                      value={payrollCostCenter}
                      onChange={(e) => setPayrollCostCenter(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Personal Details Tab Content */}
            {activeTab === 'personal-details' && (
              <>
                {/* Top Section - Two Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Column 1 */}
                  <div className="space-y-6">
                    {/* Marital Status */}
                    <div>
                      <label htmlFor="marital-status" className="block text-sm font-medium text-gray-700 mb-1">
                        Marital Status
                      </label>
                      <div className="relative">
                        <select
                          id="marital-status"
                          value={maritalStatus}
                          onChange={(e) => setMaritalStatus(e.target.value)}
                          className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select...</option>
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Family Background */}
                    <div>
                      <label htmlFor="family-background" className="block text-sm font-medium text-gray-700 mb-1">
                        Family Background
                      </label>
                      <textarea
                        id="family-background"
                        value={familyBackground}
                        onChange={(e) => setFamilyBackground(e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Here you can maintain family details like name and occupation of parent, spouse and children
                      </p>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-6">
                    {/* Blood Group */}
                    <div>
                      <label htmlFor="blood-group" className="block text-sm font-medium text-gray-700 mb-1">
                        Blood Group
                      </label>
                      <div className="relative">
                        <select
                          id="blood-group"
                          value={bloodGroup}
                          onChange={(e) => setBloodGroup(e.target.value)}
                          className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select...</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Health Details */}
                    <div>
                      <label htmlFor="health-details" className="block text-sm font-medium text-gray-700 mb-1">
                        Health Details
                      </label>
                      <textarea
                        id="health-details"
                        value={healthDetails}
                        onChange={(e) => setHealthDetails(e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Here you can maintain height, weight, allergies, medical concerns etc
                      </p>
                    </div>
                  </div>
                </div>

                {/* Health Insurance Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-900">Health Insurance</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Health Insurance Provider */}
                    <div>
                      <label htmlFor="health-insurance-provider" className="block text-sm font-medium text-gray-700 mb-1">
                        Health Insurance Provider
                      </label>
                      <input
                        type="text"
                        id="health-insurance-provider"
                        value={healthInsuranceProvider}
                        onChange={(e) => setHealthInsuranceProvider(e.target.value)}
                        className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Passport Details Section */}
                <div className="mb-8">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Passport Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-6">
                      {/* Passport Number */}
                      <div>
                        <label htmlFor="passport-number" className="block text-sm font-medium text-gray-700 mb-1">
                          Passport Number
                        </label>
                        <input
                          type="text"
                          id="passport-number"
                          value={passportNumber}
                          onChange={(e) => setPassportNumber(e.target.value)}
                          className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Valid Upto */}
                      <div>
                        <label htmlFor="valid-upto" className="block text-sm font-medium text-gray-700 mb-1">
                          Valid Upto
                        </label>
                        <input
                          type="date"
                          id="valid-upto"
                          value={validUpto}
                          onChange={(e) => setValidUpto(e.target.value)}
                          className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6">
                      {/* Date of Issue */}
                      <div>
                        <label htmlFor="date-of-issue" className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Issue
                        </label>
                        <input
                          type="date"
                          id="date-of-issue"
                          value={dateOfIssue}
                          onChange={(e) => setDateOfIssue(e.target.value)}
                          className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Place of Issue */}
                      <div>
                        <label htmlFor="place-of-issue" className="block text-sm font-medium text-gray-700 mb-1">
                          Place of Issue
                        </label>
                        <input
                          type="text"
                          id="place-of-issue"
                          value={placeOfIssue}
                          onChange={(e) => setPlaceOfIssue(e.target.value)}
                          className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Profile Tab Content */}
            {activeTab === 'profile' && (
              <div className="mb-8">
                {/* Bio / Cover Letter */}
                <div>
                  <label htmlFor="bio-cover-letter" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio / Cover Letter
                  </label>
                  
                  {/* Rich Text Editor Toolbar */}
                  <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2 flex items-center gap-1 flex-wrap">
                    {/* Format Dropdown */}
                    <select className="px-2 py-1 text-sm border border-gray-300 rounded bg-white">
                      <option>Normal</option>
                      <option>Heading 1</option>
                      <option>Heading 2</option>
                      <option>Heading 3</option>
                    </select>

                    {/* Font Size */}
                    <select className="px-2 py-1 text-sm border border-gray-300 rounded bg-white">
                      <option>---</option>
                      <option>10</option>
                      <option>12</option>
                      <option>14</option>
                      <option>16</option>
                      <option>18</option>
                    </select>

                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Text Formatting Buttons */}
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Bold">
                      <span className="font-bold text-sm">B</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Italic">
                      <span className="italic text-sm">I</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Underline">
                      <span className="underline text-sm">U</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Strikethrough">
                      <span className="line-through text-sm">S</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Subscript">
                      <span className="text-sm">fx</span>
                    </button>

                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Color Buttons */}
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Text Color">
                      <span className="text-sm">A</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Background Color">
                      <span className="text-sm">🎨</span>
                    </button>

                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Quote and Code */}
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Quote">
                      <span className="text-sm">"</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Code">
                      <span className="text-sm font-mono">&lt;/&gt;</span>
                    </button>

                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Insert Buttons */}
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Insert Paragraph">
                      <span className="text-sm">¶</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Insert Link">
                      <span className="text-sm">🔗</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Insert Image">
                      <span className="text-sm">🖼️</span>
                    </button>

                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Lists */}
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Bullet List">
                      <span className="text-sm">≡</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Numbered List">
                      <span className="text-sm">1.</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Checklist">
                      <span className="text-sm">☑</span>
                    </button>

                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Alignment */}
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Align Left">
                      <span className="text-sm">≣</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Align Center">
                      <span className="text-sm">≣</span>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Align Right">
                      <span className="text-sm">≣</span>
                    </button>

                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Table Dropdown */}
                    <select className="px-2 py-1 text-sm border border-gray-300 rounded bg-white">
                      <option>Table</option>
                      <option>Insert Table</option>
                      <option>Delete Table</option>
                    </select>
                  </div>

                  {/* Text Area */}
                  <textarea
                    id="bio-cover-letter"
                    value={bioCoverLetter}
                    onChange={(e) => setBioCoverLetter(e.target.value)}
                    rows={15}
                    className="w-full px-3 py-2 rounded-b-md bg-white border border-t-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  
                  <p className="text-xs text-gray-500 mt-1">
                    Short biography for website and other publications.
                  </p>
                </div>

                {/* Educational Qualification Section */}
                <div className="mb-8 mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-900">Educational Qualification</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Education Table */}
                  <div>
                    <p className="text-sm text-gray-600 mb-3">Education</p>

                    {/* Table */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="w-12 px-4 py-3 text-left">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              No.
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              School/University
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Qualification
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Level
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Year of Passing
                            </th>
                            <th scope="col" className="w-12 px-4 py-3 text-center">
                              <button className="text-gray-400 hover:text-gray-600">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                              </button>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td colSpan="7" className="px-4 py-16 text-center">
                              <div className="flex flex-col items-center justify-center">
                                <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-500 text-sm">No Data</p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Add Row Button */}
                    <div className="mt-4">
                      <button className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                        Add Row
                      </button>
                    </div>
                  </div>
                </div>

                {/* Previous Work Experience Section */}
                <div className="mb-8 mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-900">Previous Work Experience</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* External Work History Table */}
                  <div>
                    <p className="text-sm text-gray-600 mb-3">External Work History</p>

                    {/* Table */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="w-12 px-4 py-3 text-left">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              No.
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Company
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Designation
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Salary
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Address
                            </th>
                            <th scope="col" className="w-12 px-4 py-3 text-center">
                              <button className="text-gray-400 hover:text-gray-600">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                              </button>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td colSpan="7" className="px-4 py-16 text-center">
                              <div className="flex flex-col items-center justify-center">
                                <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-500 text-sm">No Data</p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Add Row Button */}
                    <div className="mt-4">
                      <button className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                        Add Row
                      </button>
                    </div>
                  </div>
                </div>

                {/* History In Company Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-900">History In Company</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Internal Work History Table */}
                  <div>
                    <p className="text-sm text-gray-600 mb-3">Internal Work History</p>

                    {/* Table */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="w-12 px-4 py-3 text-left">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              No.
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Branch
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Department
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Designation
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              From Date
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              To Date
                            </th>
                            <th scope="col" className="w-12 px-4 py-3 text-center">
                              <button className="text-gray-400 hover:text-gray-600">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                              </button>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td colSpan="8" className="px-4 py-16 text-center">
                              <div className="flex flex-col items-center justify-center">
                                <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-500 text-sm">No Data</p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Add Row Button */}
                    <div className="mt-4">
                      <button className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                        Add Row
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Employee Exit Tab Content */}
            {activeTab === 'employee-exit' && (
              <div className="p-6">
                {/* First Row - Three columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Resignation Letter Date */}
                  <div>
                    <label htmlFor="resignation-letter-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Resignation Letter Date
                    </label>
                    <input
                      type="date"
                      id="resignation-letter-date"
                      value={resignationLetterDate}
                      onChange={(e) => setResignationLetterDate(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Exit Interview Held On */}
                  <div>
                    <label htmlFor="exit-interview-held-on" className="block text-sm font-medium text-gray-700 mb-1">
                      Exit Interview Held On
                    </label>
                    <input
                      type="date"
                      id="exit-interview-held-on"
                      value={exitInterviewHeldOn}
                      onChange={(e) => setExitInterviewHeldOn(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Leave Encashed */}
                  <div>
                    <label htmlFor="leave-encashed" className="block text-sm font-medium text-gray-700 mb-1">
                      Leave Encashed?
                    </label>
                    <select
                      id="leave-encashed"
                      value={leaveEncashed}
                      onChange={(e) => setLeaveEncashed(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value=""></option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>

                {/* Second Row - Two columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Relieving Date */}
                  <div>
                    <label htmlFor="relieving-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Relieving Date
                    </label>
                    <input
                      type="date"
                      id="relieving-date"
                      value={relievingDate}
                      onChange={(e) => setRelievingDate(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* New Workplace */}
                  <div>
                    <label htmlFor="new-workplace" className="block text-sm font-medium text-gray-700 mb-1">
                      New Workplace
                    </label>
                    <input
                      type="text"
                      id="new-workplace"
                      value={newWorkplace}
                      onChange={(e) => setNewWorkplace(e.target.value)}
                      className="w-full px-3 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Feedback Section */}
                <div className="mb-8">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Feedback</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Reason for Leaving */}
                    <div>
                      <label htmlFor="reason-for-leaving" className="block text-sm font-medium text-gray-700 mb-1">
                        Reason for Leaving
                      </label>
                      <textarea
                        id="reason-for-leaving"
                        rows={8}
                        value={reasonForLeaving}
                        onChange={(e) => setReasonForLeaving(e.target.value)}
                        className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Feedback */}
                    <div>
                      <label htmlFor="exit-feedback" className="block text-sm font-medium text-gray-700 mb-1">
                        Feedback
                      </label>
                      <textarea
                        id="exit-feedback"
                        rows={8}
                        value={exitFeedback}
                        onChange={(e) => setExitFeedback(e.target.value)}
                        className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        
        </div>
      </div>
    </div>
  );
}
