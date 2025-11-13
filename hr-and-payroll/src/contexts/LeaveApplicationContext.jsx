'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { leaveApplicationAPI } from '../lib/api';

const LeaveApplicationContext = createContext();

export function LeaveApplicationProvider({ children }) {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch leave applications on mount
  useEffect(() => {
    fetchLeaveApplications();
  }, []);

  const fetchLeaveApplications = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await leaveApplicationAPI.getAll(params);
      if (response.success) {
        // Transform API response to match component expectations
        const transformedApplications = response.data.map(app => ({
          id: app._id,
          applicationId: app.series || `HR-LAP-${app._id}`,
          employee: app.employee?.firstName && app.employee?.lastName 
            ? `${app.employee.firstName} ${app.employee.lastName}`
            : app.employee?.employeeId || app.employee,
          employeeName: app.employee?.firstName && app.employee?.lastName
            ? `${app.employee.firstName} ${app.employee.lastName}`
            : app.employee?.employeeId || app.employee,
          leaveType: app.leaveType?.leaveTypeName || app.leaveType,
          status: app.status || 'Open',
          fromDate: app.fromDate ? new Date(app.fromDate).toISOString().split('T')[0] : '',
          toDate: app.toDate ? new Date(app.toDate).toISOString().split('T')[0] : '',
          lastUpdated: app.updatedAt ? new Date(app.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          comments: 0,
          company: app.company || 'Default Company',
          reason: app.reason || '',
          halfDay: app.halfDay || false,
          leaveApprover: app.leaveApprover || '',
          postingDate: app.postingDate ? new Date(app.postingDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          followViaEmail: app.followViaEmail !== undefined ? app.followViaEmail : true,
          salarySlip: app.salarySlip || '',
          letterHead: app.letterHead || '',
          color: app.color || '#3B82F6',
          ...app
        }));
        setLeaveApplications(transformedApplications);
      }
    } catch (err) {
      console.error('Error fetching leave applications:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addLeaveApplication = async (applicationData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await leaveApplicationAPI.create(applicationData);
      if (response.success) {
        const newApplication = {
          id: response.data._id,
          applicationId: response.data.series || `HR-LAP-${response.data._id}`,
          employee: response.data.employee?.firstName && response.data.employee?.lastName
            ? `${response.data.employee.firstName} ${response.data.employee.lastName}`
            : response.data.employee?.employeeId || response.data.employee,
          employeeName: response.data.employee?.firstName && response.data.employee?.lastName
            ? `${response.data.employee.firstName} ${response.data.employee.lastName}`
            : response.data.employee?.employeeId || response.data.employee,
          leaveType: response.data.leaveType?.leaveTypeName || response.data.leaveType,
          status: response.data.status || 'Open',
          fromDate: response.data.fromDate ? new Date(response.data.fromDate).toISOString().split('T')[0] : '',
          toDate: response.data.toDate ? new Date(response.data.toDate).toISOString().split('T')[0] : '',
          lastUpdated: new Date().toISOString().split('T')[0],
          comments: 0,
          ...response.data
        };
        setLeaveApplications(prev => [newApplication, ...prev]);
        return newApplication;
      }
    } catch (err) {
      console.error('Error adding leave application:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateLeaveApplication = async (id, updatedData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await leaveApplicationAPI.update(id, updatedData);
      if (response.success) {
        const updated = {
          id: response.data._id,
          applicationId: response.data.series || `HR-LAP-${response.data._id}`,
          employee: response.data.employee?.firstName && response.data.employee?.lastName
            ? `${response.data.employee.firstName} ${response.data.employee.lastName}`
            : response.data.employee?.employeeId || response.data.employee,
          employeeName: response.data.employee?.firstName && response.data.employee?.lastName
            ? `${response.data.employee.firstName} ${response.data.employee.lastName}`
            : response.data.employee?.employeeId || response.data.employee,
          leaveType: response.data.leaveType?.leaveTypeName || response.data.leaveType,
          status: response.data.status || 'Open',
          fromDate: response.data.fromDate ? new Date(response.data.fromDate).toISOString().split('T')[0] : '',
          toDate: response.data.toDate ? new Date(response.data.toDate).toISOString().split('T')[0] : '',
          lastUpdated: new Date().toISOString().split('T')[0],
          comments: 0,
          ...response.data
        };
        setLeaveApplications(prev => 
          prev.map(app => 
            app.id === id ? updated : app
          )
        );
        return updated;
      }
    } catch (err) {
      console.error('Error updating leave application:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteLeaveApplication = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await leaveApplicationAPI.delete(id);
      if (response.success) {
        setLeaveApplications(prev => prev.filter(app => app.id !== id));
      }
    } catch (err) {
      console.error('Error deleting leave application:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const approveLeaveApplication = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await leaveApplicationAPI.approve(id);
      if (response.success) {
        await fetchLeaveApplications();
      }
    } catch (err) {
      console.error('Error approving leave application:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectLeaveApplication = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await leaveApplicationAPI.reject(id);
      if (response.success) {
        await fetchLeaveApplications();
      }
    } catch (err) {
      console.error('Error rejecting leave application:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    leaveApplications,
    loading,
    error,
    addLeaveApplication,
    updateLeaveApplication,
    deleteLeaveApplication,
    approveLeaveApplication,
    rejectLeaveApplication,
    fetchLeaveApplications
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
