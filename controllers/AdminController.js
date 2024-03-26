const Admin = require('../models/AdminModel');

const path = require('path');

const fs = require('fs');

const nodemailer = require('nodemailer');

module.exports.login = async (req,res) =>{
   
    return res.render('login');
}

module.exports.checkLogin = async (req,res) =>{
    try{
        req.flash('success',"Login Successfully");
        return res.redirect('/admin/dashboard');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.dashboard = async (req,res) =>{
    
    return res.render('dashboard');
}

module.exports.addAdmin = async (req,res) =>{
   
    return res.render('add_admin');
}

module.exports.viewAdmin = async (req,res) =>{
    try{
       
         var search = '';
         if(req.query.search){
            search = req.query.search;
         }

        var page=0;
        var per_page=3;
        if(req.query.page){
            page=req.query.page
        }

        let adminData = await Admin.find({
            $or :[
                {name : { $regex : search,$options : "i"}},
                {email : { $regex : search,$options : "i"}},
                {gender : { $regex : search,$options : "i"}},
            ]
        })
        .skip(per_page*page)
        .limit(per_page);

        let totalRecord = await Admin.find({
            $or :[
                {name : { $regex : search,$options : "i"}},
                {email : { $regex : search,$options : "i"}},
                {gender : { $regex : search,$options : "i"}},
            ]
        }).countDocuments();
        let totalPage = Math.ceil(totalRecord/per_page);

        if(adminData){
            return res.render('view_admin',{
                adminRecord : adminData,
                search : search,
                totalPage : totalPage,
                currentPage : page
            });
        }
        else{
            console.log("Record not found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.insertAdminData = async (req,res) =>{
    try{
        var img = '';
        if(req.file){
            img = Admin.iPath+"/"+req.file.filename;
        }
        req.body.name = req.body.fname+" "+req.body.lname;
        req.body.image = img;
        req.body.status = true;
        let adminData = await Admin.create(req.body);
        if(adminData){
            // console.log("Admin Record insereted");
            req.flash('success',"Admin Record inserted successfully");
            return res.redirect('back');
        }
        else{
            console.log("Something wrong");
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


module.exports.deleteAdmin = async (req,res) =>{
   try{
      let single  = await Admin.findById(req.params.id);
      if(single){   
           var imPath = path.join(__dirname,'..',single.image);
           await fs.unlinkSync(imPath);

           let deleteAdmin = await Admin.findByIdAndDelete(req.params.id);
           if(deleteAdmin){
                console.log("Record Deleted");
                req.flash('success',"Record Deleted");
                return res.redirect('back');
           }
           else{
            console.log("Record Not Deleted");
            return res.redirect('back');
           }
      }
      else{
        console.log("Record not found");
        return res.redirect('back')
      }
   }
   catch(err){
        console.log("Something wrong");
        return res.redirect('back')
   }
}

module.exports.profile = async (req,res) =>{
    return res.render('profile');
}

module.exports.changePassword = async (req,res) =>{
    return res.render('changePassword');
}

module.exports.EditPassword = async (req,res) =>{
    try{
        if(req.body.cpass == req.user.password){
            if(req.body.cpass != req.body.npass){
                if(req.body.npass == req.body.copass){
                    let chpass = await Admin.findByIdAndUpdate(req.user.id,{
                        password : req.body.npass
                    })
                    if(chpass){
                        return res.redirect('/admin/logout');

                    }
                    else{
                        return res.redirect('back');
                    }
                }
                else{
                    req.flash('error',"New and confirm password not match");
                    return res.redirect('back');
                }
            }
            else{
                req.flash('error',"Current and new password match");
                return res.redirect('back');
            }
        }
        else{
            req.flash('error',"Db password not match");
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error',"Something wrong");
        return res.redirect('back');
    }
}

module.exports.updateAdmin = async (req,res) =>{
    try{
        let single = await Admin.findById(req.query.id);
        if(single){
            return res.render('update_admin',{
                singleAdmin : single
            })
        }
        else{
            console.log("Record not found")
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Something wrong");
        return res.redirect('back')
   }
}

module.exports.EditAdminData = async (req,res) =>{
    try{
        if(req.file){
            let single = await Admin.findById(req.params.id);
            if(single){
                var imPath = path.join(__dirname,'..',single.image);
                await fs.unlinkSync(imPath);

                req.body.image = Admin.iPath+"/"+req.file.filename;
                req.body.name = req.body.fname+" "+req.body.lname;
                let adminE = await Admin.findByIdAndUpdate(req.params.id,req.body);
                if(adminE){
                    console.log("Record updated successfully");
                    return res.redirect('/admin/view_admin')
                }
                else{
                    console.log("Record Not updated successfully");
                    return res.redirect('back')
                }
            }
            else{
                console.log("Record not found");
                return res.redirect('back')
            }
        }
        else{
            let single = await Admin.findById(req.params.id);
            if(single){
                req.body.image = single.image;
                req.body.name = req.body.fname+" "+req.body.lname;
                let adminE = await Admin.findByIdAndUpdate(req.params.id,req.body);
                if(adminE){
                    console.log("Record updated successfully");
                    return res.redirect('/admin/view_admin')
                }
                else{
                    console.log("Record Not updated successfully");
                    return res.redirect('back')
                }
            }   
            else{
                console.log("Record not found");
                return res.redirect('back')
            }
        }
    }
    catch(err){
        console.log("Something wrong");
        return res.redirect('back')
    }
}


//code for forget password
module.exports.forgetPass = async (req,res) =>{
    return res.render('forgetPass');
}


module.exports.verifyEmail = async(req,res) =>{
    try{
        let checkEmail = await Admin.findOne({email : req.body.email});
        if(checkEmail){
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                  user: "rwn2developerfaculty@gmail.com",
                  pass: "opacdlglqnrusmpr",
                },
              });

              var Otp = Math.round(Math.random()*100000);
              res.cookie('otp',Otp);
              res.cookie('email',req.body.email);
              var msg  = `<b>Hello, Your OTP is here: ${Otp}</b>`;

              const info = await transporter.sendMail({
                from: 'rwn2developerfaculty@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Batch5 Forgot Password ✔", // Subject line
                text: "Hello world?", // plain text body
                html: msg, // html body
              });

              return res.redirect('/admin/otpPage');
              
        }
        else{
            console.log("invalid email");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Something wrong");
        return res.redirect('back')
    }
}

module.exports.otpPage = async (req,res) =>{
    try{
        return res.render('otp_page');
    }
    catch(err){
        console.log("err");
        return res.redirect('back');
    }
}

module.exports.verifyOtp = async (req,res) =>{
    try{
        let otp = req.cookies.otp;
        if(otp == req.body.otp){
            return res.redirect('/admin/resetPass');
        }
        else{
            console.log("Invalid OTP");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("err");
        return res.redirect('back');
    }
}

module.exports.resetPass = async (req,res)=>{
    try{
        return res.render('resetPass');
    }
    catch(err){
        console.log("err");
        return res.redirect('back');
    }
}


module.exports.resetAdminPass = async (req,res) =>{
    try{
     
        if(req.body.npass==req.body.cpass){
            let checkEmail = await Admin.findOne({email:req.cookies.email});
            if(checkEmail){
                let changePass = await Admin.findByIdAndUpdate(checkEmail.id,{
                    password : req.body.npass
                });
                res.clearCookie('otp');
                res.clearCookie('email');
                return res.redirect('/admin/');
            }
            else{
                console.log("Invalid email");
                return res.redirect('back');
            }
        }
        else{
            console.log("password not match");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("err");
        return res.redirect('back');
    }
}
//end of code forget password

module.exports.deactive = async (req,res) =>{
    try{
        console.log(req.params.id);
        let deactiveData = await Admin.findByIdAndUpdate(req.params.id,{status:false});
        if(deactiveData){
            req.flash("success","Record Deactive Successfully");
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
        let deactiveData = await Admin.findByIdAndUpdate(req.params.id,{status:true});
        if(deactiveData){
            req.flash("success","Record Active Successfully");
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

module.exports.deleteAdminData = async (req,res) =>{
    try{
        console.log(req.body);
        let adminDelete = await Admin.deleteMany({_id:{$in :req.body.adminIds}});
        if(adminDelete){
            req.flash("success","Delete Record success");
            return res.redirect('back');
        }
        else{
            req.flash("error","Something wrong");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
    }
}