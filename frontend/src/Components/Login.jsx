import {React, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async(e) => {
    e.preventDefault();
    try{
        const res = await axios.get(`http://localhost:1700/backend/customerlogin?email=${email}&password=${password}`)
        console.log(res)

        if(res.status === 200){
          alert("Login Successfull")
          localStorage.setItem("customer_id", res.data.customer_id)
          navigate('/')
        }
        else{
          alert("Invalid email or password")
        }
    }
    catch(error){
      alert("Enter correct password and email")
    }
}
  return (
        <div className="signup-div">
      <div className="signup-1 login-signup-1">
        <span className="signup1-span1">Login</span>
        <span className="signup1-span2">Get access to your Orders, Wishlist and Recommendations</span>
        <img src="img/login-img.png" alt="login-img" />
      </div>
      <div className="signup-2 login-component">
        <div className="signup-span">Login</div>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" id="email" placeholder="Your Email" className="form-control signup-input" value={email} onChange={(e) => (setEmail(e.target.value))}/>
          <input type="password" name="password" id="password" placeholder="Your Password" className="form-control signup-input" value={password} onChange={(e) => (setPassword(e.target.value))}/>

          <Link to='/forgot-password' className='forgot-pwd'>Forgot Password?</Link>

          <button type="submit" className="signup-btn">Login</button>

          <span className="signup-last-span">Don't have an account? <Link to='/signup' className="signup-last-link">Sign Up</Link></span>
        </form>
      </div>
    </div>
  )
}
