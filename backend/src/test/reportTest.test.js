import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import ReportController from "../controller/reportController.js";
import Report from "../models/Report.js";

// Initialize the app and use express.json for parsing request body
const app = express();
app.use(express.json());

// Mock the report model methods
jest.mock("../models/Report.js");

// Set up routes for testing
app.post("/addReport", ReportController.addReport);
app.get("/viewReports/:id", ReportController.getReports);
app.get("/viewReport/:id", ReportController.getReport);
app.patch("/updateReport/:id", ReportController.updateReport);
app.delete("/deleteReport/:id", ReportController.deleteReport);
app.get("/hospitalReports/:id", ReportController.getReportsByHospital);
app.get("/viewMyReports", ReportController.getUserReports);

describe("Report Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test for getting all reports
  describe("GET /schedules", () => {
    it("should return all patient reports", async () => {
      const mockReports = [
        {
          _id: {
            $oid: "670cca3e4c97b2a9b4739973",
          },
          titleName: "Blood test report",
          date: "October 14, 2024",
          patientName: "Savishka Dilshan",
          category: "Blood Test Report",
          description: "Blood test is average",
          image:
            "https://firebasestorage.googleapis.com/v0/b/healthcard-3ff2d.appspot.com/o/test1.jpg?alt=media&token=f79e82a1-7654-4b8e-b4a2-7bb5a5a8c51b",
          patientId: "670cc0f0b81604633398eba2",
          hospitalId: "670cbb5b9f6fdce08e6194b5",
          createdAt: {
            $date: "2024-10-14T07:37:34.347Z",
          },
          updatedAt: {
            $date: "2024-10-14T07:37:34.347Z",
          },
          __v: 0,
        },
      ];
      Report.find.mockResolvedValue(mockReports); // Mocking the database call

      const response = await request(app).get("/viewMyReports");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReports);
    });

    it("should return an error if something goes wrong", async () => {
      Report.find.mockRejectedValue(new Error("Error occurred"));

      const response = await request(app).get("/viewMyReports");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error", "Error occurred");
    });
  });
});
