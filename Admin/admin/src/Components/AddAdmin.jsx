import {React, useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import DataisEdited from './DataisEdited'

export default function AddAdmin() {


  const navigate = useNavigate()
  const [isupdated, setIsUpdated] = useState(false)
  const [isNullField, setIsNullField] = useState(false)
  const [insertMsg, setInsertmsg] = useState('')

  const [img, setImg] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  const {id} = useParams()
  const admin_id = localStorage.getItem("admin_id")

  useEffect(() => {
    console.log("useEffect running");

    if(!admin_id){
      alert("Login to access admin panel")
      navigate("/")
      return
    }
    if(id){
      getEditData(id)
    }
  }, [ id])

  const getEditData = async(id) => {
      const editres = await axios.get(`http://localhost:1700/backend/admin/${id}`)
      setImg(editres.data.image)
      setName(editres.data.name)
      setPhone(editres.data.mobile_no)
      setCity(editres.data.city)
      setState(editres.data.state)
      setEmail(editres.data.email)
      setAddress(editres.data.address)
  }

  const callInsertApi = async() => {

    if(img === null || name === '' || phone === '' || city === '' || state === '' || address === '' || email === '' ){
      setIsNullField(true)
      setInsertmsg("please insert data before submit")
      return
    }

    const formdata = new FormData()
    formdata.append("file", img)
    formdata.append("name", name)
    formdata.append("mobile_no", phone)
    formdata.append("email", email)
    formdata.append("password", password)
    formdata.append("city", city)
    formdata.append("state", state)
    formdata.append("address", address)
    formdata.append("entry_by", admin_id)
    formdata.append("update_by", admin_id)    

    if (id){
      const res = await axios.put(`http://localhost:1700/backend/admin/${id}`, formdata)
      setIsUpdated(true)
      setInsertmsg(res.data)
    }else{
      const res =  await axios.post(`http://localhost:1700/backend/admin`, formdata)
      console.log(res.data)
      setIsUpdated(true)
      setInsertmsg(res.data)
    }
  }

  const closeEdit = () => {
    setIsUpdated(false)
    navigate('/manage-admin')
  }
  const closeNullField = () => {
    setIsNullField(false)
  }

  return (
    <div className='add-admin-div'>
        <div className='all-div add-data-div'>
              <h4 className='profile-details-h4'>Add / Edit Admin</h4>

              <div className='handle-inputs'>
                <div>
                <label className='profile-span'>Profile Image</label>
                <input type="file" name="image" id="image" className='image-input edit-inputs admin-inputs' onChange={(e) => setImg(e.target.files[0])}/>
              </div>
              <div>
                <label className='profile-span'>Full Name</label>
                <input type="text" name="name" id="name" placeholder='Enter Full Name' className='edit-inputs admin-inputs' value={name} onChange={(e) => setName(e.target.value)}/>
              </div>

              <div>
                <label className='profile-span'>Phone</label>
                <input type="tel" name="phone" id="phone" placeholder='Enter Phone Number' className='edit-inputs admin-inputs' value={phone} onChange={(e) => setPhone(e.target.value)}/>
              </div>

              <div>
                <label className='profile-span'>Email</label>
                <input type="email" name="email" id="email" placeholder='Enter Email' className='edit-inputs' value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>

              {!id ? (
                <div>
                <label className='profile-span'>Password</label>
                <input type="password" name="password" id="password" placeholder='Enter Password' className='edit-inputs' value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              ) : ("")}

              <div>
                <label className='profile-span'>City</label>
                <input type="text" name="name" id="name" placeholder='Enter City' className='edit-inputs admin-inputs' value={city} onChange={(e) => setCity(e.target.value)}/>
              </div>

              <div>
                <label className='profile-span'>State</label>
                <input type="text" name="name" id="name" placeholder='Enter State' className='edit-inputs admin-inputs' value={state} onChange={(e) => setState(e.target.value)}/>
              </div>

              <div>
                <label className='profile-span'>Address</label>
                <textarea name="address" id="address" cols="25" rows="10" placeholder='Address' className='edit-address edit-inputs admin-inputs' value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
              </div> 

              </div>

              <div className='add-admin-btn-div'>
                <button type="button" className='add-admin-btn' onClick={callInsertApi}>Add</button>
                <Link to='/manage-admin'><button type="button" className='add-admin-btn'>Back</button></Link>
              </div>
        </div>

        {isupdated ? (
        <DataisEdited
          message={insertMsg}
          gototable={closeEdit}
        />
      ) : ("")}

      {isNullField ? (
        <DataisEdited
          message={insertMsg}
          gototable={closeNullField}
        />
      ) : ("")}
    </div>
  )
}
