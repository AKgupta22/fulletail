const mongoose = require("mongoose")

const WishlistSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required']
    },
    productid: {
        type: String,
        required: [true, 'productid is required']
    },
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    color: {
        type: String,
        required: [true, 'color is required']
    },
    size: {
        type: String,
        required: [true, 'size is required']
    },
    maincategory: {
        type: String,
        required: [true, 'maincategory is required']
    },
    subcategory: {
        type: String,
        required: [true, 'subcategory is required']
    },
    brand: {
        type: String,
        required: [true, 'brand is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    pic1: {
        type: String,
        default: ""
    }
})

const Wishlist = mongoose.model("Wishlist", WishlistSchema)

module.exports = Wishlist