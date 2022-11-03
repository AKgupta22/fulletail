const Razorpay = require("razorpay")
const verifytoken = require('../Tokens/VerifyToken')
const MailSender = require('../MailHandler/SendMail')
const Checkout = require("../models/Checkout")
module.exports = function (app, User) {
    //Payment API
    app.post("/orders", verifytoken, async (req, res) => {
        try {
            const instance = new Razorpay({
                key_id: process.env.RAZORPAYKEY,
                key_secret: process.env.RAZORPAYSEC,
            });

            const options = {
                amount: req.body.amount * 100,
                currency: "INR"
            };

            instance.orders.create(options, (error, order) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Something Went Wrong!" });
                }
                res.status(200).json({ data: order });
            });
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error!" });
            console.log(error);
        }
    });

    app.put("/verify", verifytoken, async (req, res) => {
        try {
            let check = await Checkout.findOne({ _id: req.body.checkid })
            check.paymentid = req.body.razorpay_payment_id
            check.paymentstatus = "Success"
            check.mode = "Razorpay"
            await check.save()
            let user = await User.findOne({ username: check.username })
            let MailOption = {
                to: user.email,
                subject: "Payment Done !!! : Team Etail",
                text: `Thanks to Shop with Us\nYour Payment is Confirmed\nTrack Order in Profile Section!!!\nTeam Etail`
            }
            MailSender(MailOption)
            res.status(200).send({ result: "Done",data:check });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error!" });
        }
    });
}