const mongoose = require("mongoose");
const Appointment = require("../models/Appointment.js");

const searchAppointments = async (req, res) => {
  try {
    const hospitalId = req.user._id;

    // Fetch all users of type "user" from the database
    const appointments = await Appointment.find({ hospitalId: hospitalId });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    return res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAppointment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No appointment with that id");
  }

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).send("No appointment with that id");
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAppointment = async (req, res) => {
  const {
    userName,
    contact,
    note,
    date,
    time,
    hospitalName,
    doctorName,
    specialization,
    wardNo,
    paymentAmount,
    email,
    doctorId,
    hospitalId,
    status,
  } = req.body;

  try {
    const profiles = await Appointment.create({
      userId: req.user._id,
      userName,
      contact,
      note,
      date,
      time,
      hospitalName,
      doctorName,
      specialization,
      wardNo,
      paymentAmount,
      email,
      doctorId,
      hospitalId,
      status,
    });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No appointment with that id");
  }

  try {
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).send("No appointment with that id");
    }

    res.status(200).json({ message: "appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a promotion
const updateAppointment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No promotion with that id");
  }

  try {
    const appointment = await Appointment.findByIdAndUpdate(
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

const getAppointmentsByEmail = async (req, res) => {
  const { email } = req.params; // Get email from query parameters
  if (!email) {
    return res.status(400).send("Email query parameter is required");
  }

  try {
    // Find promotion by email
    const appointments = await Appointment.find({ email: email });

    if (!appointments || appointments.length === 0) {
      return res.status(404).send("No appointments found for this email");
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAppointmentsByDate = async (req, res) => {
  const { date } = req.params; // Get the date from query parameters
  console.log("check date in backend ", date);
  if (!date) {
    return res
      .status(400)
      .json({ message: "Date query parameter is required" });
  }

  try {
    // Find all appointments that match the specified date
    const appointments = await Appointment.find({ date: date });

    // if (!appointments || appointments.length === 0) {
    //   return res.status(404).json({ message: "No appointments found for the specified date" });
    // }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  searchAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByEmail,
  getAppointmentsByDate,
};
