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

module.exports = {
  searchAppointments,
  getAppointment
};
