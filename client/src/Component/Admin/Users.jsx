import React, { useState, useEffect } from 'react'
import LeftNav from './LeftNav'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useNavigate } from 'react-router-dom'
export default function Users() {
    let Navigate = useNavigate()
    const [user, setuser] = useState([])
    async function deleteuser(_id) {
        if (window.confirm("Are you sure want to delete this user\n Deleted user cant't be reovered Again.")) {
            let response = await fetch("/user/" + _id, {
                method: "delete",
                headers: {
                    "authorization": localStorage.getItem("token"),
                    "username": localStorage.getItem("username")
                }
            })

            response = await response.json()
            if (response.result === "Done")
                getAPIData()
            else
                alert(response.message)
        }

    }

    let getAPIData = async () => {
        let response = await fetch("/user", {
            headers: {
                "authorization": localStorage.getItem("token"),
                "username": localStorage.getItem("username")
            }
        })

        response = await response.json()
        if (response.result === "Done")
            setuser(response.data)
        else
            alert(response.message)
    }

    useEffect(() => {
        if (localStorage.getItem("username") && localStorage.getItem("role") === "admin")
            getAPIData()
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
                    <h5 className='bgcol p-2 text-light text-center mt-1'>Admin Users page</h5>
                    <div className="table-responsive tablu">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Logged Devices</th>
                                    <th></th>
                                </tr>
                                {
                                    user.map((item, i) => {
                                        return <tr key={i}>
                                            <th>{item._id}</th>
                                            <th>{item.username}</th>
                                            <th>{item.name}</th>
                                            <th>{item.mobile}</th>
                                            <th>{item.email}</th>
                                            <th>{item.role}</th>
                                            <th>{item.tokens.length}</th>
                                            {
                                                item.role !== "admin" && <th><button className='bgcol text-light btn btn-sm w-100' onClick={() => deleteuser(item._id)}><PersonRemoveIcon ></PersonRemoveIcon> </button></th>
                                            }
                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}
