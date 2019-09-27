var Product = require('../models/Products');

const employeeCtrl = {};

employeeCtrl.getEmployees = async (req, res) => {
    const Products = await Product.find();
    res.json(Products);
};

employeeCtrl.getfruits = async (req, res) => {
    const Products = await Product.find({ "Category_name": "fruits" });
    res.json(Products);
};

employeeCtrl.getcoffee = async (req, res) => {
    const Products = await Product.find({ "Category_name": "coffee"  });
    res.json(Products);
};

employeeCtrl.getPastries = async (req, res) => {
    const Products = await Product.find({ "Category_name": "Snacks"  });
    res.json(Products);
};

employeeCtrl.createEmployee = async (req, res) => {
    // const employee = new Employee(req.body);
    const Pro = new Product({
        title: req.body.title,
        item: req.body.item,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        Category_name: req.body.Category_name
    });
    await Pro.save();
    res.json({
        status: 'Product Saved'
    });
};

employeeCtrl.getEmployee = async (req, res) => {
    const Pro = await Product.findById(req.params.id);
    res.json(Pro);
};

employeeCtrl.editEmployee = async (req, res) => {
    const { id } = req.params;
    const Pro = {
        title: req.body.title,
        item: req.body.item,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        Category_name: req.body.Category_name
    };
    await Product.findByIdAndUpdate(id, {$set: Pro}, {new: true});
    res.json({
        status: 'Product Updated'
    });
};






module.exports = employeeCtrl;