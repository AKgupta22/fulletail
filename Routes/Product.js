const verifytokenAdmin = require('../Tokens/VerifyTokenAdmin')
const multer = require("multer")
const fs = require("fs")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload/product')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({
    storage: storage
})

module.exports = function (app,Product) {
    //Post Api
    app.post("/product", verifytokenAdmin, upload.fields([
        { name: "pic1", maxCount: 1 },
        { name: "pic2", maxCount: 1 },
        { name: "pic3", maxCount: 1 },
        { name: "pic4", maxCount: 1 },
    ]), async (req, res) => {
        try {

            const Data = new Product(req.body)
            if (req.files.pic1) {
                Data.pic1 = req.files.pic1[0].filename
            }
            if (req.files.pic2) {
                Data.pic2 = req.files.pic2[0].filename
            }
            if (req.files.pic3) {
                Data.pic3 = req.files.pic3[0].filename
            }
            if (req.files.pic4) {
                Data.pic4 = req.files.pic4[0].filename
            }
            await Data.save()
            res.send({ result: "Done", message: "Product created" })
        }
        catch (error) {
            if (error.errors.name)
                res.status(400).send({ result: "Fail", message: error.errors.name.message })
            else if (error.errors.maincategory)
                res.status(400).send({ result: "Fail", message: error.errors.maincategory.message })
            else if (error.errors.subcategory)
                res.status(400).send({ result: "Fail", message: error.errors.subcategory.message })
            else if (error.errors.brand)
                res.status(400).send({ result: "Fail", message: error.errors.brand.message })
            else if (error.errors.color)
                res.status(400).send({ result: "Fail", message: error.errors.color.message })
            else if (error.errors.size)
                res.status(400).send({ result: "Fail", message: error.errors.size.message })
            else if (error.errors.baseprice)
                res.status(400).send({ result: "Fail", message: error.errors.baseprice.message })
            else if (error.errors.finalprice)
                res.status(400).send({ result: "Fail", message: error.errors.finalprice.message })
            else
                res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    //Get Api
    app.get("/product", async (req, res) => {
        try {

            const Data = await Product.find()
            res.send({ result: "Done", data: Data })
        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })
    //Particular FETCH
    app.get("/product/:_id", async (req, res) => {
        try {

            const Data = await Product.findOne({ _id: req.params._id })
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
    app.put("/product/:_id", verifytokenAdmin, upload.fields([
        { name: "pic1", maxCount: 1 },
        { name: "pic2", maxCount: 1 },
        { name: "pic3", maxCount: 1 },
        { name: "pic4", maxCount: 1 },
    ]), async (req, res) => {
        try {

            const Data = await Product.findOne({ _id: req.params._id })
            if (Data) {

                Data.name = req.body.name ? req.body.name : Data.name
                Data.maincategory = req.body.maincategory ? req.body.maincategory : Data.maincategory
                Data.subcategory = req.body.subcategory ? req.body.subcategory : Data.subcategory
                Data.brand = req.body.brand ? req.body.brand : Data.brand
                Data.color = req.body.color ? req.body.color : Data.color
                Data.size = req.body.size ? req.body.size : Data.size
                Data.baseprice = req.body.baseprice ? req.body.baseprice : Data.baseprice
                Data.discount = req.body.discount ? req.body.discount : Data.discount
                Data.finalprice = req.body.finalprice ? req.body.finalprice : Data.finalprice
                Data.stock = req.body.stock ? req.body.stock : Data.stock
                Data.discription = req.body.discription ? req.body.discription : Data.discription
                if (req.files.pic1) {
                    try {
                        fs.unlinkSync(`./public/upload/product/${Data.pic1}`)
                    }
                    catch (error) { }
                    Data.pic1 = req.files.pic1[0].filename ? req.files.pic1[0].filename : Data.pic1
                }
                if (req.files.pic2) {
                    try {
                        fs.unlinkSync(`./public/upload/product/${Data.pic2}`)
                    }
                    catch (error) { }
                    Data.pic2 = req.files.pic2[0].filename ? req.files.pic2[0].filename : Data.pic2
                }
                if (req.files.pic3) {
                    try {
                        fs.unlinkSync(`./public/upload/product/${Data.pic3}`)
                    }
                    catch (error) { }
                    Data.pic3 = req.files.pic3[0].filename ? req.files.pic3[0].filename : Data.pic3
                }
                if (req.files.pic4) {
                    try {
                        fs.unlinkSync(`./public/upload/product/${Data.pic4}`)
                    }
                    catch (error) { }
                    Data.pic4 = req.files.pic4[0].filename ? req.files.pic4[0].filename : Data.pic4
                }
                await Data.save()
                res.send({ result: "Done", message: "Updated" })

            }
            else
                res.status(404).send({ result: "Fail", message: "Invalid id" })
        }
        catch (error) {
            console.log(error)
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

    //Delete
    app.delete("/product/:_id", verifytokenAdmin, async (req, res) => {
        try {

            const Data = await Product.findOne({ _id: req.params._id })
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