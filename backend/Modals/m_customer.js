import express from 'express'

import {
    getCustomers,
    getCustomer,
    deleteCustomer,
    insertCustomer,
    updateCustomer
} from '../Controllers/customer.js'

const route_customer = express.Router()

route_customer.get('/', getCustomers)
route_customer.get('/:id', getCustomer)
route_customer.delete('/:id', deleteCustomer)
route_customer.post('/', insertCustomer)
route_customer.put('/:id', updateCustomer)

export default route_customer