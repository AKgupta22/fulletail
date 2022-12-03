const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required']
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required']
    },
    mobile: {
        type: Number,
        unique:true,
        required:[true,'Mobile number required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    address1: {
        type: String,
        default: ""
    },
    address2: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    pincode: {
        type: String,
        default: ""
    },
    profile: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "user"
    },
    tokens:[
        
    ],
    OTP:{
      type:Number,
      default:-1
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User