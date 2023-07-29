const Request = require('../models/request')
const Location = require('../models/location')

module.exports = {
    index,
    create,
    complete,
    cancel,
}

async function index(req,res){
    location = await Location.findOne({_id: req.body.locationId})
    const allRequests = await Request.find({location: location}).populate('requester')
    res.render('requests/index', {title: "All Requests", requests: allRequests})
}



async function create(req,res){
    let request = {}
    request.contents = req.body.contents
    request.requester = req.user
    request.location = await Location.findOne({_id: req.body.locationId})
    try {
    const r = await Request.create(request)
    req.user.requestsInitiated.push(r)
    await req.user.save()

} catch(e){}
    res.redirect("/")
}


async function cancel(req,res){
    const myRequests =await Request.find({requester: req.user._id, status: 'active'}).populate('requester')
    myRequests[0].status = 'canceled'
    await myRequests[0].save()
    res.redirect("/")
}

async function complete(req,res){
    const myRequests =await Request.find({requester: req.user._id, status: 'active'}).populate('requester')
    myRequests[0].status = 'complete'
    await myRequests[0].save()
    res.redirect("/")
}