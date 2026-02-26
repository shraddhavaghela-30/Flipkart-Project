import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./Components/Layout";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import ManageAdmin from "./Components/ManageAdmin";
import ManageCustomer from "./Components/ManageCustomer";
import ManageCategory from "./Components/ManageCategory";
import ManageProducts from "./Components/ManageProducts";
import ManageAboutUs from "./Components/ManageAboutUs";
import AddAdmin from "./Components/AddAdmin";
import EditCustomer from "./Components/EditCustomer";
import AddCategory from "./Components/AddCategory";
import AddProducts from "./Components/AddProducts";
import MasterOrder from "./Components/MasterOrder";
import EditMST from "./Components/EditMST";
import TransactionOrder from "./Components/TransactionOrder";
import Cart from "./Components/Cart";
import Wishlist from "./Components/Wishlist";
import ChangePassword from "./Components/ChangePassword";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import ManageContactus from "./Components/ManageContactus";
import EditAdminContact from "./Components/EditAdminContact";
import Dashboard from "./Components/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
            <Route element={<Layout/>}>
              <Route path="/profile" element={<Profile/>} />
              <Route path="/manage-admin" element={<ManageAdmin/>}/>
              <Route path="/manage-customer" element={<ManageCustomer/>}/>
              <Route path="/manage-category" element={<ManageCategory/>}/>
              <Route path="/manage-products" element={<ManageProducts/>}/>
              <Route path='/manage-aboutus' element={<ManageAboutUs/>}/>
              <Route path="/add-admin" element={<PrivateRoute><AddAdmin/></PrivateRoute>} />
              <Route path="/add-category" element={<PrivateRoute><AddCategory/></PrivateRoute>}/>
              <Route path="/add-products" element={<PrivateRoute><AddProducts/></PrivateRoute>}/>
              <Route path="/add-aboutus" element={<PrivateRoute><AboutUs/></PrivateRoute>}/>
              <Route path="/order-mst" element={<MasterOrder/>}/>
              <Route path="/edit-mst" element={<PrivateRoute><EditMST/></PrivateRoute>}/>
              <Route path='/order-trn' element={<TransactionOrder/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/wishlist" element={<Wishlist/>}/>
              <Route path="/change-password" element={<PrivateRoute><ChangePassword/></PrivateRoute>}/>
              {/* <Route path="/about-us" element={<AboutUs/>}/> */}
              <Route path="/Inquiry" element={<ContactUs/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/contact-us" element={<ManageContactus/>}/>
              <Route path="/contact-us/1" element={<PrivateRoute><EditAdminContact/></PrivateRoute>}/>

              <Route path="/add-admin/:id" element={<PrivateRoute><AddAdmin/></PrivateRoute>} />
              <Route path="/edit-customer/:id" element={<PrivateRoute><EditCustomer/></PrivateRoute>}/>
              <Route path="/add-category/:id" element={<PrivateRoute><AddCategory/></PrivateRoute>}/>
              <Route path="/add-products/:id" element={<PrivateRoute><AddProducts/></PrivateRoute>}/>
              <Route path="/add-aboutus/:id" element={<PrivateRoute><AboutUs/></PrivateRoute>}/>
              <Route path="/order-trn/:id" element={<TransactionOrder/>}/>
            </Route>
      </Routes>
    </>
  );
}

export default App;
