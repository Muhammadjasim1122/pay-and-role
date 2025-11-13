'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

const PayrollContext = createContext();

const formatDate = (value) => {
  if (!value) return '';
  if (typeof value === 'string' && value.includes('T')) {
    return value.split('T')[0];
  }
  return value;
};

export function PayrollProvider({ children }) {
  const [salarySlips, setSalarySlips] = useState([]);
  const [salaryRegisters, setSalaryRegisters] = useState([]);
  const [payrollEntries, setPayrollEntries] = useState([]);
  const [loading, setLoading] = useState({
    salarySlips: false,
    salaryRegisters: false,
    payrollEntries: false,
  });
  const [error, setError] = useState({
    salarySlips: null,
    salaryRegisters: null,
    payrollEntries: null,
  });

  // Generate unique ID
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Salary Slip functions
  const addSalarySlip = useCallback((data) => {
    const newSlip = {
      id: generateId(),
      employee: data.employee || '',
      employeeId: data.employeeId || '',
      payPeriod: data.payPeriod || '',
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
      postingDate: formatDate(data.postingDate) || formatDate(new Date()),
      salaryStructure: data.salaryStructure || '',
      base: parseFloat(data.base) || 0,
      grossPay: parseFloat(data.grossPay) || 0,
      totalDeduction: parseFloat(data.totalDeduction) || 0,
      netPay: parseFloat(data.netPay) || 0,
      status: data.status || 'Draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSalarySlips((prev) => [...prev, newSlip]);
    return Promise.resolve(newSlip);
  }, []);

  const updateSalarySlip = useCallback((id, data) => {
    setSalarySlips((prev) =>
      prev.map((slip) =>
        slip.id === id
          ? {
              ...slip,
              ...data,
              startDate: formatDate(data.startDate || slip.startDate),
              endDate: formatDate(data.endDate || slip.endDate),
              postingDate: formatDate(data.postingDate || slip.postingDate),
              base: parseFloat(data.base) || slip.base,
              grossPay: parseFloat(data.grossPay) || slip.grossPay,
              totalDeduction: parseFloat(data.totalDeduction) || slip.totalDeduction,
              netPay: parseFloat(data.netPay) || slip.netPay,
              updatedAt: new Date().toISOString(),
            }
          : slip
      )
    );
    return Promise.resolve();
  }, []);

  const deleteSalarySlip = useCallback((id) => {
    setSalarySlips((prev) => prev.filter((slip) => slip.id !== id));
    return Promise.resolve();
  }, []);

  const getSalarySlipById = useCallback((id) => {
    return salarySlips.find((slip) => slip.id === id);
  }, [salarySlips]);

  // Salary Register functions
  const addSalaryRegister = useCallback((data) => {
    const newRegister = {
      id: generateId(),
      payPeriod: data.payPeriod || '',
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
      department: data.department || '',
      branch: data.branch || '',
      company: data.company || '',
      status: data.status || 'Draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSalaryRegisters((prev) => [...prev, newRegister]);
    return Promise.resolve(newRegister);
  }, []);

  const updateSalaryRegister = useCallback((id, data) => {
    setSalaryRegisters((prev) =>
      prev.map((register) =>
        register.id === id
          ? {
              ...register,
              ...data,
              startDate: formatDate(data.startDate || register.startDate),
              endDate: formatDate(data.endDate || register.endDate),
              updatedAt: new Date().toISOString(),
            }
          : register
      )
    );
    return Promise.resolve();
  }, []);

  const deleteSalaryRegister = useCallback((id) => {
    setSalaryRegisters((prev) => prev.filter((register) => register.id !== id));
    return Promise.resolve();
  }, []);

  const getSalaryRegisterById = useCallback((id) => {
    return salaryRegisters.find((register) => register.id === id);
  }, [salaryRegisters]);

  // Payroll Entry functions
  const addPayrollEntry = useCallback((data) => {
    const newEntry = {
      id: generateId(),
      employee: data.employee || '',
      employeeId: data.employeeId || '',
      payPeriod: data.payPeriod || '',
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
      postingDate: formatDate(data.postingDate) || formatDate(new Date()),
      salaryStructure: data.salaryStructure || '',
      base: parseFloat(data.base) || 0,
      grossPay: parseFloat(data.grossPay) || 0,
      totalDeduction: parseFloat(data.totalDeduction) || 0,
      netPay: parseFloat(data.netPay) || 0,
      status: data.status || 'Draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPayrollEntries((prev) => [...prev, newEntry]);
    return Promise.resolve(newEntry);
  }, []);

  const updatePayrollEntry = useCallback((id, data) => {
    setPayrollEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              ...data,
              startDate: formatDate(data.startDate || entry.startDate),
              endDate: formatDate(data.endDate || entry.endDate),
              postingDate: formatDate(data.postingDate || entry.postingDate),
              base: parseFloat(data.base) || entry.base,
              grossPay: parseFloat(data.grossPay) || entry.grossPay,
              totalDeduction: parseFloat(data.totalDeduction) || entry.totalDeduction,
              netPay: parseFloat(data.netPay) || entry.netPay,
              updatedAt: new Date().toISOString(),
            }
          : entry
      )
    );
    return Promise.resolve();
  }, []);

  const deletePayrollEntry = useCallback((id) => {
    setPayrollEntries((prev) => prev.filter((entry) => entry.id !== id));
    return Promise.resolve();
  }, []);

  const getPayrollEntryById = useCallback((id) => {
    return payrollEntries.find((entry) => entry.id === id);
  }, [payrollEntries]);

  const value = {
    // Salary Slips
    salarySlips,
    addSalarySlip,
    updateSalarySlip,
    deleteSalarySlip,
    getSalarySlipById,
    // Salary Registers
    salaryRegisters,
    addSalaryRegister,
    updateSalaryRegister,
    deleteSalaryRegister,
    getSalaryRegisterById,
    // Payroll Entries
    payrollEntries,
    addPayrollEntry,
    updatePayrollEntry,
    deletePayrollEntry,
    getPayrollEntryById,
    // Loading and Error states
    loading,
    error,
  };

  return <PayrollContext.Provider value={value}>{children}</PayrollContext.Provider>;
}

export function usePayroll() {
  const context = useContext(PayrollContext);
  if (!context) {
    throw new Error('usePayroll must be used within a PayrollProvider');
  }
  return context;
}

