import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { CartContext } from "./CartContext";
import axios from 'axios'

export default function Navbar() {

    const navigate = useNavigate()

    const { cartItems, wishlistItems } = useContext(CartContext);

    const prevCartLen = useRef(cartItems.length)
    const prevWishlistLen = useRef(wishlistItems.length)
    const cust_id = localStorage.getItem("customer_id")
    const [cartAnimate, setCartAnimate] = useState(false)
    const [wishlistAnimate, setWishlistAnimate] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])


    const filteredItems = useMemo(() => {

        if (!query) return [];

        const filteredProducts = product.filter(item => (
            item.product_name?.toLowerCase().includes(query.toLowerCase())
        ))

        const filteredCategories = category.filter(item => (
            item.category_name?.toLowerCase().includes(query.toLowerCase())
        ))

        return [...filteredProducts, ...filteredCategories]
    }, [query, product, category])

    const handleLogout = () => {
        localStorage.removeItem("customer_id")
        alert(" You are logout successfully")
        navigate('/')
    }

    useEffect(() => {
        getData()
        console.log(filteredItems)
    }, [])

    useEffect(() => {
        document.body.classList.toggle('search-open', !!query);

        if (query) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
        document.body.style.overflow = "auto";
    }
    }, [query])

    // useEffect(() => {
    //     const cartChanged = cartItems.length !== prevCartLen.current;
    //     const wishlistChanged = wishlistItems.length !== prevWishlistLen.current

    //     if(cartChanged || wishlistChanged){
    //         setAnimate(true)
        
    //     const timer = setTimeout(() => {
    //         setAnimate(false)
    //     }, 350)

    //     prevCartLen.current = cartItems.length;
    //     prevWishlistLen.current = wishlistItems.length;
        
    //     return () => {
    //         clearTimeout(timer)
    //     }
    // }

    // prevCartLen.current = cartItems.length;
    // prevWishlistLen.current = wishlistItems.length

    
    // }, [cartItems.length, wishlistItems.length,query])\

    useEffect(() => {
        if(cartItems.length !== prevCartLen.current)
        {
            setCartAnimate(true)
            setTimeout(() => {setCartAnimate(false)}, 350)
        }
        prevCartLen.current = cartItems.length
    }, [cartItems.length])

    useEffect(() => {
        if(wishlistItems.length !== prevWishlistLen.current)
        {
            setWishlistAnimate(true)
            setTimeout(() => {setWishlistAnimate(false)}, 350)
        }
        prevWishlistLen.current = wishlistItems.length
    }, [wishlistItems.length])


    const getData = async() => {
        const res = await axios.get('http://localhost:1700/backend/category')
        setCategory(res.data)
        const productRes = await axios.get('http://localhost:1700/backend/product')
        setProduct(productRes.data)
    }

    

  return (
    <>
        <nav class="navbar-main navbar-fixed-top">
        <div>
            <Link to='/'><img src="/img/bars-sm.svg" alt="bar-sm" class="bar-sm"/></Link>
            <Link to='/'><img src="/img/flipkart-logo.svg" alt="flipkart-logo" class="flipkart-logo"/></Link>
        </div>
        <div class="search-div">
            <img src="/img/search-logo.svg" alt="search-logo" class="search-icon"/>
            <input type="search" name="search" id="search" class="search" placeholder="Search for Products, Categories and More" value={query} onChange={(e) => (setQuery(e.target.value), setIsOpen(true))}/>

            
                {isOpen && (
                    query && 
                        <ul className='search-scroll' style={{
                        listStyle: 'none',
                        position: 'absolute',
                        top: '47px',
                        left: '0',
                        // transform: 'translateX(-50%)',
                        
                        width: '100%',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        fontSize: '16px',
                        backdropFilter: 'blur(4px)',
                        zIndex: '9999',
                        padding: '10px 0',
                        background: '#fff',
                        borderRadius: '12px',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
                        }}>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((obj, i) => {

                                const isProduct = !!obj.product_id
                                const linkto = isProduct ? `/product/${obj.product_id}` : `/category/${obj.category_id}`
                                return (
                                    <Link to={linkto} key={isProduct ? obj.product_id : obj.category_id}>
                                    <li className='search-list' 
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#f0f5ff';
                                            // e.currentTarget.style.paddingLeft = '24px';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            // e.currentTarget.style.paddingLeft = '5px';
                                        }} onClick={() => (setIsOpen(false), setQuery(''))}
                                        >{isProduct ? obj.product_name : obj.category_name}</li>
                                    </Link>
                                )})
                        ) : (
                            <li
                                style={{
                                    padding: '8px',
                                    lineHeight: '1.4',
                                    transition: 'background 0.2s ease, padding-left 0.2s ease'
                                }}>Result Not Found</li>
                            )}
                        </ul>
                )
                }
            
            
        </div>
        <div class="in-navbar-2">

            <div class="mobile-sm">
                <img src="/img/mobile-sm.svg" alt="mobile-sm"/>
            </div>

            <div className='navbar-cart-div'>
                <Link to='/cart' class="logo-btn"><img src="/img/cart-logo.svg" alt="cart-logo"/><span class="cart-span">Cart</span> </Link>
                {cartItems.length > 0 && (
                    <span className={`badge ${cartAnimate ? "bump" : ""}`} style={{
                            // background: '#ff3b3b',
                            background: '#2874f0',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '600',
                            minWidth: '18px',
                            height: '18px',
                            padding: '0 6px',
                            borderRadius: '999px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.2s ease'
                    }}>{cartItems.length}</span> 
                    )}
                    
            </div>
            <div className="navbar-cart-div">
                <Link to='/wishlist' class="seller-div logo-btn">
                    <span class="logo-btn"><img src="/img/login-ul4.svg" alt="store-logo"/><span class="seller-span">&nbsp; Wishlist</span></span>
                </Link>
                {wishlistItems.length > 0 && (
                    <span className={`badge ${wishlistAnimate ? "bump" : ""}`} style={{
                            // background: '#ff3b3b',
                            background: '#2874f0',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '600',
                            minWidth: '18px',
                            height: '18px',
                            padding: '0 6px',
                            borderRadius: '999px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.2s ease'
                    }}>{wishlistItems.length}</span> 
                    )}

            </div>
            <div class="login-div">
                {/* <button type="button" class="logo-btn login-logo-btn logobtn-hover">
                    <img src="img/login-logo.svg" alt="login-logo" class="login-img"/>
                    <img src="img/user-logo-white.svg" alt="user-logo-white" class="login-img-white"/>
                    <span class="login-logo">&nbsp; Login&nbsp;&nbsp;</span>
                    <span class="fa-solid fa-chevron-down arrow-down"></span>
                </button> */}

                {cust_id ? (
                    <div className='logo-btn login-logo-btn logobtn-hover' onClick={handleLogout}>
                    <img src="/img/login-logo.svg" alt="login-logo" class="login-img"/>
                    <img src="/img/user-logo-white.svg" alt="user-logo-white" class="login-img-white"/>
                    <span class="login-logo">&nbsp; Logout&nbsp;&nbsp;</span>
                    <span class="fa-solid fa-chevron-down arrow-down"></span>
                </div>
                ) : (
                <Link to='/login' className='logo-btn login-logo-btn logobtn-hover'>
                    <img src="/img/login-logo.svg" alt="login-logo" class="login-img"/>
                    <img src="/img/user-logo-white.svg" alt="user-logo-white" class="login-img-white"/>
                    <span class="login-logo">&nbsp; Login&nbsp;&nbsp;</span>
                    <span class="fa-solid fa-chevron-down arrow-down"></span>
                </Link>
                )}

                <div class="login-popup" id="loginpopup">
                    Login
                </div>
                <div class="drop-down">
                    <div class="in-login">
                        <span>New customer?</span>
                        <Link to='/signup' class="sign-up">Sign Up</Link>
                    </div>
                    <div class="login-border"></div>
                    <ul class="ul-in-login">
                        <Link to='/editprofile' className='change-password'>
                            <li>
                                <img src="/img/login-logo.svg" alt="login-logo"/>
                                <span>My Profile</span>                            
                            </li>
                        </Link>
                        <Link to='/change-password' className='change-password'>
                            <li>
                                <i class="fa-solid fa-lock"></i>
                                <span>Change Password</span>                         
                            </li>
                        </Link>
                        <li>
                            <img src="/img/login-ul2.svg" alt="login-ul2"/>
                            <span>Flipkart Plus Zone</span>
                        </li>
                        <li>
                            <img src="/img/login-ul3.svg" alt="login-ul3"/>
                            <span>Orders</span>
                        </li>
                        <Link to='/wishlist' className='change-password'>
                            <li>
                                <img src="/img/login-ul4.svg" alt="login-ul4"/>
                                <span>Wishlist</span>
                            </li>
                        </Link>
                        <li>
                            <img src="/img/login-ul5.svg" alt="login-ul5"/>
                            <span>Rewards</span>
                        </li>
                        <li>
                            <img src="/img/login-ul6.svg" alt="login-ul6"/>
                            <span>Gift cards</span>
                        </li>
                        <li className='change-password' onClick={handleLogout}>
                            <span className='fa-solid fa-sign-out-alt'></span>
                            <span>Log out</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bar-div">
                <img src="/img/dot-bar-logo.svg" alt="dot-bar-logo" class="bar-logo"/>
                <div class="drop-down bar-dropdown">
                    <ul class="ul-in-login">
                        <li>
                            <img src="/img/bar-ul1.svg" alt="bar-ul1"/>
                            <span>Notificaton Preferences</span>
                        </li>
                        <li>
                            <img src="/img/bar-ul2.svg" alt="bar-ul2"/>
                            <span>24x7 Customer Care</span>
                        </li>
                        <li>
                            <img src="/img/bar-ul3.svg" alt="bar-ul3"/>
                            <span>Advertise</span>
                        </li>
                        <li>
                            <img src="/img/bar-ul4.svg" alt="bar-ul4"/>
                            <span>Download App</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    </>
  )
}
