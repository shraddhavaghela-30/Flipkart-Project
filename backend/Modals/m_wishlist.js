import express from 'express'
import multer from 'multer'
import {
    getWishlists,
    getWishlist,
    deleteWishlist,
    insertWishlist,
    updateWishlist
} from '../Controllers/wishlist.js'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename:(req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

const route_wishlist = express.Router()

route_wishlist.get('/', getWishlists)
route_wishlist.get('/:id', getWishlist)
route_wishlist.delete('/:id', deleteWishlist)
route_wishlist.post('/',upload.single("file"), insertWishlist)
route_wishlist.put('/:id',upload.single("file"), updateWishlist)

export default route_wishlist