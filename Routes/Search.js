module.exports = function (app,Product) {

    app.post("/search", async (req, res) => {
        try {

            const Data = await Product.find({
                $or: [
                    { name: { $regex: `.*${req.body.search}.*`, $options: "i" } },
                    { maincategory: { $regex: `.*${req.body.search}.*`, $options: "i" } },
                    { subcategory: { $regex: `.*${req.body.search}.*`, $options: "i" } },
                    { brand: { $regex: `.*${req.body.search}.*`, $options: "i" } },
                    { size: { $regex: `.*${req.body.search}.*`, $options: "i" } },
                    { color: { $regex: `.*${req.body.search}.*`, $options: "i" } },
                    { discription: { $regex: `.*${req.body.search}.*`, $options: "i" } }
                ]
            })
            if (Data)
                res.send({ result: "Done", data: Data })
            else
                res.send({ result: "Failed", message: "Product not found" })
        }
        catch (error) {
            res.status(500).send({ result: "Fail", message: "Internal server error" })
        }
    })

}