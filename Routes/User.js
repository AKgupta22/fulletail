const verifytokenAdmin = require('../Tokens/VerifyTokenAdmin')
const verifytoken = require('../Tokens/VerifyToken')
const multer = require("multer")
const fs = require("fs")
const bcrypt = require('bcrypt')
const passwordValidator = require("password-validator")
const MailSender = require('../MailHandler/SendMail')
const SMSHandle = require('../SMSHandler/SMS')
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

var schema = new passwordValidator()
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(20)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Password@123', 'Password123']); // Blacklist these values

module.exports = function (app, User) {
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
                            let MailOption = {
                                to: req.body.email,
                                subject: 'Account created on Etail App',
                                text: `Dear ${req.body.name}\nYour account on etail app has been created with\nUsername: ${req.body.username}\nPassword: ${req.body.password}\nRegards Etail Team\n`
                            }
                            MailSender(MailOption)
                            SMSHandle(MailOption)
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
                res.send({ result: "Done", message: "Updated", data: Data })

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
                            let MailOption = {
                                to: Data.email,
                                subject: 'Your password has been successfully updated.',
                                text: `Dear ${Data.name}\nYour password has been updated for Username ${Data.username}\nYour new password is: ${req.body.password}\nContact Admin if this action is not\ndone by You!!!!\nRegards Etail Team`
                            }
                            MailSender(MailOption)
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

}