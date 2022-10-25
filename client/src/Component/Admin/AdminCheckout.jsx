import React, { useState, useContext, useEffect } from 'react'
import LeftNav from './LeftNav'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { CheckoutContext } from '../../Store/CheckoutContextProvider';
import { Link, useNavigate } from 'react-router-dom';
export default function AdminCheckout() {
    let Navigate = useNavigate()
    let { getAllcheckout, updatecheckout } = useContext(CheckoutContext)
    let [checkout, setcheckout] = useState([])
    let [edit, setedit] = useState("")
    let [status, setstatus] = useState({

        mode: "",
        status: "",
        payment: "",
        courier: "",
        tracking: ""
    })

    function edited(_id) {
        setedit(_id)

    }

    function Getdata(e) {
        let name = e.target.name
        let value = e.target.value
        setstatus((old) => {
            return {
                ...old,
                [name]: value
            }
        })

    }
    async function PostData(e) {
        e.preventDefault()
        let item = {
            mode: status.mode,
            status: status.status,
            paymentstatus: status.payment,
            courier: status.courier,
            tracking: status.tracking

        }
        let response = await updatecheckout(item, edit._id)
        if (response.result === "Done") {
            GetApiData()
            setstatus({

                mode: "",
                status: "",
                payment: "",
                courier: "",
                tracking: ""
            })
        }
        else
            alert(response.message)

    }
    const GetApiData = async () => {
        let response = await getAllcheckout()
        setcheckout(response.data)

    }
    useEffect(() => {
        if (localStorage.getItem("username") && localStorage.getItem("role")==="admin")
            GetApiData()
        else
            Navigate("/")
    }, [])
    return (
        <div className="container-fluid row" style={{ minHeight: "78vh" }}>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                <LeftNav />
            </div>
            <div className="col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12">
                <h5 className='bgcol p-2 text-light text-center mt-1'>Checkouts </h5>
                <div className="row">
                    {
                        checkout?.length > 0 ?
                            <div className="row">
                                <div className="table-responsive tablu">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Order no </th>
                                                <th>Order Date </th>
                                                <th>User name</th>
                                                <th>Mode</th>
                                                <th>Order Status </th>
                                                <th>Payment Status</th>
                                                <th>Total Amount </th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                            {
                                                checkout?.map((item, index) => {
                                                    return <tr key={index}>
                                                        <td>{item.OrderID}</td>
                                                        <td>{`${new Date(item.date).getDate()}/${new Date(item.date).getMonth()}/${new Date(item.date).getFullYear()} ${new Date(item.date).getHours()}:${new Date(item.date).getMinutes()}:${new Date(item.date).getSeconds()}`}</td>
                                                        <td>{item.username}</td>
                                                        <td>{item.mode}</td>
                                                        <td>{item.status}</td>
                                                        <td>{item.paymentstatus}</td>
                                                        <td>{item.final}</td>
                                                        <td><button className='bgcol text-light btn btn-sm w-100' type="button" data-bs-toggle="modal" data-bs-target="#ViewModal" onClick={() => edited(item)}><RemoveRedEyeIcon /></button></td>
                                                    </tr>
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            : <Link to="/Admin" className='btn btn-sm text-light text-center w-100 p-3 mt-5 bgcol'> No checkout visit home page</Link>

                    }

                </div>
            </div>


            <div className="modal fade" id="ViewModal" tabIndex="-1" aria-labelledby="ViewModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ViewModalLabel">Order no {edit.OrderID}  for User name: {edit.username}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={PostData}>
                            <div className="modal-body">
                                <div className="row">

                                    <div className="col-sm-6 col-12">
                                        <label className="form-label">Payment Mode</label>
                                        <input type="text" className="form-control" disabled value={edit.mode} />
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <label className="form-label">Change Payment Mode</label>
                                        <select name="mode" value={status.mode} onChange={Getdata} className='form-select' >
                                            <option defaultChecked>Select</option>
                                            <option value="COD">COD</option>
                                            <option value="DC/UPI">DC/UPI</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="row">

                                    <div className="col-sm-6 col-12">
                                        <label className="form-label">Order Status</label>
                                        <input type="text" className="form-control" disabled value={edit.status} />
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <label className="form-label">Change Order Status</label>
                                        <select name="status" value={status.status} onChange={Getdata} className='form-select' >
                                            <option defaultChecked>Select</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Not Packed">Not Packed</option>
                                            <option value="Packed">Packed</option>
                                            <option value="Ready to Ship">Ready to Ship</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="RTO">RTO</option>
                                            <option value="Returned">Returned</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="row">

                                    <div className="col-sm-6 col-12">
                                        <label className="form-label">Payment Status</label>
                                        <input type="text" className="form-control" disabled value={edit.paymentstatus} />
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <label className="form-label">Change Payment Status</label>
                                        <select name="payment" value={status.payment} onChange={Getdata} className='form-select' >
                                            <option defaultChecked>Select</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Succes">Succes</option>
                                            <option value="Refunded">Refunded</option>
                                            <option value="Failed">Failed</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="row">

                                    <div className="col-sm-6 col-12">
                                        <label className="form-label">Courier Name</label>
                                        <select name="courier" value={status.courier} onChange={Getdata} className='form-select' >
                                            <option defaultChecked>Select</option>
                                            <option value="Delhivery">Delhivery</option>
                                            <option value="Ecom Express">Ecom Express</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <label className="form-label">Tracking no</label>
                                        <input type="text" className="form-control" value={status.tracking} name="tracking" onChange={Getdata} />
                                    </div>

                                </div>
                                {
                                    <div className="table-responsive mt-1">
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
                                                    edit === "" ? "" : edit?.products?.map((p, index) => {
                                                        return <tr key={index}>
                                                            <td><img src={p.pic1 ? `/public/upload/product/${p.pic1}` : ""} alt="pic.." className="rounded" style={{ width: "42px", height: "42px" }} /></td>
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
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>




        </div>




    )
}

