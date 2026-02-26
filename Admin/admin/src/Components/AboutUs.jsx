import {React, useState, useEffect} from 'react'
import DataisEdited from './DataisEdited.jsx'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'

export default function AboutUs() {

  const auth = localStorage.getItem("admin_id")

  const {id} = useParams()
  const navigate = useNavigate()
  const [confirmInsert, setConfirmInsert] = useState(false)
  const [confirmMsg, setConfirmMsg] = useState('')
  const [isNullField, setIsNullField] = useState(false)
  const [nullMsg, setNullMsg] = useState('')
  const [headingOne, setHeadingOne] = useState('')
  const [imgOne, setImgOne] = useState(null)
  const [contentOne, setContentOne] = useState('')
  const [headingTwo, setHeadingTwo] = useState('')
  const [imgTwo, setImgTwo] = useState(null)
  const [contentTwo, setContentTwo] = useState('')


  useEffect(() => {
    if(!auth){
      alert("Login to access admin panel")
      return
    }
    getEditData(id)
  }, [auth, id])

  const getEditData = async(id) => {
    const editres = await axios.get(`http://localhost:1700/backend/aboutus/${id}`)
    setHeadingOne(editres.data.heading_one)
    setImgOne(editres.data.image_one)
    setContentOne(editres.data.content_one)
    setHeadingTwo(editres.data.heading_two)
    setImgTwo(editres.data.image_two)
    setContentTwo(editres.data.content_two)
  }

  const handleInsertData = async() => {

    if(headingOne === '' || !imgOne || contentOne === '' || headingTwo === '' || !imgTwo || contentTwo === ''){
      setIsNullField(true)
      setNullMsg("please insert data before submit")
      return
    }

    const formdata = new FormData()
    formdata.append("heading_one", headingOne)
    formdata.append("imageone", imgOne)
    formdata.append("content_one", contentOne)
    formdata.append("heading_two", headingTwo)
    formdata.append("imagetwo", imgTwo)
    formdata.append("content_two", contentTwo)
    formdata.append("update_by", auth)

    if(id){
      const editres = await axios.put(`http://localhost:1700/backend/aboutus/${id}`, formdata)
      setConfirmInsert(true)
      setConfirmMsg(editres.data)


    }else{
      const res = await axios.post("http://localhost:1700/backend/aboutus", formdata)
      setConfirmInsert(true)
      setConfirmMsg(res.data)
    }
  }

  const closeEdit = () => {
    setConfirmInsert(false)
    navigate('/manage-aboutus')
  }

  const closeNullField = () => {
    setIsNullField(false)
  }
  return (
    <div className='add-admin-div'>
        <div className='all-div add-data-div'>
              <h4 className='profile-details-h4'>Add / Edit About Us</h4>

              <div className="handle-inputs">
                <div>
                <label className='profile-span'>Image One</label>
                <input type="file" name="imageone" id="imageone" className='image-input edit-inputs admin-inputs' onChange={(e) => setImgOne(e.target.files[0])}/> 
              </div>
              <div>
                <label className='profile-span'>Heading One</label>
                <input type="text" name="headingone" id="headingone" placeholder='Enter Heading One' className='edit-inputs pwd-inputs' value={headingOne} onChange={(e) => setHeadingOne(e.target.value)}/>
              </div>
              <div>
                <label className='profile-span'>Content One</label>
                <textarea name="contentone" id="contentone" cols="50" rows="10" placeholder='Enter Content One' className='edit-address edit-inputs admin-inputs' value={contentOne} onChange={(e) => setContentOne(e.target.value)}></textarea>
              </div>
              <div></div>
              <div>
                <label className='profile-span'>Image Two</label>
                <input type="file" name="imagetwo" id="imagetwo" className=' image-input edit-inputs admin-inputs' onChange={(e) => setImgTwo(e.target.files[0])}/>
              </div>
              <div>
                <label className='profile-span'>Heading Two</label>
                <input type="text" name="headingtwo" id="headingtwo" placeholder='Enter Heading One' className='edit-inputs pwd-inputs' value={headingTwo} onChange={(e) => setHeadingTwo(e.target.value)}/>
              </div>
              <div>
                <label className='profile-span'>Content Two</label>
                <textarea name="contenttwo" id="contenttwo" cols="50" rows="10" placeholder='Enter Content Two' className='edit-address edit-inputs admin-inputs' value={contentTwo} onChange={(e) => setContentTwo(e.target.value)}></textarea>
              </div>
              </div>
              <div className='add-admin-btn-div'>
                <button type="button" className='add-admin-btn' onClick={handleInsertData}>Add</button>
                <Link to='/manage-aboutus'><button type="button" className='add-admin-btn'>Back</button></Link>
              </div>
        </div>
        {confirmInsert ? (
          <DataisEdited
            message={confirmMsg}
            gototable={closeEdit}
          />
        ) : ('')}

        {isNullField ? (
          <DataisEdited
            message={nullMsg}
            gototable={closeNullField}
          />
        ) :('')}
    </div>
  )
}
