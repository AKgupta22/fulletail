const User = require("../models/user")
const jwt = require("jsonwebtoken")
const saltkey = process.env.SALTKEY
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
            res.send({ result: "Fail", action: "clear", message: "You are cuurently logged out please login again" })

    }
    else
        res.send({ result: "Fail", message: "You are not authorized to access this page" })
}

module.exports=verifytoken