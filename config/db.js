const mongoose = require("mongoose");

const config = require("config");
const db = config.get("mongoURL");
// Connect to MongoDB

const connectDB=async()=>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log("mongodb connect success")
    }catch(err){
        console.error(`Error connecting to mongodb: ${err.message}`);
        process.exit(1);

    }
}
module.exports = connectDB; 