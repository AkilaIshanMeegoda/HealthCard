// index.js or app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const connectToDatabase = require("./src/config/db"); // Import Singleton DB connection
const userRouter = require("./src/routes/user");
const appointmentRouter = require("./src/routes/appointment");
const reportRouter = require("./src/routes/report");
const prescriptionRouter = require("./src/routes/prescriptionRoutes");
const profileRouter = require("./src/routes/patientProfileRoute");
const paymentRouter = require("./src/routes/payment");
const doctorRoutes = require("./src/routes/doctorRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const labAppointments = require("./src/routes/labappointment");
const requireAuth = require("./src/middleware/requireAuth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(bodyParser.text({ limit: "200mb" }));

// Route setup
app.use("/user", userRouter);
app.use("/api/doctors", doctorRoutes);
app.use("/api/services", serviceRoutes);
app.use("/appointment", requireAuth, appointmentRouter);
app.use("/labappointment", requireAuth, labAppointments);
app.use("/report", requireAuth, reportRouter);
app.use("/patientprofile", requireAuth, profileRouter);
app.use("/prescription", requireAuth, prescriptionRouter);
app.use("/api/payment", requireAuth, paymentRouter);

// Connect to the database and start the server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
  });
});
