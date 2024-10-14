const request = require('supertest');
const express = require('express');
const paymentRoutes = require('../routes/payment');
const paymentService = require('../services/paymentService');

// Mocking the authentication middleware
jest.mock('../middleware/requireAuth', () => (req, res, next) => {
  req.user = { _id: '60d21b4267d0d8992e610c83' }; // Mock user ID
  next();
});

const app = express();
app.use(express.json());
app.use('/payment', paymentRoutes);

describe('GET /payment/fetch-all', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all payments successfully', async () => {
    const mockPayments = [
      {
        _id: '60d21b4667d0d8992e610c85',
        appointmentId: '60d21b4667d0d8992e610c84',
        hospitalId: '60d21b4967d0d8992e610c86',
        userId: '60d21b4267d0d8992e610c83',
        amount: 150,
        paymentMethod: 'debit_card',
        paymentStatus: 'completed',
        cardDetails: { cardHolderName: 'Gamage D G S', cardNumber: '1234-5678-9012-3456', expirationDate: '12/24', cvv: '345' },
        insuranceDetails: null,
        bankSlip: null,
      },
      {
        _id: '60d21b4667d0d8992e610c87',
        appointmentId: '60d21b4667d0d8992e610c88',
        hospitalId: '60d21b4967d0d8992e610c86',
        userId: '60d21b4267d0d8992e610c83',
        amount: 200,
        paymentMethod: 'insurance',
        paymentStatus: 'pending',
        cardDetails: null,
        insuranceDetails: { provider: 'Seylan', policyNumber: '9876543210' },
        bankSlip: null,
      },
    ];

    jest.spyOn(paymentService, 'findAllPayments').mockResolvedValue(mockPayments);

    const response = await request(app).get('/payment/fetch-all');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPayments);
  });

  it('should return 500 if there is a server error', async () => {
    jest.spyOn(paymentService, 'findAllPayments').mockRejectedValue(new Error('Server error'));

    const response = await request(app).get('/payment/fetch-all');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Unable to fetch payments' });
  });
});
