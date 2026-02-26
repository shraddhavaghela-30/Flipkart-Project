import {React, useState, useEffect, useMemo} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ConfirmDelete from './ConfirmDelete'
import ViewDetails from './ViewDetails'
export default function Cart() {

    const [cart, setCart] = useState([])
    const [search, setSearch] = useState('')
    const [confirmDelete, setConfirmDelete] = useState(false)

    const navigate = useNavigate()
    const [deleteId, setDeleteId] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [address, setAddress] = useState('')
    const [isOpenView, setIsOpenView] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async() => {
        const res = await axios.get("http://localhost:1700/backend/cart")
        setCart(res.data)
    }

    const handleDeleteData = () => {
        setConfirmDelete(true)
    }

    const callYesDeleteData = async(id) => {
        await axios.delete(`http://localhost:1700/backend/cart/${id}`)
        setConfirmDelete(false)
        getData()
    }

    const callNoDeleteData = () => {
        setConfirmDelete(false)
    }
    
    const handleViewDetails = (address) => {
        setIsOpenView(true)
        setAddress(address)
    }
    const handleCloseViewDetails = () => {
        setIsOpenView(false)
    }

    const filteredItems = useMemo(() => {
        if(!search) return cart

        return cart.filter((c) => (
            Object.values(c).some((value) => (
                String(value).toLowerCase().includes(search.toLowerCase())
            ))
        ))
    }, [search, cart])

    const tabledata = search ? filteredItems : cart
  return (
    <div className='all-div'>
        <div className='button-heading-div' style={{marginBottom: '30px'}}>
            <Link to='/dashboard'><button type="button" className='back-button'><i class="fa-solid fa-arrow-left"></i></button></Link>
            
            <h2 className='profile-h3'>Cart</h2>
        </div>
        <div>
            <input type="search" name="searchcustomer" id="searchcustomer" placeholder='Search here...' className='form-control admin-search-btn' value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className='admin-table-div table-container'>
                <table className='admin-table cart-table'>
                    <thead className='admin-head'>
                        <th>Sr. No.</th>
                        <th>Customer's Name</th>
                        <th>Customer's Mobile Number</th>
                        <th>Customer's City</th>
                        <th>Customer's State</th>
                        <th>Customer's Address</th>
                        <th>image</th>
                        <th className='cart-row'>Product Name</th>
                        <th>Price</th>
                        <th>Offer</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </thead>
    
                    <tbody className='admin-body'>
                {tabledata && tabledata.length > 0 ? (
                    tabledata.map((obj, i) => (
                    <tr>
                        <td>{++i}</td>
                        <td>{obj.name}</td>
                        <td>{obj.mobile_no}</td>
                        <td>{obj.city}</td>
                        <td>{obj.state}</td>
                        <td><button type="button" className='view-details-btn' onClick={() => handleViewDetails(obj.address)}>View</button></td>
                        <td>
                            <img src={`http://localhost:1700/images/${obj.image}`} alt="product-image" height={50} width={50} className='admin-image' onClick={() => setPreviewImage(`http://localhost:1700/images/${obj.image}`)}/>

                            {previewImage && (
                                <div className='image-modal' onClick={() => setPreviewImage(null)}>
                                    <span className='close-admin-image' ><i class="fa-regular fa-circle-xmark"></i></span>
                                    <img src={previewImage} alt="Profile Image" className='modal-image' onClick={(e) => (e.stopPropagation())}/>
                                </div>
                            )}
                        </td>
                        <td className='cart-row'>{obj.product_name}</td>
                        <td>{obj.price}</td>
                        <td>{obj.offer}</td>
                        <td>{obj.quantity}</td>
                        <td className='admin-btn-td category-btns'>
                            <button className='admin-edit' onClick={() => {
                                if(!localStorage.getItem("admin_id")){
                                    alert("Login to your account to access admin panel")
                                    navigate("/")
                                }else{
                                    handleDeleteData()
                                    setDeleteId(obj.product_id)
                                }
                        }}><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="12" style={{ textAlign: "center", padding: "20px" }}>
                            Result Not Found
                        </td>
                    </tr>
                )}
                    </tbody>
                </table>
                {confirmDelete ? (
                    <ConfirmDelete 
                        yesDeleteData={() => callYesDeleteData(deleteId)}
                        noDeleteData={callNoDeleteData}
                    />
                ) : ('')}
             {isOpenView ? (
                <ViewDetails
                    isOpen={isOpenView}
                    onClose={handleCloseViewDetails}
                    address={address}
             />) : ("")}
        </div>
    </div>
  )
}
