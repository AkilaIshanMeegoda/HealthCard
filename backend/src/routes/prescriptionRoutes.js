const express = require("express");

const { addPrescription,getPrescriptions,getPrescription, getUserPrescriptions } = require("../controller/prescriptionController");

const router = express.Router();

router.post('/addPrescription',addPrescription);
router.get('/getPrescriptions/:id',getPrescriptions);
router.get('/getPrescription/:id',getPrescription);
router.get('/viewMyPrescription',getUserPrescriptions);
module.exports = router;