'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { employeeAPI } from '../lib/api';

const EmployeeContext = createContext();

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeAPI.getAll(params);
      if (response.success) {
        // Transform API response to match component expectations
        const transformedEmployees = response.data.map(emp => ({
          id: emp._id,
          fullName: `${emp.firstName} ${emp.middleName ? emp.middleName + ' ' : ''}${emp.lastName || ''}`.trim(),
          status: emp.status || 'Active',
          designation: emp.designation || '-',
          employeeId: emp.employeeId || `HR-EMP-${emp._id}`,
          lastUpdated: emp.updatedAt ? new Date(emp.updatedAt).toLocaleDateString() : 'now',
          comments: 0,
          ...emp // Include all API data
        }));
        setEmployees(transformedEmployees);
      }
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employeeData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeAPI.create(employeeData);
      if (response.success) {
        const newEmployee = {
          id: response.data._id,
          fullName: `${response.data.firstName} ${response.data.middleName ? response.data.middleName + ' ' : ''}${response.data.lastName || ''}`.trim(),
          status: response.data.status || 'Active',
          designation: response.data.designation || '-',
          employeeId: response.data.employeeId || `HR-EMP-${response.data._id}`,
          lastUpdated: 'now',
          comments: 0,
          ...response.data
        };
        setEmployees(prevEmployees => [newEmployee, ...prevEmployees]);
        return newEmployee;
      }
    } catch (err) {
      console.error('Error adding employee:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id, updatedData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeAPI.update(id, updatedData);
      if (response.success) {
        const updated = {
          id: response.data._id,
          fullName: `${response.data.firstName} ${response.data.middleName ? response.data.middleName + ' ' : ''}${response.data.lastName || ''}`.trim(),
          status: response.data.status || 'Active',
          designation: response.data.designation || '-',
          employeeId: response.data.employeeId || `HR-EMP-${response.data._id}`,
          lastUpdated: 'now',
          comments: 0,
          ...response.data
        };
        setEmployees(prevEmployees =>
          prevEmployees.map(employee =>
            employee.id === id ? updated : employee
          )
        );
        return updated;
      }
    } catch (err) {
      console.error('Error updating employee:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeAPI.delete(id);
      if (response.success) {
        setEmployees(prevEmployees =>
          prevEmployees.filter(employee => employee.id !== id)
        );
      }
    } catch (err) {
      console.error('Error deleting employee:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    employees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    fetchEmployees
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
