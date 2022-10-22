import React, { useContext, useEffect, useState } from 'react'
import { WishlistContext } from '../Store/WishlistContextProvider'
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom'
export default function Wishlist() {
    let Navigate = useNavigate()
    let { getAllwishlist, deletewishlist } = useContext(WishlistContext)
    let [wishlist, setwishlist] = useState([])
    let GetApIData = async () => {
        if (localStorage.getItem("username")) {
            let response = await getAllwishlist()
            setwishlist(response.data)
        }
        else
            Navigate("/Login")
    }

    async function Delete(_id) {
        let response = await deletewishlist(_id)
        if (response.result === "Done")
            GetApIData()
        else
            alert(response.message)
    }
    useEffect(() => {
        GetApIData()
    }, [])
    return (
        <>
            <div className="container-fluid" style={{ minHeight: "78vh" }}>
                <h5 className='bgcol mt-1 text-center text-light p-3'>Wishlist</h5>
                <div className="table-responsive">
                    <table className='table table-stripped table-hover'>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th></th>
                                <th></th>


                            </tr>

                            {
                                wishlist.map((item, index) => {
                                    return <tr key={index}>
                                        <td><img src={`/public/upload/product/${item.pic1}`} alt="pic.." className="rounded" style={{ width: "80px", height: "85px" }} /></td>
                                        <td>{item.name}</td>
                                        <td>{item.color}</td>
                                        <td>{item.size}</td>
                                        <td>&#8377;{item.price}</td>
                                        <td><Link to={`/single-product/${item.productid}`} onClick={() => Delete(item._id)}>
                                            <ShoppingCartIcon></ShoppingCartIcon>
                                        </Link></td>
                                        <td><DeleteIcon onClick={() => Delete(item._id)}></DeleteIcon></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    )
}
