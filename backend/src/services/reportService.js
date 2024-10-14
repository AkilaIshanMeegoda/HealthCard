const reportRepository = require("../repositories/reportRepository");
const mongoose = require("mongoose");

const addReport = async (reportData, hospitalId) => {
  reportData.hospitalId = hospitalId;
  return await reportRepository.createReport(reportData);
};

const getReportsByPatientId = async (patientId) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("Invalid patient ID format");
  }
  const reports = await reportRepository.findReportsByPatientId(patientId);
  if (!reports || reports.length === 0) {
    throw new Error("No reports found for this patient ID");
  }
  return reports;
};

const getReportsByHospitalAndPatientId = async (hospitalId, patientId) => {
  const reports = await reportRepository.findReportsByHospitalAndPatientId(
    hospitalId,
    patientId
  );
  if (!reports || reports.length === 0) {
    throw new Error("No reports found for this patient ID");
  }
  return reports;
};

const getReportById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid report ID format");
  }
  const report = await reportRepository.findReportById(id);
  if (!report) {
    throw new Error("No report found for this report ID");
  }
  return report;
};

const updateReport = async (id, reportData) => {
  const report = await reportRepository.updateReportById(id, reportData);
  if (!report) {
    throw new Error("No report with that ID");
  }
  return report;
};

const deleteReport = async (id) => {
  const report = await reportRepository.deleteReportById(id);
  if (!report) {
    throw new Error("No report with that ID");
  }
  return { message: "Report deleted successfully" };
};

const getUserReports = async (userId) => {
  const reports = await reportRepository.findReportsByUserId(userId);
  if (!reports || reports.length === 0) {
    throw new Error("No reports found for this patient ID");
  }
  return reports;
};

module.exports = {
  addReport,
  getReportsByPatientId,
  getReportsByHospitalAndPatientId,
  getReportById,
  updateReport,
  deleteReport,
  getUserReports,
};
