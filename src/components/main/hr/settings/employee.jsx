'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Edit3, 
  X,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Link2,
  Image,
  Code,
  Quote,
  Upload as UploadIcon,
  Camera,
  Link as LinkIcon
} from 'lucide-react';
import { useEmployee } from '../../../../contexts/EmployeeContext';

export default function Employee() {
  const { addEmployee } = useEmployee();
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
  
  // Validation and alerts
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [touched, setTouched] = useState({});
  
  // Handle save
  const handleSave = () => {
    // Check required fields
    const missingFields = [];
    if (!firstName.trim()) missingFields.push('First Name');
    if (!gender.trim()) missingFields.push('Gender');
    if (!dateOfBirth) missingFields.push('Date of Birth');
    if (!dateOfJoining) missingFields.push('Date of Joining');
    
    if (missingFields.length > 0) {
      setValidationMessage(`Please fill the mandatory fields: ${missingFields.join(', ')}`);
      setShowValidationError(true);
      setTimeout(() => setShowValidationError(false), 5000);
      return;
    }
    
    // If validation passes, save the form
    try {
      const employeeData = {
        firstName,
        middleName,
        lastName,
        gender,
        dateOfBirth,
        salutation,
        dateOfJoining,
        status,
        // Add other form fields as needed
        designation: '', // You can add designation field if needed
        mobile,
        personalEmail,
        companyEmail,
        currentAddress,
        permanentAddress,
        emergencyContactName,
        emergencyPhone,
        relation,
        maritalStatus,
        bloodGroup,
        familyBackground,
        healthDetails,
        passportNumber,
        bioCoverLetter
      };
      
      addEmployee(employeeData);
      setShowSaveAlert(true);
      setTimeout(() => setShowSaveAlert(false), 3000);
      
      // Navigate back to employee list after successful save
      setTimeout(() => {
        const event = new CustomEvent('setActiveContent', { detail: 'employee-list' });
        window.dispatchEvent(event);
        window.history.pushState({ activeContent: 'employee-list' }, '', '/');
      }, 2000);
      
    } catch (error) {
      console.error('Error saving employee:', error);
      setValidationMessage('Error saving employee. Please try again.');
      setShowValidationError(true);
      setTimeout(() => setShowValidationError(false), 5000);
    }
  };
  
  // Mark field as touched
  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };
  
  // Check if field has error
  const hasError = (fieldName, value) => {
    return touched[fieldName] && !value;
  };
  
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

  // Dialog states for sidebar integration
  const [showToDoDialog, setShowToDoDialog] = useState(false);
  const [assignToMe, setAssignToMe] = useState(false);
  const [assignTo, setAssignTo] = useState('');
  const [assignToUserGroup, setAssignToUserGroup] = useState('');
  const [completeBy, setCompleteBy] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [todoComment, setTodoComment] = useState('');
  
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareUser, setShareUser] = useState('');
  const [showUserSuggestions, setShowUserSuggestions] = useState(false);
  const [sharedUsers, setSharedUsers] = useState([
    {
      name: 'Everyone',
      canRead: false,
      canWrite: false,
      canSubmit: true,
      canShare: false
    }
  ]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [attachmentToDelete, setAttachmentToDelete] = useState(null);

  const commentEditorRef = useRef(null);

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

  // Listen for save event from Header
  useEffect(() => {
    const handleSaveEvent = () => {
      handleSave();
    };

    window.addEventListener('saveEmployeeForm', handleSaveEvent);

    return () => {
      window.removeEventListener('saveEmployeeForm', handleSaveEvent);
    };
  }, [firstName, gender, dateOfBirth, dateOfJoining]); // Dependencies for validation

  // Set up dialog functions for sidebar integration
  useEffect(() => {
    const handleOpenToDoDialog = () => {
      setShowToDoDialog(true);
    };

    const handleOpenUploadDialog = () => {
      setShowUploadDialog(true);
    };

    const handleOpenShareDialog = () => {
      setShowShareDialog(true);
    };

    const handleShowDeleteConfirm = (event) => {
      if (event.detail && event.detail.index !== undefined) {
        setAttachmentToDelete(event.detail.index);
        setShowDeleteConfirm(true);
      }
    };

    // Set up global functions
    window.openToDoDialog = () => {
      setShowToDoDialog(true);
    };
    
    window.openUploadDialog = () => {
      setShowUploadDialog(true);
    };

    window.openShareDialog = () => {
      setShowShareDialog(true);
    };

    // Listen for custom events
    window.addEventListener('openToDoDialog', handleOpenToDoDialog, true);
    window.addEventListener('openUploadDialog', handleOpenUploadDialog, true);
    window.addEventListener('openShareDialog', handleOpenShareDialog, true);
    window.addEventListener('showDeleteAttachmentConfirm', handleShowDeleteConfirm, true);

    return () => {
      window.removeEventListener('openToDoDialog', handleOpenToDoDialog, true);
      window.removeEventListener('openUploadDialog', handleOpenUploadDialog, true);
      window.removeEventListener('openShareDialog', handleOpenShareDialog, true);
      window.removeEventListener('showDeleteAttachmentConfirm', handleShowDeleteConfirm, true);
      delete window.openToDoDialog;
      delete window.openUploadDialog;
      delete window.openShareDialog;
    };
  }, []);

  // Dialog handler functions
  const handleFormatText = (command, value = null) => {
    document.execCommand(command, false, value);
    commentEditorRef.current?.focus();
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setUploadFiles(prev => [...prev, ...files.map(f => ({ name: f.name, size: f.size, file: f }))]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadFiles(prev => [...prev, ...files.map(f => ({ name: f.name, size: f.size, file: f }))]);
  };

  const handleUpload = () => {
    console.log('Uploading files:', uploadFiles);
    
    // If uploading from employee page
    if (window.location.pathname.includes('employee') && uploadFiles.length > 0) {
      // Set first image as profile photo
      const firstFile = uploadFiles[0];
      if (firstFile.file && firstFile.file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Dispatch event to update profile photo in sidebar
          window.dispatchEvent(new CustomEvent('updateProfilePhoto', { 
            detail: { photo: reader.result },
            bubbles: true 
          }));
        };
        reader.readAsDataURL(firstFile.file);
      }
      
      // Add all files to attachments list
      window.dispatchEvent(new CustomEvent('attachmentAdded', {
        detail: { files: uploadFiles },
        bubbles: true
      }));
    }
    
    setShowUploadDialog(false);
    setUploadFiles([]);
    setIsPrivate(false);
  };

  const removeFile = (index) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddLink = () => {
    const url = prompt('Enter file URL:');
    if (url) {
      setUploadFiles(prev => [...prev, { name: url, size: 0, isLink: true }]);
    }
  };

  const handleAddShare = () => {
    if (shareUser.trim()) {
      setSharedUsers(prev => [...prev, {
        name: shareUser,
        canRead: false,
        canWrite: false,
        canSubmit: false,
        canShare: false
      }]);
      setShareUser('');
    }
  };

  const handlePermissionChange = (index, permission) => {
    setSharedUsers(prev => {
      const newUsers = [...prev];
      newUsers[index] = { ...newUsers[index], [permission]: !newUsers[index][permission] };
      return newUsers;
    });
  };

  // Confirm delete attachment
  const confirmDeleteAttachment = () => {
    if (attachmentToDelete !== null) {
      window.dispatchEvent(new CustomEvent('deleteAttachment', {
        detail: { index: attachmentToDelete },
        bubbles: true
      }));
    }
    setShowDeleteConfirm(false);
    setAttachmentToDelete(null);
  };

  // Cancel delete attachment
  const cancelDeleteAttachment = () => {
    setShowDeleteConfirm(false);
    setAttachmentToDelete(null);
  };

  const handleBackToList = () => {
    // Navigate back to Employee List
    const event = new CustomEvent('setActiveContent', { detail: 'employee-list' });
    window.dispatchEvent(event);
    window.history.pushState({ activeContent: 'employee-list' }, '', '/');
  };

  return (
    <div className="p-10 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBackToList}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Employee List</span>
          </button>
        </div>
        
        {/* Success Alert */}
        {showSaveAlert && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-800 font-medium">Form saved successfully!</span>
            </div>
            <button onClick={() => setShowSaveAlert(false)} className="text-green-600 hover:text-green-800">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Validation Error Alert */}
        {showValidationError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800 font-medium">{validationMessage}</span>
            </div>
            <button onClick={() => setShowValidationError(false)} className="text-red-600 hover:text-red-800">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        
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
                    onBlur={() => handleBlur('firstName')}
                    className={`w-full px-3 py-1 rounded-md bg-gray-100 border ${
                      hasError('firstName', firstName) ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {hasError('firstName', firstName) && (
                    <p className="text-xs text-red-500 mt-1">First Name is required</p>
                  )}
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
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    onBlur={() => handleBlur('gender')}
                    className={`w-full px-3 py-1 rounded-md bg-gray-100 border ${
                      hasError('gender', gender) ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {hasError('gender', gender) && (
                    <p className="text-xs text-red-500 mt-1">Gender is required</p>
                  )}
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
                    onBlur={() => handleBlur('dateOfBirth')}
                    className={`w-full px-3 py-1 rounded-md bg-gray-100 border ${
                      hasError('dateOfBirth', dateOfBirth) ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {hasError('dateOfBirth', dateOfBirth) && (
                    <p className="text-xs text-red-500 mt-1">Date of Birth is required</p>
                  )}
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
                    onBlur={() => handleBlur('dateOfJoining')}
                    className={`w-full px-3 py-1 rounded-md bg-gray-100 border ${
                      hasError('dateOfJoining', dateOfJoining) ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {hasError('dateOfJoining', dateOfJoining) && (
                    <p className="text-xs text-red-500 mt-1">Date of Joining is required</p>
                  )}
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

      {/* Add to ToDo Dialog */}
      {showToDoDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-md shadow-2xl w-full max-w-lg border border-gray-300 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-sm font-semibold text-gray-900">Add to ToDo</h2>
              <button onClick={() => setShowToDoDialog(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-4 py-3 space-y-3 overflow-y-auto flex-1">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="assign-to-me" checked={assignToMe} onChange={(e) => setAssignToMe(e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="assign-to-me" className="text-sm text-gray-700">Assign to me</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign To <span className="text-red-500">*</span></label>
                <input type="text" value={assignTo} onChange={(e) => setAssignTo(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign To User Group</label>
                <input type="text" value={assignToUserGroup} onChange={(e) => setAssignToUserGroup(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Complete By</label>
                  <input type="date" value={completeBy} onChange={(e) => setCompleteBy(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <div className="border border-gray-300 rounded-t bg-gray-50 px-2 py-1.5 flex items-center space-x-1 flex-wrap">
                  <button type="button" onClick={() => handleFormatText('bold')} className="p-1 hover:bg-gray-200 rounded"><Bold className="h-3.5 w-3.5" /></button>
                  <button type="button" onClick={() => handleFormatText('italic')} className="p-1 hover:bg-gray-200 rounded"><Italic className="h-3.5 w-3.5" /></button>
                  <button type="button" onClick={() => handleFormatText('underline')} className="p-1 hover:bg-gray-200 rounded"><Underline className="h-3.5 w-3.5" /></button>
                  <button type="button" onClick={() => handleFormatText('insertUnorderedList')} className="p-1 hover:bg-gray-200 rounded"><List className="h-3.5 w-3.5" /></button>
                  <button type="button" onClick={() => handleFormatText('createLink', prompt('Enter URL:'))} className="p-1 hover:bg-gray-200 rounded"><Link2 className="h-3.5 w-3.5" /></button>
                  <button type="button" onClick={() => handleFormatText('insertImage', prompt('Enter image URL:'))} className="p-1 hover:bg-gray-200 rounded"><Image className="h-3.5 w-3.5" /></button>
                </div>
                <div ref={commentEditorRef} contentEditable className="w-full px-3 py-2 border border-gray-300 border-t-0 rounded-b focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[80px] max-h-[200px] overflow-y-auto" />
              </div>
            </div>
            <div className="px-4 py-3 border-t border-gray-200 flex justify-end space-x-2 flex-shrink-0">
              <button onClick={() => setShowToDoDialog(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => { console.log('ToDo added'); setShowToDoDialog(false); }} className="px-4 py-2 text-sm font-medium text-white bg-black rounded hover:bg-gray-800 transition-colors">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 p-4 backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl border border-gray-300 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-base font-semibold text-gray-900">Upload</h2>
              <button onClick={() => { setShowUploadDialog(false); setUploadFiles([]); }} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-6 overflow-y-auto flex-1">
              <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-4">Drag and drop files here or select a source</p>
                <div className="flex items-center justify-center space-x-4">
                  <label className="px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors cursor-pointer">
                    My Device
                    <input type="file" multiple onChange={handleFileSelect} className="hidden" />
                  </label>
                  <button onClick={handleAddLink} className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-300 transition-colors">
                    <LinkIcon className="h-4 w-4 inline mr-2" />Link
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-300 transition-colors">
                    <Camera className="h-4 w-4 inline mr-2" />Camera
                  </button>
                </div>
              </div>
              {uploadFiles.length > 0 && (
                <div className="space-y-2 mb-4">
                  {uploadFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                      <div className="flex-1"><p className="text-sm font-medium text-gray-900">{file.name}</p></div>
                      <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700"><X className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between flex-shrink-0">
              <button onClick={() => setIsPrivate(!isPrivate)} className="text-sm font-medium text-gray-700 hover:text-gray-900">{isPrivate ? 'Set all public' : 'Set all private'}</button>
              <button onClick={handleUpload} className="px-6 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors">Upload</button>
            </div>
          </div>
        </div>
      )}

      {/* Share Dialog */}
      {showShareDialog && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 p-4 backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl border border-gray-300 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-base font-semibold text-gray-900">Share Employee with</h2>
              <button onClick={() => { setShowShareDialog(false); setShareUser(''); }} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-6 overflow-y-auto flex-1 relative">
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-4 pb-3 border-b border-gray-200">
                  <div className="text-sm font-semibold text-gray-700">User</div>
                  <div className="text-sm font-semibold text-gray-700 text-center">Can Read</div>
                  <div className="text-sm font-semibold text-gray-700 text-center">Can Write</div>
                  <div className="text-sm font-semibold text-gray-700 text-center">Can Submit</div>
                  <div className="text-sm font-semibold text-gray-700 text-center">Can Share</div>
                </div>
                <div className="grid grid-cols-5 gap-4 items-center pb-4 border-b border-gray-200">
                  <div className="text-base font-semibold text-gray-900">Everyone</div>
                  <div className="flex justify-center"><input type="checkbox" checked={sharedUsers[0]?.canRead || false} onChange={() => handlePermissionChange(0, 'canRead')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer" /></div>
                  <div className="flex justify-center"><input type="checkbox" checked={sharedUsers[0]?.canWrite || false} onChange={() => handlePermissionChange(0, 'canWrite')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer" /></div>
                  <div className="flex justify-center"><input type="checkbox" checked={sharedUsers[0]?.canSubmit || false} onChange={() => handlePermissionChange(0, 'canSubmit')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer" /></div>
                  <div className="flex justify-center"><input type="checkbox" checked={sharedUsers[0]?.canShare || false} onChange={() => handlePermissionChange(0, 'canShare')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer" /></div>
                </div>
                <div className="grid grid-cols-5 gap-4 items-center pt-2">
                  <div className="relative">
                    <input type="text" value={shareUser} onChange={(e) => setShareUser(e.target.value)} onFocus={() => setShowUserSuggestions(true)} onBlur={() => setTimeout(() => setShowUserSuggestions(false), 200)} onKeyPress={(e) => { if (e.key === 'Enter') handleAddShare(); }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50" />
                    {showUserSuggestions && (
                      <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                        <div className="p-2 text-xs text-gray-600 border-b border-gray-100">Filters applied for <strong>User Type</strong> = System User</div>
                        <button onMouseDown={(e) => { e.preventDefault(); setShareUser(''); setShowUserSuggestions(false); }} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 border-b border-gray-100"><span className="text-gray-600">+</span><span className="text-blue-600">Create a new User</span></button>
                        <button onMouseDown={(e) => { e.preventDefault(); setShowUserSuggestions(false); }} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"><span className="text-gray-600">🔍</span><span className="text-gray-700">Advanced Search</span></button>
                      </div>
                    )}
                  </div>
                  <div className="col-span-4 flex justify-start">
                    <button onClick={handleAddShare} className="px-6 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors">Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 p-1 backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm">
            {/* Dialog Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="text-2xl font-semibold text-gray-900">Confirm</h2>
              <button
                onClick={cancelDeleteAttachment}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Dialog Body */}
            <div className="px-6 pb-8">
              <p className="text-base text-gray-700 leading-relaxed">Are you sure you want to delete the attachment?</p>
            </div>

            {/* Dialog Footer */}
            <div className="px-6 pb-6 flex justify-end space-x-3">
              <button
                onClick={cancelDeleteAttachment}
                className="px-5 py-1 text-[15px] font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                No
              </button>
              <button
                onClick={confirmDeleteAttachment}
                className="px-5 py-1 text-base font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
