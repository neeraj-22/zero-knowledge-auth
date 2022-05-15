//Module imports
const User = require("../models/userModel.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const jwt = require("jsonwebtoken");
const crypto=require("crypto");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  //destructring values fetched from body
  const { name, email, user_credentials_key } = req.body;

  //Registering user in DB
  const user = await User.create({
    name,
    email,
    user_credentials_key
  });

  const userDetails = {
    profileDetails:{
      "id" : user._id,
      "name" : user.name,
      "email" : user.email
    }
  }

  await res.status(200).json({
    success:true,
    userDetails
  })

});

//login user
exports.signinUser = catchAsyncErrors(async (req, res, next) => {
  
  // ******TAKE INPUT FROM BODY ********
  const { email, prover_key } = req.body;

  if (!email || !prover_key) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  //Searching for email && Credential Key in DB
  const user = await User.findOne({ email }).select("+user_credentials_key");

  if (!user) {
    return next(new ErrorHandler("Invalid Email/Password Combination", 400));
  }


  // ******Genrating Mathematical Problems ********
  const user_credentials_key = await user.user_credentials_key;
  
  /* 
    Generates a single digit Number to limit computation
    Can use Nonce for production grade 
  */
  // const nonce = Math.floor((Math.random()*10))
  // const nonce = 9;

  // let verifier_key_to_be_hashed = user_credentials_key + nonce;

  // const hash = await crypto.createHash('sha256');
  // const verifier_key = await hash.update(verifier_key_to_be_hashed).digest('hex');

  let verifier_key = user_credentials_key;

  let doKeysMatch = false;

  if(verifier_key === prover_key){
    doKeysMatch = true;
  }

  if (doKeysMatch === false) {
    return next(new ErrorHandler(`Invalid Email/Password Combination`, 400));
  }

  const userDetails = {
    profileDetails:{
      "id" : user._id,
      "name" : user.name,
      "email" : user.email
    }
  }

  res.status(200).json({
    success:true,
    userDetails
  })

});

//Logout Feature
exports.signout = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  //Making token(cookie) value null on logout
  res.cookie("token", null, {
    expires: new Date(Date.now),
    httpOnly: true,
  });

  await req.user.save();

  res.status(200).json({
    success: true,
    message: "You have successfully logged out!",
  });
});