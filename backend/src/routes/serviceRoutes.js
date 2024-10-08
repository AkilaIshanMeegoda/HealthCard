const express = require("express");
const { addService, getServices, updateService, deleteService , getServiceById} = require("../controller/serviceController");

const router = express.Router();

// Add a new service
router.post("/add", addService);

// Get all services by hospitalId
router.get("/:hospitalId", getServices);

// Update a service by ID
router.put("/:id", updateService);

// Delete a service by ID
router.delete("/:id", deleteService);

// Route to get a single service by ID
router.get("/service/:id", getServiceById); 

module.exports = router;
