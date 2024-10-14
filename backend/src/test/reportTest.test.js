const request = require("supertest");
const express = require("express");
const ReportController = require("../controller/reportController.js");
const Report = require("../models/Report.js");

// Initialize the app and use express.json for parsing request body
const app = express();
app.use(express.json());

// Mock the report model methods
jest.mock("../models/Report.js");

// Set up routes for testing
app.get("/viewReports/:id", ReportController.getReports);

describe("Report Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test for getting all reports of the patient by ID
  describe("GET /viewReports/:id", () => {
    it("should return all reports for the given patient ID", async () => {
      const mockReports = [
        {
          _id: "670cca3e4c97b2a9b4739973",
          titleName: "Blood test report",
          date: "October 14, 2024",
          patientName: "Savishka Dilshan",
          category: "Blood Test Report",
          description: "Blood test is average",
          image: "https://firebasestorage.googleapis.com/v0/b/healthcard-3ff2d.appspot.com/o/test1.jpg?alt=media&token=f79e82a1-7654-4b8e-b4a2-7bb5a5a8c51b",
          patientId: "670cc0f0b81604633398eba2",
          hospitalId: "670cbb5b9f6fdce08e6194b5",
          createdAt: "2024-10-14T07:37:34.347Z",
          updatedAt: "2024-10-14T07:37:34.347Z",
          __v: 0,
        },
      ];
      Report.find.mockResolvedValue(mockReports); // Mocking the database call

      const response = await request(app)
        .get("/viewReports/670cc0f0b81604633398eba2") // Patient ID in the URL
        .set("Authorization", "Bearer mockAuthToken");  // Simulate auth token in header

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReports);
    });

    it("should return a 404 error if something goes wrong", async () => {
      Report.find.mockRejectedValue(new Error("Error occurred"));

      const response = await request(app)
        .get("/viewReports/670cc0f0b81604633398eba2") // Patient ID in the URL
        .set("Authorization", "Bearer mockAuthToken");  // Simulate auth token in header

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Error occurred");
    });
  });
});
