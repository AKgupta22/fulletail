const Wishlist = require("../models/Wishlist")
const verifytoken = require('../Tokens/VerifyToken')
module.exports = function (app) {
    //Post Api
    app.post("/wishlist", verifytoken, async (req, res) => {
        try {

            const Data = new Wishlist(req.body)
            await Data.save()
            res.send({ result: "Done", message: "Wishlist created" })
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
            else
                res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    //Get Api
    app.get("/wishlistAll/:username", verifytoken, async (req, res) => {
        try {

            const Data = await Wishlist.find({ username: req.params.username })
            res.send({ result: "Done", data: Data })
        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })
    //Particular FETCH
    app.get("/wishlist/:_id", verifytoken, async (req, res) => {
        try {

            const Data = await Wishlist.findOne({ _id: req.params._id })
            if (Data)
                res.send({ result: "Done", data: Data })
            else
                res.status(404).send({ result: "Fail", message: "Invalid id" })
        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    //Delete
    app.delete("/wishlistAll/:username", async (req, res) => {
        try {

            const Data = await Wishlist.deleteMany({ username: req.params.username })
            res.send({ result: "Done", message: "Wishlist is Deleted" })

        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    app.delete("/wishlist/:_id", verifytoken, async (req, res) => {
        try {

            const Data = await Wishlist.findOne({ _id: req.params._id })
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