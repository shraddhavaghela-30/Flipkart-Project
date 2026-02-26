import {React, useState, useEffect, useMemo} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ConfirmDelete from './ConfirmDelete'
import ViewDetails from './ViewDetails'

export default function MasterOrder() {

    const [masterOrder, setMasterOrder] = useState([])
    const [trnOrders, setTrnOrders] = useState([])
    const [search, setSearch] = useState('')
    const [address, setAddress] = useState('')
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isOpenView, setIsOpenView] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const handleTrnData = async(id) =>{
        const res = await axios.get(`http://localhost:1700/backend/transactionorder/orderid/${id}`)
        setTrnOrders(res.data)
        setIsOpenView(true)
    }

    const closeViewDetails = () => {
        setIsOpenView(false)
    }

    const getData = async() => {
        const res = await axios.get("http://localhost:1700/backend/masterorder")
        setMasterOrder(res.data)
        console.log(res.data)
    }
    const handleViewDetails = (address) => {
        setIsOpenView(true)
        setAddress(address)
    }
    const handleCloseViewDetails = () => {
        setIsOpenView(false)
    }

    const filteredItems = useMemo(() => {
        if(!search) return masterOrder;

        return masterOrder.filter((order) => (
        Object.values(order).some((value) => (
            String(value).toLowerCase().includes(search.toLowerCase())
        ))
    ))
    } , [search, masterOrder])

    const tabledata = search ? filteredItems : masterOrder
  return (
    <div>
        <div className='all-div'>
        <div className='button-heading-div' style={{marginBottom: '30px'}}>
            <Link to='/dashboard'><button type="button" className='back-button'><i class="fa-solid fa-arrow-left"></i></button></Link>
            <h2 className='profile-h3'>Master Order</h2>
        </div>
        <div>
            <input type="search" name="searchcustomer" id="searchcustomer" placeholder='Search here...' className='form-control admin-search-btn' value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className='admin-table-div table-container'>
            <table className='admin-table product-table'>
                <thead className='admin-head'>
                    <th>Sr. No.</th>
                    <th>Customer's Name</th>
                    <th>Customer's Mobile Number</th>
                    <th>Customer's City</th>
                    <th>Cusomer's State</th>
                    <th>Customer's Address</th>
                    <th>Order Date</th>
                    <th>Total Items</th>
                    <th>Discount</th>
                    <th>Total Amount</th>
                    <th>Total Discount</th>
                    <th>items</th>
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
                            <td>{obj.order_date1}</td>
                            <td>{obj.total_items}</td>
                            <td>{obj.discount}</td>
                            <td>{obj.total_amount}</td>
                            <td>{obj.total_discount}</td>
                            <td><Link to={`/order-trn/${obj.order_id}`}>
                                <button type="button" className='view-details-btn'>View</button>
                            </Link></td>
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

            {/* {confirmDelete ? (
                <ConfirmDelete
                    yesDeleteData={() => callYesDeleteData(deleteId)}
                    noDeleteData={() => {callNoDeleteData()}}
                />
            ) : ("")} */}

            {isOpenView ? (
                <ViewDetails 
                    isOpen={isOpenView}
                    onClose={closeViewDetails}
                    address={trnOrders}
                />
            ): ("")}
             {isOpenView ? (
                <ViewDetails
                    isOpen={isOpenView}
                    onClose={handleCloseViewDetails}
                    address={address}
             />) : ("")}
        </div>

        </div>
    </div>
  )
}
