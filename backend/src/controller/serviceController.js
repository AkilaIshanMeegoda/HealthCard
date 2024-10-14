const serviceService = require("../services/serviceService");
const { handleErrorResponse } = require("../utils/errorUtil");
const mongoose = require("mongoose");

const addService = async (req, res) => {
  try {
    const serviceData = req.body;
    const newService = await serviceService.addService(serviceData);
    return res.status(201).json(newService);
  } catch (error) {
    return handleErrorResponse(res, 400, error.message);
  }
};

const getServices = async (req, res) => {
  try {
    const services = await serviceService.getServicesByHospitalId(req.params.hospitalId);
    return res.status(200).json(services);
  } catch (error) {
    return handleErrorResponse(res, 400, error.message);
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleErrorResponse(res, 400, "Invalid service ID format");
  }

  try {
    const service = await serviceService.getServiceById(id);
    return res.status(200).json(service);
  } catch (error) {
    return handleErrorResponse(res, 404, error.message);
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleErrorResponse(res, 400, "Invalid service ID format");
  }

  try {
    const updatedService = await serviceService.updateService(id, req.body);
    return res.status(200).json(updatedService);
  } catch (error) {
    return handleErrorResponse(res, 400, error.message);
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleErrorResponse(res, 400, "Invalid service ID format");
  }

  try {
    await serviceService.deleteService(id);
    return res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    return handleErrorResponse(res, 400, error.message);
  }
};

module.exports = {
  addService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
