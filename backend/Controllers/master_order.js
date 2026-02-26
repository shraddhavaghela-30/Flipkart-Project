import {db} from '../db.js'

export const getMasterOrders = (req, res) => {
    // const getMasterOrdersQuery = 'SELECT *, DATE_FORMAT(order_date, "%d-%m-%Y") AS order_date1, DATE_FORMAT(entry_date, "%d-%m-%Y") AS entry_date1, DATE_FORMAT(update_date, "%d-%m-%Y") AS update_date1 FROM `master_order`'

    const getMasterOrdersQuery = 'SELECT master_order.`order_id`, customer.`name`, customer.`mobile_no`,customer.`city`, customer.`state` ,customer.`address`, master_order.`order_date`, master_order.`total_items`, master_order.`amount`, master_order.`discount`, master_order.`total_amount`, master_order.`total_discount`,  DATE_FORMAT(order_date, "%d-%m-%Y") AS order_date1 FROM master_order INNER JOIN customer ON master_order.`customer_id` = customer.`customer_id`'

    db.query(getMasterOrdersQuery, (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
};

export const getMasterOrder = (req, res) => {
    const getMasterOrderQuery = 'SELECT * FROM `master_order` WHERE `order_id` = ?'

    db.query(getMasterOrderQuery, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data[0])
        }
    })
};

export const deleteMasterOrder = (req, res) => {
    const deleteMasterOrderQuery = 'DELETE FROM `master_order` WHERE `order_id` = ?'

    db.query(deleteMasterOrderQuery, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data deleted succssfully")
        }
    })
};

export const insertMasterOrder = (req, res) => {

    const {items} = req.body 
    const insertMasterOrderQuery = 'INSERT INTO `master_order`(`customer_id`, `order_date`, `total_items`,`amount`, `discount`, `coupons`, `delivery_charges`, `total_amount`, `total_discount`, `entry_date`, `entry_by`) VALUES (?)';

    const value = [
        req.body.customer_id,
        new Date(),
        req.body.total_items,
        req.body.amount,
        req.body.discount,
        req.body.coupons,
        req.body.delivery_charges,
        req.body.total_amount,
        req.body.total_discount,
        new Date(),
        req.body.entry_by
    ]

    db.query(insertMasterOrderQuery, [value], (err, data) => {
        if(err){
            return res.json(err)
        }
        const order_id = data.insertId;

        const trnItems = items.map(obj => [
            obj.product_id,
            order_id,
            obj.price,
            obj.quantity,
            new Date(),
            req.body.entry_by
        ])

        const insertTrnOrderQuery = 'INSERT INTO `transaction_order`(`product_id`, `order_id`, `price`, `quantity`, `entry_date`, `entry_by`) VALUES ?'

        db.query(insertTrnOrderQuery, [trnItems], (err, data) => {
            if(err){
                return res.json(err)
            }
            else{
                return res.json("Transaction orders inserted successfully.")
            }
        })
    })

};


export const updateMasterOrder = (req, res) => {
    const updateMasterOrderQuery = 'UPDATE `master_order` SET `customer_id`= ?,`order_date`= ?,`total_items`= ?,`amount` = ?,`discount`= ?,`coupons`= ?,`delivery_charges`= ?,`total_amount`= ?,`total_discount`= ?,`update_date`= ?, `update_by`= ? WHERE `order_id` = ?'

    const value = [
        req.body.customer_id,
        new Date(),
        req.body.total_items,
        req.body.amount,
        req.body.discount,
        req.body.coupons,
        req.body.delivery_charges,
        req.body.total_amount,
        req.body.total_discount,
        new Date(),
        req.body.update_by
    ]

     db.query(updateMasterOrderQuery, [...value, req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data updated succssfully")
        }
    })

}