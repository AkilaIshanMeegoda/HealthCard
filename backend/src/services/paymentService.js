const paymentRepository = require('../repositories/paymentRepository');
const Appointment = require('../models/Appointment');
const Service = require('../models/LabAppointment');
const User = require('../models/User');

// Create a new payment
const createPayment = async (appointmentId, paymentMethod, insuranceDetails, cardDetails, bankSlip) => {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (!appointmentId || !paymentMethod) {
    throw new Error("Missing required fields");
  }

  let paymentStatus = "pending";
  if (paymentMethod === "debit_card") {
    paymentStatus = "completed";
  }

  const paymentData = {
    appointmentId,
    hospitalId: appointment.hospitalId,
    userId: appointment.userId,
    amount: appointment.paymentAmount,
    paymentMethod,
    paymentStatus,
    insuranceDetails: paymentMethod === "insurance" ? insuranceDetails : null,
    cardDetails: paymentMethod === "debit_card" ? cardDetails : null,
    bankSlip: paymentMethod === "bank_transfer" ? bankSlip : null,
  };

  const newPayment = await paymentRepository.create(paymentData);

  if (newPayment) {
    appointment.status = "Paid";
    await appointment.save();
  }

  return newPayment;
};

// Find payment by ID
const findPaymentById = async (id) => {
  return await paymentRepository.findById(id);
};

// Find all payments
const findAllPayments = async (userId) => {
  const user = await User.findById(userId);
  return await paymentRepository.findAllByHospitalId(user.hospitalId);
};

// Create a new service payment
const createServicePayment = async (appointmentId, paymentMethod, insuranceDetails, cardDetails, bankSlip) => {
  const appointment = await Service.findById(appointmentId);
  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (!appointmentId || !paymentMethod) {
    throw new Error("Missing required fields");
  }

  let paymentStatus = "pending";
  if (paymentMethod === "debit_card") {
    paymentStatus = "completed";
  }

  const paymentData = {
    appointmentId,
    hospitalId: appointment.hospitalId,
    userId: appointment.userId,
    amount: appointment.paymentAmount,
    paymentMethod,
    paymentStatus,
    insuranceDetails: paymentMethod === "insurance" ? insuranceDetails : null,
    cardDetails: paymentMethod === "debit_card" ? cardDetails : null,
    bankSlip: paymentMethod === "bank_transfer" ? bankSlip : null,
  };

  const newPayment = await paymentRepository.create(paymentData);

  if (newPayment) {
    appointment.status = "Paid";
    await appointment.save();
  }

  return newPayment;
};

module.exports = {
  createPayment,
  findPaymentById,
  findAllPayments,
  createServicePayment,
};
