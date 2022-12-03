import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LeftNav from './LeftNav'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { MainCategory } from '../../Store/MainCategoryContext';
export default function AddMc() {
  let [newmc, setnewmc] = useState("")
  let { Addmaincategory } = useContext(MainCategory)
  let Navigate = useNavigate()
  function Getdata(e) {
    setnewmc(e.target.value)
  }
  async function addmc(e) {
    e.preventDefault()
    let item = {
      name: newmc
    }
    let response = await Addmaincategory(item)
    if (response.result === "Done")
      Navigate("/admin-mc")
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
          <h5 className='bgcol p-2 text-light text-center mt-1'>Add MainCategory</h5>
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
                name='newmc'
                onChange={Getdata}
              />
            </div>
            <Button className='bgcol w-100' variant="contained" onClick={addmc}><AddIcon /></Button>
          </Box>
        </div>
      </div>
    </div>
  )
}
