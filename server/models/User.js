var mongoose = require('mongoose');

const Schema = mongoose.Schema;

let User = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  contact: {
    type: String
  },
  last_name: {
    type: String
  },
  city: {
    type: String
  },
  street: {
    type: String
  },
  role:{
    type: String,
    default:1}

});


module.exports = mongoose.model('User', User, 'User');
