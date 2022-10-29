const verifytokenAdmin = require('../Tokens/VerifyTokenAdmin')
const verifytoken = require('../Tokens/VerifyToken')
const Checkout = require("../models/Checkout")
const OrderCounter = require("../models/OrderCounter")

module.exports = function (app) {
    //Post Api
    app.post("/checkout", verifytoken, async (req, res) => {
        try {
            let SeqId
            const Seq = await OrderCounter.findOne({ id: "autoid" })
            if (Seq === null) {
                const newvalue = new OrderCounter()
                newvalue.count = 4781500071
                SeqId = 4781500071
                await newvalue.save()
            }
            else {
                Seq.count = Seq.count + 1
                await Seq.save()
                SeqId = Seq.count

            }
            const Data = new Checkout(req.body)
            Data.OrderID = SeqId
            await Data.save()
            res.send({ result: "Done", message: "Checkout created", data: Data })
        }
        catch (error) {
            console.log(error);
            if (error.errors.username)
                res.status(400).send({ result: "Fail", message: error.errors.username.message })
            else if (error.errors.checkouttotal)
                res.status(400).send({ result: "Fail", message: error.errors.checkouttotal.message })
            else if (error.errors.shipping)
                res.status(400).send({ result: "Fail", message: error.errors.shipping.message })
            else if (error.errors.final)
                res.status(400).send({ result: "Fail", message: error.errors.final.message })
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
    app.get("/checkout", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await Checkout.find()
            res.send({ result: "Done", data: Data })
        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })
    //Particular FETCH user
    app.get("/checkoutuser/:username", verifytoken, async (req, res) => {
        try {

            const Data = await Checkout.find({ username: req.params.username })
            if (Data)
                res.send({ result: "Done", data: Data })
            else
                res.status(404).send({ result: "Fail", message: "Invalid id" })
        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    //Particular FETCH
    app.get("/checkout/:_id", verifytoken, async (req, res) => {
        try {

            const Data = await Checkout.findOne({ _id: req.params._id })
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
    app.put("/checkout/:_id", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await Checkout.findOne({ _id: req.params._id })
            if (Data) {
                Data.mode = req.body.mode ? req.body.mode : Data.mode
                Data.status = req.body.status ? req.body.status : Data.status
                Data.paymentstatus = req.body.paymentstatus ? req.body.paymentstatus : Data.paymentstatus
                Data.paymentid = req.body.paymentid ? req.body.paymentid : Data.paymentid
                Data.courier = req.body.courier ? req.body.courier : Data.courier
                Data.tracking = req.body.tracking ? req.body.tracking : Data.tracking
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
    app.delete("/checkout/:_id", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await Checkout.findOne({ _id: req.params._id })
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