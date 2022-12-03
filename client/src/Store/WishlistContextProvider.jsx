import React, { createContext } from 'react'
export const WishlistContext = createContext()
async function Addwishlist(item) {
    let response = await fetch("/wishlist", {
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

async function getAllwishlist() {
    let response = await fetch("/wishlistAll/" + localStorage.getItem("username"), {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()
}


async function deletewishlist(_id) {
    let response = await fetch("/wishlist/" + _id, {
        method: "delete",
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()

}

export default function WishlistContextProvider(props) {
    return (
        <WishlistContext.Provider value={
            {
                Addwishlist: Addwishlist,
                getAllwishlist: getAllwishlist,
                deletewishlist: deletewishlist
            }
        }>
            {props.children}
        </WishlistContext.Provider>
    )
}
