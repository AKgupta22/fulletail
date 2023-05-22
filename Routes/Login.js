const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const saltkey = process.env.SALTKEY
module.exports = function (app, User) {
    app.post("/login", async (req, res) => {
        try {

            const Data = await User.findOne({ email: req.body.email })
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
}