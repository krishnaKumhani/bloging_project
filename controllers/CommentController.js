const CommentModel = require('../models/CommentModel');

module.exports.view_comments =async (req,res) =>{
    let commentData = await CommentModel.find({}).populate('postId').exec();
    console.log(commentData);
    if(commentData){
        return res.render('view_comments',{
            commentData : commentData
        });
    }
    else{
        req.flash("error","something wrong");
        return res.redirect('/admin');
    }
}