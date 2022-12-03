import React, { useState, useContext, useEffect } from 'react'
import LeftNav from './LeftNav'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Link,useNavigate } from 'react-router-dom';
import { ProductContext } from '../../Store/ProductContextProvider';
export default function AdminProducts() {
    let Navigate=useNavigate()
    let { getAllproduct, deleteproduct } = useContext(ProductContext)
    let [product, setproduct] = useState([])
    async function deleteproductOne(_id) {
        let response = await deleteproduct(_id)
        if (response.result === "Done")
            getApiData()
        else
            alert(response.message)
    }


    const getApiData = async () => {
        let response = await getAllproduct()
        setproduct(response.data)
    }
    useEffect(() => {
        if (localStorage.getItem("username") && localStorage.getItem("role") === "admin")
        getApiData()
        else
        Navigate("/")
    },[])
    return (
        <div className="container-fluid" style={{ minHeight: "78vh" }}>
            <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                    <LeftNav />
                </div>
                <div className="col-xl-10 col-lg-9 col-md-8 col-sm-6 col-12">
                    <h5 className='bgcol p-2 text-light text-center mt-1'>Products <Link to="/add-products" className='text-light'> <AddIcon /> </Link> </h5>
                    <div className="table-responsive tablu">
                        <table className="table table-sm">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Pic1</th>
                                    <th>Pic2</th>
                                    <th>Pic3</th>
                                    <th>Pic4</th>
                                    <th>Name</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Brand</th>
                                    <th>Main Category</th>
                                    <th>Sub Category</th>
                                    <th>Base Price</th>
                                    <th>Final Price</th>
                                    <th>Discount</th>
                                    <th>Stock</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {
                                    product.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item._id}</td>
                                            <td><img src={`/public/upload/product/${item.pic1}`} alt="pic.." className="rounded" style={{ width: "40px", height: "40px" }} /></td>
                                            <td><img src={`/public/upload/product/${item.pic2}`} alt="pic.." className="rounded" style={{ width: "40px", height: "40px" }} /></td>
                                            <td><img src={`/public/upload/product/${item.pic3}`} alt="pic.." className="rounded" style={{ width: "40px", height: "40px" }} /></td>
                                            <td><img src={`/public/upload/product/${item.pic4}`} alt="pic.." className="rounded" style={{ width: "40px", height: "40px" }} /></td>
                                            <td>{item.name}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                            <td>{item.brand}</td>
                                            <td>{item.maincategory}</td>
                                            <td>{item.subcategory}</td>
                                            <td>&#8377;{item.baseprice}</td>
                                            <td>&#8377;{item.finalprice}</td>
                                            <td>{item.discount}%</td>
                                            <td>{item.stock}</td>
                                            <th><Link className='bgcol text-light btn btn-sm w-100' to={`/admin-update-product/${item._id}`}><EditIcon ></EditIcon > </Link></th>
                                            <th><button className='bgcol text-light btn btn-sm w-100' onClick={() => deleteproductOne(item._id)}><DeleteIcon ></DeleteIcon > </button></th>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        </div>
    )
}

