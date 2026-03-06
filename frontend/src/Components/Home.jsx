import {React, useContext, useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { CartContext } from './CartContext'
import axios from 'axios'

export default function Home() {

    const {getCartData, getWishlistData} = useContext(CartContext)
    const {id} = useParams()
    const cust_id = localStorage.getItem('customer_id')
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])


    useEffect(() => {
        getAllProducts()
        getCategory()
        getCartData(cust_id)
        getWishlistData(cust_id)
    } ,[id, cust_id])

    const getAllProducts = async() => {
        const res = await axios.get('http://localhost:1700/backend/product')
        setProducts(res.data)
    }

    const getCategory = async() => {
        const res = await axios.get('http://localhost:1700/backend/category')
        setCategory(res.data)
        console.log(res.data)
    }
  return (
        <div className="container">
        <div className="ul-1">
            <div className="ul-1-div">
                <img src="/img/2-ul-1.png" alt="2-ul-1"/>
                <span className="ul-1-div-span">Minutes</span>
            </div>
            <div className="ul-1-div">
                <img src="/img/2-ul-2.png" alt="2-ul-2"/>
                 <span className="ul-1-div-span">Mobiles & Tablets</span>
            </div>
            <div className="ul-1-div">
                <img src="/img/2-ul-3.png" alt="2-ul-3"/>
                <span className="ul-1-div-span">Fashion</span>
            </div>
            <div className="ul-1-div">
                <img src="/img/2-ul-4.png" alt="2-ul-4"/>
                <span className="ul-1-div-span">Electronics</span>
            </div>
            <div className="ul-1-div">
                <img src="/img/2-ul-5.jpg" alt="2-ul-5"/>
                <span className="ul-1-div-span">TV & Appliances</span>
            </div>
            <div className="ul-1-div">
                <img src="/img/2-ul-6.png" alt="2-ul-6"/>
                <span className="ul-1-div-span">Home & Furniture</span>
            </div>
            <div className="ul-1-div">
                <img src="/img/2-ul-7.png" alt="2-ul-7"/>
                <span className="ul-1-div-span">Flight Bookings</span>
            </div>
            <div className="ul-1-div">
                <img src="/img/2-ul-8.png" alt="2-ul-8"/>
                <span className="ul-1-div-span">Beauty & Food</span>
            </div>
            <div className="ul-1-div">
                <img src="/img/2-ul-9.png" alt="2-ul-9"/>
                <span className="ul-1-div-span">Grocery</span>
            </div>
        </div>

        <div id="flipkart-carousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#flipkart-carousel" data-slide-to="0" className="active"></li>
                <li data-target="#flipkart-carousel" data-slide-to="1"></li>
                <li data-target="#flipkart-carousel" data-slide-to="2"></li>
                <li data-target="#flipkart-carousel" data-slide-to="3"></li>
                <li data-target="#flipkart-carousel" data-slide-to="4"></li>
            </ol>

            <div className="carousel-inner">
                <div className="item active">
                    <img src="img/carousel-1.png" alt="carousel-1"/>
                </div>
                <div className="item">
                    <img src="img/carousel-2.png" alt="carousel-2"/>
                </div>
                <div className="item">
                    <img src="img/carousel-3.png" alt="carousel-3"/>
                </div>
                <div className="item">
                    <img src="img/carousel-4.png" alt="carousel-4"/>
                </div>
                <div className="item">
                    <img src="img/carousel-5.png" alt="carousel-5"/>
                </div>
            </div>

            <a className="left carousel-control car-control" href="#flipkart-carousel" data-slide="prev"><span className="fa-solid fa-chevron-left carousel-left"></span></a>
            <a className="right carousel-control car-control" href="#flipkart-carousel" data-slide="next"><span className="fa-solid fa-chevron-right carousel-right"></span></a>
        </div>

        <div className="all-shop-div">
            {category && category.filter(obj => obj.status).filter(obj => products.filter(p => p.category_id === obj.category_id).length >= 4).map((obj) => (
                <div className="inner-shop-div">
                    <div className="grid-heading">
                        <span>{obj.category_name}</span>
                        <Link to={`/category/${obj.category_id}`}><button type="button" className="grid-right-icon"><span className="fa-solid fa-chevron-right"></span></button></Link>
                    </div>
                    <div className="grid-div">
                        {products && products.filter(product => product.category_id === obj.category_id).slice(0, 4).map((obj) => (
                            <Link to={`/category/${obj.category_id}`} className="grid-item">
                                <img src={`/img/${obj.image}`} alt="grid-img-1" className="grid-img-1"/>
                                <div className="grid-content">
                                    <div className="grid-content-div">{obj.product_name}</div>
                                    <span className="offer">From ₹{obj.price}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
