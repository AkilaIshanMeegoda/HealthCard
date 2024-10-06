const express = require("express");

const { searchAppointments,getAppointment } = require("../controller/appointmentController");

const router = express.Router();

router.get('/hospital-appointments', searchAppointments);
router.get('/hospital-appointment/:id', getAppointment);

module.exports = router;