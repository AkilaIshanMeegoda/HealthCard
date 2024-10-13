const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { addPayment, getPaymentById, getAllPayments, addServicePayment } = require('../controller/paymentController');

const router = express.Router();

router.use(requireAuth);

// Payment routes
router.post('/add', addPayment);
router.post('/add-service', addServicePayment);
router.get('/fetch/:id', getPaymentById);
router.get('/fetch-all', getAllPayments);

module.exports = router;