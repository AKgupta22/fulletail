import React, { createContext } from 'react'
export const UserContext = createContext()
async function Adduser(item) {

    let response = await fetch("/user", {
        method: "post",
        headers: {

            "content-type": "application/json"

        },
        body: JSON.stringify(item)
    })

    return await response.json()
}

async function UserLogin(item) {

    let response = await fetch("/login", {
        method: "post",
        headers: {

            "content-type": "application/json"

        },
        body: JSON.stringify(item)
    })
    return await response.json()

}

async function getAlluser() {
    let response = await fetch("/user", {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()
}

async function getOneuser() {
    let response = await fetch("/user/" + localStorage.getItem("username"), {
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })

    return await response.json()
}

async function updateuser(formData, user) {
    let response = await fetch("/user/" + user._id, {
        method: "put",
        headers: {
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")

        },
        body: formData
    })
    return await response.json()
}

async function updatpassword(item) {
    let response = await fetch("/update-password", {
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


async function UserLogout(item) {

    let response = await fetch("/logout", {
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

async function UserLogoutAll(item) {
    let response = await fetch("/logoutall", {
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

async function deleteuser(_id) {
    if (window.confirm("Are you sure want to delete this category")) {
        let response = await fetch("/user/" + _id, {
            method: "delete",
            headers: {
                "authorization": localStorage.getItem("token"),
                "username": localStorage.getItem("username")
            }
        })

        return await response.json()

    }
}
export default function UserContextContext(props) {
    return (
        <UserContext.Provider value={
            {
                Adduser: Adduser,
                UserLogin: UserLogin,
                UserLogoutAll: UserLogoutAll,
                UserLogout: UserLogout,
                getAlluser: getAlluser,
                getOneuser: getOneuser,
                updateuser: updateuser,
                deleteuser: deleteuser,
                updatpassword: updatpassword
            }
        }>
            {props.children}
        </UserContext.Provider>
    )
}
