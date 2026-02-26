import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function SignUp() {

  const navigate = useNavigate()
  const [userName, setUserName]= useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [address, setAddress] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const cust_id = localStorage.getItem("customer_id")

  const handleInsertData = async() => {
    if(userName === '' || email === '' || phone === '' || password === '' || city === '' || state === '' || address === '' || confirmPassword === ''){
      alert("Enter valid data")
      return
    }
    if(password === confirmPassword){
     const payload = {
        "name": userName,
        "email": email,
        "mobile_no": phone,
        "city": city,
        "state": state,
        "address": address,
        "password": password,
        "entry_by": cust_id
      }
      const res = await axios.post('http://localhost:1700/backend/customer', payload)
      if(res.status === 200){
        alert("Your account created successfully")
      }
      console.log(res.data)
      setUserName('')
      setEmail('')
      setPhone('')
      setCity('')
      setState('')
      setAddress('')
      setPassword('')
      setConfirmPassword('')
      navigate('/login')
    }
    else{
      alert("Please enter correct password")
    }
  }
  return (
    <div className="signup-div">
      <div className="signup-1">
        <div>
          <span className="signup1-span1">Looks like you're new here!</span><br />
          <span className="signup1-span2">Sign up with your mobile number to get started</span>
        </div>
        <img src="img/login-img.png" alt="login-img" />
      </div>
      <div className="signup-2">
        <div className="signup-span">Sign Up</div>
        <form action="#">
          <input type="text" name="text" id="text" placeholder="Your Username" className="form-control signup-input" value={userName} onChange={(e) => (setUserName(e.target.value))}/>

          <input type="email" name="email" id="email" placeholder="Your Email" className="form-control signup-input" value={email} onChange={(e) => (setEmail(e.target.value))}/>

          <input type="text" name="phone" id="phone" placeholder="Your Mobile Number" className="form-control signup-input" value={phone} onChange={(e) => (setPhone(e.target.value))}/>

          <input type="text" name="city" id="city" placeholder="Your City" className="form-control signup-input" value={city} onChange={(e) => (setCity(e.target.value))}/>

          <input type="text" name="state" id="state" placeholder="Your State" className="form-control signup-input" value={state} onChange={(e) => (setState(e.target.value))}/>

          <textarea name="address" id="address" placeholder='Your Address' className="form-control signup-input" value={address} onChange={(e) => (setAddress(e.target.value))}></textarea>

          <input type="password" name="password" id="password" placeholder="Your Password" className="form-control signup-input" value={password} onChange={(e) => (setPassword(e.target.value))}/>

          <input type="password" name="cpassword" id="cpassword" placeholder="Confirm Password" className="form-control signup-input" value={confirmPassword} onChange={(e) => (setConfirmPassword(e.target.value))}/>

          <Link to='/forgot-password' className="forgot-pwd">Forgot Password?</Link>

          <button type="button" className="signup-btn" onClick={handleInsertData}>Sign Up</button>

          <span className="signup-last-span">Already have an account? <Link to='/login' className="signup-last-link">Sign In</Link></span>
        </form>
      </div>
    </div>
  );
}
