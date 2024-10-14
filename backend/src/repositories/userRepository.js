const User = require("../models/User");

const findById = async (id) => {
  return await User.findById(id);
};

const findByUserType = async (userType) => {
  return await User.find({ userType });
};

const signup = async (email, password, userType) => {
  return await User.signup(email, password, userType);
};

const login = async (email, password) => {
  return await User.login(email, password);
};

module.exports = {
  findById,
  findByUserType,
  signup,
  login,
};
