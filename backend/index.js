import express from 'express'
import cors from 'cors'

import route_admin from './Modals/m_admin.js';
import route_cart from './Modals/m_cart.js';
import route_category from './Modals/m_category.js';
import route_contactus from './Modals/m_contact_us.js';
import route_customer from './Modals/m_customer.js';
import route_masterorder from './Modals/m_master_order.js'
import route_product from './Modals/m_product.js'
import route_transactionorder from './Modals/m_transaction_order.js'
import route_wishlist from './Modals/m_wishlist.js'
import route_aboutus from './Modals/m_about_us.js';
import login from './Modals/m_adminLogin.js';
import route_customerLogin from './Modals/m_customerLogin.js';
import route_adminContact from './Modals/m_adminContact.js';

const app = express()
app.use(express.json())
app.use(cors())

app.use("/backend/admin", route_admin)
app.use("/backend/cart" , route_cart)
app.use("/backend/category", route_category)
app.use("/backend/contactus", route_contactus)
app.use("/backend/customer", route_customer)
app.use("/backend/masterorder", route_masterorder)
app.use("/backend/product", route_product)
app.use("/backend/transactionorder", route_transactionorder)
app.use("/backend/wishlist", route_wishlist)
app.use('/backend/aboutus', route_aboutus)
app.use('/backend/admincontact', route_adminContact)

app.use('/backend/login', login)
app.use('/backend/customerlogin', route_customerLogin)

app.use('/images', express.static("images"))

app.listen(1700, () => {
    console.log("Server is running on port 1700 successfully.")
})