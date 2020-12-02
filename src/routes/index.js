const express = require('express');
const controller = require('../controllers/index');

const router = express();

// http://localhost:3000/users/3

// Users
router.get("/users/:id");
router.post("/users");
router.delete("/users/:id");
router.put("/users/:id");

// Data
router.get("/data", controller.handleGettingDataRequest);
router.post("/data/:id", controller.handleCreationDataRequest);
router.delete("/data", controller.handleDeleteDataRequest);
router.put("/data", controller.handleUpdateDataRequest);

module.exports = router;