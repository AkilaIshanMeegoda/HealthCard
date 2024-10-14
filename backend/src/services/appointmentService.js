// services/appointmentService.js
const appointmentRepository = require("../repositories/appointmentRepository");

const searchAppointments = async (userId) => {
  const appointments = await appointmentRepository.getAllByHospitalId(userId);
  if (!appointments || appointments.length === 0) {
    throw new Error("No appointments found");
  }
  return appointments;
};

const getAppointment = async (id) => {
  const appointment = await appointmentRepository.getById(id);
  if (!appointment) {
    throw new Error("No appointment with that id");
  }
  return appointment;
};

const createAppointment = async (appointmentData) => {
  return await appointmentRepository.create(appointmentData);
};

const updateAppointment = async (id, updatedData) => {
  return await appointmentRepository.updateById(id, updatedData);
};

const deleteAppointment = async (id) => {
  return await appointmentRepository.deleteById(id);
};

const getAppointmentsByEmail = async (email) => {
  const appointments = await appointmentRepository.getByEmail(email);
  if (!appointments || appointments.length === 0) {
    throw new Error("No appointments found for this email");
  }
  return appointments;
};

const getAppointmentsByDate = async (date, hospitalId, doctorId) => {
  return await appointmentRepository.getByDateAndDoctor(date, hospitalId, doctorId);
};

module.exports = {
  searchAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByEmail,
  getAppointmentsByDate,
};
