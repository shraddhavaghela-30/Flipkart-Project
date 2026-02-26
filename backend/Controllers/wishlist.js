import { db } from "../db.js";

export const getWishlists = (req, res) => {
    // const getWishlistsQuery = 'SELECT *, DATE_FORMAT(entry_date, "%d-%m-%Y") AS entry_date1, DATE_FORMAT(update_date, "%d-%m-%Y") AS update_date1 FROM `wishlist`';

    const getWishlistsQuery = 'SELECT wishlist.wishlist_id, wishlist.product_id, customer.customer_id,customer.name, customer.mobile_no, customer.city, customer.state, customer.address, image, product_name, price, offer FROM wishlist INNER JOIN customer on customer.customer_id = wishlist.customer_id'

    db.query(getWishlistsQuery, (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
};

export const getWishlist = (req, res) => {
    const getWishlistQuery = 'SELECT wishlist.wishlist_id, wishlist.product_id, customer.customer_id,customer.name, customer.mobile_no, customer.city, customer.state, customer.address, image, product_name, price, offer FROM wishlist INNER JOIN customer on customer.customer_id = wishlist.customer_id WHERE wishlist.customer_id = ?';

    db.query(getWishlistQuery, [req.params.id] , (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
};

export const deleteWishlist = (req, res) => {
    const deleteWishlistQuery = 'DELETE FROM `wishlist` WHERE `product_id` = ?';

    db.query(deleteWishlistQuery, [req.params.id] , (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data deleted successfully")
        }
    })
};

export const insertWishlist = (req, res) => {
    const insertWishlistQuery = 'INSERT INTO `wishlist`(`customer_id`, `product_id`, `image`, `product_name`, `price`,`offer`, `entry_date`, `entry_by`) VALUES (?)';

    const value = [
        req.body.customer_id,
        req.body.product_id,
        req?.file?.filename || req?.body?.file,
        req.body.product_name,
        req.body.price,
        req.body.offer,
        new Date(),
        req.body.entry_by
    ]

    db.query(insertWishlistQuery, [value] , (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data inserted successfully")
        }
    })
};

export const updateWishlist = (req, res) => {
    const updateWishlistQuery = 'UPDATE `wishlist` SET `customer_id`= ?,`product_id`= ?,`image`= ?,`product_name`= ?,`price`= ?,`offer` = ? ,`update_date`= ?, `update_by`= ? WHERE `wishlist_id` = ?';

    const value = [
        req.body.customer_id,
        req.body.product_id,
        req?.file?.filename || req?.body?.file,
        req.body.product_name,
        req.body.price,
        req.body.offer,
        new Date(),
        req.body.update_by
    ]

    db.query(updateWishlistQuery, [...value, req.params.id] , (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data updated successfully")
        }
    })
};