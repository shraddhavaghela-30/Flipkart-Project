import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async(e) => {
    e.preventDefault()
    try{
      const res = await axios.get(`http://localhost:1700/backend/login?email=${email}&password=${password}`)
      console.log(res.data)
      if(res.status === 200){
        alert("Login Successfull")
        localStorage.setItem("admin_id", res.data.admin_id)
        navigate('/dashboard')
      }
      else{
        alert("Invalied email or password")
      }
    }
    catch(error){
      alert(error)
      console.log(error)
    }
  }
  return (
    
        <form onSubmit={handleLogin} className='login-page-div'>
            <div className='login-page-logo'>
              <img src="/flipkart-admin.jpeg" alt="" className='flipkart-admin-logo'/>
            </div>

          <div className='login-div'>
            <div>
              <div className='login-page login-info-div'>
                  
                    <h2 className="login-heading"><i class="fa-solid fa-user"></i>&nbsp; Admin Login</h2>
                  
                  <div>
                    <label>Email:</label>
                    <input type="email" name="email" id="email" className='login-inputs'  value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div>
                    <label>Password:</label>
                    <input type="password" name="password" id="password" className='login-inputs' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <a className='forgot-pwd' href="#">Forgot Password?</a>
                  </div>
                  <button type="submit" className='form-control submit-btn'>Login</button>
              </div>
            </div>
          </div>
        </form>

    //     <div className="login-page-main">

    //       <div className="login-image">
    //         <img src="/flipkart-admin.jpeg" alt="flipcart" />
    //       </div>

    //       <div className="login-data">
    //           <h2 className="login-heading"><i class="fa-solid fa-user"></i>&nbsp; Admin Login</h2>
            
            
    //         <form className="form-columns" onSubmit={handleLogin}>

    //           <input type="email" className="login-control" placeholder="Email" />
    //           <input type="password" className="login-control" placeholder="password"></input>

    //           <button type="submit" className="login-button">Login</button>
    //         </form>
    //       </div>
      

    // </div>

  )
}
