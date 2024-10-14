const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const UserController = require("../controller/userController.js");
const User = require("../models/User.js"); // Adjust the import path accordingly

// Set a mock JWT secret for testing
process.env.SECRET = "testsecret";

const app = express();
app.use(express.json()); // For parsing application/json

// Mock User model methods
jest.mock("../models/User.js");

app.post("/login", UserController.loginUser);

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  describe("POST /login", () => {
    it("should log in a user and return a token", async () => {
      // Mock the User.login function to return a valid user
      User.login.mockResolvedValueOnce({
        _id: "670cc0f0b81604633398eba2",
        email: "savishka@gmail.com",
        userType: "user", // Ensure this field is included
      });

      const response = await request(app)
        .post("/login")
        .send({ email: "savishka@gmail.com", password: "Savishka@123" });

      // Check if the response is 200 and contains the correct data
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body.email).toBe("savishka@gmail.com");
      expect(response.body.userType).toBe("user");

      // Verify the token structure
      const decoded = jwt.verify(response.body.token, process.env.SECRET);
      expect(decoded).toHaveProperty("_id", "670cc0f0b81604633398eba2");
    });

    it("should return an error if login fails", async () => {
      // Mock login failure
      User.login.mockRejectedValueOnce(new Error("Invalid credentials"));

      const response = await request(app)
        .post("/login")
        .send({ email: "wrong@example.com", password: "wrongpassword" });

      // Check if the response is 400 and contains the error message
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Invalid credentials");
    });
  });
});
