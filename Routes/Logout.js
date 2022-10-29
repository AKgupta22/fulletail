const verifytoken = require('../Tokens/VerifyToken')
module.exports = function (app, User) {
    app.post("/logout", verifytoken, async (req, res) => {
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

    app.post("/logoutall", verifytoken, async (req, res) => {
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

}