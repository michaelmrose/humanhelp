module.exports = {
  index
}
const Request = require('../models/request')
const User = require('../models/user')

async function index(req, res) {
  if (req.user){
    const myRequests =await Request.find({requester: req.user._id}).populate('requester')
    const peopleHere = await  User.find({})
  res.render("index", {
    title: "Humanhelp",
    requests: myRequests,
    users: peopleHere ,
  });
  }
  res.render("index", {
    title: "Humanhelp",
    requests: [],
    users: [],
  });
}
