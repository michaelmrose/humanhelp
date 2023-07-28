const mongoose = require('mongoose')
const Schema = mongoose.Schema


const locatationSchema = new Schema({
    name: {type: String, required: true},
    password: {
        type: String,
        required: true,
        minlength: [8, "Passwords must be at least 8 characters"],
        maxlength: [160, "Passwords cannot be any longer than 160 characters"],
    },
    authorizedUsers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    requests: [{type: Schema.Types.ObjectId, ref: 'Request'}],
})

module.exports = mongoose.model('Location', locatationSchema);

var User = require('./user')
var Request = require('./request')