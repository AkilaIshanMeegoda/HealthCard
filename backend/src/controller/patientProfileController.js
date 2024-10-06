const mongoose = require("mongoose");
const Profile = require("../models/patientProfileModel");

// Get profiles by email
const getProfileByEmail = async (req, res) => {
  const { email } = req.params; // Get email from query parameters
  console.log("email",email);
  if (!email) {
    return res.status(400).send("Email query parameter is required");
  }

  try {
    // Find profiles by email
    const profiles = await Profile.find({ email: email });

    if (!profiles || profiles.length === 0) {
      return res.status(404).send("No profiles found for this email");
    }

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a discount
const createProfile = async (req, res) => {
  const { email, name, address, age, telephone, description } = req.body;

  try {

    const existingProfile = await Profile.findOne({ email: email });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile Details set already for this account." });
    }

    const profiles = await Profile.create({
        email, 
        name, 
        address, 
        age, 
        telephone,
        description
    });
    res.status(200).json(profiles);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a discount
const deleteProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No profile with that id");
  }

  try {
    const profile = await Profile.findByIdAndDelete(id);  

    if (!profile) {
      return res.status(404).send("No profile with that id");
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a discount
const updateProfile = async (req, res) => {
    const { email } = req.body; // Get email from the request body
  
    // Ensure the email is provided
    if (!email) {
      return res.status(400).send("Email is required");
    }
  
    try {
      // Find the profile by email and update it
      const profile = await Profile.findOneAndUpdate(
        { email: email },  // Use email directly for searching
        {
          ...req.body,  // This should include the fields you want to update
        },
        { new: true }  // This option returns the updated document
      );
  
      if (!profile) {
        return res.status(404).send("No profile with that email");
      }
  
      res.status(200).json(profile);  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };  


module.exports = {
  createProfile,
  deleteProfile,
  updateProfile,
  getProfileByEmail
};
