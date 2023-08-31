const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const auth = require('../../middleware/auth');
const Post = require("../../model/posts")
const Profile = require("../../model/profile")
const User = require("../../model/user")

// post api/posts
// create a post
// private

router.post("/",[auth,
[check("text",'Text is required').not().isEmpty()]
],
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post({
        text:req.body.text,
        name: user.name,
        avatar: user.avater,
        user:req.user.id 
    });
    const post = await newPost.save();
    res.json(post);
        
    } catch (err) {
        console.log(err.message);
        return  res.status(500).send('Server Error')
        
    }

});




// GET api/posts
// GET all posts
// Private
router.get('/',auth,async (req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1});
        res.json(posts);
    } catch (err) {
        console.log(err.message);
        return   res.status(500).send('Server error')
    }
})


// GET api/posts
// GET all posts
// Private
router.get('/:id',auth,async (req,res)=>{
    try {
        const posts = await Post.findById(req.params.id);
        if(!posts){
            return res.status(404).json({msg:'No Posts Found'})
        }
        res.json(posts);
    } catch (err) {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg:'No Posts Found'})
        }
        console.log(err.message);
        return   res.status(500).send('Server error')
    }
})


// DELETE api/posts/id
// DELETE a posts
// Private
router.delete('/:id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        
        if(!post){
            return res.status(404).json({msg:'No Posts Found'})
        }
        // check user

        if(post.user.toString() !== req.user.id){
            return  res.status(403).json({msg:"User not authorized"})
        }

        await post.deleteOne();
        res.json({msg:`Post removed`})
    } catch (err) {
        console.log(err.message);
        return   res.status(500).send('Server error')
    }
})

// PUT api/like/:id
// LIke a posts
// Private

router.put('/like/:id',auth, async (req,res)=>{

    try {
        const post = await Post.findById(req.params.id);
        if(post.likes.filter(like=>like.user.toString() === req.user.id).length>0){
            return    res.status(400).json({msg:'You have already liked this post'});
        }
        post.likes.unshift({user:req.user.id});
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')

    }

})


router.put('/unlike/:id',auth, async (req,res)=>{

    try {
        const post = await Post.findById(req.params.id);
        if(post.likes.filter(like=>like.user.toString() === req.user.id).length === 0){
            return    res.status(400).json({msg:'post has not been liked'});
        }

        //get remove index
        const removeIndex=post.likes
        .map((like)=> like.user.toString())
        .indexOf(req.user.id.toString());
        post.likes.splice(removeIndex,1);
        await post.save(); 
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')

    }

})

 // comment api/posts/comment/:id
    // comment on a posts
    // Private

router.post('/comment/:id',[auth,
    [check("text",'Text is required').not().isEmpty()]
    ],
    async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }
    
        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id)
            const newComment = new Post({
            text:req.body.text,
            name: user.name,
            avatar: user.avater,
            user:req.user.id 
        });
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
            
        } catch (err) {
            console.log(err.message);
            return  res.status(500).send('Server Error')
            
        }
    
    });
    
    
    
    
    // Delete api/posts/comment/:id/:comment_id
    // delete comment 
    // Private
    
    router.delete('/comment/:id/:comment_id',auth,async (req,res)=> {
        try {
            const post=await Post.findById(req.params.id);
            const comment = post.comments.find(comment => comment.id === req.params.comment_id);

            if(!comment){
                return   res.status(401).json({msg:'comment does not exist'})
            }

            if(comment.user.toString() !== req.user.id){
                return    res.status(403).json({msg:"You can't remove this comment"})
            }
            const removeIndex=post.comments
            .map((comment)=> comment.user.toString())
            .indexOf(req.user.id.toString());
            post.comments.splice(removeIndex,1);
            await post.save(); 
            res.json(post.comments)
            
        } catch (err) {
            console.log(err.message);
            return   res.status(500).send('server error')
            
        }
    })


    


module.exports=router;