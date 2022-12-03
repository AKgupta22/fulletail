import React, { useState, useEffect, useContext } from 'react'
import LeftNav from './LeftNav'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'
import { ContactContext } from '../../Store/ContactContextProvider';
export default function AdminContact() {
    const { getAllcontact, deletecontact, updatecontact } = useContext(ContactContext)
    let Navigate = useNavigate()
    const [contact, setcontact] = useState([])
    const [editone, seteditone] = useState({})
    const [status, setstatus] = useState({
        status: "",
        reply: ""
    })
    async function deletecontactOne(_id) {
        let response = await deletecontact(_id)
        if (response.result === "Done")
            getAPIData()
        else
            alert(response.message)

    }
    let getAPIData = async () => {
        let response = await getAllcontact()
        if (response.result === "Done")
            setcontact(response.data)
        else
            alert(response.message)
    }

    const Getdata = (e) => {
        let name = e.target.name
        let value = e.target.value
        setstatus((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    const EditData = async (e) => {
        e.preventDefault()
        let response = await updatecontact(editone._id, status)
        if (response.result === "Done") {
            getAPIData()
            setstatus({
                status: "",
                reply: ""
            })
        }
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
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile no</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                    <th>Reply</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {
                                    contact.map((item, i) => {
                                        return <tr key={i}>
                                            <th>{item._id}</th>
                                            <th>{item.name}</th>
                                            <th>{item.email}</th>
                                            <th>{item.mobile}</th>
                                            <th>{item.subject}</th>
                                            <th>{item.status}</th>
                                            <th> <textarea className='form-control' style={{ resize: "none" }} cols="15" rows="5" disabled defaultValue={item.reply}></textarea> </th>
                                            <th><button className='bgcol text-light btn btn-sm w-100' onClick={() => seteditone(item)} data-bs-toggle="modal" data-bs-target="#UpdateModal"><EditIcon ></EditIcon> </button></th>
                                            <th><button className='bgcol text-light btn btn-sm w-100' onClick={() => deletecontactOne(item._id)}><DeleteIcon ></DeleteIcon> </button></th>
                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <div className="modal fade" id="UpdateModal" tabIndex="-1" aria-labelledby="UpdateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Query id {editone._id}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <div className="mb-2">
                                        <label className="form-label">name</label>
                                        <input type="text" className="form-control" id="name" disabled value={editone.name} />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="mb-2">
                                        <label className="form-label">Change Status</label>
                                        <select value={status.status} className="form-control" name="status" onChange={Getdata} required>
                                            <option value="Seen by Admin" defaultChecked> Select</option>
                                            <option value="Resolved"> Resolved</option>
                                            <option value="Under Process"> Under Process</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <div className="mb-2">
                                        <label className="form-label">Customer Query</label>
                                        <textarea type="text" className="form-control" rows={3} style={{ resize: "none" }} defaultValue={editone.message} disabled>
                                        </textarea>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="mb-2">
                                        <label className="form-label">Reply</label>
                                        <textarea type="text" value={status.reply} className="form-control" name="reply" rows={3} style={{ resize: "none" }} onChange={Getdata} required>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={EditData} data-bs-dismiss="modal" >Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
