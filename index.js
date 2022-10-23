const express = require("express")
const multer = require("multer")
const app = express()
const fs = require("fs")
const path = require("path")
const bcrypt = require('bcrypt')
const passwordValidator = require("password-validator")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const cors = require("cors")
const DotEnv = require("dotenv")
DotEnv.config()
app.use(cors())
app.use(express.json())
app.set(express.static(path.join(__dirname, "public")))
app.use('/public', express.static('public'))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload/product')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

const upload = multer({
    storage: storage
})

const MainCategory = require("./models/Maincategory")
const SubCategory = require("./models/Subcategory")
const Brands = require("./models/Brands")
const Product = require("./models/Product")
const User = require("./models/user")
const Cart = require("./models/Cart")
const Wishlist = require("./models/Wishlist")
const Newsletters = require("./models/Newsletters")
const Contact = require("./models/Contact")
const Checkout = require("./models/Checkout")
var schema = new passwordValidator()
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(20)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Password@123', 'Password123']); // Blacklist these values

const saltkey = process.env.SALTKEY

const verifytokenAdmin = async (req, res, next) => {
    var token = req.headers['authorization']
    var username = req.headers['username']
    if (token) {
        let user = await User.findOne({ username: username })
        if (user && user.tokens.findIndex((item) => item === token) !== -1) {
            jwt.verify(token, saltkey, (error, data) => {
                if (error)
                    res.send({ result: "Fail", message: "You are not authorized to access this page" })
                else {
                    if (user.role === "admin")
                        next()

                    else
                        res.send({ result: "Fail", message: "You are not authorized to access this page" })
                }

            })

        }
        else
            res.send({ result: "Fail", message: "You are curently logged out please login again" })

    }
    else
        res.send({ result: "Fail", message: "You are not authorized to access this page" })
}

const verifytoken = async (req, res, next) => {
    var token = req.headers['authorization']
    var username = req.headers['username']
    if (token) {
        let user = await User.findOne({ username: username })
        if (user && user.tokens.findIndex((item) => item === token) !== -1) {
            jwt.verify(token, saltkey, (error, data) => {
                if (error)
                    res.send({ result: "Fail", message: "You are not authorized to access this page" })
                else
                    next()
            })
        }
        else
            res.send({ result: "Fail", message: "You are cuurently logged out please login again" })

    }
    else
        res.send({ result: "Fail", message: "You are not authorized to access this page" })
}

require("./dbconnect")

//Main category
//Post Api
app.post("/maincategory", verifytokenAdmin, async (req, res) => {
    try {

        const Data = new MainCategory(req.body)
        await Data.save()
        res.send({ result: "Done", message: "Main category created" })
    }
    catch (error) {
        if (error.keyValue)
            res.status(400).send({ result: "Fail", message: "Main category already exist" })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", message: error.errors.name.message })

        else
            res.status(500).send({ result: "Fail", message: "Internal server error" })
    }
})

//Get Api
app.get("/maincategory", async (req, res) => {
    try {

        const Data = await MainCategory.find()
        res.send({ result: "Done", data: Data })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" })
    }
})
//Particular FETCH
app.get("/maincategory/:_id", verifytokenAdmin, async (req, res) => {
    try {

        const Data = await MainCategory.findOne({ _id: req.params._id })
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
app.put("/maincategory/:_id", verifytokenAdmin, async (req, res) => {
    try {

        const Data = await MainCategory.findOne({ _id: req.params._id })
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
app.delete("/maincategory/:_id", verifytokenAdmin, async (req, res) => {
    try {

        const Data = await MainCategory.findOne({ _id: req.params._id })
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

//main category ends.

//Sub category
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

//Sub category ends.

//Brands
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

//Brands ends.

//Product
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

//Product ends.


//user
//Post Api
app.post("/user", async (req, res) => {
    try {
        const Data = new User(req.body)
        if (req.body.name && req.body.email && req.body.username && req.body.mobile) {
            if (await User.findOne({ username: req.body.username }) === null && await User.findOne({ email: req.body.email }) === null && await User.findOne({ mobile: req.body.mobile }) === null) {
                if (schema.validate(req.body.password)) {
                    bcrypt.hash(req.body.password, 12, async function (err, hash) {
                        Data.password = hash
                        await Data.save()
                        res.send({ result: "Done", message: "user created" })
                        let MailOptionUser = {
                            from: process.env.EMAIL,
                            to: req.body.email,
                            subject: 'Account created on Etail App',
                            text: `Dear ${req.body.name}\nYour account on etail app has been created with\nUsername: ${req.body.username}\nPassword: ${req.body.password}\nRegards Etail Team`
                        }
                        transport.sendMail(MailOptionUser, (error, data) => {
                            if (error)
                                console.log(error);
                        })
                    })
                }
                else
                    res.send({ result: "Fail", message: "Invalid Password!\nPassword must containt atleast 8 char max 20 char\n atleast one special,capital,lowercase and number\nMust not have easy password!!" })
            }
            else
                res.status(500).send({ result: "Fail", message: "User already registered with same Email or Username or Mobile no\n All should be unique !!" })

        }
        else
            res.status(500).send({ result: "Fail", message: "All field is required" })

    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }
})

//Get Api
app.get("/user", verifytokenAdmin, async (req, res) => {
    try {

        const Data = await User.find()
        res.send({ result: "Done", data: Data })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" })
    }
})
//Particular FETCH
app.get("/user/:username", verifytoken, async (req, res) => {
    try {

        const Data = await User.findOne({ username: req.params.username })
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
app.put("/user/:_id", verifytoken, upload.single("profile"), async (req, res) => {
    try {

        const Data = await User.findOne({ _id: req.params._id })
        if (Data) {
            Data.name = req.body.name ? req.body.name : Data.name
            Data.mobile = req.body.mobile ? req.body.mobile : Data.mobile
            Data.address1 = req.body.address1 ? req.body.address1 : Data.address1
            Data.address2 = req.body.address2 ? req.body.address2 : Data.address2
            Data.city = req.body.city ? req.body.city : Data.city
            Data.state = req.body.state ? req.body.state : Data.state
            Data.pincode = req.body.pincode ? req.body.pincode : Data.pincode
            if (req.file) {
                try {
                    fs.unlinkSync(`./public/upload/product/${Data.profile}`)
                }
                catch (error) { }
                Data.profile = req.file.filename ? req.file.filename : Data.profile
            }

            await Data.save()
            res.send({ result: "Done", message: "Updated" })

        }
        else
            res.status(404).send({ result: "Fail", message: "Invalid id" })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" })
    }
})

app.put("/update-password", verifytoken, async (req, res) => {
    try {
        const Data = await User.findOne({ username: req.body.username })
        if (Data) {
            if (req.body.password) {

                if (schema.validate(req.body.password)) {
                    bcrypt.hash(req.body.password, 12, async function (err, hash) {
                        Data.password = hash
                        Data.save()
                        res.send({ result: "Done", message: "Updated" })
                        let MailOptionUpdate = {
                            from: process.env.EMAIL,
                            to: Data.email,
                            subject: 'Your password has been successfully updated.',
                            text: `Dear ${Data.name}\nYour password has been updated for Username ${Data.username}\nYour new password is: ${req.body.password}\nContact Admin if this action is not\ndone by You!!!!\nRegards Etail Team`
                        }
                        transport.sendMail(MailOptionUpdate, (error, data) => {
                            if (error)
                                console.log(error);
                        })
                    })

                }
                else
                    res.send({ result: "Fail", message: "Invalid Password!\nPassword must containt atleast 8 char max 20 char\n atleast one special,capital,lowercase and number\nMust not have easy password" })


            }
            else
                res.status(500).send({ result: "Fail", message: "Enter valid Password" })

        }
        else
            res.status(500).send({ result: "Fail", message: "Invalid Username" })

    }
    catch (e) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error" })
    }



})
//Delete
app.delete("/user/:_id", verifytokenAdmin, async (req, res) => {
    try {

        const Data = await User.findOne({ _id: req.params._id })
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

//user ends.

//-----------------Cart section--------------
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

//Cart section ends.

//-----------------Wishlist section--------------
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

//Wishlist section ends.

//Newsletters--------
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

//Newsletters ends.

//Contact--------
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

//Contact ends.


//-----------------Checkout section--------------
//Post Api
app.post("/checkout", verifytoken, async (req, res) => {
    try {

        const Data = new Checkout(req.body)
        await Data.save()
        res.send({ result: "Done", message: "Checkout created" })
    }
    catch (error) {
        if (error.errors.userid)
            res.status(400).send({ result: "Fail", message: error.errors.userid.message })
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
/*app.delete("/checkout/:_id", verifytokenAdmin, async (req, res) => {
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
})*/

//Checkout section ends.

//Login Api

app.post("/login", async (req, res) => {
    try {

        const Data = await User.findOne({ username: req.body.username })
        if (Data) {
            if (await bcrypt.compare(req.body.password, Data.password)) {
                jwt.sign({ Data }, saltkey, async (error, token) => {
                    if (error) {
                        console.log(error);
                        res.status(400).send({ result: "Failed", message: "Internal server error" })
                    }
                    else {
                        if (Data.tokens.length < 3) {
                            Data.tokens.push(token)
                            await Data.save()
                            res.send({ result: "Done", data: Data, token: token })
                        }
                        else
                            res.status(400).send({ result: "Failed", message: "Max 3 device login attemt breached" })


                    }
                })
            }
            else
                res.send({ result: "Failed", message: "Incorrect login details" })
        }
        else
            res.send({ result: "Failed", message: "Incorrect login details" })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" })
    }
})

//Login api ends 

//Logout api

app.post("/logout", async (req, res) => {
    try {
        const Data = await User.findOne({ username: req.body.username })
        if (Data) {
            let index = Data.tokens.findIndex((item) => item === req.body.token)
            if (index !== -1) {
                Data.tokens.splice(index, 1)
                Data.save()
                res.send({ result: "Done", message: "logout successfull" })
            }
            else
                res.status(500).send({ result: "failed", message: "unexpected request" })

        }
        else
            res.status(500).send({ result: "failed", message: "unexpected request" })

    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" })
    }
})

app.post("/logoutall", async (req, res) => {
    try {
        const Data = await User.findOne({ username: req.body.username })
        if (Data) {
            let index = Data.tokens.findIndex((item) => item === req.body.token)
            if (index !== -1) {
                Data.tokens = []
                Data.save()
                res.send({ result: "Done", message: "logout successfull" })
            }
            else
                res.status(500).send({ result: "failed", message: "unexpected request" })

        }
        else
            res.status(500).send({ result: "failed", message: "unexpected request" })

    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" })
    }
})


//Logout api ends


//Search Api

app.post("/search", async (req, res) => {
    try {

        const Data = await Product.find({
            $or: [
                { name: { $regex: `.*${req.body.search}.*`, $options: "i" } },
                { maincategory: { $regex: `.*${req.body.search}.*`, $options: "i" } },
                { subcategory: { $regex: `.*${req.body.search}.*`, $options: "i" } },
                { brand: { $regex: `.*${req.body.search}.*`, $options: "i" } },
                { size: { $regex: `.*${req.body.search}.*`, $options: "i" } },
                { color: { $regex: `.*${req.body.search}.*`, $options: "i" } },
                { discription: { $regex: `.*${req.body.search}.*`, $options: "i" } }
            ]
        })
        if (Data)
            res.send({ result: "Done", data: Data })
        else
            res.send({ result: "Failed", message: "Product not found" })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" })
    }
})

//Search api ends 

//Reset password

app.post("/reset-password", async (req, res) => {
    try {

        let Data = await User.findOne({ email: req.body.email })
        if (Data) {
            let otp = parseInt((Math.floor(100000 + Math.random() * 900000)))
            let MailOption = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: `OTP For Password Reset !!!Team Etail`,
                text: `Dear ${Data.name}\nYour password rest otp is ${otp} !!\nRegards Etail Team`
            }
            transport.sendMail(MailOption, (error, data) => {
                if (error)
                    console.log(error);
            })
            Data.OTP = otp
            await Data.save()
            res.send({ result: "Done", message: "otp sent" })

        }
        else
            res.status(400).send({ result: "Fail", message: "Invalid email" })

    }
    catch (error) {
        res.status(400).send({ result: "Fail", message: "Something incorrect" })
    }
})

app.post("/reset-password-otp", async (req, res) => {
    try {

        let Data = await User.findOne({ email: req.body.email })
        if (Data) {
            if (Data.OTP === req.body.otp)
                res.send({ result: "Done", message: "otp is valid" })
            else
                res.send({ result: "Fail", message: "otp is Invalid !! Please enter valid otp" })

        }
        else
            res.status(400).send({ result: "Fail", message: "Invalid email" })

    }
    catch (error) {
        res.status(400).send({ result: "Fail", message: "Something incorrect" })
    }
})

app.post("/reset-password-submit", async (req, res) => {
    try {

        let Data = await User.findOne({ email: req.body.email })
        if (Data) {
            if (schema.validate(req.body.password)) {
                bcrypt.hash(req.body.password, 12, async function (err, hash) {
                    Data.password = hash
                    await Data.save()
                    let MailOptionForgot = {
                        from: process.env.EMAIL,
                        to: req.body.email,
                        subject: 'Your password has been successfully reset',
                        text: `Dear ${Data.name}\nYour password has been reset for username ${Data.username}\nYour new password is: ${req.body.password}\nRegards Etail Team`
                    }
                    transport.sendMail(MailOptionForgot, (error, data) => {
                        if (error)
                            console.log(error);
                    })
                })

                res.send({ result: "Done", message: "Password Reset Successfull" })

            }
            else {
                res.send({ result: "Fail", message: "Invalid Password!\nPassword must containt atleast 8 char max 20 char\n atleast one special,capital,lowercase and number\nMust not have easy password" })

            }

        }
        else
            res.status(400).send({ result: "Fail", message: "Invalid email" })

    }
    catch (error) {
        res.status(400).send({ result: "Fail", message: "Something incorrect" })
    }
})
//Reset password ends

//heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static("/client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})

