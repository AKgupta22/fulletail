const nodemailer = require("nodemailer")
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

const MailSender = async (obj) => {
    let MailOption = {
        from: process.env.EMAIL,
        to: obj.to,
        subject: obj.subject,
        text: obj.text
    }
    transport.sendMail(MailOption, (error, data) => {
        if (error)
            console.log(error);
    })
}

module.exports = MailSender