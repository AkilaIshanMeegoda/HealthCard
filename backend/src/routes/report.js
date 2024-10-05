const express = require("express");

const { addReport,getReports,getReport } = require("../controller/reportController");

const router = express.Router();

router.post('/addReport',addReport);
router.get('/viewReports/:id',getReports);
router.get('/viewReport/:id',getReport);

module.exports = router;