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

const searchUser = async (req, res) => {
  const {id} =req.params
  try {
    const patient = await User.findById(id); 

    if (!patient) {
      return res.status(404).send("No user with that id");
    }
    res.status(200).json(patient);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signupUser,
  searchUser,
  loginUser,
  searchDoctors,
  searchStaffMembers,
  searchStaffAdmins,
  searchUsers
};
