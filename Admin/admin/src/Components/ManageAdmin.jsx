import {React, useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import ViewDetails from './ViewDetails'
import ConfirmDelete from './ConfirmDelete'
export default function ManageAdmin() {
    const [admin, setAdmin] = useState([])
    const [isAddress, setIsaddress] = useState('')
    const [isOpenView, setIsOpenView] = useState(false)
    const [isdelete, setIsDelete] = useState(false)
    const [Deleteid, setDeleteId] = useState('')
    const [previewImage, setPreviewImage] = useState(null)

    const navigate = useNavigate()

    useEffect(()=>{
        getData()
    }, [])
    
    //get all data api
    const getData = async() => {
        const res = await axios.get("http://localhost:1700/backend/admin")
        setAdmin(res.data)
    }

    //Delete Api
    const handleDeleteData = () => {
        setIsDelete(true)
    }
    const callDeleteApi = async(id) => {
        await axios.delete(`http://localhost:1700/backend/admin/${id}`)
        getData()
        setIsDelete(false)
    }
    const closeDeleteConfirm = () => {
        setIsDelete(false)
    }

    //address popup
    const handleViewDetails = (address) => {
        setIsOpenView(true)
        setIsaddress(address)
    }
    const handleCloseViewDetails = () => {
        setIsOpenView(false)
    }
  return (

    <div className='all-div'>
        <div className='table-heading-div'>
            <div className='button-heading-div'>
                <Link to='/dashboard'><button type="button" className='back-button'><i class="fa-solid fa-arrow-left"></i></button></Link>
                <h2 className='profile-h3'>Manage Admin</h2>
            </div>
            
                <button type="button" className='admin-add-btn' onClick={() => {
                                    if(!localStorage.getItem("admin_id")){
                                        alert("Login to your account to access the panel")
                                        navigate('/')
                                        return
                                    }
                                    else{
                                        navigate(`/add-admin`)
                                    }}}><i class="fa-solid fa-plus"></i> &nbsp;Add New Data</button>
        </div>
        <div className='admin-table-div table-container'> 
            <table className='admin-table product-table'>
                <thead className='admin-head'>
                    <th>Sr. No.</th>
                    <th>Profile Image</th>
                    <th>Full Name</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Address</th>
                    <th>Email</th>
                    {/* <th>password</th> */}
                    {/* <th>Status</th> */}
                    {/* <th>Entry_date</th>
                    <th>Entry_by_role</th>
                    <th>Entry_by</th>
                    <th>Update_date</th>
                    <th>Update_by_role</th>
                    <th>Update_by</th> */}
                    <th>Action</th>
                    
                </thead>

                <tbody className='admin-body'>
                    {admin.map((obj, i) => 
                        <tr>
                            <td>{++i}</td>
                            <td>
                                <img src={`http://localhost:1700/images/${obj.image}`} alt="admin-image" height={50} width={50} style={{borderRadius: '50px'}} className='admin-image' onClick={() => (setPreviewImage(`http://localhost:1700/images/${obj.image}`))}/>

                                {previewImage && (
                                    <div className='image-modal' onClick={() => (setPreviewImage(null))}>
                                        <span className='close-admin-image'><i class="fa-regular fa-circle-xmark"></i></span>
                                        <img src={previewImage} alt="Image" 
                                            className='modal-image' 
                                            onClick={(e) => (e.stopPropagation())}
                                        />
                                    </div>
                                )}
                            </td>
                            <td>{obj.name}</td>
                            <td>{obj.mobile_no}</td>
                            <td>{obj.city}</td>
                            <td>{obj.state}</td>
                            <td><button type="button" className='view-details-btn' onClick={() => handleViewDetails(obj.address)}>View</button></td>
                            <td>{obj.email}</td>
                            {/* <td>{obj.password}</td> */}
                            {/* <td>{obj.status}</td> */}
                            {/* <td>{obj.entry_date1}</td>
                            <td>{obj.entry_by_role}</td>
                            <td>{obj.entry_by}</td>
                            <td>{obj.update_date1}</td>
                            <td>{obj.update_by_role}</td>
                            <td>{obj.update_by}</td> */}
                            <td className='admin-btn-td'>
                                <button className='admin-edit product-edit' onClick={() => {
                                    if(!localStorage.getItem("admin_id")){
                                        alert("Login to your account to access the panel")
                                        navigate('/')
                                        return
                                    }
                                    else{
                                        navigate(`/add-admin/${obj.admin_id}`)
                                    }
                                }}><i class="fa-solid fa-pen-to-square" ></i></button>
                                <button className='admin-edit' onClick={() => {
                                    if(!localStorage.getItem("admin_id")){
                                        alert("Login to your account to access the panel")
                                        navigate('/')
                                        return
                                    }else{
                                        handleDeleteData()
                                        setDeleteId(obj.admin_id)
                                    }
                                }}><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {isOpenView ? (
                <ViewDetails
                    isOpen={isOpenView}
                    onClose={handleCloseViewDetails}
                    address={isAddress}
                />
            ) : ("")}

            {isdelete ? (
                <ConfirmDelete
                yesDeleteData={() => callDeleteApi(Deleteid)}
                noDeleteData={closeDeleteConfirm}/>
            ) : ("")}

        </div>

    </div>
  )
}
