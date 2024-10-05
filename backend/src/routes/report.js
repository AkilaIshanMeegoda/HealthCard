const express = require("express");

const { addReport } = require("../controller/reportController");

const router = express.Router();

router.post('/addReport',addReport);

module.exports = router;