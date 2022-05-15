//User Schema for the project
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 24,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please Enter A Valid Email"]
    },

    user_credentials_key: {
        type: String,
        select: false,
        required: true
    }

})

userSchema.pre('save', async function (next) {

    /* 
        For testing only <--> No use  
    */
    const nonce = 9;
    const hash = crypto.createHash('sha256');
    const verifier_key = hash.update(this.user_credentials_key + nonce).digest('hex');

    console.log(verifier_key);

    if (!this.isModified("user_credentials_key")) {
        next();
    }

})

userSchema.methods.checkIfUser = async function (prover_key) {

    /* 
    Generates a single digit Number to limit computation
    Can use Nonce for production grade 
    */
    // const nonce = Math.floor((Math.random()*10))
    const nonce = 9;
    
    //Generates a SHA256 based Verifier Key which will be used to check if user  
    const hash = crypto.createHash('sha256');
    const verifier_key = hash.update(this.user_credentials_key + nonce).digest('hex');

    console.log(verifier_key);

    //Comparing both the keys
    if (verifier_key === prover_key) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = mongoose.model("User", userSchema) 