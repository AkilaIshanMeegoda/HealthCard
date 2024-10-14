const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const doctorService = require("../services/doctorService");
const doctorController = require("../controller/doctorController");

// Initialize Express app
const app = express();
app.use(express.json());

// Mock doctorService methods
jest.mock("../services/doctorService");

// Set up routes for testing
app.post("/doctors/add", doctorController.addDoctor);
app.get("/doctors/:hospitalId", doctorController.getDoctorsByHospital);
app.put("/doctors/:id", doctorController.updateDoctor);
app.delete("/doctors/:id", doctorController.deleteDoctor);
app.get("/doctors/doctor/:id", doctorController.getDoctorById);

describe("Doctor Controller - CRUD Operations", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  const mockDoctor = {
    _id: "670ccf162c11c523c7489c40",
    doctorName: "Nadun Silva",
    specialization: "Neurologist",
    experience: 3,
    hospitalId: "dinithisanjana563@gmail.com",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healthcard-3ff2d.appspot.com/o/_847c482a-1750-4421-9f1a-0ba306e192a3.jpeg.jpg?alt=media&token=17694ae2-0a29-4b81-b99b-ca1d8f536289",
    availability: [
      { date: "Friday", _id: "670ccf162c11c523c7489c41" },
      { date: "Wednesday", _id: "670ccf162c11c523c7489c42" },
    ],
    time: "10 AM",
    maxAppointmentCount: 4,
    description:
      "Highly skilled neurologist with over 6 years of experience...",
    ward: 6,
    status: "active",
    paymentAmount: 2000,
  };

  describe("POST /doctors/add - Add a Doctor", () => {
    it("should add a new doctor and return 201 status", async () => {
      doctorService.createDoctor.mockResolvedValue(mockDoctor);

      const response = await request(app)
        .post("/doctors/add")
        .send(mockDoctor);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockDoctor);
    });

    it("should return 400 for invalid data", async () => {
      doctorService.createDoctor.mockRejectedValue(
        new Error("Invalid data")
      );

      const response = await request(app).post("/doctors/add").send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid data");
    });
  });

  describe("GET /doctors/:hospitalId - Get Doctors by Hospital", () => {
    it("should return a list of doctors for a valid hospitalId", async () => {
      doctorService.getDoctorsByHospital.mockResolvedValue([mockDoctor]);

      const response = await request(app).get(
        "/doctors/dinithisanjana563@gmail.com"
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockDoctor]);
    });

    it("should return 404 if no doctors found", async () => {
      doctorService.getDoctorsByHospital.mockRejectedValue(
        new Error("Doctors not found")
      );

      const response = await request(app).get("/doctors/unknown@gmail.com");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Doctors not found");
    });
  });

  describe("PUT /doctors/:id - Update Doctor", () => {
    it("should update the doctor and return 200 status", async () => {
      const updatedDoctor = { ...mockDoctor, doctorName: "Updated Name" };
      doctorService.updateDoctor.mockResolvedValue(updatedDoctor);

      const response = await request(app)
        .put("/doctors/670ccf162c11c523c7489c40")
        .send(updatedDoctor);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedDoctor);
    });

    it("should return 400 for invalid doctor ID", async () => {
      const response = await request(app).put("/doctors/invalid-id");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid doctor ID.");
    });

    it("should return 500 if update fails", async () => {
      doctorService.updateDoctor.mockRejectedValue(
        new Error("Update failed")
      );

      const response = await request(app)
        .put("/doctors/670ccf162c11c523c7489c40")
        .send(mockDoctor);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Update failed");
    });
  });

  describe("DELETE /doctors/:id - Delete Doctor", () => {
    it("should delete the doctor and return 200 status", async () => {
      doctorService.deleteDoctor.mockResolvedValue({ message: "Doctor deleted" });

      const response = await request(app).delete(
        "/doctors/670ccf162c11c523c7489c40"
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Doctor deleted");
    });

    it("should return 400 for invalid doctor ID", async () => {
      const response = await request(app).delete("/doctors/invalid-id");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid doctor ID.");
    });

    it("should return 500 if delete fails", async () => {
      doctorService.deleteDoctor.mockRejectedValue(new Error("Delete failed"));

      const response = await request(app).delete(
        "/doctors/670ccf162c11c523c7489c40"
      );

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Delete failed");
    });
  });

  describe("GET /doctors/doctor/:id - Get Doctor by ID", () => {
    it("should return doctor details for a valid ID", async () => {
      doctorService.getDoctorById.mockResolvedValue(mockDoctor);

      const response = await request(app).get(
        "/doctors/doctor/670ccf162c11c523c7489c40"
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDoctor);
    });

    it("should return 400 for invalid doctor ID", async () => {
      const response = await request(app).get("/doctors/doctor/invalid-id");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid doctor ID format.");
    });

    it("should return 404 if doctor not found", async () => {
      doctorService.getDoctorById.mockRejectedValue(
        new Error("Doctor not found")
      );

      const response = await request(app).get(
        "/doctors/doctor/670ccf162c11c523c7489c40"
      );

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Doctor not found");
    });
  });
});
