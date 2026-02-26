import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ChangePwd() {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const cust_id = localStorage.getItem("customer_id")

  useEffect(() => {
    if(!cust_id){
      alert("Please login to change passowrd")
      navigate("/login")
      return
    }
  } , [])

  const handleUpdateData = async(cust_id) => {
    if( password != newPassword){
      if(newPassword === confirmPassword){
        const res = await axios.put(`http://localhost:1700/backend/customer/${cust_id}` , {
          "password" : confirmPassword
        })
        alert("password updated successfully")
        setPassword('')
        setNewPassword('')
        setConfirmPassword('')
        navigate('/login')
        return
        
      }
      alert("please enter correct confirm password")
    }
    alert("please enter different password")
  }
  return (
    <div className="signup-div">
      <div className="signup-1 login-signup-1">
        <span className="signup1-span1">Change Password</span>
        <span className="signup1-span2">Change your password to get started</span>
        <img src="img/login-img.png" alt="login-img" />
      </div>
      <div className="signup-2 login-component">
        <div className="signup-span">Change Password</div>
        <form action="#">
            <input type="password" name="oldpassword" id="oldpassword" placeholder="Old Password" className="form-control signup-input" onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" name="password" id="password" placeholder="New Password" className="form-control signup-input" onChange={(e) => setNewPassword(e.target.value)}/>
            <input type="password" name="cpassword" id="cpassword" placeholder="Confirm Password" className="form-control signup-input" onChange={(e) => setConfirmPassword(e.target.value)}/>


            <button type="button" className="signup-btn" onClick={() => handleUpdateData(cust_id)}>Change Password</button>

            <span className="signup-last-span">Back to <Link to='/login' className="signup-last-link"> Sign In</Link></span>
        </form>
      </div>
    </div>
  )
}
