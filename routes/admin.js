const express = require('express');

const routs = express.Router();

const passport = require('passport');

const adminCtl = require('../controllers/AdminController');

const Admin = require('../models/AdminModel');


routs.get("/", adminCtl.login);

routs.post("/checkLogin",passport.authenticate('local',{failureRedirect :"/admin/"}),adminCtl.checkLogin);

routs.get("/logout", async(req,res)=>{
    // res.clearCookie('admin');
    // return res.redirect('/admin')

    req.session.destroy(function(err){
        if(err){
            console.log(err);
            req.flash("error","something wrong");
            return res.redirect('back');
        }
        else{
            return res.redirect('/admin');
        }
    })
})

routs.get('/profile',passport.checkAuth,adminCtl.profile);

routs.get("/changePassword",passport.checkAuth,adminCtl.changePassword);

routs.post("/EditPassword", passport.checkAuth,adminCtl.EditPassword);

routs.get('/dashboard',passport.checkAuth ,adminCtl.dashboard);

routs.get("/add_admin",passport.checkAuth,adminCtl.addAdmin);

routs.get('/view_admin', passport.checkAuth,adminCtl.viewAdmin);

routs.post("/insertAdminData",Admin.uploadImage, adminCtl.insertAdminData);

routs.get("/deleteAdmin/:id", adminCtl.deleteAdmin);

routs.get("/updateAdmin", passport.checkAuth,adminCtl.updateAdmin);

routs.post("/EditAdminData/:id", Admin.uploadImage, adminCtl.EditAdminData);

/// forget password
routs.get("/fogetPass", adminCtl.forgetPass);

routs.post("/verifyEmail", adminCtl.verifyEmail);

routs.get("/otpPage", adminCtl.otpPage);

routs.post("/verifyOtp", adminCtl.verifyOtp);

routs.get("/resetPass", adminCtl.resetPass);

routs.post("/resetAdminPass", adminCtl.resetAdminPass);

routs.get("/deactive/:id", passport.checkAuth, adminCtl.deactive);
routs.get("/active/:id", passport.checkAuth, adminCtl.active);
routs.use('/slider',passport.checkAuth,require('./slider'));

routs.use("/posts", passport.checkAuth, require('./post'));
routs.use("/comments", passport.checkAuth, require('./comment'));
routs.use("/category", passport.checkAuth, require('./category'));
routs.use("/subcategory", passport.checkAuth, require('./subcategory'));

routs.post("/deleteAdminData", passport.checkAuth, adminCtl.deleteAdminData);

///end forget password
module.exports = routs;