'use client';

import React, { createContext, useContext, useState } from 'react';

const EmployeeContext = createContext();

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children }) => {
  // Sample initial employee data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      fullName: 'muhammad jasim khan',
      status: 'Active',
      designation: '-',
      employeeId: 'HR-EMP-00001',
      lastUpdated: '22h',
      comments: 0
    },
    {
      id: 2,
      fullName: 'muhammad jasim muhammad jasim',
      status: 'Active',
      designation: 'Accountant',
      employeeId: 'HR-EMP-00002',
      lastUpdated: '2m',
      comments: 0
    }
  ]);

  const addEmployee = (employeeData) => {
    const newEmployee = {
      id: employees.length + 1,
      fullName: `${employeeData.firstName} ${employeeData.middleName ? employeeData.middleName + ' ' : ''}${employeeData.lastName}`.trim(),
      status: employeeData.status || 'Active',
      designation: employeeData.designation || '-',
      employeeId: `HR-EMP-${String(employees.length + 1).padStart(5, '0')}`,
      lastUpdated: 'now',
      comments: 0,
      ...employeeData // Include all form data
    };
    
    setEmployees(prevEmployees => [newEmployee, ...prevEmployees]);
    return newEmployee;
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.id === id ? { ...employee, ...updatedData } : employee
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees(prevEmployees =>
      prevEmployees.filter(employee => employee.id !== id)
    );
  };

  const value = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
