const Location = require('../models/location')
module.exports = {
    index,
    login,
    logout,
}
async function index(req,res){
  try{
  const possibleLocations = await Location.find({})
  }catch(e){}
  res.render("locations/index", {
    authorizedUser: true,
    role:'',
    title: "locations",
    possibleLocations: possibleLocations, 
    target: req.query.target,
     method: req.query.method})
}

async function login(req,res){
  try {
  const location = await Location.findOne({_id:req.cookies.locationId})
  location.authorizedUsers.push(res.locals.user)
  res.locals.user.role = "employee"
  await res.locals.user.save()
  await location.save()
  }catch(e){}
  res.redirect("/")
}

async function logout(req,res){
  try {
  const location = await Location.findOne({_id:req.cookies.locationId})
  location.authorizedUsers = []
  await location.save()
  res.locals.user.role = "customer"
  await res.locals.user.save()
  }catch(e){}
  res.redirect("/")
}