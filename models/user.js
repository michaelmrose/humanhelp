const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Request = require('./request')
var Location = require('./location')

const userSchema = new Schema({
  name: {type: String, required: true},
  googleId: {
    type: String,
    required: true
  },
  email: {type: String, required: true},
  avatar: String,
  skills: [String],
  role: {type: String, required: true},
  available: String,
  loggedIn: String,
  location: {
      type: Schema.Types.ObjectId,
       ref: Location,
      },
  
    requestsInitiated: [{type: Schema.Types.ObjectId, ref: Request}],
    requestsServicing: [{type: Schema.Types.ObjectId, ref: Request}],

}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);