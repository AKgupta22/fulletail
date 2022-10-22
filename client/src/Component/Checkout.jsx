import React, { useContext, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../Store/CartContextProvider'
import { CheckoutContext } from '../Store/CheckoutContextProvider'
import { UserContext } from '../Store/UserContextProvider'
function createData(keys, value) {
    return { keys, value };
}

export default function Checkout() {
    let Navigate = useNavigate()
    let { getOneuser } = useContext(UserContext)
    const [user, setuser] = useState({})
    let { getAllcartUserid } = useContext(CartContext)
    const [cart, setcart] = useState([])
    let [total, settotal] = useState()
    let [shipping, setshipping] = useState()
    let [final, setfinal] = useState()
    let { Addcheckout } = useContext(CheckoutContext)
    let [mode, setmode] = useState("COD")
    let Getapidata = async () => {
        let response = await getOneuser()
        setuser(response.data)
        let response1 = await getAllcartUserid()
        setcart(response1.data)
        let totals = 0
        let shippings = 0
        for (let item of response1.data) {
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
            Getapidata()
        else
            Navigate("/Login")
    }, [])

    const rows = [
        createData('Name', user.name),
        createData('Username', user.username),
        createData('Email', user.email),
        createData('Phone', user.mobile),
        createData('Address Line 1', user.address1),
        createData('Address Line 2', user.address2),
        createData('City', user.city),
        createData('State', user.state),
        createData('Pincode', user.pincode)
    ];

    function modecg(e) {
        setmode(e.target.value)
    }
    async function placeorder() {
        let item = {
            username: localStorage.getItem("username"),
            mode: mode,
            checkouttotal:total,
            paymentid: "COD",
            status: "Order Pending",
            paymentstatus: "Pending",
            shipping: shipping,
            final: final,
            products: cart
        }
        let response = await Addcheckout(item)
        if (response.result === "Done")
            Navigate("/profile")
        else
            alert(response.message)
    }

    return (
        <>

            <div className="container-fluid mt-2">

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <h5 className='bgcol text-light text-center p-2 '>Billing Details</h5>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.keys}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.keys}
                                                </TableCell>
                                                <TableCell align="left">{row.value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Link to="/updateprofile" className="btn bgcol textcol text-center w-100 btn-sm mt-1"> Update Address </Link>

                        </Grid>
                        <Grid item md={6} xs={12}>
                            <h5 className='bgcol text-light text-center p-2 '>Cart Details</h5>

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
                                                <th>Qty</th>
                                                <th>Total</th>


                                            </tr>

                                            {
                                                cart.map((item, index) => {
                                                    return <tr key={index}>
                                                        <td><img src={`/public/upload/product/${item.pic1}`} alt="pic.." className="rounded" style={{ width: "40px", height: "40px" }} /></td>
                                                        <td>{item.name}</td>
                                                        <td>{item.color}</td>
                                                        <td>{item.size}</td>
                                                        <td>&#8377;{item.price}</td>
                                                        <td>{item.qty}</td>
                                                        <td>&#8377;{item.total}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                }
                            </div>


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
                                            <th>Mode</th>
                                            <td>
                                                <select className='form-select' name="mode" onChange={modecg}>
                                                    <option value="COD">COD</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colSpan={2}><button onClick={placeorder} className="btn btn-sm w-100 text-light bgcol m-2">Place Order</button></th>
                                        </tr>
                                    </tbody>
                                </table>
                            }
                        </Grid>

                    </Grid>
                </Box>
            </div>


        </>
    )
}
