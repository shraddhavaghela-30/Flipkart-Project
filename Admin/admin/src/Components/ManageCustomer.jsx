import {React, useState, useEffect, useMemo} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ViewDetails from './ViewDetails'
import ConfirmDelete from './ConfirmDelete.jsx'

export default function ManageCustomer() {

    const [isOpenView, setIsOpenView] = useState(false)
    const [customer, setCustomer] = useState([])
    const [search, setSearch] = useState("")
    const [isDelete, setIsDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [isAddress, setIsaddress] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getData()
    } , [])

    const getData = async() => {
        const res = await axios.get("http://localhost:1700/backend/customer")
        setCustomer(res.data)
    }

    const deleteCustomer = () => {
        setIsDelete(true)
    }
    const yesDeleteCustomer = async(id) => {
        await axios.delete(`http://localhost:1700/backend/customer/${id}`)
        getData()
        setIsDelete(false)
    }
    const noDeleteCustomer = () => {
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

    //search

    const filteredItems = useMemo(() => {

        if(!search) return customer;
        return customer.filter((cust) => 
        Object.values(cust).some((value) => 
            String(value).toLowerCase().includes(search.toLowerCase())
        )
    )
    }, [search, customer])

    const tabledata = search ? filteredItems : customer;
  return (
        <div className='all-div'>
        <div className='button-heading-div' style={{marginBottom: '30px'}}>
            <Link to='/dashboard'><button type="button" className='back-button'><i class="fa-solid fa-arrow-left"></i></button></Link>
            <h2 className='profile-h3'>Manage Customer</h2>
        </div>
        <div>
            <input type="search" name="searchcustomer" id="searchcustomer" placeholder='Search here...' className='form-control admin-search-btn' value={search} onChange={(e) => (setSearch(e.target.value))}/>
        </div>

        <div className='admin-table-div table-container'>
            <table className='admin-table  customer-table'>
                <thead className='admin-head'>
                    <th className='address-row'>Sr. No.</th>
                    <th className='address-row'>Name</th>
                    <th className='email-row'>Email</th>
                    <th className='address-row'>Mobile Number</th>
                    <th className='address-row'>City</th>
                    <th className='address-row'>State</th>
                    <th className='address-row'>Address</th>
                    <th className='address-row'>Action</th>
                </thead>

                <tbody className='admin-body'>
                    {tabledata && tabledata.length > 0 ? (
                        tabledata.map((obj, i) => 
                            <tr>
                                <td className='address-row'>{++i}</td>
                                <td className='address-row'>{obj.name}</td>
                                <td className='email-row'>{obj.email}</td>
                                <td className='address-row'>{obj.mobile_no}</td>
                                <td className='address-row'>{obj.city}</td>
                                <td className='address-row'>{obj.state}</td>
                                <td className='address-row'><button type="button" className='view-details-btn' onClick={() => handleViewDetails(obj.address)}>View</button></td>
                                <td className='admin-btn-td address-row'>
                                    {/* <button className='admin-edit product-edit' onClick={() => {
                                        if(!localStorage.getItem("admin_id")){
                                            alert("Log in to your account to access admin panel")
                                            navigate("/")
                                        }
                                        else{
                                            navigate(`/edit-customer/${obj.customer_id}`)
                                        }
                                    }}><i class="fa-solid fa-pen-to-square"></i></button> */}
                                    <button className='admin-edit' onClick={() => {
                                        if(!localStorage.getItem("admin_id")){
                                            alert("Log in to your account to access admin panel")
                                            navigate("/")
                                        }
                                        else{
                                            deleteCustomer()
                                            setDeleteId(obj.customer_id)
                                        }
                                        }}><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                                Result Not Found
                            </td>
                        </tr>
                    )}
                </tbody>

                {/* {search && filteredItems.length > 0 ? (
                    filteredItems.map((obj, i) => (
                        <tr>
                            <td>{++i}</td>
                            <td className='product-row'>{obj.name}</td>
                            <td className='product-row'>{obj.email}</td>
                            <td>{obj.address}</td>
                            <td className='admin-btn-td'>
                                <button className='admin-edit product-edit' onClick={() => {
                                    if(!localStorage.getItem("admin_id")){
                                        alert("Log in to your account to access admin panel")
                                        navigate("/")
                                    }
                                    else{
                                        navigate(`/edit-customer/${obj.customer_id}`)
                                    }
                                }}><i class="fa-solid fa-pen-to-square"></i></button>
                                <button className='admin-edit' onClick={() => {
                                    if(!localStorage.getItem("admin_id")){
                                        alert("Log in to your account to access admin panel")
                                        navigate("/")
                                    }
                                    else{
                                        deleteCustomer()
                                        setDeleteId(obj.customer_id)
                                    }
                                    }}><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    ))
                ) : ("")} */}
            </table>

            {isOpenView ? (
                <ViewDetails
                    isOpen={isOpenView}
                    onClose={handleCloseViewDetails}
                    address={isAddress}
                />
            ) : ("")}

            {isDelete ? (
                <ConfirmDelete
                    yesDeleteData={() => yesDeleteCustomer(deleteId)}
                    noDeleteData={noDeleteCustomer}
                />
            ) : ("")}
        </div>

    </div>
  )
}
