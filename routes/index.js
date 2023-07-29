const express = require('express');
const router = express.Router();
const passport = require('passport');
const indexRouter = require("../controllers/index.js")
const locationController = require('../controllers/location');
const requestController = require('../controllers/request');
const userController = require('../controllers/user');
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/', indexRouter.index);

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/');
  });
});
//====================================
// LOCATIONS
//====================================
router.get('/locations',ensureLoggedIn, locationController.index)

//====================================
// REQUESTS
//====================================
// update a particular request
//temporary req route
router.get('/requests', ensureLoggedIn, requestController.index)
//cancel or complete requests
router.put("/requests/:id/cancel", ensureLoggedIn, requestController.cancel)
router.put("/requests/:id/complete", ensureLoggedIn, requestController.complete)
  // actually create a request
  router.post("/requests", ensureLoggedIn, requestController.create)

//====================================
// USERS
//====================================
router.get("/users", ensureLoggedIn, userController.index)
router.get("/auth/store")
router.post("/auth/store")
//====================================


module.exports = router;