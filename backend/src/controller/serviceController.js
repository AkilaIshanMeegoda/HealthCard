const Service = require("../models/Service");

// Add new service
const addService = async (req, res) => {
  const { serviceName, description, hospitalId, image, price } = req.body;
  try {
    const newService = new Service({
      serviceName,
      description,
      hospitalId,
      image,
      price,
    });
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all services by hospitalId
const getServices = async (req, res) => {
  try {
    const services = await Service.find({ hospitalId: req.params.hospitalId });
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a service by ID
const updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service by ID
const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addService, getServices, updateService, deleteService };
