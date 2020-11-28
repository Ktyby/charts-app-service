const express = require('express');
const controller = require('../controllers/index');

const router = express();

// http://localhost:3000/users/3

// Users
router.get("/users/:id", () => {});
router.post("/users", () => {});
router.delete("/users/:id", () => {});
router.put("/users/:id", () => {});

// Data
router.get("/data/:id", (req, res) => {
  console.log(req, res);
    res.status(200);
    res.json({
      query: req.query,
      params: req.params,
    });
});

router.post("/data", (req, res) => {
  res.send('It works!');
});

router.delete("/data", () => {});
router.put("/data", () => {});

module.exports = router;