module.exports = {
  index
}
const Request = require('../models/request')
const User = require('../models/user')
const Location = require('../models/location')
async function index(req, res) {
  if (req.user){
    try {
    const location = await Location.findOne({_id: req.cookies.locationId})
    const myRequests =await Request.find({requester: req.user._id, status: 'active'}).populate('requester').populate('servicers')
    const peopleHere = await  User.find({location: location, role: "employee"})
    let authorizedUser = false;
    if (location.authorizedUsers.includes(req.user._id))
      authorizedUser = true
    req.user.location = location
    await req.user.save()
    } catch(e){}
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
      locationName : undefined,
      requests: [],
      users: [],
    authorizedUser: false,
    role: ''
    })}
}
