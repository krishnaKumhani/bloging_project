const SliderModel = require('../models/SliderModel');

module.exports.add_slider = async (req,res) =>{
    return res.render('add_slider');
}


module.exports.insertSliderData = async (req,res) =>{
    console.log(req.file);
    console.log(req.body);
    try{
        var img = '';
        if(req.file){
            img = SliderModel.iPath+"/"+req.file.filename; 
        }
        req.body.SliderImage = img;
        req.body.status = true

        let sliderData = await SliderModel.create(req.body);
        if(sliderData){
            req.flash('success','Slider Record inserted successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error','Record not inserted');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        req.flash('error',"something wrong");
        return res.redirect('back');
    }
}

module.exports.view_slider =async (req,res) =>{
    let sliderdata = await SliderModel.find();
    return res.render('view_slider',{
        sliderdata
    })
}

module.exports.deactive = async (req,res) =>{
    try{
        console.log(req.params.id);
        let deactiveSlider = await SliderModel.findByIdAndUpdate(req.params.id,{status:false});
        if(deactiveSlider){
            req.flash("Slider Data Deactive");
            return res.redirect('back');
        }
        else{

            return res.redirect('back');
        }
    }
    catch(err){
        return res.redirect('back');
    }
}

module.exports.active = async (req,res) =>{
    try{
        console.log(req.params.id);
        let deactiveSlider = await SliderModel.findByIdAndUpdate(req.params.id,{status:true});
        if(deactiveSlider){
            req.flash("Slider Data Active");
            return res.redirect('back');
        }
        else{

            return res.redirect('back');
        }
    }
    catch(err){
        return res.redirect('back');
    }
}