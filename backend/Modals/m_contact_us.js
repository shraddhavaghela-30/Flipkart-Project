import express from 'express'

import {
    getAllContactUs,
    getContactUs,
    deleteContactUs,
    insertContactUs
} from '../Controllers/contact_us.js'

const route_contactus = express.Router()

route_contactus.get('/', getAllContactUs)
route_contactus.get('/:id', getContactUs)
route_contactus.delete('/:id', deleteContactUs)
route_contactus.post('/', insertContactUs)

export default route_contactus