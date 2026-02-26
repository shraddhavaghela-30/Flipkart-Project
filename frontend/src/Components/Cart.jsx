import {React, useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CartContext } from "./CartContext.jsx";


export default function Cart() {
    const navigate = useNavigate()
    // const [cart, setCart] = useState([])

    const {cartItems, setCartItems ,getCartData} = useContext(CartContext)
    
    const customer_id = localStorage.getItem("customer_id")
    

    useEffect(() => {
        
        if(!customer_id){
            alert("Login to your account to access the cart")
            navigate('/login')
            return
        }
        // getData()
        getCartData(customer_id)
    } , [customer_id, navigate])
    // const getData = async() => {
    //     const res = await axios.get('http://localhost:1700/backend/cart')
    //     // setCart(res.data)
    //     setCartItems(res.data)
    // }

    const handleDeleteCartItem = async(id) => {
            const res = await axios.delete(`http://localhost:1700/backend/cart/${id}`)
            //  getData()
            getCartData(customer_id)
            console.log(res.data)
            console.log("Deleted rows:", id);
    }


    const deleteAllCartItems = async(customer_id) => {
        const res = await axios.delete(`http://localhost:1700/backend/cart/allcartitem/${customer_id}`)
        console.log(res.data)
        // getData()
        getCartData(customer_id)
    }

    const handlePlaceOrder = async() => {

        if(totalItems === 0){
            alert("Please add products to place the order")
            return
        }

        const items = cartItems.map((obj) => ({
            "product_id": obj.product_id,
            "price": obj.price,
            "quantity": obj.quantity,
            "entry_by": customer_id
        }))
        const payload = {
            "customer_id": customer_id,
            "total_items" : totalItems,
            "amount": totalAmount,
            "discount": countDiscount,
            "coupons": 100,
            "delivery_charges": 'free',
            "total_amount": finalAmount,
            "total_discount": savedAmount,
            "entry_by": customer_id,
            items
        }
        const res = await axios.post("http://localhost:1700/backend/masterorder", payload)
        deleteAllCartItems(customer_id)
        alert("congratulations!! Your orders are placed...")
        
        console.log(res.data)
    }

    const AddValue = (id) => {
        setCartItems(prev => prev.map(item => item.product_id === id ? {...item, "quantity": item.quantity + 1} : item))
    }
    const removeValue = (id) => {
        setCartItems(prev => prev.map(item => item.product_id === id && item.quantity > 1 ? {...item, "quantity": item.quantity - 1} : item))
    }

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity , 0)
    const totalAmount = cartItems.reduce((sum , item) => sum + (item.price * item.quantity), 0)
    const countDiscount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity * (item.offer / 100)), 0)
    const finalAmount = totalAmount - countDiscount - 100
    const savedAmount = totalAmount - finalAmount
  return (
    <div className='cart-div cart-boxes container'>
    
        <div className='category-heading cart-heading' >
            <span className='c-heading-1'>Your Cart</span>
        </div>
        <div className='cart-in-div'>
            <div className='cart-div1'>
        {cartItems.map((obj) => (
            <div className='cart-items'>
            <div className='cart-single-item'>
                <div className="cart-image"><img src={`/img/${obj.image}`} alt="list-img" className='cart-img'/></div>
                    <div className='cart-item-details1'>
                        <p className='cart-detail1'>{obj.product_name}</p>
                        <span className='cart-price'>Rs {obj.price}/-</span>
                        <span className='cart-offer'>{obj.offer}% off</span>
                        <div className='cart-items-count'>
                            <div className='cart-item-counter'>
                                <button type="button" onClick={() => (removeValue(obj.product_id))} className='counter-minus'>-</button>
                                <button type="button" className='counter-value'>{obj.quantity}</button>
                                <button type="button" onClick={() => (AddValue(obj.product_id))} className='counter-plus'>+</button>
                            </div>
                            <div>
                                <button type="button" className='cart-remove-btn' onClick={() => handleDeleteCartItem(obj.product_id)
                                }>Remove</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        ))}

        
            </div> 

            <div className='cart-div2'>
                <div className='cart-div2-price'>
                    <span className='price-details'>Price Details</span>
                    <div className='price-divs price-border-top'>
                        <span>Price ({totalItems} items)</span>
                        <span>-Rs {totalAmount}/-</span>
                    </div>
                    <div className='price-divs'>
                        <span>Discount</span>
                        <span className='other-disc'>-Rs {countDiscount.toFixed(2)}/-</span>
                    </div>
                    <div className='price-divs'>
                        <span>Coupons for you</span>
                        <span className='other-disc'>-Rs 100/-</span>
                    </div>
                    <div className='price-divs'>
                        <span>Delivery Charges</span>
                        <span className='other-disc'>Free</span>
                    </div>
                    <div className='price-divs'>
                        <span className='total-price'>Total Amount</span>
                        <span className='total-price'>-Rs {finalAmount.toFixed(2)}/-</span>
                    </div>
                    <span className='save-price'>You saved ₹{savedAmount.toFixed(2)} in this order!</span>
                </div>

                <div className='cart-div2-order'>
                    <button type="button" className='cart-div2-order-btn' onClick={handlePlaceOrder}>PLACE ORDER</button> 
                </div>
            </div>
        </div>
    </div>
  )
}
