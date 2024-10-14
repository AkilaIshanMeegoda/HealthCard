const patientProfileRepository = require('../repositories/patientProfileRepository');

const getProfileByEmail = async (email) => {
  const profiles = await patientProfileRepository.findByEmail(email);
  if (!profiles || profiles.length === 0) {
    throw new Error("No profiles found for this email");
  }
  return profiles;
};

const createProfile = async (userId, profileData) => {
  return await patientProfileRepository.updateById(userId, profileData);
};

const deleteProfile = async (userId) => {
  const deletedProfile = await patientProfileRepository.deleteById(userId);
  if (!deletedProfile) {
    throw new Error("No profile found with that ID");
  }
  return deletedProfile;
};

const updateProfile = async (email, updateData) => {
  const updatedProfile = await patientProfileRepository.findByEmail(email);
  if (!updatedProfile || updatedProfile.length === 0) {
    throw new Error("No profile found with that email");
  }
  return await patientProfileRepository.updateById(updatedProfile[0]._id, updateData);
};

module.exports = {
  getProfileByEmail,
  createProfile,
  deleteProfile,
  updateProfile,
};
 