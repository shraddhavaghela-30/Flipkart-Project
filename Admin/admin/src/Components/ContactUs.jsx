import {React,useState, useEffect, useMemo} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ViewDetails from './ViewDetails'
import ConfirmDelete from './ConfirmDelete'
import axios from 'axios'

export default function ContactUs() {
    const [isOpenView, setIsOpenView] = useState(false)
    const [contactUs, setContactUs] = useState([])
    const [search, setSearch] = useState('')
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    

    useEffect(() => {
        getData()
    }, [])

    const getData = async() => {
        const res = await axios.get("http://localhost:1700/backend/contactus")
        setContactUs(res.data)
    }

    //view
    const handleViewDetails = (message) => {
        setIsOpenView(true)
        setMessage(message)
    }
    const handleCloseViewDetails = () => {
        setIsOpenView(false)
    }

    //delete data
    const handleDeleteData = () => {
        setConfirmDelete(true)
    }

    const callYesDeleteData = async(id) => {
        await axios.delete(`http://localhost:1700/backend/contactus/${id}`)
        getData()
        setConfirmDelete(false)
    }

    const callNoDeleteData = () => {
        setConfirmDelete(false)
    }

    const filteredItems = useMemo(() => {
        if(!search) return contactUs

        return contactUs.filter((contact) => (
            Object.values(contact).some((value) => (
                String(value).toLowerCase().includes(search.toLowerCase())
            ))
        ))
    }, [search, contactUs])

    const tabledata = search ? filteredItems : contactUs 
  return (
    <div className='all-div'>
        <div className='button-heading-div' style={{marginBottom: '30px'}}>
            <Link to='/dashboard'><button type="button" className='back-button'><i class="fa-solid fa-arrow-left"></i></button></Link>
            <h2 className='profile-h3'>Inquiry</h2>
        </div>
        <div>
            <input type="search" name="searchcustomer" id="searchcustomer" placeholder='Search here...' className='form-control admin-search-btn' value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className='admin-table-div table-container'>
            <table className='admin-table contactus-table product-table'>
                <thead className='admin-head'>
                    <th>Sr. No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Message</th>
                    <th>Action</th>
                </thead>

                <tbody className='admin-body'>
                    {tabledata && tabledata.length > 0 ? (
                        tabledata.map((obj, i) => (
                        <tr>
                            <td>{++i}</td>
                            <td>{obj.first_name}</td>
                            <td>{obj.last_name}</td>
                            <td>{obj.email}</td>
                            <td>{obj.mobile_no}</td>
                            <td><button type="button" className='view-details-btn' onClick={() => handleViewDetails(obj.message)}>View</button></td>
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
                                        setDeleteId(obj.contactus_id)
                                    }}}
                                ></i></button>
                            </td>
                        </tr>
                    ))
                    ) : (
                        <tr>
                            <td colSpan='7' style={{textAlign: 'center' , padding: '20px'}}>
                                Result Not Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isOpenView ? (
                <ViewDetails
                    isOpen={isOpenView}
                    onClose={handleCloseViewDetails}
                    address = {message}
                />
            ) : ("")}

            {confirmDelete ? (
                <ConfirmDelete
                    yesDeleteData={() => (callYesDeleteData(deleteId))}
                    noDeleteData={callNoDeleteData}
                />
            ) : ("")}
        </div>

    </div>
  )
}
