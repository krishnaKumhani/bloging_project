const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/blogbatch5');

const db = mongoose.connection;

db.once('open', async(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Db is connected");
})

module.exports = db;