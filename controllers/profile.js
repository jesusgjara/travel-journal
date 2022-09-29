const User = require("../models/User");
const Post = require("../models/Post")
const cloudinary = require("../middleware/cloudinary");
const { truncate, formatDate } = require("../helpers/helper");

exports.getProfile = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" }).lean();
    // console.log(posts);
    res.render("userProfile", {
      user: req.user,
      avatar: req.user.profile.avatar,
      posts: posts,
      truncate: truncate,
      formatDate: formatDate
    });
  } catch(err) {
    console.log(err);
  }  
};

exports.getCreateProfile = (req, res) => {
  res.render("/addProfile", {
    title: "Create Profile",
  });
};

exports.postCreateProfile = async (req, res, next) => {
  console.log(req.user._id);
  const user = await User.findOne({ _id: req.user._id });
  const avatarURL = await cloudinary.uploader.upload(req.file.path);
  try {
    user.profile = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatar: avatarURL.secure_url,
      cloudinaryId: avatarURL.public_id,
      bio: req.body.bio,
    };
    console.log(user, user.profile);
    user.save((err) => {
      if (err) {
        console.error(err);
        res.redirect("/signup");
      }
      res.redirect("/userProfile");
    });
  } catch (err) {
    console.error(err);
    res.redirect("/addProfile");
  }
};
