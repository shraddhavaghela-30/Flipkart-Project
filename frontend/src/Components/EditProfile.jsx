import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
export default function EditProfile() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [address, setAddress] = useState('')
  const navigate = useNavigate()

  const cust_id = localStorage.getItem("customer_id")

  useEffect(() => {
    if(!cust_id){
      alert("Please login to edit your profile")
      navigate("/login")
    }
    getEditData(cust_id)
  }, [cust_id])

  const getEditData = async(cust_id) => {
    const res = await axios.get(`http://localhost:1700/backend/customer/${cust_id}`)
    console.log(res.data)
    setName(res.data.name)
    setEmail(res.data.email)
    setPhone(res.data.mobile_no)
    setCity(res.data.city)
    setState(res.data.state)
    setAddress(res.data.address)
  }

  const handleUpdataData = async(cust_id) => {
    const payload = {
      "name": name,
      "email": email,
      "mobile_no": phone,
      "city": city,
      "state": state,
      "address": address,
      "update_by": cust_id
    }
    const res = await axios.put(`http://localhost:1700/backend/customer/${cust_id}`, payload)
    console.log(res.data)
    alert(res.data)
    setName("")
    setEmail("")
    setPhone('')
    setCity('')
    setState('')
    setAddress("")
    navigate('/')
  }
  return (
    <div className="signup-div">
      <div className="signup-1 editprofile-signup-1">
        <span className="signup1-span1">Edit your profile</span>
        <span className="signup1-span2">Keep your personal details up to date for a better shopping experience.</span>
        <img src="img/login-img.png" alt="login-img" />
      </div>
      <div className="signup-2">
        <div className="signup-span">Edit Profile</div>
        <form action="#">

          <input type="text" name="text" id="text" placeholder="Your Username" className="form-control signup-input" value={name} onChange={(e) => (setName(e.target.value))}/>

          <input type="email" name="email" id="email" placeholder="Your Email" className="form-control signup-input" value={email} onChange={(e) => (setEmail(e.target.value))}/>

          <input type="text" name="phone" id="phone" placeholder="Your Mobile Number" className="form-control signup-input" value={phone} onChange={(e) => (setPhone(e.target.value))}/>

          <input type="text" name="city" id="city" placeholder="Your City" className="form-control signup-input" value={city} onChange={(e) => (setCity(e.target.value))}/>

          <input type="text" name="state" id="state" placeholder="Your State" className="form-control signup-input" value={state} onChange={(e) => (setState(e.target.value))}/>

          <textarea name="address" id="address" placeholder='Your Address' className="form-control signup-input" value={address} onChange={(e) => (setAddress(e.target.value))}></textarea>

          <button type="button" className="signup-btn" onClick={() => {handleUpdataData(cust_id)}}>Save Changes</button>
        </form>
      </div>
    </div>
  )
}
