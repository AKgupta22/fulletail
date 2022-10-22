import React, { useState, useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { ContactContext } from '../Store/ContactContextProvider'
import { UserContext } from '../Store/UserContextProvider'
export default function Contact() {
    const { Addcontact } = useContext(ContactContext)
    let { getOneuser } = useContext(UserContext)
    const [user, setuser] = useState({ name: "", email: "", mobile: "" })
    const [FormData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        subject: "Query",
        message: ""

    })
    const [Button, setButton] = useState("Send Query")
    const [isDisabled, setisDisabled] = useState(false)
    const GetData = (e) => {
        let name = e.target.name
        let value = e.target.value
        setFormData((OLD) => {
            return {
                ...OLD,
                [name]: value
            }
        })
    }

    const PostData = async (e) => {
        e.preventDefault()
        setButton("Sending....")
        let response = await Addcontact(FormData)
        if (response.result === "Done") {
            setButton("Send Query")
            alert(response.message)
            setFormData({
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                subject: "",
                message: ""

            })
        }
        else {
            setButton("Send Query")
            alert(response.message)
        }

    }

    let Getapidata = async () => {
        let response = await getOneuser()
        if (response.result === "Done") {
            setuser(response.data)
            setFormData({
                name: response.data.name,
                email: response.data.email,
                mobile: response.data.mobile
            })
            setisDisabled(true)
        }
        else
            alert(response.message)

    }

    useEffect(() => {
        if (localStorage.getItem("username"))
            Getapidata()
    }, [])
    return (
        <>
            <div className="container-fluid">


                <Grid container spacing={2} width="98%">

                    <Grid item md={6} xs={12}>
                        <h5 className=' text-success text-center mt-1 mb-1 p-3 dark'>Contact Us</h5>

                        <div className="container-fluid mt-2 ">

                            <div className="card dark">
                                <iframe title="map" width="100%" height="100%" id="gmap_canvas" src={`https://maps.google.com/maps?q=28.592189,77.309261&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"> </iframe>
                                <div className="card-body">
                                    <h5 className="card-title">Address: </h5>
                                    <p className="card-text">Shiv Mandir Block A,New Ashok Nagar ,DL-110096</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Mob: 8853049148</li>
                                    <li className="list-group-item">WhatsApp: 8853049148</li>
                                    <li className="list-group-item">Email- ag565609@gmail.com</li>
                                </ul>
                            </div>

                        </div>
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <h5 className=' text-success text-center mt-1 mb-1 p-3 dark'>Fill Form</h5>
                        <form onSubmit={PostData}>
                            <div className="mt-2 mb-3">
                                <input type="text" name='name' className="form-control" required value={FormData.name} onChange={GetData} placeholder="Enter your name" disabled={isDisabled} />
                            </div>
                            <div className="mb-2">
                                <input type="email" name='email' className="form-control" required value={FormData.email} onChange={GetData} placeholder="Enter your email" disabled={isDisabled} />
                            </div>
                            <div className="mb-2">
                                <input type="text" name='mobile' className="form-control" required value={FormData.mobile} onChange={GetData} placeholder="Enter your mobile no" disabled={isDisabled} />
                            </div>
                            <div className="mb-2">
                                <input type="text" name='subject' className="form-control" required value={FormData.subject} onChange={GetData} placeholder="Enter subject" />
                            </div>
                            <div className="mb-2">
                                <textarea type="text" style={{ resize: "none" }} name='message' rows={5} cols={5} className="form-control" required defaultValue={FormData.message} onChange={GetData} placeholder="Your message">
                                </textarea>
                            </div>
                            <button type='sumbit' className='bg-success btn btn-sm text-light text-center mt-2 mybtn'>{Button}</button>
                        </form>
                    </Grid>

                </Grid>
            </div>

        </>
    )
}
