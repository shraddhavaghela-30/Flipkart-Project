import {React, useState, useEffect, useMemo} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import ConfrimDelete from './ConfirmDelete'
import ViewDetails from './ViewDetails'
export default function Wishlist() {

    const navigate = useNavigate()  
    const [wishlist, setWishlist] = useState([])
    const [search, setSearch] = useState('')
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [address, setAddress] = useState('')
    const [isOpenView, setIsOpenView] = useState(false)
    const [previewImage, setpreviewimage] = useState(false)
    useEffect(() => {
        getData()
    }, [])

    const getData = async() => {
        const res = await axios.get("http://localhost:1700/backend/wishlist")
        setWishlist(res.data)
    }

    const handleDeleteData = () => {
        setConfirmDelete(true)
    }

    const callYesDeleteData = async(id) => {
        await axios.delete(`http://localhost:1700/backend/wishlist/${id}`)
        getData()
        setConfirmDelete(false)
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
        if(!search) return wishlist

        return wishlist.filter((list) => (
            Object.values(list).some((value) => (
                String(value).toLowerCase().includes(search.toLowerCase())
            ))
        ))
    }, [search, wishlist])

    const tabledata = search ? filteredItems : wishlist
  return (
    <div className='all-div'>
        <div className='button-heading-div' style={{marginBottom: '30px'}}>
            <Link to='/dashboard'><button type="button" className='back-button'><i class="fa-solid fa-arrow-left"></i></button></Link>
            <h2 className='profile-h3'>Wishlist</h2>
        </div>

        <div>
            <input type="search" name="searchcustomer" id="searchcustomer" placeholder='Search here...' className='form-control admin-search-btn' value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
        
        <div className='admin-table-div table-container'>
                <table className='admin-table category-table product-table'>
                    <thead className='admin-head'>
                        <th>Sr. No.</th>
                        <th>Customer's Name</th>
                        <th>Customer's Mobile Number</th>
                        <th>Customer's City</th>
                        <th>Customer's State</th>
                        <th>Customer's Address</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Offer</th>
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
                                    <img src={`http://localhost:1700/images/${obj.image}`} alt="product image" height={50} width={50} className='admin-image' onClick={() => setpreviewimage(`http://localhost:1700/images/${obj.image}`)} />

                                    {previewImage && (
                                        <div className='image-modal' onClick={() => setpreviewimage(null)}>
                                            <span className='close-admin-image'><i class="fa-regular fa-circle-xmark"></i></span>
                                            <img src={previewImage} className='modal-image' onClick={(e) => e.stopPropagation()}/>
                                        </div>
                                    )}

                                </td>
                                <td className='product-row'>{obj.product_name}</td>
                                <td>{obj.price}</td>
                                <td>{obj.offer}</td>
                                <td className='admin-btn-td category-btns'>
                                    <button className='admin-edit'><i class="fa-solid fa-trash" 

                                    onClick={() => {
                                    if(!localStorage.getItem("admin_id")){
                                        alert("Login to your account to access the panel")
                                        navigate('/')
                                        return
                                    }
                                    else{
                                        handleDeleteData()
                                        setDeleteId(obj.wishlist_id)
                                    }}}
                                    ></i></button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan='11' style={{textAlign: 'center', padding: '20px'}}>
                                    Result Not Found
                                </td>
                            </tr>
                        )}
                        
                    </tbody>
                </table>

                {confirmDelete ? (
                    <ConfrimDelete 
                        yesDeleteData={() => (callYesDeleteData(deleteId))}
                        noDeleteData={callNoDeleteData}
                    /> 
                ) : ("")}

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
