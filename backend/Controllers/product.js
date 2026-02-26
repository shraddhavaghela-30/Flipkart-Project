import {db} from '../db.js'

export const getProducts = (req, res) => {
    // const getProductsQuery = 'SELECT *, DATE_FORMAT(entry_date, "%d-%m-%Y") AS entry_date1, DATE_FORMAT(update_date, "%d-%m-%Y") AS update_date1 FROM `product`';

    const getProductsQuery = 'SELECT * , category.category_name FROM product INNER JOIN category ON product.category_id = category.category_id;'

    db.query(getProductsQuery, (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
};

export const getProduct = (req, res) => {
    const getProductQuery = 'SELECT * FROM `product` WHERE `product_id`= ?';

    db.query(getProductQuery, [req.params.id],(err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data[0])
        }
    })
};

export const getCategoryProduct = (req, res) => {
    const getCategoryProductQuery = 'SELECT * FROM `product` WHERE `category_id` = ?'

    db.query(getCategoryProductQuery, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
}

export const deleteProduct = (req, res) => {
    const deleteProductQuery = 'DELETE FROM `product` WHERE `product_id` = ?';

    db.query(deleteProductQuery, [req.params.id] , (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data deleted successfully")
        }
    })
};

export const insertProduct = (req, res) => {
    const insertProductQuery = 'INSERT INTO `product`(`category_id`, `product_name`, `image`, `price`, `discount`, `description`, `entry_date`, `entry_by`) VALUES (?)'

    const value = [
        req.body.category_id ,
        req.body.product_name,
        req?.file?.filename || req?.body?.file,
        req.body.price,
        req.body.discount,
        req.body.description,
        new Date(),
        req.body.entry_by
    ]

    db.query(insertProductQuery, [value], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data inserted successfully")
        }
    })
}

export const updateProduct = (req, res) => {
    const updateProductQuery = 'UPDATE `product` SET `category_id`= ?,`product_name`= ?,`image`= ?,`price`= ?,`discount`= ?,`description`= ?, `update_date`= ?, `update_by`= ? WHERE `product_id` = ?'

    const value = [
        req.body.category_id ,
        req.body.product_name,
        req?.file?.filename || req?.body?.file,
        req.body.price,
        req.body.discount,
        req.body.description,
        new Date(),
        req.body.update_by
    ]

    db.query(updateProductQuery, [...value, req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data updated successfully")
        }
    })
}