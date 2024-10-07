const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Service = require('../models/Service');

// Get all doctors and services by hospitalId
router.get('/:hospitalId', async (req, res) => {
  const { hospitalId } = req.params;

  try {
    const doctors = await Doctor.find({ hospitalId });
    const services = await Service.find({ hospitalId });
    res.status(200).json({ doctors, services });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
