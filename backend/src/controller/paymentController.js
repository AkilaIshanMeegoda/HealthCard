const mongoose = require("mongoose");
const Payment = require("../models/Payment");
const Appointment = require("../models/Appointment");
const User = require("../models/User");

// Add a new payment
const addPayment = async (req, res) => {
  const {
    appointmentId,
    paymentMethod,
    insuranceDetails,
    cardDetails,
    bankSlip,
  } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Validate that required fields are provided
    if (!appointmentId || !paymentMethod) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Set payment status based on payment method
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

    const newPayment = await Payment.create(paymentData);
    res.status(201).json(newPayment);
    console.log("New payment successfully created");
  } catch (error) {
    res.status(500).json({ error: "Unable to create payment" });
    console.log("Unable to create payment");
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id)
      .populate("appointmentId")
      .populate("hospitalId")
      .populate("userId");
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.status(200).json(payment);
    console.log("Payment fetched successfully");
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch payment" });
    console.log("Unable to fetch payment");
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    const payments = await Payment.find({ hospitalId: user.hospitalId })
      .populate("appointmentId")
      .populate("hospitalId")
      .populate("userId");
    res.status(200).json(payments);
    console.log("Payments fetched successfully");
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch payments" });
    console.log("Unable to fetch payments");
  }
};

module.exports = {
  addPayment,
  getPaymentById,
  getAllPayments
};
