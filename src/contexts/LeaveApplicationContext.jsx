'use client';

import React, { createContext, useContext, useState } from 'react';

const LeaveApplicationContext = createContext();

export function LeaveApplicationProvider({ children }) {
  const [leaveApplications, setLeaveApplications] = useState([
    {
      id: 1,
      applicationId: 'HR-LAP-2025-00001',
      employee: 'John Doe',
      employeeName: 'John Doe',
      leaveType: 'Annual Leave',
      status: 'Open',
      fromDate: '2025-01-15',
      toDate: '2025-01-17',
      lastUpdated: '2025-01-10',
      comments: 0,
      company: 'Default Company',
      reason: 'Vacation',
      halfDay: false,
      leaveApprover: 'Manager',
      postingDate: '2025-01-10',
      followViaEmail: true,
      salarySlip: '',
      letterHead: '',
      color: '#3B82F6'
    },
    {
      id: 2,
      applicationId: 'HR-LAP-2025-00002',
      employee: 'Jane Smith',
      employeeName: 'Jane Smith',
      leaveType: 'Sick Leave',
      status: 'Approved',
      fromDate: '2025-01-20',
      toDate: '2025-01-20',
      lastUpdated: '2025-01-18',
      comments: 2,
      company: 'Default Company',
      reason: 'Illness',
      halfDay: false,
      leaveApprover: 'Manager',
      postingDate: '2025-01-18',
      followViaEmail: true,
      salarySlip: '',
      letterHead: '',
      color: '#10B981'
    },
    {
      id: 3,
      applicationId: 'HR-LAP-2025-00003',
      employee: 'Mike Johnson',
      employeeName: 'Mike Johnson',
      leaveType: 'Personal Leave',
      status: 'Rejected',
      fromDate: '2025-01-25',
      toDate: '2025-01-27',
      lastUpdated: '2025-01-22',
      comments: 1,
      company: 'Default Company',
      reason: 'Personal matters',
      halfDay: false,
      leaveApprover: 'Manager',
      postingDate: '2025-01-22',
      followViaEmail: true,
      salarySlip: '',
      letterHead: '',
      color: '#EF4444'
    }
  ]);

  const addLeaveApplication = (applicationData) => {
    const newApplication = {
      id: leaveApplications.length + 1,
      applicationId: `HR-LAP-2025-${String(leaveApplications.length + 1).padStart(5, '0')}`,
      ...applicationData,
      lastUpdated: new Date().toISOString().split('T')[0],
      comments: 0
    };
    
    setLeaveApplications(prev => [newApplication, ...prev]);
    return newApplication;
  };

  const updateLeaveApplication = (id, updatedData) => {
    setLeaveApplications(prev => 
      prev.map(app => 
        app.id === id 
          ? { ...app, ...updatedData, lastUpdated: new Date().toISOString().split('T')[0] }
          : app
      )
    );
  };

  const deleteLeaveApplication = (id) => {
    setLeaveApplications(prev => prev.filter(app => app.id !== id));
  };

  const value = {
    leaveApplications,
    addLeaveApplication,
    updateLeaveApplication,
    deleteLeaveApplication
  };

  return (
    <LeaveApplicationContext.Provider value={value}>
      {children}
    </LeaveApplicationContext.Provider>
  );
}

export function useLeaveApplication() {
  const context = useContext(LeaveApplicationContext);
  if (!context) {
    throw new Error('useLeaveApplication must be used within a LeaveApplicationProvider');
  }
  return context;
}
