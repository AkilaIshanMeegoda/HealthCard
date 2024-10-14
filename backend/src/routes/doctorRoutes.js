const express = require("express");
const { addDoctor, getDoctorsByHospital, updateDoctor, deleteDoctor, getDoctorById } = require("../controller/doctorController");

const router = express.Router();

// Add a new doctor
router.post("/add", addDoctor);

// Get all doctors by hospitalId
router.get("/:hospitalId", getDoctorsByHospital);

// Update a doctor by ID
router.put("/:id", updateDoctor);

// Delete a doctor by ID
router.delete("/:id", deleteDoctor);

// Route to get a doctor by ID
router.get("/doctor/:id", getDoctorById);


module.exports = router;
