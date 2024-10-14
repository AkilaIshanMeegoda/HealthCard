const prescriptionService = require("../services/prescriptionService");

const addPrescription = async (req, res) => {
  const { patientName, date, description, image, patientId } = req.body;

  try {
    const prescription = await prescriptionService.addPrescription({
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
    const prescriptions = await prescriptionService.getPrescriptionsByPatientId(id);
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPrescription = async (req, res) => {
  const { id } = req.params;

  try {
    const prescription = await prescriptionService.getPrescriptionById(id);
    res.status(200).json(prescription);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserPrescriptions = async (req, res) => {
  const userId = req.user._id;

  try {
    const prescriptions = await prescriptionService.getUserPrescriptions(userId);
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  addPrescription,
  getPrescriptions,
  getPrescription,
  getUserPrescriptions,
};
