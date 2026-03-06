import {db} from '../db.js'

export const getCustomers = (req, res) => {
    
    const getCustomersQuery = 'SELECT *, DATE_FORMAT(entry_date, "%d-%m-%Y") AS entry_date1 , DATE_FORMAT(update_date, "%d-%m-%Y") AS update_date1 FROM `customer`'

    db.query(getCustomersQuery , (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
};

export const getCustomer = (req, res) => {
    const getCustomerQuery = 'SELECT * FROM `customer` WHERE `customer_id` = ?'

    db.query(getCustomerQuery, [req.params.id], (err, data) => {
      if(err){
            return res.json(err)
        }
        else{
            return res.json(data[0])
        }  
    })
};

export const deleteCustomer = (req, res) => {
    const deleteCustomerQuery = 'DELETE FROM `customer` WHERE `customer_id` = ?'

    db.query(deleteCustomerQuery, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data deleted successfully")
        } 
    })
};

export const insertCustomer = (req, res) => {
    const insertCustomerQuery = 'INSERT INTO `customer`( `name`, `email`,`mobile_no`, `password`, `city`, `state`, `address`, `entry_date`, `entry_by`) VALUES (?)'

    const value = [
        req?.body?.name || '',
        req?.body?.email || '',
        req?.body?.mobile_no || '',
        req?.body?.password || '',
        req?.body?.city,
        req?.body?.state,
        req?.body?.address || '',
        new Date(),
        req.body.entry_by || 2
    ]

    db.query(insertCustomerQuery, [value], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data inserted successfully")
        } 
    })
};

export const updateCustomer = (req, res) => {
    const updateCustomerQuery = 'UPDATE `customer` SET `name`= ?,`email`= ?, `mobile_no` = ?,`password` = ?, `city`=?, `state`=?, `address`= ?,`update_date`= ?,`update_by`= ? WHERE `customer_id` = ?'

        db.query("SELECT * FROM `customer` WHERE `customer_id` = ?", [req.params.id], (err, data) => {
            if(err){
                return res.status(500).json(err)
            }
            if(data.length === 0){
                return res.status(404).json("not found")
            }
            const existingUser = data[0]
            const value = [
            req?.body?.name || existingUser.name,
            req?.body?.email || existingUser.email,
            req?.body?.mobile_no || existingUser.mobile_no,
            req?.body?.password || existingUser.password,
            req?.body?.city || existingUser.city,
            req?.body?.state || existingUser.state,
            req?.body?.address || existingUser.address,
            new Date(),
            req.body.update_by
        ]

        db.query(updateCustomerQuery, [...value, req.params.id] , (err, data) => {
            if(err){
                return res.json(err)
            }
            else{
                return res.json("data updated successfully")
            }
        })
    })


    
}

