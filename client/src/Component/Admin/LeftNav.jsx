import React from 'react'
import { Link } from 'react-router-dom'
export default function LeftNav() {
    return (
        <>

            <div className="list-group">
                <h5 className='bgcol text-light text-center p-2 mt-1'>Menu </h5>
                <Link to="/Admin" className="list-group-item list-group-item-action">Home</Link>
                <Link to="/admin-users" className="list-group-item list-group-item-action">Users</Link>
                <Link to="/admin-mc" className="list-group-item list-group-item-action">Main Category</Link>
                <Link to="/admin-sc" className="list-group-item list-group-item-action">Sub-Category</Link>
                <Link to="/admin-brand" className="list-group-item list-group-item-action">Brands</Link>
                <Link to="/admin-products" className="list-group-item list-group-item-action">Products</Link>
                <Link to="/admin-checkouts" className="list-group-item list-group-item-action">Orders</Link>
                <Link to="/admin-newsletters" className="list-group-item list-group-item-action">NewsLetters</Link>
                <Link to="/admin-contact" className="list-group-item list-group-item-action">Contact Query</Link>
            </div>

        </>
    )
}
