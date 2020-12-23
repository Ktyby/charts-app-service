const express = require('express');
const passport = require('passport');
const controller = require('../controllers/index');

const router = express();

// Users

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/main');
}

router.get("/main", (req, res) => {
  res.send("you logout");
});

router.get('/home', isAuthenticated, (req, res) => {
  res.send("Hello World");
});

router.post('/login', passport.authenticate('login', { 
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true,
  }), (req, res) => {
    res.render('index', { message: req.flash('message') });
  }
);

router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true,
  }), (req, res) => {
    res.render('register',{ message: req.flash('message') });
  }
);

router.get('/signout', (req, res) => {
  req.logout();
  res.redirect('/main');
});

// Data

router.get("/measure", isAuthenticated, controller.handleGettingMeasuresRequest)
router.get("/data/:id", isAuthenticated, controller.handleGettingDataRequest);
router.get("/data", isAuthenticated, controller.handleGettingAllCubesRequest);
router.post("/data", isAuthenticated, controller.handleCreationDataRequest);
router.post("/data/:id", isAuthenticated, controller.handleAdditionalDataRequest);
router.delete("/data", isAuthenticated, controller.handleDeleteDataRequest);
router.put("/data", isAuthenticated, controller.handleUpdateFullDocumentRequest);
router.patch("/data", isAuthenticated, controller.handleUpdatePartDocumentRequest);

module.exports = router;