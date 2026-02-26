import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Sidebar = () =>    {

    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem("admin_id")
        alert("You are logged out successfully")
        navigate('/')
    }
    return(
        <div className="sidebar">
        <ul>
            <li className="sidebar-list" id="sdb-list2">
                <div className="sbd-list-btn">
                    <i class="fa-solid fa-border-all"></i>
                    <Link to='/dashboard' className='sbd-link'>Dashboard</Link>
                </div>
            </li>

            <li className="sidebar-list" id="sdb-list2">
                <div className="sbd-list-btn">
                    <i class="fa-solid fa-user"></i>
                    <Link to='/profile' className='sbd-link'>Profile</Link>
                </div>
            </li>

            <li className="sidebar-list" id="sdb-list5">
                <div className="sbd-list-btn">
                    <i class="fa-solid fa-user-tie"></i>
                    <Link to='/manage-admin' className='sbd-link'>Manage Admin</Link>
                </div>
            </li>

            <li className="sidebar-list" id="sdb-list5">
                <div className="sbd-list-btn">
                    <i class="fa-solid fa-users"></i>
                    <Link to='/manage-customer' className='sbd-link'>Manage Customer</Link>
                </div>
            </li>

            <li className="sidebar-list" id="sdb-list5">
                <div className="sbd-list-btn">
                    <i class="fa-solid fa-list-check"></i>
                    <Link to='/manage-category' className='sbd-link'>Manage Category</Link>
                </div>
            </li>

            <li className="sidebar-list" id="sdb-list5">
                <div className="sbd-list-btn">
                    <i class="fa-solid fa-boxes-stacked"></i>
                    <Link to='/manage-products' className="sbd-link">Manage Products</Link>
                </div>
            </li>

            {/* <li className="sidebar-list" id="sdb-list5">
                <div className="sbd-list-btn">
                    <i class="fa-solid fa-list"></i>
                    <Link to='/manage-order' className="sbd-link">Manage Order</Link>
                </div>
            </li> */}
            <li className="sidebar-list" id="sdb-list2">
                <div className="sbd-list-btn">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <Link to='/order-mst' className="sbd-link">Manage Order</Link>
                </div>

            </li>

            <li className="sidebar-list" id="sdb-list5">
                <div className="sbd-list-btn">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <Link to='/cart' className="sbd-link">Cart</Link>
                </div>
            </li>

            <li className="sidebar-list" id="sdb-list5">
                <div className="sbd-list-btn">
                    <i class="fa-solid fa-heart"></i>
                    <Link to='/wishlist' className="sbd-link">Wishlist</Link>
                </div>
            </li>

            <li className="sidebar-list" id="sdb-list5">
                <div className="sbd-list-btn">
                    <i class="fa-solid fa-key"></i>
                    <Link to='/change-password' className='sbd-link'>Change Password</Link>
                </div>
            </li>

            <li className="sidebar-list" id="sdb-list5">
                <div className="sbd-list-btn">
                    <i class="fa-solid fa-circle-info"></i>
                    <Link to='/manage-aboutus' className="sbd-link">About Us</Link>
                </div>
            </li>

            <li className="sidebar-list" id="sdb-list5">
                <div className="sbd-list-btn">
                    {/* <i class="fa-solid fa-phone"></i> */}
                    <i class="fa-solid fa-circle-question"></i>
                    <Link to='/inquiry' className="sbd-link">Inquiry</Link>
                </div>
            </li>

            <li className="sidebar-list" id="sdb-list5">
                <div className="sbd-list-btn">
                    <i class="fa-solid fa-address-book"></i>
                    <Link to='/contact-us' className="sbd-link">Contact Us</Link>
                </div>
            </li>

            <li className="sidebar-list" id="sdb-list5" onClick={handleLogOut}>
                <div className="sbd-list-btn" >
                    <i class="fa-solid fa-sign-out-alt"></i>
                    <span className="sbd-link">Logout</span>
                </div>
            </li>
        </ul>
    </div>
    )
}
export default Sidebar;