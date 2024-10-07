const mongoose = require("mongoose");
const Report = require("../models/Report.js");

const addReport = async (req, res) => {
  const hospitalId = req.user._id;
  const {
    titleName,
    date,
    patientName,
    category,
    description,
    image,
    patientId,
  } = req.body;

  try {
    const report = await Report.create({
      titleName,
      date,
      patientName,
      category,
      description,
      image,
      patientId,
      hospitalId:hospitalId
    });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReports = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Invalid patient ID format");
  }

  try {
    const reports = await Report.find({ patientId: id });

    if (!reports || reports.length === 0) {
      return res.status(404).send("No reports found for this patient ID");
    }

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReportsByHospital = async (req, res) => {
  const hospitalId = req.user._id; 
  const { id: patientId } = req.params;

  try {
    const reports = await Report.find({ hospitalId, patientId });

    if (!reports || reports.length === 0) {
      return res.status(404).send("No reports found for this patient ID");
    }

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Invalid report ID format");
  }

  try {
    const report = await Report.findById(id);

    if (!report || report.length === 0) {
      return res.status(404).send("No report found for this report ID");
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    );

    if (!report) {
      return res.status(404).send("No report with that id");
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReport = async (req,res) => {
  const { id } = req.params;
  try {
    const report = await Report.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).send("No report with that id");
    }

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addReport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
  getReportsByHospital
};
