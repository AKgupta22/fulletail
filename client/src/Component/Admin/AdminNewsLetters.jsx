import React, { useState, useEffect } from 'react'
import LeftNav from './LeftNav'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom';
export default function AdminNewsLetters() {
    let Navigate = useNavigate()
    const [newsletters, setnewsletters] = useState([])
    let deleteNewsletterOne = async (_id) => {
        let response = await fetch("/newsletter/" + _id, {
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

    let getAPIData = async () => {
        let response = await fetch("/newsletter", {
            headers: {
                "authorization": localStorage.getItem("token"),
                "username": localStorage.getItem("username")
            }
        })
        response = await response.json()
        if (response.result === "Done")
            setnewsletters(response.data)
        else
            alert(response.message)
    }

    useEffect(() => {
        if (localStorage.getItem("username") && localStorage.getItem("role") === "admin") {

            getAPIData()
        }
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
                    <h5 className='bgcol p-2 text-light text-center mt-1'>News letters</h5>
                    <div className="table-responsive tablu">
                        <table className="table table-sm">
                            <tbody>
                                <tr>
                                    <th>Sr No </th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                                {
                                    newsletters.map((item, i) => {
                                        return <tr key={i}>
                                            <th>{item._id}</th>
                                            <th>{item.name}</th>
                                            <th>{item.email}</th>
                                            <th><button className='bgcol text-light btn btn-sm w-100' onClick={() => deleteNewsletterOne(item._id)}><DeleteIcon ></DeleteIcon > </button></th>
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

