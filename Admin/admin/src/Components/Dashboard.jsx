import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate()
  return (
    <div className='all-div'>

        <div className='table-heading-div'>
            <h2 className='profile-h3'>Dashboard</h2>
        </div>

        <div className='dashboard'>
            <Link to='/profile' className='dashboard-divs'>
                <i class="fa-solid fa-user dashboard-icon"></i>
                <span>Profile</span>
            </Link>

            <Link to='/manage-admin' className='dashboard-divs'>
                <i class="fa-solid fa-user-tie dashboard-icon"></i>
                <span>Manage Admin</span>
            </Link>

            <Link to='/manage-customer' className='dashboard-divs'>
                <i class="fa-solid fa-users dashboard-icon"></i>
                <span>Manage Customer</span>
            </Link>

            <Link to='/manage-category' className='dashboard-divs'>
                <i class="fa-solid fa-list-check dashboard-icon"></i>
                <span>Manage Category</span>
            </Link>

            <Link to='/manage-products' className='dashboard-divs'>
                <i class="fa-solid fa-boxes-stacked dashboard-icon"></i>
                <span>Manage Products</span>
            </Link>

            <Link to='/order-mst' className='dashboard-divs'>
                <i class="fa-solid fa-cart-shopping dashboard-icon"></i>
                <span>Manage Order</span>
            </Link>

            <Link to='/cart' className='dashboard-divs'>
                <i class="fa-solid fa-bag-shopping dashboard-icon"></i>
                <span>Cart</span>
            </Link>

            <Link to='/wishlist' className='dashboard-divs'>
                <i class="fa-solid fa-heart dashboard-icon"></i>
                <span>Wishlist</span>
            </Link>

            <div onClick={() => {
                if(!localStorage.getItem("admin_id")){
                    alert("Login to your account to access the panel")
                    navigate('/')
                    return
                }
                else{
                    navigate(`/change-password`) 
                }}}
                className='dashboard-divs'>
                <i class="fa-solid fa-key dashboard-icon"></i>
                <span>Change Password</span>
            </div>

            <Link to='/manage-aboutus' className='dashboard-divs'>
                <i class="fa-solid fa-circle-info dashboard-icon"></i>
                <span>About Us</span>
            </Link>

            <Link to='/inquiry' className='dashboard-divs'>
                <i class="fa-solid fa-circle-question dashboard-icon"></i>
                <span>Inquiry</span>
            </Link>

            <Link to='/contact-us' className='dashboard-divs'>
                <i class="fa-solid fa-address-book dashboard-icon"></i>
                <span>Contact Us</span>
            </Link>
        </div>
    </div>
  )
}
