const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const UserController = require("../controller/userController");

// Set a mock JWT secret for testing
process.env.SECRET = "testsecret";

const app = express();
app.use(express.json()); // For parsing application/json

// Mock user service
jest.mock("../services/userService");

// Mock authentication middleware
const mockAuthMiddleware = (req, res, next) => {
  req.user = { _id: "mockUserId" }; // Inject mock user ID for testing
  next();
};

// Apply mock authentication where needed
app.use(mockAuthMiddleware);

// Routes for testing
app.post("/login", UserController.loginUser);
app.post("/signup", UserController.signupUser);
app.get("/doctors", UserController.searchDoctors);
app.get("/staffMembers", UserController.searchStaffMembers);
app.get("/staffAdmins", UserController.searchStaffAdmins);
app.get("/users", UserController.searchUsers);
app.get("/user/:id", UserController.searchUser);
app.get("/hospitals", UserController.searchHospitals);

describe("User Controller Test Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  describe("POST /login", () => {
    it("should log in a user and return a token", async () => {
      userService.loginUser.mockResolvedValueOnce({
        token: "mockToken",
        email: "savishka@gmail.com",
        userType: "user",
      });

      const response = await request(app)
        .post("/login")
        .send({ email: "savishka@gmail.com", password: "Savishka@123" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token", "mockToken");
      expect(response.body.email).toBe("savishka@gmail.com");
      expect(response.body.userType).toBe("user");
    });

    it("should return 400 if login fails", async () => {
      userService.loginUser.mockRejectedValue(new Error("Invalid credentials"));

      const response = await request(app)
        .post("/login")
        .send({ email: "wrong@example.com", password: "wrongpassword" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Invalid credentials");
    });
  });

  describe("POST /signup", () => {
    it("should sign up a user successfully", async () => {
      userService.signupUser.mockResolvedValue({
        email: "savishka@gmail.com",
        userType: "user",
        token: "mockToken",
      });

      const response = await request(app)
        .post("/signup")
        .send({ email: "savishka@gmail.com", password: "Savishka@123", userType: "user" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token", "mockToken");
    });

    it("should return 400 if signup fails", async () => {
      userService.signupUser.mockRejectedValue(new Error("Signup failed"));

      const response = await request(app)
        .post("/signup")
        .send({ email: "savishka@gmail.com", password: "weakpassword" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Signup failed");
    });
  });

  describe("GET /doctors", () => {
    it("should return a list of doctors", async () => {
      userService.searchDoctors.mockResolvedValue([{ name: "Dr. Smith" }]);

      const response = await request(app).get("/doctors");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ name: "Dr. Smith" }]);
    });

    it("should return 500 if search fails", async () => {
      userService.searchDoctors.mockRejectedValue(new Error("Error fetching doctors"));

      const response = await request(app).get("/doctors");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Error fetching doctors");
    });
  });

  describe("GET /staffMembers", () => {
    it("should return a list of staff members", async () => {
      userService.searchStaffMembers.mockResolvedValue([{ name: "Staff A" }]);

      const response = await request(app).get("/staffMembers");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ name: "Staff A" }]);
    });

    it("should return 500 if search fails", async () => {
      userService.searchStaffMembers.mockRejectedValue(new Error("Error fetching staff members"));

      const response = await request(app).get("/staffMembers");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Error fetching staff members");
    });
  });

  describe("GET /staffAdmins", () => {
    it("should return a list of staff admins", async () => {
      userService.searchStaffAdmins.mockResolvedValue([{ name: "Admin A" }]);

      const response = await request(app).get("/staffAdmins");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ name: "Admin A" }]);
    });

    it("should return 500 if search fails", async () => {
      userService.searchStaffAdmins.mockRejectedValue(new Error("Error fetching admins"));

      const response = await request(app).get("/staffAdmins");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Error fetching admins");
    });
  });

  describe("GET /users", () => {
    it("should return a list of users", async () => {
      userService.searchUsers.mockResolvedValue([{ email: "user@example.com" }]);

      const response = await request(app).get("/users");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ email: "user@example.com" }]);
    });

    it("should return 500 if search fails", async () => {
      userService.searchUsers.mockRejectedValue(new Error("Error fetching users"));

      const response = await request(app).get("/users");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Error fetching users");
    });
  });

  describe("GET /user/:id", () => {
    it("should return a user by ID", async () => {
      userService.searchUserById.mockResolvedValue({ email: "user@example.com" });

      const response = await request(app).get("/user/123");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ email: "user@example.com" });
    });

    it("should return 500 if search fails", async () => {
      userService.searchUserById.mockRejectedValue(new Error("User not found"));

      const response = await request(app).get("/user/unknown-id");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "User not found");
    });
  });

  describe("GET /hospitals", () => {
    it("should return a list of hospitals", async () => {
      userService.searchHospitals.mockResolvedValue([{ name: "Hospital A" }]);

      const response = await request(app).get("/hospitals");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ name: "Hospital A" }]);
    });

    it("should return 500 if search fails", async () => {
      userService.searchHospitals.mockRejectedValue(new Error("Error fetching hospitals"));

      const response = await request(app).get("/hospitals");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Error fetching hospitals");
    });
  });
});
