const Request = require('../models/request')
const Location = require('../models/location')

module.exports = {
    index,
    create,
    complete,
    cancel,
    take,
    drop,
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
        allRequests = await Request.find({location: location}).populate('servicers').populate('requester').populate('location').sort({status: 'desc'})
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
    // only users authorized at the location can take/drop/delete
    if (await authorizedHere(req)){
    let request = await Request.findOne({_id: req.params.id})
    request.servicers.push(req.user)
    await request.save()
    res.redirect("/requests")
    }
    else res.redirect("/")
}

async function drop(req,res){
    // only users authorized at the location can take/drop/delete
    if (await authorizedHere(req)){
    let request = await Request.findOne({_id: req.params.id}).populate('servicers')
    request.servicers = request.servicers.filter(e=>e._id===req.user.id)
    await request.save()
    res.redirect("/requests")
    } else res.redirect("/")
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
    // only users authorized at the location can take/drop/delete
    if (await authorizedHere(req)){
    await Request.deleteOne({_id:req.params.id})
    if(authorizedHere(req))
        res.redirect("/requests")
    else
        res.redirect("/")
    } else res.redirect("/")
}

async function cancel(req,res){
    // only creator of request OR authorized user at this location can cancel or complete a request
    if (await authorizedHere(req) || myRequest.requester._id.toString() === req.user._id.toString()){
    const myRequest =await Request.findOne({_id: req.params.id, status: 'active'}).populate('requester')
    myRequest.status = 'canceled'
    await myRequest.save()
    if(authorizedHere(req))
        res.redirect("/requests")
    else
        res.redirect("/")
    } else res.redirect("/")
}

async function complete(req,res){
    // only creator of request OR authorized user at this location can cancel or complete a request
    const myRequest =await Request.findOne({_id: req.params.id, status: 'active'}).populate('requester')
    if (await authorizedHere(req) || myRequest.requester._id.toString() === req.user._id.toString()){
    myRequest.status = 'complete'
    await myRequest.save()
    if(authorizedHere(req))
        res.redirect("/requests")
    else
        res.redirect("/")
    } else res.redirect("/")
}