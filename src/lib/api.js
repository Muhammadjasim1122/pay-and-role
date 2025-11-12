// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add body if it exists
  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || `HTTP ${response.status}: ${response.statusText}`);
    }

    if (!response.ok) {
      // Log the full error for debugging
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        data: data,
        url: url
      });
      
      // Extract error message from various possible formats
      let errorMessage = 'Something went wrong!';
      if (data && data.message) {
        errorMessage = data.message;
      } else if (data && data.error && typeof data.error === 'string') {
        errorMessage = data.error;
      } else if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      } else if (response.statusText) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    // If it's already an Error object, rethrow it
    if (error instanceof Error) {
      throw error;
    }
    // Otherwise wrap it
    throw new Error(error.message || 'Network error. Please check if the backend server is running.');
  }
};

// Employee API
export const employeeAPI = {
  // Create employee
  create: async (employeeData) => {
    return apiRequest('/hr/employees', {
      method: 'POST',
      body: employeeData,
    });
  },

  // Get all employees
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.status) queryParams.append('status', params.status);
    if (params.search) queryParams.append('search', params.search);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const queryString = queryParams.toString();
    return apiRequest(`/hr/employees${queryString ? `?${queryString}` : ''}`);
  },

  // Get single employee
  getById: async (id) => {
    return apiRequest(`/hr/employees/${id}`);
  },

  // Update employee
  update: async (id, employeeData) => {
    return apiRequest(`/hr/employees/${id}`, {
      method: 'PUT',
      body: employeeData,
    });
  },

  // Delete employee
  delete: async (id) => {
    return apiRequest(`/hr/employees/${id}`, {
      method: 'DELETE',
    });
  },
};

// Holiday List API
export const holidayListAPI = {
  // Create holiday list
  create: async (holidayListData) => {
    return apiRequest('/hr/holiday-lists', {
      method: 'POST',
      body: holidayListData,
    });
  },

  // Get all holiday lists
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append('search', params.search);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const queryString = queryParams.toString();
    return apiRequest(`/hr/holiday-lists${queryString ? `?${queryString}` : ''}`);
  },

  // Get single holiday list
  getById: async (id) => {
    return apiRequest(`/hr/holiday-lists/${id}`);
  },

  // Update holiday list
  update: async (id, holidayListData) => {
    return apiRequest(`/hr/holiday-lists/${id}`, {
      method: 'PUT',
      body: holidayListData,
    });
  },

  // Delete holiday list
  delete: async (id) => {
    return apiRequest(`/hr/holiday-lists/${id}`, {
      method: 'DELETE',
    });
  },

  // Add holiday to holiday list
  addHoliday: async (id, holidayData) => {
    return apiRequest(`/hr/holiday-lists/${id}/holidays`, {
      method: 'POST',
      body: holidayData,
    });
  },

  // Update holiday in holiday list
  updateHoliday: async (id, holidayId, holidayData) => {
    return apiRequest(`/hr/holiday-lists/${id}/holidays/${holidayId}`, {
      method: 'PUT',
      body: holidayData,
    });
  },

  // Delete holiday from holiday list
  deleteHoliday: async (id, holidayId) => {
    return apiRequest(`/hr/holiday-lists/${id}/holidays/${holidayId}`, {
      method: 'DELETE',
    });
  },
};

// Leave Type API
export const leaveTypeAPI = {
  // Create leave type
  create: async (leaveTypeData) => {
    return apiRequest('/hr/leave-types', {
      method: 'POST',
      body: leaveTypeData,
    });
  },

  // Get all leave types
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append('search', params.search);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const queryString = queryParams.toString();
    return apiRequest(`/hr/leave-types${queryString ? `?${queryString}` : ''}`);
  },

  // Get single leave type
  getById: async (id) => {
    return apiRequest(`/hr/leave-types/${id}`);
  },

  // Update leave type
  update: async (id, leaveTypeData) => {
    return apiRequest(`/hr/leave-types/${id}`, {
      method: 'PUT',
      body: leaveTypeData,
    });
  },

  // Delete leave type
  delete: async (id) => {
    return apiRequest(`/hr/leave-types/${id}`, {
      method: 'DELETE',
    });
  },
};

// Leave Allocation API
export const leaveAllocationAPI = {
  // Create leave allocation
  create: async (leaveAllocationData) => {
    return apiRequest('/hr/leave-allocations', {
      method: 'POST',
      body: leaveAllocationData,
    });
  },

  // Get all leave allocations
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.employee) queryParams.append('employee', params.employee);
    if (params.leaveType) queryParams.append('leaveType', params.leaveType);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const queryString = queryParams.toString();
    return apiRequest(`/hr/leave-allocations${queryString ? `?${queryString}` : ''}`);
  },

  // Get single leave allocation
  getById: async (id) => {
    return apiRequest(`/hr/leave-allocations/${id}`);
  },

  // Update leave allocation
  update: async (id, leaveAllocationData) => {
    return apiRequest(`/hr/leave-allocations/${id}`, {
      method: 'PUT',
      body: leaveAllocationData,
    });
  },

  // Delete leave allocation
  delete: async (id) => {
    return apiRequest(`/hr/leave-allocations/${id}`, {
      method: 'DELETE',
    });
  },
};

// Leave Application API
export const leaveApplicationAPI = {
  // Create leave application
  create: async (leaveApplicationData) => {
    return apiRequest('/hr/leave-applications', {
      method: 'POST',
      body: leaveApplicationData,
    });
  },

  // Get all leave applications
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.employee) queryParams.append('employee', params.employee);
    if (params.status) queryParams.append('status', params.status);
    if (params.leaveType) queryParams.append('leaveType', params.leaveType);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const queryString = queryParams.toString();
    return apiRequest(`/hr/leave-applications${queryString ? `?${queryString}` : ''}`);
  },

  // Get single leave application
  getById: async (id) => {
    return apiRequest(`/hr/leave-applications/${id}`);
  },

  // Update leave application
  update: async (id, leaveApplicationData) => {
    return apiRequest(`/hr/leave-applications/${id}`, {
      method: 'PUT',
      body: leaveApplicationData,
    });
  },

  // Delete leave application
  delete: async (id) => {
    return apiRequest(`/hr/leave-applications/${id}`, {
      method: 'DELETE',
    });
  },

  // Approve leave application
  approve: async (id) => {
    return apiRequest(`/hr/leave-applications/${id}/approve`, {
      method: 'PUT',
    });
  },

  // Reject leave application
  reject: async (id) => {
    return apiRequest(`/hr/leave-applications/${id}/reject`, {
      method: 'PUT',
    });
  },
};

// Recruitment APIs
const buildQueryString = (params = {}) => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value);
    }
  });
  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
};

export const jobOpeningAPI = {
  getAll: async (params = {}) => apiRequest(`/recruitment/job-openings${buildQueryString(params)}`),
  getById: async (id) => apiRequest(`/recruitment/job-openings/${id}`),
  create: async (data) =>
    apiRequest('/recruitment/job-openings', {
      method: 'POST',
      body: data,
    }),
  update: async (id, data) =>
    apiRequest(`/recruitment/job-openings/${id}`, {
      method: 'PUT',
      body: data,
    }),
  delete: async (id) =>
    apiRequest(`/recruitment/job-openings/${id}`, {
      method: 'DELETE',
    }),
};

export const jobApplicantAPI = {
  getAll: async (params = {}) => apiRequest(`/recruitment/job-applicants${buildQueryString(params)}`),
  getById: async (id) => apiRequest(`/recruitment/job-applicants/${id}`),
  create: async (data) =>
    apiRequest('/recruitment/job-applicants', {
      method: 'POST',
      body: data,
    }),
  update: async (id, data) =>
    apiRequest(`/recruitment/job-applicants/${id}`, {
      method: 'PUT',
      body: data,
    }),
  delete: async (id) =>
    apiRequest(`/recruitment/job-applicants/${id}`, {
      method: 'DELETE',
    }),
};

export const jobOfferAPI = {
  getAll: async (params = {}) => apiRequest(`/recruitment/job-offers${buildQueryString(params)}`),
  getById: async (id) => apiRequest(`/recruitment/job-offers/${id}`),
  create: async (data) =>
    apiRequest('/recruitment/job-offers', {
      method: 'POST',
      body: data,
    }),
  update: async (id, data) =>
    apiRequest(`/recruitment/job-offers/${id}`, {
      method: 'PUT',
      body: data,
    }),
  delete: async (id) =>
    apiRequest(`/recruitment/job-offers/${id}`, {
      method: 'DELETE',
    }),
};

