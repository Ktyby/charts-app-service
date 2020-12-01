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
router.get("/data/:id", controller.handleGettingDataRequest);
router.post("/data/:id", controller.handleCreationDataRequest);
router.delete("/data/:id", controller.handleDeleteDataRequest);
router.put("/data/:id", controller.handleUpdateDataRequest);

module.exports = router;