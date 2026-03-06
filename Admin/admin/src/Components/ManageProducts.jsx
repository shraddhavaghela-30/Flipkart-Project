import {React, useState, useEffect, useMemo} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ViewDetails from './ViewDetails'
import ConfirmDelete from './ConfirmDelete'
export default function ManageProducts() {

    const [isOpenView, setIsOpenView] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [product, setProduct] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState([])
    const [searchcategory, setSearchCategory] = useState('All')
    const [desc, setDesc] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [deleteId, setDeleteId] = useState('')

    const navigate = useNavigate()

    useEffect(()=> {
        getCategory()
        getData()
    }, [])

    const getData = async() => {
        const res = await axios.get('http://localhost:1700/backend/product')
        setProduct(res.data)
    }
    const getCategory = async() => {
        const res = await axios.get('http://localhost:1700/backend/category')
        setCategory(res.data)
    }

    //delete data
    const handleDeleteData = () => {
        setConfirmDelete(true)
    }

    const callYesDeleteData = async(id) => {
        await axios.delete(`http://localhost:1700/backend/product/${id}`)
        getData()
        setConfirmDelete(false)
    }

    const callNoDeleteData = () => {
        setConfirmDelete(false)
    }

    const handleViewDetails = (description) => {
        setIsOpenView(true)
        setDesc(description)
    }
    const handleCloseViewDetails = () => {
        setIsOpenView(false)
    }

    const filteredItems = useMemo(() => {
        // if(!search) return product

        // if(search !== ""){
        //     return product.filter((prod) => 
        //     Object.values(prod).some((value) => (
        //         String(value).toLowerCase().includes(search.toLowerCase())
        //     )))
        // }

        // if(searchcategory !== 'All')
        // {
        //     return product.filter(
        //         prod => prod.category_id === Number(searchcategory)
        //     )
        // }

        return product.filter((prod) => {
            const categorymatch = searchcategory === 'All' || 
            prod.category_id === Number(searchcategory)

            const searchmatch = search === '' || 
            Object.values(prod).some((value) => (
                String(value).toLowerCase().includes(search.toLowerCase())
            ))
            return categorymatch && searchmatch
        })
    }, [search, product, searchcategory])
    
    const filteredCategories = useMemo(() => {
        if (!search) return category

        const matchedProducts = product.filter((prod) => (
            Object.values(prod).some((value) => (
                String(value).toLowerCase().includes(search.toLowerCase())
            ))
        ))

        const catIds = new Set(
            matchedProducts.map(prod => prod.category_id)
        )

        return category.filter((cat) => (
            catIds.has(cat.category_id)
        ))
    }, [search, product, category])

    // const tabledata = search ? filteredItems : product
  return (
    <div>
      <div className='all-div'>
        <div className='table-heading-div'>
            <div className="button-heading-div">
                <Link to='/dashboard'><button type="button" className='back-button'><i class="fa-solid fa-arrow-left"></i></button></Link>
                <h2 className='profile-h3'>Manage Products</h2>
            </div>
        
            <button type="button" className='admin-add-btn' onClick={() => {
                                    if(!localStorage.getItem("admin_id")){
                                        alert("Login to your account to access the panel")
                                        navigate('/')
                                        return
                                    }
                                    else{
                                        navigate(`/add-products`)
                                    }}}><i class="fa-solid fa-plus"></i> &nbsp;Add New Data</button>
        
        </div>

        <div style={{display: 'flex', flexDirection:'row', gap: '10px'}}>
            <input type="search" name="searchcustomer" id="searchcustomer" placeholder='Search here...' className='form-control admin-search-btn' value={search} onChange={(e) => (setSearch(e.target.value))}/>

            <select name="cat" id="cat" value={searchcategory} onChange={(e) => (setSearchCategory(e.target.value))} className='form-control admin-search-btn'>
                <option value="All">All Category</option>
                {filteredCategories.map((obj) => (
                    <option value={obj.category_id}>{obj.category_name}</option>
                ))}
            </select>
        </div>

        <div className='admin-table-div  table-container'>
            <table className='admin-table product-table'>
                <thead className='admin-head'>
                    <th>Sr. No.</th>
                    {/* <th>Category ID</th> */}
                    <th>Category</th>
                    <th className='product-row'>Product Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Description</th>
                    <th>Action</th>
                </thead>

                <tbody className='admin-body'>
                    {filteredItems && filteredItems.length > 0 ? (
                        filteredItems.map((obj, i) => (
                        <tr>
                            <td>{++i}</td>
                            <td>{obj.category_name}</td>
                            <td className='product-row'>{obj.product_name}</td>
                            <td>
                                <img src={`http://localhost:1700/images/${obj.image}`} alt="product-image" height={50} width={50}  className='admin-image' onClick={() => setPreviewImage(`http://localhost:1700/images/${obj.image}`)}/>

                                {previewImage && (
                                    <div className='image-modal' onClick={() => setPreviewImage(null)}>
                                        <span className='close-admin-image'><i class="fa-regular fa-circle-xmark"></i></span>
                                        <img src={previewImage} className='modal-image' alt="Image" onClick={(e) => (e.stopPropagation)} />
                                    </div>
                                    
                                )}
                                
                                </td>
                            <td>{obj.price}</td>
                            <td>{obj.discount}</td>
                            <td><button type="button" className='view-details-btn' onClick={() => handleViewDetails(obj.description)}>View</button></td>
                            <td className='product-btn-td'>
                            <button className='admin-edit product-edit' onClick={() => {
                                if(!localStorage.getItem("admin_id")){
                                    alert("Login to your account to access admin panel")
                                    navigate("/")
                                }
                                else{
                                    navigate(`/add-products/${obj.product_id}`)
                                }
                            }}><i class="fa-solid fa-pen-to-square"></i></button>
                            <button className='admin-edit'><i class="fa-solid fa-trash" onClick={() => {
                                if(!localStorage.getItem("admin_id")){
                                    alert("Login to your account to access admin panel")
                                    navigate("/")
                                }else{
                                    handleDeleteData()
                                    setDeleteId(obj.product_id)
                                }
                            }}></i></button>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" style={{ textAlign: "center", padding: "20px"}}>Result Not Found</td>
                        </tr>
                    )}


                </tbody>
            </table>
             {isOpenView ? (
                <ViewDetails
                    isOpen={isOpenView}
                    onClose={handleCloseViewDetails}
                    address={desc}
             />) : ("")}

             {confirmDelete ? (
                <ConfirmDelete 
                    yesDeleteData={() => callYesDeleteData(deleteId)}
                    noDeleteData={callNoDeleteData}
                />
             ) : ("")}
        </div>
    </div>
    </div>
  )
}
