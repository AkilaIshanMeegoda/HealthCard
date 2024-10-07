const express = require("express");

const { searchAppointments,getAppointment, createAppointment, updateAppointment, deleteAppointment, getAppointmentsByEmail, getAppointmentsByDate } = require("../controller/appointmentController");

const router = express.Router();

router.get('/hospital-appointments', searchAppointments);
router.get('/hospital-appointment/:id', getAppointment);
router.post('/add',createAppointment);
router.delete('/delete/:id', deleteAppointment);
router.patch('/update/:id', updateAppointment);
router.get('/my-appointments/:email', getAppointmentsByEmail);
router.get('/appointment-date/:date', getAppointmentsByDate);

module.exports = router;