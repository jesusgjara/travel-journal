const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const passport = require('passport')
const mainRoutes = require("./routes/main")
const profileRoutes = require("./routes/profile")
const postsRoutes = require("./routes/posts")

// Use .env file
require('dotenv').config({ path: "./config/.env" })

const PORT = process.env.PORT

// Passport config
require("./config/passport")(passport)

connectDB()

// Using EJS for views
app.set("view engine", "ejs")

// Static Folder
app.use(express.static("public"))
app.use(express.static("dist"))


// Body Parsing

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Logging
app.use(logger("dev"))

// Use forms for put / delete
app.use(methodOverride("_method"))

// Setup Sessions - stored in MongoDB
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_STRING
    })
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Use flash messaes for errors, info, etc
app.use(flash())

// Setup Routes
app.use("/", mainRoutes)
app.use("/userProfile", profileRoutes)
app.use("/post", postsRoutes)

// Server
app.listen(PORT || process.env.PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})