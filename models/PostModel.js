const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imgPath = "/uploads/posts";

const PostSchema = mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    category : {
        type: String,
        required : true
    },
    description : {
        type: String,
        required : true
    },
    PostImage : {
        type: String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    created_date : {
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

PostSchema.statics.uploadImage = multer({storage : stData}).single('PostImage');
PostSchema.statics.iPath = imgPath;

const Post = mongoose.model('Post',PostSchema);

module.exports = Post;