const prescriptionRepository = require("../repositories/prescriptionRepository");
const mongoose = require("mongoose");

const addPrescription = async (prescriptionData) => {
  return await prescriptionRepository.createPrescription(prescriptionData);
};

const getPrescriptionsByPatientId = async (patientId) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("Invalid patient ID format");
  }
  const prescriptions = await prescriptionRepository.findPrescriptionsByPatientId(patientId);
  if (!prescriptions || prescriptions.length === 0) {
    throw new Error("No prescriptions found for this patient ID");
  }
  return prescriptions;
};

const getPrescriptionById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid prescription ID format");
  }
  const prescription = await prescriptionRepository.findPrescriptionById(id);
  if (!prescription) {
    throw new Error("No prescription found for this prescription ID");
  }
  return prescription;
};

const getUserPrescriptions = async (userId) => {
  const prescriptions = await prescriptionRepository.findPrescriptionsByUserId(userId);
  if (!prescriptions || prescriptions.length === 0) {
    throw new Error("No prescriptions found for this user ID");
  }
  return prescriptions;
};

module.exports = {
  addPrescription,
  getPrescriptionsByPatientId,
  getPrescriptionById,
  getUserPrescriptions,
};
