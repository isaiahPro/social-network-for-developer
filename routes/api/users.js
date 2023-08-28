 const express = require("express");
 const router = express.Router();
 const bcrypt = require("bcryptjs")
 const jwt = require("jsonwebtoken");
 const config = require("config");
 const { check, validationResult } = require('express-validator');

 const User = require("../../model/user");
const gravatar = require("gravatar");

 router.post("/",[
    check("name","Name is required").not().isEmpty(),
    check("email" ,"please include valid email").isEmail(),
    check("password","please enter a password 6 or more character ").isLength({min:6})
 ],
 async (req,res)=>{
   const errors= validationResult(req);


    if(!errors.isEmpty()){ 
        return res.status(400).json({errors:errors.array()})
    }

    const {name,email,password} = req.body;

    try{
        let user = await User.findOne({email});
        
         // see if the user exist
         if(user) {
            return res.status(423).json({message:"User already exist please login instead"})
         }
           // get users gravator
         const avater = gravatar.url(
            email,{
                s: '200', r: 'pg',d:'mm'
            }
         )
         user = new User({
            name, 
            email,
            avater,
            password,

         })
           // bycript password
         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(password,salt);
         await user.save();


    // Return jsonwebtoken 
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
}



  
    );
  
 module.exports=router; 