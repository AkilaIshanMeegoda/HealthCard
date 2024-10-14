const patientProfileService = require('../services/patientProfileService');
const { handleErrorResponse } = require('../utils/errorUtil');

const getProfileByEmail = async (req, res) => {
  const { email } = req.params; // Get email from query parameters
  if (!email) {
    return handleErrorResponse(res, 400, "Email query parameter is required");
  }

  try {
    const profiles = await patientProfileService.getProfileByEmail(email);
    res.status(200).json(profiles);
  } catch (error) {
    handleErrorResponse(res, 404, error.message);
  }
};

const createProfile = async (req, res) => {
  const userId = req.user._id;

  try {
    const profile = await patientProfileService.createProfile(userId, req.body);
    res.status(200).json(profile);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const deleteProfile = async (req, res) => {
  const userId = req.user._id;

  try {
    await patientProfileService.deleteProfile(userId);
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const updateProfile = async (req, res) => {
  const { email } = req.body; // Get email from the request body

  if (!email) {
    return handleErrorResponse(res, 400, "Email is required");
  }

  try {
    const updatedProfile = await patientProfileService.updateProfile(email, req.body);
    res.status(200).json(updatedProfile);
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

module.exports = {
  createProfile,
  deleteProfile,
  updateProfile,
  getProfileByEmail,
};
