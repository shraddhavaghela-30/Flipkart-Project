import {React, useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import ViewDetails from './ViewDetails'

export default function TransactionOrder() {
    const {id} = useParams()
    const [trnOrder, setTrnOrder] = useState([])
    const [previewImage, setPreviewImage] = useState(null)

    useEffect(() => {
        getData(id)
    } , [id])
    
    const getData = async(id) => {
        const res = await axios.get(`http://localhost:1700/backend/transactionorder/orderid/${id}`)
        setTrnOrder(res.data)
        console.log(res.data)
    }
  return (
    <div>
        <div className='all-div'>
        <div className='button-heading-div' style={{marginBottom: '30px'}}>
            <Link to='/order-mst'><button type="button" className='back-button'><i class="fa-solid fa-arrow-left"></i></button></Link>
            
            <h2 className='profile-h3'>Transaction Order</h2>
        </div>
        <div className='admin-table-div table-container'>
            <table className='admin-table category-table product-table'>
                <thead className='admin-head'>
                    <th>Sr. No.</th>
                    <th>Product Image</th>
                    <th className='product-row'>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </thead>

                <tbody className='admin-body'>
                    {trnOrder.map((obj, i) => (
                        <tr>
                            <td>{++i}</td>
                            <td>
                                <img src={`http://localhost:1700/images/${obj.image}`} alt="Product Image" height={50} width={50} className='admin-image' onClick={() => setPreviewImage(`http://localhost:1700/images/${obj.image}`)}/>

                                {previewImage && (
                                    <div className='image-modal' onClick={() => setPreviewImage(null)}>
                                        <span className='close-admin-image'><i class="fa-regular fa-circle-xmark"></i></span>
                                        <img src={previewImage} alt="Profile Image" className='modal-image' onClick={(e) => e.stopPropagation()} />
                                    </div>
                                )}
                            </td>
                            <td className='product-row'>{obj.product_name}</td>
                            <td>{obj.price}</td>
                            <td>{obj.quantity}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
        </div>
    </div>
  )
}
