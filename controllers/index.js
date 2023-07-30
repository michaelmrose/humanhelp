module.exports = {
  index
}
const Request = require('../models/request')
const User = require('../models/user')
const Location = require('../models/location')
async function index(req, res) {
  const possibleLocations = await Location.find({})
  if (req.user){
    // we will have to herein invalidate the cookie locationId if user is not at location any longer
    const myRequests =await Request.find({requester: req.user._id, status: 'active'}).populate('requester')
    const peopleHere = await  User.find({})
    if (!req.cookies.locationId){
      res.redirect("/locations?target=/?method=GET")
      return
    }
    const location = await Location.findOne({_id: req.cookies.locationId})
  res.render("index", {
    title: "Humanhelp",
    requests: myRequests,
    users: peopleHere ,
    possibleLocations: possibleLocations,
    locationName: location.name,
    id: myRequests.length > 0 ? myRequests[0]._id : -1
  });
  } else {
      res.render("index", {
      title: "Humanhelp",
      possibleLocations: possibleLocations,
      locationName : '.',
      requests: [],
      users: [],
    })}
}
