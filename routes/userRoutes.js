//User routes -- through which frontend will interact with backend
const express = require("express");
const { registerUser, signout, signinUser } = require("../controllers/userController.js");
// const {testUserRoute, sendRandomValue} = require("../controllers/testUserRouteController")
// const {isSignedIn} = require("../middlewares/isSignedIn")

const router = express.Router();

//Auth routes
router.post('/signup', registerUser) //for signing up
router.post('/login', signinUser) //for signing in
router.get('/signout', signout) //for signing out

module.exports = router