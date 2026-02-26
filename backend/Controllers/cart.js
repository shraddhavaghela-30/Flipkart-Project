import { db } from "../db.js";

export const getCart = (req, res) => {
    // const getCartAllQuery = 'SELECT *, DATE_FORMAT(entry_date, "%d-%m-%Y") AS entry_date1, DATE_FORMAT(update_date, "%d-%m-%Y") AS update_date1 FROM `cart`';

    const getCartAllQuery = 'SELECT cart.cart_id, cart.product_id, cart.customer_id, customer.name, customer.mobile_no, customer.city, customer.state, customer.address, cart.image, cart.product_name, cart.price, cart.offer, cart.quantity FROM cart INNER JOIN customer ON cart.customer_id = customer.customer_id;'

    db.query(getCartAllQuery, (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
};

export const getCartItem = (req, res) => {
    const getCartItemQuery = 'SELECT cart.cart_id, cart.product_id, cart.customer_id, customer.name, customer.mobile_no, customer.city, customer.state, customer.address, cart.image, cart.product_name, cart.price, cart.offer, cart.quantity FROM cart INNER JOIN customer ON cart.customer_id = customer.customer_id WHERE cart.customer_id = ?';

    db.query(getCartItemQuery, [req.params.id], (err,data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
};

export const deleteCartItem = (req, res) => {
    const deleteCartItemQuery = 'DELETE FROM `cart` WHERE `product_id` = ?'

    db.query(deleteCartItemQuery, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data deleted successfully")
        }
    })
};

export const deleteAllCartItem = (req, res) => {
    const deleteAllCartItemQuery = 'DELETE FROM `cart` WHERE `customer_id` = ?'

    db.query(deleteAllCartItemQuery, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data deleted successfully")
        }
    })
};

export const insertCartItem = (req, res) => {
    const insertCartItemQuery = 'INSERT INTO `cart`(`customer_id`,`product_id`,`image`, `product_name`, `price`, `offer`, `quantity`, `entry_date`, `entry_by`) VALUES (?)'

    const value = [
        req.body.customer_id,
        req.body.product_id,
        req?.file?.filename || req?.body?.file,
        req.body.product_name,
        req.body.price,
        req.body.offer,
        req.body.quantity || 1,
        new Date(),
        req?.body?.entry_by,
    ]

    db.query(insertCartItemQuery, [value], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data inserted successfully")
        }
    })
};

export const updateCartItem = (req, res) => {
    const updateCartItemQuery = 'UPDATE `cart` SET `customer_id` =? , `product_id` = ?,`image`= ?,`product_name`= ?,`price`= ?,`offer`= ?, `quantity`= ?, `update_date`= ?, `update_by`= ? WHERE `cart_id` = ?';

    const value = [
        req.body.customer_id,
        req.body.product_id,
        req?.file?.filename || req?.body?.file,
        req.body.product_name,
        req.body.price,
        req.body.offer,
        req.body.quantity || 1,
        new Date(),
        req?.body?.update_by
    ]

    db.query(updateCartItemQuery, [...value, req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data updated successfully")
        }
    })
}