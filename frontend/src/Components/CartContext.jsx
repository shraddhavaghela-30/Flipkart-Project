import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const cust_id = localStorage.getItem("customer_id")

  const getCartData = async(cust_id) => {
    const res = await axios.get(`http://localhost:1700/backend/cart/${cust_id}`);
    setCartItems(res.data);
  };

  const getWishlistData = async() => {
    const res = await axios.get(`http://localhost:1700/backend/wishlist/${cust_id}`)
    setWishlistItems(res.data);
  }
  const handleAddToCart = async(product, cust_id) => {
    if(!cust_id){
        alert("please login to access cart")
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

        setCartItems(prev => [...prev, res.data])
        return res
    }
  }

  // const handleDeleteCartItem = async(id) => {
  //         const res = await axios.delete(`http://localhost:1700/backend/cart/${id}`)
  //         getCartData()
  //         console.log('delete',res.data)
  // }

  const handleAddToWishlist = async(product, cust_id) => {
        if(!cust_id){
            alert("Please login to access wishlist")
            navigate('/login')
            return
        }else{
            const formdata = new FormData()
            formdata.append("customer_id", cust_id)
            formdata.append("product_id", product.product_id)
            formdata.append("file", product.image)
            formdata.append("product_name", product.product_name)
            formdata.append("price", product.price)
            formdata.append("offer", product.discount)
            formdata.append("entry_by", cust_id)
            const res = await axios.post('http://localhost:1700/backend/wishlist', formdata)
            console.log(res.data)
        } 
    }

        const handleAddToCartFromWishlist = async(product, cust_id) => {
            const formdata = new FormData()
            formdata.append("customer_id", cust_id)
            formdata.append("product_id", product.product_id)
            formdata.append("file", product.image)
            formdata.append("product_name", product.product_name)
            formdata.append("price", product.price)
            formdata.append("offer", product.offer)
            formdata.append("entry_by", cust_id)
    
            const res = await axios.post("http://localhost:1700/backend/cart", formdata)
            setCartItems(prev => [...prev, res.data])
            
    
            // handleDeleteWishlistProduct(product.product_id)
            await axios.delete(`http://localhost:1700/backend/wishlist/${product.product_id}`)
            getWishlistData()
            console.log(product.product_id)
        }

  useEffect(() => { 
    getCartData(cust_id); 
    getWishlistData(cust_id)
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, wishlistItems, setCartItems, getCartData, getWishlistData, handleAddToCart, handleAddToWishlist, handleAddToCartFromWishlist }}>
      {children}
    </CartContext.Provider>
  );
};