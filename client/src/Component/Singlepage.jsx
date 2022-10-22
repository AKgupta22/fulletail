import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import { ProductContext } from '../Store/ProductContextProvider';
import { CartContext } from '../Store/CartContextProvider'
import { WishlistContext } from '../Store/WishlistContextProvider'
export default function Singlepage() {
    let Navigate = useNavigate()
    let [product, setproduct] = useState({})
    let { getOneproduct } = useContext(ProductContext)
    let { Addcart, getAllcartUserid } = useContext(CartContext)
    let { Addwishlist, getAllwishlist } = useContext(WishlistContext)
    let { _id } = useParams()
    var items = [
        {
            pic: `/public/upload/product/${product.pic1}`
        },
        {
            pic: `/public/upload/product/${product.pic2}`
        },
        {
            pic: `/public/upload/product/${product.pic3}`
        },
        {
            pic: `/public/upload/product/${product.pic4}`
        }
    ]

    async function AddToCart() {

        let response = await getAllcartUserid()
        if (response.result === "Fail")
            Navigate("/Login")
        if (response.data.find((item) => item.username === localStorage.getItem("username") && item.productid === _id) === undefined) {

            let item = {
                username: localStorage.getItem("username"),
                productid: product._id,
                name: product.name,
                color: product.color,
                size: product.size,
                maincategory: product.maincategory,
                subcategory: product.subcategory,
                brand: product.brand,
                price: product.finalprice,
                total: product.finalprice * 1,
                qty: 1,
                pic1: product.pic1,


            }

            response = await Addcart(item)
            if (response.result === "Done") {
                Navigate('/cart')
                localStorage.setItem("cartqty", "added")
            }
            else
                alert(response.message)

        }
        else
            Navigate('/cart')
    }
    async function AddToWishlist() {

        let response = await getAllwishlist()
        if (response.result === "Fail")
            Navigate("/Login")
        if (response.data.find((item) => item.username === localStorage.getItem("username") && item.productid === _id) === undefined) {

            let item = {
                username: localStorage.getItem("username"),
                productid: product._id,
                name: product.name,
                color: product.color,
                size: product.size,
                maincategory: product.maincategory,
                subcategory: product.subcategory,
                brand: product.brand,
                price: product.baseprice,
                pic1: product.pic1,


            }

            response = await Addwishlist(item)
            if (response.result === "Done")
                Navigate('/wishlist')
            else
                alert(response.message)

        }
        else
            Navigate('/wishlist')

    }
    let getApiData = async () => {
        let response = await getOneproduct(_id)
        setproduct(response.data)
    }

    useEffect(() => {
        getApiData()
    }, [])
    function Item(props) {
        return (
            <Paper>
                <img src={props.item.pic} alt="" height="500px" width="100%" />

            </Paper>
        )
    }
    return (
        <>
            <div className="container-fluid mt-2">

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>

                            <Carousel>
                                {

                                    items.map((item, i) => <Item key={i} item={item} />)

                                }
                            </Carousel>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <h5 className="textcol bgcol text-center p-3 mt-1">Product details</h5>
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">

                                    <tbody>
                                        <tr>
                                            <th>
                                                Name
                                            </th>
                                            <td>{product.name}</td>


                                        </tr>
                                        <tr>
                                            <th>
                                                Maincategory
                                            </th>
                                            <td>{product.maincategory}</td>


                                        </tr>
                                        <tr>
                                            <th>
                                                Sub category
                                            </th>
                                            <td>{product.subcategory}</td>


                                        </tr>
                                        <tr>
                                            <th>
                                                Brand
                                            </th>
                                            <td>{product.brand}</td>


                                        </tr>
                                        <tr>
                                            <th>
                                                Orginal price
                                            </th>
                                            <td>&#8377;{product.baseprice}</td>


                                        </tr>

                                        <tr>
                                            <th>
                                                Discount
                                            </th>
                                            <td>{product.discount}%</td>


                                        </tr>

                                        <tr>
                                            <th>
                                                Final Price
                                            </th>
                                            <td>&#8377;{product.finalprice}</td>


                                        </tr>
                                        <tr>
                                            <th>
                                                Color
                                            </th>
                                            <td>{product.color}</td>


                                        </tr>
                                        <tr>
                                            <th>
                                                Size
                                            </th>
                                            <td>{product.size}</td>


                                        </tr>
                                        <tr>
                                            <th>
                                                Description
                                            </th>
                                            <td>{product.discription}</td>


                                        </tr>
                                    </tbody>


                                </table>


                            </div>
                            <div className="d-flex justify-content-between">
                                <button style={{ width: "49%" }} className="btn bgcol textcol text-center btn-sm mt-1" onClick={AddToCart}> Add to Cart</button>
                                <button className="btn bgcol textcol text-center btn-sm mt-1" style={{ width: "49%" }} onClick={AddToWishlist} > Add to Wishlist</button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>


            </div>

        </>
    );
}
