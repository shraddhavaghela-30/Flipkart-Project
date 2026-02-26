import express from 'express'
import {
    getAdminContact,
    updateAdminContact
} from '../Controllers/admin_contact.js'

const route_adminContact = express.Router()

route_adminContact.get('/', getAdminContact)
route_adminContact.put('/:id', updateAdminContact)

export default route_adminContact