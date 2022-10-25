const mongoose = require("mongoose")

const OrderCounterSchema = new mongoose.Schema({
    id: {
        type: String,
        default: "autoid"
    },
    count: {
        type: Number,
    }
})

const OrderCounter = mongoose.model("OrderCounter", OrderCounterSchema)
module.exports = OrderCounter