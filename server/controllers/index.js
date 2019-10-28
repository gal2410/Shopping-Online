exports = module.exports = {};
var Products = require('../models/Products');
var Orders = require('../models/orders');
var Cart = require("../models/Cart");
var User = require("../models/User");
var UserCart = require("../models/UserCart");
var Login = require("../models/login");
var bCrypt = require('bcrypt-nodejs');

exports.opencart = (req, res) => {
  var userId = req.session.uid;
  UserCart.findOne({ }, (err, cart) => {
    if (err) {
      res.send(dbError(err));
    }
    else {
      res.send(cart);
    };
  }).sort({ '_id': -1 }).limit(1)
}

exports.lastOrder = (req, res) => {
  var userId = req.session.uid;
  Orders.findOne({ }, (err, lastOrder) => {
    if (err) {
      res.send(dbError(err));
    }
    else {
      res.send(lastOrder);
    };
  }).sort({ '_id': -1 }).limit(1)
}

exports.AllProducts = (req, res) => {
  Products.count({}, function (err, count) {
    if (err) {
      res.send(err);
      return;
    }

    res.json({ count: count });
  });
}

exports.AllOrders = (req, res) => {
  Orders.count({}, function (err, count) {
    if (err) {
      res.send(err);
      return;
    }

    res.json({ count: count });
  });
}

exports.Orders = (req, res) => {
  var body = req.body;
  var userId = req.session.uid;
  var city = body.city;
  var street = body.street;
  var Shipping_Date = body.Shipping_Date;
  var Credit_Card = body.Credit_Card;
  Orders.find({ Shipping_Date: Shipping_Date }, (err, d) => {
    if (d.length>2) {
      res.send(sendStatus("You have to choose another day, all shipments are taken", 0, false));
    }else{
  if (!checkCreditCard(Credit_Card)) {
    res.send(sendStatus("Kindly enter the valid Credit Card", 0, false));
  }
  else {

    UserCart.findOne({ userId: userId }, (err, rusercart) => {
      if (err) { res.send(sendStatus(msg, 1, data, err)); }
      else if (rusercart) {
        var userCartId = rusercart._id
        var totalPrice = rusercart.totalPrice;
        if (city && street && Shipping_Date && Credit_Card) {
          var newOrders = new Orders({
            userId: userId,
            userCartId: userCartId,
            totalPrice: totalPrice,
            city: city,
            street: street,
            Shipping_Date: Shipping_Date,
            Credit_Card: Credit_Card,
          });
          newOrders.save((err, ruser) => {
            if (err) {
              res.send(dbError(err));
            }
            else {
              console.log(ruser);
              res.send((ruser));
            };
          }
          );
        }
      };
    })
  }  }});

}




// Sends Database Error to the client
function dbError(err) {
  return {
    message: "ERROR",
    status: 500,
    error: err
  };
}

// Send the response to the client with or without errors
function sendStatus(msg, status = 0, data, err = false) {
  return {
    message: msg,
    status: status,
    data: data,
    error: err
  };
}

// Hash the user password
function generateHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
}



// Check for the valid 10 digit contact number
// function checkPhone(str){
//   var p = new RegExp("^[6-9]{1}[0-9]{9}$");
//   return p.test(str);
// }

// Check for the valid client name - contains only alphabets
function checkName(str) {
  var p = new RegExp("^([a-zA-Z ]){2,60}$");
  return p.test(str);
}


function checkCreditCard(str) {
  var p = new RegExp("^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$");
  return p.test(str);
}


// Updates the user-cart and used in many below controllers
function updateUserCart(req, res, msg, data = false) {
  var userId = req.session.uid;
  var cart = new Cart(req.session['cart'] ? req.session['cart'] : {});
  var cartData = cart.getListDB();
  const totalQty = cart.totalQty;
  const totalPrice = cart.totalPrice;

  UserCart.findOne({ userId: userId }, (err, rusercart) => {

    if (err) { res.send(sendStatus(msg, 1, data, err)); }
    else if (rusercart) {

      rusercart.totalPrice = totalPrice;
      rusercart.totalQty = totalQty;
      rusercart.data = cartData;
      rusercart.save(err => {
        if (err) {
          res.send(sendStatus(msg, 1, data, err));
        }
        else res.send(sendStatus(msg, 1, data));
      });
    }
    else {
      var newUserCart = new UserCart({
        userId: userId,
        totalQty: totalQty,
        totalPrice: totalPrice,
        data: cartData
      });
      newUserCart.save(err => {
        if (err) {
          res.send(sendStatus(msg, 1, data, err));
        }
        else res.send(sendStatus(msg, 1, data));
      });
    }
  });
}




exports.home = (req, res) => {
  res.render('index', { title: ' API service' });
};




exports.fruits = (req, res) => {
  Products.find({ "Category_name": "fruits" }, (err, waffle) => {
    if (err) {
      res.send(dbError(err));
    }
    else {
      res.send(waffle);
    }
  });

};

exports.Snacks = (req, res) => {
  Products.find({ "Category_name": "Snacks" }, (err, waffle) => {
    if (err) {
      res.send(dbError(waffle));
    }
    else {
      res.send(waffle);
    }
  });

};

exports.coffee = (req, res) => {
  Products.find({ "Category_name": "coffee" }, (err, waffle) => {
    if (err) {
      res.send(dbError(err));
    }
    else {
      res.send(waffle);
    }
  });

};




exports.All = (req, res) => {
  Products.find((err, waffle) => {
    if (err) {
      res.send(dbError(err));
    }
    else {
      res.send(waffle);
    }
  });
};


exports.Product = (req, res) => {

  console.log(req.params.id);
  Products.findOne({ _id: req.params.id }, (err, waffle) => {
    if (err) {
      res.send(dbError(err));
    }
    else {
      res.send(waffle);
    }
  });
};




exports.addCart = (req, res) => {

  var item = req.body;

  var cart = new Cart(req.session['cart'] ? req.session['cart'] : {});
  cart.add(item, item.id);
  req.session['cart'] = cart;
  const success_msg = "ITEM_ADDED_SUCCESS";
  if (!req.session['email']) {
    res.send(sendStatus(success_msg, 1, false));
  }
  else {
    updateUserCart(req, res, success_msg);
  }
};

exports.fetchCart = (req, res) => {

  if (req.session['email'] && !req.session['cart']) {
    var userId = req.session.uid;
    UserCart.findOne({ userId: userId }, async (err, rusercart) => {
      if (err) {
        res.send(sendStatus(msg, 1, false, err));
      }
      else if (rusercart) {
        var data = rusercart.data;
        var cart = new Cart(req.session['cart'] ? req.session['cart'] : {});
        for (var i = 0; i < data.length; i++) {
          var id = data[i].itemId;
          var waff = await Products.findOne({ _id: id });
          waff['quantity'] = data[i].itemQty;
          // console.log(waff);
          cart.add(waff, id);
        }
        req.session['cart'] = cart;
        var c = cart.getList();
        res.send(c);
      }
      else {
        res.send(sendStatus("Something went wrong", 1, false));
      }
    });
  }
  else {
    var cart = new Cart(req.session['cart'] ? req.session['cart'] : {});
    var c = cart.getList();
    res.send(c);
  }

};




exports.updateCart = (req, res) => {

  var item = req.body;
  var cart = new Cart({});
  cart.update(item);
  req.session['cart'] = cart;
  const success_msg = "UPDATE_SUCCESS";
  if (!req.session['email']) {
    res.send(sendStatus(success_msg, 1, false));
  }
  else {
    updateUserCart(req, res, success_msg);
  }
};

exports.signup = (req, res) => {

  var body = req.body;
  var email = body.email;
  var contact = body.contact;
  var name = body.name;
  var pass = body.password;
  var last_name = body.last_name;
  var city = body.city;
  var street = body.street;




  if (!req.session['email']) {

    if (email && contact && name && pass && last_name && city && street) {

      if (pass.length < 8) {
        res.send(sendStatus("Minimum length of 8 is required for password", 0, false));
      }
      // else if(!checkPhone(contact)){
      //   res.send(sendStatus("Kindly enter the valid mobile number", 0, false));
      // }
      else if (!checkName(name)) {
        res.send(sendStatus("Kindly enter the valid name", 0, false));
      }
      else {

        User.findOne({ contact: contact }, (err, user) => {
          // console.log(req.body, "body");
          if (err) {
            res.send(dbError(err));
          }
          if (user) {
            console.log(user, "user");
            res.send(sendStatus("id already exist", 0, false));
          }
          else if (!user) {

            var newUser = new User({
              email: email,
              name: name,
              contact: contact,
              last_name: last_name,
              city: city,
              street: street,
              address: []
            });

            newUser.save((err, ruser) => {
              if (err) {
                res.send(dbError(err));
              }
              else {
                console.log(ruser);
                var newLogin = new Login({
                  email: email,
                  password: generateHash(pass)
                });
                newLogin.save(function (err, rlogin) {
                  if (err) {
                    res.send(dbError(err));
                  }
                  req.session['email'] = email;
                  req.session['uid'] = ruser._id;
                  const success_msg = "NEW_USER_CREATED";
                  updateUserCart(req, res, success_msg, ruser);
                });
              }
            });
          }
        });
      }
    }
    else {
      res.send(sendStatus("Kindly enter all the valid details", 0, false));
    }
  }
  else {
    res.send(sendStatus("Kindly logout first", 0, false));
  }
};

exports.login = (req, res) => {
  var body = req.body;
  var email = body.email;
  var pass = body.password;
  if (!req.session['email']) {
    if (email && pass) {
      Login.findOne({ email: email }, (err, login) => {

        if (err) {
          res.send(dbError(err));
        }
        else if (login) {
          var passwordCheck = bCrypt.compareSync(pass, login.password);
          if (passwordCheck && login) {

            req.session['email'] = email;
            const success_msg = "LOGIN_SUCCESS";
            User.findOne({ email: email }, (err, ruser) => {
              if (err) { res.send(sendStatus(success_msg, 1, ruser, err)); }
              else {
                req.session["uid"] = ruser._id;

                if (req.session['cart']) {
                  updateUserCart(req, res, success_msg, ruser);
                }

                else { res.send(sendStatus(success_msg, 1, ruser)); }

              }
            });
          }
          else { res.send(sendStatus("Incorrect Password", 0, false)); }
        }
        else {
          //Check in User
          //if found ask for verify email id
          // Else return not found
          res.send(sendStatus("Email is not registered", 0, false));
        }
      });
    }
    else { res.send(sendStatus("Kindly enter all the valid details", 0, false)); }
  }
  else { res.send(sendStatus("Already login", 0, false)); }
};


exports.logout = (req, res) => {
  delete req.session['email'];
  delete req.session['cart'];
  delete req.session['uid'];
  res.send(sendStatus("LOGOUT_DONE", 1, false));
};


exports.check = async (req, res) => {
  var sess = {
    data: false,
    user: {},
    add: false,
    address: {}
  };
  if (req.session['email']) {
    sess['data'] = true;
    await User.findOne({ email: req.session['email'] }, (err, ruser) => {
      if (err) res.send(dbError(err));
      else {
        sess['user'] = ruser;
      }
    });
  }

  if (req.session['address']) {
    sess['add'] = true;
    sess['address'] = req.session['address'];
  }
  console.log(sess);
  res.send(sess);
};

exports.addAddress = (req, res) => {

  if (req.session['email']) {
    req.session['address'] = req.body;
    res.send(sendStatus("ADD_ADDED", 1, false));
  }
  else {
    res.send(sendStatus("Nothing to add", 0, false));
  }
};

exports.fetchAddress = (req, res) => {

  if (req.session['email']) {

    User.findOne({ email: req.session['email'] }, { address: 1 }, (err, data) => {
      if (err) res.send(dbError(err));
      else {
        console.log(data);
        data['status'] = 1;
        res.send(data);
      }
    });
  }
  else {
    res.send(sendStatus("Nothing to fetch", 0, false));
  }
};
