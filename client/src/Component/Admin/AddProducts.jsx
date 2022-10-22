import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LeftNav from './LeftNav'
import AddIcon from '@mui/icons-material/Add';
import { MainCategory } from '../../Store/MainCategoryContext';
import { SubCategory } from '../../Store/SubCategoryContext';
import { Brand } from '../../Store/BrandContext';
import { ProductContext } from '../../Store/ProductContextProvider';
import Spinner from '../Spinner'
import { useEffect } from 'react';
export default function AddProducts() {
  let Navigate = useNavigate()
  const [spinner, setspinner] = useState(false)
  let [maincategory, setmaincategory] = useState([])
  let [subcategory, setsubcategory] = useState([])
  let [brand, setbrand] = useState([])
  let { getAllmaincategory } = useContext(MainCategory)
  let { getAllsubcategory } = useContext(SubCategory)
  let { getAllbrand } = useContext(Brand)
  let { Addproduct } = useContext(ProductContext)
  let [newproduct, setnewproduct] = useState({
    name: "",
    color: "",
    size: "",
    brand: "",
    mc: "",
    sc: "",
    baseprice: "",
    finalprice: "",
    discount: "",
    description: "Not provided",
    stock: "",
    pic1: "",
    pic2: "",
    pic3: "",
    pic4: ""

  })
  function Getdata(e) {
    let name = e.target.name
    let value = e.target.value
    setnewproduct((olddata) => {
      return {
        ...olddata,
        [name]: value
      }
    })
  }
  function Getfile(e) {

    let name = e.target.name
    let value = e.target.files[0]
    setnewproduct((olddata) => {
      return {
        ...olddata,
        [name]: value
      }
    })
  }
  async function PostData(e) {
    e.preventDefault()
    setspinner(true)
    newproduct.finalprice = parseInt(newproduct.baseprice - newproduct.baseprice * newproduct.discount / 100)
    let formData = new FormData()
    formData.append('name', newproduct.name)
    formData.append('maincategory', newproduct.mc)
    formData.append('subcategory', newproduct.sc)
    formData.append('brand', newproduct.brand)
    formData.append('color', newproduct.color)
    formData.append('size', newproduct.size)
    formData.append('baseprice', newproduct.baseprice)
    formData.append('finalprice', newproduct.finalprice)
    formData.append('discount', newproduct.discount)
    formData.append('discription', newproduct.description)
    formData.append('stock', newproduct.stock)
    formData.append('pic1', newproduct.pic1)
    formData.append('pic2', newproduct.pic2)
    formData.append('pic3', newproduct.pic3)
    formData.append('pic4', newproduct.pic4)
    let response = await Addproduct(formData)
    if (response.result === "Done")
      Navigate("/admin-products")
    else {
      setspinner(false)
      alert(response.message)
    }
  }

  let getApiData = async () => {
    let response1 = await getAllmaincategory()
    setmaincategory(response1.data)
    let response2 = await getAllsubcategory()
    setsubcategory(response2.data)
    let response3 = await getAllbrand()
    setbrand(response3.data)
  }

  useEffect(() => {

    if (localStorage.getItem("role") === "admin") {

      getApiData()
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
          <h5 className='bgcol p-2 text-light text-center mt-1'>Add Products</h5>
          <form onSubmit={PostData}>
            <div className="mb-1">
              <label className="form-label">Product Name*</label>
              <input type="text" className="form-control" onChange={Getdata} name="name" required />
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-6 col-12">
                <label className="form-label">Size*</label>
                <select name="size" className='form-select' onChange={Getdata} required>
                  <option defaultChecked>Select</option>
                  <option value="M">XS</option>
                  <option value="M">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
              <div className="col-md-3 col-sm-6 col-12">
                <label className="form-label">Brand*</label>
                <select name="brand" className='form-select' onChange={Getdata} required>
                  <option defaultChecked>Select</option>
                  {
                    brand.map((item, i) => {
                      return <option key={i} value={item.name}>{item.name}</option>
                    })
                  }
                </select>
              </div>
              <div className="col-md-3 col-sm-6 col-12">
                <label className="form-label">MainCategory*</label>
                <select name="mc" className='form-select' onChange={Getdata} required>
                  <option defaultChecked>Select</option>
                  {
                    maincategory.map((item, i) => {
                      return <option key={i} value={item.name}>{item.name}</option>
                    })
                  }
                </select>
              </div>
              <div className="col-md-3 col-sm-6 col-12">
                <label className="form-label">Sub Category*</label>
                <select name="sc" className='form-select' onChange={Getdata} required>
                  <option defaultChecked>Select</option>
                  {
                    subcategory.map((item, i) => {
                      return <option key={i} value={item.name}>{item.name}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-md-4 col-sm-6 col-12">
                <label className="form-label">Color *</label>
                <input type="text" className="form-control" onChange={Getdata} name="color" />
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <label className="form-label">&#8377; Base Price *</label>
                <input type="number" className="form-control" onChange={Getdata} name="baseprice" />
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <label className="form-label">Discount % *</label>
                <input type="number" className="form-control" onChange={Getdata} name="discount" />
              </div>
            </div>
            <div >
              <label className="form-label">Description *</label>
              <textarea style={{ resize: "none" }} type="textarea" rows={6} className="form-control" onChange={Getdata} name="description" >
              </textarea>
            </div>
            <div className="mb-1">
              <label className="form-label">In Stock *</label>
              <select name="stock" className='form-select' onChange={Getdata}>
                <option defaultChecked>Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-6 col-12">
                <label className="form-label">Pic 1 </label>
                <input type="file" className="form-control" onChange={Getfile} name="pic1" />
              </div>
              <div className="col-md-3 col-sm-6 col-12">
                <label className="form-label">Pic 2 </label>
                <input type="file" className="form-control" onChange={Getfile} name="pic2" />
              </div>
              <div className="col-md-3 col-sm-6 col-12">
                <label className="form-label">Pic 3</label>
                <input type="file" className="form-control" onChange={Getfile} name="pic3" />
              </div>
              <div className="col-md-3 col-sm-6 col-12">
                <label className="form-label">Pic 4</label>
                <input type="file" className="form-control" onChange={Getfile} name="pic4" />
              </div>
            </div>
            {spinner === true && <Spinner />}
            {spinner === false && <button type="submit" className="btn btn-primary w-100 mt-2"> <AddIcon /> </button>
            }
          </form>

        </div>
      </div>
    </div >
  )
}
