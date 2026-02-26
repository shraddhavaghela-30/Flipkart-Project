import express from 'express'
import {
    getAboutUsAll,
    getAboutUs,
    deleteAboutUs,
    insertAboutUs,
    updateAboutUs
} from '../Controllers/about_us.js'
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
const uploadimages = upload.fields([{name: 'imageone', maxCount:1}, {name: 'imagetwo', maxCount:1}])
const route_aboutus = express.Router()

route_aboutus.get('/', getAboutUsAll)
route_aboutus.get('/:id', getAboutUs)
route_aboutus.delete('/:id', deleteAboutUs)
route_aboutus.post('/', uploadimages, insertAboutUs)
route_aboutus.put('/:id', uploadimages, updateAboutUs)

export default route_aboutus