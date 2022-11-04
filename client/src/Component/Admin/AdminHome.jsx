import React, { useContext, useState, useEffect } from 'react'
import LeftNav from './LeftNav'
import { UserContext } from '../../Store/UserContextProvider'
import { useNavigate } from 'react-router-dom'
export default function AdminHome() {
    let Navigate = useNavigate()
    const [user, setuser] = useState({})
    let { getOneuser } = useContext(UserContext)
    let Getapidata = async () => {
        let response = await getOneuser()
        if (response.result === "Done")
            setuser(response.data)
        else if (response.action)
            localStorage.clear()
    }

    useEffect(() => {
        if (localStorage.getItem("username") && localStorage.getItem("role") === "admin")
            Getapidata()
        else
            Navigate("/")
    }, [])
    return (
        <div className="container-fluid" style={{ minHeight: "78vh" }}>
            <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                    <LeftNav />
                </div>
                <div className="col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12">
                    <h5 className='bgcol p-2 text-light text-center mt-1'>Admin Home page</h5>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <img src={user.profile ? `/public/upload/product/${user.profile}` : ""} alt="" width="60%" />
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="table-responsive tablu">

                                <table className='table table-stripped table-hover'>

                                    <tbody>

                                        <tr>
                                            <th>Name</th>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <th>UserName</th>
                                            <td>{user.username}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone</th>
                                            <td>{user.mobile}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Role</th>
                                            <td>{user.role}</td>
                                        </tr>


                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
