import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import DataisEdited from './DataisEdited.jsx'
import { useNavigate, Link } from 'react-router-dom'

export default function EditAdminContact() {

    const navigate = useNavigate()
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    const [confirmEdit, setConfirmEdit] = useState(false)
    const [nullField, setNullField] = useState(false)
    const [msg, setMsg] = useState('')
    useEffect(() => {
        getData()
    }, [])

    const getData = async() => {
        const res = await axios.get('http://localhost:1700/backend/admincontact')
        setPhone(res.data.contact_no)
        setEmail(res.data.email)
        setAddress(res.data.address)
    }

    const adminId = localStorage.getItem("admin_id")

    const EditData = async() => {
        if(phone === '' || email === '' || address === '')
        {
            setNullField(true)
            setMsg("Please insert data before submit")
        }
        const res = await axios.put(`http://localhost:1700/backend/admincontact/1`, {
            "contact_no": phone,
            "email": email,
            "address": address,
            "update_by": adminId
        })

        setConfirmEdit(true)
        setMsg(res.data)
    }

    const closeNullField = () => {
      setNullField(false)
    }
  
    const closeEdit = () => {
      setConfirmEdit(false)
      navigate('/contact-us')
    }
  return (
    <div className="add-admin-div">
        <div className='all-div add-data-div'>
              <h4 className='profile-details-h4'>Edit Contact Details</h4>

              <div className="handle-inputs">
                <div>
                    <label className='profile-span'>Contact Number</label>
                    <input type="text" name="phone" id="phone" placeholder='Enter Contact Number' className='edit-inputs' value={phone} onChange={(e) => (setPhone(e.target.value))}/>
              </div>
              <div>
                <label className='profile-span'>Email</label>
                <input type="email" name="email" id="email" placeholder='Enter Email' className='edit-inputs' value={email} onChange={(e) => (setEmail(e.target.value))}/>
              </div>
              <div>
                <label className='profile-span'>Address</label>
                 <textarea name="address" id="address" cols="25" rows="10" placeholder='Address' className='edit-address edit-inputs admin-inputs' value={address} onChange={(e) => (setAddress(e.target.value))}></textarea>
              </div>
              </div>

              <div className='add-admin-btn-div'>
                <button type="button" className='add-admin-btn' onClick={EditData}>Add</button>
                <Link to='/contact-us'><button type="button" className='add-admin-btn'>Back</button></Link>
              </div>
        </div>

        {confirmEdit ? (
          <DataisEdited
            message={msg}
            gototable={closeEdit}
          />
        ) : ("")}

        {nullField ? (
          <DataisEdited
            message={msg}
            gototable={closeNullField}
          />
        ) : ("")}
    </div>
  )
}
