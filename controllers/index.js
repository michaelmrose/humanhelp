module.exports = {
  index
}
const Request = require('../models/request')
const User = require('../models/user')
const Location = require('../models/location')
async function index(req, res) {
  if (req.user){
    const myRequests =await Request.find({requester: req.user._id, status: 'active'}).populate('requester')
    const peopleHere = await  User.find({})
    const location = await Location.findOne({_id: req.cookies.locationId})
  res.render("index", {
    title: "Humanhelp",
    requests: myRequests,
    users: peopleHere ,
    locationName: location.name,
    id: myRequests.length > 0 ? myRequests[0]._id : -1
  });
  } else {
      res.render("index", {
      title: "Humanhelp",
      locationName : '.',
      requests: [],
      users: [],
    })}
}
