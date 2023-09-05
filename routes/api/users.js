 const express = require("express");
 const router = express.Router();
 const bcrypt = require("bcryptjs")
 const jwt = require("jsonwebtoken");
 const config = require("config");
 const Profile = require("../../model/profile")
 const { check, validationResult } = require('express-validator');

 const User = require("../../model/user");
const gravatar = require("gravatar");
const user = require("../../model/user");

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

 router.get("/", async (req,res)=>{
    try {
        const data = await user.find().select("-password");
        return   res.json(data);
        
       } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error: error.message });
                      }
    
 })

 router.get("/cover", async (req,res)=>{
  try {
      const data = await Profile.find().populate("user").select("-password");
      return   res.json(data);
      
     } catch (error) {
      res.status(500).json({ message: 'Error retrieving data', error: error.message });
                    }
  
})
router.get('/:user_id', async (req, res) => {
    const userId = req.params.user_id;

    try {
      const user = await User.findById(userId).select("-password");
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

 module.exports=router; 