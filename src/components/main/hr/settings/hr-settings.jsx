'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit3, ChevronUp, MessageCircle, X, Calendar, Bold, Italic, Underline, Link, Image, List, AlignLeft, AlignCenter, AlignRight, Code, Quote, Monitor, Folder, Camera, Upload as UploadIcon } from 'lucide-react';
import ModuleSections from '../../../shared/ModuleSections';

export default function HRSettings() {
  
  // State for Employee Naming dropdown
  const [showNamingOptions, setShowNamingOptions] = useState(false);
  const [employeeNaming, setEmployeeNaming] = useState('Naming Series');
  
  // State for Reminders section
  const [isRemindersExpanded, setIsRemindersExpanded] = useState(true);
  const [workAnniversaries, setWorkAnniversaries] = useState(true);
  const [birthdays, setBirthdays] = useState(false);
  const [holidays, setHolidays] = useState(true);
  const [holidayFrequency, setHolidayFrequency] = useState('Weekly');
  const [showFrequencyOptions, setShowFrequencyOptions] = useState(false);
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

  // State for Comments
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [commentMenuOpen, setCommentMenuOpen] = useState(null);

  // State for Add to ToDo Dialog
  const [showToDoDialog, setShowToDoDialog] = useState(false);
  const [assignToMe, setAssignToMe] = useState(false);
  const [assignTo, setAssignTo] = useState('');
  const [assignToUserGroup, setAssignToUserGroup] = useState('');
  const [completeBy, setCompleteBy] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [todoComment, setTodoComment] = useState('');
  const [textStyle, setTextStyle] = useState('Normal');
  const [fontSize, setFontSize] = useState('---');

  // State for Upload Dialog
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // State for Share Dialog
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

  // Function to handle comment submission
  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        text: commentText,
        user: 'mj',
        timestamp: 'just now'
      };
      setComments([newComment, ...comments]);
      setCommentText('');
    }
  };

  // Function to start editing a comment
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.text);
  };

  // Function to save edited comment
  const handleSaveEdit = (commentId) => {
    if (editingCommentText.trim()) {
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, text: editingCommentText }
          : comment
      ));
      setEditingCommentId(null);
      setEditingCommentText('');
    }
  };

  // Function to dismiss editing
  const handleDismissEdit = () => {
    setEditingCommentId(null);
    setEditingCommentText('');
  };

  // Comment menu functions
  const handleCopyLink = (commentId) => {
    // Copy comment link to clipboard
    const link = `${window.location.href}#comment-${commentId}`;
    navigator.clipboard.writeText(link);
    setCommentMenuOpen(null);
    alert('Link copied to clipboard!');
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    setCommentMenuOpen(null);
  };

  const handlePublishComment = (commentId) => {
    // Handle publish logic
    console.log('Publishing comment:', commentId);
    setCommentMenuOpen(null);
    alert('Comment published!');
  };

  // Listen for custom event to open ToDo, Upload, and Share dialogs
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

    return () => {
      window.removeEventListener('openToDoDialog', handleOpenToDoDialog, true);
      window.removeEventListener('openUploadDialog', handleOpenUploadDialog, true);
      window.removeEventListener('openShareDialog', handleOpenShareDialog, true);
      delete window.openToDoDialog;
      delete window.openUploadDialog;
      delete window.openShareDialog;
    };
  }, []);

  // Close comment menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (commentMenuOpen !== null && !e.target.closest('.comment-menu-container')) {
        setCommentMenuOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [commentMenuOpen]);

  // Handle file upload functions
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setUploadFiles(prev => [...prev, ...files]);
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
    setUploadFiles(prev => [...prev, ...files]);
  };

  const handleUpload = () => {
    // Handle upload logic here
    console.log('Uploading files:', uploadFiles);
    console.log('Is Private:', isPrivate);
    // Reset and close
    setUploadFiles([]);
    setIsPrivate(false);
    setShowUploadDialog(false);
  };

  const removeFile = (index) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddLink = () => {
    const url = prompt('Enter file URL:');
    if (url) {
      setUploadFiles(prev => [...prev, { name: url, type: 'link', url }]);
    }
  };

  // Handle Share dialog functions
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
    setSharedUsers(prev => prev.map((user, i) => 
      i === index ? { ...user, [permission]: !user[permission] } : user
    ));
  };

  // Rich text editor functions using contentEditable
  const applyFormat = (command, value = null) => {
    const editor = document.getElementById('todo-comment-editor');
    if (editor) {
      editor.focus();
      document.execCommand(command, false, value);
      // Update state with innerHTML
      setTodoComment(editor.innerHTML);
    }
  };

  const handleEditorInput = (e) => {
    setTodoComment(e.target.innerHTML);
  };

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
                    className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white cursor-pointer"
                    value={employeeNaming}
                    onClick={() => setShowNamingOptions(!showNamingOptions)}
                    onFocus={() => setShowNamingOptions(true)}
                    onBlur={() => setTimeout(() => setShowNamingOptions(false), 200)}
                    readOnly
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    <svg className="h-4 w-4 text-gray-400 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Dropdown Options - Directly below input */}
                  {showNamingOptions && (
                    <div className="absolute left-0 right-0 top-full mt-0 bg-white rounded-lg border border-gray-200 shadow-xl z-50 overflow-hidden">
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setEmployeeNaming('Naming Series');
                          setShowNamingOptions(false);
                        }}
                        className={`w-full px-4 py-1 text-left text-sm border-b border-gray-100 ${
                          employeeNaming === 'Naming Series' ? 'bg-blue-600 text-white font-medium' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Naming Series
                      </button>
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setEmployeeNaming('Employee Number');
                          setShowNamingOptions(false);
                        }}
                        className={`w-full px-4 py-1 text-left text-sm border-b border-gray-100 ${
                          employeeNaming === 'Employee Number' ? 'bg-blue-600 text-white font-medium' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Employee Number
                      </button>
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setEmployeeNaming('Full Name');
                          setShowNamingOptions(false);
                        }}
                        className={`w-full px-4 py-1 text-left text-sm ${
                          employeeNaming === 'Full Name' ? 'bg-blue-600 text-white font-medium' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Full Name
                      </button>
                    </div>
                  )}
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
                        onClick={() => setShowFrequencyOptions(!showFrequencyOptions)}
                        onFocus={() => setShowFrequencyOptions(true)}
                        onBlur={() => setTimeout(() => setShowFrequencyOptions(false), 200)}
                        readOnly
                        className="w-full px-3 py-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col pointer-events-none">
                        <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {/* Dropdown Options */}
                      {showFrequencyOptions && (
                        <div className="absolute left-0 right-0 top-full mt-0 bg-white rounded-lg border border-gray-200 shadow-xl z-50 overflow-hidden">
                          <button
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setHolidayFrequency('Weekly');
                              setShowFrequencyOptions(false);
                            }}
                            className={`w-full px-4 py-1 text-left text-sm border-b border-gray-100 ${
                              holidayFrequency === 'Weekly' ? 'bg-blue-600 text-white font-medium' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            Weekly
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setHolidayFrequency('Monthly');
                              setShowFrequencyOptions(false);
                            }}
                            className={`w-full px-4 py-1 text-left text-sm ${
                              holidayFrequency === 'Monthly' ? 'bg-blue-600 text-white font-medium' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            Monthly
                          </button>
                        </div>
                      )}
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
        <div className="p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Comments</h2>
          
          {/* Comment Input */}
          <div className="mb-6">
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-blue-700">mj</span>
              </div>
              <input
                type="text"
                placeholder="Type a reply / comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                className="flex-1 px-4 py-1 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Comment Button - Only show when there's text */}
            {commentText.trim() && (
              <div className="ml-[52px]">
                <button
                  onClick={handleAddComment}
                  className="px-6 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Comment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Activity Section - Outside main container */}
        <div className="p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Activity</h2>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
              + New Email
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute left-1 top-2 bottom-2 w-0.5 bg-gray-300"></div>
            <div className="space-y-4">
              {/* Show comments in activity feed */}
              {comments.map((comment) => (
                <div key={`activity-${comment.id}`} className="flex items-start space-x-3">
                  <MessageCircle className="w-4 h-4 text-gray-600 mt-3 relative z-10 flex-shrink-0" />
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-blue-600">{comment.user}</span>
                        <span className="text-sm text-gray-500">You commented · {comment.timestamp}</span>
                      </div>
                      {editingCommentId !== comment.id && (
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => handleEditComment(comment)}
                            className="text-sm text-gray-600 hover:text-gray-800 underline"
                          >
                            Edit
                          </button>
                          <div className="relative comment-menu-container">
                            <button 
                              onClick={() => setCommentMenuOpen(commentMenuOpen === comment.id ? null : comment.id)}
                              className="text-sm text-gray-600 hover:text-gray-800"
                            >
                              ...
                            </button>
                            
                            {/* Dropdown Menu */}
                            {commentMenuOpen === comment.id && (
                              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                <button
                                  onClick={() => handleCopyLink(comment.id)}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                                >
                                  Copy Link
                                </button>
                                <button
                                  onClick={() => handleDeleteComment(comment.id)}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() => handlePublishComment(comment.id)}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  Publish
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Show textarea when editing, otherwise show text */}
                    {editingCommentId === comment.id ? (
                      <div>
                        <textarea
                          value={editingCommentText}
                          onChange={(e) => setEditingCommentText(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={4}
                        />
                        <div className="flex items-center space-x-3 mt-3">
                          <button
                            onClick={() => handleSaveEdit(comment.id)}
                            className="text-sm text-gray-600 hover:text-gray-800 underline"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleDismissEdit}
                            className="text-sm text-gray-600 hover:text-gray-800"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-800">{comment.text}</p>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-1.5 relative z-10"></div>
                <p className="text-sm text-gray-600">Administrator created this ·</p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-1.5 relative z-10"></div>
                <p className="text-sm text-gray-600">Administrator last edited this · 1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add to ToDo Dialog */}
      {showToDoDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-md shadow-2xl w-full max-w-lg border border-gray-300 max-h-[85vh] flex flex-col">
            {/* Dialog Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-sm font-semibold text-gray-900">Add to ToDo</h2>
              <button
                onClick={() => setShowToDoDialog(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Dialog Body - Scrollable */}
            <div className="px-4 py-3 space-y-3 overflow-y-auto flex-1">
              {/* Assign to me checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="assign-to-me"
                  checked={assignToMe}
                  onChange={(e) => setAssignToMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="assign-to-me" className="text-sm text-gray-700">
                  Assign to me
                </label>
              </div>

              {/* Assign To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign To <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder=""
                />
              </div>

              {/* Assign To User Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign To User Group
                </label>
                <input
                  type="text"
                  value={assignToUserGroup}
                  onChange={(e) => setAssignToUserGroup(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder=""
                />
              </div>

              {/* Complete By and Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Complete By
                  </label>
                  <input
                    type="date"
                    value={completeBy}
                    onChange={(e) => setCompleteBy(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Comment with Rich Text Editor Toolbar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
                
                {/* Rich Text Toolbar */}
                <div className="border border-gray-300 rounded-t bg-gray-50 px-2 py-1.5 flex items-center space-x-0.5 flex-wrap gap-y-1">
                  {/* Text Style Dropdown */}
                  <select 
                    value={textStyle}
                    onChange={(e) => {
                      setTextStyle(e.target.value);
                      const style = e.target.value;
                      if (style === 'Heading 1') insertText('# ');
                      else if (style === 'Heading 2') insertText('## ');
                    }}
                    className="px-2 py-0.5 text-xs border border-gray-300 rounded bg-white"
                  >
                    <option>Normal</option>
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                  </select>

                  <div className="w-px h-5 bg-gray-300 mx-1"></div>

                  {/* Font Size Dropdown */}
                  <select 
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="px-2 py-0.5 text-xs border border-gray-300 rounded bg-white w-14"
                  >
                    <option>---</option>
                    <option>12</option>
                    <option>14</option>
                    <option>16</option>
                    <option>18</option>
                    <option>20</option>
                  </select>

                  <div className="w-px h-5 bg-gray-300 mx-1"></div>

                  {/* Formatting Buttons */}
                  <button 
                    type="button"
                    onClick={() => applyFormat('bold')}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Bold"
                  >
                    <Bold className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => applyFormat('italic')}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Italic"
                  >
                    <Italic className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => applyFormat('underline')}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Underline"
                  >
                    <Underline className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => applyFormat('strikeThrough')}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Strike"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M9 5h6m-3 0v14" />
                    </svg>
                  </button>

                  <div className="w-px h-5 bg-gray-300 mx-1"></div>

                  {/* Color Buttons */}
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Text Color">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10M12 3v18m-4-4h8" />
                    </svg>
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Background">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="4" y="4" width="16" height="16" strokeWidth={2} />
                    </svg>
                  </button>

                  <div className="w-px h-5 bg-gray-300 mx-1"></div>

                  {/* Quote and Code */}
                  <button 
                    type="button"
                    onClick={() => applyFormat('formatBlock', 'blockquote')}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Quote"
                  >
                    <Quote className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      const editor = document.getElementById('todo-comment-editor');
                      if (editor) {
                        const selection = window.getSelection();
                        if (selection.rangeCount > 0) {
                          const range = selection.getRangeAt(0);
                          const code = document.createElement('code');
                          code.style.backgroundColor = '#f3f4f6';
                          code.style.padding = '2px 4px';
                          code.style.borderRadius = '3px';
                          code.style.fontFamily = 'monospace';
                          range.surroundContents(code);
                          setTodoComment(editor.innerHTML);
                        }
                      }
                    }}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Code"
                  >
                    <Code className="h-3.5 w-3.5" />
                  </button>

                  <div className="w-px h-5 bg-gray-300 mx-1"></div>

                  {/* Insert Options */}
                  <button 
                    type="button"
                    onClick={() => applyFormat('createLink', prompt('Enter URL:') || '')}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Link"
                  >
                    <Link className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => applyFormat('insertImage', prompt('Enter image URL:') || '')}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Image"
                  >
                    <Image className="h-3.5 w-3.5" />
                  </button>

                  <div className="w-px h-5 bg-gray-300 mx-1"></div>

                  {/* Lists */}
                  <button 
                    type="button"
                    onClick={() => applyFormat('insertUnorderedList')}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Bullet List"
                  >
                    <List className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => applyFormat('insertOrderedList')}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Numbered List"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button 
                    type="button"
                    onClick={() => applyFormat('insertUnorderedList')}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Checklist"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </button>

                  <div className="w-px h-5 bg-gray-300 mx-1"></div>

                  {/* Alignment */}
                  <button 
                    type="button" 
                    onClick={() => applyFormat('justifyLeft')}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Align Left"
                  >
                    <AlignLeft className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => applyFormat('justifyCenter')}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Align Center"
                  >
                    <AlignCenter className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => applyFormat('justifyRight')}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Align Right"
                  >
                    <AlignRight className="h-3.5 w-3.5" />
                  </button>

                  <div className="w-px h-5 bg-gray-300 mx-1"></div>

                  {/* Table */}
                  <button 
                    type="button"
                    onClick={() => {
                      const editor = document.getElementById('todo-comment-editor');
                      if (editor) {
                        const table = '<table border="1" style="border-collapse: collapse; width: 100%;"><tr><th style="border: 1px solid #ddd; padding: 8px;">Header 1</th><th style="border: 1px solid #ddd; padding: 8px;">Header 2</th></tr><tr><td style="border: 1px solid #ddd; padding: 8px;">Cell 1</td><td style="border: 1px solid #ddd; padding: 8px;">Cell 2</td></tr></table>';
                        document.execCommand('insertHTML', false, table);
                        setTodoComment(editor.innerHTML);
                      }
                    }}
                    className="p-1 hover:bg-gray-200 rounded" 
                    title="Table"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>

                  {/* More Options */}
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="More">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>

                {/* ContentEditable Div */}
                <div
                  id="todo-comment-editor"
                  contentEditable
                  onInput={handleEditorInput}
                  dangerouslySetInnerHTML={{ __html: todoComment }}
                  className="w-full px-3 py-2 border border-gray-300 border-t-0 rounded-b focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 overflow-auto min-h-[80px] max-h-[200px] bg-white"
                  style={{ wordWrap: 'break-word' }}
                />
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="px-4 py-2.5 border-t border-gray-200 flex justify-end flex-shrink-0">
              <button
                onClick={() => {
                  // Handle add todo
                  setShowToDoDialog(false);
                  // Reset form
                  setAssignToMe(false);
                  setAssignTo('');
                  setAssignToUserGroup('');
                  setCompleteBy('');
                  setPriority('Medium');
                  setTodoComment('');
                }}
                className="px-4 py-1.5 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl border border-gray-300 max-h-[90vh] flex flex-col">
            {/* Dialog Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-sm font-semibold text-gray-900">Upload</h2>
              <button
                onClick={() => {
                  setShowUploadDialog(false);
                  setUploadFiles([]);
                  setIsPrivate(false);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Dialog Body - Scrollable */}
            <div className="px-4 py-4 overflow-y-auto flex-1">
              {/* Drag and Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
                }`}
              >
                <p className="text-sm text-gray-600 mb-4">Drag and drop files here or upload from</p>
                
                {/* Upload Options */}
                <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
                  {/* My Device */}
                  <div className="flex flex-col items-center">
                    <label className="cursor-pointer flex flex-col items-center">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Monitor className="h-6 w-6 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-700 mt-2">My Device</span>
                    </label>
                  </div>

                  {/* Library */}
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => alert('Library feature coming soon!')}
                      className="flex flex-col items-center"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Folder className="h-6 w-6 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-700 mt-2">Library</span>
                    </button>
                  </div>

                  {/* Link */}
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={handleAddLink}
                      className="flex flex-col items-center"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Link className="h-6 w-6 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-700 mt-2">Link</span>
                    </button>
                  </div>

                  {/* Camera */}
                  <div className="flex flex-col items-center">
                    <label className="cursor-pointer flex flex-col items-center">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Camera className="h-6 w-6 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-700 mt-2">Camera</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* File List */}
              {uploadFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Selected Files:</p>
                  {uploadFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <UploadIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">
                          {file.name || file.url}
                        </span>
                        {file.size && (
                          <span className="text-xs text-gray-500">
                            ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="ml-2 text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dialog Footer */}
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between flex-shrink-0">
              <button
                onClick={() => setIsPrivate(!isPrivate)}
                className="px-3 py-1.5 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700"
              >
                {isPrivate ? 'Set all public' : 'Set all private'}
              </button>
              <button
                onClick={handleUpload}
                disabled={uploadFiles.length === 0}
                className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
                  uploadFiles.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Dialog */}
      {showShareDialog && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl border border-gray-300 max-h-[90vh] flex flex-col">
            {/* Dialog Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-base font-semibold text-gray-900">Share HR Settings with</h2>
              <button
                onClick={() => {
                  setShowShareDialog(false);
                  setShareUser('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Dialog Body - Scrollable */}
            <div className="px-6 py-6 overflow-y-auto flex-1 relative">
              {/* Permissions Grid */}
              <div className="space-y-4">
                {/* Header Row */}
                <div className="grid grid-cols-5 gap-4 pb-3 border-b border-gray-200">
                  <div className="text-sm font-semibold text-gray-700">User</div>
                  <div className="text-sm font-semibold text-gray-700 text-center">Can Read</div>
                  <div className="text-sm font-semibold text-gray-700 text-center">Can Write</div>
                  <div className="text-sm font-semibold text-gray-700 text-center">Can Submit</div>
                  <div className="text-sm font-semibold text-gray-700 text-center">Can Share</div>
                </div>

                {/* Everyone Row */}
                <div className="grid grid-cols-5 gap-4 items-center pb-4 border-b border-gray-200">
                  <div className="text-base font-semibold text-gray-900">Everyone</div>
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      checked={sharedUsers[0]?.canRead || false}
                      onChange={() => handlePermissionChange(0, 'canRead')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      checked={sharedUsers[0]?.canWrite || false}
                      onChange={() => handlePermissionChange(0, 'canWrite')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      checked={sharedUsers[0]?.canSubmit || false}
                      onChange={() => handlePermissionChange(0, 'canSubmit')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      checked={sharedUsers[0]?.canShare || false}
                      onChange={() => handlePermissionChange(0, 'canShare')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* Share this document with Row */}
                <div className="grid grid-cols-5 gap-4 items-center">
                  <div className="text-sm font-medium text-gray-700">Share this document with</div>
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* Input Field and Add Button Row */}
                <div className="grid grid-cols-5 gap-4 items-center pt-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={shareUser}
                      onChange={(e) => setShareUser(e.target.value)}
                      onFocus={() => setShowUserSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowUserSuggestions(false), 200)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddShare();
                        }
                      }}
                      placeholder=""
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50"
                    />
                    
                    {/* Suggestions Dropdown */}
                    {showUserSuggestions && (
                      <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                        <div className="p-2 text-xs text-gray-600 border-b border-gray-100">
                          Filters applied for <strong>User Type</strong> = System User, <strong>Name</strong> != mjasii099@gmail.com
                        </div>
                        <button
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setShareUser('');
                            setShowUserSuggestions(false);
                            // Handle create new user logic
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 border-b border-gray-100"
                        >
                          <span className="text-gray-600">+</span>
                          <span className="text-blue-600">Create a new User</span>
                        </button>
                        <button
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setShowUserSuggestions(false);
                            // Handle advanced search logic
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <span className="text-gray-600">🔍</span>
                          <span className="text-gray-700">Advanced Search</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="col-span-4 flex justify-start">
                    <button
                      onClick={handleAddShare}
                      className="px-6 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
