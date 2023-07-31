const Request = require('../models/request')
const Location = require('../models/location')

module.exports = {
    index,
    create,
    complete,
    cancel,
    take,
    delete:deleteRequest,
}

async function index(req,res){
    location = await Location.findOne({_id: req.cookies.locationId})
    let authorizedUser = false;
    if (location.authorizedUsers.includes(req.user._id))
      authorizedUser = true
    let role = req.user.role
    let allRequests
    if (authorizedUser)
        allRequests = await Request.find({location: location}).populate('requester').populate('location').sort({status: 'desc'})
    else
        allRequests = await Request.find({requester: req.user}).populate('requester').populate('location')
    res.render('requests/index', {title: "All Requests", requests: allRequests, authorizedUser: authorizedUser, role:role, locationName: location.name})
}
async function authorizedHere(req){
    location = await Location.findOne({_id: req.cookies.locationId})
    let authorizedUser = false;
    if (location.authorizedUsers.includes(req.user._id))
      authorizedUser = true
    return authorizedUser
}

async function take(req,res){

}
async function create(req,res){
    let request = {}
    request.contents = req.body.contents
    request.requester = req.user
    request.location = await Location.findOne({_id: req.cookies.locationId})
    try {
    const r = await Request.create(request)
    req.user.requestsInitiated.push(r)
    await req.user.save()

} catch(e){}
    res.redirect("/")
}

async function deleteRequest(req,res){
    await Request.deleteOne({_id:req.params.id})
    if(authorizedHere(req))
        res.redirect("/requests")
    else
        res.redirect("/")
}

async function cancel(req,res){
    const myRequests =await Request.findOne({_id: req.params.id, status: 'active'}).populate('requester')
    myRequests.status = 'canceled'
    await myRequests.save()
    if(authorizedHere(req))
        res.redirect("/requests")
    else
        res.redirect("/")
}

async function complete(req,res){
    const myRequests =await Request.findOne({_id: req.params.id, status: 'active'}).populate('requester')
    myRequests.status = 'complete'
    await myRequests.save()
    if(authorizedHere(req))
        res.redirect("/requests")
    else
        res.redirect("/")
}