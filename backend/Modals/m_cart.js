import express from 'express'

import {
    getCart,
    getCartItem,
    deleteCartItem,
    deleteAllCartItem,
    insertCartItem,
    updateCartItem
} from '../Controllers/cart.js'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

const route_cart = express.Router()

route_cart.get('/', getCart)
route_cart.get('/:id', getCartItem)
route_cart.delete('/:id', deleteCartItem)
route_cart.delete('/allcartitem/:id', deleteAllCartItem)
route_cart.post('/',upload.single("file"), insertCartItem)
route_cart.put('/:id',upload.single("file"), updateCartItem)

export default route_cart