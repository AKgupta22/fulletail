const mongoose = require("mongoose")

const MainCategorySchema= new mongoose.Schema({
    name:{
        type:String,
        unique:[true],
        required:[true,'Main category is required']
    }
})

const MainCategory= mongoose.model("MainCategory",MainCategorySchema)

module.exports= MainCategory