const express = require("express");

const { searchAppointments,getAppointment, createAppointment, updateAppointment, deleteAppointment } = require("../controller/appointmentController");

const router = express.Router();

router.get('/hospital-appointments', searchAppointments);
router.get('/hospital-appointment/:id', getAppointment);
router.post('/add',createAppointment);
router.delete('/delete/:id', deleteAppointment);
router.patch('/update/:id', updateAppointment);

module.exports = router;