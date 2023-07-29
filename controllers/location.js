const Location = require('../models/location')
module.exports = {
    index
}
async function index(req,res){
  const possibleLocations = await Location.find({})
  res.render("locations/index", {title: "locations",possibleLocations: possibleLocations, url: req.url})
}