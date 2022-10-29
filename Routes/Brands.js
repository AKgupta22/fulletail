const verifytokenAdmin = require('../Tokens/VerifyTokenAdmin')
const Brands = require("../models/Brands")
module.exports = function (app) {

    //Post Api
    app.post("/brand", verifytokenAdmin, async (req, res) => {
        try {

            const Data = new Brands(req.body)

            await Data.save()
            res.send({ result: "Done", message: "Brand created" })
        }
        catch (error) {
            if (error.keyValue)
                res.status(400).send({ result: "Fail", message: "Brand already exist" })
            else if (error.errors.name)
                res.status(400).send({ result: "Fail", message: error.errors.name.message })

            else
                res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    //Get Api
    app.get("/brand", async (req, res) => {
        try {

            const Data = await Brands.find()
            res.send({ result: "Done", data: Data })
        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })
    //Particular FETCH
    app.get("/brand/:_id", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await Brands.findOne({ _id: req.params._id })
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
    app.put("/brand/:_id", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await Brands.findOne({ _id: req.params._id })
            if (Data) {
                if (req.body.name) {
                    Data.name = req.body.name

                }
                else {
                    Data.name = Data.name

                }
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
    app.delete("/brand/:_id", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await Brands.findOne({ _id: req.params._id })
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