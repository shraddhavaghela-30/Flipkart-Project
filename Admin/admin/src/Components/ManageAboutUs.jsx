import {React, useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ViewDetails from './ViewDetails.jsx'
import ConfirmDelete from './ConfirmDelete.jsx'

export default function ManageAboutUs() {

    const navigate = useNavigate()

    const [aboutUs, setAboutUs] = useState([])
    const [isAddress, setIsaddress] = useState('')
    const [isOpenView, setIsOpenView] = useState(false)
    const [previewImage, setPreviewImage] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const handleAuth = (e) => {
        
        if(!localStorage.getItem("admin_id")){
            e.preventDefault();
            alert("Login to access admin panel")
            navigate("/")
            return
        }
        else{
            
        }
    }

    const getData = async() => {
        const res = await axios.get("http://localhost:1700/backend/aboutus")
        setAboutUs(res.data)
    }

    // const handleDeleteData = () => {
    //     setIsDelete(true)
    // }

    // const callDeleteApi = async(id) => {
    //     await axios.delete(`http://localhost:1700/backend/aboutus/${id}`)
    //     getData()
    //     setIsDelete(false)
    // }

    // const closeDeleteConfirm = () => {
    //     setIsDelete(false)
    // }
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
        <div className='button-heading-div' style={{marginBottom: '30px'}}>
            <Link to='/dashboard'><button type="button" className='back-button'><i class="fa-solid fa-arrow-left"></i></button></Link>
            <h2 className='profile-h3'>Manage About Us</h2>
            {/* <Link to='/add-aboutus'>
                <button type="button" className='admin-add-btn'><i class="fa-solid fa-plus"></i> &nbsp;Add New Data</button>
            </Link> */}
        </div>
        <div className='admin-table-div table-container'> 
            <table className='admin-table product-table'>
                <thead className='admin-head'>
                    <th>Sr. No.</th>
                    <th>Heading One</th>
                    <th>Image One</th>
                    <th>Content One</th>
                    <th>Heading Two</th>
                    <th>Image Two</th>
                    <th>Content Two</th>
                    {/* <th>Entry_date</th>
                    <th>Entry_by_role</th>
                    <th>Entry_by</th>
                    <th>Update_date</th>
                    <th>Update_by_role</th>
                    <th>Update_by</th> */}
                    <th>Action</th>  
                </thead>

                <tbody className='admin-body'>
                     
                        <tr>
                            <td>1</td>
                            <td><button type="button" className='view-details-btn' onClick={() => handleViewDetails(aboutUs.heading_one)}>View</button></td>
                            <td>
                                <img src={`http://localhost:1700/images/${aboutUs.image_one}`} alt="product-image" height={50} width={50}  className='admin-image' onClick={() => setPreviewImage(`http://localhost:1700/images/${aboutUs.image_one}`)}/>

                                {previewImage && (
                                    <div className='image-modal' onClick={() => setPreviewImage(null)}>
                                        <span className='close-admin-image'><i class="fa-regular fa-circle-xmark"></i></span>
                                        <img src={previewImage} className='modal-image' alt="Image" onClick={(e) => (e.stopPropagation)} />
                                    </div>
                                    
                                )}
                            </td>
                            <td><button type="button" className='view-details-btn' onClick={() => handleViewDetails(aboutUs.content_one)}>View</button></td>
                            <td><button type="button" className='view-details-btn' onClick={() => handleViewDetails(aboutUs.heading_two)}>View</button></td>
                            <td>
                                <img src={`http://localhost:1700/images/${aboutUs.image_two}`} alt="product-image" height={50} width={50}  className='admin-image' onClick={() => setPreviewImage(`http://localhost:1700/images/${aboutUs.image_two}`)}/>

                                {previewImage && (
                                    <div className='image-modal' onClick={() => setPreviewImage(null)}>
                                        <span className='close-admin-image'><i class="fa-regular fa-circle-xmark"></i></span>
                                        <img src={previewImage} className='modal-image' alt="Image" onClick={(e) => (e.stopPropagation)} />
                                    </div>
                                    
                                )}
                            </td>
                            <td><button type="button" className='view-details-btn' onClick={() => handleViewDetails(aboutUs.content_two)}>View</button></td>
                            {/* <td>{obj.entry_date1}</td>
                            <td>{obj.entry_by_role}</td>
                            <td>{obj.entry_by}</td>
                            <td>{obj.update_date1}</td>
                            <td>{obj.update_by_role}</td>
                            <td>{obj.update_by}</td> */}
                            <td className='admin-btn-td'>
                                <button className='admin-edit product-edit' onClick={() => {
                                            if(!localStorage.getItem("admin_id")){
                                            alert("Login to access admin panel")
                                            navigate("/")
                                            return
                                        }
                                        else{
                                            navigate(`/add-aboutus/${aboutUs.aboutus_id}`)
                                        }
                                }}><i class="fa-solid fa-pen-to-square"></i></button>
                                {/* <button className='admin-edit' onClick={() => {
                                        if(!localStorage.getItem("admin_id")){
                                            alert("Login to access admin panel")
                                            navigate("/")
                                        return
                                    }else{
                                        handleDeleteData()
                                        setDeleteId(aboutUs.aboutus_id)
                                    }
                                }}><i class="fa-solid fa-trash"></i></button> */}
                            </td>
                        </tr>
                   
                </tbody>
            </table>

            {isOpenView ? (
                <ViewDetails
                    isOpen={isOpenView}
                    onClose={handleCloseViewDetails}
                    address={isAddress}
                />
            ) : ("")}

            {/* {isdelete ? (
                <ConfirmDelete
                yesDeleteData={() => callDeleteApi(Deleteid)}
                noDeleteData={closeDeleteConfirm}/>
            ) : ("")} */}

        </div>

    </div>
  )
}
