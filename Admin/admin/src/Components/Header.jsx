import React from 'react';
// import { Link } from 'react-router-dom';
const Header = () => {
    return (
    <header>
        <div className="nav-bar">
            <div className="nav-1">
                <img src="/logo.png" alt="logo" className="logo"/>
                <span className="logo-span">NiceAdmin</span>
            </div>
            <div className="nav-2">
                <span className="fa-solid fa-bars nav-icons"></span>
                <input type="search" name="search" id="search" className="form-control search-input" placeholder="Search"/>
                <span className="fa-solid fa-magnifying-glass search-icon"></span>
            </div>
            <div className="nav-3">
                <span className="fa-regular fa-bell nav-icons bell-icon"><span className="icon-bg bell-bg">4</span></span>
                <span className="fa-regular fa-message nav-icons chat-icon"><span className="icon-bg chat-bg">3</span></span>
                <div className="profile-div">
                    <img src="/profile-img.jpg" alt="profile-img" className="profile-img"/>
                    <div className="dropdown dpdwn">
                        <span className="dropdown-toggle dropdown-className" data-toggle="dropdown">K. Anderson <span className="caret"></span></span>

                        <ul className="dropdown-menu dpdwn-menu">
                            <li className="name-li">
                                <div className="name-div">
                                    <span className="name-span">Kevin Anderson</span>
                                    <span className="post-span">Web Designer</span>
                                </div>
                            </li>
                            <li className="li-border">
                                <i className="fa-regular fa-user"></i>
                                <span>My Profile</span>
                            </li>
                            <li className="li-border">
                                <i className="fa-solid fa-gear"></i>
                                <span>Account Settings</span>
                            </li>
                            <li className="li-border">
                                <i className="fa-regular fa-circle-question"></i>
                                <span>Need Help</span>
                            </li>
                            <li className="li-border">
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                <span>Sign Out</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
    )
}


export default Header;