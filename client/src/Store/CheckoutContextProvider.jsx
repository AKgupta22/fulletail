import React, { createContext } from 'react'
export const CheckoutContext = createContext()
async function Addcheckout(item) {
    let response = await fetch("/checkout", {
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
async function getAllcheckout() {
    let response = await fetch("/checkout", {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()
}

async function getOnecheckout(_id) {
    let response = await fetch("/checkout/" + _id, {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()
}

async function getOneUsercheckout() {
    let response = await fetch("/checkoutuser/" + localStorage.getItem("username"), {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()
}

async function updatecheckout(item, _id) {
    let response = await fetch("/checkout/" + _id, {
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

async function deletecheckout(id) {
    if (window.confirm("Are you sure want to delete this order")) {
        let response = await fetch("/checkout/" + id, {
            method: "delete",
            headers: {
                "authorization": localStorage.getItem("token"),
                "username": localStorage.getItem("username")

            }
        })
        return await response.json()
    }
}


export default function CheckoutContextProvider(props) {
    return (
        <CheckoutContext.Provider value={
            {
                Addcheckout: Addcheckout,
                getAllcheckout: getAllcheckout,
                updatecheckout: updatecheckout,
                getOnecheckout: getOnecheckout,
                getOneUsercheckout: getOneUsercheckout,
                deletecheckout: deletecheckout
            }
        }>
            {props.children}
        </CheckoutContext.Provider>
    )
}
