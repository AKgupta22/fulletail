const mongoose = require("mongoose")

const CheckoutSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required']
    },
    mode: {
        type: String,
        default: "COD"
    },
    paymentid: {
        type: String,
        default: "Cash"
    },
    status: {
        type: String,
        default: "Order placed"
    },
    paymentstatus: {
        type: String,
        default: "Pending"
    },
    checkouttotal: {
        type: Number,
        required: [true, 'checkout total is required']
    },
    shipping: {
        type: Number,
        required: [true, 'shipping charge is required']
    },
    final: {
        type: Number,
        required: [true, 'finalprice is required']
    },
    courier: {
        type: String,
        default: "Not Shipped Yet"
    },
    tracking: {
        type: String,
        default: "Not Shipped Yet"

    },
    OrderID: {
        type: Number,
        default: ""
    },
    products: [
        {
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
                required: [true, 'baseprice is required']
            },
            qty: {
                type: Number,
                default: 1
            },
            total: {
                type: String,
                required: [true, 'total is required']
            },
            pic1: {
                type: String,
                default: ""
            }
        }
    ],
    date: {
        type: String,
        default: new Date()
    }
})

const Checkout = mongoose.model("Checkout", CheckoutSchema)

module.exports = Checkout