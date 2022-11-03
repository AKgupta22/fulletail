const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "61e597b5",
    apiSecret: "dE7fEcwRh2NNkafP"
})
const SMSHandle = (obj) => {

    const from = "Vonage APIs"
    const to = `918853049148`
    const text = `${obj.text}`
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })

}
module.exports = SMSHandle