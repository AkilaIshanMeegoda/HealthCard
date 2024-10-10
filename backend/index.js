const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const userRouter = require("./src/routes/user");
const requireAuth = require("./src/middleware/requireAuth");
const appointmentRouter = require("./src/routes/appointment");
const reportRouter = require("./src/routes/report");
const prescriptionRouter = require("./src/routes/prescriptionRoutes");

const profileRouter = require("./src/routes/patientProfileRoute");

const paymentRouter = require("./src/routes/payment");

require("dotenv").config();
const doctorRoutes = require("./src/routes/doctorRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const hospitalRoutes = require("./src/routes/hospitalRoutes")
const labappointments = require("./src/routes/labappointment");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));

const URL = process.env.MONGODB_URL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("MongoDB Connection Success!");
    app.listen(PORT, () => {
      console.log(`Server is up and running on Port Number: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/user", userRouter);

app.use("/api/doctors", doctorRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/hospital", hospitalRoutes);

app.use("/appointment", requireAuth, appointmentRouter);
app.use("/labappointment", requireAuth, labappointments);
app.use("/report", requireAuth, reportRouter);

app.use("/patientprofile", requireAuth, profileRouter);
app.use("/prescription", requireAuth, prescriptionRouter);

app.use("/api/payment", requireAuth, paymentRouter);


