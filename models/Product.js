const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    maincategory: {
        type: String,
        required: [true, 'Product maincategory is required']
    },
    subcategory: {
        type: String,
        required: [true, 'Product subcategory is required']
    },
    brand: {
        type: String,
        required: [true, 'Product brand is required']
    },
    color: {
        type: String,
        required: [true, 'Product color is required']
    },
    size: {
        type: String,
        required: [true, 'Product size is required']
    },
    baseprice: {
        type: Number,
        required: [true, 'Product base price is required']
    },
    discount: {
        type: Number,
        default: 0
    },
    finalprice: {
        type: Number,
        required: [true, 'Product finalprice is required']
    },
    stock: {
        type: String,
        default: "Yes"
    },
    discription: {
        type: String,
        default: "Not available"
    },
    pic1: {
        type: String,
        default: ""
    },
    pic2: {
        type: String,
        default: ""
    },
    pic3: {
        type: String,
        default: ""
    },
    pic4: {
        type: String,
        default: ""
    }
})

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product