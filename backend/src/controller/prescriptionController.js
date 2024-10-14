const mongoose = require("mongoose");
const Prescription = require("../models/Prescription.js");

const addPrescription = async (req, res) => {
  const { patientName, date, description, image, patientId } = req.body;

  try {
    const prescription = await Prescription.create({
      patientName,
      date,
      description,
      image,
      patientId,
    });
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrescriptions = async (req, res) => {
  const { id } = req.params;

  try {
    const prescriptions = await Prescription.find({ patientId: id });

    if (!prescriptions || prescriptions.length === 0) {
      return res.status(404).send("No prescriptions found for this patient ID");
    }

    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrescription = async (req, res) => {
  const { id } = req.params;

  try {
    const prescription = await Prescription.findById(id);

    if (!prescription || prescription.length === 0) {
      return res.status(404).send("No prescription found for this prescription ID");
    }

    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUserPrescriptions = async (req, res) => {
  const id  = req.user._id;
  console.log("user id",id);

  try {
    const prescriptions = await Prescription.find({ patientId: id });

    if (!prescriptions || prescriptions.length === 0) {
      return res.status(404).send("No reports found for this patient ID");
    }

    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message});
}
};

module.exports = {
  addPrescription,
  getPrescriptions,
  getPrescription,
  getUserPrescriptions
};
