const express = require('express');

const routs = express.Router();

const CategoryController = require('../controllers/CategoryController');

routs.get('/add_category',CategoryController.add_category);

routs.post("/insertCategoryData", CategoryController.insertCategoryData);
module.exports = routs;