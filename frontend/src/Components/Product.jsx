import {React, useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { CartContext } from './CartContext.jsx'

export default function Product() {

    const {handleAddToCart, handleAddToWishlist} = useContext(CartContext)

    const {id} = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState([])

    const cust_id = localStorage.getItem("customer_id")

    useEffect(() => {
        if(id){
            getProductData(id)
        }
    }, [id])

    const getProductData = async(id) => {
        const productRes = await axios.get(`http://localhost:1700/backend/product/${id}`)
        setProduct(productRes.data)
    }

    // const handleAddToWishlist = async() => {
    //     if(!cust_id){
    //         alert("Please login to access wishlist")
    //         navigate('/login')
    //         return
    //     }else{
    //         const formdata = new FormData()
    //         formdata.append("customer_id", cust_id)
    //         formdata.append("product_id", product.product_id)
    //         formdata.append("file", product.image)
    //         formdata.append("product_name", product.product_name)
    //         formdata.append("price", product.price)
    //         formdata.append("offer", product.discount)
    //         formdata.append("entry_by", cust_id)
    //         const res = await axios.post('http://localhost:1700/backend/wishlist', formdata)
    //         console.log(res.data)
    //     } 
    // }

    // const handleAddToCart = async() => {
    //     if(!cust_id){
    //         alert("please login to access cart")
    //         navigate('/login')
    //         return
    //     }
    //     else{
    //         const formdata = new FormData()
    //         formdata.append("customer_id", cust_id)
    //         formdata.append("product_id", product.product_id)
    //         formdata.append("file", product.image)
    //         formdata.append("product_name", product.product_name)
    //         formdata.append("price", product.price)
    //         formdata.append("offer", product.discount)
    //         formdata.append("entry_by", cust_id)

    //         const res = await axios.post("http://localhost:1700/backend/cart", formdata)
    //         alert("Product added to cart.")
    //         console.log("insert", res.data)
    //     }
    // }
    const handleBuyNow = async() => {
        if(!cust_id){
            alert("please login to buy product")
            navigate('/login')
            return
        }
        else{
            const formdata = new FormData()
            formdata.append("customer_id", cust_id)
            formdata.append("product_id", product.product_id)
            formdata.append("file", product.image)
            formdata.append("product_name", product.product_name)
            formdata.append("price", product.price)
            formdata.append("offer", product.discount)
            formdata.append("entry_by", cust_id)

            const res = await axios.post("http://localhost:1700/backend/cart", formdata)
            alert("Product added to cart.")
            navigate("/cart")
        }

    }
  return (
    <div className='product-div container'>
        <div className='product-div1'>
            <img src={`/img/${product.image}`} alt="list-img" className='product-img'/>
            <Link to='/wishlist'><i class="fa-solid fa-heart heart-logo" onClick={() => (handleAddToWishlist(product, cust_id))}></i></Link>
            <div className='product-btn-div'>
                <button type='button' className='add-to-cart' onClick={() => (handleAddToCart(product, cust_id))}>
                    <i className="fa-solid fa-cart-shopping add-to-cart-span"></i>
                    <span>&nbsp;ADD TO CART</span>
                </button>
                <button type="button" className='buy-now' onClick={handleBuyNow}>
                    <img src="/img/buy-now.svg" alt="buy-now" className='buy-now-img'/>
                    <span>BUY NOW</span>
                </button>
            </div>
        </div>
        <div className='product-div2'>
            <span className='product-name'>{product.product_name}</span>
            <div className='rating-div'>
                <span className='rating'><span className='rating-number'>4.3</span> &nbsp;<img src="/img/star.svg" alt="star" className='star-logo'/></span>
                <span className='review'>564 Ratings & 68 Reviews</span>
            </div>
            <div>
                <span className='sp-price'>Special Price</span>
                <div>
                    <span className='price-span'>₹{product.price}</span>
                    <span className='offer-span'>&nbsp; {product.discount}% off</span>
                </div>
            </div>
            <div className='product-details1'>
                <span className='warranty'>Warranty</span>
                <p>1 Year of Warranty provided by the manufacturer from the date of purchase</p>
            </div>
            <div className='product-details2'>
                <span className='warranty'>Description</span>
                <p>{product.description}</p>
            </div>
        </div>
    </div>
  )
}
