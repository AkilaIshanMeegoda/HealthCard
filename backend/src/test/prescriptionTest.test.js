const request = require("supertest");
const express = require("express");
const PrescriptionController = require("../controller/prescriptionController.js");
const Prescription = require("../models/Prescription.js");

// Initialize the app and use express.json for parsing request body
const app = express();
app.use(express.json());

// Mock the service methods
jest.mock("../models/Prescription.js");

// Set up routes for testing
app.get("/getPrescription/:id", PrescriptionController.getPrescription);

describe("Prescription Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test for getting all reports of the patient by ID
  describe("GET /getPrescription/:id", () => {
    it("should return all reports for the given patient ID", async () => {
      const mockPrescription = [
        {
          _id: "670cfbca982c01000724e4c8",
          patientName: "Savishka Dilshan",
          date: "October 14, 2024",
          description: "Get this medicine for 3 weeks",
          image:
            "https://firebasestorage.googleapis.com/v0/b/healthcard-3ff2d.appspot.com/o/Sample-prescription-used-as-input-to-the-GUI-developed-in-the-present-work.png?alt=media&token=eb3d2410-30c6-4cb5-bc56-6255b1803a21",
          patientId: "670ce356569d087b8e8903d0",
        },
      ];
      // Mocking the service call, not the model
      Prescription.find.mockResolvedValue(mockPrescription);

      const response = await request(app)
        .get("/getPrescription/670cfbca982c01000724e4c8") // Patient ID in the URL
        .set("Authorization", "Bearer mockAuthToken"); // Simulate auth token in header

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPrescription);
    });

    it("should return a 404 error if no prescription is found", async () => {
      // Mock the service to return null (which would cause a 404 in your controller)
      Prescription.find.mockRejectedValue(new Error("Error occurred"));

      const response = await request(app)
        .get("/getPrescription/670cfbca982c01000724e4c8") // Patient ID in the URL
        .set("Authorization", "Bearer mockAuthToken"); // Simulate auth token in header

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty(
        "message",
        "No prescription found for this prescription ID"
      );
    });
  });
});
