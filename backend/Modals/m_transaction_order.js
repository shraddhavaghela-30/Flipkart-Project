import express from 'express'

import {
    getTrnOrders,
    getTrnOrder,
    getTransactionByOrderId,
    deleteTrnOrder,
    insertTrnOrder,
    updateTrnOrder
} from '../Controllers/transaction_order.js'

const route_transactionorder = express.Router()

route_transactionorder.get('/', getTrnOrders)
route_transactionorder.get('/:id', getTrnOrder)
route_transactionorder.get('/orderid/:id', getTransactionByOrderId)
route_transactionorder.delete('/:id', deleteTrnOrder)
route_transactionorder.post('/', insertTrnOrder)
route_transactionorder.put('/:id', updateTrnOrder)

export default route_transactionorder