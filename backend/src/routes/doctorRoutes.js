const express = require("express");
const { addDoctor, getDoctors, updateDoctor, deleteDoctor } = require("../controller/DoctorController");

const router = express.Router();

// Add a new doctor
router.post("/add", addDoctor);

// Get all doctors by hospitalId
router.get("/:hospitalId", getDoctors);

// Update a doctor by ID
router.put("/:id", updateDoctor);

// Delete a doctor by ID
router.delete("/:id", deleteDoctor);

module.exports = router;
