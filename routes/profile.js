const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile')
const upload = require("../middleware/multer");
const {ensureAuth, ensureGuest} = require('../middleware/auth')

// @desc    User Profile
// @route   get /userProfile
router.get("/", ensureAuth, profileController.getProfile);

// @desc    Create Profile
// @route   GET /createProfile
router.get("/addProfile", ensureAuth, profileController.getCreateProfile);

// @desc    Post Create Profile
// @route   POST /createProfile
router.post("/addProfile", ensureAuth, upload.single("avatar"), profileController.postCreateProfile);

module.exports = router