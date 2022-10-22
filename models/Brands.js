const mongoose = require("mongoose")

const BrandsSchema= new mongoose.Schema({
    name:{
        type:String,
        unique:[true],
        required:[true,'Brand is required']
    }
})

const Brands= mongoose.model("Brands",BrandsSchema)

module.exports= Brands