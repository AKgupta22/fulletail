import React, { createContext } from 'react'
export const CartContext = createContext()
async function Addcart(item) {
    let response = await fetch("/cart", {
        method: "post",
        headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")

        },
        body: JSON.stringify(item)
    })
    return await response.json()
}

async function getSinglecart(_id) {
    let response = await fetch("/cart/" + _id, {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()
}

async function getAllcartUserid() {
    let response = await fetch("/cartAll/" + localStorage.getItem("username"), {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()
}

async function updatecart(item) {
    let response = await fetch("/cart/" + item._id, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")

        },
        body: JSON.stringify(item)
    })
    return await response.json()
}

async function deletecart(_id) {
    if (window.confirm("Are you sure want to delete this item")) {
        let response = await fetch("/cart/" + _id, {
            method: "delete",
            headers: {
                "authorization": localStorage.getItem("token"),
                "username": localStorage.getItem("username")
            }
        })

        return await response.json()

    }
}
export default function CartContextProvider(props) {
    return (
        <CartContext.Provider value={
            {
                Addcart: Addcart,
                getAllcartUserid: getAllcartUserid,
                updatecart: updatecart,
                deletecart: deletecart,
                getSinglecart:getSinglecart
            }
        }>
            {props.children}
        </CartContext.Provider>
    )
}
