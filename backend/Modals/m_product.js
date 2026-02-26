import express from 'express'
import multer from 'multer'
import {
    getProducts,
    getProduct,
    getCategoryProduct,
    deleteProduct,
    insertProduct,
    updateProduct
} from '../Controllers/product.js'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

const route_product = express.Router()

route_product.get('/', getProducts)
route_product.get('/:id', getProduct)
route_product.get('/category/:id', getCategoryProduct)
route_product.delete('/:id', deleteProduct)
route_product.post('/', upload.single("file") , insertProduct)
route_product.put('/:id', upload.single("file") , updateProduct)

export default route_product
