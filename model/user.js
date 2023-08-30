const mongoose = require("mongoose");

// Declare the Schema of the Mongo model

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    avater:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
});

//Export the model
module.exports = mongoose.model('user', userSchema);