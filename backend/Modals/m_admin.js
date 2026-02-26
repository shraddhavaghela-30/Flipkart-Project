import express from 'express'
import multer from 'multer'

import{
    getAdmin,
    getAdmins,
    deleteAdmin,
    insertAdmin,
    updateAdmin,
    // insertAdminPassword,
    // updateAdminPassword
} from '../Controllers/admin.js'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

const route_admin = express.Router()

route_admin.get('/', getAdmins)
route_admin.get('/:id', getAdmin)
route_admin.delete('/:id', deleteAdmin)
route_admin.post('/',upload.single("file"), insertAdmin)
route_admin.put('/:id',upload.single("file"), updateAdmin)
// route_admin.post('/password', insertAdminPassword)
// route_admin.put('/password/:id', updateAdminPassword)

export default route_admin