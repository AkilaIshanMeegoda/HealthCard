// API Configuration
// In production, this uses environment variables from .env.production
// In development, it falls back to localhost

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Base URL
  baseURL: API_BASE_URL,
  
  // User endpoints
  users: `${API_BASE_URL}/user`,
  
  // Appointment endpoints
  appointments: `${API_BASE_URL}/appointment`,
  
  // Lab appointment endpoints  
  labAppointments: `${API_BASE_URL}/labappointment`,
  
  // Report endpoints
  reports: `${API_BASE_URL}/report`,
  
  // Patient profile endpoints
  patientProfile: `${API_BASE_URL}/patientprofile`,
  
  // Prescription endpoints
  prescriptions: `${API_BASE_URL}/prescription`,
  
  // Payment endpoints
  payments: `${API_BASE_URL}/api/payment`,
  
  // Doctor endpoints
  doctors: `${API_BASE_URL}/api/doctors`,
  
  // Service endpoints
  services: `${API_BASE_URL}/api/services`,
};

export default API_BASE_URL;
