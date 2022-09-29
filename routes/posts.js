const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


// @desc    Create Post
// @route   GET /createPost
router.get("/newPost", ensureAuth, postsController.getNewPost);

// @desc    Post Create Post
// @route   POST /createPost
router.post("/createPost", ensureAuth, upload.single("postImg"), postsController.createPost);

// router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

// Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

module.exports = router;