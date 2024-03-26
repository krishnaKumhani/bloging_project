const SliderModel = require('../models/SliderModel');
const PostModel = require('../models/PostModel');
const CommentModel = require('../models/CommentModel');
const moment = require('moment');
const CategoryModel = require('../models/CategoryModel');
const SubcategoryModel = require('../models/SubcategoryModel');


module.exports.home = async (req,res) =>{
    let sliderdata = await SliderModel.find({status: true});
    let postData = await PostModel.find();
  
    return res.render('userPanel/home',{
        sliderdata,
        postData
    })
}

module.exports.blogSingle = async (req,res) =>{

    // next and prev
    let allIds = await PostModel.find({});
    var ids = [];
    allIds.map((v,i)=>{
        ids[i] = v._id;
    })
    var next;
    ids.map((v,i)=>{
        if(v==req.params.id){
            next = i;
        }
    })

    //end logic

    //comment logic
    let commentByPost  = await CommentModel.find({postId:req.params.id,status:true});
    
    //end comment logic

    //recent post

    let recentPost = await PostModel.find({}).sort({_id:-1}).limit(3) ;
    console.log(recentPost);

    //

    let blogSingle = await PostModel.findById(req.params.id);
    if(blogSingle){
        return res.render('userPanel/blogSingle',{
            blogData : blogSingle,
            next : next,
            allIds : ids,
            commentByPost : commentByPost,
            recentPost : recentPost
        })
    }
}


module.exports.addComment = async (req,res) =>{
    try{
        console.log(req.file);
        console.log(req.body);
        var img = '';
        if(req.file){
            img = CommentModel.iPath+"/"+req.file.filename;
        }
        req.body.commentImage = img;
        req.body.status = true;
        req.body.created_date = moment().format("LLL")
        let commentData = await CommentModel.create(req.body);
        if(commentData){
            req.flash("success","Comment Added Successfully");
            return res.redirect('back');
        }
        else{
            req.flash("error","Something wrong");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        req.flash("error","Something wrong");
        return res.redirect('back');
    }
}



module.exports.workThreeColumns = async (req,res) =>{
    try{
        let catData = await CategoryModel.find({});
        let subcatData = await SubcategoryModel.find({});
        return res.render('userPanel/work-three-columns',{
            catData : catData,
            subcatData : subcatData
        });
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}