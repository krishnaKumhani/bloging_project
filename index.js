
const exp = require('constants');
const express = require('express');

const port = 8001;

const app = express();
const path = require('path');

const mongoose = require('mongoose')
console.log("hi");

mongoose.connect("mongodb+srv://dharmikchhodvdiya1:o317baOSOsbzkUAC@cluster0.t74c9ci.mongodb.net/myblogbatch5",
    { useNewUrlParser: true }
).then(res=>{
    console.log("Db is connected with atlas");
})
.catch(err=>{
    console.log(err);
})
// const db = require('./config/mongoose');


const cp = require('cookie-parser');

const passport = require('passport')
const passportLocal = require('./config/passportLocal');
const session = require('express-session');

const customFlash = require('connect-flash');
const flashMessage = require('./config/connectFlash');
app.use(customFlash());

app.use(express.urlencoded());
app.use(cp());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'user_assets')));
app.use("/uploads",express.static(path.join(__dirname,'uploads')));

app.use(session({
    name :"Batch5",
    secret : "RNW",
    resave : true,
    saveUninitialized : true,
    cookie : {
        maxAge :  36000*1000
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuth);
app.use(flashMessage.setFlash);

app.use("/", require('./routes'));

app.listen(port, (err)=>{
    err?console.log(err):console.log("Server is running on port:",port);
})