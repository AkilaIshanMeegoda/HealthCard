const Doctor = require("../models/Doctor");

// Add new doctor
const addDoctor = async (req, res) => {
  const { doctorName, specialization, experience, hospitalId, image, availability, description, ward, status } = req.body;
  try {
    const newDoctor = new Doctor({
      doctorName,
      specialization,
      experience,
      hospitalId,
      image,
      availability,
      description,
      ward,
      status
    });
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all doctors by hospitalId
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ hospitalId: req.params.hospitalId });
    // If no doctors found, send a 404 response
    if (doctors.length === 0) {
        return res.status(404).json({ message: 'No doctors found for this hospital ID' });
      }
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a doctor by ID
const updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a doctor by ID
const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addDoctor, getDoctors, updateDoctor, deleteDoctor };
