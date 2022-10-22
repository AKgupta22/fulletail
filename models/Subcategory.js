const mongoose = require("mongoose")

const SubCategorySchema= new mongoose.Schema({
    name:{
        type:String,
        unique:[true],
        required:[true,'Sub category is required']
    }
})

const SubCategory= mongoose.model("SubCategory",SubCategorySchema)

module.exports= SubCategory