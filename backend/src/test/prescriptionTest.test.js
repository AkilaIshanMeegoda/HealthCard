const request = require("supertest");
const express = require("express");
const prescriptionService = require("../services/prescriptionService");
const PrescriptionController = require("../controller/prescriptionController");

// Initialize the app
const app = express();
app.use(express.json());

// Mock the prescription service
jest.mock("../services/prescriptionService");

// Mock Authentication Middleware
const mockAuthMiddleware = (req, res, next) => {
  req.user = { _id: "670ce356569d087b8e8903d0" }; // Inject mock user ID
  next();
};

// Use mock authentication middleware
app.use(mockAuthMiddleware);

// Set up routes for testing
app.post("/addPrescription", PrescriptionController.addPrescription);
app.get("/viewMyPrescription", PrescriptionController.getUserPrescriptions);
app.get("/prescription/:id", PrescriptionController.getPrescription);
app.get("/prescriptions/:id", PrescriptionController.getPrescriptions);

describe("Prescription Controller Test Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe("POST /addPrescription", () => {
    it("should add a new prescription and return 200", async () => {
      const mockRequestBody = {
        patientName: "Savishka Dilshan",
        date: "October 14, 2024",
        description: "Take this medicine for 3 weeks",
        image: "https://example.com/image.png",
        patientId: "670ce356569d087b8e8903d0",
      };

      const mockResponse = { ...mockRequestBody, _id: "670cfbca982c01000724e4c8" };

      prescriptionService.addPrescription.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post("/addPrescription")
        .send(mockRequestBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });

    it("should return 500 if adding prescription fails", async () => {
      prescriptionService.addPrescription.mockRejectedValue(
        new Error("Failed to add prescription")
      );

      const response = await request(app)
        .post("/addPrescription")
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Failed to add prescription");
    });
  });

  describe("GET /viewMyPrescription", () => {
    it("should return all prescriptions for the user", async () => {
      const mockPrescriptions = [
        {
          _id: "670cfbca982c01000724e4c8",
          patientName: "Savishka Dilshan",
          date: "October 14, 2024",
          description: "Take this medicine for 3 weeks",
          image: "https://example.com/image.png",
          patientId: "670ce356569d087b8e8903d0",
        },
      ];

      prescriptionService.getUserPrescriptions.mockResolvedValue(mockPrescriptions);

      const response = await request(app).get("/viewMyPrescription");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPrescriptions);
    });

    it("should return 404 if no prescriptions found", async () => {
      prescriptionService.getUserPrescriptions.mockRejectedValue(
        new Error("No prescriptions found")
      );

      const response = await request(app).get("/viewMyPrescription");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "No prescriptions found");
    });
  });

  describe("GET /prescription/:id", () => {
    it("should return a prescription by ID", async () => {
      const mockPrescription = {
        _id: "670cfbca982c01000724e4c8",
        patientName: "Savishka Dilshan",
        date: "October 14, 2024",
        description: "Take this medicine for 3 weeks",
        image: "https://example.com/image.png",
        patientId: "670ce356569d087b8e8903d0",
      };

      prescriptionService.getPrescriptionById.mockResolvedValue(mockPrescription);

      const response = await request(app).get("/prescription/670cfbca982c01000724e4c8");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPrescription);
    });

    it("should return 404 if prescription not found", async () => {
      prescriptionService.getPrescriptionById.mockRejectedValue(
        new Error("Prescription not found")
      );

      const response = await request(app).get("/prescription/unknown-id");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Prescription not found");
    });
  });

  describe("GET /prescriptions/:id", () => {
    it("should return all prescriptions for a given patient ID", async () => {
      const mockPrescriptions = [
        {
          _id: "670cfbca982c01000724e4c8",
          patientName: "Savishka Dilshan",
          date: "October 14, 2024",
          description: "Take this medicine for 3 weeks",
          image: "https://example.com/image.png",
          patientId: "670ce356569d087b8e8903d0",
        },
      ];

      prescriptionService.getPrescriptionsByPatientId.mockResolvedValue(mockPrescriptions);

      const response = await request(app).get("/prescriptions/670ce356569d087b8e8903d0");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPrescriptions);
    });

    it("should return 404 if no prescriptions found for the patient", async () => {
      prescriptionService.getPrescriptionsByPatientId.mockRejectedValue(
        new Error("No prescriptions found for this patient")
      );

      const response = await request(app).get("/prescriptions/unknown-patient-id");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty(
        "message",
        "No prescriptions found for this patient"
      );
    });
  });
});
