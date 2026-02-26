import {React, useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
export default function Category() {

    const {id} = useParams()
    const [category, setCategory] = useState({})
    const [categoryProduct, setCategoryProduct] = useState([])

    useEffect(() => {
        if(id){
            getIdData(id)
            getCategoryData(id)
        }
        
    } , [id])
    
    const getIdData = async(id) => {
        const res = await axios.get(`http://localhost:1700/backend/category/${id}`)
        setCategory(res.data)
    }

    const getCategoryData = async(id) => {
        const catRes = await axios.get(`http://localhost:1700/backend/product/category/${id}`)
        setCategoryProduct(catRes.data)
    }

  return (
    <div className='category-div'>
      <div className='category-heading'>
        <span className='c-heading-1'>{category.category_name}</span>
        <span className='c-heading-2'>{categoryProduct.length} items</span>
      </div>
      <div className='category-list'>
                {categoryProduct.map((obj) => (
                    <Link to={`/product/${obj.product_id}`} className='deal-list-item'>
                    <img src={`/img/${obj.image}`} alt="list-img-1" className="deals-img"/>
                    <span className='category-name-span'>{obj.product_name}</span>
                    <span className="deal-price">From ₹{obj.price}</span>
                    </Link>
                ))}
                
                {/* <Link to='/product' class="deal-list-item">
                    <img src="/img/list-img-2.png" alt="list-img-2" class="deals-img speaker-img"/>
                    <span>Mobile Cables </span>
                    <span class="deal-price">From ₹499</span>
                </Link>
                <Link to='/product' class="deal-list-item">
                    <img src="img/list-img-3.jpeg" alt="list-img-2" class="deals-img speaker-img"/>
                    <span>Apple iPhone 17</span>
                    <span class="deal-price">From ₹82,900</span>
                </Link>
                <Link to='/product' class="deal-list-item">
                    <img src="img/list-img-4.png" alt="list-img-3" class="deals-img"/>
                    <span>Monitors</span>
                    <span class="deal-price">From ₹6599</span>
                </Link>
                <Link to='/product' class="deal-list-item">
                    <img src="img/list-img-5.png" alt="list-img-5" class="deals-img"/>
                    <span>Top Mirrorless Camera</span>
                    <span class="deal-price">Shop Now!</span>
                </Link>
                <Link to='/product' class="deal-list-item">
                    <img src="img/list-img-6.png" alt="list-img-6" class="deals-img"/>
                    <span>Fastrack Smartwatch</span>
                    <span class="deal-price">From ₹1,399</span>
                </Link>
                <Link to='/product' class="deal-list-item">
                    <img src="img/list-img-7.png" alt="list-img-7" class="deals-img"/>
                    <span>Wireless Headphones</span>
                    <span class="deal-price">Grab Now</span>
                </Link>
                <Link to='/product' class="deal-list-item">
                    <img src="img/list-img-8.png" alt="list-img-8" class="deals-img"/>
                    <span>Printers</span>
                    <span class="deal-price">From ₹2336</span>
                </Link>
                <Link to='/product' class="deal-list-item">
                    <img src="img/list-img-7.png" alt="list-img-7" class="deals-img"/>
                    <span>Wireless Headphones</span>
                    <span class="deal-price">Grab Now</span>
                </Link>
                <Link to='/product' class="deal-list-item">
                    <img src="img/list-img-8.png" alt="list-img-8" class="deals-img"/>
                    <span>Printers</span>
                    <span class="deal-price">From ₹2336</span>
                </Link> */}
      </div>
    </div>
  )
}
