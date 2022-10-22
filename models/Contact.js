const mongoose = require("mongoose")

const ContactSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    mobile:{
        type:String,
        required:[true,'mobile no is required']
    },
    subject:{
        type:String,
        default:"Query"
    },
    message:{
        type:String,
        required:[true,'message is required']
    },
    status:{
        type:String,
        default:"Received"
    },
    reply:{
        type:String,
        default:""
    }

})

const Contact= mongoose.model("Contact",ContactSchema)

module.exports= Contact