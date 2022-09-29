const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
// const upload = require("../middleware/multer");
const {ensureAuth, ensureGuest} = require('../middleware/auth')

// @desc    Homepage
// @route   GET /
router.get("/", homeController.getIndex)

// @desc    Login
// @route   GET /login
router.get("/login", authController.getLogin);

// @desc    Login
// @route   POST /login
router.post("/login", authController.postLogin);

// @desc    Signup
// @route   GET /signup
router.get("/signup", authController.getSignup);

// @desc    Signup
// @route   POST /signup
router.post("/signup", authController.postSignup);

// // @desc    Create Profile
// // @route   GET /createProfile
// router.get("/createProfile", ensureAuth, authController.getCreateProfile);

// // @desc    Post Create Profile
// // @route   POST /createProfile
// router.post("/createProfile", ensureAuth, upload.single("avatar"), authController.postCreateProfile);

// @desc    Logout
// @route   get /logout
router.get("/logout", authController.logout);

// // @desc    User Profile
// // @route   get /userProfile
// router.get("/userProfile", ensureAuth, authController.getProfile);

module.exports = router