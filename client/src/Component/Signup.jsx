import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
import { UserContext } from '../Store/UserContextProvider'
export default function Signup() {
    const [spinner, setspinner] = useState(false)
    const Navigate = useNavigate()
    const { Adduser } = useContext(UserContext)
    const [error, seterror] = useState("")
    const [validateError, setvalidateError] = useState({})
    const [isSubmit, setisSubmit] = useState(false)
    let [register, setregister] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    })
    function Getdata(e) {
        let name = e.target.name
        let value = e.target.value
        setregister((olddata) => {

            return {
                ...olddata,
                [name]: value
            }
        })
    }
    const Validate = (Data) => {
        let errors = {}
        let emailReg = /(.+)@(.+){2,}\.(.+){2,}/
        let nameReg = new RegExp('[a-z]{3,}')
        let phoneReg = new RegExp('[6-9]{1}[1-9]{1}[0-9]{8}')
        if (!Data.email)
            errors.email = "Email is required"
        else if (emailReg.test(Data.email) === false)
            errors.email = "Enter Valid Email Address"
        if (!Data.name)
            errors.name = "name is required"
        else if (nameReg.test(Data.name) === false)
            errors.name = "Enter valid name"
        if (!Data.phone)
            errors.phone = "Mobile no is required"
        else if (phoneReg.test(Data.phone) === false)
            errors.phone = "Enter Valid mobile number"
        if (!Data.username)
            errors.username = "Username is required"
        if (!Data.password)
            errors.password = "Password is required"
        if (!Data.cpassword)
            errors.cpassword = "Confirm Password is required"
        return errors
    }
    function PostData(e) {
        e.preventDefault()
        setvalidateError(Validate(register))
        setisSubmit(true)
    }
    const CallApiForRegister = async () => {
        setspinner(true)
        if (register.password === register.cpassword) {
            let item = {
                name: register.name,
                username: register.username,
                email: register.email,
                mobile: register.phone,
                password: register.password
            }
            let response = await Adduser(item)
            if (response.result === "Done") {
                Navigate("/Login")
            }
            else
                setspinner(false)
            seterror(response.message)
        }
        else {
            setspinner(false)
            seterror("Confirm password and password mismatch")
        }
    }
    useEffect(() => {
        if (Object.keys(validateError).length === 0 && isSubmit) {
            CallApiForRegister()
        }
    }, [validateError])
    return (
        <>
            <Grid container spacing={2}>

                <Grid item md={2} xs={12}>
                </Grid>
                <Grid item md={8} xs={12}>
                    <h5 className="bgcol text-light text-center p-3 mt-2">SignUp Section</h5>
                    <h6 className='text-danger text-center mb-1 mt-1'>{error}</h6>
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
                            required
                            id="outlined-name-input"
                            label="Name"
                            type="text"
                            autoComplete="current-name"
                            placeholder="Enter name"
                            name="name"
                        />
                        <h6 className='text-danger mb-1 mt-1'>{validateError?.name}</h6>
                        <TextField
                            onChange={Getdata}
                            required
                            id="outlined-username-input"
                            label="UserName"
                            type="text"
                            autoComplete="current-Username"
                            placeholder="Enter Username"
                            name="username"
                        />
                        <h6 className='text-danger mb-1 mt-1'>{validateError?.username}</h6>

                        <TextField
                            onChange={Getdata}
                            required
                            id="outlined-email-input"
                            label="Email id"
                            type="email"
                            autoComplete="current-email"
                            placeholder="Enter email id"
                            name="email"
                        />
                        <h6 className='text-danger mb-1 mt-1'>{validateError?.email}</h6>
                        <TextField
                            onChange={Getdata}
                            required
                            id="outlined-phone-input"
                            label="Phone no"
                            type="text"
                            autoComplete="current-phone"
                            placeholder="Enter Phone no"
                            name="phone"
                        />
                        <h6 className='text-danger mb-1 mt-1'>{validateError?.phone}</h6>
                        <TextField
                            onChange={Getdata}
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            name="password"
                        />
                        <h6 className='text-danger mb-1 mt-1'>{validateError?.password}</h6>

                        <TextField
                            onChange={Getdata}
                            required
                            id="outlined-cpassword-input"
                            label="Confirm Password "
                            type="password"
                            autoComplete="current-cpassword"
                            placeholder="Confirm Password"
                            name="cpassword"
                        />
                        <h6 className='text-danger mb-1 mt-1'>{validateError?.cpassword}</h6>

                        {spinner === false && <Button type="sumbit" variant="contained" className="bgcol textcol" onClick={PostData}>Sign-up</Button>}
                        {spinner === true && <Spinner />}
                        <Link to="/Login" style={{ color: "black", textDecoration: "none" }}> Existing User? Login now</Link>

                    </Box>


                </Grid>
                <Grid item md={2} xs={12}>
                </Grid>

            </Grid>

        </>
    )
}
