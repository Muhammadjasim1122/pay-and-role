'use client';

import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [hrDashboards, setHrDashboards] = useState([
    { id: 1, name: 'Human Resource', idName: 'Human Resource', lastUpdated: '1 y', comments: 0, type: 'hr' },
    { id: 2, name: 'Expense Claims', idName: 'Expense Claims', lastUpdated: '3 y', comments: 0, type: 'hr' },
    { id: 3, name: 'Payroll', idName: 'Payroll', lastUpdated: '3 y', comments: 0, type: 'hr' },
    { id: 4, name: 'Employee Lifecycle', idName: 'Employee Lifecycle', lastUpdated: '3 y', comments: 0, type: 'hr' },
    { id: 5, name: 'Attendance', idName: 'Attendance', lastUpdated: '3 y', comments: 0, type: 'hr' },
    { id: 6, name: 'Project', idName: 'Project', lastUpdated: '5 y', comments: 0, type: 'hr' },
  ]);

  const [recruitmentDashboards, setRecruitmentDashboards] = useState([
    { id: 1, name: 'Recruitment', idName: 'Recruitment', lastUpdated: '3 y', comments: 0, type: 'recruitment' },
    { id: 2, name: 'Selling', idName: 'Selling', lastUpdated: '5 y', comments: 0, type: 'recruitment' },
    { id: 3, name: 'Stock', idName: 'Stock', lastUpdated: '5 y', comments: 0, type: 'recruitment' },
  ]);

  const [lifecycleDashboards, setLifecycleDashboards] = useState([
    { id: 1, name: 'lakjsdlafhlksdhfklhaklshdjklfh', idName: 'lakjsdlafhlksdhfklhaklshdjklfh', lastUpdated: '2 h', comments: 0, type: 'lifecycle' },
    { id: 2, name: 'kjhjkhkhkhkhkhkh', idName: 'kjhjkhkhkhkhkhkh', lastUpdated: '1 y', comments: 0, type: 'lifecycle' },
    { id: 3, name: 'asdjfasdf', idName: 'asdjfasdf', lastUpdated: '3 y', comments: 0, type: 'lifecycle' },
    { id: 4, name: 'Human Resource', idName: 'Human Resource', lastUpdated: '1 y', comments: 0, type: 'lifecycle' },
    { id: 5, name: 'Expense Claims', idName: 'Expense Claims', lastUpdated: '3 y', comments: 0, type: 'lifecycle' },
    { id: 6, name: 'Recruitment', idName: 'Recruitment', lastUpdated: '3 y', comments: 0, type: 'lifecycle' },
    { id: 7, name: 'Payroll', idName: 'Payroll', lastUpdated: '3 y', comments: 0, type: 'lifecycle' },
    { id: 8, name: 'Employee Lifecycle', idName: 'Employee Lifecycle', lastUpdated: '3 y', comments: 0, type: 'lifecycle' },
    { id: 9, name: 'Attendance', idName: 'Attendance', lastUpdated: '3 y', comments: 0, type: 'lifecycle' },
    { id: 10, name: 'Performance Management', idName: 'Performance Management', lastUpdated: '2 y', comments: 0, type: 'lifecycle' },
    { id: 11, name: 'Training & Development', idName: 'Training & Development', lastUpdated: '1 y', comments: 0, type: 'lifecycle' },
    { id: 12, name: 'Employee Relations', idName: 'Employee Relations', lastUpdated: '6 m', comments: 0, type: 'lifecycle' },
    { id: 13, name: 'Compensation & Benefits', idName: 'Compensation & Benefits', lastUpdated: '4 m', comments: 0, type: 'lifecycle' },
    { id: 14, name: 'Workforce Planning', idName: 'Workforce Planning', lastUpdated: '8 m', comments: 0, type: 'lifecycle' },
    { id: 15, name: 'Employee Engagement', idName: 'Employee Engagement', lastUpdated: '5 m', comments: 0, type: 'lifecycle' },
    { id: 16, name: 'Succession Planning', idName: 'Succession Planning', lastUpdated: '1 y', comments: 0, type: 'lifecycle' },
    { id: 17, name: 'Talent Acquisition', idName: 'Talent Acquisition', lastUpdated: '2 y', comments: 0, type: 'lifecycle' },
  ]);

  const [attendanceDashboards, setAttendanceDashboards] = useState([
    { id: 1, name: 'Daily Attendance', idName: 'Daily Attendance', lastUpdated: '2 h', comments: 0, type: 'attendance' },
    { id: 2, name: 'Time Tracking', idName: 'Time Tracking', lastUpdated: '1 d', comments: 0, type: 'attendance' },
    { id: 3, name: 'Shift Management', idName: 'Shift Management', lastUpdated: '3 d', comments: 0, type: 'attendance' },
    { id: 4, name: 'Overtime Reports', idName: 'Overtime Reports', lastUpdated: '1 w', comments: 0, type: 'attendance' },
    { id: 5, name: 'Leave Balance', idName: 'Leave Balance', lastUpdated: '2 w', comments: 0, type: 'attendance' },
    { id: 6, name: 'Attendance Summary', idName: 'Attendance Summary', lastUpdated: '1 m', comments: 0, type: 'attendance' },
    { id: 7, name: 'Late Arrivals', idName: 'Late Arrivals', lastUpdated: '1 m', comments: 0, type: 'attendance' },
    { id: 8, name: 'Early Departures', idName: 'Early Departures', lastUpdated: '1 m', comments: 0, type: 'attendance' },
    { id: 9, name: 'Work Hours Analysis', idName: 'Work Hours Analysis', lastUpdated: '2 m', comments: 0, type: 'attendance' },
    { id: 10, name: 'Attendance Trends', idName: 'Attendance Trends', lastUpdated: '3 m', comments: 0, type: 'attendance' },
    { id: 11, name: 'Employee Punctuality', idName: 'Employee Punctuality', lastUpdated: '6 m', comments: 0, type: 'attendance' },
    { id: 12, name: 'Department Attendance', idName: 'Department Attendance', lastUpdated: '1 y', comments: 0, type: 'attendance' },
  ]);

  const [expenseClaimsDashboards, setExpenseClaimsDashboards] = useState([
    { id: 1, name: 'Expense Claims Summary', idName: 'Expense Claims Summary', lastUpdated: '2 h', comments: 0, type: 'expense-claims' },
    { id: 2, name: 'Monthly Expenses', idName: 'Monthly Expenses', lastUpdated: '1 d', comments: 0, type: 'expense-claims' },
    { id: 3, name: 'Department Expenses', idName: 'Department Expenses', lastUpdated: '3 d', comments: 0, type: 'expense-claims' },
    { id: 4, name: 'Expense Categories', idName: 'Expense Categories', lastUpdated: '1 w', comments: 0, type: 'expense-claims' },
    { id: 5, name: 'Pending Approvals', idName: 'Pending Approvals', lastUpdated: '2 w', comments: 0, type: 'expense-claims' },
    { id: 6, name: 'Rejected Claims', idName: 'Rejected Claims', lastUpdated: '1 m', comments: 0, type: 'expense-claims' },
    { id: 7, name: 'Approved Claims', idName: 'Approved Claims', lastUpdated: '1 m', comments: 0, type: 'expense-claims' },
    { id: 8, name: 'Expense Trends', idName: 'Expense Trends', lastUpdated: '2 m', comments: 0, type: 'expense-claims' },
    { id: 9, name: 'Budget Analysis', idName: 'Budget Analysis', lastUpdated: '3 m', comments: 0, type: 'expense-claims' },
    { id: 10, name: 'Employee Expenses', idName: 'Employee Expenses', lastUpdated: '6 m', comments: 0, type: 'expense-claims' },
    { id: 11, name: 'Travel Expenses', idName: 'Travel Expenses', lastUpdated: '1 y', comments: 0, type: 'expense-claims' },
    { id: 12, name: 'Office Expenses', idName: 'Office Expenses', lastUpdated: '1 y', comments: 0, type: 'expense-claims' },
  ]);

  const addDashboard = (dashboardData) => {
    const dashboardType = dashboardData.type || 'hr';
    
    if (dashboardType === 'hr') {
      const newDashboard = {
        id: Math.max(...hrDashboards.map(d => d.id)) + 1,
        name: dashboardData.name,
        idName: dashboardData.name,
        lastUpdated: 'now',
        comments: 0,
        type: 'hr',
        ...dashboardData
      };
      setHrDashboards(prev => [newDashboard, ...prev]);
      return newDashboard;
    } else if (dashboardType === 'recruitment') {
      const newDashboard = {
        id: Math.max(...recruitmentDashboards.map(d => d.id)) + 1,
        name: dashboardData.name,
        idName: dashboardData.name,
        lastUpdated: 'now',
        comments: 0,
        type: 'recruitment',
        ...dashboardData
      };
      setRecruitmentDashboards(prev => [newDashboard, ...prev]);
      return newDashboard;
    } else if (dashboardType === 'lifecycle') {
      const newDashboard = {
        id: Math.max(...lifecycleDashboards.map(d => d.id)) + 1,
        name: dashboardData.name,
        idName: dashboardData.name,
        lastUpdated: 'now',
        comments: 0,
        type: 'lifecycle',
        ...dashboardData
      };
      setLifecycleDashboards(prev => [newDashboard, ...prev]);
      return newDashboard;
    } else if (dashboardType === 'attendance') {
      const newDashboard = {
        id: Math.max(...attendanceDashboards.map(d => d.id)) + 1,
        name: dashboardData.name,
        idName: dashboardData.name,
        lastUpdated: 'now',
        comments: 0,
        type: 'attendance',
        ...dashboardData
      };
      setAttendanceDashboards(prev => [newDashboard, ...prev]);
      return newDashboard;
    } else if (dashboardType === 'expense-claims') {
      const newDashboard = {
        id: Math.max(...expenseClaimsDashboards.map(d => d.id)) + 1,
        name: dashboardData.name,
        idName: dashboardData.name,
        lastUpdated: 'now',
        comments: 0,
        type: 'expense-claims',
        ...dashboardData
      };
      setExpenseClaimsDashboards(prev => [newDashboard, ...prev]);
      return newDashboard;
    }
  };

  const updateDashboard = (id, updates, type = 'hr') => {
    if (type === 'hr') {
      setHrDashboards(prev => 
        prev.map(dashboard => 
          dashboard.id === id ? { ...dashboard, ...updates } : dashboard
        )
      );
    } else if (type === 'recruitment') {
      setRecruitmentDashboards(prev => 
        prev.map(dashboard => 
          dashboard.id === id ? { ...dashboard, ...updates } : dashboard
        )
      );
    } else if (type === 'lifecycle') {
      setLifecycleDashboards(prev => 
        prev.map(dashboard => 
          dashboard.id === id ? { ...dashboard, ...updates } : dashboard
        )
      );
    }
  };

  const deleteDashboard = (id, type = 'hr') => {
    if (type === 'hr') {
      setHrDashboards(prev => prev.filter(dashboard => dashboard.id !== id));
    } else if (type === 'recruitment') {
      setRecruitmentDashboards(prev => prev.filter(dashboard => dashboard.id !== id));
    } else if (type === 'lifecycle') {
      setLifecycleDashboards(prev => prev.filter(dashboard => dashboard.id !== id));
    } else if (type === 'attendance') {
      setAttendanceDashboards(prev => prev.filter(dashboard => dashboard.id !== id));
    } else if (type === 'expense-claims') {
      setExpenseClaimsDashboards(prev => prev.filter(dashboard => dashboard.id !== id));
    }
  };

  return (
    <DashboardContext.Provider value={{
      dashboards: hrDashboards, // For backward compatibility
      hrDashboards,
      recruitmentDashboards,
      lifecycleDashboards,
      attendanceDashboards,
      expenseClaimsDashboards,
      addDashboard,
      updateDashboard,
      deleteDashboard
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
