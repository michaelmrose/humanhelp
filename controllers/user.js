const User = require('../models/user')
module.exports = {
    index,
    new : newUser,
    create,
    update,
    delete: deleteUser,
}

async function index(req,res){
    let users = await User.find({})
    res.render("users/index", {title: "People", users: users})
}

function newUser(){}

function create(){}

function deleteUser(){}

function update(){}