var mongoose = require('mongoose');

const Schema = mongoose.Schema;
let Products = new Schema({
 
  image: {
    type: String
  },
  title: {
    type: String
  },
  item: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  Category_name: {
    type: String
  },

});



module.exports = mongoose.model('Products', Products, 'Products');
