const request = require("supertest");
const express = require("express");
const appointmentService = require("../services/appointmentService");
const appointmentController = require("../controller/appointmentController");

// Initialize the app
const app = express();
app.use(express.json());

// Mock the appointment service
jest.mock("../services/appointmentService");

// Mock Authentication Middleware
const mockAuthMiddleware = (req, res, next) => {
  req.user = { _id: "670ce356569d087b8e8903d0" }; // Mock user ID
  next();
};

// Use mock authentication middleware
app.use(mockAuthMiddleware);

// Set up routes for testing
app.get('/hospital-appointments', appointmentController.searchAppointments);
app.get('/hospital-appointment/:id', appointmentController.getAppointment);
app.post('/add', appointmentController.createAppointment);
app.patch('/update/:id', appointmentController.updateAppointment);
app.delete('/delete/:id', appointmentController.deleteAppointment);
app.get('/my-appointments/:email', appointmentController.getAppointmentsByEmail);
app.get('/appointment-date', appointmentController.getAppointmentsByDate);

describe("Appointment Controller Test Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe("POST /add", () => {
    it("should create a new appointment and return 201", async () => {
      const mockRequestBody = {
        userId: "670ce356569d087b8e8903d0",
        userName: "Chalana",
        email: "savishka@gmail.com",
        contact: "0766839636",
        doctorId: "670cdc402c11c523c7489e0c",
        date: "2024-10-17",
        time: "09:00",
        status: "Pending",
        paymentAmount: "2500",
        hospitalName: "Nawaloka Hospital",
        doctorName: "Viraj Dias",
        specialization: "Surgeon",
        wardNo: "20",
        note: "chalana"
      };

      const mockResponse = { ...mockRequestBody, _id: "670d3b88f649bb43b225b087" };

      appointmentService.createAppointment.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post("/add")
        .send(mockRequestBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
    });

    it("should return 500 if appointment creation fails", async () => {
      appointmentService.createAppointment.mockRejectedValue(new Error("Failed to create appointment"));

      const response = await request(app)
        .post("/add")
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Failed to create appointment");
    });
  });

  describe("GET /hospital-appointments", () => {
    it("should return all appointments for the user", async () => {
      const mockAppointments = [
        {
          _id: "670d3b88f649bb43b225b087",
          userId: "670ce356569d087b8e8903d0",
          doctorId: "670cdc402c11c523c7489e0c",
          hospitalName: "Nawaloka Hospital",
          doctorName: "Viraj Dias",
          specialization: "Surgeon",
          date: "2024-10-17",
          time: "09:00",
          status: "Pending",
        },
      ];

      appointmentService.searchAppointments.mockResolvedValue(mockAppointments);

      const response = await request(app).get("/hospital-appointments");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAppointments);
    });

    it("should return 404 if no appointments found", async () => {
      appointmentService.searchAppointments.mockRejectedValue(new Error("No appointments found"));

      const response = await request(app).get("/hospital-appointments");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "No appointments found");
    });
  });

  describe("GET /hospital-appointment/:id", () => {
    it("should return an appointment by ID", async () => {
      const mockAppointment = {
        _id: "670d3b88f649bb43b225b087",
        userId: "670ce356569d087b8e8903d0",
        doctorId: "670cdc402c11c523c7489e0c",
        hospitalName: "Nawaloka Hospital",
        doctorName: "Viraj Dias",
        date: "2024-10-17",
        time: "09:00",
        status: "Pending",
      };

      appointmentService.getAppointment.mockResolvedValue(mockAppointment);

      const response = await request(app).get("/hospital-appointment/670d3b88f649bb43b225b087");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAppointment);
    });

    it("should return 404 if appointment not found", async () => {
      appointmentService.getAppointment.mockRejectedValue(new Error("Appointment not found"));

      const response = await request(app).get("/hospital-appointment/unknown-id");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Appointment not found");
    });
  });

  describe("PATCH /update/:id", () => {
    it("should update an appointment and return 200", async () => {
      const mockRequestBody = {
        date: "2024-10-18",
        time: "10:00",
        status: "Confirmed",
      };

      const mockResponse = {
        ...mockRequestBody,
        _id: "670d3b88f649bb43b225b087",
        userId: "670ce356569d087b8e8903d0",
        doctorId: "670cdc402c11c523c7489e0c",
        hospitalName: "Nawaloka Hospital",
      };

      appointmentService.updateAppointment.mockResolvedValue(mockResponse);

      const response = await request(app)
        .patch("/update/670d3b88f649bb43b225b087")
        .send(mockRequestBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });

    it("should return 500 if updating the appointment fails", async () => {
      appointmentService.updateAppointment.mockRejectedValue(new Error("Failed to update appointment"));

      const response = await request(app)
        .patch("/update/unknown-id")
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Failed to update appointment");
    });
  });

  describe("DELETE /delete/:id", () => {
    it("should delete an appointment and return 200", async () => {
      appointmentService.deleteAppointment.mockResolvedValue(true);

      const response = await request(app)
        .delete("/delete/670d3b88f649bb43b225b087")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Appointment deleted successfully");
    });

    it("should return 500 if deleting the appointment fails", async () => {
      appointmentService.deleteAppointment.mockRejectedValue(new Error("Failed to delete appointment"));

      const response = await request(app)
        .delete("/delete/unknown-id")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Failed to delete appointment");
    });
  });
});
