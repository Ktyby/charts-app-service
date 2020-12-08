const express = require('express');
const controller = require('../controllers/index');

const router = express();

// Users
router.get("/users/:id");
router.post("/users");
router.delete("/users/:id");
router.put("/users/:id");

// Data
router.get("/data", controller.handleGettingDataRequest);
router.post("/data", controller.handleCreationDataRequest);
router.post("/data/:id", controller.handleAdditionalDataRequest);
router.delete("/data", controller.handleDeleteDataRequest);
router.put("/data", controller.handleUpdateDataRequest);

module.exports = router;