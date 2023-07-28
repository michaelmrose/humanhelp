const Request = require('../models/request')

module.exports = {
    index,
    new : newRequest,
    create,
    show,
    update,
}

async function index(req,res){
    console.log('hit index')
    const allRequests = await Request.find({}).populate('requester')
    res.render('requests/index', {title: "All Requests", requests: allRequests})
}


function newRequest(){}

async function create(req,res){
    let request = {}
    request.contents = req.body.contents
    request.requester = req.user
    try {
    const r = await Request.create(request)
    req.user.requestsInitiated.push(r)
    await req.user.save()

} catch(e){}
    res.redirect("/")
}

function show(){}

function update(){}