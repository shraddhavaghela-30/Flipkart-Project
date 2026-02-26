import { db } from "../db.js";

export const getAllContactUs = (req, res) => {
    const getAllContactUsQuery = 'SELECT *, DATE_FORMAT(entry_date, "%d-%m-%Y") AS entry_date1, DATE_FORMAT(update_date, "%d-%m-%Y") AS update_date1 FROM `contact_us`';

    db.query(getAllContactUsQuery, (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
};

export const getContactUs = (req, res) => {
    const getContactUsQuery = 'SELECT * FROM `contact_us` WHERE `contactus_id` = ?'

    db.query(getContactUsQuery , [req.params.id], (err,data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data[0])
        }
    })
};

export const deleteContactUs = (req, res) => {
    const deleteContactUsQuery = 'DELETE FROM `contact_us` WHERE `contactus_id` = ?'

    db.query(deleteContactUsQuery, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data deleted successfully")
        }
    })
};

export const insertContactUs = (req, res) => {
    const insertContactUsQuery = 'INSERT INTO `contact_us`(`first_name`, `last_name`, `email`, `mobile_no`, `message`, `entry_date`, `entry_by`) VALUES (?)'

    const value = [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.mobile_no,
        req.body.message,
        new Date(),
        req.body.entry_by
    ]

    db.query(insertContactUsQuery, [value], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data inserted successfully")
        }
    })
}