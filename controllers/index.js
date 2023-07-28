module.exports = {
  index
}
const Request = require('../models/request')
const User = require('../models/user')

async function index(req, res) {
  if (req.user){
    const myRequests =await Request.find({requester: req.user._id, status: 'active'}).populate('requester')
    const peopleHere = await  User.find({})
  res.render("index", {
    title: "Humanhelp",
    requests: myRequests,
    users: peopleHere ,
    id: myRequests.length > 0 ? myRequests[0]._id : -1
  });
  }
  res.render("index", {
    title: "Humanhelp",
    requests: [],
    users: [],
  });
}
