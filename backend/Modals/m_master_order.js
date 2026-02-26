import express from 'express'

import {
    getMasterOrders,
    getMasterOrder,
    deleteMasterOrder,
    insertMasterOrder,
    updateMasterOrder
} from '../Controllers/master_order.js'

const route_masterorder = express.Router()

route_masterorder.get('/', getMasterOrders)
route_masterorder.get('/:id', getMasterOrder)
route_masterorder.delete('/:id', deleteMasterOrder)
route_masterorder.post('/', insertMasterOrder)
route_masterorder.put('/:id', updateMasterOrder)

export default route_masterorder
