import { body } from 'express-validator'
import {db} from '../db.js'

export const getAdminContact = (req, res) => {
    const getAdminContactQuery = 'SELECT * FROM `admin_contact`'

    db.query(getAdminContactQuery, (err,data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data[0])
        }
    })
}

export const updateAdminContact = (req, res) => {
    const updateAdminContactQuery = 'UPDATE `admin_contact` SET `contact_no`= ?,`email`= ?,`address`= ?, `update_date`= ?,`update_by`= ? WHERE 1'
    
    const value = [
        req?.body?.contact_no ,
        req?.body?.email,
        req?.body?.address,
        new Date(),
        req.body.update_by
    ]

    db.query(updateAdminContactQuery, [...value, req.params.id], (err,data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("Data updated successfully")
        }
    })
}