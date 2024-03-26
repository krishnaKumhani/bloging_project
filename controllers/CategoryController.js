
const CategoryModel = require('../models/CategoryModel');
const moment = require('moment');

module.exports.add_category = async (req,res) =>{
    return res.render('add_category');
}

module.exports.insertCategoryData = async (req,res) =>{ 
    req.body.status = true;
    req.body.created_date = moment().format("LLL");
    let cData = await CategoryModel.create(req.body);
    return res.redirect('back');
}