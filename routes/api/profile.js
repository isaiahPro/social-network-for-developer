const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../model/profile");
const User = require("../../model/user");
const { check, validationResult } = require('express-validator');

// @route GET api/profile/me
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", [
  auth,
  [
    check("status", "Status is required").not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    skills,
    githubusername,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }

  // Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({user : req.params.user_id}).populate('user', ['name', 'avatar']);
    if(!profile){
      return res.status(400).json({msg:'Profile not found'});
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId'){
      return res.status(400).json({msg:'Profile not found'});

    }
    res.status(500).send("Server Error");
  }
});
//Delete api/profile
//delete profile,user & posts
// private

router.delete('/',auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({user: req.user.id});
    await User.findOneAndRemove({_id: req.user.id});
    
    res.json({msg: "User deleted"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  } 
}); 
//Delete api/profile/experience
//Add profile experiance
// private

router.put('/experience',[auth,[
  check('title',"title is required").not().isEmpty(),
  check('company',"company is required").not().isEmpty(),
  check('from',"from date is required").not().isEmpty(),
]
], async (req,res)=>{

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array() })
  }
  const {
    title,
    company,
    location,
    current,
    description, 
    from, 
    to
  } = req.body;
  
    const newExp = {
      title,
      company,
      location,
      current,
      description,
      from ,
      to
    }
    try {
      let profile = await Profile.findOne({ user: req.user.id });
    
      if (!profile) {
        return res.status(400).json({ msg: 'Profile not found' });
      }
    
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
})

//Delete api/profile/experience/:exp_id
//delete experiance from profile
// private
router.delete('/experience/:exp_id',auth,async(req,res)=>{
  try {
    const profile = await Profile.findOne({user:req.user.id});

    //Get remove index
    const removeIndex = await profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex,1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
      res.status(500).send('Server error');
    
  }
})
//Delete api/profile/experience
//Add profile experiance
// private

router.put('/education',[auth,[
  check('school',"school is required").not().isEmpty(),
  check('degree',"degree is required").not().isEmpty(),
  check('fieldofstudy',"fieldofstudy is required").not().isEmpty(),
  check('from','from date is required').not().isEmpty()
]
], async (req,res)=>{

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array() })
  }
  const {
    school,
    degree,
    fieldofstudy ,
    current,
    title,
    description, 
    from, 
    to
  } = req.body;
  
    const newEdu = {
      school,
      degree,
      fieldofstudy ,
      current,
      title,
      description, 
      from, 
      to
    }
    try {
      let profile = await Profile.findOne({ user: req.user.id });
    
      if (!profile) {
        return res.status(400).json({ msg: 'Profile not found' });
      }
    
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
})
router.delete('/education/:edu_id',auth,async(req,res)=>{
  try {
    const profile = await Profile.findOne({user:req.user.id});

    //Get remove index
    const removeIndex = await profile.education.map(item=>item.id).indexOf(req.params.edu_id);
    profile.education.splice(removeIndex,1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
      res.status(500).send('Server error');
    
  }
})
module.exports = router;