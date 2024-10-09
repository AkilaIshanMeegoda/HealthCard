const express = require("express");

const { searchLabAppointments,getLabAppointment, createLabAppointment, updateLabAppointment, deleteLabAppointment, getLabAppointmentsByEmail } = require("../controller/labappointmentController");

const router = express.Router();

router.get('/hospital-appointments', searchLabAppointments);
router.get('/hospital-appointment/:id', getLabAppointment);
router.post('/add',createLabAppointment);
router.delete('/delete/:id', deleteLabAppointment);
router.patch('/update/:id', updateLabAppointment);
router.get('/my-appointments/:email', getLabAppointmentsByEmail);
// router.get('/appointment-date', getLabAppointmentsByDate);

module.exports = router;