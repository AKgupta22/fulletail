import React, { createContext } from 'react'
export const ContactContext = createContext()
async function Addcontact(item) {
    let response = await fetch("/contact", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(item)
    })
    return await response.json()
}

async function getAllcontact() {
    let response = await fetch("/contact", {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()
}

async function updatecontact(id, item) {
    let response = await fetch("/contact/" +id, {
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

async function deletecontact(_id) {
    if (window.confirm("Are you sure want to delete this contact query")) {
        let response = await fetch("/contact/" + _id, {
            method: "delete",
            headers: {
                "authorization": localStorage.getItem("token"),
                "username": localStorage.getItem("username")
            }
        })

        return await response.json()

    }
}
export default function ContactContextProvider(props) {
    return (
        <ContactContext.Provider value={
            {
                Addcontact: Addcontact,
                getAllcontact: getAllcontact,
                updatecontact: updatecontact,
                deletecontact: deletecontact
            }
        }>
            {props.children}
        </ContactContext.Provider>
    )
}
