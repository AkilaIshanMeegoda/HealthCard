const mongoose = require("mongoose");
const LabAppointment = require("../models/LabAppointment.js");
const User = require("../models/User.js");

const searchLabAppointments = async (req, res) => {
  try {
    // const hospitalId = req.user._id;
    const userId = req.user._id;
    const user = await User.findById(userId);

    // Fetch all users of type "user" from the database
    const appointments = await LabAppointment.find({ hospitalId: user.hospitalId });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    return res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getLabAppointment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No appointment with that id");
  }

  try {
    const appointment = await LabAppointment.findById(id);

    if (!appointment) {
      return res.status(404).send("No appointment with that id");
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLabAppointment = async (req, res) => {
  const {
    userName,
    contact,
    note,
    date,
    time,
    hospitalName,
    testType,
    paymentAmount,
    email,
    labId,
    hospitalId,
    status,
  } = req.body;

  try {
    const profiles = await LabAppointment.create({
      userId: req.user._id,
      userName,
      contact,
      note,
      date,
      time,
      hospitalName,
      testType,
      paymentAmount,
      email,
      labId,
      hospitalId,
      status,
    });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLabAppointment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No appointment with that id");
  }

  try {
    const appointment = await LabAppointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).send("No appointment with that id");
    }

    res.status(200).json({ message: "appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a lab appointment
const updateLabAppointment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No lab appointment with that id");
  }

  try {
    const appointment = await LabAppointment.findByIdAndUpdate(
      id, // Corrected to use id directly
      {
        ...req.body, 
      },
      { new: true } // This option returns the updated document
    );

    if (!appointment) {
      return res.status(404).send("No appointment with that id");
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLabAppointmentsByEmail = async (req, res) => {
  const { email } = req.params; // Get email from query parameters
  if (!email) {
    return res.status(400).send("Email query parameter is required");
  }

  try {
    // Find lab appointment by email
    const appointments = await LabAppointment.find({ email: email });

    if (!appointments || appointments.length === 0) {
      return res.status(404).send("No appointments found for this email");
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLabAppointmentsByDate = async (req, res) => {
  const { date, hospitalId, doctorId } = req.query; // Get the date from query parameters
  console.log("check date in backend ", date, hospitalId, doctorId);
  if (!date || !hospitalId || !doctorId) {
    return res
      .status(400)
      .json({ message: "Date query parameter is required" });
  }

  try {
    // Find all appointments that match the specified date
    const appointments = await LabAppointment.find({ 
      date: date,
      hospitalId: hospitalId,
      doctorId: doctorId 
    });

    // if (!appointments || appointments.length === 0) {
    //   return res.status(404).json({ message: "No appointments found for the specified date" });
    // }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  searchLabAppointments,
  getLabAppointment,
  createLabAppointment,
  updateLabAppointment,
  deleteLabAppointment,
  getLabAppointmentsByEmail,
  getLabAppointmentsByDate,
};
