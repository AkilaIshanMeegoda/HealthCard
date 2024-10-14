const request = require("supertest");
const express = require("express");
const reportService = require("../services/reportService");
const ReportController = require("../controller/reportController");

// Initialize the app and use express.json for parsing request body
const app = express();
app.use(express.json());

// Mock the report service
jest.mock("../services/reportService");

// Mock authentication middleware
const mockAuthMiddleware = (req, res, next) => {
  req.user = { _id: "670cbb5b9f6fdce08e6194b5" }; // Inject mock hospital/user ID
  next();
};

// Apply the middleware to all routes
app.use(mockAuthMiddleware);

// Define routes for testing
app.post("/addReport", ReportController.addReport);
app.get("/viewReports/:id", ReportController.getReports);
app.get("/viewReport/:id", ReportController.getReport);
app.patch("/updateReport/:id", ReportController.updateReport);
app.delete("/deleteReport/:id", ReportController.deleteReport);
app.get("/hospitalReports/:id", ReportController.getReportsByHospital);
app.get("/viewMyReports", ReportController.getUserReports);

describe("Report Controller Test Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe("POST /addReport", () => {
    it("should add a new report and return 200", async () => {
      const mockReportData = {
        titleName: "Blood test report",
        date: "October 14, 2024",
        patientName: "Savishka Dilshan",
        category: "Blood Test Report",
        description: "Blood test is average",
        image: "https://example.com/test1.jpg",
        patientId: "670cc0f0b81604633398eba2",
      };

      const mockResponse = { ...mockReportData, _id: "reportId123" };

      reportService.addReport.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post("/addReport")
        .send(mockReportData)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });

    it("should return 500 if adding report fails", async () => {
      reportService.addReport.mockRejectedValue(new Error("Failed to add report"));

      const response = await request(app)
        .post("/addReport")
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Failed to add report");
    });
  });

  describe("GET /viewReports/:id", () => {
    it("should return all reports for the given patient ID", async () => {
      const mockReports = [
        {
          titleName: "Blood test report",
          date: "October 14, 2024",
          patientName: "Savishka Dilshan",
          category: "Blood Test Report",
          description: "Blood test is average",
          image: "https://example.com/test1.jpg",
          patientId: "670cc0f0b81604633398eba2",
          hospitalId: "670cbb5b9f6fdce08e6194b5",
        },
      ];

      reportService.getReportsByPatientId.mockResolvedValue(mockReports);

      const response = await request(app).get("/viewReports/670cc0f0b81604633398eba2");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReports);
    });

    it("should return 404 if no reports are found", async () => {
      reportService.getReportsByPatientId.mockRejectedValue(
        new Error("No reports found")
      );

      const response = await request(app).get("/viewReports/unknown-id");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "No reports found");
    });
  });

  describe("GET /viewReport/:id", () => {
    it("should return a specific report by ID", async () => {
      const mockReport = {
        titleName: "Blood test report",
        date: "October 14, 2024",
        patientName: "Savishka Dilshan",
        category: "Blood Test Report",
        description: "Blood test is average",
        image: "https://example.com/test1.jpg",
        patientId: "670cc0f0b81604633398eba2",
        hospitalId: "670cbb5b9f6fdce08e6194b5",
      };

      reportService.getReportById.mockResolvedValue(mockReport);

      const response = await request(app).get("/viewReport/reportId123");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReport);
    });

    it("should return 404 if the report is not found", async () => {
      reportService.getReportById.mockRejectedValue(new Error("Report not found"));

      const response = await request(app).get("/viewReport/unknown-id");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Report not found");
    });
  });

  describe("PATCH /updateReport/:id", () => {
    it("should update a report and return 200", async () => {
      const updatedData = { description: "Updated description" };
      const mockUpdatedReport = { ...updatedData, _id: "reportId123" };

      reportService.updateReport.mockResolvedValue(mockUpdatedReport);

      const response = await request(app)
        .patch("/updateReport/reportId123")
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedReport);
    });

    it("should return 404 if the report to update is not found", async () => {
      reportService.updateReport.mockRejectedValue(new Error("Report not found"));

      const response = await request(app).patch("/updateReport/unknown-id").send({});

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Report not found");
    });
  });

  describe("DELETE /deleteReport/:id", () => {
    it("should delete a report and return 200", async () => {
      reportService.deleteReport.mockResolvedValue({ message: "Report deleted" });

      const response = await request(app).delete("/deleteReport/reportId123");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Report deleted");
    });

    it("should return 404 if the report to delete is not found", async () => {
      reportService.deleteReport.mockRejectedValue(new Error("Report not found"));

      const response = await request(app).delete("/deleteReport/unknown-id");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Report not found");
    });
  });

  describe("GET /hospitalReports/:id", () => {
    it("should return reports for the patient from the hospital", async () => {
      const mockReports = [
        {
          titleName: "Blood test report",
          date: "October 14, 2024",
          patientId: "670cc0f0b81604633398eba2",
        },
      ];

      reportService.getReportsByHospitalAndPatientId.mockResolvedValue(mockReports);

      const response = await request(app).get("/hospitalReports/670cc0f0b81604633398eba2");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReports);
    });

    it("should return 404 if no reports found", async () => {
      reportService.getReportsByHospitalAndPatientId.mockRejectedValue(
        new Error("No reports found")
      );

      const response = await request(app).get("/hospitalReports/unknown-id");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "No reports found");
    });
  });

  describe("GET /viewMyReports", () => {
    it("should return the user's reports", async () => {
      const mockReports = [
        { titleName: "Blood test report", patientId: "670cc0f0b81604633398eba2" },
      ];

      reportService.getUserReports.mockResolvedValue(mockReports);

      const response = await request(app).get("/viewMyReports");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReports);
    });

    it("should return 404 if no reports found", async () => {
      reportService.getUserReports.mockRejectedValue(new Error("No reports found"));

      const response = await request(app).get("/viewMyReports");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "No reports found");
    });
  });
});
