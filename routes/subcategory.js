const express = require('express');

const routs = express.Router();

const SubModel = require('../models/SubcategoryModel');

const SubcategoryController = require('../controllers/SubcategoryController');

routs.get('/add_subcategory',SubcategoryController.add_subcategory);

routs.post("/insertSubcatData", SubModel.uploadImage,SubcategoryController.insertSubcatData);
module.exports = routs;