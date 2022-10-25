import React, { useContext, useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import pic from '../asset/images/noimage.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router-dom'
import { CheckoutContext } from '../Store/CheckoutContextProvider';
import { UserContext } from '../Store/UserContextProvider'
function createData(keys, value) {
    return { keys, value };
}



export default function Profile() {
    let Navigate = useNavigate()
    let { getOneUsercheckout } = useContext(CheckoutContext)
    let { getOneuser } = useContext(UserContext)
    const [checkout, setcheckout] = useState([])
    const [user, setuser] = useState({})
    let Getapidata = async () => {
        let response = await getOneuser()
        if (response.result === "Done")
            setuser(response.data)
        else if (response.action)
            localStorage.clear()
        let response1 = await getOneUsercheckout()
        setcheckout(response1.data)
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
    return (
        <>

            <Grid container spacing={2}>

                <Grid item md={6} xs={12}>
                    <img height="550px" width="100%" src={user.profile ? `/public/upload/product/${user.profile}` : pic} alt="Profile_Image..." className="mt-1" />
                </Grid>

                <Grid item md={6} xs={12}>
                    <h5 className="textcol bgcol text-center p-3 mt-1">User Profile Section</h5>

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
                    <Link to="/updateprofile" className="btn bgcol textcol text-center w-100 btn-sm mt-1"> Update Profile</Link>
                    <Link to="/updatepassword" className="btn bgcol textcol text-center w-100 btn-sm mt-1"> Update Password</Link>


                </Grid>
            </Grid>
            <h5 className="bgcol text-light text-center p-2 mt-1">Order History</h5>
            <div className="container-fluid mt-1">
                {
                    checkout.map((item, index) => {
                        return <div key={index} className="row">
                            <div className='col-md-4 col-sm-6 col-12'>
                                <div className="table-responsive">
                                    <table className="table table-stripped table-light table-hover">
                                        <tbody>
                                            <tr>
                                                <th>Order Id: </th>
                                                <td>{item.OrderID}</td>
                                            </tr>
                                            <tr>
                                                <th>Order Date</th>
                                                <td>{`${new Date(item.date).getDate()}/${new Date(item.date).getMonth()}/${new Date(item.date).getFullYear()} ${new Date(item.date).getHours()}:${new Date(item.date).getMinutes()}:${new Date(item.date).getSeconds()}`}</td>
                                            </tr>
                                            <tr>
                                                <th>Mode: </th>
                                                <td>{item.mode}</td>
                                            </tr>

                                            <tr>
                                                <th>Status: </th>
                                                <td>{item.status}</td>
                                            </tr>
                                            <tr>
                                                <th>Payment Status: </th>
                                                <td>{item.paymentstatus}</td>
                                            </tr>
                                            <tr>
                                                <th>Total: </th>
                                                <td>&#8377;{item.checkouttotal}</td>
                                            </tr>
                                            <tr>
                                                <th>Shipping Charge: </th>
                                                <td>&#8377;{item.shipping}</td>
                                            </tr>
                                            <tr>
                                                <th>Net Total: </th>
                                                <td>&#8377;{item.final}</td>
                                            </tr>
                                            {
                                                item.courier !== "Not Shipped Yet" && <tr>
                                                    <th>Delivery Partner: </th>
                                                    <td>{item.courier}</td>
                                                </tr>
                                            }
                                            {
                                                item.courier !== "Not Shipped Yet" && <tr>
                                                    <th>Tracking no: </th>
                                                    <td>{item.tracking}</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className='col-md-8 col-sm-6 col-12'>
                                <div className="table-responsive">
                                    <table className="table table-stripped table-light table-hover">
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
                                                item.products.map((p, index) => {
                                                    return <tr key={index}>
                                                        <td><img src={`/public/upload/product/${p.pic1}`} alt="pic.." className="rounded" style={{ width: "42px", height: "42px" }} /></td>
                                                        <td>{p.name}</td>
                                                        <td>{p.color}</td>
                                                        <td>{p.size}</td>
                                                        <td>&#8377;{p.price}</td>
                                                        <td>{p.qty}</td>
                                                        <td>&#8377;{p.total}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <hr style={{ border: "5px solid grey" }} />
                        </div>
                    })
                }
            </div >
        </>
    )
}
