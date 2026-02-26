import {db} from '../db.js'

export const getAboutUsAll = (req, res) => {
    const getAboutUsAllQuery = 'SELECT *, DATE_FORMAT(entry_date, "%d-%m-%Y") AS entry_date1, DATE_FORMAT(update_date, "%d-%m-%Y") AS update_date1 FROM `about_us`'

    db.query(getAboutUsAllQuery, (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data[0])
        }
    })
}

export const getAboutUs = (req, res) => {
    const getAboutUsQuery = "SELECT * FROM `about_us` WHERE `aboutus_id` = ?"

    db.query(getAboutUsQuery, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data[0])
        }
    })
}

export const deleteAboutUs = (req, res) => {
    const deleteAboutUsQuery = "DELETE FROM `about_us` WHERE `aboutus_id` = ?"

    db.query(deleteAboutUsQuery, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("Data deleted successfully")
        }
    })
}

export const insertAboutUs = (req, res) => {
    const insertAboutUsQuery = "INSERT INTO `about_us`(`heading_one`, `image_one`, `content_one`, `heading_two`, `image_two`, `content_two`, `entry_date`, `entry_by_role`, `entry_by`) VALUES (?)"
    // const imageOneFilename = req.files?.imageone ? req.files.imageone[0].filename : '';
    // const imageTwoFilename = req.files?.imagetwo ? req.files.imagetwo[0].filename : '';
    const value = [
        req.body.heading_one,
        req?.files?.imageone?.[0]?.filename || req?.body?.imageone,
        req.body.content_one,
        req.body.heading_two,
        req?.files?.imagetwo?.[0]?.filename || req?.body?.imagetwo,
        req.body.content_two,
        new Date(),
        req?.body?.entry_by_role || '',
        req?.body?.entry_by,
    ]

    db.query(insertAboutUsQuery, [value], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data inserted successfully")
        }
    })
}

export const updateAboutUs = (req, res) => {
    const updateAboutUsQuery = "UPDATE `about_us` SET `heading_one`= ?,`image_one`= ?,`content_one`= ?,`heading_two`= ?,`image_two`= ?,`content_two`= ?,`update_date`= ?,`update_by_role`= ?,`update_by`=? WHERE `aboutus_id`= ?"

    // const imageOneFilename = req.files?.imageone || req?.files?.imageone[0];
    // const imageTwoFilename = req.files?.imagetwo || req?.files?.imagetwo[0];

    
    const value = [
        req.body.heading_one,
        req?.files?.imageone?.[0]?.filename || req?.body?.imageone,
        req.body.content_one,
        req.body.heading_two,
        req?.files?.imagetwo?.[0]?.filename || req?.body?.imagetwo,
        req.body.content_two,
        new Date(),
        req?.body?.update_by_role || '',
        req?.body?.update_by,
    ]

    db.query(updateAboutUsQuery, [...value, req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data updated successfully")
        }
    })
}