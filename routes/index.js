const express = require('express');
const router = express.Router();
const passport = require('passport');
const indexRouter = require("../controllers/index.js")
const locationController = require('../controllers/location');
const requestController = require('../controllers/request');
const userController = require('../controllers/user');
const ensureLoggedIn = require('../config/ensureLoggedIn')
const ensureLocated = require('../config/ensureLocated')

router.get('/',  ensureLocated, indexRouter.index);

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
router.get('/locations', locationController.index)

//====================================
// REQUESTS
//====================================
// update a particular request
//temporary req route
router.get('/requests',ensureLocated, ensureLoggedIn, requestController.index)
//cancel or complete requests this needs logic to protect it from people not logged in at the store as well as not logged in
router.put("/requests/:id/cancel", ensureLoggedIn, requestController.cancel)
router.put("/requests/:id/complete", ensureLoggedIn, requestController.complete)
router.delete("/requests/:id/delete", ensureLoggedIn, requestController.delete)
router.put("/requests/:id/take", ensureLoggedIn, requestController.take)
  // actually create a request
  router.post("/requests", ensureLoggedIn, requestController.create)

//====================================
// USERS
//====================================
router.get("/users", ensureLocated, ensureLoggedIn, userController.index)
router.get("/locations/login", ensureLoggedIn,ensureLocated , locationController.login)
router.get("/locations/logout", ensureLoggedIn, ensureLocated, locationController.logout)
//====================================


module.exports = router;