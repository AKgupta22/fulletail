import React, { useContext, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useRazorpay from "react-razorpay";
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../Store/CartContextProvider'
import { CheckoutContext } from '../Store/CheckoutContextProvider'
import { UserContext } from '../Store/UserContextProvider'
import CartSpinner from './CartSpinner'
function createData(keys, value) {
    return { keys, value };
}

export default function Checkout() {
    let Navigate = useNavigate()
    const Razorpay = useRazorpay();
    let { getOneuser } = useContext(UserContext)
    const [user, setuser] = useState({})
    let { getAllcartUserid, deletecartusername } = useContext(CartContext)
    const [cart, setcart] = useState([])
    let [total, settotal] = useState()
    let [shipping, setshipping] = useState()
    let [final, setfinal] = useState()
    let { Addcheckout } = useContext(CheckoutContext)
    const [isCheckout, setisCheckout] = useState(true)
    const [isConfirmation, setisConfirmation] = useState(false)
    let [oddetails, setoddetails] = useState({})
    let [mode, setmode] = useState("COD")
    const [checkoutbtn, setcheckoutbtn] = useState(true)
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
    ]

    async function placeorder() {
        setcheckoutbtn(false)
        let item = {
            username: localStorage.getItem("username"),
            mode: mode,
            checkouttotal: total,
            paymentid: "COD",
            status: "Successfully Placed",
            paymentstatus: "Success",
            shipping: shipping,
            final: final,
            products: cart
        }
        let response = await Addcheckout(item)
        if (response.result === "Done") {
            await deletecartusername()
            setoddetails(response.data);
            setisCheckout(false)
            setisConfirmation(true)
        }
        else {
            setcheckoutbtn(true)
            alert(response.message)
        }
    }

    const PlaceOnline = async () => {
        setcheckoutbtn(false)
        let item = {
            username: localStorage.getItem("username"),
            mode: mode,
            checkouttotal: total,
            paymentid: "Razorpay",
            status: "Successfully Placed",
            paymentstatus: "Pending",
            shipping: shipping,
            final: final,
            products: cart
        }
        let response = await Addcheckout(item)
        if (response.result === "Done") {
            setcheckoutbtn(true)
            handlePayment(response.data)
        }
        else {
            setcheckoutbtn(true)
            alert(response.message)
        }

    }

    const initPayment = (data, orderid) => {
        const options = {
            key: "rzp_test_UoKI6ohFwbTdzO",
            amount: data.amount,
            currency: "INR",
            order_id: data._id,
            "prefill": {
                "name": user.name,
                "email": user.email,
                "contact": user.mobile,
            },
            handler: async (response) => {
                try {
                    let item = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        checkid: orderid
                    }
                    let rawdata = await fetch("/verify", {
                        method: "put",
                        headers: {
                            "content-type": "application/json",
                            "authorization": localStorage.getItem("token"),
                            "username": localStorage.getItem("username")
                        },
                        body: JSON.stringify(item)
                    });
                    let result = await rawdata.json()
                    if (result.result === "Done") {
                        await deletecartusername()
                        setoddetails(result.data);
                        setisCheckout(false)
                        setisConfirmation(true)
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    };


    const handlePayment = async (checkdata) => {
        try {
            const orderUrl = "/orders";
            const rawdata = await fetch(orderUrl, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token"),
                    "username": localStorage.getItem("username")
                },
                body: JSON.stringify({ amount: checkdata.final })
            });
            let data = await rawdata.json()
            initPayment(data.data, checkdata._id);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>

            <div className="container-fluid mt-2">
                {
                    isCheckout === true && <Box sx={{ flexGrow: 1 }}>
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
                                                    <select className='form-select' name="mode" onChange={(e) => setmode(e.target.value)}>
                                                        <option value="COD">COD</option>
                                                        <option value="Razorpay">Razorpay</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2}><button onClick={mode === "COD" ? placeorder : PlaceOnline} className="btn btn-sm w-100 text-light bgcol m-2">{checkoutbtn === true ? 'Place Order' : <CartSpinner />}</button></th>
                                            </tr>
                                        </tbody>
                                    </table>
                                }
                            </Grid>

                        </Grid>
                    </Box>

                }
                {
                    isConfirmation === true &&
                    <div className="container">
                        <h3 className='bg-success p-2 text-light text-center mt-1 mb-2 odm'>Congrats Your Order is {oddetails?.status} </h3>
                        <div className="table-responsive">
                            <table className="table table-stripped table-light table-hover">
                                <tbody>
                                    <tr>
                                        <th>Order Id: </th>
                                        <td>{oddetails?.OrderID}</td>
                                    </tr>
                                    <tr>
                                        <th>Order Date</th>
                                        <td>{`${new Date(oddetails?.date).getDate()}/${new Date(oddetails?.date).getMonth()}/${new Date(oddetails?.date).getFullYear()} ${new Date(oddetails?.date).getHours()}:${new Date(oddetails?.date).getMinutes()}:${new Date(oddetails?.date).getSeconds()}`}</td>
                                    </tr>
                                    <tr>
                                        <th>Mode: </th>
                                        <td>{oddetails?.mode}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Status: </th>
                                        <td>{oddetails?.paymentstatus}</td>
                                    </tr>
                                    <tr>
                                        <th>Total: </th>
                                        <td>&#8377;{oddetails?.checkouttotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping Charge: </th>
                                        <td>&#8377;{oddetails?.shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Net Total: </th>
                                        <td>&#8377;{oddetails?.final}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Link className='btn text-light text-center bgcol w-100 odm' to="/Profile">Go to My Orders</Link>
                    </div>

                }
            </div>


        </>
    )
}
