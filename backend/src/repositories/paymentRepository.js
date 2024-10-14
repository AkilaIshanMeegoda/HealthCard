const Payment = require('../models/Payment');

// Find a payment by ID
const findById = async (id) => {
  return await Payment.findById(id)
    .populate('appointmentId')
    .populate('hospitalId')
    .populate('userId');
};

// Find all payments by hospital ID
const findAllByHospitalId = async (hospitalId) => {
  return await Payment.find({ hospitalId })
    .populate('appointmentId')
    .populate('hospitalId')
    .populate('userId');
};

// Create a new payment
const create = async (paymentData) => {
  return await Payment.create(paymentData);
};

module.exports = {
  findById,
  findAllByHospitalId,
  create,
};
