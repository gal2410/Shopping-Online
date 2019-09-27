let express = require('express');
let router = express.Router();
let controllers = require("../controllers/index");

/* GET home page. */
router.get('/', controllers.home);
router.post('/Orders', controllers.Orders);
router.get('/lastOrder', controllers.lastOrder);
router.get('/opencart', controllers.opencart);
router.get('/AllProducts', controllers.AllProducts);
router.get('/AllOrders', controllers.AllOrders);
router.get('/All', controllers.All);
router.get('/coffee', controllers.coffee);
router.get('/fruits', controllers.fruits);
router.get('/Snacks', controllers.Snacks);
router.get('/waffle/:id', controllers.Product);
router.post('/add_cart', controllers.addCart);
router.post('/update_cart', controllers.updateCart);
router.post('/signup', controllers.signup);
router.post('/login', controllers.login);
router.get('/logout', controllers.logout);
router.get('/fetch_cart', controllers.fetchCart);
router.get('/check', controllers.check);


module.exports = router;
