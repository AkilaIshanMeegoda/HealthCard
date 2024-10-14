const paymentService = require('../services/paymentService');

// Add a new payment
const addPayment = async (req, res) => {
  const { appointmentId, paymentMethod, insuranceDetails, cardDetails, bankSlip } = req.body;

  try {
    const newPayment = await paymentService.createPayment(
      appointmentId, paymentMethod, insuranceDetails, cardDetails, bankSlip
    );
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
    const payment = await paymentService.findPaymentById(id);
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
    const payments = await paymentService.findAllPayments(userId);
    res.status(200).json(payments);
    console.log("Payments fetched successfully");
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch payments" });
    console.log("Unable to fetch payments");
  }
};

// Add new service payment
const addServicePayment = async (req, res) => {
  const { appointmentId, paymentMethod, insuranceDetails, cardDetails, bankSlip } = req.body;

  try {
    const newPayment = await paymentService.createServicePayment(
      appointmentId, paymentMethod, insuranceDetails, cardDetails, bankSlip
    );
    res.status(201).json(newPayment);
    console.log("New payment successfully created");
  } catch (error) {
    res.status(500).json({ error: "Unable to create payment" });
    console.log("Unable to create payment");
  }
};

module.exports = {
  addPayment,
  getPaymentById,
  getAllPayments,
  addServicePayment,
};
