const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const DotEnv = require("dotenv")
DotEnv.config()
app.use(cors())
app.use(express.json())
app.set(express.static(path.join(__dirname, "public")))
app.use('/public', express.static('public'))

const Product = require("./models/Product")
const User = require("./models/user")
require("./dbconnect")
require('./Routes/MainCategory')(app)
require('./Routes/SubCategory')(app)
require('./Routes/Brands')(app)
require('./Routes/Product')(app, Product)
require('./Routes/User')(app, User)
require('./Routes/Cart')(app)
require('./Routes/Wishlist')(app)
require('./Routes/Newsletter')(app)
require('./Routes/Contact')(app)
require('./Routes/Checkout')(app)
require('./Routes/Payment')(app, User)
require('./Routes/Login')(app, User)
require('./Routes/Logout')(app, User)
require('./Routes/Search')(app, Product)
require('./Routes/ResetPassword')(app, User)
require('./Routes/Google_Verify')(app)

if (process.env.NODE_ENV) {
    app.use(express.static('client/build'));
    app.get("*", function (req, res) {
        res.sendFile(path.resolve(__dirname, './client/build/index.html'))
    });
}
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})

