const User = require("../models/User.js");

const findByEmail = async (email) => {
  return await User.find({ email });
};

const findById = async (userId) => {
  return await User.findById(userId);
};

const updateById = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

const deleteById = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  findByEmail,
  findById,
  updateById,
  deleteById,
};
 