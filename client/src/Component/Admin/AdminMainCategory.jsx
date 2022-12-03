import React, { useState, useEffect, useContext } from 'react'
import LeftNav from './LeftNav'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Link,useNavigate } from 'react-router-dom';
import { MainCategory } from '../../Store/MainCategoryContext';
export default function AdminMainCategory() {
    let Navigate=useNavigate()
    let { getAllmaincategory, updatemaincategory, deletemaincategory } = useContext(MainCategory)
    let [edit, setedit] = useState("")
    let [newdata, setnewdata] = useState("")
    let [main, setmain] = useState([])
    let deletemc = async (_id) => {
        let response = await deletemaincategory(_id)
        if (response.result === "Done")
            getAPIData()
        else
            alert(response.message)

    }
    function Getdata(e) {
        setnewdata(e.target.value)

    }
    async function EditData() {
        let item = {
            name: newdata
        }
        let response = await updatemaincategory(edit, item)
        if (response.result === "Done") {
            getAPIData()
            setnewdata("")
        }
        else
            alert(response.message)

    }

    let getAPIData = async () => {
        let response = await getAllmaincategory()
        if (response.result === "Done")
            setmain(response.data)
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
                    <h5 className='bgcol p-2 text-light text-center mt-1'>Main Category <Link to="/add-mc" className='text-light'> <AddIcon /> </Link> </h5>
                    <div className="table-responsive tablu">
                        <table className="table ">
                            <tbody>
                                <tr>
                                    <th>Sr No </th>
                                    <th>Category Name</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {
                                    main.map((item, i) => {
                                        return <tr key={i}>
                                            <th>{item._id}</th>
                                            <th>{item.name}</th>
                                            <th><button className='bgcol text-light btn btn-sm w-100' type="button" data-bs-toggle="modal" data-bs-target="#UpdateModal" onClick={() => setedit(item)}><EditIcon ></EditIcon > </button></th>
                                            <th><button className='bgcol text-light btn btn-sm w-100' onClick={() => deletemc(item._id)}><DeleteIcon ></DeleteIcon > </button></th>
                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>


                    <div className="modal fade" id="UpdateModal" tabIndex="-1" aria-labelledby="UpdateModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit {edit.name} Category</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-2">
                                        <label className="form-label">Id</label>
                                        <input type="text" className="form-control" id="_id" value={edit._id} disabled />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">New name</label>
                                        <input type="text" className="form-control" id="mc" placeholder='enter name' value={newdata} onChange={Getdata} />
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

            </div>
        </div>
    )
}

