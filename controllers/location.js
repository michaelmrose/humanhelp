const Location = require('../models/location')
module.exports = {
    index,
    login,
    logout,
}
async function index(req,res){
  const possibleLocations = await Location.find({})
  res.render("locations/index", {title: "locations",possibleLocations: possibleLocations, target: req.query.target, method: req.query.method})
}

async function login(req,res){
  console.log(req.cookies.locationId)
  const location = await Location.findOne({_id:req.cookies.locationId})
  location.authorizedUsers.push(res.locals.user)
  location.activeAuthorizedUsers.push(res.locals.user)
  await location.save()
  res.redirect("/")
}

async function logout(req,res){
  const location = await Location.find({_id:req.cookies.locationId}).populate('authorizedUsers').populate('activeAuthorizedUsers').populate('authorizedUsers')
  location.authorizedUsers = []
  location.activeAuthorizedUsers = []
  await location.save()
}