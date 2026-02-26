import {React, useState, useEffect, useMemo} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ConfirmDelete from './ConfirmDelete.jsx'
import axios from 'axios'

export default function ManageCategory() {

    const [category, setCategory] = useState([])
    const [search, setSearch] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [deleteId, setDeleteId] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        getData()
    }, [])

    const getData = async() => {
        const res = await axios.get("http://localhost:1700/backend/category")
        setCategory(res.data)
    }

    //delete data
    const handleDeleteData = () => {
        setDeleteConfirm(true)
    }
    const callYesDeleteData = async(id) => {
        await axios.delete(`http://localhost:1700/backend/category/${id}`)
        getData()
        setDeleteConfirm(false)
    }
    const callNoDeleteData = () => {
        setDeleteConfirm(false)
    }

    const toggleCategoryStatus = async(id, currentStatus) => {
        const newStatus = currentStatus === 1 ? 0 : 1;

        const res = await axios.put(`http://localhost:1700/backend/category/${id}`,
        {"status": newStatus})

        console.log(res.data)

        setCategory((prev) => prev.map((cat) => cat.category_id === id ? {...cat, status: newStatus} : cat))
    }

    const filteredItems = useMemo(() => {
        if (!search) return category;

        return category.filter(cat =>
            Object.values(cat).some((value) => 
                String(value).toLowerCase().includes(search.toLowerCase())
            )
        )
    }, [search, category])

    const tabledata = search ? filteredItems : category
  return (

    <div>
        <div className='all-div'>
        <div className='table-heading-div'>
            <div className="button-heading-div">
                <Link to='/dashboard'><button type="button" className='back-button'><i class="fa-solid fa-arrow-left"></i></button></Link>
            <h2 className='profile-h3'>Manage Category</h2>
            </div>
            
            <button type="button" className='admin-add-btn' onClick={() => {
                if(!localStorage.getItem("admin_id")){
                alert("Login to your account to access the panel")
                navigate('/')
                return
            }
            else{
                navigate(`/add-category`)
            }}}
        ><i class="fa-solid fa-plus"></i> &nbsp;Add New Data</button>
            
        </div>

        <div>
            <input type="search" name="searchcustomer" id="searchcustomer" placeholder='Search here...' className='form-control admin-search-btn' value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>

        <div className='admin-table-div table-container' >
            <table className='admin-table category-table product-table'>
                <thead className='admin-head'>
                    <th >Sr. No.</th>
                    <th className='product-row'>Category Name</th>
                    <th className='product-row'>Status</th>
                    <th className='product-row'>Action</th>
                </thead>

                <tbody className='admin-body'>
                    {tabledata && tabledata.length > 0 ? (
                        tabledata.map((obj , i) => 
                        <tr>
                            <td>{++i}</td>
                            <td className='product-row'>{obj.category_name}</td>
                            <td className='product-row'>
                                <label className='status-switch'>
                                <input type="checkbox"
                                    checked = {Number(obj.status) === 1}
                                    onChange={() => toggleCategoryStatus(obj.category_id, obj.status)}
                                />
                                <span className='slider'></span>
                                </label>
                            </td>
                            <td className='admin-btn-td category-btns product-row'>
                                <button className='admin-edit product-edit' onClick={() => {
                                    if(!localStorage.getItem("admin_id")){
                                        alert("Login to your account to access the admin panel")
                                        navigate('/')
                                        return
                                    }
                                    else{
                                        navigate(`/add-category/${obj.category_id}`)
                                    }
                                }}><i class="fa-solid fa-pen-to-square"></i></button>
                                <button className='admin-edit' onClick={() => {
                                    if(!localStorage.getItem("admin_id")){
                                        alert("Login to your account to access the admin panel")
                                        navigate('/')
                                        console.log("hello")
                                        return
                                    }
                                    else{
                                        handleDeleteData()
                                        setDeleteId(obj.category_id)
                                    }
                                }}><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                        )
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>Result Not Found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {deleteConfirm ? (
                <ConfirmDelete
                    yesDeleteData={() => callYesDeleteData(deleteId)}
                    noDeleteData={callNoDeleteData}
                />
            ) : ('')}
        </div>
        </div>
    </div>
  )
}
