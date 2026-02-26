import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPwd() {
  return (
    <div>
      <div className="signup-div">
      <div className="signup-1">
        <span className="signup1-span1">Forgot Password?</span>
        <span className="signup1-span2">Enter new password to login back to flipkart</span>
        <img src="img/login-img.png" alt="login-img" />
      </div>
      <div className="signup-2">
        <div className="signup-span">Forgot Password</div>
        <form action="#">
          <input type="password" name="password" id="password" placeholder="Create New Password" className="form-control signup-input"/>
          <input type="password" name="cpassword" id="cpassword" placeholder="Confirm Password" className="form-control signup-input"/>

          <button type="button" className="signup-btn">Submit</button>

          <span className="signup-last-span">Back to <Link to='/login' className="signup-last-link">Sign In</Link></span>
        </form>
      </div>
    </div>
    </div>
  )
}
