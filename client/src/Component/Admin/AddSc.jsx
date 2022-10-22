import React, { useState, useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LeftNav from './LeftNav'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { SubCategory } from '../../Store/SubCategoryContext';
export default function AddSc() {
  let [newsc, setnewsc] = useState("")
  let Navigate = useNavigate()
  let { Addsubcategory } = useContext(SubCategory)
  function Getdata(e) {
    setnewsc(e.target.value)
  }
  async function addsc(e) {
    e.preventDefault()
    let item = {
      name: newsc
    }
    let response = await Addsubcategory(item)
    if (response.result === "Done")
      Navigate("/admin-sc")
    else
      alert(response.message)
  }
  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {

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
          <h5 className='bgcol p-2 text-light text-center mt-1'>Add SubCategory</h5>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Enter category name"
                name='newsc'
                onChange={Getdata}
              />
            </div>
            <Button className='bgcol w-100' variant="contained" onClick={addsc}><AddIcon /></Button>
          </Box>
        </div>
      </div>
    </div>
  )
}
