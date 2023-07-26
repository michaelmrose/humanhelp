const mongoose = require('mongoose')
const Schema = mongoose.Schema
const locatationSchema = new Schema({
    password: {
        type: String,
        required: true,
        minlength: [8, "Passwords must be at least 8 characters"],
        maxlength: [160, "Passwords cannot be any longer than 160 characters"],
    },
    users: [{type: Schema.Types.ObjectId, ref: User}],
    requests: [{type: Schema.Types.ObjectId, ref: Request}],
})


module.exports = mongoose.model('Location', locatationSchema);

// this is done as a var to ensure its hoisted, its done after export to avoid circular deps
var User = require('./user')
var Request = require('./request')