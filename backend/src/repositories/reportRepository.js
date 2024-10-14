const Report = require("../models/Report.js");

const createReport = async (reportData) => {
  return await Report.create(reportData);
};

const findReportsByPatientId = async (patientId) => {
  return await Report.find({ patientId });
};

const findReportsByHospitalAndPatientId = async (hospitalId, patientId) => {
  return await Report.find({ hospitalId, patientId });
};

const findReportById = async (id) => {
  return await Report.findById(id);
};

const updateReportById = async (id, reportData) => {
  return await Report.findByIdAndUpdate(id, reportData, { new: true });
};

const deleteReportById = async (id) => {
  return await Report.findByIdAndDelete(id);
};

const findReportsByUserId = async (userId) => {
  return await Report.find({ patientId: userId });
};

module.exports = {
  createReport,
  findReportsByPatientId,
  findReportsByHospitalAndPatientId,
  findReportById,
  updateReportById,
  deleteReportById,
  findReportsByUserId,
};
