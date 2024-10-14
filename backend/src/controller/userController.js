const userService = require("../services/userService");
const User = require("../models/User"); // Ensure User model is imported for searchHospitals

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const result = await userService.signupUser(email, password, userType);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchDoctors = async (req, res) => {
  try {
    const doctors = await userService.searchDoctors();
    res.send(doctors);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchStaffMembers = async (req, res) => {
  try {
    const staffMembers = await userService.searchStaffMembers();
    res.send(staffMembers);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchStaffAdmins = async (req, res) => {
  try {
    const staffAdmins = await userService.searchStaffAdmins();
    res.send(staffAdmins);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const users = await userService.searchUsers();
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.searchUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchHospitals = async (req, res) => {
  try {
    // Find staffAdmin users and select both email and hospitalName fields
    const hospitals = await User.find({ userType: "staffAdmin" }).select("email hospitalName");
    console.log(hospitals);

    // Send the list of hospital names and emails
    res.send(hospitals);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  searchDoctors,
  searchStaffMembers,
  searchStaffAdmins,
  searchUsers,
  searchUser,
  searchHospitals,
};
