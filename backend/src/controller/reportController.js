const reportService = require("../services/reportService");

const addReport = async (req, res) => {
  const hospitalId = req.user._id;
  const reportData = req.body;

  try {
    const report = await reportService.addReport(reportData, hospitalId);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReports = async (req, res) => {
  const { id } = req.params;

  try {
    const reports = await reportService.getReportsByPatientId(id);
    res.status(200).json(reports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getReportsByHospital = async (req, res) => {
  const hospitalId = req.user._id;
  const { id: patientId } = req.params;

  try {
    const reports = await reportService.getReportsByHospitalAndPatientId(
      hospitalId,
      patientId
    );
    res.status(200).json(reports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await reportService.getReportById(id);
    res.status(200).json(report);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await reportService.updateReport(id, req.body);
    res.status(200).json(report);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await reportService.deleteReport(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserReports = async (req, res) => {
  const userId = req.user._id;

  try {
    const reports = await reportService.getUserReports(userId);
    res.status(200).json(reports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  addReport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
  getReportsByHospital,
  getUserReports,
};
