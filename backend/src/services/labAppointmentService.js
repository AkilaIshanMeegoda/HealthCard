const labAppointmentRepository = require('../repositories/labAppointmentRepository');

const searchLabAppointments = async (userId) => {
  const appointments = await labAppointmentRepository.getAllByHospitalId(userId);
  if (!appointments || appointments.length === 0) {
    throw new Error('No appointments found');
  }
  return appointments;
};

const getLabAppointment = async (id) => {
  const appointment = await labAppointmentRepository.getById(id);
  if (!appointment) {
    throw new Error('No appointment with that id');
  }
  return appointment;
};

const createLabAppointment = async (appointmentData) => {
  return await labAppointmentRepository.create(appointmentData);
};

const updateLabAppointment = async (id, updatedData) => {
  return await labAppointmentRepository.updateById(id, updatedData);
};

const deleteLabAppointment = async (id) => {
  return await labAppointmentRepository.deleteById(id);
};

const getLabAppointmentsByEmail = async (email) => {
  const appointments = await labAppointmentRepository.getByEmail(email);
  if (!appointments || appointments.length === 0) {
    throw new Error('No appointments found for this email');
  }
  return appointments;
};

module.exports = {
  searchLabAppointments,
  getLabAppointment,
  createLabAppointment,
  updateLabAppointment,
  deleteLabAppointment,
  getLabAppointmentsByEmail,
};
