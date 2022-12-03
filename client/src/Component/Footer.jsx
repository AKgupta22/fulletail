import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Footer() {
  const isNotSubsribed = localStorage.getItem("isNotSubsribed")
  const [message, setmessage] = useState("")
  const [Data, setData] = useState({
    name: "",
    email: ""
  })
  const GetData = (e) => {
    let name = e.target.name
    let value = e.target.value
    setData((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }
  const PostData = async (e) => {
    e.preventDefault()
    const item = {
      name: Data.name.toLocaleUpperCase(),
      email: Data.email
    }
    let response = await fetch("/newsletter", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(item)
    })
    response = await response.json()
    if (response.result === "Done") {
      alert(response.message)
      localStorage.setItem("isNotSubsribed", false)
      setmessage("")
    }
    else
      setmessage(response.message)

  }
  useEffect(() => {
    { }
  }, [isNotSubsribed])
  return (
    <footer className="bgcol textcol text-center p-4 mt-2">
      Copyright &copy; 2022 All Right Reserved Ecomtel
      {
        isNotSubsribed === null ? <form onSubmit={PostData}>
          <div className="mt-2 mb-2">
            <input type="text" name='name' className="form-control myform" required onChange={GetData} placeholder="Enter your name" />
          </div>
          <div className="mb-1">
            <input type="email" name='email' className="form-control myform" required onChange={GetData} placeholder="Enter your email" />
          </div>
          <button type='sumbit' className='bg-success btn btn-sm text-light text-center mt-2 mybtn'>Subscribe Now</button>
        </form> : <h6 style={{ fontSize: "18px" }} className="text-warning mytext text-center mt-1">Newsletter already subscribed</h6>

      }
      <h6 style={{ fontSize: "18px" }} className="text-warning mytext text-center mt-1">{message}</h6>
    </footer>
  )
}
