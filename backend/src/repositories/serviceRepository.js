const Service = require("../models/Service");

const createService = async (serviceData) => {
  return await Service.create(serviceData);
};

const getAllByHospitalId = async (hospitalId) => {
  return await Service.find({ hospitalId });
};

const getById = async (id) => {
  return await Service.findById(id);
};

const updateById = async (id, updatedData) => {
  return await Service.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteById = async (id) => {
  return await Service.findByIdAndDelete(id);
};

module.exports = {
  createService,
  getAllByHospitalId,
  getById,
  updateById,
  deleteById,
};
