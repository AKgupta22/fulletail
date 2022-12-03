import React, { createContext } from 'react'
export const MainCategory = createContext()
async function Addmaincategory(item) {
    let response = await fetch("/maincategory", {
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

async function getAllmaincategory() {
    let response = await fetch("/maincategory", {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()
}

async function updatemaincategory(edit, item) {
    let response = await fetch("/maincategory/" + edit._id, {
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

async function deletemaincategory(_id) {
    if (window.confirm("Are you sure want to delete this category")) {
        let response = await fetch("/maincategory/" + _id, {
            method: "delete",
            headers: {
                "authorization": localStorage.getItem("token"),
                "username": localStorage.getItem("username")
            }
        })

        return await response.json()
    
    }}
    export default function MainCategoryContext(props) {
        return (
            <MainCategory.Provider value={
                {
                    Addmaincategory: Addmaincategory,
                    getAllmaincategory: getAllmaincategory,
                    updatemaincategory: updatemaincategory,
                    deletemaincategory:deletemaincategory
                }
            }>
                {props.children}
            </MainCategory.Provider>
        )
    }
