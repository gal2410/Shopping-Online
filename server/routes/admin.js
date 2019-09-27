let express = require('express');
let router = express.Router();
let controllers = require("../controllers/admin");


router.get('/', controllers.getEmployees);
router.get('/fruits', controllers.getfruits);
router.get('/coffee', controllers.getcoffee);
router.get('/Pastries', controllers.getPastries);

router.post('/', controllers.createEmployee);
router.get('/:id', controllers.getEmployee);
router.put('/:id', controllers.editEmployee);
// router.get('/All', controllers.All);
// router.get('/coffee', controllers.coffee);
// router.get('/fruits', controllers.getfruits);
// router.get('/waffles', controllers.waffles);


module.exports = router;
