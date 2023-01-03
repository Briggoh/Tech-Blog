const {User, Post, Comment} = require("../models")
const router = require("express").Router()

// This returns the posts unique to the id
router.get("/", async (req, res) => {
    try{
        if(!req.session.logged_in){
            res.redirect("/login");
        }
        const dashDbData = await Post.findAll(
            {
                attributes: ["id", "user_id", "title", "content"],
                where: {
                    user_id: req.session.user_id
                }
            }
        )
        
        const userPosts = dashDbData.map(post => post.get({plain : true}));
        
        res.render("dashboard",{
            userPosts,
            logged_in: req.session.logged_in
        })
        
    } catch(err) {
        console.log(err)
        res.status(500).end()
    }
})
// This edits a post
router.get("/singlepost/:id", async (req, res) =>{
    try{
        const postDbData = await Post.findByPk(req.params.id, {
            attributes: ["id", "title", "content"]
        })
        const postData = postDbData.get({plain:true});
        console.log(postData)

        res.render("singlePost", {
            postData,
            logged_in: req.session.logged_in
        })
    }catch(err){
        res.status(500).json(err)
    }
})
// This post to the dashboard
router.post("/", async (req, res) => {
    
    const user_id = req.session.user_id;
    const {title, content} = req.body;

    try{
        const newPost = await Post.create({
            title,
            content, 
            user_id
        })

        res.status(200).json(newPost)
    }catch(err){
        res.status(400).json(err)
    }
})
// This update post after it has been made
router.put("/singlepost/:id", async (req, res) => {
    const {title , content} =  req.body;
    console.log(title, content);
    try{
        const updatedPost = await Post.update(
            {
                title,
                content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )  
        res.status(200).json(updatedPost);
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/:id", async (req, res) => {
    try{
        const deleteRequest = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(deleteRequest);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;