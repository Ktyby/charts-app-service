const express = require('express');
const passport = require('passport');
const controller = require('../controllers/index');

const router = express();

// Users

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

router.get('/home', isAuthenticated, (req, res) => {
  res.send("Hello World");
});

/* Обработка POST-данных авторизации */
router.post('/login', 
  passport.authenticate('login', { 
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true 
  })
);

/* Обработка регистрационных POST-данных */
router.post('/signup', 
  passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash : true 
  })
);

router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// Data
router.get("/data", controller.handleGettingDataRequest);
router.post("/data", controller.handleCreationDataRequest);
router.post("/data/:id", controller.handleAdditionalDataRequest);
router.delete("/data", controller.handleDeleteDataRequest);
router.put("/data", controller.handleUpdateFullDocumentRequest);
router.patch("/data", controller.handleUpdatePartDocumentRequest);

module.exports = router;