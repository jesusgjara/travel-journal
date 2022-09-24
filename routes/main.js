const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

// @desc    Homepage
// @route   GET /
router.get("/", homeController.getIndex)

// @desc    Login
// @route   GET /login
router.get("/login", authController.getLogin);

// @desc    Signup
// @route   GET /signup
router.get("/signup", authController.getSignup);

module.exports = router