const express = require("express");
const router = express.Router();
const Auth = require("../../middleware/auth")
const User = require("../../model/user")
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt= require("bcryptjs")
const { check, validationResult } = require('express-validator');

router.get("/",Auth, async (req,res)=>{
    try {
        const user= await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
}
);
router.post("/",[
    check("email" ,"please include valid email").isEmail(),
    check("password","password required").exists()
 ],
 async (req,res)=>{
   const errors= validationResult(req);


    if(!errors.isEmpty()){ 
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password} = req.body;

    try{
        let user = await User.findOne({email});
        
         // see if the user exist
         if(!user) {
            return res.status(400).json({message:"Invalid Credentials"})
         }
           // get users gravator
    

         const isMatch = await bcrypt.compare(password,user.password)

         if(!isMatch) {
            return res.status(400).json({message:"Invalid password  Credentials"})
         }
           // get users gravator
    
    const payload = {
        user:{
            id: user.id
        }
    }
    jwt.sign(
        payload,
        config.get("jwtSecret"),
        {expiresIn:360000 },
        (err,token)=>{
            if(err) throw err;
            res.json({ token })

         });
    } 
    catch(err){
        console.log(err.message);
        res.status(500).send("server error")
    }
});


module.exports=router;