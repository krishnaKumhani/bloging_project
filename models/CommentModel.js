const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imgPath = "/uploads/userImages";

const CommentSchema = mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Post"
    },
    email : {
        type: String,
        required : true
    },
    message : {
        type: String,
        required : true
    },
    status:{
        type : Boolean,
        required : true
    },
   
    commentImage : {
        type: String,
        required : true
    },
    created_date:{
        type : String,
        required: true
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

CommentSchema.statics.uploadImage = multer({storage : stData}).single('commentImage');
CommentSchema.statics.iPath = imgPath;

const Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;