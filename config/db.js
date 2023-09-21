const mongoose = require("mongoose");
const dbHost = process.env.DB_HOST;

const connectDB=async()=>{
    try {
        await mongoose.connect(dbHost,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
    
        });
        console.log("mongodb connect success")
    }catch(err){
        console.error(`Error connecting to mongodb: ${err.message}`);
        process.exit(1);

    }
}
module.exports = connectDB; 