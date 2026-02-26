import {React,useContext,useEffect,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CartContext } from './CartContext.jsx'

export default function Wishlist() {
    const navigate = useNavigate()
    const [wishlist, setWishlist] = useState([])
    const cust_id = localStorage.getItem("customer_id")

    const {handleAddToCart, wishlistItems, getWishlistData, handleAddToCartFromWishlist} = useContext(CartContext)

    useEffect(() => {

        if(!cust_id){
            alert("Login to your account to access your wishlist")
            navigate('/login')
            return
        }
        // getData()
        getWishlistData(cust_id)
    }, [])

    // const getData = async() => {
    //     const res = await axios.get('http://localhost:1700/backend/wishlist')
    //     setWishlist(res.data)
    // }

    const handleDeleteWishlistProduct = async(id) => {
        await axios.delete(`http://localhost:1700/backend/wishlist/${id}`)
            // getData()
        getWishlistData(cust_id)
    }

    // const handleAddToCart = async(product) => {
    //     const formdata = new FormData()
    //     formdata.append("customer_id", cust_id)
    //     formdata.append("product_id", product.product_id)
    //     formdata.append("file", product.image)
    //     formdata.append("product_name", product.product_name)
    //     formdata.append("price", product.price)
    //     formdata.append("offer", product.offer)
    //     formdata.append("entry_by", cust_id)

    //     const res = await axios.post("http://localhost:1700/backend/cart", formdata)
    //     console.log("insert", res.data)

    //     // handleDeleteWishlistProduct(product.product_id)
    //     await axios.delete(`http://localhost:1700/backend/wishlist/${product.product_id}`)
    // }
  return (
    <div>
        <div className='category-heading wishlist-div'>
            <span className='c-heading-1'>Your Wishlist</span>
        </div>
        <div className='cart-items wishlist-items'>
            {wishlistItems.map((obj) => (
                <div className='cart-single-item'>
                    <img src={`img/${obj.image}`} alt="list-img" className='cart-img'/>
                    
                        <div className='cart-item-details1'>
                            <p className='cart-detail1'>{obj.product_name}</p>
                            <span className='cart-price'>Rs {obj.price}/-</span>
                            <span className='cart-offer'>{obj.offer}% off</span>
                            <div className='cart-items-count'>
                                
                                <div className='wishlist-buttons'>
                                    <button type="button" className='addtocart-wishlist-btn' onClick={() => (handleAddToCartFromWishlist(obj, cust_id))}>Add to Cart</button>
                                    <button type="button" className='cart-remove-btn' onClick={() => (handleDeleteWishlistProduct(obj.product_id))}>Remove</button>
                                </div>
                            </div>
                        </div> 
                    
                </div>
            ))}
        </div>
    </div>
  )
}
