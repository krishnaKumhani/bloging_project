const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imgPath = "/uploads/sliders";

const SliderSchema = mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    link : {
        type: String,
        required : true
    },
    description : {
        type: String,
        required : true
    },
    SliderImage : {
        type: String,
        required : true
    },
    status : {
        type : Boolean,
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

SliderSchema.statics.uploadImage = multer({storage : stData}).single('SliderImage');
SliderSchema.statics.iPath = imgPath;

const Slider = mongoose.model('Slider',SliderSchema);

module.exports = Slider;