'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jobOpeningAPI, jobApplicantAPI, jobOfferAPI } from '../lib/api';

const RecruitmentContext = createContext();

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
};

export function RecruitmentProvider({ children }) {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [jobApplicants, setJobApplicants] = useState([]);
  const [jobOffers, setJobOffers] = useState([]);
  const [loading, setLoading] = useState({
    jobOpenings: false,
    jobApplicants: false,
    jobOffers: false,
  });
  const [error, setError] = useState({
    jobOpenings: null,
    jobApplicants: null,
    jobOffers: null,
  });

  const transformJobOpening = useCallback(
    (job) => ({
      id: job._id?.toString() || job.id,
      sequence: job.sequence ?? null,
      displayId:
        job.sequence !== undefined && job.sequence !== null
          ? job.sequence.toString()
          : job.reference || job.id,
      title: job.title || '',
      department: job.department || '',
      description: job.description || '',
      location: job.location || '',
      employmentType: job.employmentType || '',
      experience: job.experience || '',
      salary: job.salary || '',
      status: job.status || 'Active',
      applicants: job.applicantsCount ?? job.applicants ?? 0,
      applicantsCount: job.applicantsCount ?? job.applicants ?? 0,
      postedDate: formatDate(job.postedDate) || formatDate(job.createdAt) || '',
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    }),
    []
  );

  const transformJobApplicant = useCallback(
    (applicant) => ({
      id: applicant._id?.toString() || applicant.id,
      sequence: applicant.sequence ?? null,
      displayId:
        applicant.sequence !== undefined && applicant.sequence !== null
          ? applicant.sequence.toString()
          : applicant.reference || applicant.id,
      name: applicant.name || '',
      email: applicant.email || '',
      phone: applicant.phone || '',
      position: applicant.position || '',
      resume: applicant.resume || '',
      coverLetter: applicant.coverLetter || '',
      status: applicant.status || 'Applied',
      date: formatDate(applicant.appliedDate) || formatDate(applicant.createdAt) || '',
      appliedDate: applicant.appliedDate,
      jobOpening: applicant.jobOpening || null,
      createdAt: applicant.createdAt,
      updatedAt: applicant.updatedAt,
    }),
    []
  );

  const transformJobOffer = useCallback(
    (offer) => ({
      id: offer._id?.toString() || offer.id,
      sequence: offer.sequence ?? null,
      displayId:
        offer.sequence !== undefined && offer.sequence !== null
          ? offer.sequence.toString()
          : offer.reference || offer.id,
      candidate: offer.candidate || '',
      position: offer.position || '',
      department: offer.department || '',
      salary: offer.salary || '',
      startDate: formatDate(offer.startDate),
      offerDate: formatDate(offer.offerDate) || formatDate(offer.createdAt) || '',
      status: offer.status || 'Pending',
      notes: offer.notes || '',
      jobApplicant: offer.jobApplicant || null,
      createdAt: offer.createdAt,
      updatedAt: offer.updatedAt,
    }),
    []
  );

  const setLoadingState = useCallback((key, value) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setErrorState = useCallback((key, message) => {
    setError((prev) => ({ ...prev, [key]: message }));
  }, []);

  const fetchJobOpenings = useCallback(
    async (params = {}) => {
      try {
        setLoadingState('jobOpenings', true);
        setErrorState('jobOpenings', null);
        const response = await jobOpeningAPI.getAll(params);
        if (response.success) {
          setJobOpenings(response.data.map(transformJobOpening));
        }
      } catch (err) {
        console.error('Error fetching job openings:', err);
        setErrorState('jobOpenings', err.message || 'Failed to load job openings.');
      } finally {
        setLoadingState('jobOpenings', false);
      }
    },
    [setLoadingState, setErrorState, transformJobOpening]
  );

  const fetchJobApplicants = useCallback(
    async (params = {}) => {
      try {
        setLoadingState('jobApplicants', true);
        setErrorState('jobApplicants', null);
        const response = await jobApplicantAPI.getAll(params);
        if (response.success) {
          setJobApplicants(response.data.map(transformJobApplicant));
        }
      } catch (err) {
        console.error('Error fetching job applicants:', err);
        setErrorState('jobApplicants', err.message || 'Failed to load job applicants.');
      } finally {
        setLoadingState('jobApplicants', false);
      }
    },
    [setLoadingState, setErrorState, transformJobApplicant]
  );

  const fetchJobOffers = useCallback(
    async (params = {}) => {
      try {
        setLoadingState('jobOffers', true);
        setErrorState('jobOffers', null);
        const response = await jobOfferAPI.getAll(params);
        if (response.success) {
          setJobOffers(response.data.map(transformJobOffer));
        }
      } catch (err) {
        console.error('Error fetching job offers:', err);
        setErrorState('jobOffers', err.message || 'Failed to load job offers.');
      } finally {
        setLoadingState('jobOffers', false);
      }
    },
    [setLoadingState, setErrorState, transformJobOffer]
  );

  useEffect(() => {
    fetchJobOpenings();
    fetchJobApplicants();
    fetchJobOffers();
  }, [fetchJobOpenings, fetchJobApplicants, fetchJobOffers]);

  const addJobOpening = useCallback(
    async (data) => {
      try {
        const response = await jobOpeningAPI.create(data);
        if (response.success) {
          const transformed = transformJobOpening(response.data);
          setJobOpenings((prev) => [transformed, ...prev]);
          return transformed;
        }
        throw new Error(response.message || 'Failed to create job opening.');
      } catch (error) {
        console.error('Error creating job opening:', error);
        throw error;
      }
    },
    [transformJobOpening]
  );

  const updateJobOpening = useCallback(
    async (id, data) => {
      try {
        const response = await jobOpeningAPI.update(id, data);
        if (response.success) {
          const transformed = transformJobOpening(response.data);
          setJobOpenings((prev) => prev.map((job) => (job.id === transformed.id ? transformed : job)));
          return transformed;
        }
        throw new Error(response.message || 'Failed to update job opening.');
      } catch (error) {
        console.error('Error updating job opening:', error);
        throw error;
      }
    },
    [transformJobOpening]
  );

  const deleteJobOpening = useCallback(async (id) => {
    try {
      await jobOpeningAPI.delete(id);
      setJobOpenings((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      console.error('Error deleting job opening:', error);
      throw error;
    }
  }, []);

  const addJobApplicant = useCallback(
    async (data) => {
      try {
        const response = await jobApplicantAPI.create(data);
        if (response.success) {
          const transformed = transformJobApplicant(response.data);
          setJobApplicants((prev) => [transformed, ...prev]);
          return transformed;
        }
        throw new Error(response.message || 'Failed to add job applicant.');
      } catch (error) {
        console.error('Error creating job applicant:', error);
        throw error;
      }
    },
    [transformJobApplicant]
  );

  const updateJobApplicant = useCallback(
    async (id, data) => {
      try {
        const response = await jobApplicantAPI.update(id, data);
        if (response.success) {
          const transformed = transformJobApplicant(response.data);
          setJobApplicants((prev) => prev.map((applicant) => (applicant.id === transformed.id ? transformed : applicant)));
          return transformed;
        }
        throw new Error(response.message || 'Failed to update job applicant.');
      } catch (error) {
        console.error('Error updating job applicant:', error);
        throw error;
      }
    },
    [transformJobApplicant]
  );

  const deleteJobApplicant = useCallback(async (id) => {
    try {
      await jobApplicantAPI.delete(id);
      setJobApplicants((prev) => prev.filter((applicant) => applicant.id !== id));
    } catch (error) {
      console.error('Error deleting job applicant:', error);
      throw error;
    }
  }, []);

  const addJobOffer = useCallback(
    async (data) => {
      try {
        const response = await jobOfferAPI.create(data);
        if (response.success) {
          const transformed = transformJobOffer(response.data);
          setJobOffers((prev) => [transformed, ...prev]);
          return transformed;
        }
        throw new Error(response.message || 'Failed to create job offer.');
      } catch (error) {
        console.error('Error creating job offer:', error);
        throw error;
      }
    },
    [transformJobOffer]
  );

  const updateJobOffer = useCallback(
    async (id, data) => {
      try {
        const response = await jobOfferAPI.update(id, data);
        if (response.success) {
          const transformed = transformJobOffer(response.data);
          setJobOffers((prev) => prev.map((offer) => (offer.id === transformed.id ? transformed : offer)));
          return transformed;
        }
        throw new Error(response.message || 'Failed to update job offer.');
      } catch (error) {
        console.error('Error updating job offer:', error);
        throw error;
      }
    },
    [transformJobOffer]
  );

  const deleteJobOffer = useCallback(async (id) => {
    try {
      await jobOfferAPI.delete(id);
      setJobOffers((prev) => prev.filter((offer) => offer.id !== id));
    } catch (error) {
      console.error('Error deleting job offer:', error);
      throw error;
    }
  }, []);

  const getJobOpeningById = useCallback((id) => jobOpenings.find((job) => job.id === id), [jobOpenings]);
  const getJobApplicantById = useCallback((id) => jobApplicants.find((applicant) => applicant.id === id), [jobApplicants]);
  const getJobOfferById = useCallback((id) => jobOffers.find((offer) => offer.id === id), [jobOffers]);

  return (
    <RecruitmentContext.Provider
      value={{
        jobOpenings,
        jobApplicants,
        jobOffers,
        loading,
        error,
        fetchJobOpenings,
        fetchJobApplicants,
        fetchJobOffers,
        addJobOpening,
        updateJobOpening,
        deleteJobOpening,
        getJobOpeningById,
        addJobApplicant,
        updateJobApplicant,
        deleteJobApplicant,
        getJobApplicantById,
        addJobOffer,
        updateJobOffer,
        deleteJobOffer,
        getJobOfferById,
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

