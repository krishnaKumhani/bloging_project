const CategoryModel = require('../models/CategoryModel');
const SubcategoryModel = require('../models/SubcategoryModel');
const moment = require('moment');

module.exports.add_subcategory = async (req,res) =>{

    const cate  = await CategoryModel.find({});
    return res.render("add_subcategory",{
        catData : cate
    });
}

module.exports.insertSubcatData = async (req,res) =>{
    try{
        var img = '';
        if(req.file){
            img = SubcategoryModel.iPath+"/"+req.file.filename;
        }
        req.body.SubcategoryImage = img;
        req.body.status = true;
        req.body.created_date = moment().format("LLL");
        let subcate = await SubcategoryModel.create(req.body);
        if(subcate){
            req.flash('success',"Subcategory Added");
            return res.redirect('back');
        }
        else{
            req.flash('error',"Something wrong");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
            req.flash('error',"Something wrong");
            return res.redirect('back');
    }
}
