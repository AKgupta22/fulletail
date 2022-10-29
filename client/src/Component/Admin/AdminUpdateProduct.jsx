import React, { useState, useContext, useEffect } from 'react'
import { MainCategory } from '../../Store/MainCategoryContext';
import { SubCategory } from '../../Store/SubCategoryContext';
import { Brand } from '../../Store/BrandContext';
import { ProductContext } from '../../Store/ProductContextProvider';
import LeftNav from './LeftNav'
import { useParams, useNavigate } from 'react-router-dom'
export default function AdminUpdateProduct() {
    let { _id } = useParams()
    let Navigate = useNavigate()
    let { getOneproduct, updateproduct } = useContext(ProductContext)
    let { getAllmaincategory } = useContext(MainCategory)
    let { getAllsubcategory } = useContext(SubCategory)
    let { getAllbrand } = useContext(Brand)
    let [maincategory, setmaincategory] = useState([])
    let [subcategory, setsubcategory] = useState([])
    let [brand, setbrand] = useState([])
    let [product, setproduct] = useState({ _id: "", name: "" })
    let [newdata, setnewdata] = useState({
        name: "",
        color: "",
        size: "",
        brand: "",
        maincategory: "",
        subcategory: "",
        baseprice: "",
        finalprice: "",
        discount: "",
        discription: "",
        stock: "",
        pic1: "",
        pic2: "",
        pic3: "",
        pic4: ""

    })
    function Getdata(e) {
        let name = e.target.name
        let value = e.target.value
        setnewdata((olddata) => {
            return {
                ...olddata,
                [name]: value
            }
        })

    }
    function Getfile(e) {

        let name = e.target.name
        let value = e.target.files[0]
        setnewdata((olddata) => {
            return {
                ...olddata,
                [name]: value
            }
        })
    }
    async function PostData(e) {
        e.preventDefault()
        newdata.finalprice = parseInt(newdata.baseprice - newdata.baseprice * newdata.discount / 100)
        let formData = new FormData()
        formData.append('name', newdata.name)
        formData.append('maincategory', newdata.maincategory)
        formData.append('subcategory', newdata.subcategory)
        formData.append('brand', newdata.brand)
        formData.append('color', newdata.color)
        formData.append('size', newdata.size)
        formData.append('baseprice', newdata.baseprice)
        formData.append('finalprice', newdata.finalprice)
        formData.append('discount', newdata.discount)
        formData.append('discription', newdata.discription)
        formData.append('stock', newdata.stock)
        formData.append('pic1', newdata.pic1)
        formData.append('pic2', newdata.pic2)
        formData.append('pic3', newdata.pic3)
        formData.append('pic4', newdata.pic4)
        let response = await updateproduct(formData, product._id)
        if (response.result === "Done")
            Navigate('/admin-products')
        else
            alert(response.message)

    }
    let getApiData = async () => {
        let response = await getOneproduct(_id)
        setproduct(response.data)
        setnewdata(response.data)
        response = await getAllmaincategory()
        setmaincategory(response.data)
        response = await getAllsubcategory()
        setsubcategory(response.data)
        response = await getAllbrand()
        setbrand(response.data)
    }
    useEffect(() => {
        if (localStorage.getItem("username") && localStorage.getItem("role") === "admin")
            getApiData()
        else
            Navigate("/")
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-12">
                    <LeftNav />
                </div>
                <div className="col-md-9 col-12">
                    <h5 className="bgcol text-center text-light mt-2 mb-2 p-2">Update Product Section </h5>
                    <form onSubmit={PostData}>
                        <div className="row">
                            <div className="col-sm-4 col-12">
                                <label className="form-label">Product Id</label>
                                <input type="text" className="form-control" disabled value={product?._id} />
                            </div>
                            <div className="col-sm-4 col-12">
                                <label className="form-label">Product name</label>
                                <input type="text" className="form-control" disabled value={product?.name} />
                            </div>
                            <div className="col-sm-4 col-12">
                                <label className="form-label">New Product Name</label>
                                <input type="text" className="form-control" value={newdata.name} onChange={Getdata} name="name" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-sm-6 col-12">
                                <label className="form-label">New Size</label>
                                <select name="size" className='form-select' value={newdata.size} onChange={Getdata}>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <label className="form-label">New Brand</label>
                                <select name="brand" value={newdata.brand} className='form-select' onChange={Getdata}>
                                    {
                                        brand.map((item, i) => {
                                            return <option key={i} value={item.name}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <label className="form-label">New MainCategory *</label>
                                <select name="maincategory" className='form-select' value={newdata.maincategory} required onChange={Getdata} >
                                    {
                                        maincategory.map((item, i) => {
                                            return <option key={i} value={item.name}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <label className="form-label">New Sub Category</label>
                                <select name="subcategory" value={newdata.subcategory} className='form-select' onChange={Getdata}>
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
                                <label className="form-label">New Color</label>
                                <input type="text" className="form-control" value={newdata.color} onChange={Getdata} name="color" />
                            </div>
                            <div className="col-md-4 col-sm-6 col-12">
                                <label className="form-label">&#8377; New  Base Price*</label>
                                <input type="text" className="form-control" value={newdata.baseprice} onChange={Getdata} name="baseprice" required />
                            </div>
                            <div className="col-md-4 col-sm-6 col-12">
                                <label className="form-label">New Discount % *</label>
                                <input type="text" className="form-control" value={newdata.discount} onChange={Getdata} name="discount" required />
                            </div>
                        </div>
                        <div >
                            <label className="form-label">New Description</label>
                            <textarea style={{ resize: "none" }} type="textarea" rows={6} className="form-control" value={newdata.discription} onChange={Getdata} name="discription" >
                            </textarea>
                        </div>
                        <div className="mb-1">
                            <label className="form-label">In Stock</label>
                            <select name="stock" value={newdata.stock} className='form-select' onChange={Getdata}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="row mb-1">
                            <div className=" col-sm-6 col-12">
                                <label className="form-label">New Pic 1</label>
                                <input type="file" className="form-control" onChange={Getfile} name="pic1" />
                            </div>
                            <div className=" col-sm-6 col-12">
                                <label className="form-label">New Pic 2</label>
                                <input type="file" className="form-control" onChange={Getfile} name="pic2" />
                            </div>
                            <div className=" col-sm-6 col-12">
                                <label className="form-label">New Pic 3</label>
                                <input type="file" className="form-control" onChange={Getfile} name="pic3" />
                            </div>
                            <div className="col-sm-6 col-12">
                                <label className="form-label">New Pic 4</label>
                                <input type="file" className="form-control" onChange={Getfile} name="pic4" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-2"> Update </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
