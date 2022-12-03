const mongoose = require("mongoose")

const NewslettersSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        unique:[true],
        required:[true,'email is required']
    }
})

const Newsletters= mongoose.model("Newsletters",NewslettersSchema)

module.exports= Newsletters