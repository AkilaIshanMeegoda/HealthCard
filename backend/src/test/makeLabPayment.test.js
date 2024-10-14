const request = require('supertest');
const express = require('express');
const paymentRoutes = require('../routes/payment');
const paymentService = require('../services/paymentService');

jest.mock('../middleware/requireAuth', () => (req, res, next) => next());

const app = express();
app.use(express.json());
app.use('/payment', paymentRoutes);

describe('POST /payment/add-service', () => {
  it('should create a new payment successfully', async () => {

    const mockPayment = {
      _id: '60d21b4667d0d8992e610c85',
      appointmentId: '60d21b4667d0d8992e610c84',
      hospitalId: '60d21b4967d0d8992e610c86',
      userId: '60d21b4267d0d8992e610c83',
      amount: 150,
      paymentMethod: 'insurance',
      paymentStatus: 'completed',
      cardDetails: null,
      insuranceDetails: {provider: 'Seylan', policyNumber: '1234567890'},
      bankSlip: null,
    };

    jest.spyOn(paymentService, 'createServicePayment').mockResolvedValue(mockPayment);

    const response = await request(app)
      .post('/payment/add-service')
      .send({
        appointmentId: '60d21b4667d0d8992e610c84',
        paymentMethod: 'insurance',
        insuranceDetails: {provider: 'Seylan', policyNumber: '1234567890'},
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockPayment);
  });

  it('should return 500 if there is a server error', async () => {
    jest.spyOn(paymentService, 'createServicePayment').mockRejectedValue(new Error('Server error'));

    const response = await request(app)
      .post('/payment/add-service')
      .send({
        appointmentId: '60d21b4667d0d8992e610c84',
        paymentMethod: 'insurance',
        insuranceDetails: {provider: 'Seylan', policyNumber: '1234567890'},
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Unable to create payment' });
  });
});
