/**
 * API Service for Lucky Clinic System
 * Centralized axios-like wrapper for fetch calls
 */

const BASE_URL = "http://localhost:8000/api";

const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("auth_token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      const error = (data && data.detail) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    return Promise.reject(error.message || "Network Error");
  }
};

export const api = {
  login: (credentials) => apiRequest("/login/", { method: "POST", body: JSON.stringify(credentials) }),
  
  bookAppointment: (bookingData) => apiRequest("/appointments/", { 
    method: "POST", 
    body: JSON.stringify(bookingData) 
  }),

  getDashboardStats: () => apiRequest("/dashboard/", { method: "GET" }),
  
  getPatients: () => apiRequest("/patients/", { method: "GET" }),
  
  getAppointments: () => apiRequest("/appointments/", { method: "GET" }),
};
