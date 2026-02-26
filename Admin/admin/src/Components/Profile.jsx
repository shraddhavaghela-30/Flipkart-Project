import {React, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
export default function Profile() {

  const id = localStorage.getItem("admin_id")
  const [adminData, setAdminData] = useState([])

  useEffect(() => {
    if(id){
      getData(id)
    }
  }, [id])

  const getData = async(id) => {
    const res = await axios.get(`http://localhost:1700/backend/admin/${id}`)
    setAdminData(res.data)
  }

  return (
    <div className='profile-main-div all-div'>
      <h2 className='profile-h3'>Profile</h2>

      <div className='profile-page-details'>
            <div className='profile-page-div'>
              <img src={`http://localhost:1700/images/${adminData.image}`} alt="profile" className='profile-page-img'/>
              <span className='profile-page-name'>{adminData.name}</span>
            </div>
            <div>
            <div className='profile-page-userinfo'>

              <h4 className='profile-details-h4'>Profile Details</h4>

              <div className='profile-details profile-flex-div'>
                <label className='profile-span profile-span-static'>Name</label>
                <span className='profile-info'>{adminData.name}</span>
              </div>

              <div className='profile-flex-div'>
                <label className='profile-span profile-span-static'>Phone</label>
                <span className='profile-info'>+91 {adminData.mobile_no}</span>
              </div>

              <div className='profile-flex-div'>
                <label className='profile-span profile-span-static'>Email</label>
                <span className='profile-info'>{adminData.email}</span>
              </div>

              <div className='profile-details profile-flex-div'>
                <label className='profile-span profile-span-static'>City</label>
                <span className='profile-info'>{adminData.city}</span>
              </div>

              <div className='profile-details profile-flex-div'>
                <label className='profile-span profile-span-static'>State</label>
                <span className='profile-info'>{adminData.state}</span>
              </div>

              <div className='profile-flex-div'>
                <label className='profile-span profile-span-static'>Address</label>
                <span className='profile-info'>{adminData.address}</span>
              </div>

              <div>
                <Link to={`/add-admin/${id}`}><button type="button" className='edit-profile' >Edit Profile</button></Link>
              </div>
          </div>
          {/* {isOpenEdit ? (
            <div className='profile-page-userinfo edit-profile-div'>
              <h4 className='profile-details-h4'>Edit Profile</h4>

              <div className='handle-inputs'>
                <div>
                  <label className='profile-span'>Profile Image</label>
                  <input type="file" name="image" id="image" className=' image-input edit-inputs' />
                </div>
                <div>
                  <label className='profile-span'>Full Name</label>
                  <input type="text" name="name" id="name" placeholder='Enter Full Name' className='edit-inputs'/>
                </div>
                <div>
                  <label className='profile-span'>Phone</label>
                  <input type="tel" name="phone" id="phone" placeholder='Enter Phone Number' className='edit-inputs'/>
                </div>

                <div>
                  <label className='profile-span'>Email</label>
                  <input type="email" name="email" id="email" placeholder='Enter Email' className='edit-inputs'/>
                </div>
                <div className='address-div'>
                  <label className='profile-span'>Address</label>
                  <textarea name="address" id="address" cols="25" rows="10" placeholder='Address' className='edit-address edit-inputs'></textarea>
                </div>
              </div>
              <div>
                <button type="button" className='edit-profile' onClick={()=> handleSaveProfile()}>Save Profile</button>
              </div>
            </div>
          ) : ("")} */}
        </div>
      </div>
    </div>
  )
}
