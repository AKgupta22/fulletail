import React, { useState, useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Store/UserContextProvider'
export default function UpdateProfile() {
    const { getOneuser, updateuser } = useContext(UserContext)
    const [user, setuser] = useState({})
    let Navigate = useNavigate()
    let [update, setupdate] = useState({
        name: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
        profile: ""

    })
    function Getdata(e) {
        let name = e.target.name
        let value = e.target.value
        setupdate((olddata) => {

            return {
                ...olddata,
                [name]: value
            }
        })
    }
    function Getfile(e) {
        let name = e.target.name
        let value = e.target.files[0]
        setupdate((olddata) => {

            return {
                ...olddata,
                [name]: value
            }
        })
    }
    async function PostData(e) {
        e.preventDefault()
        let formData = new FormData()
        formData.append('name', update.name)
        formData.append('mobile', update.phone)
        formData.append('address1', update.address1)
        formData.append('address2', update.address2)
        formData.append('city', update.city)
        formData.append('state', update.state)
        formData.append('pincode', update.pincode)
        formData.append('profile', update.profile)
        let response = await updateuser(formData, user)
        if (response.result === "Done") {
            localStorage.setItem("profile", response.data.profile)
            Navigate("/Profile")
        }
        else
            alert(response.message)


    }

    let Getapidata = async () => {
        let response = await getOneuser()
        setuser(response.data)
    }

    useEffect(() => {
        if (localStorage.getItem("username"))
            Getapidata()
        else
            Navigate("/Login")
    }, [])
    return (
        <>
            <Grid container spacing={2}>

                <Grid item md={2} xs={12}>
                </Grid>
                <Grid item md={8} xs={12}>
                    <h5 className="bgcol text-light text-center p-3 mt-2">Update your details</h5>


                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '98%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <TextField
                            id="outlined-username"
                            type="text"
                            autoComplete="current-username"
                            disabled
                            value={user.username}
                        />
                        <TextField
                            onChange={Getdata}
                            id="outlined-name-input"
                            label="Name"
                            type="text"
                            autoComplete="current-name"
                            placeholder="Enter name"
                            name="name"
                        />
                        <TextField
                            onChange={Getdata}
                            id="outlined-phone-input"
                            label="Phone no"
                            type="text"
                            autoComplete="current-phone"
                            placeholder="Enter Phone no"
                            name="phone"
                        />
                        <TextField
                            onChange={Getdata}
                            id="outlined-address-input"
                            label="Address Line 1"
                            type="text"
                            autoComplete="current-address"
                            placeholder="Enter address Line 1 "
                            name="address1"
                        />
                        <TextField
                            onChange={Getdata}
                            id="outlined-address-input"
                            label="Address Line 2"
                            type="text"
                            autoComplete="current-address"
                            placeholder="Enter address Line 2"
                            name="address2"
                        />
                        <TextField
                            onChange={Getdata}
                            id="outlined-city-input"
                            label="City"
                            type="text"
                            autoComplete="current-city"
                            placeholder="Enter city "
                            name="city"
                        />
                        <TextField
                            onChange={Getdata}
                            id="outlined-state-input"
                            label="State"
                            type="text"
                            autoComplete="current-state"
                            placeholder="Enter state "
                            name="state"
                        />
                        <TextField
                            onChange={Getdata}
                            id="outlined-pincode-input"
                            label="Pincode"
                            type="text"
                            autoComplete="current-pincode"
                            placeholder="Enter pincode no"
                            name="pincode"
                        />
                        <h6 className='bgcol text-light text-center p-1 mt-1 mb-1'>Profile pic</h6>
                        <TextField
                            onChange={Getfile}
                            id="outlined-profile"
                            type="file"
                            name="profile"
                        />
                        <Button type="sumbit" variant="contained" className="bgcol textcol" onClick={PostData}>Update Now</Button>
                        <Link to="/Profile" style={{ color: "black", textDecoration: "none" }}>My Account</Link>

                    </Box>


                </Grid>
                <Grid item md={2} xs={12}>
                </Grid>

            </Grid>

        </>
    )
}
