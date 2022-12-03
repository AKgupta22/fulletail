import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
export default function ResetPassword() {
    let [IsEmail, setIsEmail] = useState(true)
    let [IsOTP, setIsOTP] = useState(false)
    let [IsPasswordWindow, setIsPasswordWindow] = useState(false)
    let [Email, setEmail] = useState("")
    let [OTP, setOTP] = useState(0)
    let [Password, setPassword] = useState({
        newpassword: "",
        cpassword: ""
    })

    let Navigate = useNavigate()

    async function PostEmail(e) {
        e.preventDefault()
        let item = {
            email: Email
        }
        let response = await fetch("/reset-password", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        })
        response = await response.json()
        if (response.result === "Done") {
            localStorage.setItem("resetemail", Email)
            setIsEmail(false)
            setIsOTP(true)
        }
        else
            alert(response.message)

    }

    async function PostOTP(e) {
        e.preventDefault()
        let item = {
            email: localStorage.getItem("resetemail"),
            otp: parseInt(OTP)
        }
        let response = await fetch("/reset-password-otp", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        })
        response = await response.json()
        if (response.result === "Done") {
            setIsOTP(false)
            setIsEmail(false)
            setIsPasswordWindow(true)

        }
        else
            alert(response.message)

    }
    const GetPassword = (e) => {
        let name = e.target.name
        let value = e.target.value
        setPassword((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function Reset(e) {
        e.preventDefault()
        if (Password.newpassword === Password.cpassword) {
            let item = {
                email: localStorage.getItem("resetemail"),
                password: Password.newpassword
            }
            let response = await fetch("/reset-password-submit", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(item)
            })
            response = await response.json()
            if (response.result === "Done") {
                alert("Password reset successfull")
                Navigate("/Login")
            }
            else
                alert(response.message)
        }
        else
            alert("Password and Confirm Password Mismatch")

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
                    <h5 className="bgcol text-light text-center p-3 mt-2">Forget Password Section</h5>


                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '98%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        {
                            IsEmail === true && <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                id="outlined-email-input"
                                label="Email id*"
                                type="email"
                                placeholder="Enter your email to send otp"
                            />
                        }
                        {
                            IsOTP === true && <TextField
                                onChange={(e) => setOTP(e.target.value)}
                                id="outlined-OTP-input"
                                label="OTP*"
                                type="text"
                                placeholder="Enter your otp sent on email"
                            />
                        }
                        {
                            IsPasswordWindow === true && <TextField
                                name="newpassword"
                                onChange={GetPassword}
                                id="outlined-password-input"
                                label="New Password*"
                                type="password"
                                placeholder="Enter your new password to reset"
                            />
                        }
                        {
                            IsPasswordWindow === true && <TextField
                                name="cpassword"
                                onChange={GetPassword}
                                id="outlined-cpassword-input"
                                label="Confirm Password*"
                                type="password"
                                placeholder="Confirm your password"
                            />
                        }
                        {IsEmail === true && <Button variant="contained" onClick={PostEmail}> Send OTP </Button>}
                        {IsOTP === true && <Button variant="contained" onClick={PostOTP}> Validate OTP </Button>}
                        {IsPasswordWindow === true && <Button variant="contained" onClick={Reset}> Reset Password </Button>}

                    </Box>

                </Grid>
                <Grid item md={2} xs={12}>
                </Grid>

            </Grid>

        </>
    )
}
