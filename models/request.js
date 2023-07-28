const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')
const Location = require('./location')

const requestSchema = new Schema({
    contents: {
        type: String,
        required: true,
        minlength: [8, "You must enter at least 8 characters to describe what you need." ],
        maxlength: [300, "Cannot accept a request of more than 300 characters"]
    },
    status:{
        type: String,
        enum: ['active', 'complete', 'canceled'],
        default: 'active'
    },
    requester: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        },
    servicers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        }],
    location: {type: Schema.Types.ObjectId, 
    required: true,
    ref: 'Location'
}
    
})

module.exports = mongoose.model('Request', requestSchema);