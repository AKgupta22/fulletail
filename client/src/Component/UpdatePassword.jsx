import React, { useState, useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Store/UserContextProvider'
export default function UpdatePassword() {
    const { getOneuser, updatpassword, UserLogoutAll } = useContext(UserContext)
    const [user, setuser] = useState({})
    let Navigate = useNavigate()
    let [update, setupdate] = useState({
        password: "",
        cpassword: ""

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

    async function LogoutAll() {
        let item = {
            username: localStorage.getItem("username"),
            token: localStorage.getItem("token")
        }
        let response = await UserLogoutAll(item)
        if (response.result === "Done") {
            localStorage.clear()
            Navigate("/Login")
        }
        else
            alert(response.message)
    }

    async function PostData(e) {
        e.preventDefault()
        if (update.password === update.cpassword) {
            let item = {
                username: user.username,
                password: update.password
            }
            let response = await updatpassword(item)
            if (response.result === "Done")
                LogoutAll()
            else
                alert(response.message)
        }
        else {
            alert("New Password and Confirm New Password mismatch")
        }


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
                    <h5 className="bgcol text-light text-center p-3 mt-2">Update your password</h5>
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
                            id="outlined-name"
                            type="text"
                            autoComplete="current-name"
                            disabled
                            value={user.name}
                        />
                        <TextField
                            onChange={Getdata}
                            id="outlined-password-input"
                            label="New Password"
                            type="password"
                            placeholder="Enter new password"
                            name="password"
                        />
                        <TextField
                            onChange={Getdata}
                            id="outlined-password-input"
                            label="Confirm Password"
                            type="password"
                            placeholder="Re-enter new password"
                            name="cpassword"
                        />
                        <Button type="sumbit" variant="contained" className="bgcol textcol" onClick={PostData}>Update</Button>
                        <Link to="/Profile" style={{ color: "black", textDecoration: "none" }}>My Account</Link>

                    </Box>


                </Grid>
                <Grid item md={2} xs={12}>
                </Grid>

            </Grid>

        </>
    )
}
