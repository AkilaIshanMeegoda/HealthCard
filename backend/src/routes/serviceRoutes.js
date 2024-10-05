const express = require("express");
const { addService, getServices, updateService, deleteService } = require("../controllers/serviceController");

const router = express.Router();

// Add a new service
router.post("/add", addService);

// Get all services by hospitalId
router.get("/:hospitalId", getServices);

// Update a service by ID
router.put("/:id", updateService);

// Delete a service by ID
router.delete("/:id", deleteService);

module.exports = router;
