const labAppointmentService = require('../services/labAppointmentService');
const { isValidObjectId } = require('../utils/validationUtil');
const { handleErrorResponse } = require('../utils/errorUtil');

const searchLabAppointments = async (req, res) => {
  try {
    const userId = req.user._id;
    const appointments = await labAppointmentService.searchLabAppointments(userId);
    res.status(200).json(appointments);
  } catch (error) {
    handleErrorResponse(res, 404, error.message);
  }
};

const getLabAppointment = async (req, res) => {
  const { id } = req.params;
  
  if (!isValidObjectId(id)) {
    return handleErrorResponse(res, 400, 'Invalid appointment ID');
  }

  try {
    const appointment = await labAppointmentService.getLabAppointment(id);
    res.status(200).json(appointment);
  } catch (error) {
    handleErrorResponse(res, 404, error.message);
  }
};

const createLabAppointment = async (req, res) => {
  try {
    const appointmentData = { ...req.body, userId: req.user._id };
    const appointment = await labAppointmentService.createLabAppointment(appointmentData);
    res.status(201).json(appointment);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const updateLabAppointment = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return handleErrorResponse(res, 400, 'Invalid appointment ID');
  }

  try {
    const appointment = await labAppointmentService.updateLabAppointment(id, req.body);
    res.status(200).json(appointment);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const deleteLabAppointment = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return handleErrorResponse(res, 400, 'Invalid appointment ID');
  }

  try {
    await labAppointmentService.deleteLabAppointment(id);
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const getLabAppointmentsByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const appointments = await labAppointmentService.getLabAppointmentsByEmail(email);
    res.status(200).json(appointments);
  } catch (error) {
    handleErrorResponse(res, 404, error.message);
  }
};

module.exports = {
  searchLabAppointments,
  getLabAppointment,
  createLabAppointment,
  updateLabAppointment,
  deleteLabAppointment,
  getLabAppointmentsByEmail,
};
