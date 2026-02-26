import {React, useState, useEffect} from 'react'
import DataisEdited from './DataisEdited'
import axios from 'axios'
import { useNavigate, useParams , Link} from 'react-router-dom'

export default function AddCategory() {

  const navigate = useNavigate()
  const {id} = useParams()
  const [insertConfirm, setInsertConfirm] = useState(false)
  const [insertnNullClose, setInsertNullClose] = useState(false)
  const [insertMsg, setInsertMsg] = useState('')
  const [category, setCategory] = useState('')
  const [statusValue, setStatus] = useState(null)

  const adminId = localStorage.getItem("admin_id")


  useEffect(() => {
      if(!adminId){
      alert("Login to access admin panel")
      navigate("/")
      return
    }
    if(id){
      getEditData(id)
    }
  }, [id])

  const getEditData = async(id) => {
    const editres = await axios.get(`http://localhost:1700/backend/category/${id}`)
    console.log(editres.data)
    setCategory(editres.data.category_name)
    
  } 

  const handleInsertData = async() => {
    if(category === ""){
      setInsertNullClose(true)
      setInsertMsg("please insert data before submit.")
      return
    }
    if(statusValue === "")
    {
      setInsertNullClose(true)
      setInsertMsg("please insert data before submit.")
      return
    }

    if(id){
      const res = await axios.put(`http://localhost:1700/backend/category/${id}`, {
        "category_name": category,
        "update_by": adminId
      })
      setInsertConfirm(true)
      setInsertMsg(res.data)
    }
    else{
      const res = await axios.post("http://localhost:1700/backend/category", {
      "category_name": category ,
      "status": 1,
      "entry_by": adminId
      })
      console.log(res.data)
      setInsertConfirm(true)
      setInsertMsg(res.data)
    }
  }

  const closeEdit = () => {
    setInsertConfirm(false)
    navigate('/manage-category')
  }

  const closenullfield = () =>{
    setInsertNullClose(false)
  }
  
  const handleResetData = () => {
    setCategory('')
  }
  return (
    <div className='add-admin-div'>
        <div className='all-div add-data-div'>
              <h4 className='profile-details-h4'>Add / Edit Category</h4>

              <div className="handle-inputs">
                <div>
                  <label className='profile-span'>Category Name</label>
                  <input type="text" name="category-name" id="category-name" className='edit-inputs admin-inputs' placeholder='Enter Category Name' value={category} onChange={(e) => setCategory(e.target.value)}/>
                </div>

                {/* <div>
                  <label className='profile-span'>Status</label>
                  <input type="text" name="status" id="status" className='edit-inputs admin-inputs' placeholder='0 / 1' value={statusValue} onChange={(e) => setStatus(e.target.value)}/>
                </div> */}
                  {/* <div className='radio-div admin-inputs'>
                      <div className='radio-inputs-div'>
                        <label className='profile-span radio-label-span'>Active</label>
                        <input className='radio-inputs' type="radio" name="status" id="yes" value="true" checked = {status === true} onChange={() => setStatus(true)}/>
                      </div>
                    <div className='radio-inputs-div'>
                      <label className='profile-span radio-label-span'>Inactive</label>
                      <input  className='radio-inputs admin-inputs' type="radio" name="status" id='no' value="false" checked = {status === false} onChange={() => {setStatus(false)}}/>
                    </div>
                  </div> */}

                
              </div>

              <div className='add-admin-btn-div'>
                <button type="button" className='add-admin-btn' onClick={handleInsertData}>Add</button>
                <Link to='/manage-category'><button type="button" className='add-admin-btn'>Back</button></Link>
              </div>
        </div>

        {insertConfirm ? (
          <DataisEdited
            gototable={closeEdit}
            message={insertMsg}
          />
        ) : ("")}

        {insertnNullClose ? (
          <DataisEdited 
            gototable={closenullfield}
            message = {insertMsg}
          />
        ) :('')}
    </div>
  )
}
