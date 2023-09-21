const express = require("express");
const connectDB=require('./config/db');
const app = express();
const PORT = process.env.PORT||5000;
const cors = require('cors');
require('dotenv').config();
app.use(cors());
connectDB();

app.use(express.json({extended:false }));
app.get("/", (req, res) => {res.send("Api Running");})

 
app.use("/api/users",require("./routes/api/users"));
app.use("/api/posts",require("./routes/api/posts"));
app.use("/api/profile",require("./routes/api/profile"));
app.use("/api/auth",require("./routes/api/auth"));

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
});