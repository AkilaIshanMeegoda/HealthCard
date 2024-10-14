const doctorService = require("../services/doctorService");
const mongoose = require("mongoose");
const { handleErrorResponse } = require("../utils/errorUtil");

const addDoctor = async (req, res) => {
  try {
    const doctor = await doctorService.createDoctor(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    handleErrorResponse(res, 400, error.message);
  }
};

const getDoctorsByHospital = async (req, res) => {
  try {
    const doctors = await doctorService.getDoctorsByHospital(req.params.hospitalId);
    res.status(200).json(doctors);
  } catch (error) {
    handleErrorResponse(res, 404, error.message);
  }
};

const getDoctorById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleErrorResponse(res, 400, "Invalid doctor ID format.");
  }

  try {
    const doctor = await doctorService.getDoctorById(id);
    res.status(200).json(doctor);
  } catch (error) {
    handleErrorResponse(res, 404, error.message);
  }
};

const updateDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleErrorResponse(res, 400, "Invalid doctor ID.");
  }

  try {
    const doctor = await doctorService.updateDoctor(id, req.body);
    res.status(200).json(doctor);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleErrorResponse(res, 400, "Invalid doctor ID.");
  }

  try {
    const result = await doctorService.deleteDoctor(id);
    res.status(200).json(result);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

module.exports = {
  addDoctor,
  getDoctorsByHospital,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
