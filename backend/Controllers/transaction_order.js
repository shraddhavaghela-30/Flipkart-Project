import {db} from '../db.js'

export const getTrnOrders = (req, res) => {
    const getTrnOrdersQuery = 'SELECT *, DATE_FORMAT(entry_date, "%d-%m-%Y") AS entry_date1, DATE_FORMAT(update_date, "%d-%m-%Y") AS update_date1 FROM `transaction_order`';

    db.query(getTrnOrdersQuery, (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
};

export const getTrnOrder = (req, res) => {
    const getTrnOrderQuery = 'SELECT * FROM `transaction_order` WHERE `transaction_id` = ?';

    db.query(getTrnOrderQuery, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data[0])
        }
    })
};

export const getTransactionByOrderId = (req, res) => {
    // const getTransactionByOrderIdQuery = 'SELECT master_order.order_id, transaction_order.order_id, product.product_name, transaction_order.price, transaction_order.quantity FROM ((transaction_order INNER JOIN product) INNER JOIN master_order) WHERE transaction_order.order_id = master_order.order_id;'

    const getTransactionByOrderIdQuery = "SELECT transaction_order.order_id, product.image, product.product_name, transaction_order.price, transaction_order.quantity FROM transaction_order INNER JOIN product ON transaction_order.product_id = product.product_id WHERE transaction_order.order_id = ?"

    db.query(getTransactionByOrderIdQuery, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
}

export const deleteTrnOrder = (req, res) => {
    const deleteTrnOrderQuery = 'DELETE FROM `transaction_order` WHERE `transaction_id` = ?';

    db.query(deleteTrnOrderQuery, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data deleted successfully")
        }
    })
};

export const insertTrnOrder = (req, res) => {
    const insertTrnOrderQuery = 'INSERT INTO `transaction_order`(`product_id`, `order_id`, `price`, `quantity`, `entry_date`, `entry_by`) VALUES (?)'

    const value = [
        req.body.product_id,
        req.body.order_id,
        req.body.price,
        req.body.quantity,
        new Date(),
        req.body.entry_by,
    ]

    db.query(insertTrnOrderQuery, [value] , (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data inserted successfully")
        }
    })

}

export const updateTrnOrder = (req, res) => {
    const updateTrnOrderQuery = 'UPDATE `transaction_order` SET `product_id`= ?,`order_id`= ?,`price`= ?,`quantity`= ?, `update_date`= ?,`update_by_role`= ?,`update_by`= ? WHERE `transaction_id` = ?'

    const value = [
        req.body.product_id,
        req.body.order_id,
        req.body.price,
        req.body.quantity,
        new Date(),
        req.body.update_by
    ]

    db.query(updateTrnOrderQuery, [...value, req.params.id] , (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data updated successfully")
        }
    })

}