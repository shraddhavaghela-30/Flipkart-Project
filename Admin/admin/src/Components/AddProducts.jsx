import axios from 'axios'
import {React, useState, useEffect} from 'react'
import DataisEdited from './DataisEdited'
import { useNavigate, useParams, Link } from 'react-router-dom'

export default function AddProducts() {

  const {id} = useParams()
  const navigate = useNavigate()

  const [addProduct, setAddProduct] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [pname, setPName] = useState('')
  const [pimg, setPImg] = useState(null)
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [description, setDescription] = useState('')

  const [confirmInsert, setConfirmInsert] = useState(false)
  const [insertMsg, setInsertmsg] = useState('')
  const [isNullField, setIsNullField] = useState(false)

  const adminId = localStorage.getItem("admin_id")

  useEffect(() => {
      if(!adminId){
        alert("Login to access admin panel")
        navigate("/")
      return
    }
    getCategoryData()
    if(id){
      getEditData(id)
    }
    
  }, [id])

  const getCategoryData = async() => {
    const res = await axios.get("http://localhost:1700/backend/category")
    setAddProduct(res.data)
    console.log(res.data)
  }
  const getEditData = async(id) => {
    const editres = await axios.get(`http://localhost:1700/backend/product/${id}`)
    console.log(editres.data)
    setPName(editres.data.product_name)
    setPImg(editres.data.image)
    setCategoryId(editres.data.category_id)
    setPrice(editres.data.price)
    setDiscount(editres.data.discount)
    setDescription(editres.data.description)
  }

  const handleInsertData = async() => {

    if(pname === '' || pimg === null || categoryId === '' || price === '' || discount === '' || description === '')
    {
      setIsNullField(true)
      setInsertmsg("Please insert data before submit.")
      return
    }

    const formdata = new FormData()
    formdata.append("category_id", categoryId)
    formdata.append("product_name", pname)
    formdata.append("file", pimg)
    
    formdata.append("price", price)
    formdata.append("discount", discount)
    formdata.append("description", description)
    formdata.append("entry_by", adminId)
    formdata.append("update_by", adminId)

    if(id){
      const res = await axios.put(`http://localhost:1700/backend/product/${id}`, formdata)
      console.log(res.data)
      setConfirmInsert(true)
      setInsertmsg(res.data)

    }else{
      const res = await axios.post("http://localhost:1700/backend/product", formdata)
      console.log(res.data)
      setConfirmInsert(true)
      setInsertmsg(res.data)
    }
  }

  const closeInsert = () => {
    setConfirmInsert(false)
    navigate('/manage-products')
  }

  const closeNullField = () => {
    setIsNullField(false)
  }
  return (
    <div className='add-admin-div'>
        <div className='all-div add-data-div'>
              <h4 className='profile-details-h4'>Add / Edit Products</h4>

              <div className="handle-inputs">
                <div>
                  <label className='profile-span'>Product Name</label>
                  <input type="text" name="name" id="name" placeholder='Enter Product Name' className='edit-inputs admin-inputs' value={pname} onChange={(e) => setPName(e.target.value)}/>
                </div>

                <div>
                  <label className='profile-span'>Products Image</label>
                  <input type="file" name="image" id="image" className=' image-input edit-inputs admin-inputs' onChange={(e) => setPImg(e.target.files[0])}/>
                </div>

                <div>
                  <label className='profile-span'>Products Category</label>
                  <select name="category" id="category" className='edit-inputs admin-inputs' value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="All Category">All Category</option>
                    {addProduct.map((obj) => (
                      <option value={obj.category_id}>{obj.category_name}</option>
                    ))}
                  </select>
                </div>


                <div>
                  <label className='profile-span'>Price</label>
                  <input type="text" name="price" id="price" placeholder='Enter price' className='edit-inputs admin-inputs' value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
                
                <div>
                  <label className='profile-span'>Discount</label>
                  <input type="text" name="discount" id="discount" placeholder='Enter discount' className='edit-inputs admin-inputs' value={discount} onChange={(e) => setDiscount(e.target.value)}/>
                </div>

                <div className='address-div'>
                  <label className='profile-span'>Description</label>
                  <textarea name="Description" id="Description" cols="25" rows="50" placeholder='Description' className='edit-address edit-inputs admin-inputs' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
              </div>

              <div className='add-admin-btn-div'>
                <button type="button" className='add-admin-btn' onClick={handleInsertData}>Add</button>
                <Link to='/manage-products'><button type="button" className='add-admin-btn'>Back</button></Link>
              </div>
        </div>

        {confirmInsert ? (
          <DataisEdited
            message={insertMsg}
            gototable={closeInsert}
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
