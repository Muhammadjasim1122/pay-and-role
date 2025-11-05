'use client';

import React, { createContext, useContext, useState } from 'react';

const RecruitmentContext = createContext();

export function RecruitmentProvider({ children }) {
  const [jobOpenings, setJobOpenings] = useState([
    { id: 'JO001', title: 'Senior Software Engineer', department: 'Engineering', status: 'Active', applicants: 24, postedDate: '2024-01-15' },
    { id: 'JO002', title: 'Product Manager', department: 'Product', status: 'Active', applicants: 18, postedDate: '2024-01-20' },
    { id: 'JO003', title: 'UX Designer', department: 'Design', status: 'Active', applicants: 32, postedDate: '2024-01-25' },
    { id: 'JO004', title: 'Marketing Manager', department: 'Marketing', status: 'Closed', applicants: 15, postedDate: '2024-01-10' },
    { id: 'JO005', title: 'HR Business Partner', department: 'HR', status: 'Active', applicants: 12, postedDate: '2024-02-01' },
    { id: 'JO006', title: 'Frontend Developer', department: 'Engineering', status: 'Active', applicants: 28, postedDate: '2024-02-05' },
    { id: 'JO007', title: 'Data Analyst', department: 'Analytics', status: 'Active', applicants: 21, postedDate: '2024-02-10' },
    { id: 'JO008', title: 'Sales Executive', department: 'Sales', status: 'Active', applicants: 19, postedDate: '2024-02-12' },
  ]);

  const [jobApplicants, setJobApplicants] = useState([
    { id: 'APP001', name: 'John Smith', email: 'john.smith@example.com', phone: '+1234567890', position: 'Software Engineer', status: 'Applied', date: '2024-02-15', resume: '✓' },
    { id: 'APP002', name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '+1234567891', position: 'Product Manager', status: 'Screening', date: '2024-02-16', resume: '✓' },
    { id: 'APP003', name: 'Michael Brown', email: 'm.brown@example.com', phone: '+1234567892', position: 'UX Designer', status: 'Interview', date: '2024-02-17', resume: '✓' },
    { id: 'APP004', name: 'Emily Davis', email: 'emily.davis@example.com', phone: '+1234567893', position: 'Marketing Manager', status: 'Hired', date: '2024-02-10', resume: '✓' },
    { id: 'APP005', name: 'David Wilson', email: 'd.wilson@example.com', phone: '+1234567894', position: 'HR Business Partner', status: 'Rejected', date: '2024-02-18', resume: '✓' },
    { id: 'APP006', name: 'Lisa Anderson', email: 'lisa.a@example.com', phone: '+1234567895', position: 'Frontend Developer', status: 'Applied', date: '2024-02-19', resume: '✓' },
    { id: 'APP007', name: 'Robert Taylor', email: 'r.taylor@example.com', phone: '+1234567896', position: 'Data Analyst', status: 'Screening', date: '2024-02-20', resume: '✓' },
    { id: 'APP008', name: 'Jennifer Martinez', email: 'j.martinez@example.com', phone: '+1234567897', position: 'Sales Executive', status: 'Interview', date: '2024-02-21', resume: '✓' },
  ]);

  const [jobOffers, setJobOffers] = useState([
    { id: 'OF001', candidate: 'John Smith', position: 'Senior Software Engineer', department: 'Engineering', offerDate: '2024-02-20', status: 'Accepted', salary: '$120,000', startDate: '2024-03-15' },
    { id: 'OF002', candidate: 'Sarah Johnson', position: 'Product Manager', department: 'Product', offerDate: '2024-02-22', status: 'Pending', salary: '$130,000', startDate: '2024-03-20' },
    { id: 'OF003', candidate: 'Michael Brown', position: 'UX Designer', department: 'Design', offerDate: '2024-02-24', status: 'Accepted', salary: '$110,000', startDate: '2024-03-25' },
    { id: 'OF004', candidate: 'Emily Davis', position: 'Marketing Manager', department: 'Marketing', offerDate: '2024-02-18', status: 'Rejected', salary: '$105,000', startDate: '-' },
    { id: 'OF005', candidate: 'David Wilson', position: 'HR Business Partner', department: 'HR', offerDate: '2024-02-26', status: 'Pending', salary: '$95,000', startDate: '2024-04-01' },
    { id: 'OF006', candidate: 'Lisa Anderson', position: 'Frontend Developer', department: 'Engineering', offerDate: '2024-02-28', status: 'Accepted', salary: '$115,000', startDate: '2024-03-30' },
    { id: 'OF007', candidate: 'Robert Taylor', position: 'Data Analyst', department: 'Analytics', offerDate: '2024-03-01', status: 'Pending', salary: '$90,000', startDate: '2024-04-05' },
    { id: 'OF008', candidate: 'Jennifer Martinez', position: 'Sales Executive', department: 'Sales', offerDate: '2024-03-02', status: 'Accepted', salary: '$100,000', startDate: '2024-04-10' },
  ]);

  const addJobOpening = (job) => {
    const newId = `JO${String(jobOpenings.length + 1).padStart(3, '0')}`;
    const newJob = {
      id: newId,
      title: job.title,
      department: job.department || '',
      status: job.status || 'Active',
      applicants: 0,
      postedDate: new Date().toISOString().split('T')[0]
    };
    setJobOpenings([...jobOpenings, newJob]);
  };

  const addJobApplicant = (applicant) => {
    const newId = `APP${String(jobApplicants.length + 1).padStart(3, '0')}`;
    const newApplicant = {
      id: newId,
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
      position: applicant.position,
      status: applicant.status || 'Applied',
      date: new Date().toISOString().split('T')[0],
      resume: '✓'
    };
    setJobApplicants([...jobApplicants, newApplicant]);
  };

  const addJobOffer = (offer) => {
    const newId = `OF${String(jobOffers.length + 1).padStart(3, '0')}`;
    const newOffer = {
      id: newId,
      candidate: offer.candidate,
      position: offer.position,
      department: offer.department,
      offerDate: offer.offerDate || new Date().toISOString().split('T')[0],
      status: offer.status || 'Pending',
      salary: offer.salary,
      startDate: offer.startDate || '-'
    };
    setJobOffers([...jobOffers, newOffer]);
  };

  // Delete functions
  const deleteJobOpening = (id) => {
    setJobOpenings(jobOpenings.filter(job => job.id !== id));
  };

  const deleteJobApplicant = (id) => {
    setJobApplicants(jobApplicants.filter(applicant => applicant.id !== id));
  };

  const deleteJobOffer = (id) => {
    setJobOffers(jobOffers.filter(offer => offer.id !== id));
  };

  // Update functions
  const updateJobOpening = (id, updatedData) => {
    setJobOpenings(jobOpenings.map(job => 
      job.id === id ? { ...job, ...updatedData } : job
    ));
  };

  const updateJobApplicant = (id, updatedData) => {
    setJobApplicants(jobApplicants.map(applicant => 
      applicant.id === id ? { ...applicant, ...updatedData } : applicant
    ));
  };

  const updateJobOffer = (id, updatedData) => {
    setJobOffers(jobOffers.map(offer => 
      offer.id === id ? { ...offer, ...updatedData } : offer
    ));
  };

  // Get single item functions
  const getJobOpeningById = (id) => {
    return jobOpenings.find(job => job.id === id);
  };

  const getJobApplicantById = (id) => {
    return jobApplicants.find(applicant => applicant.id === id);
  };

  const getJobOfferById = (id) => {
    return jobOffers.find(offer => offer.id === id);
  };

  return (
    <RecruitmentContext.Provider
      value={{
        jobOpenings,
        addJobOpening,
        deleteJobOpening,
        updateJobOpening,
        getJobOpeningById,
        jobApplicants,
        addJobApplicant,
        deleteJobApplicant,
        updateJobApplicant,
        getJobApplicantById,
        jobOffers,
        addJobOffer,
        deleteJobOffer,
        updateJobOffer,
        getJobOfferById
      }}
    >
      {children}
    </RecruitmentContext.Provider>
  );
}

export function useRecruitment() {
  const context = useContext(RecruitmentContext);
  if (!context) {
    throw new Error('useRecruitment must be used within a RecruitmentProvider');
  }
  return context;
}

