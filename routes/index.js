const express = require('express');
const router = express.Router();
const passport = require('passport');
const indexRouter = require("../controllers/index.js")
const locationController = require('../controllers/location');
const requestController = require('../controllers/request');
const userController = require('../controllers/user');

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
    // form to create a new request at location :id
    router.get("/locations/:id/requests/new", locationController.new)
    // actually create a request at loction :id
    router.post("/locations/:id/requests", locationController.create)
    // get requests at location id
    router.get("locations/:id/requests",requestController.index)
    // get users at location :id
    router.get("/locations/:id/users", userController.index)

//====================================
// REQUESTS
//====================================
router.get("/requests/determineLocation", requestController.determineLocation)
// update a particular request
router.put("requests/id", requestController.update)
// get a particular request
router.get("/requests/:id", requestController.show)

//====================================
// USERS
//====================================
// get a form used to create a new user at a particular location
router.get("/users/new", userController.new)
// create a new user
router.post("/users/:id", userController.create)
// update a user
router.put("/users/:id", userController.update)
// delete a user
router.delete("/users/:id", userController.delete)
//====================================


module.exports = router;