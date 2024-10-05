const mongoose = require("mongoose");
const Report = require("../models/Report.js");

const addReport = async (req, res) => {
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
    });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={
    addReport
}