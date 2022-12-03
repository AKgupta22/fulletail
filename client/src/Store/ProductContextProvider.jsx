import React, { createContext } from 'react'
export const ProductContext = createContext()
async function Addproduct(item) {
    let response = await fetch("/product", {
        method: "post",
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")

        },
        body: item
    })
    return await response.json()
}
async function getAllproduct() {
    let response = await fetch("/product", {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()
}

async function getOneproduct(_id) {
    let response = await fetch("/product/" + _id, {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()
}

async function SearchProduct(keyword) {
    let response = await fetch("/search", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ search: keyword })
    })


    return await response.json()
}

async function updateproduct(item, _id) {
    let response = await fetch("/product/" + _id, {
        method: "put",
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")

        },
        body: item
    })
    return await response.json()
}

async function deleteproduct(_id) {
    if (window.confirm("Are you sure want to delete this product")) {
        let response = await fetch("/product/" + _id, {
            method: "delete",
            headers: {
                "authorization": localStorage.getItem("token"),
                "username": localStorage.getItem("username")
            }
        })

        return await response.json()

    }
}
export default function ProductContextProvider(props) {
    return (
        <ProductContext.Provider value={
            {
                Addproduct: Addproduct,
                getAllproduct: getAllproduct,
                updateproduct: updateproduct,
                deleteproduct: deleteproduct,
                getOneproduct: getOneproduct,
                SearchProduct: SearchProduct

            }
        }>
            {props.children}
        </ProductContext.Provider>
    )
}
