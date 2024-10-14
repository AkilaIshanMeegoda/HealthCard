const request = require("supertest");
const express = require("express");
const labAppointmentService = require("../services/labAppointmentService");
const labAppointmentController = require("../controller/labappointmentController");

// Initialize the app
const app = express();
app.use(express.json());

// Mock the lab appointment service
jest.mock("../services/labAppointmentService");

// Mock Authentication Middleware
const mockAuthMiddleware = (req, res, next) => {
  req.user = { _id: "670ce356569d087b8e8903d0" }; // Mock user ID
  next();
};

// Use mock authentication middleware
app.use(mockAuthMiddleware);

// Set up routes for testing
app.get('/hospital-appointments', labAppointmentController.searchLabAppointments);
app.get('/hospital-appointment/:id', labAppointmentController.getLabAppointment);
app.post('/add', labAppointmentController.createLabAppointment);
app.patch('/update/:id', labAppointmentController.updateLabAppointment);
app.delete('/delete/:id', labAppointmentController.deleteLabAppointment);
app.get('/my-appointments/:email', labAppointmentController.getLabAppointmentsByEmail);

describe("Lab Appointment Controller Test Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe("POST /add", () => {
    it("should create a new lab appointment and return 201", async () => {
      const mockRequestBody = {
        userId: "670ce356569d087b8e8903d0",
        userName: "Chalana",
        email: "savishka@gmail.com",
        contact: "0766839636",
        labId: "670cd5da2c11c523c7489dad",
        date: "2024-10-16",
        time: "22:00",
        status: "Pending",
        paymentAmount: "3500",
        hospitalName: "Nawaloka Hospital",
        hospitalId: "dinithisanjana563@gmail.com",
        testType: "Mental Health",
        note: "Need a busy less time!"
      };

      const mockResponse = { ...mockRequestBody, _id: "670ce603788a507dcf5cecb9" };

      labAppointmentService.createLabAppointment.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post("/add")
        .send(mockRequestBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
    });

    it("should return 500 if lab appointment creation fails", async () => {
      labAppointmentService.createLabAppointment.mockRejectedValue(new Error("Failed to create appointment"));

      const response = await request(app)
        .post("/add")
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Failed to create appointment");
    });
  });

  describe("GET /hospital-appointments", () => {
    it("should return all lab appointments for the user", async () => {
      const mockAppointments = [
        {
          _id: "670ce603788a507dcf5cecb9",
          userId: "670ce356569d087b8e8903d0",
          labId: "670cd5da2c11c523c7489dad",
          hospitalName: "Nawaloka Hospital",
          testType: "Mental Health",
          date: "2024-10-16",
          time: "22:00",
          status: "Pending",
        },
      ];

      labAppointmentService.searchLabAppointments.mockResolvedValue(mockAppointments);

      const response = await request(app).get("/hospital-appointments");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAppointments);
    });

    it("should return 404 if no lab appointments are found", async () => {
      labAppointmentService.searchLabAppointments.mockRejectedValue(new Error("No appointments found"));

      const response = await request(app).get("/hospital-appointments");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "No appointments found");
    });
  });

  describe("GET /hospital-appointment/:id", () => {
    it("should return a lab appointment by ID", async () => {
      const mockAppointment = {
        _id: "670ce603788a507dcf5cecb9",
        userId: "670ce356569d087b8e8903d0",
        labId: "670cd5da2c11c523c7489dad",
        hospitalName: "Nawaloka Hospital",
        testType: "Mental Health",
        date: "2024-10-16",
        time: "22:00",
        status: "Pending",
      };

      labAppointmentService.getLabAppointment.mockResolvedValue(mockAppointment);

      const response = await request(app).get("/hospital-appointment/670ce603788a507dcf5cecb9");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAppointment);
    });

    it("should return 404 if lab appointment not found", async () => {
      labAppointmentService.getLabAppointment.mockRejectedValue(new Error("Appointment not found"));

      const response = await request(app).get("/hospital-appointment/670ce603788a507dcf5cecb9");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Appointment not found");
    });
  });

  describe("PATCH /update/:id", () => {
    it("should update a lab appointment and return 200", async () => {
      const mockRequestBody = {
        date: "2024-10-18",
        time: "10:00",
        status: "Confirmed",
      };

      const mockResponse = {
        ...mockRequestBody,
        _id: "670ce603788a507dcf5cecb9",
        userId: "670ce356569d087b8e8903d0",
        labId: "670cd5da2c11c523c7489dad",
        hospitalName: "Nawaloka Hospital",
      };

      labAppointmentService.updateLabAppointment.mockResolvedValue(mockResponse);

      const response = await request(app)
        .patch("/update/670ce603788a507dcf5cecb9")
        .send(mockRequestBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });

    it("should return 500 if updating the lab appointment fails", async () => {
      labAppointmentService.updateLabAppointment.mockRejectedValue(new Error("Failed to update appointment"));

      const response = await request(app)
        .patch("/update/670ce603788a507dcf5cecb9")
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Failed to update appointment");
    });
  });

  describe("DELETE /delete/:id", () => {
    it("should delete a lab appointment and return 200", async () => {
      labAppointmentService.deleteLabAppointment.mockResolvedValue(true);

      const response = await request(app)
        .delete("/delete/670ce603788a507dcf5cecb9")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Appointment deleted successfully");
    });

    it("should return 500 if deleting the lab appointment fails", async () => {
      labAppointmentService.deleteLabAppointment.mockRejectedValue(new Error("Failed to delete appointment"));

      const response = await request(app)
        .delete("/delete/670ce603788a507dcf5cecb9")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Failed to delete appointment");
    });
  });

  describe("GET /my-appointments/:email", () => {
    it("should return all lab appointments by email", async () => {
      const mockAppointments = [
        {
          _id: "670ce603788a507dcf5cecb9",
          email: "savishka@gmail.com",
          labId: "670cd5da2c11c523c7489dad",
          hospitalName: "Nawaloka Hospital",
          testType: "Mental Health",
          date: "2024-10-16",
          time: "22:00",
          status: "Pending",
        },
      ];

      labAppointmentService.getLabAppointmentsByEmail.mockResolvedValue(mockAppointments);

      const response = await request(app).get("/my-appointments/savishka@gmail.com");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAppointments);
    });

    it("should return 404 if no lab appointments are found by email", async () => {
      labAppointmentService.getLabAppointmentsByEmail.mockRejectedValue(new Error("No appointments found"));

      const response = await request(app).get("/my-appointments/savishka@gmail.com");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "No appointments found");
    });
  });
});
