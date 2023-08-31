const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    text:{
        type:String,
      
    },
    name:{
        type:String,
    },
    avatar:{
        type:String,
    },
    likes:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:"users"
            },
        }
    ],
    comments:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name:{
                type:String,
            },
            avatar:{
                type:String,
            },
            date:{
                type : Date , 
                default :Date.now()
            }
        }
    ],
    date:{
        type : Date , 
        default :Date.now()
    }
});

//Export the model
module.exports = mongoose.model('post', postSchema);