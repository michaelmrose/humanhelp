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
    const allRequests = await Request.findOne({}).populate('requester')
    res.render('requests/index', {title: "All Requests", requests: allRequests})
}


function newRequest(){}

async function create(req,res){
    let newUser = {}
    newUser.contents = req.body.contents
    newUser.requester = req.user
    try {
    await Request.create(newUser)} catch(e){}
    res.redirect("/")
}

function show(){}

function update(){}