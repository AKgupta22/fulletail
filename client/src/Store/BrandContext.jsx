import React, { createContext } from 'react'
export const Brand = createContext()
async function Addbrand(item) {
    let response = await fetch("/brand", {
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

async function getAllbrand() {
    let response = await fetch("/brand", {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()
}

async function updatebrand(edit, item) {
    let response = await fetch("/brand/" + edit._id, {
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

async function deletebrand(_id) {
    if (window.confirm("Are you sure want to delete this category")) {
        let response = await fetch("/brand/" + _id, {
            method: "delete",
            headers: {
                "authorization": localStorage.getItem("token"),
                "username": localStorage.getItem("username")
            }
        })

        return await response.json()
    
    }}
    export default function BrandContext(props) {
        return (
            <Brand.Provider value={
                {
                    Addbrand: Addbrand,
                    getAllbrand: getAllbrand,
                    updatebrand: updatebrand,
                    deletebrand:deletebrand
                }
            }>
                {props.children}
            </Brand.Provider>
        )
    }
