import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function ChangePassword() {

  const navigate = useNavigate()
  const adminId = localStorage.getItem("admin_id")
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')



  const handleUpdatePassword = async(adminId) => {
    if(oldPassword === newPassword){
      alert("Please enter different password")
      return
    }
    if(newPassword != confirmPassword){
      alert("Please enter correct password")
      return
    }
    const res = await axios.put(`http://localhost:1700/backend/admin/${adminId}`, {
      "password": confirmPassword,
      "update_by": adminId
    })
    console.log(res.data)
    alert("Password updated successfully.")
    navigate("/")
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
    
  }
  return (
     <div className='all-div'>
              <div className='button-heading-div' style={{marginBottom: '30px'}}>
            <Link to='/dashboard'><button type="button" className='back-button'><i class="fa-solid fa-arrow-left"></i></button></Link>
            <h2 className='profile-h3'>Change Password</h2>
        </div>
        <div className='change-pwd-div'>
              <h4 className='profile-details-h4'>Change Password</h4>

              <div className="handle-inputs">
                <div>
                <label className='profile-span'>Old Password</label>
                <input type="password" name="o-password" id="o-password" placeholder='Old Password' className='edit-inputs pwd-inputs' value={oldPassword} onChange={(e) => (setOldPassword(e.target.value))}/>
              </div>
              <div></div>
              <div>
                <label className='profile-span'>New Password</label>
                <input type="password" name="n-password" id="n-password" placeholder='New Password' className='edit-inputs pwd-inputs' value={newPassword} onChange={(e) => (setNewPassword(e.target.value))}/>
              </div>
              <div>
                <label className='profile-span'>Confirm Password</label>
                <input type="password" name="c-password" id="c-password" placeholder='Confirm Password' className='edit-inputs pwd-inputs' value={confirmPassword} onChange={(e) => (setConfirmPassword(e.target.value))}/>
              </div>
              </div>

              <div>
                <button type="button" className='edit-profile' onClick={() => (handleUpdatePassword(adminId))}>Change Password</button>
              </div>
        </div>
      </div>
  )
}
