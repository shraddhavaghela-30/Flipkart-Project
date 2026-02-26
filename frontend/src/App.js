import {React, useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import { CartProvider } from './Components/CartContext';
import {Route, Routes} from 'react-router-dom'
import Layout from './Components/Layout';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Category from './Components/Category';
import Product from './Components/Product';
import Cart from './Components/Cart';
import ForgotPwd from './Components/ForgotPwd';
import ChangePwd from './Components/ChangePwd';
import ContactUs from './Components/ContactUs';
import AboutUs from './Components/AboutUs';
import Wishlist from './Components/Wishlist';
import EditProfile from './Components/EditProfile';
function App() {

  const [cart, setCart] = useState([])

  useEffect(() => {
    getData();
  }, [])
  const getData = async() => {
    const res = await axios.get("http://localhost:1700/backend/cart")
    setCart(res.data)
  }
  return (
    <CartProvider>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
          <Route path='/forgot-password' element={<ForgotPwd/>}/>
          <Route path='/change-password' element={<ChangePwd/>}/>
          <Route path='/editprofile' element={<EditProfile/>}/>

          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Home cartCount={cart.length}/>}/>
            <Route path='/category/:id' element={<Category/>}/>
            <Route path='/product/:id' element={<Product/>}/>
            <Route path='/cart' element={<Cart cart={cart} getData={getData}/>}/>
            <Route path='/contact-us' element={<ContactUs/>}/>
            <Route path='/about-us' element={<AboutUs/>}/>
            <Route path='/wishlist' element={<Wishlist/>}/>
          </Route>

      
    </Routes>
    </CartProvider>
  );
}

export default App;
