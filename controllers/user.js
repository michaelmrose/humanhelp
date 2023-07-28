const User = require('../models/user')
module.exports = {
    index,
}

async function index(req,res){
    let users = await User.find({})
    res.render("users/index", {title: "People", users: users})
}
