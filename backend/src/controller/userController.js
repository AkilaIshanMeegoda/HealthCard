const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    const userType = user.userType;

    res.status(200).json({ email, token, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const user = await User.signup(email, password, userType);

    const token = createToken(user._id);

    res.status(200).json({ email, token, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchDoctors = async (req, res) => {
  try {
    const users = await User.find({ userType: "doctor" });
    res.send(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

const searchStaffMembers = async (req, res) => {
  try {
    const users = await User.find({ userType: "staffMember" });
    res.send(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

const searchStaffAdmins = async (req, res) => {
  try {
    const users = await User.find({ userType: "staffAdmin" });
    res.send(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const users = await User.find({ userType: "user" });
    res.send(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

const searchAppointments = async (req, res) => {
  try {
    // Assuming the hospitalId is part of the authenticated user's token
    const hospitalId = req.user.hospitalId;

    // Find users who have appointments with this hospital
    const users = await User.find(
      { "appointments.hospitalId": hospitalId, userType: "user" }, // Match userType and hospitalId in appointments
      { name: 1, contact: 1, appointments: 1 } // Project only the necessary fields
    );

    // If no users or appointments found, return 404
    if (!users.length) {
      return res.status(404).json({ message: "No appointments found for this hospital" });
    }

    // Format response to return only the appointments that match the hospitalId
    const filteredAppointments = users.map(user => ({
      userName: user.name,
      contact: user.contact,
      appointments: user.appointments.filter(app => app.hospitalId === hospitalId)
    }));

    res.status(200).json(filteredAppointments); // Send the filtered appointments
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  searchDoctors,
  searchStaffMembers,
  searchStaffAdmins,
  searchUsers,
  searchAppointments
};
