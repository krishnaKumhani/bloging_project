const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imgPath = "/uploads/subcategory";

const SubcategorySchema = mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    categoryId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    description : {
        type: String,
        required : true
    },
    SubcategoryImage : {
        type: String,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    },
    created_date: {
        type : String,
        required : true
    }
})

const stData = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',imgPath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
})

SubcategorySchema.statics.uploadImage = multer({storage : stData}).single('SubcategoryImage');
SubcategorySchema.statics.iPath = imgPath;

const Subcategory = mongoose.model('Subcategory',SubcategorySchema);

module.exports = Subcategory;