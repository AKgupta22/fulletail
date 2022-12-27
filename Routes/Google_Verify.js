const axios = require('axios')
module.exports = function (app) {
    app.post('/verify-captcha', async (req, res) => {
        try {
            console.log(req.body);
            if (req.body && req.body.token) {
                const resp = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.Recaptcha}&response=${req.body.token}`)

                console.log(resp.data);
                res.status(200).send({ message: "Done", data: resp.data })
            }
            else res.status(500).send({ message: "Token is required" })
        }
        catch (e) {
            res.status(500).send({ message: "Internal server error" })
        }
    })
}