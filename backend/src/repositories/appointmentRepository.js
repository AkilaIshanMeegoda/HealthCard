// repositories/appointmentRepository.js
const Appointment = require("../models/Appointment");
const User = require("../models/User");

const getAllByHospitalId = async (hospitalId) => {
  const user = await User.findById(hospitalId);
  return await Appointment.find({ hospitalId: user.hospitalId });
};

const getById = async (id) => {
  return await Appointment.findById(id);
};

const create = async (appointmentData) => {
  return await Appointment.create(appointmentData);
};

const updateById = async (id, updatedData) => {
  return await Appointment.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteById = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};

const getByEmail = async (email) => {
  return await Appointment.find({ email });
};

const getByDateAndDoctor = async (date, hospitalId, doctorId) => {
  return await Appointment.find({ date, hospitalId, doctorId });
};

module.exports = {
  getAllByHospitalId,
  getById,
  create,
  updateById,
  deleteById,
  getByEmail,
  getByDateAndDoctor,
};
