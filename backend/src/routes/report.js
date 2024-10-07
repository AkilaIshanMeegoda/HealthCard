const express = require("express");

const { addReport,getReports,getReport,updateReport,deleteReport, getUserReports } = require("../controller/reportController");

const router = express.Router();

router.post('/addReport',addReport);
router.get('/viewReports/:id',getReports);
router.get('/viewReport/:id',getReport);
router.patch('/updateReport/:id',updateReport);
router.delete('/deleteReport/:id',deleteReport);
router.get('/viewMyReports',getUserReports);

module.exports = router;