const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
    contents: {
        type: String,
        required: true,
        minlength: [8, "You must enter at least 8 characters to describe what you need." ],
        maxlength: [300, "Cannot accept a request of more than 300 characters"],
        requester: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: User,
        },
        servicers: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: User,
        }],
    }
})

module.exports = mongoose.model('Request', requestSchema);

// this is done as a var to ensure its hoisted, its done after export to avoid circular deps
var User = require('./user')