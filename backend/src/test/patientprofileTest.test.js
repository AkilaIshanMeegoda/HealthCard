const request = require("supertest");
const express = require("express");
const patientProfileService = require("../services/patientProfileService");
const patientProfileController = require("../controller/patientProfileController");

// Initialize the app
const app = express();
app.use(express.json());

// Mock the patient profile service
jest.mock("../services/patientProfileService");

// Mock Authentication Middleware
const mockAuthMiddleware = (req, res, next) => {
  req.user = { _id: "670ce356569d087b8e8903d0" }; // Mock user ID
  next();
};

// Use mock authentication middleware
app.use(mockAuthMiddleware);

// Set up routes for testing
app.get("/:email", patientProfileController.getProfileByEmail);
app.put("/add", patientProfileController.createProfile);
app.delete("/delete", patientProfileController.deleteProfile);
app.patch("/update/:id", patientProfileController.updateProfile);

describe("Patient Profile Controller Test Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe("PUT /add", () => {
    it("should create a new profile and return 200", async () => {
      const mockRequestBody = {
        email: "savishka@gmail.com",
        name: "Savishka Dilshan",
        age: 22,
        address: "no 16, captain city, flower garden, walgama, Matara",
        telephone: "0766839636",
        description: "O+ blood group, height 5 ft 10 inches, weight 70kg!!",
      };

      const mockResponse = {
        ...mockRequestBody,
        _id: "670ce356569d087b8e8903d0",
      };

      patientProfileService.createProfile.mockResolvedValue(mockResponse);

      const response = await request(app)
        .put("/add")
        .send(mockRequestBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });

    it("should return 500 if profile creation fails", async () => {
      patientProfileService.createProfile.mockRejectedValue(
        new Error("Failed to create profile")
      );

      const response = await request(app)
        .put("/add")
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty(
        "message",
        "Failed to create profile"
      );
    });
  });

  describe("DELETE /delete", () => {
    it("should delete a profile and return 200", async () => {
      patientProfileService.deleteProfile.mockResolvedValue(true);

      const response = await request(app)
        .delete("/delete")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Profile deleted successfully"
      );
    });

    it("should return 500 if deleting the profile fails", async () => {
      patientProfileService.deleteProfile.mockRejectedValue(
        new Error("Failed to delete profile")
      );

      const response = await request(app)
        .delete("/delete")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty(
        "message",
        "Failed to delete profile"
      );
    });
  });
});
