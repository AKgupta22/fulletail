const verifytokenAdmin = require('../Tokens/VerifyTokenAdmin')
const Newsletters = require("../models/Newsletters")
module.exports = function (app) {
    //Post Api
    app.post("/newsletter", async (req, res) => {
        try {

            const Data = new Newsletters(req.body)
            await Data.save()
            res.send({ result: "Done", message: "Newsletter Subscribed!!Thanks" })
        }
        catch (error) {
            if (error.keyValue)
                res.status(400).send({ result: "Fail", message: "Email already subscribed" })
            else if (error.errors.name)
                res.status(400).send({ result: "Fail", message: error.errors.name.message })
            else if (error.errors.email)
                res.status(400).send({ result: "Fail", message: error.errors.email.message })

            else
                res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    //Get Api
    app.get("/newsletter", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await Newsletters.find()
            res.send({ result: "Done", data: Data })
        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    app.delete("/newsletter/:_id", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await Newsletters.findOne({ _id: req.params._id })
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