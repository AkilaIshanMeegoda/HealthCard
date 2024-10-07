const express = require("express");

const { addPrescription,getPrescriptions,getPrescription } = require("../controller/prescriptionController");

const router = express.Router();

router.post('/addPrescription',addPrescription);
router.get('/getPrescriptions/:id',getPrescriptions);
router.get('/getPrescription/:id',getPrescription);

module.exports = router;