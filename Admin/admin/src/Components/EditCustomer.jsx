import axios from 'axios'
import {React, useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import DataisEdited from './DataisEdited.jsx'

export default function EditCustomer() {

    const {id} = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [confirm, setConfirm] = useState('')

    useEffect(() => {
    if(!localStorage.getItem("admin_id")){
      alert("Login to access admin panel")
      return
    }
        if(id){
            getEditData(id)
        }
    }, [id])

    const getEditData = async(id) => {
        const editres = await axios.get(`http://localhost:1700/backend/customer/${id}`)
        setName(editres.data.name)
        setEmail(editres.data.email)
        setPassword(editres.data.password)
        setAddress(editres.data.address)
        
    }
    const callEditApi = async() => {
        const payload = {
            name,
            email,
            password,
            address
        }
        const res = await axios.put(`http://localhost:1700/backend/customer/${id}`, payload)
        console.log(res.data)
        setIsEdit(true)
        setConfirm(res.data)
    }

    const closeEditConfirm = () => {
        setIsEdit(false)
        navigate('/manage-customer')
    }

    const handleResetData = () => {
      setName('')
      setEmail('')
      setPassword('')
      setAddress('')
    }
  return (
    <div className='add-admin-div'>
        <div className='all-div add-data-div'>
              <h4 className='profile-details-h4'>Edit Customer</h4>

              <div className="handle-inputs">
                <div>
                <label className='profile-span'>Name</label>
                <input type="text" name="name" id="name" className='edit-inputs admin-inputs' placeholder='Enter Name' value={name} onChange={(e) => (setName(e.target.value))}/>
              </div>
              <div>
                <label className='profile-span'>Email</label>
                <input type="email" name="email" id="email" placeholder='Enter Email' className='edit-inputs admin-inputs' value={email} onChange={(e) => (setEmail(e.target.value))}/>
              </div>

              {/* <div>
                <label className='profile-span'>Password</label>
                <input type="password" name="password" id="password" placeholder='Enter Password' className='edit-inputs admin-inputs' value={password} onChange={(e) => (setPassword(e.target.value))}/>
              </div> */}

              <div>
                <label className='profile-span'>Address</label>
                <textarea name="address" id="address" cols="25" rows="10" placeholder='Address' className='edit-address edit-inputs admin-inputs' value={address} onChange={(e) => (setAddress(e.target.value))}></textarea>
              </div>
              </div>

              <div className='add-admin-btn-div'>
                <button type="button" className='add-admin-btn' onClick={callEditApi}>Add</button>
                <Link to='/manage-customer'><button type="button" className='add-admin-btn'>Back</button></Link>
              </div>
        </div>

        {isEdit ? (
            <DataisEdited
                gototable={closeEditConfirm}
                message={confirm}
            />
        ) : ("")}
    </div>
  )
}
