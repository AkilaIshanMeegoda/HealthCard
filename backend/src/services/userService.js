const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (email, password) => {
  const user = await userRepository.login(email, password);
  const token = createToken(user._id);
  return { email: user.email, token, userType: user.userType };
};

const signupUser = async (email, password, userType) => {
  const user = await userRepository.signup(email, password, userType);
  const token = createToken(user._id);
  return { email: user.email, token, userType: user.userType };
};

const searchDoctors = async () => {
  return await userRepository.findByUserType("doctor");
};

const searchStaffMembers = async () => {
  return await userRepository.findByUserType("staffMember");
};

const searchStaffAdmins = async () => {
  return await userRepository.findByUserType("staffAdmin");
};

const searchUsers = async () => {
  return await userRepository.findByUserType("user");
};

const searchUserById = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) throw new Error("No user with that id");
  return user;
};

const searchHospitals = async () => {
  return await userRepository.findByUserType("staffAdmin").select("email hospitalName");
};

module.exports = {
  loginUser,
  signupUser,
  searchDoctors,
  searchStaffMembers,
  searchStaffAdmins,
  searchUsers,
  searchUserById,
  searchHospitals,
};
