const verifytokenAdmin = require('../Tokens/VerifyTokenAdmin')
const verifytoken = require('../Tokens/VerifyToken')
const Cart= require('../models/Cart')
module.exports = function (app) {
    //Post Api
    app.post("/cart", verifytoken, async (req, res) => {
        try {

            const Data = new Cart(req.body)
            await Data.save()
            res.send({ result: "Done", message: "Cart created" })
        }
        catch (error) {
            if (error.errors.name)
                res.status(400).send({ result: "Fail", message: error.errors.name.message })
            else if (error.errors.userid)
                res.status(400).send({ result: "Fail", message: error.errors.userid.message })
            else if (error.errors.productid)
                res.status(400).send({ result: "Fail", message: error.errors.productid.message })
            else if (error.errors.color)
                res.status(400).send({ result: "Fail", message: error.errors.color.message })
            else if (error.errors.size)
                res.status(400).send({ result: "Fail", message: error.errors.size.message })
            else if (error.errors.maincategory)
                res.status(400).send({ result: "Fail", message: error.errors.maincategory.message })
            else if (error.errors.subcategory)
                res.status(400).send({ result: "Fail", message: error.errors.subcategory.message })
            else if (error.errors.brand)
                res.status(400).send({ result: "Fail", message: error.errors.brand.message })
            else if (error.errors.price)
                res.status(400).send({ result: "Fail", message: error.errors.price.message })
            else if (error.errors.total)
                res.status(400).send({ result: "Fail", message: error.errors.total.message })
            else
                res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    //Get Api
    app.get("/cartAll/:username", verifytoken, async (req, res) => {
        try {

            const Data = await Cart.find({ username: req.params.username })
            res.send({ result: "Done", data: Data })
        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })
    //Particular FETCH
    app.get("/cart/:_id", verifytoken, async (req, res) => {
        try {

            const Data = await Cart.findOne({ _id: req.params._id })
            if (Data)
                res.send({ result: "Done", data: Data })
            else
                res.status(404).send({ result: "Fail", message: "Invalid id" })
        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    //Put for update
    app.put("/cart/:_id", verifytoken, async (req, res) => {
        try {

            const Data = await Cart.findOne({ _id: req.params._id })
            if (Data) {
                Data.qty = req.body.qty ?? Data.qty
                Data.total = req.body.total ?? Data.total

                Data.save()
                res.send({ result: "Done", message: "Updated" })

            }
            else
                res.status(404).send({ result: "Fail", message: "Invalid id" })
        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    //Delete
    app.delete("/cartAll/:username", verifytoken, async (req, res) => {
        try {

            const Data = await Cart.deleteMany({ username: req.params.username })
            res.send({ result: "Done", message: "Cart is Deleted" })

        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    app.delete("/cart/:_id", verifytoken, async (req, res) => {
        try {

            const Data = await Cart.findOne({ _id: req.params._id })
            if (Data) {
                Data.delete()
                res.send({ result: "Done", message: "Deleted" })
            }
            else
                res.status(404).send({ result: "Fail", message: "Invalid id" })
        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

}