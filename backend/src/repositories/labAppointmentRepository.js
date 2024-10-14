const LabAppointment = require('../models/LabAppointment');

const getAllByHospitalId = async (hospitalId) => {
  return await LabAppointment.find({ hospitalId });
};

const getById = async (id) => {
  return await LabAppointment.findById(id);
};

const create = async (appointmentData) => {
  return await LabAppointment.create(appointmentData);
};

const updateById = async (id, updatedData) => {
  return await LabAppointment.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteById = async (id) => {
  return await LabAppointment.findByIdAndDelete(id);
};

const getByEmail = async (email) => {
  return await LabAppointment.find({ email });
};

module.exports = {
  getAllByHospitalId,
  getById,
  create,
  updateById,
  deleteById,
  getByEmail,
};
