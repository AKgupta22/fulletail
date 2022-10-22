import React, { createContext } from 'react'
export const SubCategory = createContext()
async function Addsubcategory(item) {
    let response = await fetch("/subcategory", {
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

async function getAllsubcategory() {
    let response = await fetch("/subcategory", {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()
}

async function updatesubcategory(edit, item) {
    let response = await fetch("/subcategory/" + edit._id, {
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

async function deletesubcategory(_id) {
    if (window.confirm("Are you sure want to delete this category")) {
        let response = await fetch("/subcategory/" + _id, {
            method: "delete",
            headers: {
                "authorization": localStorage.getItem("token"),
                "username": localStorage.getItem("username")
            }
        })

        return await response.json()
    
    }}
    export default function SubCategoryContext(props) {
        return (
            <SubCategory.Provider value={
                {
                    Addsubcategory: Addsubcategory,
                    getAllsubcategory: getAllsubcategory,
                    updatesubcategory: updatesubcategory,
                    deletesubcategory:deletesubcategory
                }
            }>
                {props.children}
            </SubCategory.Provider>
        )
    }
