module.exports = {
  index
}
const Request = require('../models/request')
const User = require('../models/user')
const Location = require('../models/location')
async function index(req, res) {
  if (req.user){
    const location = await Location.findOne({_id: req.cookies.locationId})
    const myRequests =await Request.find({requester: req.user._id, status: 'active'}).populate('requester')
    const peopleHere = await  User.find({location: location, role: "employee"})
    let authorizedUser = false;
    if (location.authorizedUsers.includes(req.user._id))
      authorizedUser = true
    req.user.location = location
    await req.user.save()
  res.render("index", {
    title: "Humanhelp",
    requests: myRequests,
    users: peopleHere ,
    locationName: location.name,
    id: myRequests.length > 0 ? myRequests[0]._id : -1,
    authorizedUser: authorizedUser,
    role: req.user.role
  });
  } else {
      res.render("index", {
      title: "Humanhelp",
      locationName : '.',
      requests: [],
      users: [],
    authorizedUser: false,
    role: ''
    })}
}
