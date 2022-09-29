const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const {  formatDate } = require("../helpers/helper");

module.exports = {
//   getProfile: async (req, res) => {
//     try {
//       const posts = await Post.find({ user: req.user.id });
//       res.render("profile.ejs", { posts: posts, user: req.user });
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   getFeed: async (req, res) => {
//     try {
//       const posts = await Post.find().sort({ createdAt: "desc" }).lean();
//       res.render("feed.ejs", { posts: posts });
//     } catch (err) {
//       console.log(err);
//     }
//   },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      // const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: "desc" }).lean();
      res.render("post", { post: post, user: req.user, avatar: req.user.profile.avatar, formatDate: formatDate});
    } catch (err) {
      console.log(err);
    }
  },

  getNewPost: (req, res) => {
    res.render("newPost", {
        user: req.user,
        avatar: req.user.profile.avatar,
    });
  },

  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.titleInput,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        story: req.body.story,
        user: req.user.id,
        date: req.body.dateInput
      });
      console.log("Post has been added!");
      res.redirect("/userProfile");
    } catch (err) {
      console.log(err);
    }
  },
//   likePost: async (req, res) => {
//     try {
//       await Post.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $inc: { likes: 1 },
//         }
//       );
//       console.log("Likes +1");
//       res.redirect(`/post/${req.params.id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/userProfile");
    } catch (err) {
      res.redirect("/userProfile");
    }
  },
};
