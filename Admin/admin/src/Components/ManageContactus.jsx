import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import ViewDetails from './ViewDetails'
export default function ManageContactus() {

    const navigate = useNavigate()

    useEffect(() => {
        getData()
    }, [])
    const [adminContact, setAdminContact] = useState([])
    const [isOpenView, setIsOpenView] = useState('')
    const [address, setIsaddress] = useState('')

    const getData = async() => {
        const res = await axios.get('http://localhost:1700/backend/admincontact')
        setAdminContact(res.data)
    }

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
                <h2 className='profile-h3'>Contact Us</h2>
            </div>
            <div className='admin-table-div table-container'>
                <table className='admin-table contactus-table product-table'>
                    <thead className='admin-head'>
                        <th>Sr. No.</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                    </thead>
    
                    <tbody className='admin-body'>
                            <tr>
                                <td>1</td>
                                <td>{adminContact.contact_no}</td>
                                <td>{adminContact.email}</td>
                                <td><button type="button" className='view-details-btn' onClick={() => handleViewDetails(adminContact.address)}>View</button></td>
                                                            <td className='admin-btn-td'>
                                <button className='admin-edit product-edit' onClick={() => {
                                    if(!localStorage.getItem("admin_id")){
                                        alert("Log in to your account to access admin panel")
                                        navigate("/")
                                    }
                                    else{
                                        navigate(`/contact-us/${adminContact.admin_contact_id}`)
                                    }
                                }}><i class="fa-solid fa-pen-to-square"></i></button>
                            </td>
                            </tr>
                        
                    </tbody>
                </table>
                {isOpenView ? (
                    <ViewDetails
                        isOpen={isOpenView}
                        onClose={handleCloseViewDetails}
                        address = {address}
                    />
                ) : ("")}
            </div>
        </div>
  )
}
