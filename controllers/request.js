const Request = require('../models/request')
module.exports = {
    index,
    new : newRequest,
    create,
    show,
    update,
    determineLocation,
}

function index(){}

function determineLocation(req,res){
    res.render("requests/determineLocation", {title: "Location"})
}

function newRequest(){}

function create(){}

function show(){}

function update(){}