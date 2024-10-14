const serviceRepository = require("../repositories/serviceRepository");

const addService = async (serviceData) => {
  return await serviceRepository.createService(serviceData);
};

const getServicesByHospitalId = async (hospitalId) => {
  return await serviceRepository.getAllByHospitalId(hospitalId);
};

const getServiceById = async (id) => {
  const service = await serviceRepository.getById(id);
  if (!service) {
    throw new Error("Service not found");
  }
  return service;
};

const updateService = async (id, updatedData) => {
  return await serviceRepository.updateById(id, updatedData);
};

const deleteService = async (id) => {
  await serviceRepository.deleteById(id);
};

module.exports = {
  addService,
  getServicesByHospitalId,
  getServiceById,
  updateService,
  deleteService,
};
