const PostModel = require('../models/PostModel');
const moment =  require('moment');
const { post } = require('../routes/slider');

module.exports.add_post = async (req,res)=>{
    return res.render('add_post');
}

module.exports.insertPostData = async (req,res) =>{
    try{
       var img = '';
       if(req.file){
          img = PostModel.iPath+"/"+req.file.filename;
       }
       req.body.PostImage = img;
       req.body.username = req.user.name;
       req.body.created_date= moment().format('LLL');
       let postData = await PostModel.create(req.body);
       if(postData){
        req.flash('success',"Post Data added successfully")
        return res.redirect('back');
       }
       else{
        req.flash('error',"Not inserted")
        return res.redirect('back');
       }

    }
    catch(err){
        req.flash('error',"Something wrong");
        return res.redirect('back');
    }
}