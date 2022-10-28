import React, { useContext, useState, useEffect } from 'react'
import { CartContext } from '../Store/CartContextProvider'
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid'
import { Link, useNavigate } from 'react-router-dom'
import CartSpinner from './CartSpinner';
export default function Cart() {
    let Navigate = useNavigate()
    let { getAllcartUserid, updatecart, deletecart, getSinglecart } = useContext(CartContext)
    const [cart, setcart] = useState([])
    let [total, settotal] = useState()
    let [shipping, setshipping] = useState()
    let [final, setfinal] = useState()
    const [decspin, setdecpin] = useState(false)
    const [incspin, setincpin] = useState(false)
    const GetApiData = async () => {
        let response = await getAllcartUserid()
        setcart(response.data)
        let totals = 0
        let shippings = 0
        for (let item of response.data) {
            totals = totals + item.total

        }
        if (totals > 0 && totals < 1000)
            shippings = 150

        settotal(totals)
        setshipping(shippings)
        setfinal(totals + shippings)
    }
    useEffect(() => {
        if (localStorage.getItem("username"))
            GetApiData()
        else
            Navigate("/Login")
    }, [])

    const Update = async (_id, op) => {

        let response = await getSinglecart(_id)
        let singlecart = response.data
        if (op === "DEC" && singlecart.qty === 1)
            return
        else if (op === "DEC") {
            setdecpin(true)
            singlecart.qty = singlecart.qty - 1
            singlecart.total = singlecart.total - singlecart.price
        }
        else {
            setincpin(true)
            singlecart.qty = singlecart.qty + 1
            singlecart.total = singlecart.total + singlecart.price
        }

        response = await updatecart(singlecart)
        if (response.result === "Done") {
            setdecpin(false)
            setincpin(false)
            GetApiData()
        }

        else {
            setdecpin(false)
            setincpin(false)
            alert(response.message)
        }

    }
    const deleteCartSingle = async (_id) => {
        let response = await deletecart(_id)
        if (response.result === "Done")
            GetApiData()
        else
            alert(response.message)
    }
    return (
        <>
            <div className="container-fluid" style={{ minHeight: "78vh" }}>
                <h5 className='bgcol mt-1 text-center text-light p-3'>Cart</h5>

                <div className="table-responsive">
                    {
                        total === 0 ? "" : <table className='table table-stripped table-hover'>
                            <tbody>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Price</th>
                                    <th></th>
                                    <th>Qty</th>
                                    <th></th>
                                    <th>Total</th>
                                    <th></th>


                                </tr>

                                {
                                    cart.map((item, index) => {
                                        return <tr key={index}>
                                            <td><img src={`/public/upload/product/${item.pic1}`} alt="pic.." className="rounded" style={{ width: "80px", height: "85px" }} /></td>
                                            <td>{item.name}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                            <td>&#8377;{item.price}</td>
                                            <td>{decspin === false ? <RemoveIcon onClick={() => Update(item._id, "DEC")}></RemoveIcon> : <CartSpinner />}</td>
                                            <td>{item.qty}</td>
                                            <td>{incspin === false ? <AddIcon onClick={() => Update(item._id, "INC")}></AddIcon > : <CartSpinner />}</td>
                                            <td>&#8377;{item.total}</td>
                                            <td><DeleteIcon onClick={() => deleteCartSingle(item._id)}></DeleteIcon></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    }
                </div>

                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        {
                            total === 0 ? <Link to="/Shop/All/All/All" className="btn btn-sm w-100 text-light bgcol m-2">No item in cart | Shop Now</Link> : <table className="table table-stripped table-hover">
                                <tbody>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{total}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping Charge</th>
                                        <td>&#8377;{shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Net Total</th>
                                        <td>&#8377;{final}</td>
                                    </tr>
                                    <tr>
                                        <th colSpan={2}><Link to="/checkout" className="btn btn-sm w-100 text-light bgcol m-2">Checkout</Link></th>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    </Grid>
                </Grid>

            </div>

        </>
    )
}
