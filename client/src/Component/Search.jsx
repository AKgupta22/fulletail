import { useState } from "react"
import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Search() {
    let Navigate = useNavigate()
    const [search, setsearch] = useState("None")
    const PostData = async (e) => {
        e.preventDefault()
        Navigate(`/Shop/All/All/All/${search}`)


    }
    return (
        <>
            <div className="container-fluid mt-2 mb-2">
                <form className="d-flex" role="search" onSubmit={PostData}>
                    <input className="form-control me-2" type="search" placeholder="Search Product...." aria-label="Search" required onChange={(e) => setsearch(e.target.value)} />
                    <button className=" bgcol btn text-light" type="submit">Search</button>
                </form>
            </div>
        </>
    )
}
