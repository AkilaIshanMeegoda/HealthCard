const Prescription = require("../models/Prescription.js");

const createPrescription = async (prescriptionData) => {
  return await Prescription.create(prescriptionData);
};

const findPrescriptionsByPatientId = async (patientId) => {
  return await Prescription.find({ patientId });
};

const findPrescriptionById = async (id) => {
  return await Prescription.findById(id);
};

const findPrescriptionsByUserId = async (userId) => {
  return await Prescription.find({ patientId: userId });
};

module.exports = {
  createPrescription,
  findPrescriptionsByPatientId,
  findPrescriptionById,
  findPrescriptionsByUserId,
};
