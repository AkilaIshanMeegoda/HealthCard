const Doctor = require("../models/Doctor");
const mongoose = require("mongoose");


// Add new doctor
const addDoctor = async (req, res) => {
  const { doctorName, specialization, experience, hospitalId, image, availability, time, maxAppointmentCount ,description, ward, status , paymentAmount} = req.body;
  try {
    const newDoctor = new Doctor({
      doctorName,
      specialization,
      experience,
      hospitalId,
      image,
      availability,
      time,
      maxAppointmentCount,
      description,
      ward,
      status,
      paymentAmount
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

// Get a doctor by ID
const getDoctorById = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Invalid doctor ID format");
  }

  try {
    const doctor = await Doctor.findById(id);

    // Check if doctor is found
    if (!doctor) {
      return res.status(404).send("No doctor found for this doctor ID");
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error retrieving doctor:", error); // Log the error
    res.status(500).json({ message: error.message }); // Use 500 for server errors
  }
};


module.exports = { addDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor };


