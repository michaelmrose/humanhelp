const User = require('../models/user')
const Location = require('../models/location')
module.exports = {
    index,
}

async function index(req,res){
    try {
        location = await Location.findOne({_id: req.cookies.locationId})
        let authorizedUser = false;
        if (location.authorizedUsers.includes(req.user._id))
            authorizedUser = true
            let role = req.user.role
            let user
            if (authorizedUser)
                users = await User.find({location: location})
            else
                users = await User.find({location: location, role: "employee"})
                res.render("users/index", {title: "People", users: users, authorizedUser, role, locationName: location.name})
    }catch(e){}
}
