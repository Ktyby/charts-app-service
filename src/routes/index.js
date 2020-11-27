const express = require('express');
const controller = require('../controllers/index');

const router = express();

//router.get("/get", controller.getDataForChart);
router.post("/uploadcharts", controller.uploadDataForChart);
router.delete("/deletecharts", controller.deleteDataForChart);

module.exports = router;