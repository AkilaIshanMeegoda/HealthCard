const Doctor = require("../models/Doctor");

const createDoctor = async (doctorData) => {
  return await Doctor.create(doctorData);
};

const getAllByHospitalId = async (hospitalId) => {
  return await Doctor.find({ hospitalId });
};

const getById = async (id) => {
  return await Doctor.findById(id);
};

const updateById = async (id, updatedData) => {
  return await Doctor.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteById = async (id) => {
  return await Doctor.findByIdAndDelete(id);
};

module.exports = {
  createDoctor,
  getAllByHospitalId,
  getById,
  updateById,
  deleteById,
};
