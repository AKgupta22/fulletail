const Contact = require("../models/Contact")
const verifytokenAdmin = require('../Tokens/VerifyTokenAdmin')
module.exports = function (app) {
    //Post Api
    app.post("/contact", async (req, res) => {
        try {

            const Data = new Contact(req.body)
            await Data.save()
            res.send({ result: "Done", message: "Thanks for contacting us" })
        }
        catch (error) {
            if (error.errors.name)
                res.status(400).send({ result: "Fail", message: error.errors.name.message })
            else if (error.errors.email)
                res.status(400).send({ result: "Fail", message: error.errors.email.message })
            else if (error.errors.mobile)
                res.status(400).send({ result: "Fail", message: error.errors.mobile.message })
            else if (error.errors.message)
                res.status(400).send({ result: "Fail", message: error.errors.message.message })
            else
                res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    //Get Api
    app.get("/contact", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await Contact.find()
            res.send({ result: "Done", data: Data })
        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    app.get("/contact/:_id", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await Contact.findOne({ _id: req.params._id })
            if (Data) {
                res.send({ result: "Done", data: Data })
            }
            else
                res.status(404).send({ result: "Fail", message: "Internal server error" })

        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    //Put for update
    app.put("/contact/:_id", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await Contact.findOne({ _id: req.params._id })
            if (Data) {
                Data.status = req.body.status ? req.body.status : Data.status
                Data.reply = req.body.reply ? req.body.reply : Data.reply
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


    //delete api
    app.delete("/contact/:_id", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await Contact.findOne({ _id: req.params._id })
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