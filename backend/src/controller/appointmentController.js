// controllers/appointmentController.js
const appointmentService = require("../services/appointmentService");
const { handleErrorResponse } = require("../utils/errorUtil");
const mongoose = require("mongoose");

const searchAppointments = async (req, res) => {
  try {
    const userId = req.user._id;
    const appointments = await appointmentService.searchAppointments(userId);
    return res.status(200).json(appointments);
  } catch (error) {
    return handleErrorResponse(res, 404, error.message);
  }
};

const getAppointment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleErrorResponse(res, 400, "Invalid appointment ID");
  }

  try {
    const appointment = await appointmentService.getAppointment(id);
    return res.status(200).json(appointment);
  } catch (error) {
    return handleErrorResponse(res, 404, error.message);
  }
};

const createAppointment = async (req, res) => {
  try {
    const appointmentData = { ...req.body, userId: req.user._id };
    const appointment = await appointmentService.createAppointment(appointmentData);
    return res.status(201).json(appointment);
  } catch (error) {
    return handleErrorResponse(res, 500, error.message);
  }
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleErrorResponse(res, 400, "Invalid appointment ID");
  }

  try {
    const appointment = await appointmentService.updateAppointment(id, req.body);
    return res.status(200).json(appointment);
  } catch (error) {
    return handleErrorResponse(res, 500, error.message);
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleErrorResponse(res, 400, "Invalid appointment ID");
  }

  try {
    await appointmentService.deleteAppointment(id);
    return res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    return handleErrorResponse(res, 500, error.message);
  }
};

const getAppointmentsByEmail = async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return handleErrorResponse(res, 400, "Email query parameter is required");
  }

  try {
    const appointments = await appointmentService.getAppointmentsByEmail(email);
    return res.status(200).json(appointments);
  } catch (error) {
    return handleErrorResponse(res, 404, error.message);
  }
};

const getAppointmentsByDate = async (req, res) => {
  const { date, hospitalId, doctorId } = req.query;
  if (!date || !hospitalId || !doctorId) {
    return handleErrorResponse(res, 400, "Date, hospitalId, and doctorId query parameters are required");
  }

  try {
    const appointments = await appointmentService.getAppointmentsByDate(date, hospitalId, doctorId);
    return res.status(200).json(appointments);
  } catch (error) {
    return handleErrorResponse(res, 500, error.message);
  }
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
