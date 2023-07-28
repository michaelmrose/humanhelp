const Request = require('../models/request')
const Location = require('../models/location')

module.exports = {
    index,
    new : newRequest,
    create,
    show,
    update,
    complete,
    cancel,
}

async function index(req,res){
    const allRequests = await Request.find({}).populate('requester')
    res.render('requests/index', {title: "All Requests", requests: allRequests})
}


function newRequest(){}

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

function show(){}

function update(){}

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