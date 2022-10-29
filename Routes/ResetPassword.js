const bcrypt = require('bcrypt')
const MailSender = require('../MailHandler/SendMail')
const passwordValidator = require("password-validator")
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
    app.post("/reset-password", async (req, res) => {
        try {

            let Data = await User.findOne({ email: req.body.email })
            if (Data) {
                let otp = parseInt((Math.floor(100000 + Math.random() * 900000)))
                let MailOption = {
                    to: req.body.email,
                    subject: `OTP For Password Reset !!!Team Etail`,
                    text: `Dear ${Data.name}\nYour password rest otp is ${otp} !!\nRegards Etail Team`
                }
                MailSender(MailOption)
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
                        let MailOption = {
                            to: req.body.email,
                            subject: 'Your password has been successfully reset',
                            text: `Dear ${Data.name}\nYour password has been reset for username ${Data.username}\nYour new password is: ${req.body.password}\nRegards Etail Team`
                        }
                        MailSender(MailOption)
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
}