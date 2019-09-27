var mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Orders = new Schema({
  userId: {
    type: String,
    required: true
  },
  userCartId: {
    type: String,
    required: true
  },
  city:{
    type: String
  },
  street:{
    type: String
  },
  Shipping_Date:{
    type: String
  },
  Credit_Card:{
    type: Number
  },
  totalPrice:{
    type: Number
  },
  Order_date:{
    type: Date,
     default: Date.now
    }
  
});


module.exports = mongoose.model('Orders', Orders, 'Orders');
