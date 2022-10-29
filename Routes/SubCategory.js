const verifytokenAdmin = require('../Tokens/VerifyTokenAdmin')
const SubCategory = require("../models/Subcategory")
module.exports = function (app) {
    //Post Api
    app.post("/subcategory", verifytokenAdmin, async (req, res) => {
        try {

            const Data = new SubCategory(req.body)
            await Data.save()
            res.send({ result: "Done", message: "Sub category created" })
        }
        catch (error) {
            if (error.keyValue)
                res.status(400).send({ result: "Fail", message: "Sub category already exist" })
            else if (error.errors.name)
                res.status(400).send({ result: "Fail", message: error.errors.name.message })

            else
                res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    //Get Api
    app.get("/subcategory", async (req, res) => {
        try {

            const Data = await SubCategory.find()
            res.send({ result: "Done", data: Data })
        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })
    //Particular FETCH
    app.get("/subcategory/:_id", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await SubCategory.findOne({ _id: req.params._id })
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
    app.put("/subcategory/:_id", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await SubCategory.findOne({ _id: req.params._id })
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
    app.delete("/subcategory/:_id", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await SubCategory.findOne({ _id: req.params._id })
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