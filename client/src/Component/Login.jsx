import React, { useState, useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import { UserContext } from '../Store/UserContextProvider'
export default function Login() {
    const { UserLogin } = useContext(UserContext)
    const [spinner, setspinner] = useState(false)
    let [login, setlogin] = useState({
        username: "",
        password: ""
    })
    let Navigate = useNavigate()
    function Getdata(e) {
        let name = e.target.name
        let value = e.target.value
        setlogin((olddata) => {
            return {
                ...olddata,
                [name]: value
            }
        })
    }
    async function PostData(e) {
        e.preventDefault()
        setspinner(true)
        let item = {
            username: login.username,
            password: login.password
        }
        let response = await UserLogin(item)
        if (response.result === "Done") {
            localStorage.setItem("login", true)
            localStorage.setItem("username", response.data.username)
            localStorage.setItem("name", response.data.name)
            localStorage.setItem("userid", response.data._id)
            localStorage.setItem("token", response.token)
            if (response.data.role === "admin") {
                localStorage.setItem("role", response.data.role)
                Navigate('/Admin')
            }
            else
                Navigate("/profile")
        }
        else {
            setspinner(false)
            alert(response.message)
        }

    }

    useEffect(() => {
        if (localStorage.getItem("username"))
        Navigate("/Profile")
    }, [])
    return (
        <>
            <Grid container spacing={2} style={{ minHeight: "80vh" }}>

                <Grid item md={2} xs={12}>
                </Grid>
                <Grid item md={8} xs={12}>
                    <h5 className="bgcol text-light text-center p-3 mt-2">Login Section</h5>


                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '98%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <TextField
                            onChange={Getdata}
                            id="outlined-username-input"
                            label="UserName*"
                            type="text"
                            autoComplete="current-username"
                            placeholder="Enter your username"
                            name="username"
                        />
                        <TextField
                            onChange={Getdata}
                            id="outlined-password-input"
                            label="Password*"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            name="password"
                        />
                        {spinner === false && <Button type="sumbit" variant="contained" className="bgcol textcol" onClick={PostData}>Login</Button>}
                        {spinner === true && <Spinner />}
                        <div className="d-flex justify-content-between">
                            <Link to="/reset-password" style={{ color: "black", textDecoration: "none" }}> Forget Password </Link>
                            <Link to="/Signup" style={{ color: "black", textDecoration: "none" }}> New User? Create an account </Link>
                        </div>
                    </Box>

                </Grid>
                <Grid item md={2} xs={12}>
                </Grid>

            </Grid>

        </>
    )
}
